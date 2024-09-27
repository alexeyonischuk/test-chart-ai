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


import { CIQ } from "../../js/componentUI.js";
import lineInfo from "./line-info.js";
import config from "./config.js";
import "./controller.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./analystviews-ui.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./analystviews-ui.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("./analystviews-ui.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "analystviews")); // a framework, such as Angular, may require style addition

let AnalystViewsController; // loaded dynamically via XHR
const UI = CIQ.UI;

class BasicAnalystViewsDetails extends HTMLElement {
	static get observedAttributes() {
		return ["open"];
	}

	constructor() {
		super();
		var self = this;

		setTimeout(function () {
			self.innerHTML = BasicAnalystViewsDetails.markup;
			var summary = self.querySelector("cq-summary");
			summary.addEventListener("click", function () {
				if (self.hasAttribute("open")) {
					self.removeAttribute("open");
				} else {
					self.setAttribute("open", "open");
				}
			});
		});
	}

	adoptedCallback() {
		CIQ.UI.flattenInheritance(this, BasicAnalystViewsDetails);
		this.constructor = BasicAnalystViewsDetails;
	}

	attributeChangedCallback(name, oldVal, newVal) {
		// if the open attribute was added or removed
		if (
			name === "open" &&
			((oldVal === null && typeof newVal == "string") ||
				(newVal === null && typeof oldVal == "string"))
		) {
			this.dispatchEvent(new Event("toggle"));
		}
	}
}

BasicAnalystViewsDetails.markup = `
		<cq-summary role="group" aria-label="Analyst Views">
			<cq-analystviews-left>
				<cq-analystviews-icon-chart></cq-analystviews-icon-chart>
				<cq-analystviews-symbol></cq-analystviews-symbol>
				<!-- previous place for active button Chris 7-14 -->
				<cq-analystviews-story>Select Technical Analysis Term</cq-analystviews-story>
				<cq-analystviews-age></cq-analystviews-age>
				<cq-analystviews-term-active></cq-analystviews-term-active>
				|
				<cq-analystviews-term-button value="Intraday" role="button">30M</cq-analystviews-term-button>
				<cq-analystviews-term-button value="ST" role="button">1D</cq-analystviews-term-button>
				<cq-analystviews-term-button value="MT" role="button">1W</cq-analystviews-term-button>
			</cq-analystviews-left>
			<cq-analystviews-right>
				<analystviews-brand>Trading Central&trade; Methodology</analystviews-brand>
			</cq-analystviews-right>
		</cq-summary>
		<cq-analystviews-left>
			<cq-analystviews-section role="group" aria-label="Preferences">
				<cq-analystviews-title>Our Preference</cq-analystviews-title>
				<cq-analystviews-preference></cq-analystviews-preference>
			</cq-analystviews-section>
			<cq-analystviews-section role="group" aria-label="Alternative">
				<cq-analystviews-title>Alternative</cq-analystviews-title>
				<cq-analystviews-alternative></cq-analystviews-alternative>
			</cq-analystviews-section>
			<cq-analystviews-section role="group" aria-label="Comments">
				<cq-analystviews-title>Comments</cq-analystviews-title>
				<cq-analystviews-comments></cq-analystviews-comments>
				<cq-analystviews-indicator-toggle role="button">Show Indicators</cq-analystviews-indicator-toggle>
			</cq-analystviews-section>
		</cq-analystviews-left>
		<cq-analystviews-right role="group">
			<analystviews-method>
				<p>Our team of technical analysts use a chartist approach to assess directional moves and price targets.</p>
				<span>Find out more </span><a href="//tradingcentral.com" target="_blank">about our methodology</a><span>.</span>
			</analystviews-method>
		</cq-analystviews-right>
	`;

/**
 * AnalystViews tag to create a box around an analysis line when the mouse enters this element.
 *
 * @private
 */
class CqAnalystViewsNumber extends UI.ContextTag {
	constructor() {
		super();
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, CqAnalystViewsNumber);
	}

	get number() {
		return this.textContent.trim();
	}

	set number(newVal) {
		this.textContent = newVal;
	}

	initialize() {
		var self = this;

		this.addEventListener("mouseenter", function () {
			var node = document.createElement("cq-analystviews-number-line-selector");

			node.innerHTML = "&nbsp;";

			CIQ.Marker({
				stx: self.context.stx,
				node: node,
				yPositioner: "value",
				y: self.number,
				xPositioner: "none",
				label: "cq-analystviews-number-line-selector"
			});

			self.context.stx.draw();
		});

		this.addEventListener("mouseleave", function () {
			CIQ.Marker.removeByLabel(
				self.context.stx,
				"cq-analystviews-number-line-selector"
			);
		});
	}

	setContext(context) {
		context.advertiseAs(this, "CqAnalystViewsNumber");
		this.initialize();
	}
}

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-analystviews&gt;</h4>
 *
 * Webcomponent that inserts the Analyst Views plug-in above a chart.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | disabled | When removed activates plugin |
 * | term | Sets plugin term. Available values "Intraday", "ST", "MT", corresponding to "30M", "1D" and "1W" values|
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * ] cause | "useraction" |
 * | effect | "termchanged", "enabled", "disabled" |
 * | action | "click" |
 *
 *  `cause` and `action` are set only when the effect "termchanged" is issued as a direct result of clicking on the component.
 *
 * @alias WebComponents.AnalystViews
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 *
 * @since
 * - 9.1.0 Added responsive attribute "term" to select term with a value "ST", "MT" or "Intraday", corresponding to "1D", "1W" and "30M" labels. Added emitter.
 */
class AnalystViews extends UI.ContextTag {
	static get observedAttributes() {
		return ["disabled", "term"];
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, AnalystViews);
		this.constructor = AnalystViews;
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (name === "disabled") {
			if (typeof this.context === "undefined") return; // Avoid throwing errors when we initialize

			this.isActive = newVal === null || newVal === "false";
			const { multiChartContainer } = this.context.topNode;
			if (multiChartContainer && multiChartContainer.soloActive) {
				multiChartContainer.soloActive(this.isActive, "onTechnicalInsights");
			}

			var offset =
				38 + (this.querySelector("cq-analystviews-details[open]") ? 76 : 0);

			// disabled attribute added
			if (oldVal === null && typeof newVal == "string") {
				this.deactivatePlugin();
			}

			// disabled attribute removed
			if (
				newVal === null &&
				typeof oldVal == "string" &&
				this.context &&
				this.context.controller
			) {
				this.context.controller.changeChartEngine(this.context.stx);
				this.adjustChartArea(offset);
				this.run();
			}

			this.emitCustomEvent({
				effect: this.isActive ? "enabled" : "disabled",
				action: null
			});
		} else if (name === "term") this.selectTerm(newVal);
	}

	activatePlugin() {
		if (this.activated) return;

		const { multiChartContainer } = this.context.topNode;
		if (multiChartContainer && multiChartContainer.soloActive) {
			multiChartContainer.soloActive(this.isActive, "onTechnicalInsights");
		}
		const offset =
			38 + (this.querySelector("cq-analystviews-details[open]") ? 76 : 0);
		this.context.controller.changeChartEngine(this.context.stx);
		this.adjustChartArea(offset);
		cssReady.then(() => {
			setTimeout(() => this.run());
		});
		this.activated = true;
	}

	deactivatePlugin() {
		const {
			context,
			context: { events, controller, stx, updateAgeTimer }
		} = this;
		if (events) {
			if (events.layout) stx.removeEventListener(events.layout);
			if (events.symbolChange) stx.removeEventListener(events.symbolChange);
		}
		if (updateAgeTimer) clearInterval(updateAgeTimer);

		context.events = null;
		context.updateAgeTimer = null;
		controller.removeInjections();
		var offset =
			38 + (this.querySelector("cq-analystviews-details[open]") ? 76 : 0);
		this.adjustChartArea(offset * -1);
	}

	switchContext(context) {
		context.controller = this.context.controller;
		context.controller.changeChartEngine(context.stx);
		if (this.isActive) {
			this.deactivatePlugin();
		}
		this.context = context;
		this.stx = context.stx;
		this.subscribeToActivation(context);
	}

	deactivateOnGrid() {
		const channel =
			(this.context.config.channels || {}).analystviews ||
			"channel.analystviews";
		this.channelWrite(channel, false);
	}

	/**
	 * Use this method to create/remove display space above the chart.
	 *
	 * @param {Number} pixels pass a negative number to remove space or a positive number to create space
	 * @example
	 * // move chart area down 38 pixels
	 * tcElement.adjustChartArea(38);
	 *
	 * @example
	 * // move chart area up 38 pixels
	 * tcElement.adjustChartArea(-38);
	 */
	adjustChartArea(pixels) {
		if (this.notifyChannel(pixels)) return; // Height change informed in channel

		var chartArea = this.ownerDocument.querySelector(".ciq-chart-area");
		var top = parseInt(getComputedStyle(chartArea).top, 10);

		chartArea.style.top = top + pixels + "px";

		// force a resize event to correct the chart-area's height
		window.dispatchEvent(new Event("resize"));
	}

	notifyChannel(pixelChange) {
		if (!this.context.config) return false;

		// Translate pixel change to panel height.If subscriber joins late
		// it needs the value as previous changes are will not be available
		this.panelHeight = (this.panelHeight || 0) + pixelChange;

		const { config = {} } = this.context;
		const channel =
			(config.channels || {}).pluginPanelHeight || "channel.pluginPanelHeight";
		this.channelMergeObject(channel, {
			analystviews: this.panelHeight
		});
		return true;
	}

	initialize() {
		const self = this;

		cssReady.then(uiLoaded);
		function uiLoaded(err) {
			if (err) return;

			let details = self.ownerDocument.querySelector("cq-analystviews-details");
			if (details) {
				details.remove();
			} else {
				details = document.createElement("cq-analystviews-details");
			}

			details.addEventListener("toggle", function () {
				const offset = 76;

				self.adjustChartArea(this.hasAttribute("open") ? offset : offset * -1);
			});

			self.appendChild(details);

			if (!self.hasAttribute("disabled")) {
				self.adjustChartArea(38 + (details.hasAttribute("open") ? 76 : 0));
			}

			AnalystViewsController = CIQ.AnalystViews;
			self.context.controller = new AnalystViewsController(
				self.context.stx,
				self.token,
				self.partner
			);
			const isDisabled = self.hasAttribute("disabled");
			if (!isDisabled) setTimeout(() => self.activatePlugin());
		}

		self.context.buildText = lineInfo;
		self.lineHoverListen();
	}

	lineHoverListen() {
		var buildText = this.context.buildText;
		var stxx = this.context.stx;

		this.addEventListener("linehoverbegin", function (hover) {
			var newNode = CIQ.UI.makeFromTemplate(
				"template[analystviews-line-info-tmpl]"
			)[0];
			var parts = buildText[hover.detail.line];

			newNode.className = hover.detail.line;
			newNode.appendChild(
				document.createTextNode(
					parts.description + parts.trend[hover.detail.trend]
				)
			);

			CIQ.Marker({
				stx: stxx,
				node: newNode,
				yPositioner: "value",
				y: hover.detail.price,
				xPositioner: "none",
				label: "analystviews-line-info-" + hover.detail.line
			});

			stxx.draw();
		});

		this.addEventListener("linehoverend", function (hover) {
			CIQ.Marker.removeByLabel(
				stxx,
				"analystviews-line-info-" + hover.detail.line
			);
		});
	}

	run() {
		if (this.hasAttribute("disabled") || this.initialized) return;
		this.initialized = true;
		this.context.events = {};
		this.context.updateAgeTimer = null;

		var controller = this.context.controller;
		var selfNode = this;
		var dom = {
			symbol: this.querySelector("cq-analystviews-symbol"),
			story: this.querySelector("cq-analystviews-story"),
			age: this.querySelector("cq-analystviews-age"),
			preference: this.querySelector("cq-analystviews-preference"),
			alternative: this.querySelector("cq-analystviews-alternative"),
			comments: this.querySelector("cq-analystviews-comments"),
			indicatorToggle: this.querySelector("cq-analystviews-indicator-toggle"),
			activeTerm: this.querySelector("cq-analystviews-term-active"),
			termButtons: {
				Intraday: this.querySelector(
					'cq-analystviews-term-button[value="Intraday"]'
				),
				ST: this.querySelector('cq-analystviews-term-button[value="ST"]'),
				MT: this.querySelector('cq-analystviews-term-button[value="MT"]')
			}
		};
		this.dom = dom;
		var goBackButton;
		var numberRE = /[0-9]+\.?[0-9]*/g;
		var appendSubsection = function (element, subsection) {
			element.innerHTML = "";
			subsection.paragraphs
				.map(function (fulltext) {
					var p = document.createElement("p");
					var text = fulltext.split(numberRE);
					var number = fulltext.match(numberRE);
					var nElement;
					var i = 0;
					if (number) {
						for (; i < number.length; ++i) {
							nElement = document.createElement("cq-analystviews-number");
							nElement.innerHTML = number[i];

							p.appendChild(document.createTextNode(text[i]));
							p.appendChild(nElement);
						}
					}
					p.appendChild(document.createTextNode(text[i]));
					return p;
				})
				.forEach(function (p) {
					element.appendChild(p);
				});
		};
		var buttonSelected = false;
		var changingTerm = false;
		var currentTerm = controller.getCurrentTerm();
		var loader = this.context.loader;
		var changeTerm = function (info) {
			info.stopPropagation();

			// The selected button just needs to stop propagation
			if (this.hasAttribute("selected")) return;
			if (loader) loader.show();

			changingTerm = true;

			var term = this.getAttribute("value");

			if (buttonSelected) {
				for (var k in dom.termButtons) {
					if (dom.termButtons[k].hasAttribute("selected")) {
						dom.termButtons[k].removeAttribute("selected");
						break;
					}
				}
			}

			dom.termButtons[term].setAttribute("selected", "selected");
			buttonSelected = true;

			selfNode.setAttribute("term", term);
			selfNode.emitCustomEvent({
				effect: "termchanged"
			});

			updateAnalysis({ symbolObject: controller.stx.chart.symbolObject }, term);

			controller.stx.setPeriodicity(1, controller.interval[term], function () {
				var parent = dom.activeTerm.parentNode;
				var moveChild = dom.activeTerm.childNodes[0];

				if (moveChild) parent.appendChild(moveChild);

				dom.activeTerm.innerHTML = "";
				dom.activeTerm.appendChild(dom.termButtons[term]);

				if (goBackButton) {
					goBackButton.remove();
					goBackButton = null;
				}

				if (loader) loader.hide();

				changingTerm = false;
				currentTerm = term;
			});
		};

		dom.termButtons.Intraday.addEventListener("click", changeTerm);
		dom.termButtons.ST.addEventListener("click", changeTerm);
		dom.termButtons.MT.addEventListener("click", changeTerm);

		if (currentTerm) {
			dom.termButtons[currentTerm].setAttribute("selected", "selected");
			buttonSelected = true;
			dom.activeTerm.appendChild(dom.termButtons[currentTerm]);
		}

		this.context.events.layout = controller.stx.addEventListener(
			"layout",
			function () {
				if (changingTerm || !currentTerm) return;
				if (!dom.termButtons[currentTerm].hasAttribute("selected")) return;
				if (currentTerm === controller.getCurrentTerm()) return;

				dom.termButtons[currentTerm].removeAttribute("selected");
				buttonSelected = false;

				var node = document.createElement("cq-analystviews-term-button");
				node.setAttribute("cq-marker", "");
				node.setAttribute(
					"value",
					dom.termButtons[currentTerm].getAttribute("value")
				);
				node.appendChild(
					document.createTextNode(
						"Go back to " + dom.termButtons[currentTerm].textContent
					)
				);
				node.addEventListener("click", changeTerm);
				node.addEventListener("click", function () {
					this.setAttribute("selected", "selected");
				});

				goBackButton = CIQ.Marker({
					stx: controller.stx,
					node: node,
					xPositioner: "none",
					yPositioner: "none"
				});
			}
		);

		if (dom.indicatorToggle) {
			dom.indicatorToggle.addEventListener("click", function () {
				dom.indicatorToggle.setAttribute(
					"aria-checked",
					controller.displayingIndicators
				);
				if (controller.displayingIndicators) {
					this.innerHTML = "Show Indicators";
					controller.hideIndicators();
				} else {
					this.innerHTML = "Hide Indicators";
					controller.showIndicators();
				}
			});
		}

		this.context.events.symbolChange = controller.stx.addEventListener(
			"symbolChange",
			updateAnalysis
		);
		updateAnalysis({ symbolObject: controller.stx.chart.symbolObject });

		function updateAnalysis(info, term) {
			if (info.action && info.action !== "master") return;
			if (!term) term = currentTerm;
			if (!term) return;
			if (selfNode.context.updateAgeTimer) {
				clearInterval(selfNode.context.updateAgeTimer);
				selfNode.context.updateAgeTimer = null;
			}
			let isForex = CIQ.Market.Symbology.isForexSymbol(
				controller.stx.chart.symbol
			);
			controller.analysis(
				{
					type_product: isForex ? "forex" : null,
					product: info.symbolObject.symbol.replace(/^\^/, ""),
					term: term
				},
				function (error, xmlDocument) {
					if (error) {
						controller.removeInjections();

						dom.symbol.innerHTML = "";
						dom.story.innerHTML = "No TA Found";
						dom.story.className = "";
						dom.age.innerHTML = "";
						dom.preference.innerHTML = "";
						dom.alternative.innerHTML = "";
						dom.comments.innerHTML = "";

						console.error(error);
						return;
					}

					var fields = AnalystViewsController.parse(xmlDocument);

					controller.removeInjections();

					dom.symbol.innerHTML = info.symbolObject.symbol;

					dom.story.innerHTML = "";
					var img = document.createElement("span");
					img.className =
						"analystviews-arrow " +
						fields.header.directionName +
						"-" +
						Math.abs(fields.header.directionArrow);
					dom.story.appendChild(img);
					dom.story.appendChild(
						document.createTextNode(" " + fields.story.title)
					);
					dom.story.className = fields.header.directionName;

					dom.age.innerHTML = fields.header.$age;
					selfNode.context.updateAgeTimer = setInterval(function () {
						dom.age.innerHTML = fields.header.$age;
					}, 25000 /*25 seconds*/);

					appendSubsection(dom.preference, fields.story.subsections[1]);
					appendSubsection(dom.alternative, fields.story.subsections[2]);
					appendSubsection(dom.comments, fields.story.subsections[3]);

					controller.createDrawInjections(
						fields.header.option.chartlevels,
						fields.header.directionArrow
					);
					controller.createMouseInjections(
						fields.header.option.chartlevels,
						fields.header.directionName,
						selfNode
					);
				}
			);
		}
	}

	selectTerm(term) {
		const item = this.qs(`cq-analystviews-term-button[value=${term}]`);
		if (item && !item.hasAttribute("selected"))
			item.dispatchEvent(new MouseEvent("click"));
	}

	setContext(context) {
		this.addDefaultMarkup();
		context.advertiseAs(this, "AnalystViews");
		this.initialize();

		this.subscribeToActivation(context);

		CIQ.UI.activatePluginUI(this.stx, "analystviews");

		context.topNode.plugins = (context.topNode.plugins || []).concat(this);
	}

	subscribeToActivation(context) {
		if (this.activationSubscription) this.activationSubscription();

		const { config = {} } = context;
		const channel =
			(config.channels || {}).analystviews || "channel.analystviews";
		this.activationSubscription = this.channelSubscribe(channel, (isActive) => {
			if (isActive) this.removeAttribute("disabled");
			else this.setAttribute("disabled", "");
		});
	}
}

AnalystViews.markup = `
		<div class="analystviews-line-info">
			<template analystviews-line-info-tmpl>
			<analystviews-line-info></analystviews-line-info>
			</template>
		</div>
	`;

CIQ.UI.addComponentDefinition("cq-analystviews", AnalystViews);
CIQ.UI.addComponentDefinition(
	"cq-analystviews-details",
	BasicAnalystViewsDetails
);
CIQ.UI.addComponentDefinition("cq-analystviews-number", CqAnalystViewsNumber);

/**
 * Adds an instance of the Analyst Views plug-in to the chart
 *
 * @param {object} params Parameters for setting up the plug-in.
 * @param {CIQ.ChartEngine} params.stx A reference to the chart to which the plug-in is
 * 		added.
 * @param {CIQ.UI.Context} params.context A reference to the user interface context.
 * @param {HTMLElement} params.container The DOM element to which the Analyst Views
 * 		toggle is attached.
 * @param {number} params.partner Analyst Views partner id.
 * @param {string} params.token Analyst Views token.
 * @param {string} [params.markup] A custom markup string to use instead of the default markup
 * 		specified by the `markup` property in the *plugins/analystviews/config.js* file.
 *
 * @constructor
 * @name CIQ.TCAnalystViews
 * @since 8.9.0
 */
CIQ.TCAnalystViews = function (params) {
	const {
		topNode,
		topNode: { multiChartContainer }
	} = params.context;
	const container = multiChartContainer || topNode;

	if (!container.querySelector("cq-analystviews")) {
		const node = document.createElement("cq-analystviews");
		node.setAttribute("disabled", "");
		node.partner = params.partner;
		node.token = params.token;

		let pluginContainer = container.querySelector(".cq-plugin-container");
		if (!pluginContainer) {
			pluginContainer = document.createElement("div");
			pluginContainer.classList.add("cq-plugin-container");
			container.appendChild(pluginContainer);
		}
		pluginContainer.appendChild(node);
	}

	if (typeof params.container === "string") {
		params.container = container.querySelector(params.container);
	}
	if (
		params.container &&
		!params.container.querySelector(
			"[member=analystviews], [cq-member=analystviews]"
		)
	) {
		const div = document.createElement("div");
		CIQ.innerHTML(div, params.toggleMarkup || config.markup);
		Array.from(div.childNodes, (node) => {
			params.container.appendChild(node.cloneNode(true));
		});
	}
};
