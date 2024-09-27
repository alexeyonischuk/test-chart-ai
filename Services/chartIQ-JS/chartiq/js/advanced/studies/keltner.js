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


let __js_advanced_studies_keltner_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error("keltner feature requires first activating studies feature.");
} else {
	CIQ.Studies.calculateKeltner = function (stx, sd) {
		CIQ.Studies.MA(
			sd.inputs["Moving Average Type"],
			sd.days,
			"Close",
			0,
			"MA",
			stx,
			sd
		);
		CIQ.Studies.calculateStudyATR(stx, sd);
		CIQ.Studies.calculateGenericEnvelope(
			stx,
			sd,
			sd.inputs.Shift,
			"MA " + sd.name,
			"ATR " + sd.name
		);
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		Keltner: {
			name: "Keltner Channel",
			overlay: true,
			seriesFN: CIQ.Studies.displayChannel,
			calculateFN: CIQ.Studies.calculateKeltner,
			inputs: {
				Period: 10,
				Shift: 5,
				"Moving Average Type": "ema",
				"Channel Fill": true
			},
			outputs: {
				"Keltner Top": "auto",
				"Keltner Median": "auto",
				"Keltner Bottom": "auto"
			},
			attributes: {
				Shift: { min: 0.1, step: 0.1 }
			}
		}
	});
}

};
__js_advanced_studies_keltner_(typeof window !== "undefined" ? window : global);
