/* fat.js
   Visuals for the Fat section of garden/tools/cookie-black-box.html.

     1. cl-triglyceride   a triglyceride, and the difference between a straight
                          chain and one carrying a cis double bond            (3D)
     2. cl-separation     why water and fat pull apart                        (2D)
     3. cl-emulsifier     what a molecule with both kinds of end does at the
                          boundary between them                               (2D)
     4. cl-crystals       butter's solid fat network against temperature, and
                          what that does to the shape of the cookie           (2D)

   The molecular facts are in 3D, because chain shape is a fact about space.
   Everything above that scale is 2D, where occlusion would only get in the way.

   CHAIN GEOMETRY
   A saturated hydrocarbon chain in its lowest-energy form is a flat zigzag. Each
   carbon advances about 1.27 A along the chain axis and sits about 0.44 A to
   alternating sides of it. A cis double bond cannot rotate, and it fixes a bend of
   roughly 30 to 40 degrees into the chain at that point. Hydrogen atoms are left
   out of every chain drawing here, which is standard for showing chain shape and
   which each caption states.
*/

(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  function svgEl(name, attrs) {
    var node = document.createElementNS(NS, name);
    for (var key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) node.setAttribute(key, attrs[key]);
    }
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ---------------------------------------------------------------- */
  /* Chain builder                                                     */
  /* ---------------------------------------------------------------- */
  /*
     Walks along a chain axis laying down carbons in a zigzag. `kinkAt` inserts a
     permanent bend at that carbon, which is what a cis double bond does.
     Returns atoms and the bonds joining them in sequence.
  */
  function makeChain(options) {
    var atoms = [];
    var bonds = [];
    var angle = options.angle || 0;
    var px = options.x;
    var py = options.y;
    var pz = options.z || 0;
    var i;

    for (i = 0; i < options.n; i++) {
      if (options.kinkAt !== undefined && i === options.kinkAt) {
        angle += options.kinkAngle === undefined ? 0.62 : options.kinkAngle;
      }
      var ax = Math.cos(angle);
      var ay = Math.sin(angle);
      /* Sideways displacement, perpendicular to the axis, alternating each carbon. */
      var lateral = (i % 2 === 0 ? -0.44 : 0.44);
      atoms.push({
        el: "C",
        x: px + -ay * lateral,
        y: py + ax * lateral,
        z: pz
      });
      px += ax * 1.27;
      py += ay * 1.27;
    }

    for (i = 0; i < atoms.length - 1; i++) bonds.push({ a: i, b: i + 1 });
    return { atoms: atoms, bonds: bonds };
  }

  /* Merge several pieces into one structure, shifting bond indices as it goes.
     Returns the merged structure plus the index each piece started at, so that
     bonds between pieces can be added afterwards. */
  function merge(pieces) {
    var atoms = [];
    var bonds = [];
    var offsets = [];
    var i, j;

    for (i = 0; i < pieces.length; i++) {
      offsets.push(atoms.length);
      var piece = pieces[i];
      for (j = 0; j < piece.atoms.length; j++) atoms.push(piece.atoms[j]);
      var pb = piece.bonds || [];
      for (j = 0; j < pb.length; j++) {
        bonds.push({ a: pb[j].a + offsets[i], b: pb[j].b + offsets[i] });
      }
    }
    return { atoms: atoms, bonds: bonds, offsets: offsets };
  }

  /* ---------------------------------------------------------------- */
  /* 1. Triglyceride and chain shape                                   */
  /* ---------------------------------------------------------------- */

  function buildTriglyceride() {
    /* Glycerol backbone, three carbons, with an oxygen off each one. */
    var glycerol = {
      atoms: [
        { el: "C", x: 0, y: 1.45, z: 0.3 },
        { el: "C", x: 0, y: 0, z: 0 },
        { el: "C", x: 0, y: -1.45, z: 0.3 },
        { el: "O", x: 1.40, y: 1.45, z: 0.3 },
        { el: "O", x: 1.40, y: 0, z: 0 },
        { el: "O", x: 1.40, y: -1.45, z: 0.3 }
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 1, b: 2 },
        { a: 0, b: 3 }, { a: 1, b: 4 }, { a: 2, b: 5 }
      ]
    };

    var c1 = makeChain({ x: 2.70, y: 1.45, z: 0.3, n: 7 });
    var c2 = makeChain({ x: 2.70, y: 0, z: 0, n: 7 });
    var c3 = makeChain({ x: 2.70, y: -1.45, z: 0.3, n: 7 });

    var m = merge([glycerol, c1, c2, c3]);

    /* Join each oxygen to the first carbon of its chain. */
    m.bonds.push({ a: 3, b: m.offsets[1] });
    m.bonds.push({ a: 4, b: m.offsets[2] });
    m.bonds.push({ a: 5, b: m.offsets[3] });

    m.atoms[1].note = "glycerol";
    m.atoms[1].noteDx = -2.6;
    m.atoms[1].noteDy = 0.4;

    var lastOfMiddle = m.offsets[2] + 6;
    m.atoms[lastOfMiddle].note = "fatty acid chain";
    m.atoms[lastOfMiddle].noteDx = 0;
    m.atoms[lastOfMiddle].noteDy = 2.6;

    return {
      description:
        "A triglyceride. A three-carbon glycerol backbone on the left carries three long " +
        "fatty acid chains through oxygen links. Hydrogen atoms are not shown.",
      rx: -0.1,
      ry: 0.25,
      atoms: m.atoms,
      bonds: m.bonds
    };
  }

  function buildChainShapes() {
    var straight = makeChain({ x: -5.5, y: 2.1, z: 0, n: 11 });
    var kinked = makeChain({ x: -5.5, y: -2.1, z: 0, n: 11, kinkAt: 5, kinkAngle: 0.62 });

    var m = merge([straight, kinked]);

    m.atoms[0].note = "saturated";
    m.atoms[0].noteDx = -0.4;
    m.atoms[0].noteDy = -2.6;

    var kinkIndex = m.offsets[1] + 5;
    m.atoms[kinkIndex].note = "cis double bond";
    m.atoms[kinkIndex].noteDx = 0;
    m.atoms[kinkIndex].noteDy = 3.2;

    return {
      description:
        "Two fatty acid chains. The upper one is saturated and runs straight. The lower one " +
        "carries a cis double bond partway along, which puts a permanent bend in it.",
      rx: -0.05,
      ry: 0.15,
      atoms: m.atoms,
      bonds: m.bonds
    };
  }

  var TRIGLYCERIDE_VIEWS = {
    molecule: buildTriglyceride(),
    chains: buildChainShapes()
  };

  var TRIGLYCERIDE_CAPTIONS = {
    molecule:
      "Hydrogen atoms are left out, and the chains are drawn shorter than they really are. Real " +
      "fatty acid chains in butter run from four carbons up to eighteen. The three chains on one " +
      "molecule do not have to match each other.",
    chains:
      "Rotate the view to see that the upper chain stays in one line while the lower one does " +
      "not. The bend is permanent, because a double bond cannot rotate the way a single bond can."
  };

  var TRIGLYCERIDE_CONSEQUENCES = {
    molecule:
      "This is the molecule that most of the fat in butter, oil, shortening, and the fat in a " +
      "steak is made of. What it does in a dough is set by those three chains.",
    chains:
      "A straight chain lies flush against its neighbours along its whole length, so many small " +
      "attractions hold it in place and more heat is needed to pull it away. A bent chain cannot " +
      "lie flush no matter how it is arranged, so fewer attractions hold it and less heat frees " +
      "it. Straight chains therefore melt high and bent chains melt low, which is why butter is " +
      "solid at room temperature and olive oil is not."
  };

  /* ---------------------------------------------------------------- */
  /* Shared: a figure that switches between several 3D views           */
  /* ---------------------------------------------------------------- */

  function buildSwitcher(root, views, captions, consequences, initialKey) {
    var figure = root.querySelector(".cl-fig");
    var caption = root.querySelector(".cl-caption");
    var consequence = root.querySelector(".cl-consequence");
    var buttons = root.querySelectorAll(".cl-preset");
    if (!figure || !window.Mol3D) return;

    var handle = window.Mol3D.mount(figure, views[initialKey]);

    function select(key) {
      handle.setStructure(views[key]);
      if (caption) caption.textContent = captions[key];
      if (consequence) consequence.textContent = consequences[key];
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("aria-pressed", String(buttons[i].dataset.view === key));
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener("click", function () { select(button.dataset.view); });
      })(buttons[i]);
    }

    select(initialKey);
  }

  /* ---------------------------------------------------------------- */
  /* 2. Why water and fat pull apart                                   */
  /* ---------------------------------------------------------------- */
  /*
     Two panels. On the left, water among water, where a molecule can point its
     hydrogens in many directions and still find a partner. On the right, water
     against a fatty chain, where the chain offers nothing to bond to, so the
     molecules facing it have to take up particular orientations to keep bonding to
     each other. Fewer arrangements work, and the system reduces how many molecules
     are forced into that position by shrinking the shared surface.
  */

  function drawWaterDot(parent, x, y, angle, size) {
    var g = svgEl("g", { transform: "translate(" + x + "," + y + ") rotate(" + angle + ")" });
    g.appendChild(svgEl("circle", {
      cx: 0, cy: 0, r: size,
      fill: "var(--cl-atom-o)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
    }));
    g.appendChild(svgEl("circle", {
      cx: size * 0.95, cy: -size * 0.75, r: size * 0.52,
      fill: "var(--cl-atom-h)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
    }));
    g.appendChild(svgEl("circle", {
      cx: -size * 0.95, cy: -size * 0.75, r: size * 0.52,
      fill: "var(--cl-atom-h)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
    }));
    parent.appendChild(g);
    return g;
  }

  function initSeparation(root) {
    var svg = root.querySelector("svg");
    if (!svg) return;
    clear(svg);

    var W = 460, H = 210;
    var i;

    /* Panel headings. */
    var headings = [
      { x: 14, text: "water among water" },
      { x: 246, text: "water against fat" }
    ];
    for (i = 0; i < headings.length; i++) {
      var h = svgEl("text", {
        x: headings[i].x, y: 20,
        "font-family": "var(--font-mono)", "font-size": 11,
        "letter-spacing": 1, fill: "var(--accent)"
      });
      h.textContent = headings[i].text.toUpperCase();
      svg.appendChild(h);
    }

    /* Divider between the panels. */
    svg.appendChild(svgEl("line", {
      x1: 230, y1: 8, x2: 230, y2: H - 8,
      stroke: "var(--line)", "stroke-width": 1
    }));

    /* Left panel. Water molecules pointing every which way, with bonds running in
       many directions between them. */
    var left = [
      [56, 62, -20], [126, 52, 55], [186, 84, 150],
      [40, 128, 100], [104, 118, -70], [170, 150, 15],
      [64, 182, 200], [140, 190, -120]
    ];
    for (i = 0; i < left.length; i++) {
      /* Bonds drawn first so the molecules sit on top of them. */
      if (i > 0) {
        svg.appendChild(svgEl("line", {
          x1: left[i - 1][0], y1: left[i - 1][1], x2: left[i][0], y2: left[i][1],
          stroke: "var(--cl-hbond)", "stroke-width": 1.6, "stroke-dasharray": "1.5 4"
        }));
      }
    }
    svg.appendChild(svgEl("line", {
      x1: left[0][0], y1: left[0][1], x2: left[4][0], y2: left[4][1],
      stroke: "var(--cl-hbond)", "stroke-width": 1.6, "stroke-dasharray": "1.5 4"
    }));
    svg.appendChild(svgEl("line", {
      x1: left[2][0], y1: left[2][1], x2: left[5][0], y2: left[5][1],
      stroke: "var(--cl-hbond)", "stroke-width": 1.6, "stroke-dasharray": "1.5 4"
    }));
    for (i = 0; i < left.length; i++) {
      drawWaterDot(svg, left[i][0], left[i][1], left[i][2], 9);
    }

    /* Right panel. A fatty chain drawn as a zigzag, with water alongside it. */
    var chainPath = "M 268 40";
    var cx = 268, cy = 40;
    for (i = 0; i < 9; i++) {
      cx += (i % 2 === 0) ? 14 : 14;
      cy += 16;
      chainPath += " L " + cx + " " + cy;
      cx += (i % 2 === 0) ? -14 : -14;
    }
    /* Rebuild as a clean vertical zigzag so the chain reads as a barrier. */
    chainPath = "M 292 34";
    for (i = 1; i <= 9; i++) {
      chainPath += " L " + (292 + (i % 2 === 0 ? 0 : 18)) + " " + (34 + i * 16);
    }
    svg.appendChild(svgEl("path", {
      d: chainPath, fill: "none",
      stroke: "var(--cl-fat)", "stroke-width": 6,
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }));
    var chainLabel = svgEl("text", {
      x: 302, y: 196, "font-family": "var(--font-sans)", "font-size": 12,
      fill: "var(--ink-faint)", "text-anchor": "middle"
    });
    chainLabel.textContent = "fatty chain";
    svg.appendChild(chainLabel);

    /* Water molecules to the right of the chain, all turned so their hydrogens
       face away from it, which is the constrained arrangement. */
    var right = [[352, 56], [352, 100], [352, 144], [404, 78], [404, 122]];
    for (i = 0; i < right.length - 1; i++) {
      if (i < 2) {
        svg.appendChild(svgEl("line", {
          x1: right[i][0], y1: right[i][1], x2: right[i + 1][0], y2: right[i + 1][1],
          stroke: "var(--cl-hbond)", "stroke-width": 1.6, "stroke-dasharray": "1.5 4"
        }));
      }
    }
    for (i = 0; i < right.length; i++) {
      drawWaterDot(svg, right[i][0], right[i][1], 90, 9);
    }

  }

  /* ---------------------------------------------------------------- */
  /* 3. What an emulsifier does                                        */
  /* ---------------------------------------------------------------- */

  /*
     A zigzag path standing for a hydrocarbon tail, drawn from a start point along
     a direction. Tails are drawn this way rather than as plain lines so that they
     read as the same kind of chain shown in the triglyceride and separation
     figures, and so that they cannot be mistaken for the droplet outline.
  */
  function zigzagPath(x, y, dirX, dirY, length, segments, amplitude) {
    var perpX = -dirY, perpY = dirX;
    var step = length / segments;
    var d = "M " + x.toFixed(1) + " " + y.toFixed(1);
    for (var i = 1; i <= segments; i++) {
      var offset = (i % 2 === 0 ? -1 : 1) * amplitude;
      var px = x + dirX * step * i + perpX * offset;
      var py = y + dirY * step * i + perpY * offset;
      d += " L " + px.toFixed(1) + " " + py.toFixed(1);
    }
    return d;
  }

  function addText(parent, x, y, text, options) {
    var node = svgEl("text", {
      x: x, y: y,
      "text-anchor": options.anchor || "middle",
      "font-family": options.mono ? "var(--font-mono)" : "var(--font-sans)",
      "font-size": options.size || 12,
      "font-weight": options.weight || 400,
      fill: options.fill || "var(--ink-soft)"
    });
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function initEmulsifier(root) {
    var svg = root.querySelector("svg");
    if (!svg) return;
    clear(svg);

    var i;

    /* ---- Left: the droplet ---- */

    var cx = 132, cy = 128, r = 62;

    svg.appendChild(svgEl("rect", {
      x: 0, y: 0, width: 268, height: 250, fill: "var(--cl-water-wash)"
    }));
    svg.appendChild(svgEl("circle", {
      cx: cx, cy: cy, r: r,
      fill: "var(--cl-fat-wash)", stroke: "var(--cl-fat)", "stroke-width": 1.5
    }));

    var count = 13;
    for (i = 0; i < count; i++) {
      var angle = (i / count) * Math.PI * 2;
      var ux = Math.cos(angle), uy = Math.sin(angle);

      /* Two tails per molecule, reaching in toward the fat. */
      var t;
      for (t = -1; t <= 1; t += 2) {
        var spread = t * 0.075;
        var sx = Math.cos(angle + spread), sy = Math.sin(angle + spread);
        svg.appendChild(svgEl("path", {
          d: zigzagPath(cx + sx * (r - 1), cy + sy * (r - 1), -sx, -sy, 24, 4, 2.2),
          fill: "none",
          stroke: "var(--cl-emul-tail)",
          "stroke-width": 2.4,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }));
      }

      svg.appendChild(svgEl("circle", {
        cx: (cx + ux * (r + 5)).toFixed(1), cy: (cy + uy * (r + 5)).toFixed(1),
        r: 7.5,
        fill: "var(--cl-emul-head)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
      }));
    }

    addText(svg, 132, 132, "fat", { fill: "var(--ink-soft)", size: 13 });
    addText(svg, 16, 26, "water", { anchor: "start", fill: "var(--ink-soft)", size: 13 });

    /* ---- Right: one molecule, enlarged, straddling a flat boundary ---- */

    var panelX = 268, panelW = 192;
    var boundaryY = 128;

    svg.appendChild(svgEl("rect", {
      x: panelX, y: 0, width: panelW, height: boundaryY, fill: "var(--cl-water-wash)"
    }));
    svg.appendChild(svgEl("rect", {
      x: panelX, y: boundaryY, width: panelW, height: 250 - boundaryY, fill: "var(--cl-fat-wash)"
    }));
    svg.appendChild(svgEl("line", {
      x1: panelX, y1: boundaryY, x2: 460, y2: boundaryY,
      stroke: "var(--cl-fat)", "stroke-width": 1.5
    }));
    /* Divider between the two halves of the figure. */
    svg.appendChild(svgEl("line", {
      x1: panelX, y1: 0, x2: panelX, y2: 250,
      stroke: "var(--line)", "stroke-width": 1
    }));

    var mx = 364;

    /* Tails, running down into the fat. */
    svg.appendChild(svgEl("path", {
      d: zigzagPath(mx - 7, 106, -0.12, 1, 96, 7, 3.4),
      fill: "none", stroke: "var(--cl-emul-tail)", "stroke-width": 4,
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }));
    svg.appendChild(svgEl("path", {
      d: zigzagPath(mx + 7, 106, 0.12, 1, 96, 7, 3.4),
      fill: "none", stroke: "var(--cl-emul-tail)", "stroke-width": 4,
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }));

    /* Head, sitting up in the water. */
    svg.appendChild(svgEl("circle", {
      cx: mx, cy: 92, r: 17,
      fill: "var(--cl-emul-head)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1.5
    }));

    addText(svg, mx, 44, "HEAD", { mono: true, size: 11, weight: 500, fill: "var(--cl-emul-head)" });
    addText(svg, mx, 60, "attracted to water", { size: 11, fill: "var(--ink-faint)" });

    addText(svg, mx, 228, "TAILS", { mono: true, size: 11, weight: 500, fill: "var(--cl-emul-tail)" });
    addText(svg, mx, 244, "attracted to fat", { size: 11, fill: "var(--ink-faint)" });

    addText(svg, 456, 122, "water", { anchor: "end", size: 11, fill: "var(--ink-faint)" });
    addText(svg, 456, 144, "fat", { anchor: "end", size: 11, fill: "var(--ink-faint)" });

    /* A callout tying the enlarged molecule back to one on the droplet. */
    svg.appendChild(svgEl("path", {
      d: "M 196 92 Q 236 74 300 82",
      fill: "none", stroke: "var(--ink-faint)", "stroke-width": 1,
      "stroke-dasharray": "3 4", opacity: 0.7
    }));
  }

  /* ---------------------------------------------------------------- */
  /* 4. Butter's solid fat network against temperature                 */
  /* ---------------------------------------------------------------- */
  /*
     Butter is part crystal and part liquid at every temperature it is used at.
     Raising the temperature melts more of the crystals. What matters for the dough
     is not how many crystals are left but whether the ones that are left still
     touch each other in an unbroken path across the material, because only a
     connected network can carry a load.

     The figure tests that directly. Crystals within reach of each other are joined,
     the clusters are worked out with a union-find, and the network counts as intact
     only when one cluster reaches from the left edge to the right edge.

     Solid fat content against temperature follows the shape measured for butter:
     roughly half solid near refrigerator temperature, about a quarter at room
     temperature, and essentially none by the time it is fully melted.
  */

  var CRYSTAL_SITES = [];
  (function seedSites() {
    /* A fixed scatter, so that raising the temperature removes crystals rather
       than rearranging the whole picture. */
    /*
       Park-Miller. The usual textbook generator with a multiplier around 1.1
       billion overflows JavaScript's exact-integer range and collapses into a
       degenerate sequence, which left visible holes in the scatter. This
       multiplier keeps every intermediate product well under 2^53.
    */
    var seed = 7;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    }

    /*
       A jittered grid rather than a free scatter. An even starting layout matters
       here, because the figure's whole claim is about whether the surviving
       crystals still reach across the material. A scatter that happened to leave a
       gap would break the network for reasons of drawing rather than of physics.
    */
    var cols = 9, rows = 6;
    var cellW = 416 / cols, cellH = 124 / rows;
    var c, r;
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        CRYSTAL_SITES.push({
          x: 22 + c * cellW + cellW * (0.2 + rand() * 0.6),
          y: 18 + r * cellH + cellH * (0.2 + rand() * 0.6),
          r: 5 + rand() * 4
        });
      }
    }

    /*
       Shuffled, so that taking the first N leaves a subset spread over the whole
       area. Melting removes crystals from everywhere at once, not from one end.
    */
    for (var i = CRYSTAL_SITES.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var swap = CRYSTAL_SITES[i];
      CRYSTAL_SITES[i] = CRYSTAL_SITES[j];
      CRYSTAL_SITES[j] = swap;
    }
  })();

  function solidFatFraction(tempC) {
    /* Falls from about 0.55 near 4 C to zero by about 34 C. */
    var f = 0.55 - (tempC - 4) * 0.0185;
    if (f < 0) return 0;
    if (f > 0.55) return 0.55;
    return f;
  }

  function initCrystals(root) {
    var svg = root.querySelector("[data-crystals]");
    var doughSvg = root.querySelector("[data-dough]");
    var slider = root.querySelector("[data-slider='temp']");
    var valueLabel = root.querySelector("[data-value='temp']");
    var readout = root.querySelector(".cl-readout");
    if (!svg || !slider) return;

    /*
       How close two crystals have to be to count as touching. Tuned so that the
       network breaks between about 26 and 30 C, which is where butter stops
       holding its shape in practice. Softened butter at 20 C is still a solid that
       keeps its form, and the figure has to agree with that.
    */
    var LINK_DISTANCE = 90;

    function connectedAcross(active) {
      /* Union-find over the surviving crystals. */
      var parent = [];
      var i, j;
      for (i = 0; i < active.length; i++) parent.push(i);

      function find(a) {
        while (parent[a] !== a) { parent[a] = parent[parent[a]]; a = parent[a]; }
        return a;
      }
      function union(a, b) {
        var ra = find(a), rb = find(b);
        if (ra !== rb) parent[ra] = rb;
      }

      var links = [];
      for (i = 0; i < active.length; i++) {
        for (j = i + 1; j < active.length; j++) {
          var dx = active[i].x - active[j].x;
          var dy = active[i].y - active[j].y;
          if (Math.sqrt(dx * dx + dy * dy) <= LINK_DISTANCE) {
            union(i, j);
            links.push([i, j]);
          }
        }
      }

      /*
         The network counts as intact when one connected cluster reaches most of
         the way across. Measuring the widest cluster's extent is steadier than
         asking whether a crystal happens to land in a fixed band at each edge,
         which turns the answer into a matter of where the scatter put things.
      */
      var extents = {};
      for (i = 0; i < active.length; i++) {
        var root = find(i);
        if (!extents[root]) extents[root] = { min: active[i].x, max: active[i].x };
        if (active[i].x < extents[root].min) extents[root].min = active[i].x;
        if (active[i].x > extents[root].max) extents[root].max = active[i].x;
      }

      var widest = 0;
      for (var key in extents) {
        if (Object.prototype.hasOwnProperty.call(extents, key)) {
          var w = extents[key].max - extents[key].min;
          if (w > widest) widest = w;
        }
      }

      return { links: links, spans: widest > 416 * 0.72 };
    }

    function update() {
      var tempC = Number(slider.value);
      var fraction = solidFatFraction(tempC);
      var keep = Math.round(fraction / 0.55 * CRYSTAL_SITES.length);

      var active = CRYSTAL_SITES.slice(0, keep);
      var result = connectedAcross(active);

      /* Draw the fat. */
      clear(svg);
      svg.appendChild(svgEl("rect", {
        x: 0, y: 0, width: 460, height: 160, fill: "var(--cl-fat-wash)"
      }));

      var i;
      for (i = 0; i < result.links.length; i++) {
        var a = active[result.links[i][0]];
        var b = active[result.links[i][1]];
        svg.appendChild(svgEl("line", {
          x1: a.x.toFixed(1), y1: a.y.toFixed(1), x2: b.x.toFixed(1), y2: b.y.toFixed(1),
          stroke: result.spans ? "var(--cl-crystal-link)" : "var(--cl-bond)",
          "stroke-width": result.spans ? 2.4 : 1.4,
          opacity: result.spans ? 0.9 : 0.5
        }));
      }
      for (i = 0; i < active.length; i++) {
        svg.appendChild(svgEl("rect", {
          x: (active[i].x - active[i].r).toFixed(1),
          y: (active[i].y - active[i].r).toFixed(1),
          width: (active[i].r * 2).toFixed(1),
          height: (active[i].r * 2).toFixed(1),
          rx: 1.5,
          transform: "rotate(38 " + active[i].x.toFixed(1) + " " + active[i].y.toFixed(1) + ")",
          fill: "var(--cl-crystal)",
          stroke: "var(--cl-atom-stroke)",
          "stroke-width": 1
        }));
      }

      /* Draw the dough. Losing the network lets it flatten. */
      clear(doughSvg);
      /*
         While the network holds, the dough softens gradually as crystals are lost,
         and the mound settles a little. When the network fails it gives way at
         once. The step between the two is deliberate, because losing connectivity
         is what actually happens: the fat does not weaken smoothly toward nothing,
         it stops carrying load the moment the last path across it is gone.
      */
      var melted = 1 - fraction / 0.55;
      var slump = result.spans
        ? 0.06 + melted * 0.22
        : 0.55 + melted * 0.35;
      var halfWidth = 46 + slump * 96;
      var height = 62 - slump * 40;

      doughSvg.appendChild(svgEl("line", {
        x1: 20, y1: 96, x2: 440, y2: 96,
        stroke: "var(--line)", "stroke-width": 2
      }));
      doughSvg.appendChild(svgEl("path", {
        d: "M " + (230 - halfWidth) + " 95" +
           " Q " + (230 - halfWidth * 0.55) + " " + (95 - height) +
           " 230 " + (95 - height) +
           " Q " + (230 + halfWidth * 0.55) + " " + (95 - height) +
           " " + (230 + halfWidth) + " 95 Z",
        fill: "var(--cl-dough)",
        stroke: "var(--cl-fat)",
        "stroke-width": 1.5
      }));
      var doughLabel = svgEl("text", {
        x: 230, y: 118, "text-anchor": "middle",
        "font-family": "var(--font-sans)", "font-size": 12, fill: "var(--ink-faint)"
      });
      doughLabel.textContent = "the dough on the tray";
      doughSvg.appendChild(doughLabel);

      /* Readouts. */
      var tempF = Math.round(tempC * 9 / 5 + 32);
      valueLabel.textContent = tempC + " °C / " + tempF + " °F";

      var percent = Math.round(fraction * 100);
      var networkLine = result.spans
        ? "Connected. Enough crystals are still touching to make an unbroken path from one " +
          "side of the fat to the other."
        : "Broken. Too few crystals remain for an unbroken path across the fat, so there is " +
          "nothing left to carry a load.";

      var doughLine;
      if (result.spans) {
        doughLine = "The dough holds the shape it was scooped into. Gravity is pulling on it the " +
          "whole time and it does not flow.";
      } else if (fraction > 0.06) {
        doughLine = "The dough has begun to slump. Nothing pushed it outward; it simply stopped " +
          "being able to resist its own weight.";
      } else {
        doughLine = "The dough flows freely and spreads until something else stops it, which in " +
          "the oven means the egg protein setting and the water leaving.";
      }

      var context = "";
      if (tempC <= 6) context = "Straight from the refrigerator.";
      else if (tempC <= 14) context = "Cold, as a pie crust wants it.";
      else if (tempC <= 22) context = "Softened, the state a recipe means by room temperature.";
      else if (tempC <= 30) context = "Warm. This is the butter that bakers describe as oily rather than soft.";
      else context = "Melted.";

      readout.innerHTML =
        "<p><strong>Solid fat.</strong> " + percent + " percent of the fat is still crystalline. " +
        context + "</p>" +
        "<p><strong>The network.</strong> " + networkLine + "</p>" +
        "<p><strong>The dough.</strong> " + doughLine + "</p>";
    }

    slider.addEventListener("input", update);
    update();
  }

  /* ---------------------------------------------------------------- */
  /* Start up                                                          */
  /* ---------------------------------------------------------------- */

  function start() {
    var triRoot = document.getElementById("cl-triglyceride");
    if (triRoot) {
      buildSwitcher(triRoot, TRIGLYCERIDE_VIEWS, TRIGLYCERIDE_CAPTIONS,
        TRIGLYCERIDE_CONSEQUENCES, "molecule");
    }

    var sepRoot = document.getElementById("cl-separation");
    if (sepRoot) initSeparation(sepRoot);

    var emuRoot = document.getElementById("cl-emulsifier");
    if (emuRoot) initEmulsifier(emuRoot);

    var crystalRoot = document.getElementById("cl-crystals");
    if (crystalRoot) initCrystals(crystalRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
