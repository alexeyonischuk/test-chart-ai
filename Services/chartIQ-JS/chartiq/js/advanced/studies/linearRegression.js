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


let __js_advanced_studies_linearRegression_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"linearRegression feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.prettify["time series"] = "tsma";
	CIQ.Studies.movingAverage.conversions.tsma = "time series";
	CIQ.Studies.movingAverage.translations["time series"] = "Time Series";
	CIQ.Studies.movingAverage.typeMap.tsma = "TimeSeries";
	CIQ.Studies.movingAverage.typeMap["time series"] = "TimeSeries";

	/**
	 * Calculate function for time series moving average.
	 *
	 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
	 *
	 * **Notes:**
	 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
	 * - To leverage as part of a larger study calculation, use {@link CIQ.Studies.MA} instead.
	 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
	 * - The study name may contain the unprintable character `&zwnj;`, see {@link studyDescriptor} documentation.
	 *
	 * @param  {CIQ.ChartEngine} stx Chart object
	 * @param {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
	 * @private
	 * @memberof CIQ.Studies
	 */
	CIQ.Studies.calculateMovingAverageTimeSeries = function (stx, sd) {
		sd.ma = new CIQ.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
		sd.ma.chart = sd.chart;
		sd.ma.days = sd.days;
		sd.ma.startFrom = sd.startFrom;
		sd.ma.inputs = sd.inputs;
		CIQ.Studies.calculateLinearRegressionIndicator(stx, sd.ma);

		var name = sd.name;
		for (var p in sd.outputs) {
			name = p + " " + name;
		}
		var offset = parseInt(sd.inputs.Offset, 10);
		if (isNaN(offset)) offset = 0;

		var quotes = sd.chart.scrubbed;
		// find start
		var offsetBack = offset;
		for (var i = sd.startFrom - 1; i >= 0; i--) {
			var val = CIQ.Studies.getQuoteFieldValue(quotes[i], name);
			if (val === null) continue;
			if (offsetBack > 0) {
				offsetBack--;
				continue;
			}
			break;
		}
		var futureTicks = [];
		for (i++; i < quotes.length; i++) {
			var quote = quotes[i];
			if (i + offset >= 0) {
				if (i + offset < quotes.length)
					quotes[i + offset][name] = quote["Forecast " + sd.name];
				else {
					var ft = {};
					ft[name] = quote["Forecast " + sd.name];
					futureTicks.push(ft);
				}
			}
		}
		sd.appendFutureTicks(stx, futureTicks);
	};

	CIQ.Studies.calculateLinearRegressionIndicator = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";

		var sumWeights = (sd.days * (sd.days + 1)) / 2;
		var squaredSumWeights = Math.pow(sumWeights, 2);
		var sumWeightsSquared = (sumWeights * (2 * sd.days + 1)) / 3;

		var sumCloses = 0;
		var sumWeightedCloses = 0;
		var sumClosesSquared = 0;
		if (sd.startFrom) {
			var sums = quotes[sd.startFrom - 1]["_sums " + sd.name];
			if (sums) {
				sumWeightedCloses = sums[0];
				sumCloses = sums[1];
				sumClosesSquared = sums[2];
			}
		}
		for (var i = sd.startFrom; i < quotes.length; i++) {
			var currentQuote = CIQ.Studies.getQuoteFieldValue(
				quotes[i],
				field,
				sd.subField
			);
			if (currentQuote === null) continue;
			sumWeightedCloses += sd.days * currentQuote - sumCloses;
			sumCloses += currentQuote;
			sumClosesSquared += Math.pow(currentQuote, 2);
			if (i < sd.days - 1) continue;
			else if (i > sd.days - 1) {
				var daysAgoQuote = CIQ.Studies.getQuoteFieldValue(
					quotes[i - sd.days],
					field,
					sd.subField
				);
				if (daysAgoQuote === null) continue;
				sumCloses -= daysAgoQuote;
				sumClosesSquared -= Math.pow(daysAgoQuote, 2);
			}
			var b =
				(sd.days * sumWeightedCloses - sumWeights * sumCloses) /
				(sd.days * sumWeightsSquared - squaredSumWeights);
			quotes[i]["Slope " + sd.name] = b;
			var a = (sumCloses - b * sumWeights) / sd.days;
			quotes[i]["Intercept " + sd.name] = a;
			quotes[i]["Forecast " + sd.name] = a + b * sd.days;
			var c =
				(sd.days * sumWeightsSquared - squaredSumWeights) /
				(sd.days * sumClosesSquared - Math.pow(sumCloses, 2));
			quotes[i]["RSquared " + sd.name] = b * b * c;
			quotes[i]["_sums " + sd.name] = [
				sumWeightedCloses,
				sumCloses,
				sumClosesSquared
			];
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Lin Fcst": {
			name: "Linear Reg Forecast",
			overlay: true,
			calculateFN: CIQ.Studies.calculateLinearRegressionIndicator,
			inputs: { Period: 14, Field: "field" },
			outputs: { Forecast: "auto" }
		},
		"Lin Incpt": {
			name: "Linear Reg Intercept",
			overlay: true,
			calculateFN: CIQ.Studies.calculateLinearRegressionIndicator,
			inputs: { Period: 14, Field: "field" },
			outputs: { Intercept: "auto" }
		},
		"Lin R2": {
			name: "Linear Reg R2",
			calculateFN: CIQ.Studies.calculateLinearRegressionIndicator,
			inputs: { Period: 14, Field: "field" },
			outputs: { RSquared: "auto" }
		},
		"LR Slope": {
			name: "Linear Reg Slope",
			calculateFN: CIQ.Studies.calculateLinearRegressionIndicator,
			inputs: { Period: 14, Field: "field" },
			outputs: { Slope: "auto" }
		},
		"Time Fcst": {
			name: "Time Series Forecast",
			overlay: true,
			calculateFN: CIQ.Studies.calculateLinearRegressionIndicator,
			inputs: { Period: 14, Field: "field" },
			outputs: { Forecast: "auto" }
		}
	});
}

};
__js_advanced_studies_linearRegression_(typeof window !== "undefined" ? window : global);
