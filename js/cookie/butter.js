/* butter.js
   Visuals for the Butter section of garden/tools/cookie-black-box.html.

     1. cl-creaming   what creaming actually does, and why it only works when the
                      butter is in the right state
     2. cl-coating    fat covering flour particles, and what that does to how much
                      water can reach the protein underneath

   Both are 2D. Neither is about the shape of a molecule; they are about how many
   of something there are and what is covering what.
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

  /* Park-Miller, the same generator used elsewhere on this page. Kept local so
     each figure gets a repeatable layout of its own. */
  function makeRandom(seed) {
    var s = seed;
    return function () {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  }

  /* ---------------------------------------------------------------- */
  /* 1. Creaming                                                       */
  /* ---------------------------------------------------------------- */
  /*
     Creaming is mechanical leavening. No gas is produced and no reaction happens.
     Sugar crystals have hard, sharp edges, and dragging them through semi-solid
     butter tears small voids that fill with air. Beating for longer means more
     passes, which means more voids and smaller ones.

     The reason the butter's state matters so much is that the process needs the
     fat to be plastic. Cold butter is too stiff for the crystals to be dragged
     through it at all. Melted butter has no structure to hold a void open, so any
     air beaten in escapes straight back out. Only softened butter, which is part
     crystal and part liquid, both yields to the crystal and holds the tear it
     leaves behind.
  */

  var CREAM_STATES = {
    cold: {
      /* How much air this state can hold at all, relative to softened butter. */
      capacity: 0.16,
      label: "cold, straight from the refrigerator",
      why:
        "The fat is too stiff for the sugar crystals to be dragged through it. They scrape " +
        "across the surface instead of cutting into the body of the butter, so very little air " +
        "goes in however long you beat."
    },
    soft: {
      capacity: 1,
      label: "softened, the state a recipe means by room temperature",
      why:
        "The fat is plastic, meaning soft enough for a sugar crystal to be pushed through it and " +
        "solid enough to hold the tear open afterwards. This is the only state in which creaming " +
        "does what it is for."
    },
    melted: {
      capacity: 0.03,
      label: "melted",
      why:
        "There is no solid structure left to hold a void open. Air beaten in rises back out " +
        "almost at once, so beating for longer changes nothing."
    }
  };

  function initCreaming(root) {
    var butterSvg = root.querySelector("[data-butter]");
    var cookieSvg = root.querySelector("[data-cookie]");
    var slider = root.querySelector("[data-slider='beat']");
    var timeLabel = root.querySelector("[data-value='beat']");
    var readout = root.querySelector(".cl-readout");
    var buttons = root.querySelectorAll(".cl-preset");
    if (!butterSvg || !slider) return;

    var state = "soft";

    /* Fixed positions for the sugar crystals, so that beating for longer adds air
       rather than shuffling the sugar around. */
    var rand = makeRandom(31);
    var sugar = [];
    var i;
    for (i = 0; i < 26; i++) {
      sugar.push({
        x: 16 + rand() * 428,
        y: 14 + rand() * 132,
        size: 4 + rand() * 3.5,
        angle: rand() * 90
      });
    }

    /* Air cell positions, drawn from the same generator so the layout is stable
       and raising the beating time reveals more of the same set. */
    var randAir = makeRandom(97);
    var airSites = [];
    for (i = 0; i < 60; i++) {
      airSites.push({ x: 14 + randAir() * 432, y: 12 + randAir() * 136, jitter: randAir() });
    }

    function airFraction(beat) {
      /* Saturating: the first few passes do most of the work, and after that each
         further pass adds less than the one before. */
      return CREAM_STATES[state].capacity * (1 - Math.exp(-beat * 2.6));
    }

    function update() {
      var beat = Number(slider.value) / 100;
      var air = airFraction(beat);

      clear(butterSvg);
      butterSvg.appendChild(svgEl("rect", {
        x: 0, y: 0, width: 460, height: 160, fill: "var(--cl-fat-wash)"
      }));

      /* Air cells go under the sugar, so the crystals read as sitting in the fat. */
      var count = Math.round(air * 46);
      /* More passes break the same amount of air into more, smaller cells. */
      var radius = 9 - beat * 4.2;
      for (i = 0; i < count && i < airSites.length; i++) {
        butterSvg.appendChild(svgEl("circle", {
          cx: airSites[i].x.toFixed(1),
          cy: airSites[i].y.toFixed(1),
          r: (radius * (0.7 + airSites[i].jitter * 0.6)).toFixed(1),
          fill: "var(--cl-air)",
          stroke: "var(--cl-atom-stroke)",
          "stroke-width": 0.8
        }));
      }

      for (i = 0; i < sugar.length; i++) {
        butterSvg.appendChild(svgEl("rect", {
          x: (sugar[i].x - sugar[i].size).toFixed(1),
          y: (sugar[i].y - sugar[i].size).toFixed(1),
          width: (sugar[i].size * 2).toFixed(1),
          height: (sugar[i].size * 2).toFixed(1),
          transform: "rotate(" + sugar[i].angle.toFixed(0) + " " +
            sugar[i].x.toFixed(1) + " " + sugar[i].y.toFixed(1) + ")",
          fill: "var(--cl-sugar)",
          stroke: "var(--cl-atom-stroke)",
          "stroke-width": 1
        }));
      }

      /*
         The baked cookie.

         Note the baseline. Even with no air beaten in at all, the cookie still
         rises, because steam from the dough's own water and carbon dioxide from
         the leavening agent are produced regardless of what the butter was doing.
         Creamed air adds to that rather than being the whole of it. An earlier
         version of this figure flattened the cookie to nothing at zero creamed
         air, which was wrong.
      */
      clear(cookieSvg);
      var BASE_RISE = 30;
      var height = BASE_RISE + air * 36;
      var halfWidth = 126 - air * 24;
      cookieSvg.appendChild(svgEl("line", {
        x1: 30, y1: 100, x2: 430, y2: 100, stroke: "var(--line)", "stroke-width": 2
      }));
      cookieSvg.appendChild(svgEl("path", {
        d: "M " + (230 - halfWidth) + " 99" +
           " Q " + (230 - halfWidth * 0.5) + " " + (99 - height) +
           " 230 " + (99 - height) +
           " Q " + (230 + halfWidth * 0.5) + " " + (99 - height) +
           " " + (230 + halfWidth) + " 99 Z",
        fill: "var(--cl-dough)", stroke: "var(--cl-fat)", "stroke-width": 1.5
      }));
      /* Holes inside the baked cookie. A few are always present, from the steam and
         carbon dioxide cells, and creamed air adds more on top of those. */
      var holes = 3 + Math.round(air * 14);
      var randHole = makeRandom(53);
      for (i = 0; i < holes; i++) {
        var hx = 230 - halfWidth * 0.66 + randHole() * halfWidth * 1.32;
        var hy = 99 - 8 - randHole() * (height - 18);
        cookieSvg.appendChild(svgEl("circle", {
          cx: hx.toFixed(1), cy: hy.toFixed(1),
          r: (2.5 + randHole() * 2.4).toFixed(1),
          fill: "var(--cl-air)", opacity: 0.75
        }));
      }
      var cookieLabel = svgEl("text", {
        x: 230, y: 122, "text-anchor": "middle",
        "font-family": "var(--font-sans)", "font-size": 12, fill: "var(--ink-faint)"
      });
      cookieLabel.textContent = "the cookie this dough bakes into";
      cookieSvg.appendChild(cookieLabel);

      /* Readouts. */
      var minutes = (beat * 6).toFixed(1);
      timeLabel.textContent = beat === 0 ? "not beaten" : minutes + " min";

      var airLine;
      if (air < 0.08) airLine = "Almost none.";
      else if (air < 0.35) airLine = "A little.";
      else if (air < 0.7) airLine = "A useful amount.";
      else airLine = "A great deal.";

      var ovenLine;
      if (air < 0.08) {
        ovenLine = "The cookie still rises, because steam and the leavening agent produce gas " +
          "whatever the butter was doing. What it lacks is the extra lift from beaten-in air, and " +
          "the few gas cells it does have are larger and further apart. The result is denser and " +
          "chewier, with a fudgy centre. This is why brownie recipes almost always call for " +
          "melted butter.";
      } else if (air < 0.35) {
        ovenLine = "A few beaten-in cells expand alongside the steam and carbon dioxide, so the " +
          "cookie lifts a little more than it otherwise would but stays close-textured.";
      } else if (air < 0.7) {
        ovenLine = "Plenty of small cells are spread through the dough for the steam and carbon " +
          "dioxide to expand into, and the setting structure holds them. The cookie is lighter " +
          "and taller without losing its chew.";
      } else {
        ovenLine = "So many cells expand that the cookie turns cakey rather than chewy. " +
          "Over-creaming is a real way to spoil a cookie, and it looks like success while you " +
          "are doing it.";
      }

      readout.innerHTML =
        "<p><strong>Butter state.</strong> " + CREAM_STATES[state].label + ". " +
        CREAM_STATES[state].why + "</p>" +
        "<p><strong>Air beaten in.</strong> " + airLine + "</p>" +
        "<p><strong>In the oven.</strong> " + ovenLine + "</p>";
    }

    for (i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener("click", function () {
          state = button.dataset.state;
          for (var k = 0; k < buttons.length; k++) {
            buttons[k].setAttribute("aria-pressed", String(buttons[k].dataset.state === state));
          }
          update();
        });
      })(buttons[i]);
    }

    slider.addEventListener("input", update);
    update();
  }

  /* ---------------------------------------------------------------- */
  /* 2. Fat coating the flour                                          */
  /* ---------------------------------------------------------------- */
  /*
     Flour proteins can only link into gluten once water has reached them. Fat
     spread over a flour particle puts a water-repelling layer between the two, so
     the protein underneath stays dry and never joins the network. More fat covers
     more of the surface, which is why a high-fat dough produces a tender crumb
     rather than a bready one.
  */

  function initCoating(root) {
    var svg = root.querySelector("svg");
    var slider = root.querySelector("[data-slider='fat']");
    var valueLabel = root.querySelector("[data-value='fat']");
    var readout = root.querySelector(".cl-readout");
    if (!svg || !slider) return;

    /* Four flour particles, each with protein sites round its edge. */
    var particles = [
      { x: 78, y: 84, r: 40 },
      { x: 190, y: 66, r: 32 },
      { x: 292, y: 92, r: 36 },
      { x: 390, y: 62, r: 28 }
    ];
    var SITES_PER_PARTICLE = 8;

    function update() {
      var fat = Number(slider.value) / 100;
      /* Even at the highest fat level some protein stays exposed, because the fat
         cannot reach every crevice of every particle. */
      var covered = fat * 0.86;

      clear(svg);

      var p, s, exposedTotal = 0, siteTotal = 0;
      for (p = 0; p < particles.length; p++) {
        var particle = particles[p];

        svg.appendChild(svgEl("circle", {
          cx: particle.x, cy: particle.y, r: particle.r,
          fill: "var(--cl-flour)", stroke: "var(--cl-atom-stroke)", "stroke-width": 1.2
        }));

        /* The fat film, drawn as an arc over the fraction of the edge it covers. */
        if (covered > 0.01) {
          var sweep = covered * Math.PI * 2;
          var startAngle = -Math.PI / 2;
          var endAngle = startAngle + sweep;
          var large = sweep > Math.PI ? 1 : 0;
          var rr = particle.r + 4;
          svg.appendChild(svgEl("path", {
            d: "M " + (particle.x + Math.cos(startAngle) * rr).toFixed(1) + " " +
               (particle.y + Math.sin(startAngle) * rr).toFixed(1) +
               " A " + rr + " " + rr + " 0 " + large + " 1 " +
               (particle.x + Math.cos(endAngle) * rr).toFixed(1) + " " +
               (particle.y + Math.sin(endAngle) * rr).toFixed(1),
            fill: "none", stroke: "var(--cl-fat)", "stroke-width": 6,
            "stroke-linecap": "round"
          }));
        }

        for (s = 0; s < SITES_PER_PARTICLE; s++) {
          var frac = s / SITES_PER_PARTICLE;
          var angle = -Math.PI / 2 + frac * Math.PI * 2;
          var isCovered = frac < covered;
          siteTotal++;
          if (!isCovered) exposedTotal++;

          var sx = particle.x + Math.cos(angle) * particle.r;
          var sy = particle.y + Math.sin(angle) * particle.r;

          svg.appendChild(svgEl("circle", {
            cx: sx.toFixed(1), cy: sy.toFixed(1), r: 4.5,
            fill: isCovered ? "var(--cl-protein-blocked)" : "var(--cl-chain-protein)",
            stroke: "var(--cl-atom-stroke)", "stroke-width": 1
          }));

          /* Water only reaches the sites the fat has not covered. */
          if (!isCovered) {
            svg.appendChild(svgEl("circle", {
              cx: (particle.x + Math.cos(angle) * (particle.r + 13)).toFixed(1),
              cy: (particle.y + Math.sin(angle) * (particle.r + 13)).toFixed(1),
              r: 3.4,
              fill: "var(--cl-atom-o)", stroke: "var(--cl-atom-stroke)", "stroke-width": 0.8
            }));
          }
        }
      }

      var exposedPercent = Math.round(exposedTotal / siteTotal * 100);
      valueLabel.textContent = Math.round(fat * 100) + "%";

      var glutenLine;
      if (exposedPercent > 78) {
        glutenLine = "Nearly all the protein can be reached and hydrated, so a strong, continuous " +
          "network can form. This is bread territory rather than cookie territory.";
      } else if (exposedPercent > 45) {
        glutenLine = "Much of the protein is reachable, so a moderate network forms. The cookie " +
          "has chew and holds together, without turning bready.";
      } else if (exposedPercent > 18) {
        glutenLine = "Most of the protein is sealed off. Only a patchy, discontinuous network " +
          "forms, and the cookie is tender.";
      } else {
        glutenLine = "Almost no protein is reachable. Barely any network forms at all, and the " +
          "result is short and crumbly, which is what shortbread is.";
      }

      readout.innerHTML =
        "<p><strong>Protein that water can still reach.</strong> About " + exposedPercent +
        " percent.</p>" +
        "<p><strong>What forms.</strong> " + glutenLine + "</p>";
    }

    slider.addEventListener("input", update);
    update();
  }

  /* ---------------------------------------------------------------- */
  /* Start up                                                          */
  /* ---------------------------------------------------------------- */

  function start() {
    var creamRoot = document.getElementById("cl-creaming");
    if (creamRoot) initCreaming(creamRoot);

    var coatRoot = document.getElementById("cl-coating");
    if (coatRoot) initCoating(coatRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
