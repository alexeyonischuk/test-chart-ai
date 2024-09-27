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
 * <h4>&lt;cq-hu-static&gt;</h4>
 *
 * This web component displays the static heads up display.  This is a display of the market information at the point where the cursor lay.
 * The static heads-up marker does not follow the mouse cursor; rather, it shows in a static location on the chart as a marker.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.HeadsUpStatic
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.5.0
 */
class HeadsUpStatic extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, HeadsUpStatic);
		this.constructor = HeadsUpStatic;
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.attached = true; // prevent recursive recreation
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * Creates an instance of {@link CIQ.UI.HeadsUp}. Subscribes to the `headsUp` channel
	 * which provides messages to start and stop the marker.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.HeadsUpStatic
	 * @since 7.5.0
	 */
	setContext(context) {
		this.addDefaultMarkup();
		const UIHeadsUpStatic = new CIQ.UI.HeadsUp(this, context, {
			autoStart: true
		});

		const headsUp =
			context.config && context.config.channels
				? context.config.channels.headsUp
				: "layout.headsUp";
		this.channelSubscribe(headsUp, (value) => {
			UIHeadsUpStatic[
				value === "static" || (value || {}).static ? "begin" : "end"
			]();
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.HeadsUpStatic
 */
HeadsUpStatic.markup = `
		<div>
			<div>Price</div><cq-hu-price></cq-hu-price>
			<div>Open</div><cq-hu-open></cq-hu-open>
			<div>Close</div><cq-hu-close></cq-hu-close>
		</div>
		<div>
			<div>Vol</div>
			<cq-volume-section>
				<cq-hu-volume></cq-hu-volume>
				<cq-volume-rollup></cq-volume-rollup>
			</cq-volume-section>
			<div>High</div><cq-hu-high></cq-hu-high>
			<div>Low</div><cq-hu-low></cq-hu-low>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-hu-static", HeadsUpStatic);
