/* leavening.js
   Visuals for the Leavening section of garden/tools/cookie-black-box.html.

     1. cl-powder   baking powder in its three stages: dry, wetted, heated
     2. cl-net      why gas alone does not make anything rise

   The first is the sequence the source document asks for. The second is the rule
   the document draws out of it, which turns out to explain bread, pancakes,
   cookies, and a collapsed souffle with one picture.
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

  function addText(parent, x, y, text, options) {
    options = options || {};
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

  /* ---------------------------------------------------------------- */
  /* 1. Baking powder, three stages                                    */
  /* ---------------------------------------------------------------- */
  /*
     Baking powder is not baking soda in another form. It is a mixture: sodium
     bicarbonate, one or more dry acids, and starch whose whole job is to keep the
     first two apart and dry in the tin. Add water and the acid and the bicarbonate
     can finally reach each other.
  */

  var POWDER_STAGES = {
    dry: {
      caption:
        "In the tin. The starch is not an inert filler. It holds the acid and the bicarbonate " +
        "apart and keeps them dry, which is the only reason a tin of baking powder does not " +
        "react with itself on the shelf.",
      readout:
        "<p><strong>Nothing is happening.</strong> The acid and the base are both present and " +
        "both capable of reacting, but they cannot reach each other through the starch, and there " +
        "is no water for the reaction to happen in.</p>"
    },
    wet: {
      caption:
        "The moment water arrives. The starch dissolves away, the acid and the bicarbonate meet " +
        "in solution, and carbon dioxide starts coming off.",
      readout:
        "<p><strong>The reaction.</strong> The bicarbonate ion takes a hydrogen ion from the " +
        "acid, which gives carbonic acid, and carbonic acid falls apart almost immediately into " +
        "water and carbon dioxide gas.</p>" +
        "<p>This is the first of baking powder's two actions. A double-acting powder holds a " +
        "second acid in reserve that needs heat before it will react, which is why the tin says " +
        "double acting and why such a powder is more forgiving of a slow cook.</p>"
    },
    hot: {
      caption:
        "In the oven. Existing bubbles grow, both because gas expands when heated and because " +
        "the second acid is now reacting. The structure around them firms up and fixes them in " +
        "place.",
      readout:
        "<p><strong>Expansion, then setting.</strong> The gas cells that already exist get " +
        "bigger. New ones are not easily made, so the number of holes in the finished crumb was " +
        "largely decided before the tray went in.</p>" +
        "<p>Whether any of it survives depends on the material around the bubbles, which is what " +
        "the next figure is about.</p>"
    }
  };

  function initPowder(root) {
    var svg = root.querySelector("svg");
    var caption = root.querySelector(".cl-caption");
    var readout = root.querySelector(".cl-readout");
    var buttons = root.querySelectorAll(".cl-preset");
    if (!svg) return;

    var rand = makeRandom(29);
    var particles = [];
    var i;
    for (i = 0; i < 34; i++) {
      particles.push({ x: 34 + rand() * 392, y: 30 + rand() * 108, kind: i % 2, r: 5 + rand() * 3 });
    }
    var bubbleSeeds = [];
    for (i = 0; i < 16; i++) {
      bubbleSeeds.push({ x: 40 + rand() * 380, y: 30 + rand() * 106, scale: 0.6 + rand() * 0.8 });
    }

    function draw(stage) {
      clear(svg);

      svg.appendChild(svgEl("rect", {
        x: 0, y: 0, width: 460, height: 168,
        fill: stage === "dry" ? "var(--cl-powder-dry)" : "var(--cl-water-wash)"
      }));

      var j;

      if (stage === "dry") {
        /* Starch grains between everything else, holding the two reactants apart. */
        var randS = makeRandom(53);
        for (j = 0; j < 90; j++) {
          svg.appendChild(svgEl("circle", {
            cx: (24 + randS() * 412).toFixed(1),
            cy: (24 + randS() * 120).toFixed(1),
            r: (2 + randS() * 1.8).toFixed(1),
            fill: "var(--cl-flour)", opacity: 0.9
          }));
        }
      }

      /* Bicarbonate and acid particles. In the wet and hot stages the ones that
         have reacted are gone, replaced by bubbles. */
      var remaining = stage === "dry" ? 1 : (stage === "wet" ? 0.45 : 0.12);
      for (j = 0; j < particles.length; j++) {
        if (j / particles.length > remaining) continue;
        var p = particles[j];
        if (p.kind === 0) {
          svg.appendChild(svgEl("rect", {
            x: (p.x - p.r).toFixed(1), y: (p.y - p.r).toFixed(1),
            width: (p.r * 2).toFixed(1), height: (p.r * 2).toFixed(1), rx: 1.5,
            fill: "var(--cl-base)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
          }));
        } else {
          svg.appendChild(svgEl("circle", {
            cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: p.r.toFixed(1),
            fill: "var(--cl-acid)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1
          }));
        }
      }

      /* Carbon dioxide bubbles. */
      if (stage !== "dry") {
        var grow = stage === "wet" ? 1 : 2.5;
        for (j = 0; j < bubbleSeeds.length; j++) {
          var b = bubbleSeeds[j];
          svg.appendChild(svgEl("circle", {
            cx: b.x.toFixed(1), cy: b.y.toFixed(1),
            r: (5 * b.scale * grow).toFixed(1),
            fill: "var(--cl-air)", opacity: 0.85,
            stroke: "var(--cl-atom-stroke)", "stroke-width": 1
          }));
        }
      }

      /* The equation, written where the reaction is happening. */
      if (stage === "wet") {
        addText(svg, 230, 158, "HCO₃⁻  +  H⁺   →   H₂CO₃   →   H₂O  +  CO₂↑",
          { mono: true, size: 13, fill: "var(--accent)", weight: 500 });
      }

      caption.textContent = POWDER_STAGES[stage].caption;
      readout.innerHTML = POWDER_STAGES[stage].readout;
      for (j = 0; j < buttons.length; j++) {
        buttons[j].setAttribute("aria-pressed", String(buttons[j].dataset.stage === stage));
      }
    }

    for (i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener("click", function () { draw(button.dataset.stage); });
      })(buttons[i]);
    }

    draw("dry");
  }

  /* ---------------------------------------------------------------- */
  /* 2. Gas needs a net                                                */
  /* ---------------------------------------------------------------- */
  /*
     Producing gas is the easy half. A food rises only when the gas arrives while
     the material around it can still stretch, and the material then sets before the
     gas escapes. Two timings decide everything: how fast the gas comes, and how
     soon the structure firms.

     Set too early and the bubbles never get to grow. Set too late and they merge
     into a few large voids and break the surface. Get the two in step and you have
     bread. This one rule covers every risen food in the document.
  */

  var NET_PRESETS = {
    bread: { gas: 26, set: 82,
      label: "Bread",
      note: "Yeast releases carbon dioxide slowly over hours, and a strong gluten network " +
            "stretches around it the whole time without tearing. The crumb sets late, once the " +
            "cells have grown as far as they are going to." },
    pancake: { gas: 70, set: 55,
      label: "Pancake",
      note: "Chemical leavening delivers its gas quickly, and a batter of egg and hydrated " +
            "starch sets soon after. Fast gas caught by a fast set gives the open, holey crumb " +
            "of a pancake." },
    cookie: { gas: 34, set: 30,
      label: "Cookie",
      note: "A cookie has a deliberately weak network and butter that melts early, so little gas " +
            "is generated and the dough firms before much of it can be caught. It spreads outward " +
            "instead of rising, which is the whole design." },
    /* A souffle's failure is late setting, not early. Its foam expands beautifully
       and then has nothing rigid holding it when the gas cools and contracts. */
    souffle: { gas: 80, set: 92,
      label: "Collapsed souffle",
      note: "Plenty of gas expanded, and the structure stayed soft the whole time instead of " +
            "firming around it. The moment it leaves the oven and the gas cools and contracts, " +
            "nothing is holding the shape and the whole thing sinks." }
  };

  function initNet(root) {
    var svg = root.querySelector("svg");
    var gasSlider = root.querySelector("[data-slider='gas']");
    var setSlider = root.querySelector("[data-slider='set']");
    var readout = root.querySelector(".cl-readout");
    var buttons = root.querySelectorAll(".cl-preset");
    if (!svg || !gasSlider) return;

    var rand = makeRandom(37);
    var cells = [];
    var i;
    for (i = 0; i < 22; i++) {
      cells.push({ x: 42 + rand() * 376, y: 34 + rand() * 96, scale: 0.55 + rand() * 0.9 });
    }

    function update() {
      var gas = Number(gasSlider.value) / 100;
      var setTime = Number(setSlider.value) / 100;

      /*
         How big a cell gets is how much gas arrived before the structure locked.
         Gas keeps coming after that, but once the walls are rigid it has nowhere
         to go and either stays compressed or forces its way out.
      */
      var grown = gas * setTime * 3.2;
      if (grown > 1.25) grown = 1.25;

      /* Cells that grow too far without a wall to stop them run together. */
      var merging = gas > 0.55 && setTime > 0.78;
      var escaped = gas > 0.6 && setTime < 0.3;

      clear(svg);
      svg.appendChild(svgEl("rect", {
        x: 0, y: 0, width: 460, height: 164, fill: "var(--cl-dough)"
      }));

      for (i = 0; i < cells.length; i++) {
        var c = cells[i];
        var r = 6 + grown * 15 * c.scale;
        if (merging && i % 3 === 0) r *= 1.9;
        svg.appendChild(svgEl("circle", {
          cx: c.x.toFixed(1), cy: c.y.toFixed(1), r: r.toFixed(1),
          fill: "var(--cl-air)",
          stroke: "var(--cl-fat)", "stroke-width": 1.2,
          opacity: 0.9
        }));
      }

      /* Rising and falling arrows, showing whether the gas is being held. */
      if (escaped) {
        for (i = 0; i < 5; i++) {
          var ax = 70 + i * 82;
          svg.appendChild(svgEl("path", {
            d: "M " + ax + " 30 L " + ax + " 8 M " + (ax - 5) + " 15 L " + ax + " 8 L " + (ax + 5) + " 15",
            fill: "none", stroke: "var(--ink-faint)", "stroke-width": 2, "stroke-linecap": "round"
          }));
        }
      }

      root.querySelector("[data-value='gas']").textContent =
        gas < 0.33 ? "slow" : (gas < 0.66 ? "moderate" : "fast");
      root.querySelector("[data-value='set']").textContent =
        setTime < 0.33 ? "early" : (setTime < 0.66 ? "partway through" : "late");

      var line;
      if (setTime < 0.25) {
        line = "The structure firms almost immediately, so the gas cells never get a chance to " +
          "grow. Whatever gas arrives afterwards has nowhere to go. The result is dense and " +
          "close-textured however much gas is produced.";
      } else if (escaped) {
        line = "Gas is arriving faster than the structure can catch it, and it is leaving " +
          "through the surface. Producing more gas does not help when nothing is holding it.";
      } else if (merging) {
        line = "The structure stays soft for so long that neighbouring cells run into each other " +
          "and become a few large irregular voids. The crumb is uneven and can collapse.";
      } else if (grown < 0.35) {
        line = "Very little gas has arrived before the structure firmed. Dense and flat.";
      } else {
        line = "Gas arrives while the material can still stretch, and the material sets around it " +
          "before it escapes. The cells are held at the size they reached. This is what rising " +
          "actually is.";
      }

      readout.innerHTML = "<p><strong>What happens.</strong> " + line + "</p>";
    }

    function applyPreset(name) {
      var preset = NET_PRESETS[name];
      gasSlider.value = preset.gas;
      setSlider.value = preset.set;
      for (var k = 0; k < buttons.length; k++) {
        buttons[k].setAttribute("aria-pressed", String(buttons[k].dataset.preset === name));
      }
      update();
      readout.innerHTML = "<p>" + preset.note + "</p>" + readout.innerHTML;
    }

    for (i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener("click", function () { applyPreset(button.dataset.preset); });
      })(buttons[i]);
    }

    function clearPresets() {
      for (var k = 0; k < buttons.length; k++) buttons[k].setAttribute("aria-pressed", "false");
      update();
    }
    gasSlider.addEventListener("input", clearPresets);
    setSlider.addEventListener("input", clearPresets);

    applyPreset("cookie");
  }

  function start() {
    var powderRoot = document.getElementById("cl-powder");
    if (powderRoot) initPowder(powderRoot);

    var netRoot = document.getElementById("cl-net");
    if (netRoot) initNet(netRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
