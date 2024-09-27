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


let __js_standard_studies_priceRelative_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"priceRelative feature requires first activating studies feature."
	);
} else {
	/**
	 * Initializes data for Price Relative Study by fetching the comparing symbol.
	 *
	 * @param {CIQ.ChartEngine} stx	The chart object
	 * @param {string} type Study type
	 * @param {object} inputs Study inputs
	 * @param {object} outputs Study outputs
	 * @param {object} parameters Study parameters
	 * @param {string} panel ID of the study's panel element
	 * @return {CIQ.Studies.StudyDescriptor} Study descriptor object
	 * @memberof CIQ.Studies
	 * @since 09-2016-19
	 */
	CIQ.Studies.initPriceRelative = function (
		stx,
		type,
		inputs,
		outputs,
		parameters,
		panel
	) {
		var sd = CIQ.Studies.initializeFN(
			stx,
			type,
			inputs,
			outputs,
			parameters,
			panel
		);
		var syms = [sd.inputs["Comparison Symbol"].toUpperCase()];

		CIQ.Studies.fetchAdditionalInstruments(stx, sd, syms);
		return sd;
	};

	/**
	 * Calculates data for Price Relative Study
	 *
	 * @param  {CIQ.ChartEngine} stx	The chart object
	 * @param  {object} sd	The study descriptor object
	 * @memberof CIQ.Studies
	 */
	CIQ.Studies.calculatePriceRelative = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var cSym = sd.inputs["Comparison Symbol"].toUpperCase();
		if (!cSym) cSym = sd.study.inputs["Comparison Symbol"];

		var map = {};
		var mainSymbol = stx.chart.symbol || "";
		mainSymbol = mainSymbol.replace(/[=+\-*\\%]/g, "");
		map[mainSymbol] = quotes.slice(sd.startFrom);
		if (!map[mainSymbol].length) return;
		if (mainSymbol != cSym) map[cSym] = null;
		var results = CIQ.computeEquationChart(
			"[" + mainSymbol + "]/[" + cSym + "]",
			map
		);
		var rIter = 0;
		for (
			var i = sd.startFrom;
			i < quotes.length && rIter < results.length;
			i++
		) {
			while (
				rIter < results.length &&
				quotes[i].DT.getTime() > results[rIter].DT.getTime()
			)
				rIter++;
			if (quotes[i].DT.getTime() < results[rIter].DT.getTime()) continue;
			quotes[i]["Result " + sd.name] = results[rIter].Close;
			rIter++;
		}
	};

	CIQ.Studies.displayVsComparisonSymbol = function (stx, sd, quotes) {
		var symbol = sd.inputs["Comparison Symbol"].toUpperCase();
		if (!stx.getSeries({ symbol: symbol, chart: sd.chart }).length) {
			stx.displayErrorAsWatermark(
				sd.panel,
				stx.translateIf(sd.study.name) + ": " + stx.translateIf("Not Available")
			);
			return;
		}
		var params = {
			skipTransform: stx.panels[sd.panel].name != sd.chart.name,
			panelName: sd.panel,
			band: "Result " + sd.name,
			threshold: sd.study.centerline,
			yAxis: sd.getYAxis(stx),
			gapDisplayStyle: true
		};
		var flipped = params.yAxis
			? params.yAxis.flipped
			: stx.panels[sd.panel].yAxis.flipped;
		var opacity = 0.3;
		if (!sd.highlight && stx.highlightedDraggable) opacity *= 0.3;

		for (var c = quotes.length - 1; c >= 0; c--) {
			if (quotes[c] && quotes[c][symbol]) {
				CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
				if (sd.study.centerline || sd.study.centerline === 0) {
					if (sd.outputs.Gain)
						CIQ.preparePeakValleyFill(
							stx,
							CIQ.extend(params, {
								direction: flipped ? -1 : 1,
								color: CIQ.Studies.determineColor(sd.outputs.Gain),
								opacity: opacity
							})
						);
					if (sd.outputs.Loss)
						CIQ.preparePeakValleyFill(
							stx,
							CIQ.extend(params, {
								direction: flipped ? 1 : -1,
								color: CIQ.Studies.determineColor(sd.outputs.Loss),
								opacity: opacity
							})
						);
				}
				return;
			}
		}
	};

	/**
	 * Ensures that symbols required by a study are loaded and maintained by the quotefeed.
	 * @param  {CIQ.ChartEngine} stx  The chart engine
	 * @param  {object} sd   The study descriptor
	 * @param  {array} syms An array of 'symbol strings' or 'symbol objects' required by the study. If using symbol objets, in addition to our desired identifier elements, you must `always` include the `symbol` element in it (ie: `symbolObject[i]={ symbol : mySymbol , otherStuff1 : xx , moreStuff : yy}`.
	 * @param {object} [params] Parameters to be sent to addSeries. See {@link CIQ.ChartEngine#addSeries}.
	 * @memberof CIQ.Studies
	 * @since 3.0.7 This was a previously private function.
	 */
	CIQ.Studies.fetchAdditionalInstruments = function (stx, sd, syms, params) {
		if (!stx.quoteDriver) {
			console.log(
				"CIQ.Studies.fetchAdditionalInstruments: No quotefeed to fetch symbol"
			);
			return;
		}
		// sd.chart may not be initialized, so we find it the hard way
		var chart = stx.panels[sd.panel].chart;

		// We'll remember which symbols we have set so that we can delete them later
		sd.symbols = syms;

		var i, symbol, symbolObject;
		// Add entries for the symbols we need. If those symbols already exist, add the study name as a dependency
		function addSeriesCB() {
			stx.createDataSet();
			stx.draw();
		}
		for (i = 0; i < syms.length; i++) {
			symbol = symbolObject = syms[i];
			if (typeof symbolObject == "object") {
				symbol = symbolObject.symbol;
			} else {
				symbolObject = { symbol: symbol };
			}
			var parameters = {
				symbol: symbol,
				symbolObject: symbolObject,
				bucket: "study",
				studyName: sd.name,
				chartName: chart.name,
				action: "add-study"
			};
			CIQ.extend(parameters, params);
			var loadData = parameters.loadData;
			if (stx.currentlyImporting) parameters.loadData = false; // do not load data if importing as periodicity will not be correct; instead let loadDependents load data
			if (!sd.series) sd.series = {};
			sd.series[symbol] = stx.addSeries(null, parameters, addSeriesCB);
			sd.series[symbol].parameters.loadData = loadData;
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"P Rel": {
			name: "Price Relative",
			initializeFN: CIQ.Studies.initPriceRelative,
			seriesFN: CIQ.Studies.displayVsComparisonSymbol,
			calculateFN: CIQ.Studies.calculatePriceRelative,
			centerline: 0,
			inputs: { "Comparison Symbol": "SPY" },
			deferUpdate: true
		}
	});
}

};
__js_standard_studies_priceRelative_(typeof window !== "undefined" ? window : global);
