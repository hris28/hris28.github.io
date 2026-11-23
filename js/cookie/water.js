/* water.js
   Visuals for the Water section of garden/tools/cookie-black-box.html.

   Four figures, each placed directly under the sentence it illustrates:

     1. cl-water-molecule   the water molecule, hydrogen bonding, and the
                            tetrahedral network water forms with itself
     2. cl-hydration        hydration shells around a sugar hydroxyl group, a
                            protein's charged region, and a starch chain at a
                            granule surface
     3. cl-water-budget     where a fixed amount of water ends up, and what that
                            does to flow, browning, and staling
     4. cl-glass            moisture, molecular mobility, and final texture

   The first two are 3D and use Mol3D from mol3d.js. The last two are 2D, because
   they show proportions and bulk behaviour rather than shape in space.

   MOLECULAR COORDINATES
   Positions are in Angstroms. Bond lengths and angles for water and for the
   hydrogen bonds are close to measured values: O-H is about 0.96 A, the H-O-H
   angle is about 104.5 degrees, and a hydrogen bond puts roughly 1.9 A between the
   hydrogen and the oxygen it points at. Larger structures are cut down to the part
   under discussion, and each caption says what was left out.
*/

(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* 1. Water molecule, hydrogen bond, and network                     */
  /* ---------------------------------------------------------------- */

  var MOLECULE_VIEWS = {
    single: {
      description:
        "A single water molecule. The oxygen atom sits at the centre with two hydrogen atoms " +
        "at an angle of about 105 degrees. The oxygen carries a partial negative charge and " +
        "each hydrogen a partial positive charge.",
      rx: -0.15,
      ry: 0.4,
      /* Drawn with the oxygen uppermost so the charge labels sit clear of the
         bonds. Bond length 0.96 A, H-O-H angle about 104.5 degrees. */
      atoms: [
        { el: "O", x: 0, y: 0.30, z: 0, note: "δ−", noteDx: 0, noteDy: -1.7 },
        { el: "H", x: 0.757, y: -0.287, z: 0, note: "δ+", noteDx: 1.3, noteDy: 1.9 },
        { el: "H", x: -0.757, y: -0.287, z: 0, note: "δ+", noteDx: -1.3, noteDy: 1.9 }
      ],
      bonds: [{ a: 0, b: 1 }, { a: 0, b: 2 }]
    },

    pair: {
      description:
        "Two water molecules joined by a hydrogen bond, drawn as a dashed line. A hydrogen on " +
        "the upper molecule points directly at the oxygen of the lower one.",
      rx: -0.1,
      ry: 0.35,
      atoms: [
        /* Lower molecule, accepting the bond. Its own hydrogens point away. */
        { el: "O", x: 0, y: 0, z: 0, note: "δ−", noteDx: -1.6, noteDy: 0.1 },
        { el: "H", x: 0.757, y: -0.587, z: 0 },
        { el: "H", x: -0.757, y: -0.587, z: 0 },
        /* Upper molecule, donating the bond through atom 4. */
        { el: "O", x: 0, y: 2.90, z: 0 },
        { el: "H", x: 0, y: 1.94, z: 0, note: "δ+", noteDx: 1.7, noteDy: 0.3 },
        { el: "H", x: 0.90, y: 3.25, z: 0.25 }
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 0, b: 2 },
        { a: 3, b: 4 }, { a: 3, b: 5 }
      ],
      hbonds: [{ a: 4, b: 0 }]
    },

    network: {
      description:
        "One water molecule hydrogen bonded to four neighbours arranged around it in a " +
        "tetrahedron. It donates two bonds through its own hydrogens and accepts two from " +
        "hydrogens on other molecules.",
      rx: -0.25,
      ry: 0.6,
      atoms: [
        /* Central molecule. Its two hydrogens point along two tetrahedral directions. */
        { el: "O", x: 0, y: 0, z: 0 },
        { el: "H", x: 0.554, y: 0.554, z: 0.554 },
        { el: "H", x: -0.554, y: 0.554, z: -0.554 },
        /* Two neighbours that accept a bond from the central molecule. */
        { el: "O", x: 1.645, y: 1.645, z: 1.645 },
        { el: "O", x: -1.645, y: 1.645, z: -1.645 },
        /* Two neighbours that donate a bond to the central molecule, each drawn with
           only the hydrogen involved in that bond. */
        { el: "O", x: 1.645, y: -1.645, z: -1.645 },
        { el: "H", x: 1.091, y: -1.091, z: -1.091 },
        { el: "O", x: -1.645, y: -1.645, z: 1.645 },
        { el: "H", x: -1.091, y: -1.091, z: 1.091 }
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 0, b: 2 },
        { a: 5, b: 6 }, { a: 7, b: 8 }
      ],
      hbonds: [
        { a: 1, b: 3 }, { a: 2, b: 4 },
        { a: 6, b: 0 }, { a: 8, b: 0 }
      ]
    }
  };

  var MOLECULE_CAPTIONS = {
    single:
      "Drag to rotate, or focus the diagram and use the arrow keys. δ− and δ+ mark partial " +
      "charges, meaning an uneven share of the shared electrons. They are not full ionic " +
      "charges, and the molecule as a whole is electrically neutral.",
    pair:
      "The dashed line is the hydrogen bond. It is an attraction between the partially " +
      "positive hydrogen and the partially negative oxygen, not a shared pair of electrons, " +
      "which is why it is far weaker than the solid bonds and breaks and reforms constantly.",
    network:
      "Neighbouring molecules are drawn with only the hydrogens involved in these bonds. Each " +
      "water molecule can donate two hydrogen bonds and accept two, which is the arrangement " +
      "everything else in the dough has to compete with."
  };

  /*
     Each view also carries a line tying it back to the cookie. A picture of three
     water molecules explains nothing on its own, and the jump from this scale to a
     tray of cookies is the part a reader cannot make unaided.
  */
  var MOLECULE_CONSEQUENCES = {
    single:
      "Because the charge is spread unevenly, water sticks to anything else whose charge is " +
      "also uneven. Sugar dissolves, salt dissolves, and the polar parts of flour protein " +
      "attract water for the same reason. Fat has no uneven charge to offer, which is why it " +
      "stays separate instead of mixing in.",
    pair:
      "One of these bonds is weak enough to break at room temperature on its own. There are " +
      "enough of them in a spoonful of dough that together they decide how freely it flows and " +
      "how much heat the oven has to spend driving the water back out.",
    network:
      "This is what water does when nothing else is present. Every dissolved sugar molecule, " +
      "protein chain, and starch granule in the dough competes with this arrangement, pulling " +
      "water out of it and into a shell of its own."
  };

  /* ---------------------------------------------------------------- */
  /* 2. Hydration shells                                               */
  /* ---------------------------------------------------------------- */

  var HYDRATION_VIEWS = {
    sugar: {
      description:
        "A hydroxyl group on a sugar molecule, with three water molecules hydrogen bonded to " +
        "it. One accepts a bond from the hydroxyl hydrogen and two donate bonds to the " +
        "hydroxyl oxygen.",
      rx: -0.15,
      ry: 0.45,
      atoms: [
        { el: "R", x: -1.5, y: 0, z: 0, label: "R" },
        { el: "C", x: 0, y: 0, z: 0 },
        { el: "O", x: 1.43, y: 0, z: 0, note: "−OH", noteDx: 0, noteDy: -1.6 },
        { el: "H", x: 1.727, y: 0.913, z: 0 },
        /* Water accepting the hydroxyl hydrogen. */
        { el: "O", x: 2.314, y: 2.720, z: 0 },
        { el: "H", x: 3.25, y: 3.05, z: 0.35 },
        { el: "H", x: 2.05, y: 3.35, z: -0.75 },
        /* Water donating to the hydroxyl oxygen. */
        { el: "O", x: 2.278, y: -2.262, z: 1.414 },
        { el: "H", x: 1.987, y: -1.486, z: 0.929 },
        { el: "H", x: 3.15, y: -2.55, z: 1.75 },
        /* Second water donating to the hydroxyl oxygen. */
        { el: "O", x: 1.993, y: -1.968, z: -1.912 },
        { el: "H", x: 1.800, y: -1.293, z: -1.256 },
        { el: "H", x: 2.85, y: -2.35, z: -2.25 }
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 },
        { a: 4, b: 5 }, { a: 4, b: 6 },
        { a: 7, b: 8 }, { a: 7, b: 9 },
        { a: 10, b: 11 }, { a: 10, b: 12 }
      ],
      hbonds: [
        { a: 3, b: 4 }, { a: 8, b: 2 }, { a: 11, b: 2 }
      ]
    },

    protein: {
      description:
        "A charged region on a protein, shown as a carboxylate group with two oxygen atoms " +
        "sharing a negative charge. Three water molecules point their hydrogens at those " +
        "oxygens.",
      rx: -0.12,
      ry: 0.4,
      atoms: [
        { el: "R", x: -1.5, y: 0, z: 0, label: "R" },
        { el: "C", x: 0, y: 0, z: 0 },
        { el: "O", x: 0.70, y: 1.04, z: 0, note: "−", noteDx: -1.5, noteDy: -0.8 },
        { el: "O", x: 0.70, y: -1.04, z: 0, note: "−", noteDx: -1.5, noteDy: 0.9 },
        /* Water donating to the upper oxygen. */
        { el: "O", x: 2.103, y: 3.426, z: 0.420 },
        { el: "H", x: 1.622, y: 2.608, z: 0.276 },
        { el: "H", x: 2.95, y: 3.85, z: 0.85 },
        /* Water donating to the lower oxygen. */
        { el: "O", x: 2.103, y: -3.426, z: -0.420 },
        { el: "H", x: 1.622, y: -2.608, z: -0.276 },
        { el: "H", x: 2.95, y: -3.85, z: -0.85 },
        /* Second water donating to the upper oxygen from another direction. */
        { el: "O", x: 0.14, y: 3.14, z: 1.764 },
        { el: "H", x: 0.332, y: 2.420, z: 1.159 },
        { el: "H", x: -0.75, y: 3.5, z: 2.2 }
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 1, b: 3 },
        { a: 4, b: 5 }, { a: 4, b: 6 },
        { a: 7, b: 8 }, { a: 7, b: 9 },
        { a: 10, b: 11 }, { a: 10, b: 12 }
      ],
      hbonds: [
        { a: 5, b: 2 }, { a: 8, b: 3 }, { a: 11, b: 2 }
      ]
    },

    starch: {
      description:
        "One glucose ring from a starch chain at the surface of a granule, with two of its " +
        "hydroxyl groups hydrogen bonded to water. The chain continues in both directions.",
      rx: -0.3,
      ry: 0.5,
      atoms: [
        /* Pyranose ring in a chair shape. Atom 5 is the ring oxygen. */
        { el: "C", x: 1.25, y: 0.72, z: 0.25 },
        { el: "C", x: 0, y: 1.44, z: -0.25 },
        { el: "C", x: -1.25, y: 0.72, z: 0.25 },
        { el: "C", x: -1.25, y: -0.72, z: -0.25 },
        { el: "C", x: 0, y: -1.44, z: 0.25 },
        { el: "O", x: 1.25, y: -0.72, z: -0.25 },
        /* The chain continuing on both sides. */
        { el: "R", x: 2.45, y: 1.40, z: 0.60, label: "…" },
        { el: "R", x: -2.45, y: -1.40, z: -0.60, label: "…" },
        /* Two hydroxyl groups. */
        { el: "O", x: 0, y: 2.75, z: -0.85 },
        { el: "H", x: 0.75, y: 3.25, z: -0.60 },
        { el: "O", x: -2.45, y: 1.45, z: 0.55 },
        { el: "H", x: -3.15, y: 0.95, z: 0.75 },
        /* Water accepting from the first hydroxyl. */
        { el: "O", x: 1.85, y: 4.60, z: -0.35 },
        { el: "H", x: 2.70, y: 4.85, z: -0.10 },
        { el: "H", x: 1.70, y: 5.35, z: -0.95 },
        /* Water donating to the second hydroxyl. */
        { el: "O", x: -4.00, y: 3.30, z: 1.60 },
        { el: "H", x: -3.434, y: 2.625, z: 1.217 },
        { el: "H", x: -4.85, y: 3.60, z: 1.20 }
      ],
      bonds: [
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 },
        { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 0 },
        { a: 0, b: 6 }, { a: 3, b: 7 },
        { a: 1, b: 8 }, { a: 8, b: 9 },
        { a: 2, b: 10 }, { a: 10, b: 11 },
        { a: 12, b: 13 }, { a: 12, b: 14 },
        { a: 15, b: 16 }, { a: 15, b: 17 }
      ],
      hbonds: [
        { a: 9, b: 12 }, { a: 16, b: 10 }
      ]
    }
  };

  var HYDRATION_CAPTIONS = {
    sugar:
      "Only one hydroxyl group is drawn. A single sucrose molecule carries eight of them, so " +
      "the shell shown here is repeated eight times over on every dissolved sugar molecule in " +
      "the dough.",
    protein:
      "The rest of the protein chain is cut away at the grey sphere. Water gathers wherever " +
      "the chain presents a charged or polar region, and those are the same regions the " +
      "protein would otherwise use to bond to another protein chain.",
    starch:
      "Hydrogen atoms on the ring carbons and the remaining hydroxyl groups are omitted. Water " +
      "here sits at the outside of the granule; getting inside it takes heat, which is what " +
      "gelatinization is."
  };

  var HYDRATION_CONSEQUENCES = {
    sugar:
      "Every water molecule caught in a shell like this is one that is no longer free to thin " +
      "the dough or evaporate quickly in the oven. It is why a dough high in sugar can hold " +
      "plenty of water and still behave like a stiff one.",
    protein:
      "Water gathering on regions like this is what lets flour protein chains unfold and reach " +
      "one another. Starve them of it, which is exactly what a dough high in sugar and fat " +
      "does, and the gluten network stays weak. That is what keeps a cookie tender rather than " +
      "bready.",
    starch:
      "This water is on the outside of the granule rather than in it. Getting inside takes heat " +
      "and spare water, and a cookie dough has little of either, so its starch never swells the " +
      "way it does in bread or a sauce. The cookie sets by drying and cooling instead."
  };

  /* ---------------------------------------------------------------- */
  /* Shared: wiring a figure that switches between several views       */
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
  /* 4. Glass transition                                               */
  /* ---------------------------------------------------------------- */
  /*
     Starch and protein chains in the cooled cookie, with water between them.
     Raising the moisture pushes the chains apart and lets them move, which is what
     carries the cookie from crisp through chewy to sticky. The three states match
     the table this figure sits beside.
  */

  function initGlass(root) {
    var svg = root.querySelector("svg");
    var slider = root.querySelector("[data-slider='moisture']");
    var valueLabel = root.querySelector("[data-value='moisture']");
    var readout = root.querySelector(".cl-readout");
    if (!svg || !slider) return;

    var NS = "http://www.w3.org/2000/svg";
    var W = 480, H = 220;
    var CHAIN_COUNT = 4;

    function update() {
      var m = Number(slider.value) / 100;

      while (svg.firstChild) svg.removeChild(svg.firstChild);

      /* Chains spread apart and grow wavier as water gets between them. */
      var spacing = 34 + m * 20;
      var amplitude = 5 + m * 11;
      var top = H / 2 - (spacing * (CHAIN_COUNT - 1)) / 2;

      var c;
      for (c = 0; c < CHAIN_COUNT; c++) {
        var y = top + c * spacing;
        var d = "M 24 " + y.toFixed(1);
        var x;
        for (x = 24; x <= W - 24; x += 16) {
          var wobble = Math.sin((x / 34) + c * 1.3) * amplitude;
          d += " L " + x + " " + (y + wobble).toFixed(1);
        }
        var path = document.createElementNS(NS, "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", c % 2 === 0 ? "var(--cl-chain-starch)" : "var(--cl-chain-protein)");
        path.setAttribute("stroke-width", "4");
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);
      }

      /* Water molecules sitting between the chains. Their number scales with
         moisture, and they are what is holding the chains apart. */
      var waterCount = Math.round(m * 26);
      var i;
      for (i = 0; i < waterCount; i++) {
        /* A fixed pseudo-random layout, so moving the slider adds and removes
           molecules rather than reshuffling all of them. */
        var seedX = ((i * 97) % 100) / 100;
        var seedY = ((i * 43) % 100) / 100;
        var wx = 34 + seedX * (W - 68);
        var gap = Math.floor(seedY * (CHAIN_COUNT - 1));
        var wy = top + gap * spacing + spacing * (0.3 + ((i * 29) % 40) / 100);

        var dot = document.createElementNS(NS, "circle");
        dot.setAttribute("cx", wx.toFixed(1));
        dot.setAttribute("cy", wy.toFixed(1));
        dot.setAttribute("r", "4.5");
        dot.setAttribute("fill", "var(--cl-atom-o)");
        dot.setAttribute("stroke", "var(--cl-atom-stroke)");
        dot.setAttribute("stroke-width", "1");
        svg.appendChild(dot);
      }
    }

    function describe(m) {
      if (m < 0.28) {
        return {
          state: "Low moisture, below the glass transition",
          mobility: "Low",
          texture: "Crisp, brittle, snapping",
          why: "Few water molecules sit between the chains, so the chains hold onto each other " +
            "directly and cannot slide. Bending the cookie breaks it rather than deforming it."
        };
      }
      if (m < 0.68) {
        return {
          state: "More moisture, above the glass transition",
          mobility: "Higher",
          texture: "Soft, flexible, chewy",
          why: "Water has worked between the chains and bonded to each of them separately. The " +
            "chains slide past one another instead of holding fixed positions, so the cookie " +
            "bends and stretches."
        };
      }
      return {
        state: "Very high moisture",
        mobility: "Much higher",
        texture: "Sticky, cake-like, or stale-feeling depending on structure",
        why: "There is now enough water that the chains are widely separated and barely " +
          "interacting. The matrix has lost most of its resistance."
      };
    }

    function refresh() {
      var m = Number(slider.value) / 100;
      update();
      var d = describe(m);
      if (valueLabel) valueLabel.textContent = d.state;
      if (readout) {
        readout.innerHTML =
          "<p><strong>Molecular mobility.</strong> " + d.mobility + "</p>" +
          "<p><strong>Texture.</strong> " + d.texture + "</p>" +
          "<p>" + d.why + "</p>";
      }
    }

    slider.addEventListener("input", refresh);
    refresh();
  }

  /* ---------------------------------------------------------------- */
  /* Start up                                                          */
  /* ---------------------------------------------------------------- */

  function start() {
    var moleculeRoot = document.getElementById("cl-water-molecule");
    if (moleculeRoot) {
      buildSwitcher(moleculeRoot, MOLECULE_VIEWS, MOLECULE_CAPTIONS, MOLECULE_CONSEQUENCES, "single");
    }

    var hydrationRoot = document.getElementById("cl-hydration");
    if (hydrationRoot) {
      buildSwitcher(hydrationRoot, HYDRATION_VIEWS, HYDRATION_CAPTIONS, HYDRATION_CONSEQUENCES, "sugar");
    }

    var glassRoot = document.getElementById("cl-glass");
    if (glassRoot) initGlass(glassRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
