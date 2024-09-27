
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


let __js_advanced_studies_accumulationDistribution_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"accumulationDistribution feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculateAccumulationDistribution = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		for (var i = sd.startFrom; i < quotes.length; i++) {
			if (!i) continue;
			var quote = quotes[i];
			if (quote.futureTick) break;
			var quote1 = quotes[i - 1];
			var todayAD = 0;
			if (quote.Close > quote1.Close) {
				todayAD = quote.Close - Math.min(quote.Low, quote1.Close);
			} else if (quote.Close < quote1.Close) {
				todayAD = quote.Close - Math.max(quote.High, quote1.Close);
			}
			if (sd.inputs["Use Volume"]) todayAD *= quote.Volume;

			var total = quote1["Result " + sd.name];
			if (!total) total = 0;
			total += todayAD;
			if (!isNaN(quote.Close)) quote["Result " + sd.name] = total;
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"W Acc Dist": {
			name: "Accumulation/Distribution",
			calculateFN: CIQ.Studies.calculateAccumulationDistribution,
			inputs: { "Use Volume": false }
		}
	});
}

};
__js_advanced_studies_accumulationDistribution_(typeof window !== "undefined" ? window : global);
