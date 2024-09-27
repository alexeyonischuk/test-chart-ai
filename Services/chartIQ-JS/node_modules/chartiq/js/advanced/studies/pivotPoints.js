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


let __js_advanced_studies_pivotPoints_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"pivotPoints feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculatePivotPoints = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var period = "day",
			interval = stx.layout.interval,
			timeUnit = stx.layout.timeUnit;
		if (interval == "day") period = "month";
		else if (CIQ.ChartEngine.isDailyInterval(interval)) period = "year";
		else if (
			interval == "second" ||
			interval == "millisecond" ||
			timeUnit == "second" ||
			timeUnit == "millisecond"
		)
			period = "15min";
		else {
			var intvl = stx.layout.periodicity;
			if (interval != "minute") {
				intvl *= interval;
			}
			if (intvl >= 30) period = "week";
		}

		var marketOffset = null;
		var offset = 7 - CIQ.getFromNS(stx.chart, "market.beginningDayOfWeek", 0); // used to determine end of week

		var pointers = {
			pivotPoint: NaN,
			high: 0,
			low: 0,
			prevHigh: 0,
			prevLow: 0,
			hlSpread: 0
		};
		if (sd.startFrom > 1 && quotes[sd.startFrom - 1]["_pointers " + sd.name]) {
			pointers = CIQ.clone(quotes[sd.startFrom - 1]["_pointers " + sd.name]);
		}
		function resetPivots() {
			pointers.pivotPoint =
				(pointers.high + pointers.low + quotes[i - 1].Close) / 3;
			pointers.prevHigh = pointers.high;
			pointers.prevLow = pointers.low;
			pointers.hlSpread = pointers.high - pointers.low;
			pointers.high = pointers.low = 0;
		}
		for (var i = Math.max(1, sd.startFrom); i < quotes.length; i++) {
			if (!quotes[i - 1]) continue;
			pointers.high = Math.max(pointers.high, quotes[i - 1].High);
			pointers.low = Math.min(
				pointers.low > 0 ? pointers.low : quotes[i - 1].Low,
				quotes[i - 1].Low
			);
			if (sd.inputs.Continuous) resetPivots();
			else if (
				period == "year" &&
				quotes[i].DT.getYear() != quotes[i - 1].DT.getYear()
			) {
				//new yearly period
				resetPivots();
			} else if (
				period == "month" &&
				quotes[i].DT.getMonth() != quotes[i - 1].DT.getMonth()
			) {
				//new monthly period
				resetPivots();
			} else if (
				period == "week" &&
				(quotes[i].DT.getDay() + offset) % 7 <
					(quotes[i - 1].DT.getDay() + offset) % 7
			) {
				//new weekly period
				resetPivots();
			} else if (period == "day") {
				if (marketOffset === null) {
					//possible new daily period
					marketOffset = CIQ.Studies.getMarketOffset({
						stx,
						localQuoteDate: quotes[i].DT,
						shiftToDateBoundary: true
					});
				}
				var newDate = new Date(
					new Date(+quotes[i].DT).setMilliseconds(
						quotes[i].DT.getMilliseconds() + marketOffset
					)
				);
				var oldDate = new Date(
					new Date(+quotes[i - 1].DT).setMilliseconds(
						quotes[i - 1].DT.getMilliseconds() + marketOffset
					)
				);
				if (
					oldDate.getDate() !== newDate.getDate() &&
					oldDate.getDay() !== 0 &&
					stx.chart.market.isMarketDate(newDate)
				) {
					//new daily period
					marketOffset = null;
					resetPivots();
				}
			} else if (
				period == "15min" &&
				(quotes[i].DT.getHours() != quotes[i - 1].DT.getHours() ||
					Math.floor(quotes[i].DT.getMinutes() / 15) !=
						Math.floor(quotes[i - 1].DT.getMinutes() / 15))
			) {
				//new 15 minute period
				resetPivots();
			}
			quotes[i]["Pivot " + sd.name] = pointers.pivotPoint;
			if (sd.inputs.Type.toLowerCase() == "fibonacci") {
				quotes[i]["Resistance 1 " + sd.name] =
					pointers.pivotPoint + 0.382 * pointers.hlSpread;
				quotes[i]["Resistance 2 " + sd.name] =
					pointers.pivotPoint + 0.618 * pointers.hlSpread;
				quotes[i]["Resistance 3 " + sd.name] =
					pointers.pivotPoint + pointers.hlSpread;
				quotes[i]["Support 1 " + sd.name] =
					pointers.pivotPoint - 0.382 * pointers.hlSpread;
				quotes[i]["Support 2 " + sd.name] =
					pointers.pivotPoint - 0.618 * pointers.hlSpread;
				quotes[i]["Support 3 " + sd.name] =
					pointers.pivotPoint - pointers.hlSpread;
			} else {
				quotes[i]["Resistance 1 " + sd.name] =
					2 * pointers.pivotPoint - pointers.prevLow;
				quotes[i]["Resistance 2 " + sd.name] =
					pointers.pivotPoint + pointers.hlSpread;
				quotes[i]["Resistance 3 " + sd.name] =
					pointers.prevHigh + 2 * (pointers.pivotPoint - pointers.prevLow);
				quotes[i]["Support 1 " + sd.name] =
					2 * pointers.pivotPoint - pointers.prevHigh;
				quotes[i]["Support 2 " + sd.name] =
					pointers.pivotPoint - pointers.hlSpread;
				quotes[i]["Support 3 " + sd.name] =
					pointers.prevLow - 2 * (pointers.prevHigh - pointers.pivotPoint);
			}
			quotes[i]["_pointers " + sd.name] = CIQ.clone(pointers);
		}
	};

	CIQ.Studies.displayPivotPoints = function (stx, sd, quotes) {
		sd.noSlopes = !sd.inputs.Continuous;
		CIQ.Studies.displaySeriesAsLine(stx, sd, quotes);
		if (sd.inputs.Shading) {
			var panel = stx.panels[sd.panel];
			var params = {
				noSlopes: sd.noSlopes,
				opacity: sd.parameters.opacity ? sd.parameters.opacity : 0.2,
				skipTransform: panel.name != sd.chart.name,
				yAxis: sd.getYAxis(stx)
			};
			if (!sd.highlight && stx.highlightedDraggable) params.opacity *= 0.3;
			CIQ.prepareChannelFill(
				stx,
				CIQ.extend(
					{
						panelName: sd.panel,
						topBand: "Resistance 3 " + sd.name,
						bottomBand: "Resistance 2 " + sd.name,
						color: CIQ.Studies.determineColor(sd.outputs["Resistance 3"])
					},
					params
				)
			);
			CIQ.prepareChannelFill(
				stx,
				CIQ.extend(
					{
						panelName: sd.panel,
						topBand: "Resistance 2 " + sd.name,
						bottomBand: "Resistance 1 " + sd.name,
						color: CIQ.Studies.determineColor(sd.outputs["Resistance 2"])
					},
					params
				)
			);
			CIQ.prepareChannelFill(
				stx,
				CIQ.extend(
					{
						panelName: sd.panel,
						topBand: "Resistance 1 " + sd.name,
						bottomBand: "Pivot " + sd.name,
						color: CIQ.Studies.determineColor(sd.outputs["Resistance 1"])
					},
					params
				)
			);
			CIQ.prepareChannelFill(
				stx,
				CIQ.extend(
					{
						panelName: sd.panel,
						topBand: "Support 1 " + sd.name,
						bottomBand: "Pivot " + sd.name,
						color: CIQ.Studies.determineColor(sd.outputs["Support 1"])
					},
					params
				)
			);
			CIQ.prepareChannelFill(
				stx,
				CIQ.extend(
					{
						panelName: sd.panel,
						topBand: "Support 2 " + sd.name,
						bottomBand: "Support 1 " + sd.name,
						color: CIQ.Studies.determineColor(sd.outputs["Support 2"])
					},
					params
				)
			);
			CIQ.prepareChannelFill(
				stx,
				CIQ.extend(
					{
						panelName: sd.panel,
						topBand: "Support 3 " + sd.name,
						bottomBand: "Support 2 " + sd.name,
						color: CIQ.Studies.determineColor(sd.outputs["Support 3"])
					},
					params
				)
			);
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Pivot Points": {
			name: "Pivot Points",
			overlay: true,
			seriesFN: CIQ.Studies.displayPivotPoints,
			calculateFN: CIQ.Studies.calculatePivotPoints,
			inputs: {
				Type: ["standard", "fibonacci"],
				Continuous: false,
				Shading: false
			},
			outputs: {
				Pivot: "auto",
				"Resistance 1": "#b82c0b",
				"Support 1": "#699158",
				"Resistance 2": "#e36460",
				"Support 2": "#b3d987",
				"Resistance 3": "#ffd0cf",
				"Support 3": "#d3e8ae"
			},
			parameters: {
				init: { opacity: 0.2 }
			}
		}
	});
}

};
__js_advanced_studies_pivotPoints_(typeof window !== "undefined" ? window : global);
