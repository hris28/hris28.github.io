/* flour.js
   Visuals for the Flour section of garden/tools/cookie-black-box.html.

     1. cl-gluten   wheat proteins hydrating and linking into a network, under
                    three controls: available water, mixing, and protein content
     2. cl-starch   starch granules taking up water and swelling, and how far
                    dissolved sugar pushes the temperature that takes

   Both are 2D. The gluten figure runs the same connectivity test as the fat
   crystal figure in the Fat section, because it is the same question: dispersed
   pieces resist nothing, and a connected path resists a great deal.

   GELATINIZATION NUMBERS
   Wheat starch in water begins to gelatinize at about 60.8 degrees Celsius.
   Dissolved sucrose raises that: roughly 3.5 degrees at 0.5 molar and roughly
   28.9 degrees at 2.0 molar. Those figures are measured values, and the slider
   below interpolates between them.
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
  /* 1. The gluten network                                             */
  /* ---------------------------------------------------------------- */
  /*
     Three things have to happen before wheat protein becomes gluten. The protein
     has to be there, water has to reach it so that it can unfold, and mixing has
     to bring the unfolded chains into contact often enough for them to link.
     Removing any one of the three stops the network forming, which is why a cookie
     dough, a bread dough, and a pancake batter made from the same flour end up
     completely different materials.
  */

  var PROTEIN_SITES = [];
  (function seedSites() {
    var rand = makeRandom(11);
    var cols = 10, rows = 5;
    var cellW = 400 / cols, cellH = 130 / rows;
    var c, r;
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        PROTEIN_SITES.push({
          x: 30 + c * cellW + cellW * (0.2 + rand() * 0.6),
          y: 20 + r * cellH + cellH * (0.2 + rand() * 0.6),
          phase: rand() * Math.PI * 2
        });
      }
    }
    /* Shuffled, so that lowering the protein content thins the field evenly
       instead of clearing one end of it. */
    for (var i = PROTEIN_SITES.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var swap = PROTEIN_SITES[i];
      PROTEIN_SITES[i] = PROTEIN_SITES[j];
      PROTEIN_SITES[j] = swap;
    }
  })();

  var GLUTEN_PRESETS = {
    /* Cookie dough is not gluten-free. It has enough network to hold together and
       to chew, and not enough to go bready. The settings have to land in that
       middle band rather than at zero. */
    cookie: { water: 34, mixing: 40, protein: 45,
      note: "Cookie dough. Little free water, because sugar and fat have taken most of it, and " +
            "mixed only until it comes together." },
    bread: { water: 88, mixing: 88, protein: 78,
      note: "Bread dough. Plenty of water, strong flour, and kneaded deliberately to build the " +
            "network as far as it will go." },
    pancake: { water: 95, mixing: 15, protein: 40,
      note: "Pancake batter. Wet enough for the protein to hydrate fully, but barely stirred, so " +
            "the chains never get the contact they need to link up." }
  };

  function initGluten(root) {
    var svg = root.querySelector("svg");
    var sliders = {
      water: root.querySelector("[data-slider='water']"),
      mixing: root.querySelector("[data-slider='mixing']"),
      protein: root.querySelector("[data-slider='protein']")
    };
    var readout = root.querySelector(".cl-readout");
    var buttons = root.querySelectorAll(".cl-preset");
    if (!svg || !sliders.water) return;

    var LINK_DISTANCE = 74;

    function connectivity(active) {
      var parent = [], i, j;
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
          if (Math.sqrt(dx * dx + dy * dy) <= LINK_DISTANCE) links.push([i, j]);
        }
      }

      /* Mixing decides how many of the possible contacts actually became links.
         Without it the chains are near each other but never brought together. */
      var kept = Math.round(links.length * activeMixing);
      links = links.slice(0, kept);
      for (i = 0; i < links.length; i++) union(links[i][0], links[i][1]);

      var extents = {};
      for (i = 0; i < active.length; i++) {
        var root2 = find(i);
        if (!extents[root2]) extents[root2] = { min: active[i].x, max: active[i].x, n: 0 };
        if (active[i].x < extents[root2].min) extents[root2].min = active[i].x;
        if (active[i].x > extents[root2].max) extents[root2].max = active[i].x;
        extents[root2].n++;
      }
      var widest = 0, biggest = 0;
      for (var key in extents) {
        if (Object.prototype.hasOwnProperty.call(extents, key)) {
          var w = extents[key].max - extents[key].min;
          if (w > widest) widest = w;
          if (extents[key].n > biggest) biggest = extents[key].n;
        }
      }
      return { links: links, spans: widest > 400 * 0.72, biggest: biggest };
    }

    var activeMixing = 0.5;

    function update() {
      var water = Number(sliders.water.value) / 100;
      var mixing = Number(sliders.mixing.value) / 100;
      var protein = Number(sliders.protein.value) / 100;
      activeMixing = mixing;

      /*
         How many chains are present at all, and how many of those water has
         reached and unfolded. Only hydrated chains can link.

         Neither slider runs all the way to zero in its effect. Even cake flour
         has protein in it, and even a dry cookie dough hydrates a good share of
         what protein it has. What separates a cookie from a bread is not that one
         has no network but that one has a broken one.
      */
      var present = Math.round((0.35 + protein * 0.65) * PROTEIN_SITES.length);
      var hydratedCount = Math.round(present * (0.15 + water * 0.85));
      var hydrated = PROTEIN_SITES.slice(0, hydratedCount);
      var dry = PROTEIN_SITES.slice(hydratedCount, present);

      var result = connectivity(hydrated);

      clear(svg);

      var i;
      for (i = 0; i < result.links.length; i++) {
        var a = hydrated[result.links[i][0]];
        var b = hydrated[result.links[i][1]];
        svg.appendChild(svgEl("line", {
          x1: a.x.toFixed(1), y1: a.y.toFixed(1), x2: b.x.toFixed(1), y2: b.y.toFixed(1),
          stroke: result.spans ? "var(--cl-gluten-link)" : "var(--cl-bond)",
          "stroke-width": result.spans ? 2.4 : 1.5,
          opacity: result.spans ? 0.9 : 0.55
        }));
      }

      /* Dry chains stay folded up, drawn as small tight coils. Hydrated ones have
         opened out, drawn as longer squiggles. */
      for (i = 0; i < dry.length; i++) {
        svg.appendChild(svgEl("circle", {
          cx: dry[i].x.toFixed(1), cy: dry[i].y.toFixed(1), r: 4.5,
          fill: "var(--cl-protein-blocked)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
        }));
      }
      for (i = 0; i < hydrated.length; i++) {
        var p = hydrated[i];
        var d = "M " + (p.x - 9).toFixed(1) + " " + p.y.toFixed(1);
        for (var k = 1; k <= 4; k++) {
          d += " L " + (p.x - 9 + k * 4.5).toFixed(1) + " " +
               (p.y + (k % 2 === 0 ? -3.5 : 3.5)).toFixed(1);
        }
        svg.appendChild(svgEl("path", {
          d: d, fill: "none", stroke: "var(--cl-chain-protein)",
          "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round"
        }));
      }

      root.querySelector("[data-value='water']").textContent = Math.round(water * 100) + "%";
      root.querySelector("[data-value='mixing']").textContent = Math.round(mixing * 100) + "%";
      root.querySelector("[data-value='protein']").textContent =
        (7 + protein * 7).toFixed(1) + "% protein";

      var missing = null;
      if (protein < 0.16) missing = "protein";
      else if (water < 0.16) missing = "water";
      else if (mixing < 0.12) missing = "mixing";

      var line;
      if (missing === "protein") {
        line = "There is barely any gluten-forming protein present to begin with, so nothing can " +
          "form however wet the dough is or however long it is mixed.";
      } else if (missing === "water") {
        line = "The protein is there but almost none of it has been reached by water, so the " +
          "chains stay folded up and cannot link to anything. Mixing harder does not help.";
      } else if (missing === "mixing") {
        line = "The chains are hydrated and unfolded, but they are never brought into contact " +
          "often enough to link. They sit near each other doing nothing.";
      } else if (result.spans) {
        line = "A continuous network reaches right across the dough. It can stretch around gas " +
          "and hold it, and it resists being pulled apart. This is bread behaviour.";
      } else if (result.biggest >= 4) {
        line = "Patches of network have formed but they do not join up. The dough holds together " +
          "and has some chew without becoming elastic. This is what a cookie wants.";
      } else {
        line = "Only isolated pairs and small clusters. The dough is tender and short, and will " +
          "crumble rather than stretch.";
      }

      readout.innerHTML = "<p><strong>What has formed.</strong> " + line + "</p>";
    }

    function applyPreset(name) {
      var preset = GLUTEN_PRESETS[name];
      sliders.water.value = preset.water;
      sliders.mixing.value = preset.mixing;
      sliders.protein.value = preset.protein;
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("aria-pressed", String(buttons[i].dataset.preset === name));
      }
      update();
      /* The preset's own description goes above whatever update() worked out, so
         the reader knows which dough they are looking at. */
      readout.innerHTML = "<p>" + preset.note + "</p>" + readout.innerHTML;
    }

    for (var i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener("click", function () { applyPreset(button.dataset.preset); });
      })(buttons[i]);
    }

    var key;
    for (key in sliders) {
      if (sliders[key]) {
        sliders[key].addEventListener("input", function () {
          for (var k = 0; k < buttons.length; k++) buttons[k].setAttribute("aria-pressed", "false");
          update();
        });
      }
    }

    applyPreset("cookie");
  }

  /* ---------------------------------------------------------------- */
  /* 2. Starch gelatinization                                          */
  /* ---------------------------------------------------------------- */

  /* Measured values for wheat starch: 60.8 C in water, rising about 3.5 C at
     0.5 molar sucrose and about 28.9 C at 2.0 molar. */
  var BASE_ONSET = 60.8;

  function sucroseShift(molar) {
    if (molar <= 0) return 0;
    /* Straight line through the two measured points. */
    var shift = 16.9 * molar - 4.95;
    return shift < 0 ? 0 : shift;
  }

  function initStarch(root) {
    var svg = root.querySelector("svg");
    var tempSlider = root.querySelector("[data-slider='temp']");
    var sugarSlider = root.querySelector("[data-slider='sugar']");
    var readout = root.querySelector(".cl-readout");
    if (!svg || !tempSlider) return;

    var granules = [
      { x: 68, y: 82 }, { x: 160, y: 74 }, { x: 250, y: 86 },
      { x: 340, y: 72 }, { x: 420, y: 88 }
    ];

    function update() {
      var tempC = Number(tempSlider.value);
      var molar = Number(sugarSlider.value) / 100 * 2;
      var onset = BASE_ONSET + sucroseShift(molar);

      /* How far past the onset the temperature has climbed, capped. */
      var progress = (tempC - onset) / 22;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      clear(svg);

      var i;
      for (i = 0; i < granules.length; i++) {
        var g = granules[i];
        var radius = 20 + progress * 17;

        svg.appendChild(svgEl("circle", {
          cx: g.x, cy: g.y, r: radius.toFixed(1),
          fill: "var(--cl-flour)",
          stroke: "var(--cl-atom-stroke)",
          "stroke-width": 1.2
        }));

        /* The ordered internal structure, which fades as the granule takes up
           water and its arrangement breaks down. */
        var order = 1 - progress;
        if (order > 0.02) {
          var rings = 3;
          for (var k = 1; k <= rings; k++) {
            svg.appendChild(svgEl("circle", {
              cx: g.x, cy: g.y, r: (radius * k / (rings + 1)).toFixed(1),
              fill: "none",
              stroke: "var(--cl-starch-order)",
              "stroke-width": 1.4,
              opacity: (order * 0.9).toFixed(2)
            }));
          }
        }

        /* Starch leaching out once the granule has opened up. */
        if (progress > 0.55) {
          var leak = (progress - 0.55) / 0.45;
          for (var m = 0; m < 4; m++) {
            var ang = (m / 4) * Math.PI * 2 + i;
            svg.appendChild(svgEl("circle", {
              cx: (g.x + Math.cos(ang) * (radius + 8 + leak * 10)).toFixed(1),
              cy: (g.y + Math.sin(ang) * (radius + 8 + leak * 10)).toFixed(1),
              r: 2.6,
              fill: "var(--cl-starch-order)",
              opacity: leak.toFixed(2)
            }));
          }
        }
      }

      root.querySelector("[data-value='temp']").textContent =
        tempC + " °C / " + Math.round(tempC * 9 / 5 + 32) + " °F";
      root.querySelector("[data-value='sugar']").textContent =
        molar === 0 ? "none" : molar.toFixed(2) + " molar";

      var onsetLine = "With this much sugar dissolved, the granules cannot begin taking up water " +
        "until about " + onset.toFixed(0) + " °C. In plain water the figure is " +
        BASE_ONSET.toFixed(0) + " °C.";

      var stateLine;
      if (progress <= 0) {
        stateLine = "Nothing is happening. The granules are still intact and ordered, and the " +
          "temperature has not reached the point where they can take up water.";
      } else if (progress < 0.4) {
        stateLine = "The granules have started to swell and their ordered structure is beginning " +
          "to break down.";
      } else if (progress < 0.8) {
        stateLine = "The granules are well swollen and much of their internal order has gone.";
      } else {
        stateLine = "The granules have swollen as far as they will go and starch is leaching out " +
          "into the surrounding liquid, which is what thickens a sauce.";
      }

      readout.innerHTML =
        "<p><strong>Where it starts.</strong> " + onsetLine + "</p>" +
        "<p><strong>What is happening.</strong> " + stateLine + "</p>";
    }

    tempSlider.addEventListener("input", update);
    sugarSlider.addEventListener("input", update);
    update();
  }

  /* ---------------------------------------------------------------- */
  /* Start up                                                          */
  /* ---------------------------------------------------------------- */

  function start() {
    var glutenRoot = document.getElementById("cl-gluten");
    if (glutenRoot) initGluten(glutenRoot);

    var starchRoot = document.getElementById("cl-starch");
    if (starchRoot) initStarch(starchRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
