/* mol3d.js
   A small ball-and-stick molecule renderer that draws into inline SVG.

   WHY THIS EXISTS RATHER THAN A LIBRARY
   The site has no build step and no external dependencies. Loading a 3D library
   from a CDN would make these diagrams break if that CDN ever goes away, which has
   already happened to other projects here. Keeping atoms as real SVG elements also
   means labels stay crisp, selectable, and responsive to the light and dark themes.

   HOW IT WORKS
   Atoms carry 3D coordinates. Each frame those coordinates are rotated by the
   current view angles, projected onto 2D with a mild perspective divide, and then
   every atom and bond is sorted back to front and drawn in that order, so nearer
   things cover further ones. Depth also drives opacity and size, which is what makes
   the shape readable without shading.

   USAGE
     Mol3D.mount(containerElement, {
       atoms:  [{ el: "O", x: 0, y: 0, z: 0, note: "δ−" }, ...],
       bonds:  [{ a: 0, b: 1 }, ...],          // covalent, solid lines
       hbonds: [{ a: 1, b: 3 }, ...],          // hydrogen bonds, dashed lines
       scale:  38,                              // pixels per Angstrom
       rx: -0.2, ry: 0.5,                       // starting view angles, radians
       description: "..."                       // read out to screen readers
     });

   Returns a handle with setStructure(newStructure) and destroy().

   COORDINATES
   Positions are given in Angstroms with y pointing up. The renderer flips y when
   drawing, because SVG's y axis points down.
*/

window.Mol3D = (function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  /* Logical drawing surface. The SVG scales to its container through CSS, so these
     numbers only set the aspect ratio and the coordinate system. */
  /* Close to square, because these structures are roughly as tall as they are wide.
     A wider frame would only add empty margin at the sides, since the fit is
     calculated from the shorter dimension. */
  var VIEW_W = 430;
  var VIEW_H = 330;

  /* Distance from the camera to the origin, in the same units as the scaled
     coordinates. Larger values flatten the perspective. */
  var CAMERA = 950;

  /*
     Display radii in pixels, and the CSS custom property each element is filled
     with. Radii are chosen for legibility rather than being proportional to real
     van der Waals radii; oxygen really is larger than hydrogen, but not by the
     amount shown here. The colors are defined in css/cookie-lab.css so that both
     themes can set them, and so there is one place to change them.
  */
  var ELEMENTS = {
    O: { r: 17, fill: "var(--cl-atom-o)", label: "O" },
    H: { r: 10, fill: "var(--cl-atom-h)", label: "H" },
    C: { r: 16, fill: "var(--cl-atom-c)", label: "C" },
    N: { r: 16, fill: "var(--cl-atom-n)", label: "N" },
    /* R stands for the rest of a larger molecule that has been cut away to keep
       the diagram readable. Every figure using it says so in its caption. */
    R: { r: 21, fill: "var(--cl-atom-r)", label: "R" }
  };

  function svgEl(name, attrs) {
    var node = document.createElementNS(NS, name);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        node.setAttribute(key, attrs[key]);
      }
    }
    return node;
  }

  /* Rotate a point around the y axis, then around the x axis. Applying them in a
     fixed order keeps dragging predictable: horizontal drag always spins the
     molecule about its vertical axis, vertical drag always tips it toward you. */
  function rotate(p, rx, ry) {
    var cosY = Math.cos(ry), sinY = Math.sin(ry);
    var x1 = p.x * cosY + p.z * sinY;
    var z1 = -p.x * sinY + p.z * cosY;

    var cosX = Math.cos(rx), sinX = Math.sin(rx);
    var y2 = p.y * cosX - z1 * sinX;
    var z2 = p.y * sinX + z1 * cosX;

    return { x: x1, y: y2, z: z2 };
  }

  /*
     Centre a structure on its own atoms and work out a scale that fits it in the
     frame. Doing this here rather than hand-tuning coordinates means a structure
     can be written at its real bond lengths and still fill the picture.

     The fitting radius is measured from the centroid and so does not change as the
     molecule turns. If it were recomputed from the projected positions each frame,
     the molecule would breathe in and out while being dragged.
  */
  function prepare(structure) {
    var atoms = structure.atoms || [];
    var n = atoms.length;
    var i, cx = 0, cy = 0, cz = 0;

    for (i = 0; i < n; i++) {
      cx += atoms[i].x;
      cy += atoms[i].y;
      cz += atoms[i].z;
    }
    if (n > 0) { cx /= n; cy /= n; cz /= n; }

    var centred = [];
    var maxRadius = 0.001;
    for (i = 0; i < n; i++) {
      var a = atoms[i];
      var p = {
        el: a.el,
        label: a.label,
        note: a.note,
        noteDx: a.noteDx,
        noteDy: a.noteDy,
        x: a.x - cx,
        y: a.y - cy,
        z: a.z - cz
      };
      var r = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      if (r > maxRadius) maxRadius = r;
      centred.push(p);
    }

    /* Half the shorter side, less a margin for the atoms themselves and for the
       charge labels that sit outside them. */
    var usable = Math.min(VIEW_W, VIEW_H) / 2 - 30;
    var scale = structure.scale || usable / maxRadius;

    /* Atom radii are in pixels, so a large structure drawn at a small scale would
       otherwise end up as a clump of overlapping spheres. Tying the radii loosely
       to the scale keeps the ball-and-stick proportions readable at either end. */
    var atomScale = scale / 120;
    if (atomScale > 1.15) atomScale = 1.15;
    /* The floor is set so that oxygen and carbon stay large enough to carry their
       element letter even in the biggest structures. Below this they become
       unlabelled dots and the reader loses track of which atom is which. */
    if (atomScale < 0.64) atomScale = 0.64;

    return { atoms: centred, scale: scale, atomScale: atomScale };
  }

  function Instance(container, structure) {
    this.container = container;
    this.structure = structure;
    this.prepared = prepare(structure);
    this.rx = structure.rx === undefined ? -0.18 : structure.rx;
    this.ry = structure.ry === undefined ? 0.5 : structure.ry;
    this.dragging = false;
    this.lastX = 0;
    this.lastY = 0;

    this.svg = svgEl("svg", {
      viewBox: "0 0 " + VIEW_W + " " + VIEW_H,
      role: "img",
      tabindex: "0",
      "aria-label": structure.description || "Three-dimensional molecular diagram"
    });

    this.container.appendChild(this.svg);
    this.bindEvents();
    this.draw();
  }

  Instance.prototype.setStructure = function (structure) {
    /* Keep the current view angles when swapping structures, unless the new one
       asks for particular ones. Otherwise a reader who has rotated the molecule
       loses their orientation every time they change the selection. */
    if (structure.rx !== undefined) this.rx = structure.rx;
    if (structure.ry !== undefined) this.ry = structure.ry;
    this.structure = structure;
    this.prepared = prepare(structure);
    this.svg.setAttribute("aria-label", structure.description || "Three-dimensional molecular diagram");
    this.draw();
  };

  Instance.prototype.bindEvents = function () {
    var self = this;

    function pointerDown(ev) {
      self.dragging = true;
      self.lastX = ev.clientX;
      self.lastY = ev.clientY;
      self.svg.setPointerCapture(ev.pointerId);
    }

    function pointerMove(ev) {
      if (!self.dragging) return;
      var dx = ev.clientX - self.lastX;
      var dy = ev.clientY - self.lastY;
      self.lastX = ev.clientX;
      self.lastY = ev.clientY;
      self.ry += dx * 0.01;
      self.rx += dy * 0.01;
      self.clampTilt();
      self.draw();
    }

    function pointerUp(ev) {
      self.dragging = false;
      if (self.svg.hasPointerCapture && self.svg.hasPointerCapture(ev.pointerId)) {
        self.svg.releasePointerCapture(ev.pointerId);
      }
    }

    this.svg.addEventListener("pointerdown", pointerDown);
    this.svg.addEventListener("pointermove", pointerMove);
    this.svg.addEventListener("pointerup", pointerUp);
    this.svg.addEventListener("pointercancel", pointerUp);

    /* Arrow keys rotate, so the diagram does not require a mouse. */
    this.svg.addEventListener("keydown", function (ev) {
      var step = 0.12;
      if (ev.key === "ArrowLeft") self.ry -= step;
      else if (ev.key === "ArrowRight") self.ry += step;
      else if (ev.key === "ArrowUp") self.rx -= step;
      else if (ev.key === "ArrowDown") self.rx += step;
      else return;
      ev.preventDefault();
      self.clampTilt();
      self.draw();
    });
  };

  /* Stop the view tipping past vertical, which is disorienting and serves no
     purpose for these structures. */
  Instance.prototype.clampTilt = function () {
    var limit = Math.PI / 2 - 0.05;
    if (this.rx > limit) this.rx = limit;
    if (this.rx < -limit) this.rx = -limit;
  };

  Instance.prototype.draw = function () {
    var s = this.structure;
    var scale = this.prepared.scale;
    var atomScale = this.prepared.atomScale;
    var atoms = this.prepared.atoms;
    var bonds = s.bonds || [];
    var hbonds = s.hbonds || [];

    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);

    /* Rotate every atom, then project it. */
    var projected = [];
    var i;
    for (i = 0; i < atoms.length; i++) {
      var r = rotate(atoms[i], this.rx, this.ry);
      var depthScale = CAMERA / (CAMERA - r.z * scale);
      projected.push({
        x: VIEW_W / 2 + r.x * scale * depthScale,
        y: VIEW_H / 2 - r.y * scale * depthScale,
        z: r.z,
        depthScale: depthScale,
        atomScale: atomScale,
        atom: atoms[i]
      });
    }

    /* Build one list of things to draw so that bonds and atoms interleave by depth.
       Drawing all bonds first and all atoms afterwards would let a bond in the far
       background paint over an atom in front of it. */
    var drawables = [];

    for (i = 0; i < bonds.length; i++) {
      drawables.push({ kind: "bond", z: midZ(projected, bonds[i]), data: bonds[i] });
    }
    for (i = 0; i < hbonds.length; i++) {
      drawables.push({ kind: "hbond", z: midZ(projected, hbonds[i]), data: hbonds[i] });
    }
    for (i = 0; i < projected.length; i++) {
      drawables.push({ kind: "atom", z: projected[i].z, data: i });
    }

    drawables.sort(function (a, b) { return a.z - b.z; });

    for (i = 0; i < drawables.length; i++) {
      var d = drawables[i];
      if (d.kind === "bond") this.drawBond(projected, d.data, false);
      else if (d.kind === "hbond") this.drawBond(projected, d.data, true);
      else this.drawAtom(projected[d.data]);
    }
  };

  function midZ(projected, bond) {
    return (projected[bond.a].z + projected[bond.b].z) / 2;
  }

  /* Depth fade. Atoms behind the origin dim, atoms in front stay full strength.
     The range is deliberately narrow, because heavy fading makes the far side of a
     molecule hard to identify rather than easier. */
  function depthOpacity(z) {
    var o = 1 - (2.6 - z) * 0.055;
    if (o > 1) return 1;
    if (o < 0.45) return 0.45;
    return o;
  }

  Instance.prototype.drawBond = function (projected, bond, isHydrogenBond) {
    var p1 = projected[bond.a];
    var p2 = projected[bond.b];
    var z = (p1.z + p2.z) / 2;

    var line = svgEl("line", {
      x1: p1.x.toFixed(2), y1: p1.y.toFixed(2),
      x2: p2.x.toFixed(2), y2: p2.y.toFixed(2),
      stroke: isHydrogenBond ? "var(--cl-hbond)" : "var(--cl-bond)",
      "stroke-width": (isHydrogenBond ? 2.6 : 6) * this.prepared.atomScale,
      "stroke-linecap": "round",
      opacity: depthOpacity(z).toFixed(3)
    });

    if (isHydrogenBond) line.setAttribute("stroke-dasharray", "1.5 6");

    this.svg.appendChild(line);
  };

  Instance.prototype.drawAtom = function (p) {
    var spec = ELEMENTS[p.atom.el] || ELEMENTS.C;
    var baseRadius = spec.r * p.atomScale;
    var radius = baseRadius * p.depthScale;
    var opacity = depthOpacity(p.z);

    var circle = svgEl("circle", {
      cx: p.x.toFixed(2),
      cy: p.y.toFixed(2),
      r: radius.toFixed(2),
      fill: spec.fill,
      stroke: "var(--cl-atom-stroke)",
      "stroke-width": 1.5,
      opacity: opacity.toFixed(3)
    });
    this.svg.appendChild(circle);

    /* The element letter goes inside the circle, but only when the circle is big
       enough to hold it without the text spilling over the edge. The decision uses
       the radius before the depth adjustment, so that every atom of a given element
       is either labelled or not. Deciding per frame on the depth-adjusted size makes
       letters blink on and off as the molecule turns. */
    if (baseRadius >= 9.6) {
      var text = p.atom.label || spec.label;
      /* Shrink the type for labels longer than a single letter, so a word such as
         a group name stays inside its circle instead of spilling over the edge. */
      var fontSize = radius * 0.95;
      if (text.length > 1) fontSize = fontSize / (0.6 + text.length * 0.4);

      var label = svgEl("text", {
        x: p.x.toFixed(2),
        y: (p.y + fontSize * 0.35).toFixed(2),
        "text-anchor": "middle",
        "font-size": fontSize.toFixed(1),
        fill: "var(--cl-atom-ink)",
        "font-family": "var(--font-mono)",
        opacity: opacity.toFixed(3),
        "pointer-events": "none"
      });
      label.textContent = text;
      this.svg.appendChild(label);
    }

    /* An optional note sits outside the atom, used for things like partial charges
       and for naming a group. */
    if (p.atom.note) {
      var offsetX = p.atom.noteDx === undefined ? 0 : p.atom.noteDx;
      var offsetY = p.atom.noteDy === undefined ? -1.5 : p.atom.noteDy;
      var note = svgEl("text", {
        x: (p.x + radius * offsetX).toFixed(2),
        y: (p.y + radius * offsetY).toFixed(2),
        "text-anchor": "middle",
        "font-size": 15,
        fill: "var(--cl-note-ink)",
        "font-family": "var(--font-mono)",
        "font-weight": 500,
        "pointer-events": "none"
      });
      note.textContent = p.atom.note;
      this.svg.appendChild(note);
    }
  };

  Instance.prototype.destroy = function () {
    if (this.svg && this.svg.parentNode) this.svg.parentNode.removeChild(this.svg);
  };

  return {
    mount: function (container, structure) {
      return new Instance(container, structure);
    }
  };
})();
