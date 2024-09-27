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

let InstantChart_movedDialogs = false;

/**
 * Container web component `<cq-instant-chart>`. Used to contain charts in multi-chart
 * environments.
 *
 * The `<cq-instant-chart>` element has the following custom attributes:
 * - `tmpl-src` &mdash; Specifies a template source file that contains the chart user interface
 * elements.
 * - `symbol` &mdash; Provides the primary chart symbol.
 * - `env-container` &mdash; Identifies an HTML DOM node (for example "body") that is used to
 * contain transient user interface elements such as dialog boxes and color pickers.
 * - `cq-event-flag` &mdash; Indicates that an instant chart container has dispatched an event.
 * Enables the container element to be identified so that an event handler can be called for the
 * element. See the *sample-template-multi-charts.html* template for an example.
 *
 * Dispatches a `signal-chart-ready` event. Event listeners typically run a handler that
 * configures the chart.
 *
 * @namespace WebComponents.cq-instant-chart
 *
 * @example
 * <div class="column left"><cq-instant-chart tmpl-src="examples/templates/partials/sample-template-advanced-context.html"  id="chart0" symbol="AAPL"></cq-instant-chart></div>
 * <div class="column right"><cq-instant-chart tmpl-src="examples/templates/partials/sample-template-advanced-context.html" id="chart1" symbol="MSFT"></cq-instant-chart></div>
 */
class InstantChart extends HTMLElement {
	connectedCallback() {
		if (this.hasAttribute("attached")) return;
		this.setAttribute("attached", "");

		const self = this;

		const environmentContainer = this.getAttribute("env-container") || "body";
		const tmplSrc = this.getAttribute("tmpl-src");
		let context = this.querySelector("cq-context");
		if (!context)
			context = this.appendChild(document.createElement("cq-context"));
		const noLocalStorage = this.hasAttribute("no-save");

		this.style.visibility = "hidden";

		CIQ.loadUI(tmplSrc, context, function (err) {
			if (err) return;

			const chartTitle = self.querySelector("cq-chart-title");
			if (chartTitle) chartTitle.removeAttribute("cq-browser-tab");

			const elementBlocks = self.querySelectorAll(
				"cq-ui-manager, cq-dialog, cq-color-picker"
			);
			for (let eb = 0; eb < elementBlocks.length; eb++) {
				const elementBlock = elementBlocks[eb];
				elementBlock.parentNode.removeChild(elementBlock);
				if (!InstantChart_movedDialogs)
					document
						.querySelector(environmentContainer)
						.appendChild(elementBlock);
			}
			InstantChart_movedDialogs = true;

			const params = {
				extendedHours: true,
				rangeSlider: true,
				inactivityTimer: true,
				fullScreen: false,
				initialSymbol: self.getAttribute("symbol") || undefined,
				restore: !noLocalStorage
			};

			self.signalEvent = new CustomEvent("signal-chart-ready", {
				detail: { node: self, params }
			});
			self.setAttribute("cq-event-flag", "");
			self.style.visibility = "";

			self.ownerDocument.body.dispatchEvent(self.signalEvent);
		});
	}
	disconnectedCallback() {
		this.stx.destroy();
	}
}

customElements.define("cq-instant-chart", InstantChart); // do not use addComponentsDefinition for this component!
