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
import "../../../js/standard/studies/priceRelative.js";


let __js_advanced_studies_comparisonStudies_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"comparisonStudies feature requires first activating studies feature."
	);
} else if (!CIQ.Studies.initPriceRelative) {
	console.error(
		"comparisonStudies feature requires first activating priceRelative feature."
	);
} else {
	/**
	 * Calculate function for correlation coefficient
	 * @param  {CIQ.ChartEngine} stx Chart object
	 * @param  {object} sd  Study Descriptor
	 * @memberOf CIQ.Studies
	 */
	CIQ.Studies.calculateCorrelationCoefficient = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var period = sd.days;
		if (quotes.length < period + 1) {
			sd.error = true;
			return;
		}
		//var base=stx.chart.symbol;
		sd.compare = sd.inputs["Compare To"];
		if (!sd.compare) {
			sd.compare = [];
			sd.outputs = {};
			sd.outputMap = {};
			for (var s in stx.chart.series) {
				var series = stx.chart.series[s];
				if (series.parameters.color) {
					sd.compare.push(series.display);
					sd.outputs["Result " + series.display] = series.parameters.color;
					sd.outputMap["Result " + series.display + " " + sd.name] =
						"Result " + series.display;
				}
			}
		} else {
			sd.compare = [sd.compare];
		}
		if (!sd.compare.length) {
			sd.error =
				"Correlation Coefficient requires at least one comparison symbol";
			return;
		}
		for (var sym = 0; sym < sd.compare.length; sym++) {
			var sB = 0;
			var sC = 0;
			var sB2 = 0;
			var sC2 = 0;
			var sBC = 0;
			var thisCompare = sd.compare[sym];
			var iters = 0;
			for (var i = sd.startFrom - period; i < quotes.length; i++) {
				//last tick has no compare data
				if (!quotes[i]) continue;
				var comparisonQuote = CIQ.Studies.getQuoteFieldValue(
					quotes[i],
					thisCompare
				);
				if (comparisonQuote === null) {
					if (
						i > 0 &&
						quotes[i - 1] &&
						quotes[i - 1]["_temps " + sd.name] &&
						quotes[i - 1]["_temps " + sd.name].c
					)
						comparisonQuote = quotes[i - 1]["_temps " + sd.name].c;
					else comparisonQuote = 0;
				}
				if (comparisonQuote && typeof comparisonQuote == "object")
					comparisonQuote = comparisonQuote.Close;
				quotes[i]["_temps " + sd.name] = {};
				sB += quotes[i]["_temps " + sd.name].b = quotes[i].Close;
				sC += quotes[i]["_temps " + sd.name].c = comparisonQuote;
				sB2 += quotes[i]["_temps " + sd.name].b2 = Math.pow(quotes[i].Close, 2);
				sC2 += quotes[i]["_temps " + sd.name].c2 = Math.pow(comparisonQuote, 2);
				sBC += quotes[i]["_temps " + sd.name].bc =
					quotes[i].Close * comparisonQuote;
				if (iters >= period) {
					sB -= quotes[i - period]["_temps " + sd.name].b;
					sC -= quotes[i - period]["_temps " + sd.name].c;
					sB2 -= quotes[i - period]["_temps " + sd.name].b2;
					sC2 -= quotes[i - period]["_temps " + sd.name].c2;
					sBC -= quotes[i - period]["_temps " + sd.name].bc;

					var vb = sB2 / period - Math.pow(sB / period, 2);
					var vc = sC2 / period - Math.pow(sC / period, 2);
					var cv = sBC / period - (sB * sC) / Math.pow(period, 2);
					var cc = cv / Math.sqrt(vb * vc);
					quotes[i]["Result " + thisCompare + " " + sd.name] = cc;
				}
				iters++;
			}
		}
	};

	CIQ.Studies.calculatePerformance = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var cSym = sd.inputs["Comparison Symbol"].toUpperCase();
		if (!cSym) cSym = sd.study.inputs["Comparison Symbol"];
		if (!sd.days) sd.days = sd.study.inputs.Period;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}

		CIQ.Studies.MA("ma", sd.days, "Close", 0, "_MA Base", stx, sd);
		CIQ.Studies.MA("ma", sd.days, cSym, 0, "_MA Comp", stx, sd);
		for (var i = sd.startFrom; i < quotes.length; i++) {
			var cSymQ = CIQ.Studies.getQuoteFieldValue(quotes[i], cSym);
			quotes[i]["Result " + sd.name] =
				(quotes[i].Close / cSymQ) *
				(quotes[i]["_MA Comp " + sd.name] / quotes[i]["_MA Base " + sd.name]);
		}
	};

	CIQ.Studies.calculateBeta = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var cSym = sd.inputs["Comparison Symbol"].toUpperCase();
		if (!cSym) cSym = sd.study.inputs["Comparison Symbol"];
		if (!sd.days) sd.days = sd.study.inputs.Period;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}

		for (var i = Math.max(sd.startFrom, 1); i < quotes.length; i++) {
			quotes[i]["_BaseChange " + sd.name] =
				quotes[i].Close / quotes[i - 1].Close - 1;
			var cSymQ = CIQ.Studies.getQuoteFieldValue(quotes[i], cSym);
			var cSymQ1 = CIQ.Studies.getQuoteFieldValue(quotes[i - 1], cSym);
			quotes[i]["_CompChange " + sd.name] = cSymQ / cSymQ1 - 1;
		}
		CIQ.Studies.MA(
			"ma",
			sd.days,
			"_BaseChange " + sd.name,
			0,
			"_MA Base",
			stx,
			sd
		);
		CIQ.Studies.MA(
			"ma",
			sd.days,
			"_CompChange " + sd.name,
			0,
			"_MA Comp",
			stx,
			sd
		);
		for (i = Math.max(sd.startFrom, sd.days); i < quotes.length; i++) {
			quotes[i]["_COVARn " + sd.name] =
				(quotes[i]["_BaseChange " + sd.name] -
					quotes[i]["_MA Base " + sd.name]) *
				(quotes[i]["_CompChange " + sd.name] -
					quotes[i]["_MA Comp " + sd.name]);
			quotes[i]["_VARn " + sd.name] = Math.pow(
				quotes[i]["_CompChange " + sd.name] - quotes[i]["_MA Comp " + sd.name],
				2
			);
		}
		CIQ.Studies.MA("ma", sd.days, "_COVARn " + sd.name, 0, "_COVAR", stx, sd);
		CIQ.Studies.MA("ma", sd.days, "_VARn " + sd.name, 0, "_VAR", stx, sd);
		for (i = Math.max(sd.startFrom, sd.days * 2 - 1); i < quotes.length; i++) {
			quotes[i]["Result " + sd.name] =
				quotes[i]["_COVAR " + sd.name] / quotes[i]["_VAR " + sd.name];
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		correl: {
			name: "Correlation Coefficient",
			range: "-1 to 1",
			calculateFN: CIQ.Studies.calculateCorrelationCoefficient,
			outputs: {}
		},
		"Perf Idx": {
			name: "Performance Index",
			centerline: 1,
			initializeFN: CIQ.Studies.initPriceRelative,
			seriesFN: CIQ.Studies.displayVsComparisonSymbol,
			calculateFN: CIQ.Studies.calculatePerformance,
			inputs: { Period: 120, "Comparison Symbol": "SPY" },
			outputs: { Result: "auto", Gain: "#00DD00", Loss: "#FF0000" },
			deferUpdate: true
		},
		Beta: {
			name: "Beta",
			centerline: 1,
			initializeFN: CIQ.Studies.initPriceRelative,
			seriesFN: CIQ.Studies.displayVsComparisonSymbol,
			calculateFN: CIQ.Studies.calculateBeta,
			inputs: { Period: 20, "Comparison Symbol": "SPY" },
			deferUpdate: true
		}
	});
}

};
__js_advanced_studies_comparisonStudies_(typeof window !== "undefined" ? window : global);
