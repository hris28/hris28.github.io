/* ph.js
   Visuals for the pH section of garden/tools/cookie-black-box.html.

     1. cl-reducing   what makes a sugar reducing, shown as the ring form of
                      glucose opening into a chain with a reactive end       (3D)
     2. cl-browning   pH, the availability of amino groups, and how fast
                      browning runs                                          (2D)

   The first answers the source document's question about what "reducing sugar"
   means. The second answers why baking soda browns a cookie more strongly, which
   turns out to have nothing to do with the gas it produces.
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
  /* 1. Ring and open chain                                            */
  /* ---------------------------------------------------------------- */
  /*
     Glucose in solution is mostly a closed ring, but a small proportion of it is
     open at any moment, and the open form carries a carbonyl group, a carbon
     double-bonded to an oxygen at the end of the chain. That exposed carbonyl is
     what an amino group can attack, and having one available is what "reducing"
     means.

     Sucrose has no such open form. The carbon that would carry the carbonyl is the
     one tied up in the link between its two halves. Break that link and both halves
     become reducing, which is why invert sugar browns more readily than table
     sugar does.
  */

  var RING_VIEW = {
    description:
      "Glucose as a closed six-sided ring. Every carbon is bonded to its neighbours and to " +
      "oxygen atoms, and there is no exposed reactive end.",
    rx: -0.28,
    ry: 0.45,
    atoms: [
      { el: "C", x: 1.25, y: 0.72, z: 0.25 },
      { el: "C", x: 0, y: 1.44, z: -0.25 },
      { el: "C", x: -1.25, y: 0.72, z: 0.25 },
      { el: "C", x: -1.25, y: -0.72, z: -0.25 },
      { el: "C", x: 0, y: -1.44, z: 0.25 },
      { el: "O", x: 1.25, y: -0.72, z: -0.25 },
      { el: "O", x: 2.45, y: 1.40, z: 0.60 },
      { el: "O", x: 0, y: 2.75, z: -0.85 },
      { el: "O", x: -2.45, y: 1.45, z: 0.55 },
      { el: "O", x: -2.45, y: -1.45, z: -0.55 },
      { el: "C", x: 0, y: -2.90, z: 0.60 },
      { el: "O", x: 1.15, y: -3.65, z: 0.40 }
    ],
    bonds: [
      { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 },
      { a: 4, b: 5 }, { a: 5, b: 0 },
      { a: 0, b: 6 }, { a: 1, b: 7 }, { a: 2, b: 8 }, { a: 3, b: 9 },
      { a: 4, b: 10 }, { a: 10, b: 11 }
    ]
  };

  /* The same six carbons, straightened out. The ring oxygen has let go, and the
     first carbon now carries a double-bonded oxygen. Chain drawn as a flat zigzag,
     carbon to carbon 1.27 A along the axis with 0.44 A of alternating offset. */
  var OPEN_VIEW = {
    description:
      "The same glucose molecule with its ring opened. The chain of six carbons is now straight, " +
      "and the carbon at one end carries an oxygen joined by a double bond. That end is the " +
      "reactive one.",
    rx: -0.12,
    ry: 0.2,
    atoms: [
      { el: "C", x: 0, y: 0.44, z: 0, note: "reactive end", noteDx: 0, noteDy: 3.1 },
      { el: "C", x: 1.27, y: -0.44, z: 0 },
      { el: "C", x: 2.54, y: 0.44, z: 0 },
      { el: "C", x: 3.81, y: -0.44, z: 0 },
      { el: "C", x: 5.08, y: 0.44, z: 0 },
      { el: "C", x: 6.35, y: -0.44, z: 0 },
      { el: "O", x: -0.70, y: 1.50, z: 0 },
      { el: "O", x: 1.27, y: -1.87, z: 0 },
      { el: "O", x: 2.54, y: 1.87, z: 0 },
      { el: "O", x: 3.81, y: -1.87, z: 0 },
      { el: "O", x: 5.08, y: 1.87, z: 0 },
      { el: "O", x: 7.40, y: 0.35, z: 0.30 }
    ],
    bonds: [
      { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 },
      { a: 0, b: 6 }, { a: 1, b: 7 }, { a: 2, b: 8 }, { a: 3, b: 9 },
      { a: 4, b: 10 }, { a: 5, b: 11 }
    ]
  };

  var REDUCING_VIEWS = { ring: RING_VIEW, open: OPEN_VIEW };

  var REDUCING_CAPTIONS = {
    ring:
      "Hydrogen atoms are omitted. This is how most glucose in a solution sits at any given " +
      "moment, and in this form there is nothing for an amino group to attack.",
    open:
      "The ring closes when an oxygen partway along the chain reaches round and bonds to the " +
      "carbon at the end. That bond is easy to make and just as easy to break, so in water it does " +
      "both, over and over. Any given molecule spends its time flipping between the two forms, and " +
      "at any instant a small proportion of them are open. The oxygen at the end is joined to its " +
      "carbon by a double bond, which pulls electrons away from that carbon and leaves it open to " +
      "attack."
  };

  var REDUCING_CONSEQUENCES = {
    ring:
      "Sucrose is permanently stuck in something like this state, because the carbon that would " +
      "carry the reactive end is the one tied up in the link joining its glucose half to its " +
      "fructose half. That is why table sugar is not a reducing sugar and does not readily take " +
      "part in Maillard browning.",
    open:
      "This exposed end is what makes a sugar reducing. Glucose and fructose both have one, so " +
      "invert sugar browns far more readily than sucrose does. It is one of the reasons a brown " +
      "sugar cookie takes on colour sooner than a white sugar one."
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
  /* 2. pH and browning                                                */
  /* ---------------------------------------------------------------- */
  /*
     The Maillard reaction begins with an amino group attacking the carbonyl carbon
     of a reducing sugar. An amino group can only do that while it is uncharged.
     In acid conditions it picks up a spare hydrogen ion and becomes positively
     charged, and a charged group is far less willing to attack anything.

     So the acidity of the dough decides what proportion of its amino groups are in
     a state to react at all. Raising the pH frees more of them, which is the actual
     reason baking soda browns a cookie more strongly. It has nothing to do with the
     gas.
  */

  function initBrowning(root) {
    var svg = root.querySelector("svg");
    var slider = root.querySelector("[data-slider='ph']");
    var readout = root.querySelector(".cl-readout");
    if (!svg || !slider) return;

    var GROUPS = [];
    (function seed() {
      var s = 7;
      function rand() { s = (s * 16807) % 2147483647; return s / 2147483647; }
      var cols = 8, rows = 3;
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          GROUPS.push({
            x: 44 + c * 48 + (rand() - 0.5) * 12,
            y: 46 + r * 34 + (rand() - 0.5) * 10
          });
        }
      }

      /* Positions shuffled, then thresholds handed out in even steps. Drawing the
         thresholds at random instead left the visible count wandering well away
         from the calculated fraction at this sample size, so the picture disagreed
         with the number written beside it. */
      for (var i = GROUPS.length - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1));
        var swap = GROUPS[i];
        GROUPS[i] = GROUPS[j];
        GROUPS[j] = swap;
      }
      for (var k = 0; k < GROUPS.length; k++) {
        GROUPS[k].roll = (k + 0.5) / GROUPS.length;
      }
    })();

    /* Amino groups on a protein have pKa values around 9 to 10, so at bread and
       cookie pH values most of them are protonated and only a small share is free.
       Raising the pH toward 9 frees a great deal more of them. */
    function freeFraction(pH) {
      var pKa = 9.3;
      return 1 / (1 + Math.pow(10, pKa - pH));
    }

    function update() {
      var pH = Number(slider.value) / 10;
      var free = freeFraction(pH);
      /*
         Scaled so that the visible field changes usefully across the pH values a
         dough actually reaches. The true fraction at pH 6 is a fraction of a
         percent, which would show as an empty field and read as "no browning at
         all". Browning at pH 6 is slow rather than absent, and the figure has to
         say that.
      */
      var shown = Math.pow(free, 0.30);

      clear(svg);

      var i, freeCount = 0;
      for (i = 0; i < GROUPS.length; i++) {
        var g = GROUPS[i];
        var isFree = g.roll < shown;
        if (isFree) freeCount++;

        svg.appendChild(svgEl("circle", {
          cx: g.x.toFixed(1), cy: g.y.toFixed(1), r: 12,
          fill: isFree ? "var(--cl-amino-free)" : "var(--cl-amino-blocked)",
          stroke: "var(--cl-atom-stroke)", "stroke-width": 1.2
        }));

        var label = svgEl("text", {
          x: g.x.toFixed(1), y: (g.y + 4).toFixed(1),
          "text-anchor": "middle",
          "font-family": "var(--font-mono)", "font-size": 10,
          fill: "var(--cl-atom-ink)"
        });
        label.textContent = isFree ? "NH₂" : "NH₃⁺";
        svg.appendChild(label);
      }

      /* A strip showing the colour the cookie ends up. */
      var brown = shown;
      svg.appendChild(svgEl("rect", {
        x: 40, y: 158, width: 380, height: 26, rx: 4,
        fill: "var(--cl-dough)"
      }));
      svg.appendChild(svgEl("rect", {
        x: 40, y: 158, width: 380, height: 26, rx: 4,
        fill: "var(--cl-browned)", opacity: (0.15 + brown * 0.85).toFixed(2)
      }));
      var strip = svgEl("text", {
        x: 230, y: 176, "text-anchor": "middle",
        "font-family": "var(--font-sans)", "font-size": 12, fill: "var(--ink-faint)"
      });
      strip.textContent = "the colour the cookie takes on";
      svg.appendChild(strip);

      root.querySelector("[data-value='ph']").textContent = pH.toFixed(1);

      var context;
      if (pH < 5.2) context = "More acidic than most doughs. Buttermilk is around here.";
      else if (pH < 6.6) context = "A dough with acid in it and no soda to neutralize it.";
      else if (pH < 7.6) context = "About where a plain dough sits.";
      else if (pH < 8.6) context = "A dough with baking soda in it, some of which is left over " +
        "after the available acid has been used up.";
      else context = "Strongly alkaline. Past this point the flavour turns soapy and metallic, " +
        "and browning becomes excessive rather than desirable.";

      var pct = Math.round(freeCount / GROUPS.length * 100);

      readout.innerHTML =
        "<p><strong>Acidity.</strong> pH " + pH.toFixed(1) + ". " + context + "</p>" +
        "<p><strong>Amino groups free to react.</strong> Roughly " + pct + " percent of those " +
        "shown. The rest have picked up a spare hydrogen ion, which leaves them positively " +
        "charged and unwilling to attack anything.</p>" +
        "<p><strong>Browning.</strong> " +
        (pct < 20 ? "Slow. The cookie stays pale even after a long bake."
          : pct < 55 ? "Moderate. Colour develops steadily through the bake."
          : "Fast. The cookie takes on colour early and can be dark before it is cooked through.") +
        "</p>";
    }

    slider.addEventListener("input", update);
    update();
  }

  function start() {
    var reducingRoot = document.getElementById("cl-reducing");
    if (reducingRoot) {
      buildSwitcher(reducingRoot, REDUCING_VIEWS, REDUCING_CAPTIONS, REDUCING_CONSEQUENCES, "ring");
    }

    var browningRoot = document.getElementById("cl-browning");
    if (browningRoot) initBrowning(browningRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
