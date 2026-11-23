/* sugar.js
   Visuals for the Sugar section of garden/tools/cookie-black-box.html.

     1. cl-sucrose        a sucrose molecule and its eight hydroxyl groups, and
                          what it becomes when it splits                      (3D)
     2. cl-recrystallize  what happens to sugar as the baked cookie cools, and
                          why invert sugar changes the answer                 (2D)

   MOLECULAR COORDINATES
   Sucrose is a glucose ring joined to a fructose ring through a single oxygen.
   The glucose ring is drawn in its chair shape and the fructose ring as a
   five-membered ring. Hydrogen atoms are omitted throughout, so each outer oxygen
   shown here is really a hydroxyl group with a hydrogen attached. There are eight
   of them, which is the point of the figure.
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

  function makeRandom(seed) {
    var s = seed;
    return function () {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  }

  /* ---------------------------------------------------------------- */
  /* 1. Sucrose                                                        */
  /* ---------------------------------------------------------------- */

  /* Atom positions in Angstroms. Indices are referred to by the bond list below,
     so the order here matters. */
  var GLUCOSE = [
    { el: "C", x: 1.25, y: 0.72, z: 0.25 },    /* 0  C1, joins the two rings */
    { el: "C", x: 0, y: 1.44, z: -0.25 },      /* 1  C2 */
    { el: "C", x: -1.25, y: 0.72, z: 0.25 },   /* 2  C3 */
    { el: "C", x: -1.25, y: -0.72, z: -0.25 }, /* 3  C4 */
    { el: "C", x: 0, y: -1.44, z: 0.25 },      /* 4  C5 */
    { el: "O", x: 1.25, y: -0.72, z: -0.25 },  /* 5  ring oxygen */
    { el: "O", x: 0, y: 2.75, z: -0.85 },      /* 6  hydroxyl */
    { el: "O", x: -2.45, y: 1.45, z: 0.55 },   /* 7  hydroxyl */
    { el: "O", x: -2.45, y: -1.45, z: -0.55 }, /* 8  hydroxyl */
    { el: "C", x: 0, y: -2.90, z: 0.60 },      /* 9  C6 */
    { el: "O", x: 1.15, y: -3.65, z: 0.40 }    /* 10 hydroxyl */
  ];

  var GLUCOSE_BONDS = [
    { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 },
    { a: 4, b: 5 }, { a: 5, b: 0 },
    { a: 1, b: 6 }, { a: 2, b: 7 }, { a: 3, b: 8 }, { a: 4, b: 9 }, { a: 9, b: 10 }
  ];

  var FRUCTOSE = [
    { el: "C", x: 3.90, y: 1.40, z: 0.60 },   /* 0  C2, joins the two rings */
    { el: "C", x: 4.60, y: 2.50, z: 0.90 },   /* 1  C3 */
    { el: "C", x: 5.90, y: 2.10, z: 0.60 },   /* 2  C4 */
    { el: "C", x: 5.90, y: 0.75, z: 0.90 },   /* 3  C5 */
    { el: "O", x: 4.65, y: 0.40, z: 0.60 },   /* 4  ring oxygen */
    { el: "O", x: 4.30, y: 3.70, z: 1.30 },   /* 5  hydroxyl */
    { el: "O", x: 6.90, y: 2.90, z: 0.30 },   /* 6  hydroxyl */
    { el: "C", x: 3.30, y: 1.20, z: -0.70 },  /* 7  C1 */
    { el: "O", x: 3.90, y: 1.50, z: -1.80 },  /* 8  hydroxyl */
    { el: "C", x: 7.00, y: -0.10, z: 0.70 },  /* 9  C6 */
    { el: "O", x: 8.10, y: 0.30, z: 1.40 }    /* 10 hydroxyl */
  ];

  var FRUCTOSE_BONDS = [
    { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 0 },
    { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 0, b: 7 }, { a: 7, b: 8 },
    { a: 3, b: 9 }, { a: 9, b: 10 }
  ];

  function shifted(atoms, dx, dy, dz, extra) {
    var out = [];
    for (var i = 0; i < atoms.length; i++) {
      var a = atoms[i];
      out.push({
        el: a.el,
        x: a.x + dx, y: a.y + dy, z: a.z + dz,
        note: extra && extra[i] ? extra[i].note : undefined,
        noteDx: extra && extra[i] ? extra[i].noteDx : undefined,
        noteDy: extra && extra[i] ? extra[i].noteDy : undefined
      });
    }
    return out;
  }

  function offsetBonds(bonds, offset) {
    var out = [];
    for (var i = 0; i < bonds.length; i++) {
      out.push({ a: bonds[i].a + offset, b: bonds[i].b + offset });
    }
    return out;
  }

  function buildSucrose() {
    var atoms = shifted(GLUCOSE, 0, 0, 0).concat(
      [{ el: "O", x: 2.50, y: 1.35, z: 0.50 }],   /* the glycosidic oxygen */
      shifted(FRUCTOSE, 0, 0, 0)
    );

    var bonds = GLUCOSE_BONDS
      .concat([{ a: 0, b: 11 }, { a: 11, b: 12 }])
      .concat(offsetBonds(FRUCTOSE_BONDS, 12));

    atoms[11].note = "the link";
    atoms[11].noteDx = 0;
    atoms[11].noteDy = -1.9;

    return {
      description:
        "A sucrose molecule. A six-sided glucose ring on the left is joined through a single " +
        "oxygen to a five-sided fructose ring on the right. Eight oxygen atoms stick out from the " +
        "two rings, and each of those is a hydroxyl group.",
      rx: -0.24,
      ry: 0.42,
      atoms: atoms,
      bonds: bonds
    };
  }

  function buildInverted() {
    /* The two rings, pulled apart, each having taken an oxygen from the split. */
    var glucose = shifted(GLUCOSE, -2.1, 0, 0);
    var fructose = shifted(FRUCTOSE, 2.1, 0, 0);

    var atoms = glucose
      .concat([{ el: "O", x: 1.25 - 2.1 + 1.30, y: 0.72 + 0.70, z: 0.25 + 0.35 }])
      .concat(fructose)
      .concat([{ el: "O", x: 3.90 + 2.1 - 1.30, y: 1.40 + 0.70, z: 0.60 + 0.35 }]);

    var bonds = GLUCOSE_BONDS
      .concat([{ a: 0, b: 11 }])
      .concat(offsetBonds(FRUCTOSE_BONDS, 12))
      .concat([{ a: 12, b: 23 }]);

    atoms[4].note = "glucose";
    atoms[4].noteDx = -0.6;
    atoms[4].noteDy = 2.6;

    atoms[15].note = "fructose";
    atoms[15].noteDx = 0.8;
    atoms[15].noteDy = 2.6;

    return {
      description:
        "The same sucrose molecule after it has split. The glucose ring and the fructose ring are " +
        "now two separate molecules, and each has taken an oxygen from the link that used to join " +
        "them.",
      rx: -0.24,
      ry: 0.42,
      atoms: atoms,
      bonds: bonds
    };
  }

  var SUCROSE_VIEWS = {
    whole: buildSucrose(),
    split: buildInverted()
  };

  var SUCROSE_CAPTIONS = {
    whole:
      "Hydrogen atoms are omitted, so every oxygen on the outside of the rings is really a " +
      "hydroxyl group with a hydrogen attached. Count them and there are eight. Sucrose is a " +
      "disaccharide, meaning a sugar built from two simpler sugars joined together.",
    split:
      "Splitting sucrose into its two halves is called inversion, and the pair is called invert " +
      "sugar. Molasses in brown sugar carries invert sugar already, and it also forms during " +
      "baking. Two smaller molecules occupy the same mass as one larger one, which matters for " +
      "everything below."
  };

  var SUCROSE_CONSEQUENCES = {
    whole:
      "Each of those eight hydroxyl groups can hold water through hydrogen bonding, in exactly " +
      "the way shown in the Water section. One dissolved sucrose molecule therefore takes a " +
      "considerable amount of water out of circulation, and that is the largest single reason a " +
      "cookie dough behaves nothing like a bread dough.",
    split:
      "Glucose and fructose hold water more tightly than sucrose does, and fructose especially " +
      "so. They also get in the way when the sugar tries to form crystals again as the cookie " +
      "cools, which is what keeps a brown sugar cookie bendy instead of letting it turn brittle."
  };

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
  /* 2. Recrystallization on cooling                                   */
  /* ---------------------------------------------------------------- */
  /*
     A cookie is not crisp when it leaves the oven. It becomes crisp as it cools,
     and one accepted explanation is that dissolved sugar returns to an ordered
     crystalline arrangement as the temperature falls. More sugar available to
     recrystallize means more snap.

     Invert sugar interferes with that. Glucose and fructose are different shapes
     from sucrose, so a growing sucrose crystal cannot fit them into its lattice.
     They sit in the way, the ordered regions stay small and broken up, and the
     cookie stays bendy. This is a large part of why brown sugar gives a chewier
     cookie than white sugar does.
  */

  function initRecrystallize(root) {
    var latticeSvg = root.querySelector("[data-lattice]");
    var bendSvg = root.querySelector("[data-bend]");
    var slider = root.querySelector("[data-slider='invert']");
    var valueLabel = root.querySelector("[data-value='invert']");
    var readout = root.querySelector(".cl-readout");
    if (!latticeSvg || !slider) return;

    var COLS = 11, ROWS = 5;
    var originX = 30, originY = 26, stepX = 39, stepY = 30;

    /* A fixed roll for every site, so raising the invert level converts sites in a
       stable order rather than reshuffling the whole picture. */
    var rand = makeRandom(19);
    var sites = [];
    var r, c;
    for (r = 0; r < ROWS; r++) {
      for (c = 0; c < COLS; c++) {
        sites.push({ col: c, row: r, roll: rand(), jx: rand() - 0.5, jy: rand() - 0.5 });
      }
    }

    function update() {
      var invert = Number(slider.value) / 100;

      clear(latticeSvg);

      /* Sites whose roll falls under the invert level become glucose or fructose
         instead of sucrose, and cannot join the lattice. */
      var i, placed = [];
      for (i = 0; i < sites.length; i++) {
        var s = sites[i];
        var isInvert = s.roll < invert;
        /* Disorder rises with the invert level, because the neat rows lose the
           neighbours that were holding them in line. */
        var jitter = isInvert ? 7 : invert * 9;
        placed.push({
          x: originX + s.col * stepX + s.jx * jitter,
          y: originY + s.row * stepY + s.jy * jitter,
          isInvert: isInvert
        });
      }

      /* Lattice lines, drawn only between neighbouring sucrose sites. These are
         what a crystal is: an ordered, repeating arrangement. */
      for (i = 0; i < placed.length; i++) {
        var s2 = sites[i];
        if (placed[i].isInvert) continue;
        var right = s2.col < COLS - 1 ? i + 1 : -1;
        var down = s2.row < ROWS - 1 ? i + COLS : -1;
        var neighbours = [right, down];
        for (var n = 0; n < neighbours.length; n++) {
          var j = neighbours[n];
          if (j < 0 || j >= placed.length || placed[j].isInvert) continue;
          latticeSvg.appendChild(svgEl("line", {
            x1: placed[i].x.toFixed(1), y1: placed[i].y.toFixed(1),
            x2: placed[j].x.toFixed(1), y2: placed[j].y.toFixed(1),
            stroke: "var(--cl-crystal-link)", "stroke-width": 1.6, opacity: 0.8
          }));
        }
      }

      for (i = 0; i < placed.length; i++) {
        if (placed[i].isInvert) {
          latticeSvg.appendChild(svgEl("circle", {
            cx: placed[i].x.toFixed(1), cy: placed[i].y.toFixed(1), r: 6,
            fill: "var(--cl-invert)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
          }));
        } else {
          latticeSvg.appendChild(svgEl("rect", {
            x: (placed[i].x - 5.5).toFixed(1), y: (placed[i].y - 5.5).toFixed(1),
            width: 11, height: 11, rx: 1.5,
            fill: "var(--cl-crystal)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
          }));
        }
      }

      /* What the cookie does when you bend it. */
      clear(bendSvg);
      var brittle = invert < 0.28;
      if (brittle) {
        /* Two pieces with a jagged break between them. */
        bendSvg.appendChild(svgEl("path", {
          d: "M 40 40 L 205 40 L 212 52 L 200 62 L 208 74 L 196 84 L 40 84 Z",
          fill: "var(--cl-dough)", stroke: "var(--cl-fat)", "stroke-width": 1.5
        }));
        bendSvg.appendChild(svgEl("path", {
          d: "M 420 40 L 255 40 L 248 52 L 260 62 L 252 74 L 264 84 L 420 84 Z",
          fill: "var(--cl-dough)", stroke: "var(--cl-fat)", "stroke-width": 1.5
        }));
      } else {
        /* One piece, curved. */
        bendSvg.appendChild(svgEl("path", {
          d: "M 40 34 Q 230 " + (34 + (invert - 0.28) * 150).toFixed(0) + " 420 34" +
             " L 420 78 Q 230 " + (78 + (invert - 0.28) * 150).toFixed(0) + " 40 78 Z",
          fill: "var(--cl-dough)", stroke: "var(--cl-fat)", "stroke-width": 1.5
        }));
      }

      /* Readouts. */
      valueLabel.textContent = Math.round(invert * 100) + "%";

      var latticeLine, textureLine;
      if (invert < 0.1) {
        latticeLine = "Almost every molecule is sucrose, and they settle into a large, " +
          "continuous ordered arrangement as the cookie cools.";
        textureLine = "Crisp and snapping. This is a white sugar cookie.";
      } else if (invert < 0.28) {
        latticeLine = "Enough sucrose is present to build ordered regions, though the invert " +
          "sugar is starting to break them up.";
        textureLine = "Still crisp, but less sharply so.";
      } else if (invert < 0.55) {
        latticeLine = "Too many molecules are the wrong shape to fit the lattice. Ordered " +
          "regions stay small and disconnected.";
        textureLine = "Bendy and chewy. This is what a high proportion of brown sugar gives you.";
      } else {
        latticeLine = "Barely any ordered arrangement forms at all. The sugar stays as a " +
          "disordered, syrupy phase.";
        textureLine = "Soft and sticky rather than chewy.";
      }

      readout.innerHTML =
        "<p><strong>As it cools.</strong> " + latticeLine + "</p>" +
        "<p><strong>When you bend it.</strong> " + textureLine + "</p>";
    }

    slider.addEventListener("input", update);
    update();
  }

  /* ---------------------------------------------------------------- */
  /* Start up                                                          */
  /* ---------------------------------------------------------------- */

  function start() {
    var sucroseRoot = document.getElementById("cl-sucrose");
    if (sucroseRoot) {
      buildSwitcher(sucroseRoot, SUCROSE_VIEWS, SUCROSE_CAPTIONS, SUCROSE_CONSEQUENCES, "whole");
    }

    var recRoot = document.getElementById("cl-recrystallize");
    if (recRoot) initRecrystallize(recRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
