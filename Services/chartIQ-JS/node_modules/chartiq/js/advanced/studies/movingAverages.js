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


let __js_advanced_studies_movingAverages_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"movingAverages feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.prettify = CIQ.extend(
		{
			"2-exponential": "dema",
			"3-exponential": "tema",
			hull: "hma"
		},
		CIQ.Studies.prettify
	);

	CIQ.extend(CIQ.Studies.movingAverage, {
		conversions: {
			hma: "hull",
			dema: "2-exponential",
			tema: "3-exponential"
		},
		translations: {
			hull: "Hull",
			"2-exponential": "Double Exponential",
			"3-exponential": "Triple Exponential"
		},
		typeMap: {
			hma: "Hull",
			hull: "Hull",
			dema: "DoubleExponential",
			"2-exponential": "DoubleExponential",
			tema: "TripleExponential",
			"3-exponential": "TripleExponential"
		}
	});

	CIQ.Studies.calculateMovingAverageHull = function (stx, sd) {
		var quotes = sd.chart.scrubbed;

		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in

		CIQ.Studies.MA("wma", sd.days, field, 0, "_WMA1", stx, sd);
		CIQ.Studies.MA("wma", Math.ceil(sd.days / 2), field, 0, "_WMA2", stx, sd);

		var i, val;
		for (i = sd.startFrom - 1; i >= 0; i--) {
			val = CIQ.Studies.getQuoteFieldValue(quotes[i], field, sd.subField);
			if (val !== null) break;
		}
		for (i++; i < quotes.length; i++) {
			var quote = quotes[i];
			quote["_MMA " + sd.name] =
				2 * quote["_WMA2 " + sd.name] - quote["_WMA1 " + sd.name];
		}

		var offset = parseInt(sd.inputs.Offset, 10);
		if (isNaN(offset)) offset = 0;

		var hmaDays = Math.floor(Math.sqrt(sd.days));
		CIQ.Studies.MA("wma", hmaDays, "_MMA " + sd.name, offset, "_HMA", stx, sd);

		var name = sd.name;
		for (var p in sd.outputs) {
			name = p + " " + name;
		}
		for (
			i = Math.max(sd.days + hmaDays - 1, sd.startFrom);
			i < quotes.length;
			i++
		) {
			quotes[i][name] = quotes[i]["_HMA " + sd.name];
		}
	};

	CIQ.Studies.calculateMovingAverageDoubleExponential = function (stx, sd) {
		var quotes = sd.chart.scrubbed;

		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in

		CIQ.Studies.MA("ema", sd.days, field, 0, "_EMA1", stx, sd);
		CIQ.Studies.MA("ema", sd.days, "_EMA1 " + sd.name, 0, "_EMA2", stx, sd);

		var offset = parseInt(sd.inputs.Offset, 10);
		if (isNaN(offset)) offset = 0;
		var i, val;
		var offsetBack = offset;
		for (i = sd.startFrom - 1; i >= 0; i--) {
			val = CIQ.Studies.getQuoteFieldValue(quotes[i], field, sd.subField);
			if (val === null) continue;
			if (offsetBack > 0) {
				offsetBack--;
				continue;
			}
			break;
		}
		var name = sd.name;
		for (var p in sd.outputs) {
			name = p + " " + name;
		}
		var futureTicks = [];
		for (i++; i < quotes.length; i++) {
			if (i < 2 * (sd.days - 1)) continue;
			var quote = quotes[i];
			var result = 2 * quote["_EMA1 " + sd.name] - quote["_EMA2 " + sd.name];
			if (i + offset >= 0) {
				if (i + offset < quotes.length) quotes[i + offset][name] = result;
				else {
					var ft = {};
					ft[name] = result;
					futureTicks.push(ft);
				}
			}
		}
		sd.appendFutureTicks(stx, futureTicks);
	};

	CIQ.Studies.calculateMovingAverageTripleExponential = function (stx, sd) {
		var quotes = sd.chart.scrubbed;

		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close"; // Handle when the default inputs are passed in

		CIQ.Studies.MA("ema", sd.days, field, 0, "_EMA1", stx, sd);
		CIQ.Studies.MA("ema", sd.days, "_EMA1 " + sd.name, 0, "_EMA2", stx, sd);
		CIQ.Studies.MA("ema", sd.days, "_EMA2 " + sd.name, 0, "_EMA3", stx, sd);

		var offset = parseInt(sd.inputs.Offset, 10);
		if (isNaN(offset)) offset = 0;
		var i, val;
		var offsetBack = offset;
		for (i = sd.startFrom - 1; i >= 0; i--) {
			val = CIQ.Studies.getQuoteFieldValue(quotes[i], field, sd.subField);
			if (val === null) continue;
			if (offsetBack > 0) {
				offsetBack--;
				continue;
			}
			break;
		}
		var name = sd.name;
		for (var p in sd.outputs) {
			name = p + " " + name;
		}
		var futureTicks = [];
		for (i++; i < quotes.length; i++) {
			if (i < 3 * (sd.days - 1)) continue;
			var quote = quotes[i];
			var result =
				3 * quote["_EMA1 " + sd.name] -
				3 * quote["_EMA2 " + sd.name] +
				quote["_EMA3 " + sd.name];
			if (i + offset >= 0) {
				if (i + offset < quotes.length) quotes[i + offset][name] = result;
				else {
					var ft = {};
					ft[name] = result;
					futureTicks.push(ft);
				}
			}
		}
		sd.appendFutureTicks(stx, futureTicks);
	};

	CIQ.Studies.calculateMAEnvelope = function (stx, sd) {
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		CIQ.Studies.MA(
			sd.inputs["Moving Average Type"],
			sd.days,
			field,
			0,
			"MA",
			stx,
			sd
		);
		var shiftType = sd.inputs["Shift Type"];
		var shift = sd.inputs.Shift;
		if (!shiftType) {
			//legacy
			shiftType = "percent";
			shift = sd.inputs["Shift Percentage"];
		}
		if (shiftType == "percent") {
			CIQ.Studies.calculateGenericEnvelope(
				stx,
				sd,
				shift / 100,
				"MA " + sd.name
			);
		} else if (shiftType == "points") {
			CIQ.Studies.calculateGenericEnvelope(
				stx,
				sd,
				null,
				"MA " + sd.name,
				null,
				Number(shift)
			);
		}
	};

	CIQ.Studies.calculateMADev = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		var pts = sd.inputs["Points Or Percent"];
		if (!pts) pts = "Points";
		var maType = sd.inputs["Moving Average Type"];
		if (!maType) maType = "exponential";
		CIQ.Studies.MA(maType, sd.days, field, 0, "_MA", stx, sd);
		var histogram = sd.name + "_hist";
		for (var i = Math.max(sd.startFrom, sd.days - 1); i < quotes.length; i++) {
			var quote = quotes[i];
			var val = CIQ.Studies.getQuoteFieldValue(quote, field, sd.subField);
			var qMA = quote["_MA " + sd.name];
			if (qMA || qMA === 0) {
				if (pts == "Points") quote[histogram] = val - qMA;
				else quote[histogram] = 100 * (val / qMA - 1);
			}
		}
		sd.outputMap = {};
		sd.outputMap[sd.name + "_hist"] = "";
	};

	CIQ.Studies.calculateGMMA = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var stPeriod = [3, 5, 8, 10, 12, 15];
		var ltPeriod = [30, 35, 40, 45, 50, 60];
		if (quotes.length < stPeriod[0]) {
			sd.error = true;
			return;
		}
		function ma(term) {
			return function (p) {
				CIQ.Studies.MA("ema", p, "Close", 0, "MA " + p, stx, sd);
				sd.outputMap["MA " + p + " " + sd.name] = term;
			};
		}
		sd.outputMap = {};
		stPeriod.forEach(ma("Short Term"));
		ltPeriod.forEach(ma("Long Term"));
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"MA Env": {
			name: "Moving Average Envelope",
			overlay: true,
			seriesFN: CIQ.Studies.displayChannel,
			calculateFN: CIQ.Studies.calculateMAEnvelope,
			inputs: {
				Period: 50,
				Field: "field",
				"Shift Type": ["percent", "points"],
				Shift: 5,
				"Moving Average Type": "ma",
				"Channel Fill": true
			},
			outputs: {
				"MA Env Top": "auto",
				"MA Env Median": "auto",
				"MA Env Bottom": "auto"
			},
			attributes: {
				Shift: { min: 0.1, step: 0.1 }
			}
		},
		"MA Dev": {
			name: "Moving Average Deviation",
			calculateFN: CIQ.Studies.calculateMADev,
			seriesFN: CIQ.Studies.displayHistogramWithSeries,
			inputs: {
				Period: 12,
				Field: "field",
				"Moving Average Type": "ma",
				"Points Or Percent": ["Points", "Percent"]
			},
			outputs: { "Increasing Bar": "#00DD00", "Decreasing Bar": "#FF0000" }
		},
		Guppy: {
			name: "Guppy Multiple Moving Average",
			overlay: true,
			calculateFN: CIQ.Studies.calculateGMMA,
			inputs: {},
			outputs: { "Short Term": "#ea1d2c", "Long Term": "#00afed" }
		},
		"High Low": {
			name: "High Low Bands",
			overlay: true,
			seriesFN: CIQ.Studies.displayChannel,
			calculateFN: function (stx, sd) {
				sd.inputs["Moving Average Type"] = "triangular";
				CIQ.Studies.calculateMAEnvelope(stx, sd);
			},
			inputs: {
				Period: 10,
				Field: "field",
				"Shift Percentage": 5,
				"Channel Fill": true
			},
			outputs: {
				"High Low Top": "auto",
				"High Low Median": "auto",
				"High Low Bottom": "auto"
			},
			attributes: {
				"Shift Percentage": { min: 0.1, step: 0.1 }
			}
		}
	});
}

};
__js_advanced_studies_movingAverages_(typeof window !== "undefined" ? window : global);
