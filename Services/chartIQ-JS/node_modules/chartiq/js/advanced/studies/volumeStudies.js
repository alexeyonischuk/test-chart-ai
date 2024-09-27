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


let __js_advanced_studies_volumeStudies_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"volumeStudies feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculateOnBalanceVolume = function (stx, sd) {
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		var minTick = sd.inputs["Min Tick Value"];
		var obv = false;
		if (!minTick && minTick !== 0) {
			obv = true;
			minTick = 0;
		}
		var quotes = sd.chart.scrubbed,
			direction = 0;
		var quote, quote1;
		for (var i = sd.startFrom; i < quotes.length; i++) {
			quote = quotes[i];
			var quoteValue1 = CIQ.Studies.getQuoteFieldValue(quote, field);
			if (!i || !quoteValue1) continue;
			if (quotes[i - 1][field]) quote1 = quotes[i - 1];
			if (!quote1) continue;
			var quoteValue2 = CIQ.Studies.getQuoteFieldValue(quote1, field);
			if (quoteValue1 - quoteValue2 > minTick) direction = 1;
			else if (quoteValue2 - quoteValue1 > minTick) direction = -1;
			else if (obv) direction = 0;

			var total = quote1["Result " + sd.name];
			if (!total) total = 0;
			var value = quote.Volume;
			if (typeof quote[field] === "object") {
				value = quote[field].Volume;
			}
			total += value * direction;
			quote["Result " + sd.name] = total;
		}
	};

	CIQ.Studies.calculatePriceVolumeTrend = function (stx, sd) {
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";

		var quotes = sd.chart.scrubbed;
		var total = 0;
		if (sd.startFrom > 1) {
			total = quotes[sd.startFrom - 1]["Result " + sd.name];
		}
		for (var i = Math.max(1, sd.startFrom); i < quotes.length; i++) {
			var quoteVal1 = CIQ.Studies.getQuoteFieldValue(quotes[i], field),
				quoteVal2 = CIQ.Studies.getQuoteFieldValue(quotes[i - 1], field);
			if (quoteVal1 === null || quoteVal2 === null) continue;

			total += (quotes[i].Volume * (quoteVal1 - quoteVal2)) / quoteVal2;
			quotes[i]["Result " + sd.name] = total;
		}
	};

	CIQ.Studies.calculateVolumeIndex = function (stx, sd) {
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var total = 100;
		if (sd.startFrom > 1) total = quotes[sd.startFrom - 1]["Index " + sd.name];
		for (var i = Math.max(1, sd.startFrom); i < quotes.length; i++) {
			var val = quotes[i][field],
				vol = quotes[i].Volume;
			if (val && typeof val == "object") {
				vol = val.Volume;
				val = val[sd.subField];
			}
			var val1 = quotes[i - 1][field],
				vol1 = quotes[i - 1].Volume;
			if (val1 && typeof val1 == "object") {
				vol1 = val1.Volume;
				val1 = val1[sd.subField];
			}
			if (!val) continue;
			if (!val1) continue;
			if (
				(sd.type == "Pos Vol" && vol > vol1) ||
				(sd.type == "Neg Vol" && vol < vol1)
			) {
				total *= val / val1;
			}
			quotes[i]["Index " + sd.name] = total;
		}
		CIQ.Studies.MA(
			sd.inputs["Moving Average Type"],
			sd.days,
			"Index " + sd.name,
			0,
			"MA",
			stx,
			sd
		);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Neg Vol": {
			name: "Negative Volume Index",
			calculateFN: CIQ.Studies.calculateVolumeIndex,
			inputs: { Period: 255, Field: "field", "Moving Average Type": "ma" },
			outputs: { Index: "auto", MA: "#FF0000" }
		},
		"On Bal Vol": {
			name: "On Balance Volume",
			calculateFN: CIQ.Studies.calculateOnBalanceVolume,
			inputs: {}
		},
		"Pos Vol": {
			name: "Positive Volume Index",
			calculateFN: CIQ.Studies.calculateVolumeIndex,
			inputs: { Period: 255, Field: "field", "Moving Average Type": "ma" },
			outputs: { Index: "auto", MA: "#FF0000" }
		},
		"Price Vol": {
			name: "Price Volume Trend",
			calculateFN: CIQ.Studies.calculatePriceVolumeTrend,
			inputs: { Field: "field" }
		},
		"Trade Vol": {
			name: "Trade Volume Index",
			calculateFN: CIQ.Studies.calculateOnBalanceVolume,
			inputs: { "Min Tick Value": 0.5 }
		},
		"Vol ROC": {
			name: "Volume Rate of Change",
			calculateFN: function (stx, sd) {
				if (CIQ.Studies.calculateRateOfChange)
					CIQ.Studies.calculateRateOfChange(stx, sd);
				else {
					console.error(
						"Volume Rate of Change study requires first activating momentum feature."
					);
					CIQ.Studies.calculateRateOfChange = function (stx, sd) {};
				}
			},
			parameters: {
				init: { isVolume: true }
			}
		},
		"vol undr": {
			name: "Volume Underlay",
			underlay: true,
			range: "0 to max",
			yAxis: {
				ground: true,
				initialMarginTop: 0,
				position: "none",
				heightFactor: 0.25
			},
			seriesFN: CIQ.Studies.createVolumeChart,
			calculateFN: CIQ.Studies.calculateVolume,
			inputs: { Series: "series" },
			attributes: {
				Series: {
					hidden: function () {
						return !Object.keys(this.chart.series).length;
					}
				}
				//panelName: { hidden: true }
			},
			outputs: { "Up Volume": "#8cc176", "Down Volume": "#b82c0c" },
			//customRemoval: true,
			removeFN: function (stx, sd) {
				stx.layout.volumeUnderlay = false;
				stx.changeOccurred("layout");
			}
		}
	});
}

};
__js_advanced_studies_volumeStudies_(typeof window !== "undefined" ? window : global);
