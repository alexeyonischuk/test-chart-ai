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


let __js_advanced_studies_psychologicalLine_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"psychologicalLine feature requires first activating studies feature."
	);
} else {
	CIQ.Studies.calculatePsychologicalLine = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		if (quotes.length < sd.days + 1) {
			sd.error = true;
			return;
		}
		var array = [];
		var increment = 100 / sd.days;
		var accum = 0;
		for (var i = Math.max(sd.startFrom - sd.days, 1); i < quotes.length; i++) {
			if (quotes[i].futureTick) break;
			var up = Number(quotes[i].Close > quotes[i - 1].Close);
			if (up) accum += increment;
			array.push(up);
			if (array.length > sd.days) accum -= array.shift() * increment;
			if (i < sd.startFrom) continue;
			if (!isNaN(quotes[i].Close)) quotes[i]["Result " + sd.name] = accum;
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		PSY: {
			name: "Psychological Line",
			range: "0 to 100",
			calculateFN: CIQ.Studies.calculatePsychologicalLine,
			inputs: { Period: 20 }
		}
	});
}

};
__js_advanced_studies_psychologicalLine_(typeof window !== "undefined" ? window : global);
