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
import "../../js/webcomponents_legacy/comparison.js";
import "../../js/webcomponents_legacy/lookup.js";
import "../../js/webcomponents_legacy/menu.js";
import "../../js/webcomponents_legacy/swatch.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */





var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * The comparison lookup web component `<cq-comparison-lookup>`.
 *
 * An encapsulation of the markup for the comparison lookup control, **+ Compare...**
 *
 * @namespace WebComponents.cq-comparison-lookup
 * @since 7.5.0
 *
 * @example
 * <cq-comparison cq-marker>
 *     <cq-menu class="cq-comparison-new" cq-focus="input">
 *         <cq-comparison-add-label class="ciq-no-share">
 *             <cq-comparison-plus></cq-comparison-plus><span>Compare</span><span>...</span>
 *         </cq-comparison-add-label>
 *         <cq-comparison-add>
 *             <cq-comparison-lookup-frame>
 *                 <cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
 *             </cq-comparison-lookup-frame>
 *             <cq-swatch cq-no-close></cq-swatch>
 *             <span><cq-accept-btn class="stx-btn">ADD</cq-accept-btn></span>
 *         </cq-comparison-add>
 *     </cq-menu>
 * </cq-comparison>
 */
class ComparisonLookup extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ComparisonLookup);
		this.constructor = ComparisonLookup;
	}

	/**
	 * Adds the default markup.
	 *
	 * @alias setContext
	 * @memberof WebComponents.cq-comparison-lookup
	 * @since 7.5.0
	 */
	setContext() {
		if (this.contextSet) return;
		this.contextSet = true;
		this.addDefaultMarkup();
	}
}

ComparisonLookup.markup = `
		<cq-comparison cq-marker>
			<cq-menu class="cq-comparison-new" cq-focus="input">
				<cq-comparison-add-label class="ciq-no-share">
					<cq-comparison-plus></cq-comparison-plus><span>Compare</span><span>...</span>
				</cq-comparison-add-label>
				<cq-comparison-add>
					<cq-comparison-lookup-frame>
						<cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
					</cq-comparison-lookup-frame>
					<cq-swatch cq-no-close></cq-swatch>
					<span><cq-accept-btn class="stx-btn">ADD</cq-accept-btn></span>
				</cq-comparison-add>
			</cq-menu>
		</cq-comparison>
	`;

CIQ.UI.addComponentDefinition("cq-comparison-lookup", ComparisonLookup);
