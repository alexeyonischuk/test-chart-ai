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


let __js_advanced_studies_trix_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("trix feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateTRIX = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var name = sd.name;
		var fields = ["Close", "_MA1 " + name, "_MA2 " + name, "_MA3 " + name];
		for (var e = 0; e < fields.length - 1; e++) {
			CIQ.Studies.MA(
				"exponential",
				sd.days,
				fields[e],
				0,
				"_MA" + (e + 1).toString(),
				stx,
				sd
			);
		}

		var ma3 = fields[3];
		for (var i = Math.max(1, sd.startFrom); i < quotes.length; i++) {
			var q0 = quotes[i - 1][ma3];
			if (!q0) continue;
			var qima3 = quotes[i][ma3];
			if (qima3 || qima3 === 0)
				quotes[i]["Result " + name] = 100 * (qima3 / q0 - 1);
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		TRIX: {
			name: "TRIX",
			calculateFN: CIQ.Studies.calculateTRIX
		}
	});
}

};
__js_advanced_studies_trix_(typeof window !== "undefined" ? window : global);
