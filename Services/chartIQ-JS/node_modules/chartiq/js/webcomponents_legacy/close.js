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


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Close web component `<cq-close>`.
 *
 * cq-close web component will close its containing (parent or up) component
 * by calling its close() method
 * @namespace WebComponents.cq-close
 * @example
 * <cq-item>
 * 		<cq-label></cq-label>
 * 		<cq-close></cq-close>
 * </cq-item>
 *
 */
class Close extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		var self = this;
		function closure(e) {
			self.tap();
			e.stopPropagation();
		}
		CIQ.UI.stxtap(this, closure);
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Close);
	}

	/**
	 * @alias tap
	 * @memberof WebComponents.cq-close
	 */
	tap() {
		CIQ.UI.containerExecute(this, "close");
	}
}

CIQ.UI.addComponentDefinition("cq-close", Close);
