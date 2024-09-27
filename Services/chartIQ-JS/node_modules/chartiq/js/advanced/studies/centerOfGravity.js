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


let __js_advanced_studies_centerOfGravity_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"centerOfGravity feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculateCenterOfGravity = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days) {
			sd.error = true;
			return;
		}
		var field = sd.inputs.Field;
		if (!field || field == "field") field = "Close";
		for (var i = Math.max(sd.startFrom, sd.days - 1); i < quotes.length; i++) {
			var num = 0,
				den = 0;
			for (var j = 0; j < sd.days; j++) {
				var val = CIQ.Studies.getQuoteFieldValue(quotes[i - j], field);
				num -= (j + 1) * val;
				den += val;
			}
			if (den) quotes[i]["Center of Gravity " + sd.name] = num / den;
		}
		CIQ.Studies.MA(
			"sma",
			3,
			"Center of Gravity " + sd.name,
			0,
			"Signal",
			stx,
			sd
		);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		COG: {
			name: "Center Of Gravity",
			calculateFN: CIQ.Studies.calculateCenterOfGravity,
			inputs: { Period: 10, Field: "field" },
			outputs: {
				"Center of Gravity": "auto",
				Signal: "red"
			}
		}
	});
}

};
__js_advanced_studies_centerOfGravity_(typeof window !== "undefined" ? window : global);
