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
import "../../js/webcomponents_legacy/studyLegend.js";
import "../../js/webcomponents_legacy/swatch.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * The chart legend web component `<cq-chart-legend>`.
 *
 * An encapsulation of the markup for the chart (or study) legend.
 *
 * Use the `cq-marker` attribute to ensure that the legend floats inside the chart. Set the
 * optional `cq-panel-only` attribute so that only studies from the panel containing the
 * legend are displayed. Set the optional `cq-clone-to-panels` attribute to create a legend
 * on each panel.
 *
 * The legend shows both studies and comparisons, so the `cq-content-keys` attribute should
 * include `cq-label` for studies and `cq-comparison-label` for comparisons.
 *
 * @namespace WebComponents.cq-chart-legend
 * @since 7.5.0
 *
 * @example
 * <cq-study-legend cq-chart-legend cq-marker-label="Plots" cq-clone-to-panels="Plots" cq-panel-only cq-marker cq-hovershow
 *     cq-content-keys="cq-label,cq-comparison-label">
 *     <cq-comparison>
 *         <cq-comparison-key cq-panel-only cq-all-series>
 *             <template cq-comparison-item>
 *                 <cq-comparison-item>
 *                     <cq-swatch cq-overrides="auto"></cq-swatch>
 *                     <cq-comparison-label>AAPL</cq-comparison-label>
 *                     <!-- cq-comparison-price displays the current price with color animation -->
 *                     <cq-comparison-price cq-animate></cq-comparison-price>
 *                     <!-- cq-comparison-tick-price displays the price for the active crosshair item -->
 *                     <!-- <cq-comparison-tick-price></cq-comparison-tick-price>    -->
 *                     <cq-comparison-loader></cq-comparison-loader>
 *                     <div class="stx-btn-ico ciq-close"></div>
 *                 </cq-comparison-item>
 *             </template>
 *         </cq-comparison-key>
 *     </cq-comparison>
 *     <template cq-study-legend>
 *         <cq-item>
 *             <cq-label></cq-label>
 *             <span class="ciq-edit"></span>
 *             <div class="ciq-icon ciq-close"></div>
 *         </cq-item>
 *     </template>
 * </cq-study-legend>
 */
class ChartLegend extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartLegend);
		this.constructor = ChartLegend;
	}

	/**
	 * Adds the default markup.
	 *
	 * @alias setContext
	 * @memberof WebComponents.cq-chart-legend
	 * @since 7.5.0
	 */
	setContext() {
		if (this.contextSet) return;
		this.contextSet = true;
		this.addDefaultMarkup();
	}
}

ChartLegend.markup = `
		<cq-study-legend cq-signal-studies-only cq-marker-label="Signals" cq-marker cq-hovershow>
				<template cq-study-legend>
					<cq-item>
						<cq-label class="click-to-edit"></cq-label>
					</cq-item>
				</template>
		</cq-study-legend>
		<cq-study-legend cq-chart-legend cq-marker-label="Plots" cq-clone-to-panels="Plots" cq-panel-only cq-marker cq-hovershow cq-content-keys="cq-label,cq-comparison-label">
			<cq-comparison>
				<cq-comparison-key cq-panel-only cq-all-series>
					<template cq-comparison-item>
						<cq-comparison-item>
							<span class="ciq-switch" keyboard-selectable-child></span>
							<cq-swatch cq-overrides="auto"></cq-swatch>
							<div class="stx-btn-ico ciq-close" keyboard-selectable-child="true"></div>
							<cq-comparison-label>AAPL</cq-comparison-label>
							<!-- cq-comparison-price displays the current price with color animation -->
							<cq-comparison-price cq-animate></cq-comparison-price>
							<!-- cq-comparison-tick-price displays the price for the active crosshair item -->
							<!-- <cq-comparison-tick-price></cq-comparison-tick-price>	-->
							<cq-comparison-loader></cq-comparison-loader>
						</cq-comparison-item>
					</template>
				</cq-comparison-key>
			</cq-comparison>
			<template cq-study-legend>
				<cq-item>
					<div class="ciq-icon ciq-close"></div>
					<cq-label></cq-label>
				</cq-item>
			</template>
		</cq-study-legend>
	`;
CIQ.UI.addComponentDefinition("cq-chart-legend", ChartLegend);
