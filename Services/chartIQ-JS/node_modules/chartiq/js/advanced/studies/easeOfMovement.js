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


let __js_advanced_studies_easeOfMovement_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"easeOfMovement feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculateEaseOfMovement = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days) {
			sd.error = true;
			return;
		}
		for (var i = Math.max(1, sd.startFrom); i < quotes.length; i++) {
			var avgCurrent = (quotes[i].High + quotes[i].Low) / 2;
			var avgPrior = (quotes[i - 1].High + quotes[i - 1].Low) / 2;
			var dm = avgCurrent - avgPrior;
			var br = quotes[i].Volume / 100000000 / (quotes[i].High - quotes[i].Low);
			var result = dm / br;
			if (!isFinite(result)) quotes[i]["_EOM1 " + sd.name] = NaN;
			//With NaN, the study plotter will plot from the previous point
			//directly to the next point after the current tick. Infinity was making the
			//study not plot in the panel at all while the data point was in dataSegement.
			else quotes[i]["_EOM1 " + sd.name] = result;
		}
		CIQ.Studies.MA(
			sd.inputs["Moving Average Type"],
			sd.days,
			"_EOM1 " + sd.name,
			0,
			"Result",
			stx,
			sd
		);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		EOM: {
			name: "Ease of Movement",
			calculateFN: CIQ.Studies.calculateEaseOfMovement,
			inputs: { Period: 14, "Moving Average Type": "ma" }
		}
	});
}

};
__js_advanced_studies_easeOfMovement_(typeof window !== "undefined" ? window : global);
