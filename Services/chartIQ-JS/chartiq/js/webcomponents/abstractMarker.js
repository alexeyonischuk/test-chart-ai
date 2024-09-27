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
 * <h4>&lt;cq-abstract-marker&gt;</h4>
 *
 * An encapsulation of a complex marker which can contain HTML, video, images, CSS, and
 * animations.
 *
 * The component can be extended with additional markup types specified as values of the `cq-type` attribute.
 *
 * For demonstration purposes, this component ships with a built-in "helicopter" marker.
 * To add additional abstract markers (or to overwrite the built-in), assign the markup to a property in the context configuration (see example).
 *
 * @example <caption>Configure abstract marker:</caption>
 * stxx.uiContext.config.abstractMarkers.myCustomMarker = "<div style='color: red;'>CUSTOM MARKER!!!</div>";
 *
 * @example <caption>Use of component for abstract marker:</caption>
 * <cq-abstract-marker cq-type="myCustomMarker"></cq-abstract-marker>
 *
 * @alias WebComponents.AbstractMarker
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.5.0
 */
class AbstractMarker extends CIQ.UI.ContextTag {
	constructor() {
		super();
		/**
		 * Contains the abstract markers' markup.
		 *
		 * Override or augment the following properties of the `abstracts` object.
		 * Note this is not done directly, but rather via the context configuration.
		 *
		 * @type {object}
		 * @example <caption>Built-in helicopter marker markup:</caption>
		 *	{
		 *	 	helicopter:
		 *			<div class="sample">
		 *				<div stage>
		 *					<div helicopter>
		 *						<div propeller style="height: 160px;">
		 *							<div spinner style="-webkit-transform-origin: 40px 0 0; transform-origin: 40px 0 0;">
		 *								<div style="-webkit-transform: rotateY(0deg) translateX(40px); transform: rotateY(0deg) translateX(40px);"></div>
		 *								<div style="-webkit-transform: rotateY(-90deg) translateX(40px); transform: rotateY(-90deg) translateX(40px);"></div>
		 *								<div style="-webkit-transform: rotateY(-180deg) translateX(40px); transform: rotateY(-180deg) translateX(40px);"></div>
		 *								<div style="-webkit-transform: rotateY(-270deg) translateX(40px); transform: rotateY(-270deg) translateX(40px);"></div>
		 *							</div>
		 *						</div>
		 *						<div heli-body></div>
		 *					</div>
		 *				</div>
		 *				<div class="text">This is an example of a complex marker which can contain html, video, images, css, and animations.</div>
		 *			</div>
		 *  }`
		 *
		 * @example <caption>Use of cq-type attribute to access helicopter marker:</caption>
		 * <cq-abstract-marker cq-type="helicopter"></cq-abstract-marker>
		 *
		 * @example <caption>Augment from context configuration:</caption>
		 * stxx.uiContext.config.abstractMarkers = {
		 * 		helicopter: "<div>...</div>",
		 *      another: "<div>...</div>",
		 * 		...
		 * };
		 *
		 * @tsmember WebComponents.AbstractMarker
		 *
		 * @since 9.1.0
		 */
		this.abstracts = {
			helicopter: `
				<div class="sample">
					<div stage>
						<div helicopter>
							<div propeller style="height: 160px;">
								<div spinner style="-webkit-transform-origin: 40px 0 0; transform-origin: 40px 0 0;">
									<div style="-webkit-transform: rotateY(0deg) translateX(40px); transform: rotateY(0deg) translateX(40px);"></div>
									<div style="-webkit-transform: rotateY(-90deg) translateX(40px); transform: rotateY(-90deg) translateX(40px);"></div>
									<div style="-webkit-transform: rotateY(-180deg) translateX(40px); transform: rotateY(-180deg) translateX(40px);"></div>
									<div style="-webkit-transform: rotateY(-270deg) translateX(40px); transform: rotateY(-270deg) translateX(40px);"></div>
								</div>
							</div>
							<div heli-body></div>
						</div>
					</div>
					<div class="text">This is an example of a complex marker which can contain html, video, images, css, and animations.</div>
				</div>
			`
		};
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, AbstractMarker);
		this.constructor = AbstractMarker;
	}

	/**
	 * Initializes the component.
	 *
	 * @since 7.5.0
	 *
	 * @tsmember WebComponents.AbstractMarker
	 */
	init() {
		const type = this.getAttribute("cq-type") || "helicopter";
		let { markup } = this.constructor;
		markup = markup.replace(/\{\{dom\}\}/g, this.abstracts[type]);
		this.addDefaultMarkup(null, markup);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.AbstractMarker
	 */
	setContext(context) {
		if (context.config) {
			const { abstractMarkers } = context.config;
			CIQ.extend(this.abstracts, abstractMarkers);
		}
		this.init();
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * This markup contains placeholder values which the component replaces with values from its attributes.
 * Variables are represented in double curly-braces, for example: `{{text}}`.
 * The following variables are defined:
 * | variable      | source |
 * | :------------ | :----- |
 * | dom           | from config, default to built-in |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.AbstractMarker
 */
AbstractMarker.markup = `
	<div class="stx-marker-templates" style="left: -1000px; visibility:hidden;">
		<!-- Abstract Markers. You can remove this unless you actually need a helicopter. Seriously though, markers can be anything you want them to be! -->
		<div class="abstract">
			<div class="stx-marker abstract">
				<div class="stx-marker-content">
					{{dom}}
				</div>
			</div>
		</div>
	</div>
	`;
CIQ.UI.addComponentDefinition("cq-abstract-marker", AbstractMarker);
