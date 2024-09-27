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


let __js_advanced_studies_ichimoku_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("ichimoku feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateIchimoku = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var periods = {
			Base: Number(sd.inputs["Base Line Period"]),
			Conv: Number(sd.inputs["Conversion Line Period"]),
			LeadB: Number(sd.inputs["Leading Span B Period"]),
			Lag: Number(sd.inputs["Lagging Span Period"])
		};

		function getLLVHHV(p, x) {
			var l = Number.MAX_VALUE,
				h = Number.MAX_VALUE * -1;
			for (var j = x - p + 1; j <= x; j++) {
				if (j < 0) continue;
				l = Math.min(l, quotes[j].Low);
				h = Math.max(h, quotes[j].High);
			}
			return [l, h];
		}

		var i, hl;
		for (i = sd.startFrom; i < quotes.length; i++) {
			if (!quotes[i]) continue;

			hl = getLLVHHV(periods.Conv, i);
			quotes[i]["Conversion Line " + sd.name] = (hl[1] + hl[0]) / 2;

			hl = getLLVHHV(periods.Base, i);
			quotes[i]["Base Line " + sd.name] = (hl[1] + hl[0]) / 2;

			if (i < periods.Lag) continue;
			quotes[i - periods.Lag]["Lagging Span " + sd.name] = quotes[i].Close;
		}
		var futureTicks = [];
		for (i = Math.max(0, sd.startFrom - periods.Base); i < quotes.length; i++) {
			hl = getLLVHHV(periods.LeadB, i);
			var lsa =
				(quotes[i]["Conversion Line " + sd.name] +
					quotes[i]["Base Line " + sd.name]) /
				2;
			var lsb = (hl[1] + hl[0]) / 2;
			if (quotes[i + periods.Base]) {
				quotes[i + periods.Base]["Leading Span A " + sd.name] = lsa;
				quotes[i + periods.Base]["Leading Span B " + sd.name] = lsb;
			} else {
				var ft = {};
				ft["Leading Span A " + sd.name] = lsa;
				ft["Leading Span B " + sd.name] = lsb;
				futureTicks.push(ft);
			}
		}
		sd.appendFutureTicks(stx, futureTicks);
	};

	CIQ.Studies.displayIchimoku = function (stx, sd, quotes) {
		var topBand = "Leading Span A " + sd.name,
			bottomBand = "Leading Span B " + sd.name;
		var topColor = CIQ.Studies.determineColor(
			sd.outputs[sd.outputMap[topBand]]
		);
		var bottomColor = CIQ.Studies.determineColor(
			sd.outputs[sd.outputMap[bottomBand]]
		);
		var panel = stx.panels[sd.panel];
		var yAxis = sd.getYAxis(stx);
		var parameters = {
			topBand: topBand,
			bottomBand: bottomBand,
			topColor: topColor,
			bottomColor: bottomColor,
			skipTransform: panel.name != sd.chart.name,
			topAxis: yAxis,
			bottomAxis: yAxis,
			opacity: 0.3
		};
		if (!sd.highlight && stx.highlightedDraggable) parameters.opacity *= 0.3;
		CIQ.fillIntersecting(stx, sd.panel, parameters);
		CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Ichimoku Clouds": {
			name: "Ichimoku Clouds",
			overlay: true,
			calculateFN: CIQ.Studies.calculateIchimoku,
			seriesFN: CIQ.Studies.displayIchimoku,
			inputs: {
				"Conversion Line Period": 9,
				"Base Line Period": 26,
				"Leading Span B Period": 52,
				"Lagging Span Period": 26
			},
			outputs: {
				"Conversion Line": "#0000FF",
				"Base Line": "#FF0000",
				"Leading Span A": "#00FF00",
				"Leading Span B": "#FF0000",
				"Lagging Span": "#808000"
			}
		}
	});
}

};
__js_advanced_studies_ichimoku_(typeof window !== "undefined" ? window : global);
