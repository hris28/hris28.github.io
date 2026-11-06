/* egg.js
   Visual for the Egg section of garden/tools/cookie-black-box.html.

     cl-denature   proteins folded, unfolding, and connecting into a network,
                   under two controls: how hot it gets and how fast it gets there

   This is the sequence the source document asks for, from raw egg through heating
   to set egg. It is 2D, because what matters here is how many chains have opened
   and what they have connected to, not the shape of any one of them.

   TEMPERATURES
   Egg white is a mixture of proteins that do not all unfold at the same point, so
   it firms over a range rather than at a single temperature. Two of them have been
   measured directly in water: lysozyme at about 77 degrees Celsius and ovalbumin at
   about 80. Others go earlier, which is why a white begins to set well below either
   figure. Dissolved sugar pushes all of them higher, in the same way it pushes
   starch gelatinization higher.
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

  /* A field of proteins on a jittered grid, so that unfolding thins the folded
     ones evenly across the whole picture rather than from one end. */
  var PROTEINS = [];
  (function seed() {
    var rand = makeRandom(23);
    var cols = 9, rows = 4;
    var cellW = 400 / cols, cellH = 120 / rows;
    var c, r;
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        PROTEINS.push({
          x: 30 + c * cellW + cellW * (0.25 + rand() * 0.5),
          y: 26 + r * cellH + cellH * (0.25 + rand() * 0.5),
          turn: rand() * Math.PI
        });
      }
    }
    for (var i = PROTEINS.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var swap = PROTEINS[i];
      PROTEINS[i] = PROTEINS[j];
      PROTEINS[j] = swap;
    }
  })();

  /* Fraction of the protein that has unfolded by a given temperature. Nothing
     happens below about 60, and it is essentially complete by about 85. */
  function unfoldedFraction(tempC) {
    var f = (tempC - 60) / 25;
    if (f < 0) return 0;
    if (f > 1) return 1;
    return f;
  }

  function initDenature(root) {
    var svg = root.querySelector("svg");
    var tempSlider = root.querySelector("[data-slider='temp']");
    var rateSlider = root.querySelector("[data-slider='rate']");
    var readout = root.querySelector(".cl-readout");
    if (!svg || !tempSlider) return;

    function update() {
      var tempC = Number(tempSlider.value);
      var rate = Number(rateSlider.value) / 100;
      var unfolded = unfoldedFraction(tempC);

      var openCount = Math.round(unfolded * PROTEINS.length);
      var open = PROTEINS.slice(0, openCount);
      var folded = PROTEINS.slice(openCount);

      clear(svg);

      var i;

      /*
         Heating rate decides how the unfolded chains find each other. Heated
         gently, each chain has time to meet many neighbours and the network comes
         out fine and even. Heated hard, chains grab the first thing they touch and
         lock into a few coarse clumps, and the water that a fine network would
         have held gets squeezed out into the gaps between them. That is a curdled
         custard, and it is also an overcooked scrambled egg.
      */
      var clumping = rate * rate;
      var placed = [];
      var centres = [
        { x: 118, y: 62 }, { x: 250, y: 96 }, { x: 372, y: 60 }
      ];
      for (i = 0; i < open.length; i++) {
        var centre = centres[i % centres.length];
        placed.push({
          x: open[i].x + (centre.x - open[i].x) * clumping * 0.72,
          y: open[i].y + (centre.y - open[i].y) * clumping * 0.72,
          turn: open[i].turn
        });
      }

      /* Links between chains close enough to touch. */
      var links = 0;
      for (i = 0; i < placed.length; i++) {
        for (var j = i + 1; j < placed.length; j++) {
          var dx = placed[i].x - placed[j].x;
          var dy = placed[i].y - placed[j].y;
          if (Math.sqrt(dx * dx + dy * dy) <= 58) {
            svg.appendChild(svgEl("line", {
              x1: placed[i].x.toFixed(1), y1: placed[i].y.toFixed(1),
              x2: placed[j].x.toFixed(1), y2: placed[j].y.toFixed(1),
              stroke: "var(--cl-gluten-link)", "stroke-width": 2, opacity: 0.75
            }));
            links++;
          }
        }
      }

      /* Water squeezed out of a coarse network, sitting in the gaps. */
      if (clumping > 0.25 && unfolded > 0.3) {
        var randW = makeRandom(41);
        var drops = Math.round(clumping * unfolded * 16);
        for (i = 0; i < drops; i++) {
          svg.appendChild(svgEl("circle", {
            cx: (34 + randW() * 392).toFixed(1),
            cy: (24 + randW() * 124).toFixed(1),
            r: (3 + randW() * 2.4).toFixed(1),
            fill: "var(--cl-atom-o)", opacity: 0.7
          }));
        }
      }

      /* Folded proteins, drawn as tight coils. */
      for (i = 0; i < folded.length; i++) {
        svg.appendChild(svgEl("circle", {
          cx: folded[i].x.toFixed(1), cy: folded[i].y.toFixed(1), r: 7,
          fill: "var(--cl-protein-folded)",
          stroke: "var(--cl-atom-stroke)", "stroke-width": 1.2
        }));
        svg.appendChild(svgEl("circle", {
          cx: folded[i].x.toFixed(1), cy: folded[i].y.toFixed(1), r: 3.2,
          fill: "none", stroke: "var(--cl-atom-stroke)", "stroke-width": 1, opacity: 0.6
        }));
      }

      /* Unfolded proteins, drawn as open squiggles. */
      for (i = 0; i < placed.length; i++) {
        var p = placed[i];
        var ux = Math.cos(p.turn), uy = Math.sin(p.turn);
        var px = -uy, py = ux;
        var d = "M " + (p.x - ux * 13).toFixed(1) + " " + (p.y - uy * 13).toFixed(1);
        for (var k = 1; k <= 5; k++) {
          var along = -13 + k * 5.2;
          var side = (k % 2 === 0 ? -4.2 : 4.2);
          d += " L " + (p.x + ux * along + px * side).toFixed(1) + " " +
               (p.y + uy * along + py * side).toFixed(1);
        }
        svg.appendChild(svgEl("path", {
          d: d, fill: "none", stroke: "var(--cl-chain-protein)",
          "stroke-width": 2.8, "stroke-linecap": "round", "stroke-linejoin": "round"
        }));
      }

      /* Readouts. */
      root.querySelector("[data-value='temp']").textContent =
        tempC + " °C / " + Math.round(tempC * 9 / 5 + 32) + " °F";
      root.querySelector("[data-value='rate']").textContent =
        rate < 0.3 ? "gentle" : (rate < 0.65 ? "brisk" : "harsh");

      var stateLine, resultLine;
      if (unfolded <= 0) {
        stateLine = "Every protein is still folded into its compact shape, held there by weak " +
          "interactions between its own side groups. Nothing is connected to anything.";
        resultLine = "Raw. The egg is a liquid, and the cookie dough it is in can still flow.";
      } else if (unfolded < 0.45) {
        stateLine = "Heat has disrupted enough of those weak interactions that some chains have " +
          "opened out, exposing regions that were tucked away inside. A few have found each other.";
        resultLine = "Thickening. Not yet a solid, but no longer freely liquid.";
      } else if (unfolded < 0.9) {
        stateLine = "Most chains have unfolded and are linking into a connected network.";
        resultLine = "Setting. This is the point at which a spreading cookie stops spreading.";
      } else {
        stateLine = "Effectively all the protein has unfolded and joined the network.";
        resultLine = "Fully set.";
      }

      var rateLine;
      if (unfolded < 0.2) {
        rateLine = "Heating rate has nothing to act on yet.";
      } else if (rate < 0.3) {
        rateLine = "Heated gently, each chain has time to meet many neighbours before it commits. " +
          "The network comes out fine and even, and it holds water throughout. This is a smooth " +
          "custard.";
      } else if (rate < 0.65) {
        rateLine = "Heated briskly, the network is coarser than it could be but still holds " +
          "together.";
      } else {
        rateLine = "Heated hard, chains grab whatever they touch first and lock into a few large " +
          "clumps. The water a finer network would have held is squeezed out into the gaps. This " +
          "is a curdled custard, and the same thing happens to an overcooked scrambled egg.";
      }

      readout.innerHTML =
        "<p><strong>The proteins.</strong> " + stateLine + "</p>" +
        "<p><strong>The result.</strong> " + resultLine + "</p>" +
        "<p><strong>Heating rate.</strong> " + rateLine + "</p>";
    }

    tempSlider.addEventListener("input", update);
    rateSlider.addEventListener("input", update);
    update();
  }

  function start() {
    var root = document.getElementById("cl-denature");
    if (root) initDenature(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
