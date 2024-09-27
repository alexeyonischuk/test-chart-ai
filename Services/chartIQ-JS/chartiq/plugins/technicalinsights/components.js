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
import lexicon from "./lexicon.js";
import config from "./config.js";
import "./controller.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./technicalinsights-ui.css").then(
			resolve
		);
	} else if (typeof define === "function" && define.amd) {
		define(["./technicalinsights-ui.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("./technicalinsights-ui.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "technicalinsights")); // a framework, such as Angular, may require style addition

const offset = 48;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-technicalinsights&gt;</h4>
 *
 * This webcomponent activates the Technical Insights plug-in module in a chart.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | method | A function within another web component to call. |
 * | classics | Sets checkbox value of the Event class "Classic" |
 * | short-term | Sets checkbox value of the Event class "Short-term" |
 * | indicators | Sets checkbox value of the Event class "Indicators" |
 * | oscillators | Sets checkbox value of the Event class "Oscillators" |
 * | education | Sets checkbox value of the Education input |
 * | sbars | Sets dropdown value of the Bars input |
 *
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
 * | effect | "inputschanged", "enabled", "disabled" |
 * | action | "click" |
 *
 *  `cause` and `action` are set only when the effect "inputschanged" is issued as a direct result of clicking on the component.
 *
 *
 * Setup  instructions:
 * - Your package must include the module in the **plugin** directory.
 * - In  **sample-template-advanced.html**, un-comment the following line: <br>`import "./plugins/technicalinsights/components.js";`
 * - Set the `uid` provided by vendor in this component's tag. See example.
 *   - Tag is located in **`/examples/templates/partials/sample-template-advanced-context.html`**.
 *   - If the `uid` is not properly set, the following error will be visible in the browser's' console: <br>**CIQ.TechnicalInsights: No Authorization token (auth) provided**
 *
 * @example <cq-technicalinsights uid="id-here" lang="en"></cq-technicalinsights>
 *
 * @alias WebComponents.TechnicalInsights
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class TechnicalInsights extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["disabled"].concat(Object.values(this.inputMap));
	}

	constructor() {
		super();
		this.dom = {};
		this.initialized = false;
		this.attributeMap = Object.entries(this.constructor.inputMap).reduce(
			(acc, [key, value]) => ({ ...acc, [value]: key }),
			{}
		);
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, TechnicalInsights);
		this.constructor = TechnicalInsights;
	}

	attributeChangedCallback(name, oldVal, newVal) {
		if (name === "disabled") {
			const { controller, initialized } = this;

			if (!(initialized && controller)) return; // avoid throwing errors when we initialize

			this.isActive = newVal === null || newVal === "false";
			const { multiChartContainer } = this.context.topNode;
			if (multiChartContainer && multiChartContainer.soloActive) {
				multiChartContainer.soloActive(this.isActive, "onTechnicalInsights");
				if (this.isActive) {
					controller.changeChartEngine(this.context.stx);
				}
			}
			// DISABLE plugin
			if (oldVal === null && typeof newVal === "string") {
				controller.removeInjections();
				controller.removeListeners();
				this.adjustChartArea(offset * -1);
			}

			// ENABLE plugin
			if (newVal === null && typeof oldVal === "string") {
				this.checkStudies();
				controller.addListeners();
				this.adjustChartArea(offset);
				this.run();
			}
			this.emitCustomEvent({
				effect: this.isActive ? "enabled" : "disabled",
				action: null
			});
			return;
		}
		this.setInput(name, newVal);
	}

	setInput(name, value) {
		const inputSelector = this.attributeMap[name];
		if (!inputSelector) return;
		const input = this.qs(inputSelector);
		if (!input) return;

		if (input.type === "checkbox") input.checked = value !== "false";
		else input.value = value;
	}

	setContext(context) {
		this.stx = context.stx;
		this.addDefaultMarkup();
		context.advertiseAs(this, "TechnicalInsights");
		this.initialize();

		if (!context.config) return;

		this.subscribeToActivation(context);

		CIQ.UI.activatePluginUI(this.stx, "technicalinsights");

		context.topNode.plugins = (context.topNode.plugins || []).concat(this);
	}

	subscribeToActivation(context) {
		if (this.activationSubscription) this.activationSubscription();

		const { config = {} } = context;
		const channel =
			(config.channels || {}).technicalinsights || "channel.technicalinsights";
		this.activationSubscription = this.channelSubscribe(channel, (isActive) => {
			if (isActive) {
				this.removeAttribute("disabled");
				this.registerLookupDriver();
			} else this.setAttribute("disabled", "");
		});
	}

	switchContext(context) {
		if (this.isActive) {
			this.controller.removeInjections();
			this.controller.removeListeners();
		}
		this.context = context;
		this.stx = context.stx;
		this.subscribeToActivation(context);
	}

	deactivateOnGrid() {
		const channel =
			(this.context.config.channels || {}).technicalinsights ||
			"channel.technicalinsights";
		this.channelWrite(channel, false);
	}

	initialize() {
		const self = this;
		const { stx, dom } = this;

		dom.shortterm = this.qs(
			"cq-technicalinsights-shortterm-label",
			"thisChart"
		);
		dom.oscillators = this.qs(
			"cq-technicalinsights-oscillators-label",
			"thisChart"
		);
		dom.indicators = this.qs(
			"cq-technicalinsights-indicators-label",
			"thisChart"
		);
		dom.classics = this.qs("cq-technicalinsights-classics-label");
		dom.instructions = this.qs(
			"cq-technicalinsights-instructions",
			"thisChart"
		);
		dom.eventselect = this.qs("cq-technicalinsights-event-select");
		dom.eventstitle = this.qs(
			"cq-technicalinsights-eventtypes-title",
			"thisChart"
		);
		dom.educationselect = this.qs(
			"cq-technicalinsights-education-select",
			"thisChart"
		);
		dom.educationselected = this.qs("input[name=education]");
		dom.srbarstext = this.qs("cq-technicalinsights-sr-bars");
		dom.showeducationtext = this.qs(
			"cq-technicalinsights-education-title",
			"thisChart"
		);
		dom.srselect = this.qs("cq-technicalinsights-sr-select");

		cssReady.then(uiLoaded);

		function uiLoaded(err) {
			if (err) return console.error(err);
			if (!self.hasAttribute("disabled")) self.adjustChartArea(offset);

			// add listeners for interactivity
			dom.eventselect.addEventListener("click", () => self.update(true));
			dom.educationselect.addEventListener("click", () => self.update(true));
			dom.srselect.addEventListener("change", () => self.update(true));

			const controller = new CIQ.TechnicalInsights(
				stx,
				self.uid,
				self.lang || "en" // default to English if lang not specified
			);

			self.controller = controller;
			self.registerLookupDriver();

			// set the educational materials from the JS

			// extract and save the lexicon for the language being used.
			controller.lexiconfile = lexicon;
			controller.lexicon = controller.lexiconfile[controller.lang];

			// if an eventid is passed in, auto-enable the plugin
			controller.eventid = self.getAttribute("eid");
			if (controller.eventid) self.removeAttribute("disabled");

			function setAttribute(path, term) {
				self.qs(path).setAttribute("aria-label", controller.lexicon[term]);
			}
			// set text to chosen correct language
			const { lexicon: l } = controller;
			dom.shortterm.innerHTML = l.shortterm;
			setAttribute("input[value='short-term']", "shortterm");
			dom.oscillators.innerHTML = l.oscillators;
			setAttribute("input[value=oscillators]", "oscillators");
			dom.indicators.innerHTML = l.indicators;
			setAttribute("input[value=indicators]", "indicators");
			dom.classics.innerHTML = l.classics;
			setAttribute("input[value=classics]", "classics");
			// Replace <br/> as it creates an empty group for VoiceOver
			dom.instructions.innerHTML =
				"<p>" + l.instructions.replace("<br/>", "</p><p>") + "</p>";
			dom.eventstitle.innerHTML = l.eventstitle;
			dom.srbarstext.innerHTML = l.bars;
			setAttribute("select[name=srbars]", "bars");
			dom.showeducationtext.innerHTML = l.showeducation;
			setAttribute("input[name=education]", "showeducation");
			// set the 'None' text for the language in S/R dropdown.
			dom.srselect.children[2].children[0].innerHTML = l.none; // prettier-ignore

			controller.addListeners();
			self.update();
			self.initialized = true;
		}
	}

	run() {
		if (!this.initialized || this.hasAttribute("disabled")) return;

		const { controller } = this;
		const { eventselect, educationselected, srselect } = this.dom;

		controller.activeEvents = {
			classic: eventselect.children[0].checked,
			shortterm: eventselect.children[2].checked,
			indicator: eventselect.children[4].checked,
			oscillator: eventselect.children[6].checked
		};

		controller.showEducation = educationselected.checked;
		controller.srterm = srselect.children[2].value;
		controller.showsr = controller.srterm === "none" ? false : true;

		controller.getActiveEvents();
	}

	update(inputsChanged) {
		const { inputMap } = this.constructor;

		Object.entries(inputMap).forEach(([inputSelector, key]) => {
			const item = this.qs(inputSelector);
			const value = item.type === "checkbox" ? !!item.checked : item.value;
			this.setAttribute(key, value);
		});

		if (inputsChanged) this.notifyEvent("inputschanged");
		if (this.runTimeout) clearTimeout(this.runTimeout);
		this.runTimeout = setTimeout(() => this.run());
	}

	notifyEvent(action) {
		if (this.changeTimeout) clearTimeout(this.changeTimeout);
		this.changeTimeout = setTimeout(() => {
			this.emitCustomEvent({
				effect: action
			});
		}, 10);
	}

	/**
	 * Use this method to create/remove display space above the chart.
	 *
	 * @param {Number}
	 *            pixels pass a negative number to remove space or a positive
	 *            number to create space
	 * @example // move chart area down 38 pixels tcElement.adjustChartArea(38);
	 *
	 * @example // move chart area up 38 pixels tcElement.adjustChartArea(-38);
	 */
	adjustChartArea(pixels) {
		if (this.notifyChannel(pixels)) return; // Height change informed in channel

		let chartArea = this.ownerDocument.querySelector(".ciq-chart-area");
		let top = parseInt(getComputedStyle(chartArea).top, 10);
		chartArea.style.top = top + pixels + "px";

		// force a resize event to correct the chart-area's height
		window.dispatchEvent(new Event("resize"));
	}

	/**
	 * Notify panel size change in channel
	 *
	 * @param {Number} pixelChange
	 */
	notifyChannel(pixelChange) {
		if (!this.context.config) return false;

		// Translate pixel change to panel height. If subscriber joins late
		// it needs the value as previous changes are will not be available
		this.panelHeight = (this.panelHeight || 0) + pixelChange;

		const { config = {} } = this.context;
		const channel =
			(config.channels || {}).pluginPanelHeight || "channel.pluginPanelHeight";
		this.channelMergeObject(channel, {
			technicalinsights: this.panelHeight
		});

		return true;
	}

	/**
	 * Registers the lookupExchange method on the TechnicalInsights controller. We do this because the exchange
	 * (exchDisp) field is not set under all circumstances but is required for the plugin. By registering the lookup
	 * driver to a controller method, it becomes possible for the controller to execute symbol lookups for any symbols
	 * that do not have an exchange set.
	 */
	registerLookupDriver() {
		const { controller } = this;
		if (!controller || this.lookupDriver) return;

		this.lookupDriver = new CIQ.ChartEngine.Driver.Lookup.ChartIQ();

		controller.lookupExchange = (symbol, cb) => {
			this.lookupDriver.acceptText(symbol, null, null, (results) => {
				const { data } =
					results.find(({ data } = {}) => data.symbol === symbol) || {};
				cb(data.exchDisp);
			});
		};
	}

	/**
	 * Make sure that required studies are available and inform if they are not.
	 */
	checkStudies() {
		if (!CIQ.Studies.calculateMACD && !this.constructor.warned) {
			console.warn(
				"Technical Insights plugin is using advanced studies. Import advanced.js to make advanced studies available."
			);

			this.context.stx.dispatch("notification", {
				message: "Not all studies are available to be viewed for this plugin.",
				type: "info",
				displayTime: 4
			});
			this.constructor.warned = true;
		}
	}
}
/**
 * Mapping of input selectors to webcomponent attributes
 *
 * @since 9.1.0
 */
TechnicalInsights.inputMap = {
	"input[value=classics]": "classics",
	"input[value=short-term]": "short-term",
	"input[value=indicators]": "indicators",
	"input[value=oscillators]": "oscillators",
	"input[name=education]": "education",
	"[name=srbars]": "sbars"
};

TechnicalInsights.markup = `
	<cq-technicalinsights-details role="group" aria-label="Tehchnical Insights plugin">
		<cq-technicalinsights-summary>
			<cq-technicalinsights-left>
				<cq-technicalinsights-instructions></cq-technicalinsights-instructions>
			</cq-technicalinsights-left>
			<cq-technicalinsights-middle>
				<cq-technicalinsights-eventtypes-title></cq-technicalinsights-eventtypes-title>
				<cq-technicalinsights-event-select>
					<input type="checkbox" value="classics" checked id="cq-ti-classics">
					<label for="cq-ti-classics" aria-hidden="true"><cq-technicalinsights-classics-label></cq-technicalinsights-classics-label></label>
					<input type="checkbox" value="short-term" checked id="cq-ti-shortterm">
					<label for="cq-ti-shortterm" aria-hidden="true"><cq-technicalinsights-shortterm-label></cq-technicalinsights-shortterm-label></label>
					<input type="checkbox" value="indicators" checked id="cq-ti-indicators">
					<label for="cq-ti-indicators" aria-hidden="true"><cq-technicalinsights-indicators-label></cq-technicalinsights-indicators-label></label>
					<input type="checkbox" value="oscillators" checked id="cq-ti-oscillators">
					<label for="cq-ti-oscillators" aria-hidden="true"><cq-technicalinsights-oscillators-label></cq-technicalinsights-oscillators-label></label>
				</cq-technicalinsights-event-select>
			</cq-technicalinsights-middle>
			<cq-technicalinsights-middle>
				<cq-technicalinsights-education-select>
					<cq-technicalinsights-education-title aria-hidden="true"></cq-technicalinsights-education-title><br>
					<label class="ciq-technicalinsights-switch" name="education">
						<input type="checkbox" name="education" checked>
						<div class="ciq-technicalinsights-tciqslider ciq-technicalinsights-round"></div>
					</label>
				</cq-technicalinsights-education-select>
			</cq-technicalinsights-middle>
			<cq-technicalinsights-right>
				<cq-technicalinsights-sr-select>
					<cq-technicalinsights-sr-title></cq-technicalinsights-sr-title><br>
					<select name="srbars" class="ciq-technicalinsights-srbars">
						<option value="none">
							<cq-technicalinsights-none-label></cq-technicalinsights-none-label>
						</option>
						<option value="100" selected>100</option>
						<option value="250">250</option>
						<option value="500">500</option>
					</select>
					<cq-technicalinsights-sr-bars aria-hidden="true"></cq-technicalinsights-sr-bars>
				</cq-technicalinsights-sr-select>
			</cq-technicalinsights-right>
		</cq-technicalinsights-summary>
	</cq-technicalinsights-details>
`;

CIQ.UI.addComponentDefinition("cq-technicalinsights", TechnicalInsights);

/**
 * Adds an instance of the Technical Insights plug-in to the chart
 *
 * @param {object} params Parameters for setting up the plug-in.
 * @param {CIQ.ChartEngine} params.stx A reference to the chart to which the plug-in is
 * 		added.
 * @param {CIQ.UI.Context} params.context A reference to the user interface context.
 * @param {HTMLElement} params.container The DOM element to which the Technical Insights
 * 		toggle is attached.
 * @param {string} params.lang ISO 639-1 Code for language to use.
 * @param {string} params.uid Technical Insights UID.
 * @param {string} [params.markup] A custom markup string to use instead of the default markup
 * 		specified by the `markup` property in the *plugins/technicalinsights/config.js* file.
 *
 * @constructor
 * @name CIQ.TCTechnicalInsights
 * @since 8.9.0
 */
CIQ.TCTechnicalInsights = function (params) {
	const {
		topNode,
		topNode: { multiChartContainer }
	} = params.context;
	const container = multiChartContainer || topNode;

	if (!container.querySelector("cq-technicalinsights")) {
		const node = document.createElement("cq-technicalinsights");
		node.setAttribute("disabled", "");
		node.lang = params.lang;
		node.uid = params.uid;

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
			"[member=technicalinsights], [cq-member=technicalinsights]"
		)
	) {
		const div = document.createElement("div");
		CIQ.innerHTML(div, params.toggleMarkup || config.markup);
		Array.from(div.childNodes, (node) => {
			params.container.appendChild(node.cloneNode(true));
		});
	}
};
