/**!
 *	9.4.0
 *	Generation date: 2024-08-28T15:51:29.272Z
 *	Client name: codeit
 *	Package Type: Core alacarte
 *	License type: annual
 *	Build descriptor: a9931b733
 */

/***********************************************************!
 * Copyright © 2024 S&P Global All rights reserved
*************************************************************/
/*************************************! DO NOT MAKE CHANGES TO THIS LIBRARY FILE!! !*************************************
* If you wish to overwrite default functionality, create a separate file with a copy of the methods you are overwriting *
* and load that file right after the library has been loaded, but before the chart engine is instantiated.              *
* Directly modifying library files will prevent upgrades and the ability for ChartIQ to support your solution.          *
*************************************************************************************************************************/
/* eslint-disable no-extra-parens */


import { CIQ as _CIQ } from "../../../js/chartiq.js";
import "../../../js/standard/studies.js";


let __js_advanced_studies_alligator_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("alligator feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateAlligator = function (stx, sd) {
		var periods = {
			J: Number(sd.inputs["Jaw Period"]),
			T: Number(sd.inputs["Teeth Period"]),
			L: Number(sd.inputs["Lips Period"])
		};
		var quotes = sd.chart.scrubbed;
		if (quotes.length < Math.max(periods.J, periods.T, periods.L) + 1) {
			sd.error = true;
			return;
		}

		if (sd.type === "Gator" || sd.inputs["Show Lines"]) {
			// Gator always displays lines
			CIQ.Studies.MA(
				"welles wilder",
				periods.J,
				"hl/2",
				sd.inputs["Jaw Offset"],
				"Jaw",
				stx,
				sd
			);
			CIQ.Studies.MA(
				"welles wilder",
				periods.T,
				"hl/2",
				sd.inputs["Teeth Offset"],
				"Teeth",
				stx,
				sd
			);
			CIQ.Studies.MA(
				"welles wilder",
				periods.L,
				"hl/2",
				sd.inputs["Lips Offset"],
				"Lips",
				stx,
				sd
			);
		}

		for (var i = sd.startFrom; i < quotes.length; i++) {
			if (!quotes[i]) continue;
			if (sd.type == "Gator") {
				var jaw = quotes[i]["Jaw " + sd.name],
					lips = quotes[i]["Lips " + sd.name],
					teeth = quotes[i]["Teeth " + sd.name];
				if (teeth || teeth === 0) {
					if (jaw || jaw === 0)
						quotes[i][sd.name + "_hist1"] = Math.abs(jaw - teeth);
					if (lips || lips === 0)
						quotes[i][sd.name + "_hist2"] = -Math.abs(teeth - lips);
				}
				sd.outputMap = {};
				sd.outputMap[sd.name + "_hist1"] = "";
				sd.outputMap[sd.name + "_hist2"] = "";
			}
			if (sd.inputs["Show Fractals"]) {
				if (
					!quotes[i - 2] ||
					!quotes[i - 1] ||
					!quotes[i] ||
					!quotes[i + 1] ||
					!quotes[i + 2]
				)
					continue;
				if (
					quotes[i - 2].High &&
					quotes[i - 1].High &&
					quotes[i].High &&
					quotes[i + 1].High &&
					quotes[i + 2].High
				) {
					if (
						quotes[i].High > quotes[i - 1].High &&
						quotes[i].High > quotes[i - 2].High &&
						quotes[i].High > quotes[i + 1].High &&
						quotes[i].High > quotes[i + 2].High
					) {
						quotes[i]["Fractal High " + sd.name] = 1;
					}
				}
				if (
					quotes[i - 2].Low &&
					quotes[i - 1].Low &&
					quotes[i].Low &&
					quotes[i + 1].Low &&
					quotes[i + 2].Low
				) {
					if (
						quotes[i].Low < quotes[i - 1].Low &&
						quotes[i].Low < quotes[i - 2].Low &&
						quotes[i].Low < quotes[i + 1].Low &&
						quotes[i].Low < quotes[i + 2].Low
					) {
						quotes[i]["Fractal Low " + sd.name] = 1;
					}
				}
			}
		}
	};

	CIQ.Studies.displayAlligator = function (stx, sd, quotes) {
		function drawFractal(highLow, index) {
			//stx.canvasFont("???");
			var i = 0;
			if (stx.cleanupGaps === "stretch") {
				while (quotes[i + 1]) {
					var nextQuote = quotes[i + 1]["Lips " + sd.name];
					if (nextQuote || nextQuote === 0 || quotes[i + 1].futureTick) break;
					i++;
				}
			}
			var y;
			var flipped = chart.panel.yAxis.flipped;
			if (highLow == "high") {
				context.fillStyle = stx.defaultColor;
				context.textBaseline = flipped ? "top" : "bottom";
				y = stx.pixelFromPrice(
					quotes[index][
						chart.highLowBars ? "High" : chart.defaultPlotField || "Close"
					]
				);
				context.fillText(
					flipped ? "\u25BC" : "\u25B2",
					stx.pixelFromBar(index + i / 2, chart) -
						context.measureText("\u25B2").width / 2 +
						1,
					flipped ? y + 5 : y - 5
				); // up arrow
			} else if (highLow == "low") {
				context.fillStyle = stx.defaultColor;
				context.textBaseline = flipped ? "bottom" : "top";
				y = stx.pixelFromPrice(
					quotes[index][
						chart.highLowBars ? "Low" : chart.defaultPlotField || "Close"
					]
				);
				context.fillText(
					flipped ? "\u25B2" : "\u25BC",
					stx.pixelFromBar(index + i / 2, chart) -
						context.measureText("\u25BC").width / 2 +
						1,
					flipped ? y - 5 : y + 5
				); // down arrow
			}
		}
		var context = sd.getContext(stx),
			chart = stx.chart;
		if (sd.inputs["Show Lines"])
			CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
		if (sd.inputs["Show Fractals"]) {
			stx.startClip(); // Fractals always stay on the chart panel
			context.globalAlpha = sd.underlay ? 0.3 : 1;
			if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
			for (var i = 2; i < quotes.length - 2; i++) {
				if (quotes[i]) {
					if (quotes[i]["Fractal High " + sd.name]) drawFractal("high", i);
					if (quotes[i]["Fractal Low " + sd.name]) drawFractal("low", i);
				}
			}
			stx.endClip();
		}
	};

	CIQ.Studies.displayGator = function (stx, sd, quotes) {
		var panel = stx.panels[sd.panel],
			context = sd.getContext(stx);
		var yAxis = sd.getYAxis(stx);
		var y = stx.pixelFromPrice(0, panel, yAxis);

		var myWidth = stx.layout.candleWidth - 2;
		if (myWidth < 2) myWidth = 1;

		var upColor = CIQ.Studies.determineColor(sd.outputs["Increasing Bar"]);
		var downColor = CIQ.Studies.determineColor(sd.outputs["Decreasing Bar"]);
		stx.canvasColor("stx_histogram");
		if (!sd.underlay) context.globalAlpha = 1;
		context.fillStyle = "#CCCCCC";
		stx.startClip(sd.panel);
		if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
		for (var i = 0; i < quotes.length; i++) {
			var skippedBars = 0;
			var quote = quotes[i],
				quote_1 = quotes[i - 1];
			if (!quote) continue;
			if (stx.cleanupGaps === "stretch") {
				while (quotes[i + 1]) {
					var nextQuote = quotes[i + 1][sd.name + "_hist1"];
					if (nextQuote || nextQuote === 0 || quotes[i + 1].futureTick) break;
					skippedBars++;
					i++;
				}
			}
			for (var j = 1; j <= 2; j++) {
				if (!quote_1 || quote_1[sd.name + "_hist" + j] === undefined)
					quote_1 = stx.getPreviousBar(
						stx.chart,
						sd.name + "_hist" + j,
						i - skippedBars
					);
				if (!quote_1) context.fillStyle = "#CCCCCC";
				else if (
					Math.abs(quote_1[sd.name + "_hist" + j]) <
					Math.abs(quote[sd.name + "_hist" + j])
				)
					context.fillStyle = upColor;
				else if (
					Math.abs(quote_1[sd.name + "_hist" + j]) >
					Math.abs(quote[sd.name + "_hist" + j])
				)
					context.fillStyle = downColor;
				if (quote.candleWidth)
					myWidth = Math.floor(Math.max(1, quote.candleWidth - 2));
				context.fillRect(
					Math.floor(
						stx.pixelFromBar(i - skippedBars, panel.chart) - myWidth / 2
					),
					Math.floor(y),
					Math.floor(myWidth + skippedBars * stx.layout.candleWidth),
					Math.floor(
						stx.pixelFromPrice(quote[sd.name + "_hist" + j], panel, yAxis) - y
					)
				);
			}
		}
		stx.endClip();
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		Alligator: {
			name: "Alligator",
			overlay: true,
			seriesFN: CIQ.Studies.displayAlligator,
			calculateFN: CIQ.Studies.calculateAlligator,
			inputs: {
				"Show Lines": true,
				"Jaw Period": 13,
				"Jaw Offset": 8,
				"Teeth Period": 8,
				"Teeth Offset": 5,
				"Lips Period": 5,
				"Lips Offset": 3,
				"Show Fractals": false
			},
			outputs: { Jaw: "#0000FF", Teeth: "#FF0000", Lips: "#00DD00" }
		},
		Gator: {
			name: "Gator Oscillator",
			seriesFN: CIQ.Studies.displayGator,
			calculateFN: CIQ.Studies.calculateAlligator,
			inputs: {
				"Jaw Period": 13,
				"Jaw Offset": 8,
				"Teeth Period": 8,
				"Teeth Offset": 5,
				"Lips Period": 5,
				"Lips Offset": 3
			},
			outputs: { "Increasing Bar": "#00DD00", "Decreasing Bar": "#FF0000" },
			centerline: 0
		}
	});
}

};
__js_advanced_studies_alligator_(typeof window !== "undefined" ? window : global);
