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


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Marker) {
	console.error(
		"attribution component requires first activating markers feature."
	);
} else {
	/**
	 * Attribution web component `<cq-attribution>`.
	 *
	 * This will put a node inside a panel to attribute the data.
	 * Both the main chart panel (for quotes) and a study panel can use an attribution.
	 *
	 * @namespace WebComponents.cq-attribution
	 * @since 2016-07-16
	 * @example
	 * <cq-attribution>
	 * 	<template>
	 * 		<cq-attrib-container>
	 * 			<cq-attrib-source></cq-attrib-source>
	 * 			<cq-attrib-quote-type></cq-attrib-quote-type>
	 * 		</cq-attrib-container>
	 * 	</template>
	 * </cq-attribution>
	 */
	class Attribution extends CIQ.UI.ModalTag {
		constructor() {
			super();
			/**
			 * Contains the attribution messages.
			 *
			 * Override or augment the following properties of the `messages` object:
			 * - `sources` &mdash; An object that contains properties whose values populate
			 *   `<cq-attrib-source>`.
			 * - `exchanges` &mdash; An object that contains properties whose values populate
			 *   `<cq-attrib-quote-type>`.
			 *
			 * For quotes, the source should match the quote source. For studies, the source should
			 * match the study type. If there is no matching source property, the associated
			 * component has no text.
			 *
			 * @type {object}
			 * @alias messages
			 * @memberof WebComponents.cq-attribution#
			 * @example <caption>Default object.</caption>
			 * {
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
			 * @example <caption>Override or augment the messages object.</caption>
			 * var messages =document.querySelector("cq-attribution").messages;
			 * messages.exchanges.CUSTOMEX='Text for custom exchange';
			 * messages.sources.CUSTOMSOURCE='Text for custom source';
			 * @example <caption>Set the attribution object on your quote feed for the above override.</caption>
			 * cb({
			 * quotes:[--array of quote elements here--],
			 * attribution: { source: "CUSTOMSOURCE", exchange: "CUSTOMEX" }
			 * });
			 */
			this.messages = {
				sources: {
					simulator: "Simulated data.",
					demo: "Demo data.",
					xignite:
						'<a target="_blank" href="https://www.xignite.com">Market Data</a> by Xignite.',
					fis_mm:
						'<a target="_blank" href="https://www.fisglobal.com/">Market Data</a> by FIS MarketMap.',
					Twiggs:
						'Twiggs MF Formula courtesy <a target="_blank" href="https://www.incrediblecharts.com/indicators/twiggs_money_flow.php">IncredibleCharts</a>.'
				},
				exchanges: {
					RANDOM: "Data is randomized.",
					"REAL-TIME": "Data is real-time.",
					DELAYED: "Data delayed 15 min.",
					RATES: "Yield data latest from source, bid/ask simulated.",
					BATS: "BATS BZX real-time.",
					EOD: "End of day data."
				}
			};
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Attribution);
			this.constructor = Attribution;
		}

		insert(stx, panel) {
			if (!CIQ.Marker) return;
			var attrib = CIQ.UI.makeFromTemplate(this.template);
			attrib.marker = new CIQ.Marker({
				stx: stx,
				node: attrib[0],
				xPositioner: "none",
				yPositioner: "none",
				label: "component",
				panelName: panel,
				permanent: true
			});
			return attrib;
		}

		setContext(context) {
			this.addDefaultMarkup();
			this.template = this.node.find("template");
			this.marker = this.insert(context.stx, "chart");
			var self = this;
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
		 * @alias displayAttribution
		 * @memberof WebComponents.cq-attribution#
		 * @since 8.3.0
		 */
		displayAttribution(stx) {
			if (!stx) stx = this.context.stx;
			var chart = stx.chart;
			var layout = stx.layout;
			var chartAttrib = this.marker;
			var source, exchange;
			if (chart.attribution) {
				source = this.messages.sources[chart.attribution.source];
				exchange = this.messages.exchanges[chart.attribution.exchange];
				if (!source) source = "";
				if (!exchange) exchange = "";
				if (source + exchange != chartAttrib.attr("lastAttrib")) {
					chartAttrib.find("cq-attrib-source").html(source);
					chartAttrib.find("cq-attrib-quote-type").html(exchange);
					if (stx.translateUI) stx.translateUI(chartAttrib[0]);
					chartAttrib.attr("lastAttrib", source + exchange);
				}
			}
			for (var study in layout.studies) {
				var sd = layout.studies[study];
				var type = sd.type;
				if (this.messages.sources[type]) {
					if (sd.attribution) {
						if (sd.attribution.marker.params.panelName == sd.panel) continue; // already have an attribution
					}
					source = this.messages.sources[type] || "";
					exchange = this.messages.exchanges[type] || "";
					var attrib = this.insert(stx, sd.panel);
					attrib.find("cq-attrib-source").html(source);
					attrib.find("cq-attrib-quote-type").html(exchange);
					if (stx.translateUI) stx.translateUI(attrib[0]);
					sd.attribution = attrib;
				}
			}
		}
	}

	Attribution.markup = `
		<template>
			<cq-attrib-container>
				<cq-attrib-source></cq-attrib-source>&nbsp;
				<cq-attrib-quote-type></cq-attrib-quote-type>
			</cq-attrib-container>
		</template>
	`;
	CIQ.UI.addComponentDefinition("cq-attribution", Attribution);
}
