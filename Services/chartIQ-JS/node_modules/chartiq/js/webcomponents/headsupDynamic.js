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
 * <h4>&lt;cq-hu-dynamic&gt;</h4>
 *
 * This web component displays the dynamic heads up display.  This is a display of the market information at the point where the cursor lay.
 * The dynamic heads-up marker follows the mouse cursor.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.HeadsUpDynamic
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.5.0
 */
class HeadsUpDynamic extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, HeadsUpDynamic);
		this.constructor = HeadsUpDynamic;
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
	 * @tsmember WebComponents.HeadsUpDynamic
	 * @since 7.5.0
	 */
	setContext(context) {
		this.addDefaultMarkup();
		const UIHeadsUpDynamic = new CIQ.UI.HeadsUp(this, context, {
			followMouse: true,
			autoStart: false
		});

		const headsUp =
			context.config && context.config.channels
				? context.config.channels.headsUp
				: "layout.headsUp";
		this.channelSubscribe(headsUp, (value) => {
			UIHeadsUpDynamic[
				value === "dynamic" || (value || {}).dynamic ? "begin" : "end"
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
 * @tsmember WebComponents.HeadsUpDynamic
 */
HeadsUpDynamic.markup = `
		<svg version="1.1" x="0px" y="0px" viewBox="0 0 215 140" enableBackground="new 0 0 215 140">
			<defs>
				<filter id="ciq-hu-shadow" height="130%">
					<feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>
					<feOffset dx="0" dy="1" result="offsetblur"></feOffset>
					<feComponentTransfer>
						<feFuncA type="linear" slope="0.2"></feFuncA>
					</feComponentTransfer>
					<feMerge>
						<feMergeNode></feMergeNode>
						<feMergeNode in="SourceGraphic"></feMergeNode>
					</feMerge>
				</filter>
			</defs>
			<polygon
				class="ciq-hu-bg" style="stroke-width: 1;"
				points="198.4,124.4 1,124.4 1,1 214,1 214,137.8"
				filter="url(#ciq-hu-shadow)"
				/>
			<path class="ciq-hu-stroke"
				fill="#398DFF"
				d="M213,2v133.6l-13.7-11.8l-0.6-0.5H198H2V2H213 M215,0H0v125.4h198l17,14.6V0L215,0z">
			</path>
		</svg>
		<div>
			<cq-hu-col1>
				<cq-hu-date></cq-hu-date>
				<cq-hu-price></cq-hu-price>
				<cq-volume-grouping>
					<div>Volume</div>
					<div><cq-volume-visual></cq-volume-visual></div>
					<div><cq-hu-volume></cq-hu-volume><cq-volume-rollup></cq-volume-rollup></div>
				</cq-volume-grouping>
			</cq-hu-col1>
			<cq-hu-col2>
				<div>Open</div><cq-hu-open></cq-hu-open>
				<div>Close</div><cq-hu-close></cq-hu-close>
				<div>High</div><cq-hu-high></cq-hu-high>
				<div>Low</div><cq-hu-low></cq-hu-low>
			</cq-hu-col2>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-hu-dynamic", HeadsUpDynamic);
