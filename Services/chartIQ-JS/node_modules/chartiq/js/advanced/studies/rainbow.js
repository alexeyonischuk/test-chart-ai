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


let __js_advanced_studies_rainbow_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("rainbow feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateRainbow = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";

		function getLLVHHV(p, x) {
			var h = Number.MAX_VALUE * -1,
				l = Number.MAX_VALUE;
			for (var j = x - p + 1; j <= x; j++) {
				if (j < 0) continue;
				h = Math.max(h, quotes[j].Close);
				l = Math.min(l, quotes[j].Close);
			}
			return [l, h];
		}

		var f = field;
		for (var j = 1; j <= 10; j++) {
			CIQ.Studies.MA("simple", sd.days, f, 0, "SMA" + j, stx, sd);
			f = "SMA" + j + " " + sd.name;
		}

		for (var i = Math.max(sd.startFrom, 10); i < quotes.length; i++) {
			if (!quotes[i]) continue;
			if (quotes[i].futureTick) break;
			var accum = 0,
				count = 0,
				max = Number.MAX_VALUE * -1,
				min = Number.MAX_VALUE;
			for (j = 1; j <= 10; j++) {
				var q = quotes[i]["SMA" + j + " " + sd.name];
				if (q || q === 0) {
					accum += q;
					count++;
					max = Math.max(max, q);
					min = Math.min(min, q);
				}
			}
			if (sd.name.indexOf("Osc") > -1) {
				var lh = getLLVHHV(sd.inputs["HHV/LLV Lookback"], i);
				if (count) {
					quotes[i][sd.name + "_hist"] =
						(100 *
							(CIQ.Studies.getQuoteFieldValue(quotes[i], field) -
								accum / count)) /
						Math.max(0.000001, lh[1] - lh[0]);
					quotes[i]["Over " + sd.name] =
						(100 * (max - min)) / Math.max(0.000001, lh[1] - lh[0]);
					quotes[i]["Under " + sd.name] = -quotes[i]["Over " + sd.name];
					quotes[i]["Zero " + sd.name] = 0;
				}
			}
		}
		if (sd.name.indexOf("Osc") > -1) {
			sd.outputMap = {};
			sd.outputMap["Over " + sd.name] = "Positive Bar";
			sd.outputMap["Under " + sd.name] = "Negative Bar";
			sd.outputMap["Zero " + sd.name] = "";
			sd.outputMap[sd.name + "_hist"] = "";
		}
	};

	CIQ.Studies.displayRainbowMA = function (stx, sd, quotes) {
		var panel = stx.panels[sd.panel];
		//just need to display in reverse order from outputMap
		for (var i = 10; i > 0; i--) {
			CIQ.Studies.displayIndividualSeriesAsLine(
				stx,
				sd,
				panel,
				"SMA" + i + " " + sd.name,
				quotes
			);
		}
	};

	CIQ.Studies.displayRainbowOsc = function (stx, sd, quotes) {
		CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
		var panel = stx.panels[sd.panel],
			context = sd.getContext(stx);
		var yAxis = sd.getYAxis(stx);

		stx.startClip(sd.panel);
		if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
		var y = stx.pixelFromPrice(0, panel, yAxis);
		var skipTransform = panel.name != sd.chart.name;

		var upColor = CIQ.Studies.determineColor(sd.outputs["Positive Bar"]);
		context.strokeStyle = upColor;
		stx.plotDataSegmentAsLine("Over " + sd.name, panel, {
			skipTransform: skipTransform,
			label: false,
			yAxis: yAxis
		});

		var upgradient = context.createLinearGradient(
			0,
			y,
			0,
			yAxis.flipped ? yAxis.bottom : yAxis.top
		);
		upgradient.addColorStop(0, stx.containerColor);
		upgradient.addColorStop(1, upColor);
		CIQ.prepareChannelFill(stx, {
			skipTransform: skipTransform,
			color: upgradient,
			opacity: !sd.highlight && stx.highlightedDraggable ? 0.3 : 1,
			panelName: sd.panel,
			topBand: "Over " + sd.name,
			bottomBand: "Zero " + sd.name,
			yAxis: yAxis
		});

		var downColor = CIQ.Studies.determineColor(sd.outputs["Negative Bar"]);
		context.strokeStyle = downColor;
		stx.plotDataSegmentAsLine("Under " + sd.name, panel, {
			skipTransform: skipTransform,
			label: false,
			yAxis: yAxis
		});

		var dngradient = context.createLinearGradient(
			0,
			y,
			0,
			yAxis.flipped ? yAxis.top : yAxis.bottom
		);
		dngradient.addColorStop(0, stx.containerColor);
		dngradient.addColorStop(1, downColor);
		CIQ.prepareChannelFill(stx, {
			skipTransform: skipTransform,
			color: dngradient,
			opacity: !sd.highlight && stx.highlightedDraggable ? 0.3 : 1,
			panelName: sd.panel,
			topBand: "Zero " + sd.name,
			bottomBand: "Under " + sd.name,
			yAxis: yAxis
		});

		var myWidth = stx.layout.candleWidth - 2;
		if (myWidth < 2) myWidth = 1;

		stx.canvasColor("stx_histogram");
		if (!sd.underlay) context.globalAlpha = 1;
		if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
		context.fillStyle = "#CCCCCC";
		for (var i = 0; i < quotes.length; i++) {
			var skippedBars = 0;
			var quote = quotes[i];
			if (!quote) continue;
			if (stx.cleanupGaps === "stretch") {
				while (quotes[i + 1]) {
					var nextQuote = quotes[i + 1][sd.name + "_hist"];
					if (nextQuote || nextQuote === 0 || quotes[i + 1].futureTick) break;
					skippedBars++;
					i++;
				}
			}
			if (quote[sd.name + "_hist"] > 0) context.fillStyle = upColor;
			else if (quote[sd.name + "_hist"] < 0) context.fillStyle = downColor;
			if (quote.candleWidth)
				myWidth = Math.floor(Math.max(1, quote.candleWidth - 2));
			context.fillRect(
				Math.floor(
					stx.pixelFromBar(i - skippedBars, panel.chart) - myWidth / 2
				),
				Math.floor(y),
				Math.floor(myWidth + skippedBars * stx.layout.candleWidth),
				Math.floor(
					stx.pixelFromPrice(quote[sd.name + "_hist"], panel, yAxis) - y
				)
			);
		}
		stx.endClip();
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Rainbow MA": {
			name: "Rainbow Moving Average",
			overlay: true,
			calculateFN: CIQ.Studies.calculateRainbow,
			seriesFN: CIQ.Studies.displayRainbowMA,
			inputs: { Period: 2, Field: "field" },
			outputs: {
				SMA1: "#FF0000",
				SMA2: "#FF7F00",
				SMA3: "#FFFF00",
				SMA4: "#7FFF00",
				SMA5: "#00FF7F",
				SMA6: "#00FFFF",
				SMA7: "#007FFF",
				SMA8: "#0000FF",
				SMA9: "#7F00FF",
				SMA10: "#FF00FF"
			}
		},
		"Rainbow Osc": {
			name: "Rainbow Oscillator",
			calculateFN: CIQ.Studies.calculateRainbow,
			seriesFN: CIQ.Studies.displayRainbowOsc,
			centerline: 0,
			inputs: { Period: 2, Field: "field", "HHV/LLV Lookback": 10 },
			outputs: { "Positive Bar": "#00DD00", "Negative Bar": "#FF0000" }
		}
	});
}

};
__js_advanced_studies_rainbow_(typeof window !== "undefined" ? window : global);
