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


let __js_standard_studies_zigzag_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("zigzag feature requires first activating studies feature.");
} else {
	// Note: this study expects createDataSet to be called when changing the chart type!
	CIQ.Studies.calculateZigZag = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (!quotes || !quotes.length) return;
		var highLowChart = sd.highLowChart;
		function fillBetweenPoints(start, end) {
			for (var i = start + 1; i < end; i++) {
				quotes[i]["ShadowResult " + sd.name] =
					((quotes[end]["Result " + sd.name] -
						quotes[start]["Result " + sd.name]) *
						(i - start)) /
						(end - start) +
					quotes[start]["Result " + sd.name];
				delete quotes[i]["Result " + sd.name];
			}
		}
		var ll = null,
			hh = null;
		var distance = sd.inputs["Distance(%)"];
		var direction = 0;
		var bar = 0;
		var previousBar = 0;
		var zig = null,
			zag = null;
		var start = 0;
		for (var b = Math.min(quotes.length - 1, sd.startFrom); b >= 0; b--) {
			start = b;
			if (quotes[b]["_state " + sd.name]) {
				var state = quotes[b]["_state " + sd.name];
				//[ll,hh,direction,bar,previousBar,zig,zag]
				ll = state[0];
				hh = state[1];
				direction = state[2];
				bar = state[3];
				previousBar = state[4];
				zig = state[5];
				zag = state[6];
				break;
			}
		}
		for (var i = start; i < quotes.length; i++) {
			var thisHigh = quotes[i][highLowChart ? "High" : "Close"];
			var thisLow = quotes[i][highLowChart ? "Low" : "Close"];
			if (hh === null || hh < thisHigh) {
				hh = thisHigh;
				if (direction < 0) ll = thisLow;
				zig = (1 - distance / 100) * hh;
				if (direction > -1) {
					if (zag !== null && hh > zag) {
						quotes[bar]["Result " + sd.name] =
							quotes[bar][highLowChart ? "Low" : "Close"];
						fillBetweenPoints(previousBar, bar);
						direction = -1;
						ll = thisLow;
						previousBar = bar;
						bar = i;
						continue;
					}
				} else {
					bar = i;
				}
			}
			if (ll === null || ll > thisLow) {
				ll = thisLow;
				if (direction > 0) hh = thisHigh;
				zag = (1 + distance / 100) * ll;
				if (direction < 1) {
					if (zig !== null && ll < zig) {
						quotes[bar]["Result " + sd.name] =
							quotes[bar][highLowChart ? "High" : "Close"];
						fillBetweenPoints(previousBar, bar);
						direction = 1;
						hh = thisHigh;
						previousBar = bar;
						bar = i;
						continue;
					}
				} else {
					bar = i;
				}
			}
		}
		quotes[bar]["Result " + sd.name] =
			quotes[bar][highLowChart ? (direction == 1 ? "Low" : "High") : "Close"];
		quotes[bar]["_state " + sd.name] = [
			ll,
			hh,
			direction,
			bar,
			previousBar,
			zig,
			zag
		];
		fillBetweenPoints(previousBar, bar);
		var fin = quotes.length - 1;
		while (fin > bar) {
			if (quotes[fin].Close || quotes[fin].Close === 0) {
				quotes[fin]["Result " + sd.name] =
					quotes[fin][
						highLowChart ? (direction == 1 ? "High" : "Low") : "Close"
					];
				break;
			}
			fin--;
		}
		fillBetweenPoints(bar, fin);
	};

	CIQ.Studies.displayZigZag = function (stx, sd, quotes) {
		var highLowBars = stx.chart.highLowBars;
		if (sd.highLowChart != highLowBars) {
			sd.highLowChart = highLowBars;
			sd.startFrom = 0;
			sd.study.calculateFN(stx, sd);
		}
		var chart = stx.chart;
		for (var i = 0; i < quotes.length; i++) {
			var quote = quotes[i];
			if (quote) {
				if (quote["_shadowCopy " + sd.name]) {
					delete quote["Result " + sd.name];
					delete quote["_shadowCopy " + sd.name];
				}
				if (!quote["Result " + sd.name]) {
					if (quote.transform) delete quote.transform["Result " + sd.name];
				}
			}
		}
		var q0 = quotes[0],
			ql = quotes[quotes.length - 1];
		if (q0 && q0["ShadowResult " + sd.name]) {
			q0["Result " + sd.name] = q0["ShadowResult " + sd.name];
			if (q0.transform)
				q0.transform["Result " + sd.name] = chart.transformFunc(
					stx,
					chart,
					q0["ShadowResult " + sd.name]
				);
			q0["_shadowCopy " + sd.name] = 1;
		}
		if (ql && ql["ShadowResult " + sd.name]) {
			ql["Result " + sd.name] = ql["ShadowResult " + sd.name];
			if (ql.transform)
				ql.transform["Result " + sd.name] = chart.transformFunc(
					stx,
					chart,
					ql["ShadowResult " + sd.name]
				);
			ql["_shadowCopy " + sd.name] = 1;
		}
		CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		ZigZag: {
			name: "ZigZag",
			overlay: true,
			seriesFN: CIQ.Studies.displayZigZag,
			calculateFN: CIQ.Studies.calculateZigZag,
			inputs: { "Distance(%)": 10 },
			parameters: {
				init: { label: false }
			},
			attributes: {
				"Distance(%)": { min: 0.1, step: 0.1 }
			}
		}
	});
}

};
__js_standard_studies_zigzag_(typeof window !== "undefined" ? window : global);
