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


import { CIQ as _CIQ } from "../../js/componentUI.js";
import "../../js/webcomponents_legacy/dialog.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Study parameters web component `<cq-study-parameter>`.
 *
 * See example in {@link WebComponents.cq-study-dialog}.
 *
 * @namespace WebComponents.cq-study-parameter
 */
class StudyParameter extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyParameter);
	}

	initialize(params) {
		this.params = params;
	}

	setColor(color) {
		if (!this.params) return;
		var updates = { parameters: {} };
		updates.parameters[this.params.parameter] = color;
		this.params.studyDialog.updateStudy(updates);
	}
}

CIQ.UI.addComponentDefinition("cq-study-parameter", StudyParameter);
