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
import "../../../js/standard/studies/medianPrice.js";


let __js_advanced_studies_typicalPrice_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"typicalPrice feature requires first activating studies feature."
	);
} else if (!CIQ.Studies.calculateTypicalPrice) {
	console.error(
		"typicalPrice feature requires first activating medianPrice feature."
	);
} else {
	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"Typical Price": {
			name: "Typical Price",
			calculateFN: CIQ.Studies.calculateTypicalPrice,
			inputs: { Period: 14 }
		},
		"Weighted Close": {
			name: "Weighted Close",
			calculateFN: CIQ.Studies.calculateTypicalPrice,
			inputs: { Period: 14 }
		}
	});
}

};
__js_advanced_studies_typicalPrice_(typeof window !== "undefined" ? window : global);
