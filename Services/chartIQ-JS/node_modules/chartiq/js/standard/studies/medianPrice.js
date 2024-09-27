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


let __js_standard_studies_medianPrice_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"medianPrice feature requires first activating studies feature."
	);
} else {
	/**
	 * Calculate function for Typical Price studies. Median Price, Typical Price and Weighted Close.
	 *
	 * The resulting values will be added to the dataSet using the field name provided by the `sd.outputMap` entry.
	 *
	 * **Notes:**
	 * - This function calculates a single value, so it expects `sd.outputMap` to contain a single mapping.
	 * - If no `outputs` object is defined in the library entry, the study will default to a single output named `Result`, which will then be used in lieu of `sd.outputs` to build the field name.
	 * - The study name may contain the unprintable character `&zwnj;`, see {@link studyDescriptor} documentation.
	 *
	 * @param  {CIQ.ChartEngine} stx Chart object
	 * @param  {CIQ.Studies.StudyDescriptor} sd  Study Descriptor
	 * @memberof CIQ.Studies
	 */
	CIQ.Studies.calculateTypicalPrice = function (stx, sd) {
		var quotes = sd.chart.scrubbed;
		var period = sd.days;
		if (quotes.length < period + 1) {
			if (!sd.overlay) sd.error = true;
			return;
		}
		var name = sd.name;
		for (var p in sd.outputs) {
			name = p + " " + name;
		}
		var field = "hlc/3";
		if (sd.type == "Med Price") field = "hl/2";
		else if (sd.type == "Weighted Close") field = "hlcc/4";

		var total = 0;
		if (sd.startFrom <= period) sd.startFrom = 0;
		for (var i = sd.startFrom; i < quotes.length; i++) {
			if (i && quotes[i - 1][name]) total = quotes[i - 1][name] * period;
			total += quotes[i][field];
			if (i >= period) {
				total -= quotes[i - period][field];
				quotes[i][name] = total / period;
			}
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Med Price": {
			name: "Median Price",
			calculateFN: CIQ.Studies.calculateTypicalPrice,
			inputs: { Period: 14 }
		}
	});
}

};
__js_standard_studies_medianPrice_(typeof window !== "undefined" ? window : global);
