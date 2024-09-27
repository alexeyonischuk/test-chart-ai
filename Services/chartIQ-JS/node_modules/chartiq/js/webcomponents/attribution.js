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
import "../../js/standard/markers.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Marker) {
	console.error(
		"attribution component requires first activating markers feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-attribution&gt;</h4>
	 *
	 * This will put a node inside a panel to attribute the data.
	 * Both the main chart panel (for quotes) and a study panel can use an attribution.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @alias WebComponents.Attribution
	 * @extends CIQ.UI.ModalTag
	 * @class
	 * @protected
	 * @since 2016-07-16
	 */
	class Attribution extends CIQ.UI.ModalTag {
		constructor() {
			super();
			/**
			 * Contains the attribution messages.
			 *
			 * Override or augment the following properties of the `messages` object.
			 * Note this is not done directly, but rather via the context configuration:
			 * - `sources` &mdash; An object that contains properties whose values populate
			 *   `<span attrib-source>`.
			 * - `exchanges` &mdash; An object that contains properties whose values populate
			 *   `<span attrib-quote-type>`.
			 *
			 * For quotes, the source should match the quote source. For studies, the source should
			 * match the study type. If there is no matching source property, the associated
			 * component has no text.
			 *
			 * @type {object}
			 * @example <caption>Default object.</caption>
			 * stxx.uiContext.config.attributions = {
			 *	sources: {
			 *		simulator: "Simulated data.",
			 *		demo: "Demo data.",
			 *		xignite: '<a target="_blank" href="https://www.xignite.com">Market Data</a> by Xignite.',
			 *		fis_mm: '<a target="_blank" href="https://www.fisglobal.com/">Market Data</a> by FIS MarketMap.',
			 *		Twiggs: 'Twiggs MF Formula courtesy <a target="_blank" href="https://www.incrediblecharts.com/indicators/twiggs_money_flow.php">IncredibleCharts</a>.'
			 *	},
			 *	exchanges: {
			 *		RANDOM: "Data is randomized.",
			 *		"REAL-TIME": "Data is real-time.",
			 *		DELAYED: "Data delayed 15 min.",
			 *		RATES: "Yield data latest from source, bid/ask simulated.",
			 *		BATS: "BATS BZX real-time.",
			 *		EOD: "End of day data."
			 *	}
			 * }
			 *
			 * @example <caption>Set the attribution object on your quote feed for the above override.</caption>
			 * cb({
			 * quotes:[--array of quote elements here--],
			 * attribution: { source: "CUSTOMSOURCE", exchange: "CUSTOMEX" }
			 * });
			 *
			 * @tsmember WebComponents.Attribution
			 */
			this.messages = {
				sources: {},
				exchanges: {}
			};
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Attribution);
			this.constructor = Attribution;
		}

		/**
		 * Creates a marker and returns it within a DOM node.
		 *
		 * @param {CIQ.ChartEngine} stx Chart engine instance.
		 * @param {String} panel Name of panel to place marker in.
		 * @return {HTMLElement} DOM node with marker in it.
		 *
		 * @tsmember WebComponents.Attribution
		 */
		insert(stx, panel) {
			if (!CIQ.Marker) return;
			const attrib = CIQ.UI.makeFromTemplate(this.template)[0];
			attrib.marker = new CIQ.Marker({
				stx: stx,
				node: attrib,
				xPositioner: "none",
				yPositioner: "none",
				label: "component",
				panelName: panel,
				permanent: true
			});
			return attrib;
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.Attribution
		 */
		setContext(context) {
			this.addDefaultMarkup();
			if (context.config) {
				const { attributions } = context.config;
				if (attributions) {
					CIQ.extend(this.messages.sources, attributions.sources);
					CIQ.extend(this.messages.exchanges, attributions.exchanges);
				}
			}
			this.template = this.querySelector("template");
			this.marker = this.insert(context.stx, "chart");
			const self = this;
			this.addInjection("append", "createDataSet", function () {
				return self.displayAttribution(this);
			});
			this.displayAttribution();
		}

		/**
		 * Displays an attribution on the chart. Attributions are messages about the chart data
		 * source.
		 *
		 * Called automatically whenever the data set is modified, but may also be called on
		 * demand.
		 *
		 * @param {CIQ.ChartEngine} [stx] The chart engine for which the attribution is displayed.
		 * 		Defaults to the chart engine contained in the context.
		 *
		 * @since 8.3.0
		 *
		 * @tsmember WebComponents.Attribution
		 */
		displayAttribution(stx) {
			if (!stx) stx = this.context.stx;
			const { chart, layout } = stx;
			const chartAttrib = this.marker;
			let source, exchange;
			if (chart.attribution) {
				source = this.messages.sources[chart.attribution.source];
				exchange = this.messages.exchanges[chart.attribution.exchange];
				if (!source) source = "";
				if (!exchange) exchange = "";
				if (source + exchange != chartAttrib.getAttribute("last-attrib")) {
					chartAttrib.querySelector("[attrib-source]").innerHTML = source;
					chartAttrib.querySelector("[attrib-quote-type]").innerHTML = exchange;
					if (stx.translateUI) stx.translateUI(chartAttrib[0]);
					chartAttrib.setAttribute("last-attrib", source + exchange);
				}
			}
			for (let study in layout.studies) {
				const sd = layout.studies[study];
				const { type } = sd;
				if (this.messages.sources[type]) {
					if (sd.attribution) {
						if (sd.attribution.marker.params.panelName == sd.panel) continue; // already have an attribution
					}
					source = this.messages.sources[type] || "";
					exchange = this.messages.exchanges[type] || "";
					const attrib = this.insert(stx, sd.panel);
					attrib.querySelector("[attrib-source]").innerHTML = source;
					attrib.querySelector("[attrib-quote-type]").innerHTML = exchange;
					if (stx.translateUI) stx.translateUI(attrib);
					sd.attribution = attrib;
				}
			}
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.Attribution
	 */
	Attribution.markup = `
		<template>
			<div attrib-container>
				<span attrib-source></span>&nbsp;
				<span attrib-quote-type></span>
			</div>
		</template>
	`;
	CIQ.UI.addComponentDefinition("cq-attribution", Attribution);
}
