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

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-loader&gt;</h4>
 *
 * CSS loading icon.
 * The component may be shown or hidden either by calling its `show()` or `hide()` methods; or by adding or removing the `stx-show` class.
 *
 * @alias WebComponents.Loader
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class Loader extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Loader);
	}

	/**
	 * Shows the loading icon.
	 *
	 * @param {boolean} [applyClass=false] Applies the ciq-loading-data class to the chart container, which by default dims the chart.
	 *
	 * @since 9.4.0 added applyClass parameter
	 *
	 * @tsmember WebComponents.Loader
	 */
	show(applyClass) {
		this.classList.add("stx-show");
		const { context } = this;
		this.isShowing = true;
		if (context && applyClass) {
			this.applyClass = applyClass;
			context.stx.container.classList.add("ciq-loading-data");
		}
	}

	/**
	 * Hides the loading icon.
	 *
	 * @tsmember WebComponents.Loader
	 */
	hide() {
		this.classList.remove("stx-show");
		this.isShowing = false;
		const { context } = this;
		if (context && this.applyClass) {
			context.stx.container.classList.remove("ciq-loading-data");
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Loader
	 */
	setContext(context) {
		if (this.parentNode.stx) context.setLoader(this);
		if (!this.isShowing) this.hide();
	}
}

CIQ.UI.addComponentDefinition("cq-loader", Loader);
