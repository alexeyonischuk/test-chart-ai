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
 * The abstract marker web component `<cq-abstract-marker>`.
 *
 * An encapsulation of a complex marker which can contain HTML, video, images, CSS, and
 * animations.
 *
 * The component can be extended with additional markup types specified as values of the
 * `cq-type` attribute.
 *
 * @namespace WebComponents.cq-abstract-marker
 * @since 7.5.0
 *
 * @example
 * <caption>Abstract markers can be anything you want them to be &mdash; even a helicopter!</caption>
 * <div class="stx-marker-templates" style="left: -1000px; visibility:hidden;">
 *     <div class="abstract">
 *         <div class="stx-marker abstract">
 *             <div class="stx-marker-content">
 *                 <div class="sample">
 *                     <div stage>
 *                         <div helicopter>
 *                             <div propeller style="height: 160px;">
 *                                 <div spinner style="-webkit-transform-origin: 40px 0 0; transform-origin: 40px 0 0;">
 *                                     <div style="-webkit-transform: rotateY(0deg) translateX(40px);
 *                                                 transform: rotateY(0deg) translateX(40px);"></div>
 *                                     <div style="-webkit-transform: rotateY(-90deg) translateX(40px);
 *                                                 transform: rotateY(-90deg) translateX(40px);"></div>
 *                                     <div style="-webkit-transform: rotateY(-180deg) translateX(40px);
 *                                                 transform: rotateY(-180deg) translateX(40px);"></div>
 *                                     <div style="-webkit-transform: rotateY(-270deg) translateX(40px);
 *                                                 transform: rotateY(-270deg) translateX(40px);"></div>
 *                                 </div>
 *                             </div>
 *                             <div heli-body></div>
 *                         </div>
 *                     </div>
 *                     <div class="text">This is an example of a complex marker which can contain HTML, video, images, CSS, and animations.</div>
 *                 </div>
 *             </div>
 *         </div>
 *     </div>
 * </div>
 */
class AbstractMarker extends CIQ.UI.BaseComponent {
	/**
	 * Obtains the type of markup for the component. Called when the tag is instantiated.
	 *
	 * @alias connectedCallback
	 * @memberof WebComponents.cq-abstract-marker
	 * @private
	 * @since 7.5.0
	 */
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		this.init();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, AbstractMarker);
		this.constructor = AbstractMarker;
	}

	/**
	 * Initializes the component.
	 *
	 * @alias init
	 * @memberof WebComponents.cq-abstract-marker
	 * @since 7.5.0
	 */
	init() {
		this.type = this.getAttribute("cq-type") || "helicopter";
		const { markups } = this.constructor;
		this.addDefaultMarkup(this, markups[this.type]);
	}
}

AbstractMarker.markups = {
	helicopter: `
		<div class="stx-marker-templates" style="left: -1000px; visibility:hidden;">
			<!-- Abstract Markers. You can remove this unless you actually need a helicopter. Seriously though, markers can be anything you want them to be! -->
			<div class="abstract">
				<div class="stx-marker abstract">
					<div class="stx-marker-content">
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
					</div>
				</div>
			</div>
		</div>
		`
};
CIQ.UI.addComponentDefinition("cq-abstract-marker", AbstractMarker);
