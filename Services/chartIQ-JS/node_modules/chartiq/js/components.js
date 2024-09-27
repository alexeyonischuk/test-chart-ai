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


import {CIQ as __CIQ_} from "../js/componentUI.js";


let __js_webcomponents_abstractMarker_ = (_exports) => {

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

};


let __js_webcomponents_advertisement_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Marker) {
	console.error(
		"advertisement component requires first activating markers feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-advertisement&gt;</h4>
	 *
	 * Displays an advertisement banner as a "marker" (inside the chart, use CSS to position absolutely against the chart panel).
	 * The advertisement should contain content that can be enabled by calling {@link CIQ.UI.Advertisement#show} based on your
	 * business logic.
	 *
	 * The advertisement will automatically adjust the height to accommodate the content (assuming overflow-y: auto).
	 *
	 * _**Attributes**_
	 *
	 * This component supports the following attributes:
	 * | attribute | description |
	 * | :-------- | :---------- |
	 * | name      | Name of advertisement.  If omitted, uses "default" |
	 *
	 * @example
	 *	<cq-advertisement name="dollartrades" style="height: 106px;">
	 *	    <cq-close class="ciq-tight"></cq-close>
	 *		<div class="sample ciq-show" content>
	 *			<div cq-desktop="">
	 *				<div>$1 Trades</div>
	 *				<div>Use code <strong>Sample</strong></div>
	 *				<a target="_blank" href="https://yourURL?codeSample&desktop">Click to learn more</a>
	 *			</div>
	 *			<div cq-phone="">
	 *				<div>$1 Trades</div>
	 *				<a target="_blank" href="https://yourURL?codeSample&mobile">Click to learn more</a>
	 *			</div>
	 *		</div>
	 *	</cq-advertisement>
	 *
	 * @alias WebComponents.Advertisement
	 * @extends CIQ.UI.ModalTag
	 * @class
	 * @protected
	 */
	class Advertisement extends CIQ.UI.ModalTag {
		constructor() {
			super();
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.style.display = "none";
			this.name = this.getAttribute("name") || "default";
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Advertisement);
		}

		/**
		 * Hides the advertisement and suppresses it for 24 hours by storing it in local storage.
		 * If the selector itself changes however then the ad will reappear.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		close() {
			this.style.display = "none";
			this.nameValueStore.get("cq-advertisement", (err, ls) => {
				if (err) return;
				const future = new Date();
				if (!this.sleepAmount) this.sleepAmount = { units: 1, unitType: "day" };
				const { units, unitType } = this.sleepAmount;
				if (unitType == "minute")
					future.setMinutes(future.getMinutes() + units);
				else if (unitType == "hour") future.setHours(future.getHours() + units);
				else if (unitType == "day") future.setDate(future.getDate() + units);
				else if (unitType == "week")
					future.setDate(future.getDate() + units * 7);
				else if (unitType == "month")
					future.setMonth(future.getMonth() + units);
				const ms = future.getTime();
				if (!ls || typeof ls != "object") ls = {};
				ls[this.name] = ms;
				this.nameValueStore.set("cq-advertisement", ls);
			});
		}

		/**
		 * Creates a marker out of this component.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		makeMarker() {
			if (this.markerExists) return;
			CIQ.Marker({
				stx: this.context.stx,
				xPositioner: "none",
				label: "advertisement",
				permanent: true,
				node: this
			});
			this.markerExists = true;
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		setContext(context) {
			const {
				config: { nameValueStore }
			} = context;
			this.setNameValueStore(nameValueStore);
			this.show();
		}

		/**
		 * Creates a local nameValueStore using a custom namespace passed in as a parameter.
		 *
		 * @param {Object} nameValueStore The nameValueStore namespace to use.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		setNameValueStore(nameValueStore) {
			if (!nameValueStore && CIQ.NameValueStore)
				nameValueStore = CIQ.NameValueStore;

			this.nameValueStore = nameValueStore
				? new nameValueStore()
				: {
						get: function () {},
						set: function () {}
				  };
		}

		/**
		 * Sets the sleep time for this amount of time before re-displaying.
		 *
		 * @param  {Number} units    Units
		 * @param  {String} unitType Unit type. Value values "minute","hour","day","week".
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		setSleepAmount(units, unitType) {
			this.sleepAmount = {
				units: units,
				unitType: unitType
			};
		}

		/**
		 * Show the advertisement. This should be a div inside of the web component.
		 *
		 * @param {String} [selector] A selector. If none specified then the node with attribute `content` will be selected.
		 * @param {Boolean} [ignoreSleep=false] If true then ignore sleep.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		show(selector, ignoreSleep = false) {
			if (this.selector) {
				const priorContent = this.querySelector(this.selector);
				if (priorContent) priorContent.classList.remove("ciq-show");
			}
			this.selector = selector || "[content]";
			this.ignoreSleep = ignoreSleep;
			const doIt = () => {
				this.makeMarker();
				this.style.display = "block";
				const content = this.querySelector(this.selector);
				if (content) content.classList.add("ciq-show");

				// resize content
				this.style.height = "0px";
				setTimeout(() => (this.style.height = this.scrollHeight + "px"), 0);
			};
			if (!ignoreSleep) {
				this.nameValueStore.get("cq-advertisement", (err, ls) => {
					if (err) return;
					if (!ls || typeof ls != "object") ls = {};
					const ms = ls[this.name];
					if (ms && ms > Date.now()) return; // still surpressed
					doIt();
				});
			} else {
				doIt();
			}
		}

		/**
		 * Call this to force the advertisement to monitor the nameValueStore for updates. It will do this by
		 * polling. This is useful when running in multiple windows, so that if the advertisement is closed in one
		 * window then it will automatically close in the other windows.
		 *
		 * @param {Number} [ms=1000] Number of milliseconds to poll.
		 *
		 * @tsmember WebComponents.Advertisement
		 */
		watchForRemoteClose(ms) {
			if (!ms) ms = 1000;
			setInterval(() => {
				if (this.style.display === "none") return; // already closed, do nothing
				this.nameValueStore.get("cq-advertisement", (err, ls) => {
					if (err) return;
					if (!ls || typeof ls != "object") ls = {};
					const ms = ls[this.name];
					if (ms && ms > Date.now()) this.close();
				});
			}, ms);
		}
	}

	CIQ.UI.addComponentDefinition("cq-advertisement", Advertisement);
}

};


let __js_webcomponents_aggregationDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-aggregation-dialog&gt;</h4>
 *
 * Provides content for aggregation chart settings dialog.  Most aggregation types require a parameter to control box reversal amount and/or box size.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it saves a view.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "change" |
 * | action | "input" |
 * | aggregationType | _type of chart aggregation_ |
 * | box | _box size_ |
 * | reversal | _reversal size_ |
 *
 * @alias WebComponents.AggregationDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class AggregationDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, AggregationDialog);
		this.constructor = AggregationDialog;
	}

	/**
	 * Opens the aggregation dialog.
	 *
	 * @param {object} params
	 * @param {CIQ.UI.Context} [params.context] A context to set. See
	 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
	 * @param {string} params.aggregationType Aggregation Type, e.g., "kagi", "renko", etc.
	 *
	 * @tsmember WebComponents.AggregationDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);
		this.dialog = this.closest("cq-dialog");
		const { stx } = this.context;
		const { aggregationType } = params;
		const map = {
			kagi: {
				title: "Set Reversal Percentage"
			},
			renko: {
				title: "Set Brick Size"
			},
			linebreak: {
				title: "Set Price Lines"
			},
			rangebars: {
				title: "Set Range"
			},
			pandf: {
				title: "Set Point & Figure Parameters"
			}
		};
		if (stx.layout.aggregationType != aggregationType)
			stx.setAggregationType(aggregationType);

		let entry = map[aggregationType];
		this.dialog.setTitle(stx.translateIf(entry.title));

		for (let type in map) {
			const elem = this.querySelector(".ciq" + type);
			elem.style.display = aggregationType === type ? "" : "none";
		}
		[...this.querySelectorAll(".ciq" + aggregationType + " input")].forEach(
			(elem) => {
				const { name } = elem;
				const chainName =
					name == "box" || name == "reversal" ? "pandf." + name : name;
				const tuple = CIQ.deriveFromObjectChain(stx.layout, chainName);
				if (
					tuple &&
					(tuple.obj[tuple.member] || tuple.obj[tuple.member] === 0)
				) {
					elem.value = tuple.obj[tuple.member];
				} else if (stx.chart.defaultChartStyleConfig[elem.name]) {
					elem.value = stx.chart.defaultChartStyleConfig[elem.name];
				}
			}
		);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {object} params New values of the inputs
	 * @param {string} [params.aggregationType] Aggregation type
	 * @param {string} [params.box] Box size
	 * @param {string} [params.reversal] Reversal size
	 *
	 * @tsmember WebComponents.AggregationDialog
	 */
	postProcess(params) {
		this.emitCustomEvent({
			effect: "change",
			action: "input",
			detail: params
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.AggregationDialog
 */
AggregationDialog.markup = `
	<div style="text-align:center;margin-top:10px;">
	<div class="ciqkagi">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="kagi" stxtap="Layout.setAggregationEdit('kagi')">
		</label>
	</div>
	<div class="ciqrenko">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="renko" stxtap="Layout.setAggregationEdit('renko')">
		</label>
	</div>
	<div class="ciqlinebreak">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="priceLines" stxtap="Layout.setAggregationEdit('priceLines')">
		</label>
	</div>
	<div class="ciqrangebars">
		<label>
			<em>Enter value and hit "Enter"</em>
			<br>
			<input name="range" stxtap="Layout.setAggregationEdit('rangebars')">
		</label>
	</div>
	<div class="ciqpandf">
		<label>
			<em>Enter box size and hit "Enter"</em>
			<br>
			<input name="box" stxtap="Layout.setAggregationEdit('pandf.box')">
		</label>
		<br>
		<label>
			<em>Enter reversal and hit "Enter"</em>
			<br>
			<input name="reversal" stxtap="Layout.setAggregationEdit('pandf.reversal')">
		</label>
	</div>
		<p>or</p>
		<div class="ciq-btn" stxtap="Layout.setAggregationEdit('auto')">Auto Select</div>
	</div>
	`;
CIQ.UI.addComponentDefinition("cq-aggregation-dialog", AggregationDialog);

};


let __js_webcomponents_attribution_ = (_exports) => {

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

};


let __js_webcomponents_chartInstructions_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-chart-instructions&gt;</h4>
 *
 * This element contains hidden text that can be read aloud by a screen reader to announce chart features or instructions.
 * By default the text is not visible to a user but is listed in the accessbility tree.
 *
 * If you would like to provide custom instructions, pass in your own text in a `<p>` tag.
 *
 * @alias WebComponents.ChartInstructions
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 8.7.0
 */
class ChartInstructions extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartInstructions);
		this.constructor = ChartInstructions;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ChartInstructions
	 */
	setContext(context) {
		this.addDefaultMarkup();
		this.content = this.querySelector(".content");

		const { config: { hotkeyConfig = {} } = {} } = this.context;

		if (hotkeyConfig.hotkeys) {
			const keyConfigs = hotkeyConfig.hotkeys.filter((conf) => conf.ariaLabel);
			this.setHotKeyCommands(keyConfigs);
		}
	}

	/**
	 * Filtered hotKey configurations from defaultConfiguration based on ariaLabel property.
	 * This will create new entries for the hotkeys and add
	 * their instructions to the text content already provided.
	 *
	 * @param {object[]} configurations Hotkey configs from the config.hotKeyConfig hotkeys
	 *
	 * @tsmember WebComponents.ChartInstructions
	 */
	setHotKeyCommands(configurations) {
		const elements = configurations.map((configuration) => {
			const { commands, label, ariaLabel } = configuration;
			const combos = [];
			commands.forEach((command) =>
				combos.push(
					command
						.split("+")
						.map((key) => key.replace("Key", ""))
						.join(" + ")
				)
			);
			const formattedCombos =
				combos.length > 1 ? combos.join(" or ") : combos[0];
			return `${label}: ${ariaLabel}. Press (${formattedCombos}).`;
		});

		elements.forEach((element) => {
			const item = document.createElement("LI");
			item.innerText = element;
			this.content.append(item);
		});
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ChartInstructions
 */
ChartInstructions.markup = `
<p role="region">Instructions for use with screen readers.</p>
<span role="article">
	<p>The following is a list of keyboard commands available to interact with the chart:</p>
	<ul class="content"></ul>
	<div>End of instructions.</div>
</span>
`;
CIQ.UI.addComponentDefinition("cq-chart-instructions", ChartInstructions);

};


let __js_webcomponents_chartTitle_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-chart-title&gt;</h4>
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute         | description |
 * | :---------------- | :---------- |
 * | display-exchange  | Display the exchange available in the chart symbol object |
 * | cq-previous-close | Updates the previousClose property, see the description below |
 * | cq-browser-tab    | Enables browser tab updates with instrument symbol and latest price |
 * | cq-activate-symbol-search-on-click | Enables click on the chart title to open symbol search dialog |
 *
 * In addition, the following attribute is also supported:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
 *
 * Note, if the `cq-marker` attribute is added to the element, and it is placed within the
 * chartArea, the element will sit above the chart bars.
 *
 * `<cq-symbol></cq-symbol>` will display `chart.symbol`.<br>
 * `<cq-symbol-description></cq-symbol-description>` will display the `chart.symbolDisplay`. See {@link CIQ.ChartEngine.Chart#symbolDisplay} for details on how to set this value.
 *
 * Set attribute `cq-browser-tab` to true to get the stock symbol and latest price to update in the browser tab.
 *
 * Set member `previousClose` to the prior day's closing price in order to calculate and display change.
 * If `previousClose` is not set, then `iqPrevClose` from the `dataSet` will be the default.<br>
 * Remember data is loaded asynchronously.
 * Be sure to reset this value once your initial data has been loaded by using the {@link CIQ.ChartEngine.loadChart} callback function.
 * @example <caption>Reset closing price</caption>
 * stx.loadChart(symbol, parameters, function(){
 *      document.querySelector("cq-chart-title").previousClose = yesterdays-closing-price;
 * }

 *
 * The `cq-animate` attribute in the `cq-current-price` element can be used to change the price color to red or green based on the previous value.
 * Setting the attribute to "fade" will introduce a transition effect on the price which, while attractive, uses considerable CPU when there are rapid updates.
 * @example <caption>cq-animate attribute</caption>
 * <cq-chart-title>
 * 	<cq-symbol></cq-symbol>
 * 	<cq-chart-price>
 * 		<cq-current-price cq-animate></cq-current-price>
 * 		<cq-change>
 * 			<div class="ico"></div> <cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
 * 		</cq-change>
 * 	</cq-chart-price>
 * </cq-chart-title>
 *
 * @example <caption>More descriptive display</caption>
 * //You can set a more descriptive name by using http://documentation.chartiq.com/CIQ.ChartEngine.Chart.html#symbolDisplay
 * // and then enabling that on the tile.
 *
 * //In your HTML file look for:
 * <cq-symbol></cq-symbol>
 * //and replace it with :
 * <cq-symbol-description></cq-symbol-description>
 *
 * //In your quote feed add the following line:
 * params.stx.chart.symbolDisplay=response.fullName;
 *
 * //Like so:
 * quotefeed.fetchInitialData=function (symbol, suggestedStartDate, suggestedEndDate, params, cb) {
 *  const queryUrl = this.url; // using filter:true for after hours
 *
 *  CIQ.postAjax(queryUrl, null, function(status, response){
 *   // process the HTTP response from the datafeed
 *   if(status==200){ // if successful response from datafeed
 *    params.stx.chart.symbolDisplay=response.fullName; // specify response name
 *    const newQuotes = quotefeed.formatChartData(response);
 *    cb({quotes:newQuotes, moreAvailable:true, attribution:{source:"simulator", exchange:"RANDOM"}}); // return the fetched data; init moreAvailable to enable pagination
 *   } else { // else error response from datafeed
 *    cb({error:(response?response:status)});	// specify error in callback
 *   }
 *  });
 * };
 *
 * @alias WebComponents.ChartTitle
 * @extends CIQ.UI.ModalTag
 * @class
 * @protected
 * @since
 * - 06-15-16
 * - 4.0.0 Browser tab now updates with stock symbol and latest price using `cq-browser-tab` attribute.
 * - 6.3.0 Negative close values are "N/A" change percentage.
 * - 6.3.0 Child tag `<cq-todays-change-pct>` is now optional.
 * - 8.8.0 Add `cq-activate-symbol-search-on-click` attribute.
 * - 9.1.0 Observes attributes.
 */

class ChartTitle extends CIQ.UI.ModalTag {
	static get observedAttributes() {
		return [
			"display-exchange",
			"cq-previous-close",
			"cq-browser-tab",
			"cq-activate-symbol-search-on-click"
		];
	}

	constructor() {
		super();
		/**
		 * Keep this value up to date in order to calculate change from yesterday's close.
		 * @type {number}
		 *
		 * @tsmember WebComponents.ChartTitle
		 */
		this.previousClose = null;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartTitle);
		this.constructor = ChartTitle;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.listeners) {
			CIQ.UI.unobserveProperty(
				"symbolObject",
				this.context.stx.chart,
				this.listeners.symbolObject
			);
			CIQ.UI.unobserveProperty(
				"language",
				this.context.stx.preferences,
				this.listeners.language
			);
		}
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		if (name === "display-exchange") {
			this.updateExchange();
			return;
		} else if (name === "cq-browser-tab") {
			this.updateBrowserTab = !["false", "0", null].includes(newValue);
		} else if (name === "cq-previous-close") {
			this.previousClose = +newValue;
		} else if (name === "cq-activate-symbol-search-on-click") {
			this.handleSymbolSearchChange();
		}
		this.update();
	}

	/**
	 * Begins the Title helper. This observes the chart and updates the title elements as necessary.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	begin() {
		const self = this;

		this.addInjection("append", "createDataSet", function () {
			self.update();
		});
		this.update();
	}

	/**
	 * Initializes after context set, optionally calls `begin()`.
	 * @param {object} [params]
	 * @param {boolean} [params.autoStart] Set to true to call `begin` function.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	initialize(params) {
		this.params = params ? params : {};
		if (typeof this.params.autoStart == "undefined")
			this.params.autoStart = true;
		this.marker = null;

		if (this.params.autoStart) this.begin();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	setContext(context) {
		if (this.listeners) return;

		const stx = context.stx;

		let { markup } = this.constructor;
		this.handleSymbolSearchChange();
		this.addDefaultMarkup(this, markup);

		this.symbolDiv = this.querySelector("cq-symbol");
		this.symbolDescriptionDiv = this.querySelector("cq-symbol-description");
		this.currentPriceDiv = this.querySelector("cq-current-price");
		this.todaysChangeDiv = this.querySelector("cq-todays-change");
		this.todaysChangePctDiv = this.querySelector("cq-todays-change-pct");
		this.chartPriceDiv = this.querySelector("cq-chart-price");
		this.changeDiv = this.querySelector("cq-change");
		this.exchangeDiv = this.querySelector(".exchange");
		this.accessibleChange = this.querySelector("[accessiblechange]");

		this.listeners = {
			language: () => setTimeout(() => this.update(true), 100),
			symbolObject: () => this.updateExchange()
		};

		CIQ.UI.observeProperty(
			"language",
			stx.preferences,
			this.listeners.language
		);
		CIQ.UI.observeProperty(
			"symbolObject",
			stx.chart,
			this.listeners.symbolObject
		);

		this.initialize();
	}

	/**
	 * Updates exchange div element based on the chart engine symbol object
	 * @private
	 *
	 * @tsmember WebComponents.ChartTitle
	 * @since 9.1.0
	 */
	updateExchange() {
		if (!this.context) return;

		const { symbolObject } = this.context.stx.chart;
		const { exchangeDiv } = this;

		if (this.displayExchange != null && symbolObject.exchDisp) {
			exchangeDiv.innerText = `Exchange: ${symbolObject.exchDisp}`;
		} else if (symbolObject.static) {
			exchangeDiv.innerText = "STATIC";
		} else {
			exchangeDiv.innerText = "";
		}
	}

	/**
	 * Updates the values in the component.
	 *
	 * @param {boolean} force Update even when no price change
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	update(force) {
		if (!this.context) return;

		const { stx } = this.context;
		const {
			chart: { symbol, symbolDisplay },
			internationalizer
		} = stx;

		const {
			symbolDiv,
			symbolDescriptionDiv,
			exchangeDiv,
			currentPriceDiv,
			changeDiv,
			chartPriceDiv,
			todaysChangeDiv,
			todaysChangePctDiv,
			accessibleChange
		} = this;
		const wrapper = this.closest("cq-context-wrapper");
		const isActiveChart =
			!wrapper || (wrapper && wrapper.classList.contains("active"));

		const doUpdateBrowserTab = this.updateBrowserTab && isActiveChart;
		const doUpdatePrice = chartPriceDiv && currentPriceDiv;
		let priceChanged = false;
		let symbolChanged = false;

		let show = !symbol ? "remove" : "add";
		this.classList[show]("stx-show");

		if (symbolDiv.innerText !== symbol) {
			symbolDiv.innerText = symbol;
			symbolChanged = true;
		}

		if (
			symbolDescriptionDiv &&
			symbolDescriptionDiv.innerText !== (symbolDisplay || symbol)
		)
			symbolDescriptionDiv.innerText = symbolDisplay || symbol;

		if (stx.isHistoricalModeSet) {
			if (currentPriceDiv.innerText !== "") currentPriceDiv.innerText = "";
			changeDiv.style.display = "none";
			// only change the display so that you don't wreck the line spacing and parens
			return;
		}

		let todaysChange = "",
			todaysChangePct = 0,
			todaysChangeDisplay = "";
		const currentQuote = stx.getFirstLastDataRecord(
			stx.chart.dataSet,
			"Close",
			true
		);
		let currentPrice = "";
		let textPrice = "";
		if (currentQuote) currentPrice = currentQuote.Close;
		if (doUpdatePrice) {
			if (currentPrice !== "")
				textPrice = stx.formatYAxisPrice(
					currentPrice,
					stx.chart.panel,
					stx.chart.decimalPlaces
				);
			let oldPrice = parseFloat(currentPriceDiv.nativePrice);
			if (currentPriceDiv.innerText !== textPrice) {
				currentPriceDiv.innerText = textPrice;
				currentPriceDiv.nativePrice = currentPrice;
				priceChanged = true;
				const attr = this.currentPriceDiv.getAttribute("cq-animate");
				if (typeof attr != "undefined") {
					CIQ.UI.animatePrice(
						currentPriceDiv,
						currentPrice,
						oldPrice,
						attr == "fade"
					);
				}
			}
		}

		if (
			force ||
			((doUpdatePrice || doUpdateBrowserTab) &&
				symbol &&
				(symbolChanged || priceChanged))
		) {
			let previousClose = this.previousClose;

			// Default to iqPrevClose if the developer hasn't set this.previousClose
			if (!previousClose && previousClose !== 0)
				previousClose = currentQuote && currentQuote.iqPrevClose;

			if (!previousClose && previousClose !== 0)
				previousClose = this.mostRecentClose;

			if (changeDiv && (currentPrice || currentPrice === 0)) {
				todaysChange = CIQ.fixPrice(currentPrice - previousClose);
				todaysChangePct = (todaysChange / previousClose) * 100;
				if (previousClose <= 0 || currentPrice < 0) {
					todaysChangeDisplay = "N/A";
				} else if (internationalizer) {
					todaysChangeDisplay = internationalizer.percent2.format(
						todaysChangePct / 100
					);
				} else {
					todaysChangeDisplay = todaysChangePct.toFixed(2) + "%";
					if (todaysChangePct > 0)
						todaysChangeDisplay = "+" + todaysChangeDisplay;
				}
				changeDiv.style.display = "";
			} else if (changeDiv) {
				changeDiv.style.display = "none";
			}

			const todaysChangeAbs = Math.abs(todaysChange);
			const txtChange = stx.formatYAxisPrice(
				todaysChangeAbs,
				stx.chart.panel,
				stx.chart.decimalPlaces
			);
			if (todaysChangeAbs) {
				if (todaysChangeDiv.innerText !== txtChange)
					todaysChangeDiv.innerText = txtChange;
			}
			if (todaysChangePctDiv) {
				const visualPctChange = "(" + todaysChangeDisplay + ")";
				if (todaysChangePctDiv.innerText !== visualPctChange)
					todaysChangePctDiv.innerText = visualPctChange;
			}
			if (todaysChangeDisplay !== "" && todaysChange < 0) {
				chartPriceDiv.classList.add("stx-down");
			} else {
				chartPriceDiv.classList.remove("stx-down");
			}
			if (todaysChangeDisplay !== "" && todaysChange > 0) {
				chartPriceDiv.classList.add("stx-up");
			} else {
				chartPriceDiv.classList.remove("stx-up");
			}
			const up = todaysChange > 0 ? "+" : "";
			const accessibleString = `${up}${todaysChange} (${up}${todaysChangeDisplay})`;
			if (accessibleChange.innerText !== accessibleString)
				accessibleChange.innerText = accessibleString;

			currentPrice = currentPrice !== undefined ? currentPrice : "";
			todaysChange = todaysChange !== undefined ? todaysChange : "";

			if (doUpdateBrowserTab) {
				// These strange characters create some spacing so that the title appears
				// correctly in a browser tab
				let title =
					symbol + " \u200b \u200b " + textPrice + " \u200b \u200b \u200b ";
				if (todaysChange > 0) {
					title += "\u25b2 " + txtChange;
				} else if (todaysChange < 0) {
					title += "\u25bc " + txtChange;
				}

				this.ownerDocument.title = title;
			}
		}
	}

	/**
	 * Creates a clickable area for the symbol so tapping on the symbol will open a lookup component.
	 * Whether a clickable symbol is created depends on the value of `cq-activate-symbol-search-on-click` attribute.
	 *
	 * @tsmember WebComponents.ChartTitle
	 */
	handleSymbolSearchChange() {
		const symbolSearch = !["false", "0", null].includes(
			this.getAttribute("cq-activate-symbol-search-on-click")
		);

		const clickable = this.querySelector("[selector=cq-lookup-dialog]");
		const symbol = this.querySelector("cq-symbol");
		if (!clickable) return;
		if (symbolSearch) {
			clickable.append(symbol);
		} else {
			clickable.before(symbol);
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ChartTitle
 */
ChartTitle.markup = `
		<cq-clickable role="button" selector="cq-lookup-dialog" method="open" title="Symbol Search">
			<cq-symbol class="hide-outline"></cq-symbol>
		</cq-clickable>
		<cq-menu class="ciq-period" config="period" reader="Periodicity" text binding="Layout.periodicity" title="Interval Selector" lift-dropdown></cq-menu>
		<cq-chart-price>
			<span id="pricelabel" hidden>Current Price</span>
			<div role="group" aria-labelledby="pricelabel">
				<cq-current-price role="marquee" cq-animate></cq-current-price>
			</div>
			<span>
				<span id="changelabel" hidden>Change</span>
				<div role="group" aria-labelledby="changelabel">
					<div class="ciq-screen-reader" accessiblechange role="marquee"></div>
				</div>
				<cq-change aria-hidden="true">
					<div class="ico"></div>
					<cq-todays-change></cq-todays-change>
					<cq-todays-change-pct></cq-todays-change-pct>
				</cq-change>
			</span>
		</cq-chart-price>
		<div class="exchange"></div>
	`;
CIQ.UI.addComponentDefinition("cq-chart-title", ChartTitle);

};


let __js_webcomponents_clickable_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-clickable&gt;</h4>
 *
 * When tapped/clicked, this component can run a method on another component. Set the
 * `selector` attribute to a selector for the other component. Set `method` attribute to the method
 * on that other component that should be executed. The parameter provided to the method is an object that contains
 * the context (if available) for this clickable component ("context") and a reference to the
 * component ("caller").
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | method | A function within another web component to call. |
 * | selector | A css selector to another web component. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "click" |
 * | action | "click" |
 *
 * @example <caption>Component with method and selector.
 *          When clicked, the following equivalent code is run from within the component:<br>
 *          <pre>document.querySelector("cq-sample-dialog").open({context: this.context, caller: this});</pre></caption>
 * <cq-clickable selector="cq-sample-dialog" method="open">Settings</cq-clickable>
 *
 * @alias WebComponents.Clickable
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 3.0.9
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Clickable extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["method", "selector"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		CIQ.UI.stxtap(this, (e) => {
			if (!CIQ.climbUpDomTree(this, "cq-menu", true).length)
				e.stopPropagation();
			this.runMethod();
			this.emitCustomEvent({
				effect: "click"
			});
		});
		this.setAttribute("role", "button");

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Clickable);
	}

	/**
	 * Runs a method on the clickable component.
	 *
	 * @tsmember WebComponents.Clickable
	 */
	runMethod() {
		const selector = this.selector;
		const method = this.method;
		if (!selector || !method) return;

		const { context } = this;

		if (/-dialog/.test(selector) && method === "open" && context.config) {
			const channel =
				(context.config.channels || {}).dialog || "channel.dialog";

			this.channelWrite(
				channel,
				{
					type: selector.replace(/cq-|-dialog/g, ""),
					params: {
						context,
						caller: this,
						initiatingMenu: CIQ.climbUpDomTree(this, "cq-menu", true)[0]
					}
				},
				context.stx
			);
			return;
		}

		const clickable = this;
		this.qsa(selector, this.context.topNode, true).forEach(function (i) {
			if (i[method])
				i[method].call(i, {
					context: clickable.context,
					caller: clickable
				});
		});
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Clickable
	 */
	setContext(context) {
		this.addDefaultMarkup(); // this will put any children into shadowRoot
	}
}

CIQ.UI.addComponentDefinition("cq-clickable", Clickable);

};


let __js_webcomponents_close_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-close&gt;</h4>
 *
 * Closes its containing (parent or up) component by calling its close() method when clicked.
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "close" |
 * | action | "click" |
 *
 * @alias WebComponents.Close
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class Close extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		CIQ.UI.stxtap(this, (e) => {
			this.tap();
			e.stopPropagation();
		});
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Close);
	}

	/**
	 * Handler for clicking the component.
	 *
	 * @tsmember WebComponents.Close
	 */
	tap() {
		CIQ.UI.containerExecute(this, "close", true);
		this.emitCustomEvent({ effect: "close" });
	}
}

CIQ.UI.addComponentDefinition("cq-close", Close);

};


let __js_webcomponents_comparison_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-comparison&gt;</h4>
 *
 * This component presents a legend of comparison series found on the panel.  The legend will by default allow the user to
 * toggle the visibility of the series, remove the series, change the series color, and observe the series's price.
 * From the markup, the developer can configure these options as well as whether to display the current price or the crosshair price.
 *
 * Usually the comparison legend is automatically created by the [cq-study-legend]{@link WebComponents.StudyLegend} component.
 * Therefore, you do not have to create this component on your template manually.
 *
 * A comparison series "chooser" can also be created using this tag.  See below example.
 *
 * _**Attributes**_
 *
 * This component supports the following attributes:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | chart-legend | A flag to indicate that the component should take the form of a legend. |
 * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a series is removed, its properties modified, or its visibility toggled.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "remove", "modify", "toggle" |
 * | action | "click" |
 * | name | _series key_ |
 * | field | _field_ |
 * | value | _value_ |
 *
 * Note:
 * -  `field` and `value` not available on remove effect
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Comparison series "Chooser" markup.  Note the absence of the "chart-legend" attribute.</caption>
 *	<cq-comparison cq-marker>
 *		<cq-menu class="comparison" cq-focus="input">
 *			<div add-label class="ciq-no-share">
 *				<span class="icon plus"></span>
 *				<span>Compare ...</span>
 *			</div>
 *			<div add-comparison>
 *				<cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
 *				<cq-swatch cq-no-close overrides="auto" role="presentation">
 *					<div class="ciq-screen-reader" role="button">Select color</div>
 *				</cq-swatch>
 *				<div role="button" class="stx-btn add" keyboard-selectable>
 *					<span>Add</span>
 *				</div>
 *			</div>
 *		</cq-menu>
 *	</cq-comparison>
 *
 * @alias WebComponents.Comparison
 * @extends CIQ.UI.ModalTag
 * @class
 * @protected
 * @since
 * - 7.3.0 Added the ability to set series color using `cq-swatch`.
 * - 9.1.0 Added markup for UI, and emitters.
 */
class Comparison extends CIQ.UI.ModalTag {
	constructor() {
		super();
		this.swatchColors = [];
		this.loading = [];
		this.find = (selector) => this.qsa(selector, this, true)[0];
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		this.swatchColors = [
			"#8ec648",
			"#00afed",
			"#ee652e",
			"#912a8e",
			"#fff126",
			"#e9088c",
			"#ea1d2c",
			"#00a553",
			"#00a99c",
			"#0056a4",
			"#f4932f",
			"#0073ba",
			"#66308f",
			"#323390"
		];
		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);
		this.setMarkup();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Comparison);
		this.constructor = Comparison;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Comparison
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (this.usingMarkup) {
			this.setMarkup();
		} else {
			// do nothing when using predefined content
		}
	}

	/**
	 * Initializes all the children UI elements that make up `<cq-comparison>`.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	configureUI() {
		const addNew = this.find(".addswatch.seriesId");
		this.template = this.find("template[cq-comparison]");
		const swatchColors = (
			this.find("cq-swatch") || document.createElement("a")
		).getAttribute("cq-colors");
		if (swatchColors) this.swatchColors = swatchColors.split(",");
		this.swatchColors = CIQ.convertToNativeColor(this.swatchColors);
		const lookup = this.find("cq-lookup");
		if (lookup) lookup.setCallback((obj) => this.selectItem(obj));
		CIQ.UI.stxtap(addNew, (e) => {
			lookup.forceInput();
			e.stopPropagation();
		});

		// Add the keystroke claim
		this.addClaim(this);

		const keystrokeHub = this.ownerDocument.body.keystrokeHub;
		if (!keystrokeHub) return;

		let menu = this.find("cq-menu.comparison");
		if (menu) {
			// Extend the internal menu's hide function so we can do some cleanup
			let menuHide = menu.hide.bind(menu);
			menu.hide = () => {
				//const keystrokeHub = document.body.keystrokeHub;
				// Treat the legend like a modal so keyboard navigation is returned after using colorPicker
				keystrokeHub.removeActiveModal(this);
				keystrokeHub.tabOrderSelect();
				menuHide();
			};
		}
	}

	/**
	 * Handler for keyboard interaction.
	 *
	 * Left and Right arrows will move between symbol lookup, color picker and "Add" button.
	 * The attribute cq-focused will be added to the currently focused tag. This can then be
	 * queried later, such as when a user hits enter.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Comparison
	 * @since 9.1.0
	 */
	keyStroke(hub, key, e) {
		if (!this.keyboardNavigation) return false;
		const items = this.qsa(
			"cq-lookup, cq-swatch, .add, [keyboard-selectable='true']",
			this,
			true
		);
		if (!items.length) return false;
		const focused = this.findFocused(items);
		switch (key) {
			case "Enter":
				if (!focused[0]) return false;
				if (this.clickItem(focused[0], e, this)) return true;
				break;
			case "Tab":
				if (focused[0] && focused[0].matches("cq-lookup")) {
					this.keyboardNavigation.disableKeyControlElement(focused[0], true);
					hub.tabActiveElement.element.blur();
					focused[0].overrideIsActive = true;
				}
				let newFocused = this.focusNextItem(items, false, true);
				if (newFocused && newFocused.matches("cq-lookup")) {
					newFocused.keyboardNavigation = this.keyboardNavigation;
					if (newFocused.onKeyboardSelection) newFocused.onKeyboardSelection();
					newFocused.overrideIsActive = false;
				}
				break;
			case "Esc":
			case "Escape":
				this.removeFocused(items);
				let menu = this.find("cq-menu.comparison");
				if (menu) menu.hide();
				break;
			default:
				e.preventDefault();
				break;
		}
		return false;
	}

	/**
	 * Triggers the comparison lookup component and passes keyboard control into the internal
	 * [cq-lookup]{@link WebComponents.Lookup} element.
	 *
	 * Called when keyboard navigation activates this element by pressing Return/Enter.
	 *
	 * @tsmember WebComponents.Comparison
	 * @since 8.3.0
	 */
	onKeyboardSelection() {
		// Pass control to the lookup component
		let lookup = this.find("cq-lookup");
		lookup.setAttribute("cq-focused", "true");
		lookup.overrideIsActive = false;
		lookup.keyboardNavigation = this.keyboardNavigation;
		if (lookup.onKeyboardSelection) lookup.onKeyboardSelection();
	}

	/**
	 * Picks a color to display the new comparison as.
	 * Loops through preset colors and picks the next one on the list.
	 * If all colors are taken, then the last color will be repeated.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	pickSwatchColor() {
		CIQ.UI.pickSwatchColor(this, this.find("cq-swatch"));
	}

	/**
	 * Finds the crosshair price value and puts into the legend.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	position() {
		const { stx } = this.context;
		const bar = stx.barFromPixel(stx.cx);
		this.tick = stx.tickFromPixel(stx.cx);
		const prices = stx.chart.xaxis[bar];

		const printValues = () => {
			let key;
			this.timeout = null;
			for (let s in stx.chart.series) {
				if (!key) key = this.find("[comparison-key]");
				const price = this.find(
					'.item[cq-symbol="' + s + '"] [crosshair-price]'
				);
				if (price && prices && prices.data) {
					if (price.innerText !== "") price.innerText = "";
					const symbol = stx.chart.series[s].parameters.symbol;
					let paddedPrice = stx.padOutPrice(prices.data[symbol]);
					if (price.innerText !== paddedPrice) price.innerText = paddedPrice;
					let pdSymbol = prices.data[symbol];
					if (pdSymbol !== null) {
						if (typeof pdSymbol === "object") pdSymbol = pdSymbol.Close;
						paddedPrice = stx.padOutPrice(pdSymbol);
						if (price.innerText !== paddedPrice) price.innerText = paddedPrice;
					}
				}
			}
		};
		if (this.tick != this.prevTick) {
			if (this.timeout) clearTimeout(this.timeout);
			// IE and FF struggle to keep up with the dynamic heads up.
			this.timeout = setTimeout(printValues, 0);
		}
		this.prevTick = this.tick; // We don't want to update the dom every pixel, just when we cross into a new candle
	}

	/**
	 * Handles removing a series from the comparison.
	 *
	 * @param {string} symbol Name of series as a string.
	 * @param {object} series Object containing info on series.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	removeSeries(symbol, series) {
		this.context.stx.removeSeries(symbol);
	}

	/**
	 * The legend gets re-rendered whenever we createDataSet() (wherein the series may have changed).
	 * We re-render the entire thing each time, but we use a virtual DOM to determine whether
	 * to actually change anything on the screen (so as to avoid unnecessary flickering)
	 *
	 * @tsmember WebComponents.Comparison
	 */
	renderLegend() {
		if (this.currentlyDisabling) return;
		this.pickSwatchColor();
		const key = CIQ.cqvirtual(this.find("[comparison-key]"));
		if (!key) return;

		const tapFunction = (s, series) => {
			return () => {
				this.nomore = true;
				if (!series.parameters.permanent) {
					this.removeSeries(s, series);
					this.emitCustomEvent({
						effect: "remove",
						detail: { name: s }
					});
				}
				this.modalEnd(); // tricky, we miss mouseout events when we remove items from under ourselves
			};
		};

		const getToggleHandle = (series, stx) => {
			return (e) => {
				const { id, parameters } = series,
					disabled = !parameters.disabled;
				e.stopPropagation();
				this.currentlyDisabling = true;
				stx.modifySeries(id, { disabled });
				e.target.parentElement.classList[disabled ? "remove" : "add"](
					"ciq-active"
				);
				e.target.ariaPressed = !disabled;
				this.emitCustomEvent({
					effect: "toggle",
					detail: { name: id, field: "disabled", value: disabled }
				});
				this.currentlyDisabling = false;
			};
		};

		const holder = CIQ.climbUpDomTree(this, ".stx-holder", true)[0];
		const { stx } = this.context;
		stx.getDefaultColor();
		const panelOnly = key.hasAttribute("cq-panel-only");
		const comparisonOnly = !key.hasAttribute("cq-all-series");
		for (let r in stx.chart.seriesRenderers) {
			const renderer = stx.chart.seriesRenderers[r];
			if (renderer == stx.mainSeriesRenderer) continue;
			if (comparisonOnly && !renderer.params.isComparison) continue;
			if (panelOnly && (!holder || renderer.params.panel != holder.panel.name))
				continue;
			for (let s = 0; s < renderer.seriesParams.length; s++) {
				const rSeries = renderer.seriesParams[s];
				const frag = CIQ.UI.makeFromTemplate(this.template)[0];
				const swatch = frag.querySelector("cq-swatch");
				const label = frag.querySelector("[label]");
				const description = frag.querySelector("[description]");
				const loader = frag.querySelector("cq-loader");
				const btn = frag.querySelector(".close");
				const toggleEl = frag.querySelector(".ciq-switch");
				const series = stx.chart.series[rSeries.id];
				const seriesParameters = series.parameters;
				let color = seriesParameters.color || renderer.colors[series.id].color;
				const isAuto = !color || color == "auto";
				if (isAuto) color = stx.defaultColor;
				if (swatch) {
					swatch.seriesId = rSeries.id;
					swatch.setColor(color, false, isAuto);
					if (seriesParameters.opacity)
						swatch.style.opacity = seriesParameters.opacity;
				}
				if (label) {
					label.innerText = stx.translateIf(series.display);
					frag.setAttribute("title", label.innerText);
				}
				if (description && series.description)
					description.innerText = stx.translateIf(series.description);
				frag.setAttribute("cq-symbol", series.id);

				const { symbol } = seriesParameters;
				const q = stx.mostRecentClose(symbol);
				if (q || q === 0) {
					const price = frag.querySelector("[current-price]");
					if (price) {
						price.innerText = stx.padOutPrice(q);
					}
				}

				if (this.loading[seriesParameters.symbolObject.symbol]) loader.show();
				else loader.hide();

				if (seriesParameters.error) frag.setAttribute("cq-error", true);
				if (btn && (!seriesParameters.color || seriesParameters.permanent))
					btn.style.visibility = "hidden";
				else {
					CIQ.UI.stxtap(btn, tapFunction(series.id, series));
				}

				const labelid = CIQ.uniqueID() + "_toggle_label";
				toggleEl.setAttribute("aria-labelledBy", labelid);
				toggleEl.ariaPressed = !seriesParameters.disabled;
				if (!seriesParameters.disabled) frag.classList.add("ciq-active");

				const labelForToggle = frag.querySelector("[id][hidden]");
				if (labelForToggle) labelForToggle.id = labelid;
				toggleEl.classList.remove("hidden");

				CIQ.safeClickTouch(toggleEl, getToggleHandle(series, stx));

				key.appendChild(frag);
			}
		}

		const legendParent = CIQ.climbUpDomTree(
			CIQ.cqrender(key),
			"cq-study-legend",
			true
		);
		legendParent.forEach(function (i) {
			if (i.displayLegendTitle) i.displayLegendTitle();
		});
	}

	/**
	 * Changes the color of a series; triggered if using [cq-swatch]{@link WebComponents.Swatch} to show the series color.
	 *
	 * @param {string} color New color.
	 * @param {object} swatch Swatch from which the color setting is made.
	 *
	 * @tsmember WebComponents.Comparison
	 * @since 7.3.0
	 */
	setColor(color, swatch) {
		const s = swatch.seriesId;
		if (s) this.context.stx.modifySeries(s, { color });
		this.emitCustomEvent({
			effect: "modify",
			detail: { name: s, field: "color", value: color }
		});
	}

	/**
	 * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	setMarkup() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			let { markup } = this.constructor;
			this.addDefaultMarkup(null, markup);
		}
	}

	/**
	 * Adds an injection to the ChartEngine that tracks the price of Comparisons.
	 *
	 * @param {boolean} updatePrices whether to update price on each quote update
	 *
	 * @tsmember WebComponents.Comparison
	 */
	startPriceTracker(updatePrices) {
		const self = this;
		this.addInjection("append", "createDataSet", function () {
			if (updatePrices) self.updatePrices();
			if (this.chart.dataSet && this.chart.dataSet.length) {
				if (self.getAttribute("cq-show") !== "true")
					self.setAttribute("cq-show", "true");
			} else if (self.hasAttribute("cq-show")) self.removeAttribute("cq-show");
		});
	}

	/**
	 * Adds an injection to the ChartEngine to track the crosshair price of the Comparison.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	startTickPriceTracker() {
		this.prevTick = null;
		this.addInjection("prepend", "headsUpHR", () => this.position());
	}

	/**
	 * Fires whenever a new security is added as a comparison. Handles all the necessary events
	 * to update the chart with the new comparison.
	 *
	 * @param {object} obj Contains information about the security.
	 * @param {string} obj.symbol The symbol that identifies the security.
	 *
	 * @since 8.2.0 Removed the `context` parameter. The context is now accessed from the base
	 * 		component class.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	selectItem(obj) {
		const { context } = this;
		const cb = (err, series) => {
			if (err) series.parameters.error = true;
			this.loading[series.parameters.symbolObject.symbol] = false;
			this.renderLegend();
		};
		const swatch = this.find("cq-swatch");
		let color = "auto",
			pattern = null,
			width = 1;
		if (swatch) {
			const { style } = swatch;
			color = style.backgroundColor;
			pattern = style.borderTopStyle;
			width = style.width || 1;
		}
		if (color === "initial") color = "auto";
		const { stx } = context;
		this.loading[obj.symbol] = true;
		const params = {
			name: "comparison " + obj.symbol,
			symbolObject: obj,
			isComparison: true,
			color,
			pattern,
			width: width || 1,
			data: { useDefaultQuoteFeed: true },
			forceData: true
		};

		// don't allow symbol if same as main chart, comparison already exists, or just white space
		const exists = stx.getSeries({ symbolObject: obj });
		for (let i = 0; i < exists.length; i++)
			if (exists[i].parameters.isComparison) {
				this.loading[obj.symbol] = false;
				return;
			}

		// don't allow symbol if same as main chart or just white space
		if (
			obj.symbol &&
			obj.symbol.trim().length > 0 &&
			(!context.stx.chart.symbol ||
				context.stx.chart.symbol.toLowerCase() !== obj.symbol.toLowerCase())
		) {
			stx.addSeries(obj.symbol, params, cb);
		} else {
			this.loading[obj.symbol] = false;
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	setContext(context) {
		this.setAttribute("cq-show", "true");
		// if attribute cq-marker then detach and put ourselves in the chart holder
		this.configureUI();
		const { stx } = context;
		const renderIfChanged = (obj) => this.renderLegend();
		["layout", "symbolImport", "symbolChange", "theme"].forEach(function (ev) {
			stx.addEventListener(ev, renderIfChanged);
		});
		this.addInjection("append", "modifySeries", renderIfChanged);
		this.renderLegend();
		if (!this.template) return;
		const frag = CIQ.UI.makeFromTemplate(this.template)[0];
		this.startPriceTracker(!!frag.querySelector("[current-price]"));
		if (frag.querySelector("[crosshair-price]")) {
			this.startTickPriceTracker();
		}
	}

	/**
	 * Loops thru `stxx.chart.series` to update the current price of all comparisons.
	 *
	 * @tsmember WebComponents.Comparison
	 */
	updatePrices() {
		let key; // lazy eval this to prevent work when no comparisons exist
		const { stx } = this.context;
		const historical = stx.isHistoricalModeSet;
		const isDaily = CIQ.ChartEngine.isDailyInterval(stx.layout.interval);
		for (let s in stx.chart.series) {
			if (!key) key = this.find("[comparison-key]");
			const price = this.find('.item[cq-symbol="' + s + '"] [current-price]');
			if (price) {
				const q = stx.chart.series[s].lastQuote;
				if (!q || !q.DT || (!q.Close && q.Close !== 0)) continue;
				if (
					!isDaily &&
					stx.chart.market &&
					stx.chart.market.getSession(q.DT) === null
				)
					continue; // don't update when no session
				let newPrice = q.Close;
				const field = stx.chart.series[s].parameters.subField || "Close";
				const oldPrice = parseFloat(price.innerText);
				if (newPrice && (newPrice[field] || newPrice[field] === 0))
					newPrice = newPrice[field];
				if (!newPrice && newPrice !== 0 && stx.chart.series[s].lastQuote)
					newPrice = stx.chart.series[s].lastQuote[field];
				const priceText = stx.padOutPrice(historical ? "" : newPrice);
				if (price.innerText !== priceText) price.innerHTML = priceText;
				if (historical) return;
				if (typeof price.hasAttribute("cq-animate"))
					CIQ.UI.animatePrice(price, newPrice, oldPrice);
			}
		}
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Comparison
 */
Comparison.markup = `
		<div comparison-key cq-panel-only cq-all-series>
			<template cq-comparison>
				<div class="item" role="group" keyboard-selectable>
					<div class="icon close ciq-icon ciq-close" role="presentation" keyboard-selectable-child>
						<div class="ciq-screen-reader" role="button">Remove this series</div>
					</div>
					<span class="ciq-switch hidden" role="button" keyboard-selectable-child aria-labelledby="xyz"></span>
					<span id="xyz" hidden>Toggle this plot</span>
					<cq-swatch overrides="auto" role="presentation" keyboard-selectable-child>
						<div class="ciq-screen-reader" role="button">Select color</div>
					</cq-swatch>
					<span label></span>
					<!-- displays the description -->
					<!-- <span description></span> -->
					<cq-loader></cq-loader>
					<!-- displays the price for the active crosshair item -->
					<!-- <div class="price" crosshair-price></div> -->
					<!-- displays the current price with color animation -->
					<span id="pricelabel" hidden>Current Price</span>
					<div role="group" aria-labelledby="pricelabel">
						<div class="price" role="marquee" current-price cq-animate></div>
					</div>
				</div>
			</template>
		</div>
	`;

CIQ.UI.addComponentDefinition("cq-comparison", Comparison);

};


let __js_webcomponents_cvpController_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-cvp-controller&gt;</h4>
 *
 * The CVP Controller web component is used to supplement the [cq-drawing-settings]{@link WebComponents.DrawingSettings} component.
 * It displays additional settings options specific to the Average Line and Regression Line drawing tool.
 *
 * The additional information is to activate a line at +/- X standard deviations away from the center line.
 * There is a line color and line style selection available as well.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | enable    | True if this instance is active. |
 * | color     | Current line color in hex format, or "auto" to select color from theme. |
 * | width     | Line width in pixels. |
 * | pattern   | Line pattern: "solid", "dotted" or "dashed". |
 *
 * In addition, the following attributes are also supported:
 * | attribute     | description |
 * | :------------ | :---------- |
 * | cq-cvp-header | A numerical index relating to the number of standard deviations to this instance applies. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | name | _property_ |
 * | value | _value_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Markup for CVP Controller</caption>
 *	<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
 *
 * @alias WebComponents.CVPController
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class CVPController extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["enable", "color", "pattern", "width"];
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;

		Object.defineProperty(this, "_scope", {
			configurable: true,
			enumerable: false,
			value: this.getAttribute("cq-cvp-header") || "",
			writable: false
		});

		if (this.children.length === 0) {
			this.addDefaultMarkup();
			const heading = this.querySelector(".ciq-heading");
			if (heading) {
				heading.innerHTML = this._scope;
			}
		}

		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, CVPController);
		this.constructor = CVPController;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.CVPController
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		const action = this.activator ? "click" : null;
		delete this.activator;

		switch (name) {
			case "enable":
				this.toggleActive(null, newValue === "true");
				break;
			case "color":
				this.setColor(newValue);
				break;
			case "width":
				this.setStyle(null, newValue, null);
				break;
			case "pattern":
				this.setStyle(null, null, newValue);
				break;
		}

		if (!this.context) return;

		if (!this.syncing) {
			this.emitCustomEvent({
				action,
				effect: "select",
				detail: { name, value: newValue }
			});
		}
	}

	/**
	 * Emits a change event.
	 *
	 * @param {string} eventName Event type
	 * @param {Object} value key/value pairs to pass in event detail.  Represents what changed and the value it changed to.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	emit(eventName, value) {
		if (this.toolbar) {
			this.toolbar.emit();
		} else {
			this.dispatchEvent(
				new CustomEvent(eventName, {
					bubbles: true,
					cancelable: true,
					detail: value
				})
			);
		}
	}

	/**
	 * Gets the current drawing color and updates display in palette.
	 *
	 * @param {Object} activator
	 * @param {HTMLElement} activator.node Element that triggered this function.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	getColor(activator) {
		const node = activator.node || this.querySelector("cq-line-color");
		const { color } = this;

		const specialColorStyles = ["color-auto", "color-transparent"];
		specialColorStyles.forEach((style) => node.classList.remove(style));
		if (specialColorStyles.includes("color-" + color)) {
			node.removeAttribute("style");
			node.classList.add("color-" + color);
		} else {
			node.style.background = color;
			const bgColor = CIQ.getBackgroundColor(this.parentNode);
			if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
				const border = CIQ.chooseForegroundColor(bgColor);
				node.style.border = "solid " + border + " 1px";
			} else {
				node.style.border = "";
			}
		}

		const label = node.querySelector("[label]");
		if (label) label.innerText = color;
	}

	/**
	 * Enables colorPicker and provides callback to `setColor`, depending on `mode` value.
	 *
	 * @param {Object} activator
	 * @param {HTMLElement} activator.node Element that triggered this function.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	pickColor(activator) {
		const colorPicker = this.uiManager.getColorPicker(this);
		const overrides = activator.node.getAttribute("cq-overrides");

		if (!colorPicker)
			return console.error(
				"CVPController.prototype.pickColor: no <cq-color-picker> available"
			);
		if (overrides) activator.overrides = overrides.split(",");

		colorPicker.callback = (color) => {
			this.activator = activator;
			this.setColor(color);
		};

		activator.context = this.context;
		colorPicker.display(activator);
	}

	/**
	 * Sets the default line color.
	 *
	 * @param {string} color A Valid css color value.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	setColor(color) {
		if (!this.context) return;
		this.color = color;
		this.context.stx.currentVectorParameters["color" + this._scope] = color;
		this.getColor({
			node: this.querySelector("cq-line-color")
		});
		this.emit();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	setContext(context) {
		this.setStyle();
		if (this.toolbar) this.toolbar.dirty(false);
	}

	/**
	 * Set drawing line style.
	 *
	 * @param {Object} [activator]
	 * @param {HTMLElement} [activator.node] Element that triggered this function.
	 * @param {string} [width="1"] Line width
	 * @param {string} [pattern="dotted"] Line pattern
	 *
	 * @tsmember WebComponents.CVPController
	 */
	setStyle(activator, width = "1", pattern = "dotted") {
		if (width === null) width = this.width;
		if (pattern === null) pattern = this.pattern;

		width = width || "1";
		pattern = pattern || "dotted";

		this.activator = activator;
		this.width = parseInt(width, 10).toString();
		this.context.stx.currentVectorParameters["lineWidth" + this._scope] =
			this.width;
		this.activator = activator; // set this again since it's reset when we set the width
		this.pattern = pattern;
		this.context.stx.currentVectorParameters["pattern" + this._scope] = pattern;

		const selection = this.querySelector(
			"*[cq-cvp-line-style], .menu-clickable .icon"
		);

		if (this.lineStyleClassName) {
			selection.classList.remove(this.lineStyleClassName);
		}

		if (pattern && pattern !== "none") {
			this.lineStyleClassName = "ciq-" + pattern + "-" + this.width;
			selection.classList.add(this.lineStyleClassName);
		} else {
			this.lineStyleClassName = null;
		}

		this.emit("change", {
			lineWidth: width,
			pattern
		});
	}

	/**
	 * Update the component state with configuration. May be a drawing instance or
	 * currentVectorParameters.
	 *
	 * @param {Object} config drawing instance or currentVectorParameters
	 *
	 * @tsmember WebComponents.CVPController
	 */
	sync(config) {
		this.syncing = true;
		const active = config["active" + this._scope] || false;
		const color = config["color" + this._scope];
		const width = config["width" + this._scope];
		const pattern = config["pattern" + this._scope];

		const className = "ciq-active";
		const checkbox = this.querySelector(".ciq-checkbox");

		if (active) {
			checkbox.classList.add(className);
		} else {
			checkbox.classList.remove(className);
		}

		this.enable = active.toString();
		this.context.stx.currentVectorParameters["active" + this._scope] = active;
		checkbox.setAttribute("aria-checked", this.enable);
		this.color = color || "auto";
		this.context.stx.currentVectorParameters["color" + this._scope] =
			this.color;
		this.getColor({});
		this.setStyle(null, width, pattern);
		this.syncing = false;
	}

	/**
	 * Toggle active state of component instance.
	 *
	 * @param {Object} activator
	 * @param {HTMLElement} activator.node Element that triggered this function.
	 * @param {boolean} [forceValue=null] If set, will force the toggle to that value.
	 *
	 * @tsmember WebComponents.CVPController
	 */
	toggleActive(activator, forceValue = null) {
		if (!this.context) return;
		this.activator = activator;
		let active = true;
		if (forceValue !== null) {
			active = forceValue;
		} else if (this.enable === "true") {
			active = false;
		}
		this.enable = active.toString();
		this.context.stx.currentVectorParameters["active" + this._scope] = active;
		const node = this.querySelector(".ciq-checkbox");
		const className = "ciq-active";
		node.classList[active ? "add" : "remove"](className);
		node.setAttribute("aria-checked", this.enable);

		this.emit("change", {
			active: this.enable
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.CVPController
 */
CVPController.markup = `
		<div cq-section>
			<span role="checkbox" stxtap="toggleActive())" class="ciq-checkbox" aria-checked="false">
				<div class="ciq-heading"></div>
				<span></span>
			</span>
		</div>
		<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getColor()" stxtap="pickColor()" role="button">
			<span class="icon" aria-hidden="true"></span>
			<span class="ciq-screen-reader">Line Color</span>
			<span class="ciq-screen-reader" label></span>
		</cq-line-color>
		<cq-line-style cq-section>
			<cq-menu class="ciq-select ciq-cvp-line-style" reader="Line Style" config="cvplinestyle" icon="ciq-solid-1"></cq-menu>
		</cq-line-style>
	`;

CIQ.UI.addComponentDefinition("cq-cvp-controller", CVPController);

};


let __js_webcomponents_dataDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */





const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-data-dialog&gt;</h4>
 *
 * Dialog form that allows users to upload CSV files to be loaded into the chart.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it imports data.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "import" |
 * | action | "click" |
 * | file | _file data_ |
 *
 * A custom event will be emitted from the component when it validates data.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "validate" |
 * | action | "click" |
 * | messageTitle | _validation message title_ |
 * | messageText | _validation message text_ |
 * | valid | _validation status_ |
 *
 * @alias WebComponents.DataDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class DataDialog extends CIQ.UI.DialogContentTag {
	constructor() {
		super();
		this.fileMap = new Map();
		this.swatchColors = CIQ.UI.defaultSwatchColors;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, DataDialog);
		this.constructor = DataDialog;
	}

	/**
	 * Aborts the import of a file.
	 * If that is the only file loaded then the form will reset to its default state.
	 * @param {Event} e Submit event
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	abortImport(e) {
		const targetClose = e.target.nodeName === "CQ-CLOSE";

		const fmf = [...this.fileMap.keys()];
		const findIndexFn = (fname) => {
			return (file) => file.name === fname;
		};
		for (let fset of this.form.querySelectorAll("fieldset[name]")) {
			let fname = fset.getAttribute("fields");
			if (e && e.target.getAttribute("fields") !== fname && !targetClose)
				continue;
			let idx = fmf.findIndex(findIndexFn(fname));

			this.form.removeChild(fset.parentElement);
			this.fileMap.delete(fmf[idx]);
		}

		if (targetClose) this.fileInput.value = "";

		if (!this.fileMap.size) {
			this.fileInput.value = "";
			this.loadDataBtn.style.display = "inline-block";
			this.importBtn.style.display = "none";
			this.querySelector("cq-section.loader").style.display = "flex";
			this.warn("", "", true);
			CIQ.UI.containerExecute(this, "resize");
		}

		this.resetTabSelect();
	}

	/**
	 * Closes dialog and resets it to the default state.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	close() {
		this.abortImport({ target: this.querySelector("cq-close") });
		this.channelWrite("channel.dataLoader", false, this.context.stx);
		this.loadDataBtn.style.display = this.fileInput.value ? "none" : "inline";
		this.querySelector("cq-section.loader").style.display = "flex";
		this.warn("", "", true);
		super.close();
	}

	/**
	 * Gets FormData from fields and appends that data to the {@link CIQ.CSVReader}.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	getFormData() {
		const appendFormData = (fieldSet, reader) => {
			return (field) => {
				const el = fieldSet.elements[field];
				let value;

				if (el) {
					value = el.type === "checkbox" ? el.checked : el.value;
				} else {
					const v = fieldSet.querySelector(`[name='${field}']`);
					if (v) value = v.value;
				}

				reader.formData.append(field, value);
			};
		};

		for (let entry of this.fileMap) {
			const [file, reader] = entry;
			let fieldSet = this.querySelector(`[name='${file.name}'] fieldset`);

			reader.formData = new FormData();
			["name", "display", "periodicity", "panel", "color"].forEach(
				appendFormData(fieldSet, reader)
			);
		}
	}

	/**
	 * Hides the dialog without clearing data.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	hide() {
		this.channelWrite("channel.dataLoader", false, this.context.stx);
	}

	/**
	 * Imports the data if the dialog is in a valid state.
	 * Closes dialog after successfully importing data.
	 * @param {Event} e Submit event. Default is prevented.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	importData(e) {
		e.preventDefault();
		const { dialog } = this;
		if (!dialog.validate()()) return;
		let {
			context: { stx },
			fileMap
		} = dialog;
		dialog.getFormData();
		fileMap.forEach((reader) => {
			stx.dataLoader.importData(reader);
			dialog.emitCustomEvent({
				effect: "import",
				detail: {
					file: reader
				}
			});
		});
		dialog.close();
	}

	/**
	 * Parses files uploaded by the user.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	async loadData() {
		this.validateFileInput()();
		if (this.warning.getAttribute("cq-active")) return;
		for (const file of this.fileInput.files) {
			let reader = new CIQ.CSVReader(file);
			this.fileMap.set(file, reader);
			await reader.parse(file);
		}

		this.loadDataBtn.style.display = "none";
		this.querySelector("cq-section.loader").style.display = "none";
		this.showData();
	}

	/**
	 * Realigns tab select from the KeystrokeHub
	 * @private
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	resetTabSelect() {
		const {
			uiManager: { keystrokeHub }
		} = this.context;

		keystrokeHub.highlightAlign();
	}

	/**
	 * Constructs and displays form for loaded files.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	showData() {
		const {
			context: { stx, config = {} },
			keystrokeHub
		} = this;

		const setAbortFunc = (fileName) => {
			return (selector) => {
				selector.setAttribute("fields", fileName);
				selector.addEventListener("pointerup", (e) => {
					e.preventDefault(); // stop submit event!
					CIQ.UI.containerExecute(selector, "abortImport", [e]);
				});
			};
		};

		let main = false;
		let tmpl = this.querySelector("template");
		for (const entries of this.fileMap) {
			const [file, reader] = entries;
			const fileName = file.name;
			const frag = tmpl.content.cloneNode(true);
			frag.firstElementChild.id += `${fileName}`;
			frag.firstElementChild.setAttribute("name", fileName);

			const fieldSet = frag.querySelector("fieldset");
			if (fieldSet) {
				fieldSet.setAttribute("fields", fileName);
				fieldSet.setAttribute("name", "fields");
			}

			const title = frag.querySelector("legend.file-name");
			title.innerText = `File: ${fileName}`;

			const name = frag.querySelector(".data-name input");
			name.setAttribute("placeholder", fileName);
			name.value = fileName;

			const periodicity = frag.querySelector(".ciq-select[name='periodicity']");
			const periodicities =
				CIQ.getFromNS(config, "menus.period.content") ||
				config.menuPeriodicity ||
				(function () {
					const periodicity = stx.getPeriodicity();
					return [
						{
							value: periodicity,
							label: `${periodicity.period}, ${periodicity.timeUnit}`
						}
					];
				})();
			periodicities
				.filter((m) => m.label)
				.forEach((p) => {
					const opt = document.createElement("option");
					opt.innerText = p.label;
					let value = p.value;
					if (Array.isArray(p.value)) {
						value = {};
						["period", "interval", "timeUnit"].forEach((v, i) => {
							value[v] = p.value[i];
						});
					}
					opt.value = JSON.stringify(value);
					periodicity.append(opt);
				});

			const fieldsSection = frag.querySelector(".data-fields ul");
			let { fields = [] } = reader;

			fields.forEach((cell) => {
				const item = document.createElement("li");
				item.innerText = cell;
				fieldsSection.append(item);
			});

			const display = frag.querySelector("[name=display]");
			const secondaryOptions = frag.querySelector(".secondary-options");

			if (!main) main = true;
			else {
				display.value = "secondary";
				secondaryOptions.style.display = "block";
			}

			display.addEventListener("change", function (e) {
				let show = this.value.toLowerCase() === "secondary";
				secondaryOptions.style.display = show ? "block" : "none";
				keystrokeHub.highlightAlign();
			});

			frag.querySelectorAll(".abort").forEach(setAbortFunc(fileName));

			CIQ.UI.pickSwatchColor(this, frag.querySelector("cq-swatch"));
			this.form.append(frag);

			// Prevent accidental submit from inputs
			this.form.querySelectorAll("input:not([type=submit]").forEach((input) => {
				input.addEventListener("keypress", (e) => {
					if (e.key === "Enter") e.preventDefault();
				});
			});
		}

		this.importBtn.style.display = "inline";
		CIQ.UI.containerExecute(this, "resize");
		this.resetTabSelect();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	setContext(context) {
		this.context = context;
		this.addDefaultMarkup();

		this.form = this.querySelector("form");
		this.fileInput = this.querySelector("input[type=file]");
		this.loadDataBtn = this.querySelector("button.load");
		this.importBtn = this.querySelector("button.import");
		this.controls = this.querySelector("div.ciq-dialog-cntrls");

		this.warning = this.querySelector(".invalid-warning");
		this.warningTitle = this.warning.querySelector(".invalid-warning-title");
		this.warningText = this.warning.querySelector(".invalid-warning-text");

		this.form.dialog = this;
		this.form.addEventListener("submit", this.importData);
		this.form.addEventListener("change", this.validate());

		this.fileInput.addEventListener("change", this.validateFileInput());

		this.keystrokeHub = context.uiManager.keystrokeHub;
	}

	/**
	 * Custom validate method for the determining whether the data is ready to be submitted for import.
	 * **NOTE** this validate method is for the form, not for validating files set on input
	 * @return {boolean} valid status
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	validate() {
		const self = this;
		return function (e) {
			self.getFormData();
			let isMain;
			let valid = true;
			for (const entry of self.fileMap) {
				const [, reader] = entry;
				const { formData, fields } = reader;
				const display = formData.get("display");
				const periodicity = formData.get("periodicity");

				let validFields =
					(fields.includes("DT") || fields.includes("Date")) &&
					fields.some((f) => f === "Close" || f === "Value");

				if (!validFields) {
					valid = false;
					return reportValidity(
						{
							messageTitle: "Invalid Data fields",
							messageText:
								'Your data contains invalid schema to display. It must include a "DT" column and either a "Close" or "Value" column.'
						},
						valid
					);
				}

				if (display === "secondary") {
					if (
						!CIQ.equals(
							JSON.parse(periodicity),
							self.context.stx.getPeriodicity()
						)
					) {
						valid = false;
						return reportValidity(
							{
								messageTitle: "Mis-matched periodicities:",
								messageText:
									"Having mixed periodicities can result in chart displaying incorrect time scales. Check your data and try again."
							},
							valid
						);
					}
				} else {
					if (isMain) {
						valid = false;
						return reportValidity(
							{
								messageTitle: "Multiple Main series",
								messageText:
									"Detected multiple data files set to display main data. Only one data file can be main."
							},
							valid
						);
					}
					isMain = true;
				}
			}

			return reportValidity({ messageTitle: "", messageText: "" }, valid);

			function reportValidity({ messageTitle, messageText }, valid) {
				self.warn(messageTitle, messageText, valid);
				self.resetTabSelect();
				self.emitCustomEvent({
					effect: "validate",
					detail: {
						messageTitle,
						messageText,
						valid
					}
				});
				return valid;
			}
		};
	}

	/**
	 * Validation function for File Input.
	 * **NOTE** Not the same as the validation for the form
	 * @return {function} Funtion that runs on file input change event
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	validateFileInput() {
		const self = this;
		return function (e) {
			// Determine whether called by the dialog or the input then set files
			const files = self.files || self.fileInput.files;

			let valid = true,
				title = "",
				message = "";
			Object.values(files).forEach(function (file) {
				const { name } = file;
				const extension =
					name.lastIndexOf(".") > 0 &&
					name.slice(name.lastIndexOf("."), name.length);
				if (
					(extension && extension !== ".csv") ||
					DataDialog.mimeTypes.indexOf(file.type) == -1
				) {
					title = "Invalid File Type";
					message =
						"Data Importer requires a text/csv file to work. Please select a CSV file.";
					valid = false;
				}
			});

			if (!files.length) {
				title = `Please select a file!`;
				message =
					"Data Importer requires a text/csv file to work. Please select a CSV file.";
				valid = false;
			}
			self.warn(title, message, valid);
			self.resetTabSelect();
		};
	}

	/**
	 * Displays or clears warning messages based on the validity of the form.
	 *
	 * @param {string} title Title text of warning to display.
	 * @param {string} text Body text of warning to display.
	 * @param {boolean} valid Should be valid property from validiity
	 *
	 * @tsmember WebComponents.DataDialog
	 */
	warn(title, text, valid) {
		this.warningTitle.innerText = title;
		this.warningText.innerText = text;
		if (!valid) this.warning.setAttribute("cq-active", true);
		else this.warning.removeAttribute("cq-active");
	}
}

/**
 * Valid MIME types that the DataDialog will recognize.
 * By default the file input only accepts the extensions listed here.
 *
 * For more information about extension and MIME types see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 * @static
 * @type {string[]}
 *
 * @tsmember WebComponents.DataDialog
 */
DataDialog.mimeTypes = [
	"text/csv",
	"application/csv",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-excel"
];

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.DataDialog
 */
DataDialog.markup = `
	<cq-scroll cq-no-maximize>
		<cq-section class="loader">
			<label for="fileSelector">Choose one or more CSV files to load data into the chart:</label>
			<input name="fileSelector" type="file" multiple accept=".csv" />
		</cq-section>
		<cq-section class="ciq-dialog-cntrls">
			<button class="ciq-btn load" stxtap="loadData()">Open Files</button>
		</cq-section>
		<cq-section>
			<form class="import-data" id="data-wizard"></form>
		</cq-section>
		<template class="table">
			<cq-section class="data-table">
				<fieldset form="data-wizard" name="file-fields">
				<legend class="file-name"></legend>
				<div class="data-name"><label for="name">Name for imported data:</label><input type="text" name="name" required /></div>
				<div class="data-periodicity">
					<label for="periodicity">Data Periodicity:</label>
					<span class="select-holder">
						<select name="periodicity" class="ciq-select" form="data-wizard" required>
					</span>
					</select>
				</div>
				<div class="data-fields">
					<label>Data Fields:</label>
					<ul class="content-justify-end"></ul>
				</div>
				<div class="data-display">
					<label>Display As:</label>
					<span class="select-holder">
						<select name="display" form="data-wizard" class="ciq-select" required>
						<option value="main">Main Series</option>
						<option value="secondary">Secondary Series</option>
						</select>
					</span>
				</div>
				<div class="content-justify-end">
					<fieldset class="secondary-options">
					<legend>Secondary Series Options:</legend>
						<div>
							<label>Add in new panel: </label><input type="checkbox" name="panel" />
						</div>
						<div>
							<label>Color: </label><cq-swatch name="color"></cq-swatch>
						</div>
					</fieldset>
				</div>
			</div>
			<div class="buttons">
				<button class="ciq-btn-negative abort">Remove</button>
			</div>
			</fieldset>
			</cq-section>
		</template>
		<cq-section>
			<div class="invalid-warning">
				<div class="invalid-warning-title"></div>
				<div aria-live="assertive" class="invalid-warning-text"></div>
			</div>
		</cq-section>
		<cq-section class="ciq-dialog-cntrls">
			<button class="ciq-btn import" form="data-wizard" type="submit">Confirm</button>
		</cq-section>
	
	</cq-scroll>
	<cq-close role="button" title="Close" tabindex="0"></cq-close>
	`;
CIQ.UI.addComponentDefinition("cq-data-dialog", DataDialog);

};


let __js_webcomponents_dialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-dialog&gt;</h4>
 *
 * Manages general dialog interaction such as display, hide, location, size, tap interaction, etc.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute       | description |
 * | :-------------- | :---------- |
 * | cq-title        | Display text in dialog heading. |
 * | cq-description  | Optional description of dialog. |
 * | cq-close-button | Set to "false" to hide the close (X) button in uppper right corner. Note: Users can still close the dialog by clicking outside of it or pressing the Esc key. |
 *
 * Initial attribute values can be configured in the context configuration.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | effect | "hide", "show" |
 * | title | heading of dialog |
 * | type | tag name of dialog being wrapped |
 *
 * @example <caption>A dialog container</caption>
 *	<cq-dialog cq-timezone-dialog>
 *		<cq-timezone-dialog>
 *		 ...
 *		</cq-timezone-dialog>
 *	</cq-dialog>
 *
 * @example <caption>Configuring the attributes</caption>
 *	stxx.uiContext.config.dialogs.timezone = {
 *		tag: "cq-timezone-dialog",
 *		attributes: {
 *			"cq-title": "Choose Timezone",
 *			description: "To set your timezone use the location button below, or scroll through the following list..."
 *		}
 *	];
 *
 * @alias WebComponents.Dialog
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Dialog extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["cq-title", "cq-description", "cq-close-button"];
	}

	constructor() {
		super();
		this.activeAttributes = {};
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.isDialog = true;
		super.connectedCallback();

		const handleTap = (e) => this.tap(e);

		CIQ.UI.stxtap(this, handleTap);

		const uiManager = CIQ.UI.getUIManager(this);
		uiManager.registerForResize(this);
		this.uiManager = uiManager;

		if (!this.hasAttribute("cq-no-claim")) this.addClaim(this);
		if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");

		// Attach cq-close, h4 header and description if needed
		this._renderTitleElement();
		this._renderCloseButton();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Dialog);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		this.uiManager.unregisterForResize(this);
		super.disconnectedCallback();
	}

	/**
	 * Renders the close button on the dialog, if applicable
	 *
	 * @tsmember WebComponents.Dialog
	 * @private
	 */
	_renderCloseButton() {
		const showCloseButton = this.getAttribute("cq-close-button") !== "false";
		let closeButtonEl = this.querySelector("cq-close");

		if (showCloseButton && !closeButtonEl) {
			// TODO: make this a button element once everything else works
			closeButtonEl = document.createElement("cq-close");
			closeButtonEl.setAttribute("role", "button");
			closeButtonEl.setAttribute("title", "Close");
			closeButtonEl.setAttribute("tabindex", "0");
			// Close button is appended to the end so it is read last by screen readers. Visually,
			// it appears in the upper right corner.
			this.append(closeButtonEl);
		} else if (!showCloseButton && closeButtonEl) {
			closeButtonEl.remove();
		}
	}

	/**
	 * Renders the title on the dialog, if applicable
	 *
	 * @return {HTMLElement} Element containing the title.
	 * @tsmember WebComponents.Dialog
	 * @private
	 */
	_renderTitleElement() {
		const title = this.getAttribute("cq-title") || "";
		const titleId = this.getAttribute("aria-labelledby");
		let titleEl = this.querySelector("#" + titleId);

		if (!title && titleEl) titleEl.remove();
		else if (title) {
			if (!titleEl) {
				titleEl = document.createElement("h4");
				titleEl.id = titleId;
				this.prepend(titleEl);
			}

			if (this.context)
				CIQ.makeTranslatableElement(titleEl, this.context.stx, title);
			else titleEl.innerText = title;
		}

		if (titleEl) {
			let sibling = titleEl.nextSibling;
			const hasDesc = sibling && sibling.matches("p[id]");
			const description = this.getAttribute("cq-description") || "";
			if (!description) {
				if (hasDesc) sibling.remove();
			} else {
				if (!hasDesc) {
					sibling = document.createElement("p");
					// Add the description directly after the title
					titleEl.parentElement.insertBefore(sibling, titleEl.nextSibling);
				}
				sibling.id = this.getAttribute("aria-describedby");
				if (this.context)
					CIQ.makeTranslatableElement(sibling, this.context.stx, description);
				else sibling.innerHTML = description;
			}
		}
		return titleEl;
	}

	/**
	 * Forces a title change, even if the title is the same as before.
	 * Use this method to change the title of the dialog rather than just changing the cq-title attribute;
	 *
	 * @param {string} title New title
	 *
	 * @tsmember WebComponents.Dialog
	 */
	setTitle(title) {
		this.setAttribute("cq-title", "");
		this.setAttribute("cq-title", title);
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Dialog
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		switch (name) {
			case "cq-title":
			case "cq-description":
				this._renderTitleElement();
				return;
			case "cq-close-button":
				this._renderCloseButton();
				return;
		}
	}

	/**
	 * Finds the first element in `items` that has a `cq-focused` attribute or a name attribute
	 * that matches the value of `activeElementName`. If found, that element is focused.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	refreshFocus() {
		const items = this.getKeyboardSelectableItems();
		let focused = this.findFocused(items)[0];
		if (!focused)
			focused = Array.from(items || []).find((item) =>
				item.matches("[name=" + this.activeElementName + "]")
			);
		if (focused) this.focusItem(focused);
	}

	/**
	 * Returns an array of dialog elements that are keyboard selectable.
	 *
	 * @return {NodeList} An array of DOM elements
	 *
	 * @tsmember WebComponents.Dialog
	 */
	getKeyboardSelectableItems() {
		return this.querySelectorAll(
			"[keyboard-selectable='true'], [tabindex='0'], input, .ciq-select, cq-swatch, .ciq-btn, .ciq-btn-negative, cq-scroll li, ul cq-item, .ciq-filter"
		);
	}

	/**
	 * Handle the keystroke event to keyboard navigate the dialog.
	 * Tab and Enter are supported.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Dialog
	 */
	keyStroke(hub, key, e) {
		if (hub.tabActiveModals[0] !== this) return false;
		const reverse = key === "ArrowUp" || e.shiftKey;

		if (key === "ArrowUp" || key === "ArrowDown") {
			key = "Tab";
		}

		const nativeTabbing = this.hasAttribute("native-tabbing");

		const items = this.getKeyboardSelectableItems();
		if (key === "Tab" && !nativeTabbing) {
			const focused = this.focusNextItem(items, reverse, true);
			const scroll = this.querySelector("cq-scroll");
			if (focused && scroll) {
				// Scroll to the element that was focused
				scroll.scrollToElement(focused);
				// Let the scroll complete before aligning the highlight
				setTimeout(() => hub.highlightAlign());
				return true;
			}
		} else if (key == "Enter" || key === " ") {
			const focused = this.findFocused(items)[0];

			if (focused) {
				this.clickItem(focused, e, this);
				if (focused.tagName === "INPUT" && typeof focused.click === "function")
					focused.click();
				return true;
			}
		}
		return false;
	}

	/**
	 * Hides the highlight on select because the study dialog contents re-render quite often, throwing off the highlight position (e.g. When a dropdown selection is made).
	 * Called when dialog becomes keyboard navigable
	 *
	 * @tsmember WebComponents.Dialog
	 */
	onKeyboardSelection() {
		// Pressing the tab key will re-focus the next appropriate item and helps the user re-orient themselves.
		this.keyboardNavigation.highlightHide();
	}

	/**
	 * If we're using keyboard navigation, returns the highlight to the tab selected element.
	 * Called when dialog is no longer keyboard navigable.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	onKeyboardDeselection() {
		if (this.keyboardNavigation && this.keyboardNavigation !== null)
			this.keyboardNavigation.highlightAlign();
	}

	/**
	 * Click a keyboard selectable element.
	 *
	 * @param {HTMLElement} item Element to click.
	 * @param {Event} e The keystroke event.
	 * @param {HTMLElement} originationElement The keyboard active element which initiated the click.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	clickItem(item, e, originationElement) {
		// Pass control to the dropdown. Dropdowns within the dialog become detached from their
		// parent in the dom and cannot pass comtrol directly.
		if (item && this.keyboardNavigation) {
			const dropdown = item.querySelector("cq-dropdown, cq-menu-dropdown");
			if (dropdown) {
				dropdown.keyboardOriginationElement = originationElement;
				this.keyboardNavigation.setKeyControlElement(dropdown);
			}
		}
		super.clickItem(item, e, this);
	}

	/**
	 * Handle escape key press.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key.
	 * @return {boolean} returns false if nothing was done.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	processEsc(hub) {
		// See if we need to use Esc to clean up the dialog
		if (this.closeActiveMenu()) {
			// If there's another modal available at position 0, set it as active
			if (hub.tabActiveModals[0])
				hub.setKeyControlElement(hub.tabActiveModals[0]);
			// Returning true prevents the keyHub from processing esc.
			return true;
		}
		// If nothing was done, pass false to process esc in the keyHub
		return false;
	}

	/**
	 * Close the active menu.
	 *
	 * @return {boolean} returns true if a menu was closed.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	closeActiveMenu() {
		const activeMenu = this.querySelector("*.stxMenuActive");
		if (activeMenu) {
			const uiManager = CIQ.UI.getUIManager(this);
			if (uiManager) uiManager.closeMenu(activeMenu);
			return true;
		}
		return false;
	}

	/**
	 * Creates a new attribute to be activated when the dialog is open. Use this to style the dialog.
	 * This is automatically set by any component that is derived from DialogContentTag.
	 *
	 * @param {string} attribute The attribute to add or remove
	 * @since  4.1.0
	 * @example
	 * <style> cq-dialog[cq-study-context]{ padding:0; } </style>
	 * <cq-dialog cq-study-context></cq-dialog>
	 *
	 * @tsmember WebComponents.Dialog
	 */
	addActiveAttribute(attribute) {
		this.activeAttributes[attribute] = true;
	}

	center() {
		return;
	}

	/**
	 * Close the dialog and make it inactive.  Calls the `onClose()` function if it is defined on this component.
	 * @param {boolean} [propagate] True if child elements should also call onClose functions
	 *
	 * @tsmember WebComponents.Dialog
	 */
	close(propagate) {
		this.uiManager.closeMenu(this);
		if (this.onClose) this.onClose(propagate);
		this.parentElement.removeAttribute("cq-active");
	}

	/**
	 * Hide the dialog.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	hide() {
		this.enableMultichartColorPickerFloat(false);
		if (!this.active || this.querySelector(":invalid")) return;
		this.active = false;
		// Call the "hide()" function for any immediate children. This will allow nested
		// components to clean themselves up when a dialog is removed from outside of their scope.
		[...this.children].forEach((child) => {
			if (typeof child.hide == "function") child.hide();
		});
		if (
			this.uiManager.overlay &&
			this.uiManager.overlay.hasAttribute("cq-active")
		)
			this.uiManager.overlay.removeAttribute("cq-active");
		//this.uiManager.overlay=null;
		for (let attribute in this.activeAttributes) {
			if (this.hasAttribute(attribute)) this.removeAttribute(attribute);
		}
		this.activeAttributes = {};

		// blur any input boxes that are inside the dialog we're closing, to get rid of soft keyboard
		[...this.querySelectorAll("input")].forEach((input) => {
			if (input == input.ownerDocument.activeElement) input.blur();
		});

		// Blur any focused elements
		this.removeFocused();
		// Remove this dialog from the active index
		const { keystrokeHub } = this.ownerDocument.body;
		if (keystrokeHub) keystrokeHub.removeActiveModal(this);
		this.parentElement.removeAttribute("cq-active");
		if (!this.matches("cq-color-picker"))
			this.ownerDocument.body.classList.remove("ciq-dialog-open");
		this.setAttribute("role", "dialog");
		this.ariaHidden = "true";

		if (
			document.activeElement.tagName !== "INPUT" &&
			document.activeElement.tagName !== "TEXTAREA"
		) {
			let { caller } = this;
			// If a caller isn't set, jump back to the beginning
			if ((!caller || !caller.focus) && this.context)
				caller = this.context.topNode.querySelector("cq-chart-instructions");

			while (caller && !CIQ.trulyVisible(caller)) caller = caller.parentElement;
			if (caller)
				setTimeout(() => {
					if (!caller.closest("[native-tabbing]")) caller.tabIndex = -1;
					caller.focus();
				}, 10);
		}

		this.emitCustomEvent({
			action: null,
			cause: "helper",
			effect: "hide",
			detail: {
				title: this["cq-title"],
				type: this.wraps
			}
		});
	}

	/**
	 * Hook for launching color picker, it needs to close menus.
	 *
	 * @tsmember WebComponents.Dialog
	 * @private
	 */
	launchColorPicker() {
		if (this.uiManager) this.uiManager.closeMenu(null, "CQ-MENU");
	}

	/**
	 * Open the dialog.
	 *
	 * @param {object} params Dialog parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 *
	 * @tsmember WebComponents.Dialog
	 */
	open(params) {
		this.uiManager.openMenu(this, params);
		// Capture context to be able to later notify dialog closing in channel
		const { context, caller } = params || {};
		this.context = context;
		if (!context || !context.config) {
			this.onClose = null;
			return;
		}

		this.caller = caller || document.activeElement;

		const {
			config: { channels },
			stx
		} = context;

		if (stx.translateUI) stx.translateUI(this);

		this.onClose = (propagate) => {
			this.channelWrite(channels.dialog || "channel.dialog", {}, stx);
			this.onClose = null;
			if (!propagate) return;
			// If Dialog content has a hide method, call it.
			[...this.children].forEach((child) => {
				if (child.hide) child.hide();
				if (child.onClose) child.onClose();
			});
		};
		this.parentElement.setAttribute("cq-active", true);
		this.ariaHidden = "false";
		if (!this.matches("cq-color-picker")) {
			this.ownerDocument.body.classList.add("ciq-dialog-open");
			// The color picker will focus itself
			setTimeout(() => {
				this.tabIndex = -1;
				this.focus();
			}, 10);
		}
		this.emitCustomEvent({
			action: null,
			cause: "helper",
			effect: "show",
			detail: {
				title: this["cq-title"],
				type: this.wraps
			}
		});

		this.enableMultichartColorPickerFloat(true);
	}

	/**
	 * Configure CSS layering to enable the color picker to float above the dialog.
	 *
	 * @param {boolean} [val=true] Setting "val" to false will restore the original style values of the element.
	 *
	 * @tsmember CIQ.UI.DialogContentTag
	 * @since 9.3.0
	 */
	enableMultichartColorPickerFloat(val) {
		const tagName = (Object.entries(this.activeAttributes).find(
			([k, v]) => k !== "cq-active" && v
		) || [])[0];
		if (!tagName) return;
		if (tagName.includes("-context")) return;

		document
			.querySelectorAll(
				"cq-context-wrapper, .ciq-multi-chart-container-wrapper"
			)
			.forEach((el) => (el.style.zIndex = val ? "inherit" : ""));
		document
			.querySelectorAll(".ciq-multi-chart-container-wrapper")
			.forEach((el) => (el.style.overflow = val ? "visible" : ""));
	}

	/**
	 * Handles dialog resizing. Resizes child `cq-scroll` elements. Centers the dialog.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	resize() {
		const scrollers = this.querySelectorAll("cq-scroll");
		[...scrollers].forEach((scroller) => {
			if (scroller.resize) scroller.resize();
		});
		if (this.params && this.params.x) {
			this.stxContextMenu();
		} else {
			this.center();
		}
	}

	/**
	 * Show the dialog. Use X,Y *screen location* (pageX, pageY from an event) for where to display context menus. If the context menu cannot fit on the screen then it will be adjusted leftward and upward
	 * by enough pixels so that it shows.
	 * @param {object} [params] Parameters
	 * @param  {Boolean} [params.bypassOverlay=false] If true will not display the scrim overlay
	 * @param {Number} [params.x] X location of top left corner. Use for context menus, otherwise dialog will be centered.
	 * @param {Number} [params.y] Y location of top left corner. Use for context menus, otherwise dialog will be centered.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	show(params) {
		if (this.active) return;
		this.params = params;
		if (!params) params = this.params = {};
		const context = params.context || CIQ.UI.getMyContext(this);
		if (!this.uiManager.overlay && !params.bypassOverlay) {
			this.uiManager.overlay = document.createElement("cq-dialog-overlay");
			if (context) context.node.append(this.uiManager.overlay);
		}
		this.active = true;
		const timeoutFcn = () => {
			// to get the opacity transition effect
			if (this.uiManager.overlay && !params.bypassOverlay) {
				if (this.uiManager.overlay.getAttribute("cq-active") !== "true")
					this.uiManager.overlay.setAttribute("cq-active", "true");
			}
			this.activeAttributes["cq-active"] = true; // cq-active is what css uses to display the dialog
			for (let attribute in this.activeAttributes) {
				if (this.getAttribute(attribute) !== "true")
					this.setAttribute(attribute, "true");
			}
			this.resize();
		};
		setTimeout(timeoutFcn.bind(this));

		// Add the theme class to the dialog. It exists outside of the theme context so it will not inherit the theme.
		if (context && context.config && context.config.themes) {
			const themes = Object.keys(context.config.themes.builtInThemes);
			// First remove any existing theme classes on the dialog
			this.classList.remove(...themes);
			const activeTheme = themes.find(
				(r) => context.topNode.classList.contains(r) === true
			);
			// Add the active theme class to the dialog
			if (activeTheme) this.classList.add(activeTheme);
		}

		// Set this dialog as active for tab navigation
		const { keystrokeHub } = this.ownerDocument.body;
		if (keystrokeHub) keystrokeHub.addActiveModal(this);
	}

	/**
	 * Set context menu position to mouse location.
	 *
	 * @tsmember WebComponents.Dialog
	 */
	stxContextMenu() {
		let parent = this.parentElement;
		if (parent.tagName == "BODY") parent = window;
		const gSz = CIQ.guaranteedSize(parent);
		const w = gSz.width;
		const h = gSz.height;
		const outer = CIQ.elementDimensions(this, {
			padding: 1,
			border: 1
		});
		let cw = outer.width;
		let ch = outer.height;
		let left = this.params.x;
		let top = this.params.y;
		let saveAdjustedPosition = false;

		[...this.querySelectorAll("cq-menu.stxMenuActive")].forEach(
			(activeMenu) => {
				if (activeMenu.querySelector(".context-menu-right")) {
					const siblings = [...activeMenu.parentNode.children];
					const overlapItemCount =
						siblings.length - siblings.indexOf(activeMenu);

					const outerMenu = CIQ.elementDimensions(activeMenu, {
						padding: 1,
						border: 1
					});
					const outerContext = CIQ.elementDimensions(
						activeMenu.querySelector(".context-menu-right"),
						{ padding: 1, border: 1 }
					);
					cw += outer.width;
					ch += outerContext.height - outerMenu.height * overlapItemCount;
					saveAdjustedPosition = true;
				}
			}
		);

		const insideChartContext = this.closest("cq-context");
		const leftOffset = insideChartContext
			? this.params.context.topNode.getBoundingClientRect().left
			: 0;
		const topOffset = insideChartContext
			? this.params.context.topNode.getBoundingClientRect().top
			: 0;

		if (left - leftOffset + cw > w) left = leftOffset + (w - cw);
		if (top - topOffset + ch > h) top = topOffset + (h - ch);
		if (top < 0) top = 0;
		if (saveAdjustedPosition) {
			this.params.x = left;
			this.params.y = top;
		}

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
			"margin-top": "auto"
		});
	}

	/**
	 * Tap event handler for dialog.
	 * Prevents touch and mouse events from propagating outside of the dialog.
	 *
	 * @param {Event} e tap event
	 *
	 * @tsmember WebComponents.Dialog
	 */
	tap(e) {
		const topMenu = this.uiManager.topMenu();
		if (topMenu === this) {
			e.stopPropagation(); // prevent a tap inside the dialog from closing itself
			return;
		}
		if (!e.currentTarget.active) {
			e.stopPropagation(); // If the dialog we tapped on is closed, then we must have closed it manually. Don't allow a body tap otherwise we'll close two dialogs!
		}
	}
}

CIQ.UI.addComponentDefinition("cq-dialog", Dialog);

};


let __js_webcomponents_doubleSlider_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Double range slider web component `<cq-double-slider>`.
 *
 * A double slider has a thumb (slidable control) at each end of the slider track.
 *
 * This web component is an implementation of a low/high range slider. The left thumb sets the low
 * value of the slider; the right thumb, the high value.
 *
 * The value of the slider is an object specifying the high and low values. The component includes
 * a text readout of the values.
 *
 * **Attributes**
 * - min &mdash; Minimum value of the slider
 * - max &mdash; Maximum value of the slider
 * - low &mdash; Preset value for the left thumb
 * - high &mdash; Preset value for the right thumb
 * - step &mdash; The absolute amount (positive or negative) the movement of a thumb changes a
 *   slider setting
 *
 * See the example below.
 *
 * @namespace WebComponents.cq-double-slider
 * @since 8.3.0
 *
 * @example
 * <cq-item>
 *     Strike <cq-double-slider min="0" max="100" low="20" high="80" step="1"></cq-double-slider>
 * </cq-item>
 */
class DoubleSlider extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		this.init();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, DoubleSlider);
		this.constructor = DoubleSlider;
	}

	init() {
		this.addDefaultMarkup();
		this.textRange = this.querySelector(".ciq-double-slider-text");
		this.lowSlider = this.querySelector(
			".ciq-double-slider-range[range='low']"
		);
		this.highSlider = this.querySelector(
			".ciq-double-slider-range[range='high']"
		);
		this.backing = this.querySelector("cq-double-slider-range");
		this.name = this.getAttribute("name") || CIQ.uniqueID();
		["min", "max", "step", "low", "high"].forEach((prop) => {
			if (this.hasAttribute(prop)) this[prop] = Number(this.getAttribute(prop));
		});

		this.setBounds(this);
		const self = this;

		function slide(slider, event) {
			let value = slider.value;
			if (event) {
				const touch = event.touches[0];
				const boundingClientRect = self.highSlider.getBoundingClientRect();
				let { height, width } = getComputedStyle(self.highSlider);
				height = parseFloat(height);
				width = parseFloat(width);
				let ratio = 1;
				if (height > width) {
					const boundedOffset = Math.max(
						0,
						Math.min(height, touch.pageY - boundingClientRect.top)
					);
					ratio = boundedOffset / height;
				} else {
					const boundedOffset = Math.max(
						0,
						Math.min(width, touch.pageX - boundingClientRect.left)
					);
					ratio = boundedOffset / width;
				}
				value = self.min + ratio * (self.max - self.min);
			}
			// If we are performing an initial slide, figure out whether we are closer to high or to low
			if (!self.whichSlider) {
				self.whichSlider =
					value * 2 >
					(isNaN(self.high) ? self.max : self.high) +
						(isNaN(self.low) ? self.min : self.low) +
						1
						? self.highSlider
						: self.lowSlider;
			}
			if (self.whichSlider === self.lowSlider) {
				self.low = self.lowSlider.value = Math.min(
					typeof self.high === "undefined" ? self.max : self.high,
					value
				);
			} else if (self.whichSlider === self.highSlider) {
				self.high = self.highSlider.value = Math.max(
					typeof self.low === "undefined" ? self.min : self.low,
					value
				);
			}
			self.setValue(self);
		}

		[this.highSlider, this.lowSlider].forEach((slider) => {
			["mousedown", "pointerdown"].forEach((ev) => {
				slider.addEventListener(ev, (evt) => {
					self.whichSlider = null;
				});
			});
			slider.addEventListener("input", () => slide(slider));
			if (CIQ.touchDevice) {
				slider.addEventListener(
					"touchstart",
					(evt) => {
						self.whichSlider = null;
						self.engaged = true;
						slide(slider, evt);
					},
					{
						passive: false
					}
				);
				slider.addEventListener(
					"touchmove",
					(evt) => {
						if (self.engaged) slide(slider, evt);
					},
					{
						passive: false
					}
				);
				slider.addEventListener(
					"touchend",
					(evt) => {
						self.engaged = false;
					},
					{
						passive: false
					}
				);
			}
		});
	}

	/**
	 * Sets the min, max, and step of the slider.
	 *
	 * @param {object} bounds Contains min, max, and step values.
	 *
	 * @alias setBounds
	 * @memberof! WebComponents.cq-double-slider
	 * @since 8.3.0
	 */
	setBounds(bounds) {
		Array.from(this.querySelectorAll('input[type="range"]')).forEach((el) => {
			["min", "max", "step"].forEach((prop) => {
				if (bounds[prop] || bounds[prop] === 0) {
					el.setAttribute(prop, bounds[prop]);
					this[prop] = bounds[prop];
				}
			});
		});
		this.updateVisual();
	}

	/**
	 * Sets the high and low values of the slider.
	 *
	 * The high and low values are restricted to the range of the max and min.
	 *
	 * @param {object} [data] Contains high and low values.
	 *
	 * @alias setValue
	 * @memberof! WebComponents.cq-double-slider
	 * @since 8.3.0
	 */
	setValue(data) {
		const obj = {};
		if (data) {
			if (data.low !== undefined) {
				obj.low =
					this.min === undefined ? data.low : Math.max(this.min, data.low);
			}
			if (data.high !== undefined) {
				obj.high =
					this.max === undefined ? data.high : Math.min(this.max, data.high);
			}
		}
		if (!CIQ.equals(this.value, obj)) this.value = obj;
		this.low = obj.low;
		this.high = obj.high;
		this.updateVisual();
	}

	/**
	 * Updates the slider view based on the slider attributes.
	 *
	 * @alias updateVisual
	 * @memberof! WebComponents.cq-double-slider
	 * @since 8.3.0
	 */
	updateVisual() {
		this.setAttribute("min", this.min);
		this.setAttribute("max", this.max);
		this.setAttribute("low", this.low);
		this.setAttribute("high", this.high);
		this.setAttribute("step", this.step);

		const style = getComputedStyle(this.textRange);
		const inColor = style.color;
		const outColor = style.borderLeftColor;
		let low = this.low;
		if (isNaN(low) || low < this.min) low = this.min;
		let high = this.high;
		if (isNaN(high) || high > this.max) high = this.max;
		this.lowSlider.value = low;
		this.highSlider.value = high;

		// let input element do the rounding for us
		if (typeof low !== "undefined") low = Number(this.lowSlider.value);
		if (typeof high !== "undefined") high = Number(this.highSlider.value);

		const min = low - this.min;
		const max = high - this.min;
		this.textRange.innerHTML = low + "-" + high;
		const range = this.max - this.min;
		const stop = [(min / range) * 100, (max / range) * 100];
		this.backing.style.background = `linear-gradient(to right,
			${outColor} 0% ${stop[0]}%,
			${inColor} ${stop[0]}% ${stop[1]}%,
			${outColor} ${stop[1]}% 100%)`;
	}
}

DoubleSlider.markup = `
		<cq-double-slider-text class="ciq-double-slider-text"></cq-double-slider-text>
		<cq-double-slider-range class="ciq-double-slider-range"></cq-double-slider-range>
		<input type="range" class="ciq-double-slider-range" range="low">
		<input type="range" class="ciq-double-slider-range" range="high">
`;

CIQ.UI.addComponentDefinition("cq-double-slider", DoubleSlider);

};


let __js_webcomponents_drawingContext_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-drawing-context&gt;</h4>
 *
 * This component appears when a drawing is right-clicked.  A menu of actions are displayed relevant to that drawing.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an action is clicked from the displayed menu.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "editsettings", "edittext", "clone", remove", "layertop", "layerbottom", "layerup", "layerdown", or other custom action |
 * | action | "click" |
 * | item | _object on which the action occurs, usually a study descriptor_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.DrawingContext
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 6.2.0
 * - 9.1.0 Added emitter.
 */
class DrawingContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, DrawingContext);
		this.constructor = DrawingContext;
	}

	/**
	 * Open the context menu as a dialog.
	 *
	 * @param {Object} params
	 * @param {number} params.x used to position the dialog
	 * @param {number} params.y used to position the dialog
	 * @param {CIQ.Drawing} params.drawing sets the `drawing` instance property
	 * @param {CIQ.UI.Context} params.context passed to the components setContext method
	 * @since 6.2.0
	 *
	 * @tsmember WebComponents.DrawingContext
	 */
	open(params) {
		this.addDefaultMarkup();
		this.classList.add("ciq-context-menu");

		this.drawing = params.drawing;
		const textEdit = this.node.find("[cq-edit-text]");
		if (this.drawing.edit) {
			textEdit.show();
		} else {
			textEdit.hide();
		}
		return super.open(params);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {string} effect What action was performed as a result of the stxtap event.
	 *
	 * @tsmember WebComponents.DrawingContext
	 */
	postProcess(effect) {
		this.emitCustomEvent({
			effect,
			detail: { item: this.drawing }
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.DrawingContext
 */
DrawingContext.markup = `
		<div stxtap="DrawingEdit.text()" cq-edit-text>Edit Text</div>
		<div stxtap="DrawingEdit.edit()">Edit Settings</div>
		<div stxtap="DrawingEdit.clone()">Clone Drawing</div>
		<cq-menu stxtap="resize()" cq-close-top="cq-dialog[cq-drawing-context]">
			<cq-menu-dropdown cq-no-scroll="true" class="context-menu-right">
				<cq-item stxtap="DrawingEdit.reorderLayer('top')">Bring to Top</cq-item>
				<cq-item stxtap="DrawingEdit.reorderLayer('up')">Bring Forward</cq-item>
				<cq-item stxtap="DrawingEdit.reorderLayer('down')">Send Backward</cq-item>
				<cq-item stxtap="DrawingEdit.reorderLayer('bottom')">Send to Bottom</cq-item>
			</cq-menu-dropdown>
			<!-- element here so that <cq-menu-dropdown> can keep "top: auto;" -->
			<div>Layer Management<div class="context-button-right-arrow"></div></div>
		</cq-menu>
		<div stxtap="DrawingEdit.remove()">Delete Drawing</div>
	`;
CIQ.UI.addComponentDefinition("cq-drawing-context", DrawingContext);

};


let __js_webcomponents_dropdown_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-dropdown&gt;</h4>
 *
 * This component is a container of menu options which can be scrolled though and selected.  The component is typically revealed
 * after a cq-menu component is opened.  This component is usually nested within a `cq-menu` tag.
 * The items that are listed in the dropdown are specified in a configuration.  See example below.
 * To bind the component's configuration, set its `config` attribute to an object in the {@link CIQ.UI.Context}.config.menus object.
 *
 * This component automatically allows for scrolling through its elements, when the size of the list exceeds the dropdown's dimensions.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | maximize    | Set to true to have the dropdown extend in height to the height of the chart container even when there are not enough items in the dropdown to fill it. |
 * | noresize    | Set to true to prevent resizing of dropdown. Otherwise, sizing is based on number of elements in the dropdown. |
 * | config      | Key pointing to a component configuration entry which specifies the content items. |
 *
 * If no markup is specified in this component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
 * to be used.  In order to use the default markup, the selections in the menu must be configured in the context configuration file and specified
 * by key in the `config` attribute.  See example.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an item in the component is toggled, selected, or edited.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "toggle", "select", "edit" |
 * | action | "click" |
 * | menu | _menu element which owns this component_ |
 * | params | _properties set in configuration object for the item specified by the action_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Configuration**_
 *
 * Configuration is accomplished by setting up an object within the context configuration's menus object.  Each menu dropdown is assigned a unique name which is
 * itself an object property of the menus object.  This property name is used as the value of the `config` attribute of the owning menu component.
 * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
 * Each array element is an object which represents one item in the dropdown.  Let's call one of these array elements, `item`.
 * Each `item` has several properties which describe the nature of the dropdown item to display.  The following table of properties describes what they mean.
 *
 * | property    | description |
 * | :---------- | :---------- |
 * | type        | Describes what type of item to display.  Valid values are described in the table below. |
 * | label       | Text to display. |
 * | className   | Optional class name to apply to item. |
 * | active      | Set to true to manually set the active state on the item.  Note the active state is usually set with a bound value. |
 * | tap         | Name of helper function to execute when item is clicked. |
 * | setget      | Same as tap except used to bind values when `type` is `radio`, `switch`, or `checkbox`. |
 * | bind        | Name of helper function to execute when binding has changed.  This is not a common option. |
 * | options     | Name of helper function to execute when clicking the options icon, which only appears when this property is set. |
 * | iconCls     | Optional class name of an icon to display on the item. |
 * | value       | Array of arguments to pass to `tap`, `stxget`, or `bind` functions; or, name of component when `type="component"`. |
 * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
 * | attributes  | Object containing attributes for a `type="component"` item. |
 * | selector    | Used to specify the selector for `type="clickable"`. |
 * | method      | Used to specify the method for `type="clickable"`. |
 * | menuPersist | Normally menus close when selecting any item type besides `checkbox` or `switch`.  Setting this property to "true" will keep the menu from closing after selection. |
 * | filterFor   | A label to specify the element to filter.  The element to filter must also have its `filter-name` attribute set to this value.  If `filter-for` is omitted, will filter this element's next sibling. |
 * | filterMin   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
 * | helpId      | A key to the correct help text in CIQ.Help.Content. |
 *
 * Valid `type`s are described here:
 * | type      | description |
 * | :-------- | :---------- |
 * | item      | Standard text which when clicked will execute `tap` or `setget` action via a helper. |
 * | switch    | Same as item except value is bound and displayed with a slider switch. |
 * | checkbox  | Same as item except value is bound and displayed with a checkbox. |
 * | radio     | Same as item except value is bound and displayed with a radio. |
 * | clickable | Embeds a `cq-clickable` which executes an action, usually opening a dialog. |
 * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
 * | template  | Embeds markup specified with a `name` attribute equal to this component's `value` attribute. The markup to be embedded needs to be found in the document within a unique template which has the attribute `cq-dropdown-templates`. |
 * | component | Embeds a component specified by `value` with attributes specified by `attributes`.  |
 * | separator | Unclickable horizontal line, used to separate two menu sections. |
 *
 * @example <caption>Dropdown tag:</caption>
 * <cq-dropdown config="example"></cq-dropdown>
 * @example <caption>Sample configuration for the above dropdown tag:</caption>
 * stxx.uiContext.config.menus.example = {
 * 		content: [
 *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
 *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
 * 		]
 * };
 * @example <caption>Template example:</caption>
 * <!--
 * Given a configuration item as follows:
 * { type: "template", value: "my_template" }
 * -->
 * <template cq-dropdown-templates>
 * 		<div name="my_template">
 * 			<span>Custom Dropdown Item</span>
 * 		</div>
 * </template>
 *
 * @alias WebComponents.Dropdown
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 This new component supersedes `cq-menu-dropdown` component.
 */
class Dropdown extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["maximize", "noresize", "config"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.handlesBinding = true;
		super.connectedCallback();

		if (this.isShadowComponent && this.children.length) {
			const parent = document.createElement("div");
			this.root.appendChild(parent);
			while (this.children.length) {
				parent.appendChild(this.firstChild);
			}
		} else if (!this.children.length) {
			const ul = document.createElement("ul");
			this.root.appendChild(ul);
		}

		this.contentRoot =
			this.root.querySelector(".content") || this.root.firstChild;
		this.contentRoot.classList.add("content");
		this.contentRoot.setAttribute("role", "menu");

		this.contentRoot.addEventListener("scroll", (e) =>
			this.highlightItem(e.currentTarget.querySelector("[cq-focused]"))
		);

		this.addClaim(this);
		this.setupShadow();

		this.owningMenu = CIQ.climbUpDomTree(this, "cq-menu", true)[0];
		this.fireConfigChange();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Dropdown);
		this.constructor = Dropdown;
	}

	/**
	 * Sets up the binding for the dropdown item.
	 *
	 * @param {HTMLElement} elem Dropdown item to bind.
	 * @param {string} evtType Type of event to emit when the item is clicked.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	bind(elem, evtType) {
		if (!elem) return;
		if (elem.matches("[stxtap], [stxsetget], [stxbind]")) {
			CIQ.UI.BaseComponent.scheduleForBinding(elem, this);
		}
		const manualBinding = (e) => {
			if (Date.now() - elem.lastClick < 1000) return; // click following pointerup
			elem.lastClick = Date.now();
			if (elem.matches(".radio-item[stxtap]")) {
				this.contentRoot.querySelectorAll(".radio-item").forEach((sibling) => {
					if (sibling !== elem) {
						sibling.classList.remove("ciq-active");
						sibling.ariaChecked = "false";
					}
				});
				elem.classList.add("ciq-active");
				elem.ariaChecked = "true";
			}
			this.emitCustomEvent({
				effect: evtType,
				detail: {
					menu: this.owningMenu,
					params: elem.params
				}
			});
		};
		["mouseup", "touchend", "pointerup", "click"].forEach((evt) =>
			elem.addEventListener(evt, manualBinding)
		);
	}

	/**
	 * Remove keyboard navigation when item is clicked and its owning menu is hidden.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	disablekeyboardNavigation() {
		if (this.keyboardNavigation) {
			this.keyboardNavigation.setKeyControlElement();
		}
		// Remove focus from any selected menu item
		this.removeFocused(this.root.querySelectorAll("[cq-focused]"));
	}

	/**
	 * Forces config attribute to change, even if the value of the config attribute didn't change.
	 * This is useful if the underlying object representing the configuration did change.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	fireConfigChange() {
		this.handlePropertyChange("config", this.config, "");
		this.handlePropertyChange("config", "", this.getAttribute("config"));
	}

	/**
	 * @private
	 * @deprecated I cannot find the caller?
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	focused() {
		const focused = this.qsa("[cq-focused]", this, true);
		if (focused.length) return focused[0];
		return null;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		switch (name) {
			case "config":
				if (!this.attached) break;
				const helper = CIQ.UI.BaseComponent.getHelper(this, "MenuConfig");
				if (!helper || !helper[newValue]) break;
				Object.assign(this, helper[newValue]);
				this.config = newValue;
				this.populate();
				break;
			case "maximize":
			case "noresize":
				this[name] = newValue || newValue === "true";
				break;
			default:
				break;
		}

		if (this.attached) this.resize();
	}

	/**
	 * Handler for keyboard interaction.
	 * Arrow keys move around the dropdown, while `Space` or `Enter` will select.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	keyStroke(hub, key, e) {
		if (
			!this.keyboardNavigation &&
			!this.owningMenu.matches(".stxMenuActive")
		) {
			return;
		}

		if (!CIQ.trulyVisible(this.contentRoot)) return false;
		/*if (this.keyboardNavigationWait && !this.keyboardNavigation) {
			return;
		}*/

		const items = this.qsa(
			"[keyboard-selectable]:not(.item-hidden)",
			this.contentRoot,
			true
		);

		if (!items.length) return false;
		const focused = this.findFocused(items);

		const keyFn = (k) => {
			return (
				{
					" ": { fn: "click" },
					Spacebar: { fn: "click" },
					Enter: { fn: "click" },
					ArrowDown: { fn: "scroll" },
					ArrowUp: { fn: "scroll", rev: true },
					ArrowLeft: { fn: "select", rev: true },
					ArrowRight: { fn: "select" },
					Down: { fn: "scroll" },
					Up: { fn: "scroll", rev: true },
					Left: { fn: "select", rev: true },
					Right: { fn: "select" }
				}[k] || {}
			);
		};

		switch (keyFn(key).fn) {
			case "click":
				if (!focused.length) return;
				const childItemsSelected = focused[0].querySelectorAll(
					"[keyboard-selectable-child][cq-focused]"
				);
				if (childItemsSelected.length) this.clickItem(childItemsSelected[0], e);
				else this.clickItem(focused[0], e);
				break;
			case "scroll":
				const isRev = keyFn(key).rev;
				if (!this.focusNextItem(items, isRev) && isRev) {
					this.contentRoot.scrollTop = 0;
				}
				break;
			case "select":
				if (!focused.length) return;
				const childItems = focused[0].querySelectorAll(
					"[keyboard-selectable-child]"
				);
				if (childItems.length) {
					const isRev = keyFn(key).rev;
					const next = this.focusNextItem(childItems, isRev);
					if (isRev && !next) {
						// If the beginning of the child items has been reached select the parent item instead
						this.removeFocused(childItems);
						this.focusItem(focused[0]);
					}
				}
				break;
			default:
				return false;
		}
		return true;
	}

	/**
	 * Builds a dropdown item when the `type="component"`.  Called by {@link WebComponents.Dropdown#populate}.
	 *
	 * @param {string} name Component name.
	 * @param {object} [attributes] attribute settings for the component.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	makeComponent(name, attributes) {
		const stringifyAttributes = () => {
			if (!attributes || typeof attributes !== "object") return "";
			let acc = "";
			for (const key in attributes) {
				acc += ` ${key}`;
				if (attributes[key] != null) acc += `="${attributes[key]}"`;
			}
			return acc;
		};
		return `<${name}${stringifyAttributes()}></${name}>`;
	}

	/**
	 * If using keyboard navigation, return the highlight to the tab selected element.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	onKeyboardDeselection() {
		// If we're using keyboard navigation, return the highlight to the tab selected element
		if (this.keyboardNavigation) this.keyboardNavigation.highlightPosition();
	}

	/**
	 * Creates the dropdown items by parsing the configuration object and using the default markup to create each item.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	populate() {
		const contentArr = this.content;
		const templateContainer = this.ownerDocument.querySelector(
			"template[cq-dropdown-templates]"
		);
		if (Array.isArray(contentArr)) {
			while (this.contentRoot.firstChild) this.contentRoot.firstChild.remove();
			contentArr.forEach((item) => {
				const div = document.createElement("div");
				if (item.type === "template" && templateContainer) {
					const templates = CIQ.UI.makeFromTemplate(templateContainer);
					item.content = templates.find(`[name=${item.value}]`)[0].outerHTML;
				} else if (item.type === "component") {
					item.content = this.makeComponent(item.value, item.attributes);
					item.type = "template";
				}
				div.innerHTML = this.constructor.itemTemplate(item);
				const menuItem = div.children[0];
				if (item.options) {
					const ariaCheckedObserver = new MutationObserver((mutations) => {
						mutations.forEach((mutation) => {
							menuItem.querySelector("[role=menuitemradio]").ariaChecked =
								mutation.target.ariaChecked;
						});
					});
					ariaCheckedObserver.observe(menuItem, {
						attributeFilter: ["aria-checked"]
					});
				}
				this.contentRoot.appendChild(menuItem);
				if (
					!("menuPersist" in item) &&
					["separator", "heading", "switch"].includes(item.type)
				)
					item.menuPersist = true;
				menuItem.params = item;
				this.bind(menuItem, item.type === "switch" ? "toggle" : "select");
				this.bind(menuItem.querySelector(".options"), "edit");
			});
		}
	}

	/**
	 * Resizes a dropdown when the screen is resized, or even if the configuraton is reloaded to add or remove items.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	resize() {
		/*share.js appends this class to the body.
			Do not attempt unnecessary resize of scroll
			for a chart about to become a shared image.*/
		if (this.closest(".sharing")) return;
		if (this.noresize) return;

		const { contentRoot } = this;

		const { opacity, display } = this.style;
		Object.assign(this.style, { opacity: 0, display: "block" });
		const { top } = contentRoot.getBoundingClientRect();
		const { paddingTop, paddingBottom } = getComputedStyle(contentRoot);
		const padding = CIQ.stripPX(paddingTop) + CIQ.stripPX(paddingBottom);
		Object.assign(this.style, { opacity, display });
		// defaulted to 45 to take into account 15px of padding on menus and then an extra 5px for aesthetics
		const reduceMenuHeight = this.reduceMenuHeight || 45;
		let contextHeight, contextTop;
		/*if (context && context.topNode) {
			const contextRect = context.topNode.getBoundingClientRect();
			contextHeight = contextRect.height;
			contextTop = contextRect.top;
		} else {*/
		// Fallback to the window height if context element cannot be found
		contextHeight = window.innerHeight;
		contextTop = 0;
		//}
		if (!contextHeight) return;
		let height =
			contextHeight - (top - contextTop) - reduceMenuHeight - padding;

		const holders = CIQ.climbUpDomTree(
			contentRoot,
			".stx-holder,.stx-subholder,.chartContainer",
			true
		);
		if (holders.length) {
			holders.forEach((holder) => {
				const holderBottom =
					holder.getBoundingClientRect().top +
					CIQ.elementDimensions(holder).height;
				height = Math.min(height, holderBottom - top - 5); // inside a holder we ignore reduceMenuHeight, but take off 5 pixels just for aesthetics
			});
		}

		// If there are subsequent siblings that have a fixed height then make room for them
		/*const nextAll = contentRoot.nextAll();
		for (let i = 0; i < nextAll.length; i++) {
			const sibling = nextAll[i];
			if (sibling && !CIQ.trulyVisible(sibling)) continue; // skip hidden siblings
			height -= CIQ.elementDimensions(sibling, {
				border: 1,
				padding: 1,
				margin: 1
			}).height;
		}*/
		if (this.maximize) contentRoot.style.height = height + "px";
		contentRoot.style["max-height"] = height + "px";

		const scrollImpl = this.scrollImplementation();
		if (!this.noscroll && scrollImpl) {
			contentRoot.style.overflowY = "auto";
			scrollImpl.refresh(contentRoot);
		}
		this.dispatchEvent(
			new CustomEvent("refresh", { detail: { node: contentRoot } })
		);
	}

	/**
	 * Sets the active dropdown item to a certain location.  The dropdown will scroll if necessary.
	 *
	 * @param {HTMLElement} item Element to scroll to.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	scrollToElement(item) {
		const { contentRoot } = this;
		const { top: contentTop, bottom: contentBottom } =
			contentRoot.getBoundingClientRect();
		const { top, bottom } = item.getBoundingClientRect();
		if (top > contentTop && bottom < contentBottom) return;
		if (bottom >= contentBottom) {
			contentRoot.scrollTop = Math.max(
				bottom - contentBottom + contentRoot.scrollTop,
				0
			);
		} else {
			contentRoot.scrollTop = Math.max(
				top - contentTop + contentRoot.scrollTop,
				0
			);
		}
		this.resize();
	}

	/**
	 * Gets the scroll implementation set in the UI configuration.  This is used to scroll the dropdown, if found.
	 *
	 * @return The scrolling implementation
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	scrollImplementation() {
		const context =
			CIQ.UI.shadowComponents.get(this) || this.closest("cq-context");
		if (context && context.config) return context.config.scrollbarStyling;
		return CIQ.UI.scrollbarStyling;
	}

	/**
	 * Sets the focus on a specific item in the dropdown.
	 *
	 * @param {HTMLElement} selector Element to focus.
	 *
	 * @tsmember WebComponents.Dropdown
	 */
	setFocus(selector) {
		const element = this.qsa(selector, this.contentRoot, true)[0];
		if (element) element.focus();
	}
}

/**
 * Default markup generator for an item's innerHTML.  This function is called for each item in the dropdown.
 * Based on the parameters passed in, the appropriate markup is generated.
 * This function is called by {@link WebComponents.Dropdown#populate}.
 *
 * @param {Object} params
 * @param {String} params.type Type of item, e.g. `item`, `heading`, `switch`, etc.
 * @param {Boolean} [params.active] Active state of item (applied as `.ciq-active` class)
 * @param {String} [params.className] Class name of item
 * @param {String} [params.options] Helper function to execute when the options icon is clicked
 * @param {String} [params.feature] Name of add-on which when loaded, this item will become visible
 * @param {String} [params.helpId] Name associated with help for this item
 * @param {String} [params.iconCls] Class for the icon in the item
 * @param {String} [params.label] Text for the item
 * @param {String} [params.bind] Helper function for binding
 * @param {String} [params.tap] Helper function for tapping
 * @param {String} [params.setget] Helper function for tapping and binding
 * @param {String} [params.selector] For `clickable` type, target selector
 * @param {String} [params.method] For `clickable` type, target method name on the above selector
 * @param {Array|String} [params.value] Parameter(s) to pass to the `bind`, `tap`, or `setget` functions.
 * 					If these aren't supplied, value will be stored in a `data` attribute.
 * 					The value is always available in the `data-value` attribute.
 * @param {String} [params.content] For `template` type, the HTML corresponding to the template's name
 * @param {Number} [params.filterMin] For `heading` type, the minimum number of records to allow filtering
 * @param {String} [params.filterLabel] For `heading` type, the placeholder text that appears in the filter search input
 * @param {String} [params.filterFor] For `heading` type, the element to filter should have its `filter-name` attribute set to this parameter's value.
 *
 * @return {String} Markup for a single dropdown item.
 * @static
 *
 * @tsmember WebComponents.Dropdown
 */
Dropdown.itemTemplate = ({
	type,
	active,
	className,
	options,
	feature,
	helpId,
	iconCls,
	label,
	bind,
	tap,
	setget,
	selector,
	method,
	value,
	content,
	filterMin,
	filterLabel,
	filterFor
}) => {
	const classString = `${className ? `${className} ` : ""}${
		active ? "ciq-active " : ""
	}`;
	const params =
		value && value !== 0
			? Array.isArray(value)
				? value.map((i) => (typeof i === "string" ? `'${i}'` : i)).join()
				: `'${value}'`
			: "";
	const role = options
		? "group"
		: {
				separator: "separator",
				heading: "presentation",
				template: "group",
				clickable: "presentation",
				checkbox: "menuitemcheckbox",
				switch: "menuitemcheckbox",
				radio: "menuitemradio"
		  }[type] || "menuitem";
	const subrole =
		{
			checkbox: "menuitemcheckbox",
			switch: "menuitemcheckbox",
			radio: "menuitemradio"
		}[type] || "menuitem";
	const tabbable = !["separator", "heading", "template"].includes(type);

	return `
		<li class="${classString}${type}-item item" role="${role}"
			${tabbable ? `tabindex=0` : ""}
			${
				setget
					? `stxsetget="${setget}(${params})"`
					: tap
					? `stxtap="${tap}(${params})"`
					: bind
					? `stxbind="${bind}(${params})"`
					: params && !role.indexOf("menuitem")
					? `data='${JSON.stringify(value).replace(/'/g, "'")}'`
					: ""
			}
			${feature ? `feature="${feature}"` : ""}
			${type === "radio" ? `aria-checked="${active ? "true" : "false"}"` : ""}
			${options ? `aria-labelledby="label_${label.replace(/ /g, "")}"` : ""}
			${value && (setget || tap) ? `data-value="${value}"` : ""}
			${tabbable && type !== "clickable" ? "keyboard-selectable" : ""}
		>\
			${type === "separator" ? `<hr>` : ""}\
			${type === "template" ? `${content}` : ""}\
			${
				type === "clickable"
					? `<cq-clickable class="dropdown-clickable" keyboard-selectable selector="${selector}" method="${method}">`
					: ""
			}\
			${
				type === "heading"
					? `<h4><cq-heading class="dropdown"
						${filterMin ? `filter-min="${filterMin}"` : ""}
						${filterLabel ? `filter-label="${filterLabel}"` : ""}
						${filterFor ? `filter-for="${filterFor}"` : ""}
						${label ? `text="${label}"` : ""}
						></cq-heading></h4>`
					: label
					? `<div>
						${
							iconCls
								? `<span ciq-menu-icon class="icon ${iconCls} ciq-icon-${iconCls}"></span>`
								: ""
						}\
						<span id="label_${label.replace(/ /g, "")}" label
							${options ? `role="${subrole}"` : ""}
						>${label}</span>
						${
							helpId
								? `<em class="ciq-screen-reader help-instr">(Help available, press question mark key)</em>
								<cq-help help-id="${helpId}" aria-hidden="true"></cq-help>`
								: ""
						}\
						${
							options
								? `<span class="icon options ciq-edit" keyboard-selectable-child stxtap="${options}(${params})">
								<div class="ciq-screen-reader" role="button">Set ${label} Options</div>
								</span>`
								: ""
						}\
						<span class="ciq-${type}"><span></span></span>
				      </div>`
					: ""
			}\
			${type === "clickable" ? `</cq-clickable>` : ""}\
		</li>`;
};

CIQ.UI.addComponentDefinition("cq-dropdown", Dropdown);

};


let __js_webcomponents_fibSettingsDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-fib-settings-dialog&gt;</h4>
 *
 * Additional dialog for setting fibonacci tool settings, specifically what levels will be shown for the fibonacci drawings.
 *
 * A custom event will be emitted from the component when any of its fields are changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | type | _fibonacci drawing type_ |
 * | levels | _comma-delimited list of displayed levels_ |
 *
 * @alias WebComponents.FibSettingsDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 3.0.9
 * - 9.1.0 Added emitter.
 */
class FibSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, FibSettingsDialog);
		this.constructor = FibSettingsDialog;
	}

	/**
	 * Adds a custom fib level
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 * @since 5.2.0
	 */
	add() {
		let level = this.querySelector("[cq-custom-fibonacci-setting] input").value;
		if (!level) return;
		level = parseFloat(level) / 100;
		if (isNaN(level)) return;
		const defaultFibs =
			this.context.stx.currentVectorParameters.fibonacci.fibs || [];
		let fib, newFib;
		for (let index = 0; index < defaultFibs.length; index++) {
			fib = defaultFibs[index];
			if (fib.level > level) {
				newFib = CIQ.clone(fib);
				newFib.level = level;
				newFib.display = true;
				if (newFib.parameters) newFib.parameters.opacity = 0.25;
				defaultFibs.splice(index, 0, newFib);
				break;
			}
		}
		if (!newFib) {
			if (defaultFibs.length) fib = CIQ.clone(defaultFibs[0]);
			else
				fib = {
					color: "auto",
					parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
				};
			newFib = CIQ.clone(fib);
			newFib.level = level;
			newFib.display = true;
			defaultFibs.push(newFib);
		}
		this.open();
	}

	/**
	 * Fires a "change" event and closes the dialog.
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 * @since 6.2.0
	 */
	close() {
		if (this.opener) {
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});

			this.opener.dispatchEvent(event);
			const { currentVectorParameters } = this.context.stx;
			const { fibonacci, vectorType } = currentVectorParameters;
			fibonacci.fibsAlreadySet = true;
			this.emitCustomEvent({
				effect: "save",
				detail: {
					type: vectorType,
					levels: fibonacci.fibs
						.filter(
							(i) => i.display && (i.level >= 0 || vectorType != "fibarc")
						)
						.map((i) => i.level)
						.join()
				}
			});
		}

		super.close();
	}

	/**
	 * Opens the dialog.
	 *
	 * @param  {Object} params Parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);
		if (params) this.opener = params.caller;
		const vectorParameters = this.context.stx.currentVectorParameters;
		const { vectorType } = vectorParameters;

		const dialog = this.closest("cq-dialog");

		// clear the existing web components
		const parameters = this.querySelectorAll(
			"cq-fibonacci-settings > *:not(template)"
		);
		[...parameters].forEach((el) => el.remove());

		// fibonacci type
		if (vectorParameters.fibonacci && vectorType != "fibtimezone") {
			dialog.setTitle("Fibonacci Settings");
			const defaultFibs = vectorParameters.fibonacci.fibs || [];

			defaultFibs.forEach((fib) => {
				// no negative values for fibonacci arc
				if (vectorType === "fibarc" && fib.level < 0) return;

				const newParam = CIQ.UI.makeFromTemplate(
					this.querySelector("template"),
					this.querySelector("cq-fibonacci-settings")
				)[0];
				const convertPercent = fib.level * 100;
				newParam.querySelector(".ciq-heading").innerText =
					convertPercent.toFixed(1) + "%";
				const paramInput = newParam.querySelector("input");

				if (fib.display) {
					paramInput.checked = true;
				}

				this.setChangeEvent(paramInput, "fib", fib.level);
				newParam.querySelector(".stx-data").append(paramInput);
			});
		}
		// settings dialog default
		else {
			dialog.setTitle("Settings");
		}
		this.querySelector("[cq-custom-fibonacci-setting] input").value = "";
	}

	/**
	 * Sets up a handler to process changes to fields
	 * @param {HTMLElement} node    The input field
	 * @param {string} section The section that is being updated
	 * @param {string} name    The name of the field being updated
	 *
	 * @tsmember WebComponents.FibSettingsDialog
	 * @private
	 */
	setChangeEvent(node, section, item) {
		node.addEventListener("change", () => {
			const vectorParameters = this.context.stx.currentVectorParameters;
			const { vectorType } = vectorParameters;

			// fibonacci type
			if (vectorParameters.fibonacci && vectorType != "fibtimezone") {
				const defaultFibs = vectorParameters.fibonacci.fibs || [];
				if (node.type == "checkbox") {
					defaultFibs.forEach((fib) => {
						if (fib.level === item) {
							fib.display = node.checked ? true : false;
						}
					});
				}
			}
		});
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.FibSettingsDialog
 */
FibSettingsDialog.markup = `
		<cq-scroll cq-no-maximize>
			<cq-fibonacci-settings>
				<template cq-fibonacci-setting>
					<cq-fibonacci-setting>
						<div class="ciq-heading"></div>
						<div class="stx-data">
							<input type="checkbox">
						</div>
					</cq-fibonacci-setting>
				</template>
			</cq-fibonacci-settings>
			<div cq-custom-fibonacci-setting>
				<input class="ciq-heading" type="text">%
				<div class="ciq-btn stx-data" stxtap="add()">Add</div>
			</div>
		</cq-scroll>
		<div class="ciq-dialog-cntrls">
			<div class="ciq-btn" stxtap="close()">Done</div>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-fib-settings-dialog", FibSettingsDialog);

};


let __js_webcomponents_floatingWindow_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-floating-window&gt;</h4>
 *
 * This component manages a "floating window" containing content.
 * A floating window can be moved around the screen within the boundaries of the context container.
 * It can also be resized on each edge and corner.  Finally, it can be collapsed and expanded via its title bar.
 *
 * Note that the actually window contents are not found within the DOM of this component; rather, this component has a
 * "windowImplementation" which points to the actual DOM element containing the window.
 * The implementation is of the class {@link WebComponents.FloatingWindow.DocWindow}.
 *
 * @alias WebComponents.FloatingWindow
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 8.2.0
 * - 9.1.0 Observes attributes. Added emitter.
 */
class FloatingWindow extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, FloatingWindow);
		this.constructor = FloatingWindow;
	}

	/**
	 * Initializes the context of the floating window component. Dynamically adds a listener for
	 * the "floatingWindow" event based on the `type` parameter of the event (see
	 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.FloatingWindow
	 * @since 8.2.0
	 */
	setContext(context) {
		const { stx } = context;
		if (!stx.callbackListeners.floatingWindow) {
			stx.callbackListeners.floatingWindow = [];
		}

		stx.addEventListener("floatingWindow", (message) => {
			const exec = this["on" + CIQ.capitalize(message.type)];
			if (exec) {
				exec.call(this, message);
				return true;
			}
		});
	}

	/**
	 * The listener for "floatingWindow" events where the `type` parameter of the event is
	 * "shortcut" (see
	 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
	 *
	 * Creates and positions a floating window for keyboard shortcuts.  This is a scrollable, informational window.
	 *
	 * @param {object} params Listener parameters.
	 * @param {string} params.content The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the element (see
	 * 		{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}). Defaults to
	 * 		`document.body`.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {number} [params.width] The width of the floating window in pixels.
	 * @param {boolean} [params.status] The state of the floating window: true, to open the
	 * 		window; false, to close it. If the parameter is not provided, the floating window is
	 * 		toggled (opened if closed, closed if open).
	 * @param {string} [params.tag] A label that identifies the floating window type; for example,
	 * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
	 * 		legend. See the `tag` parameter of
	 * 		[floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}.
	 * @param {function} [params.onClose] A callback to execute when the floating window is
	 * 		closed.
	 *
	 * @tsmember WebComponents.FloatingWindow
	 * @since 8.2.0
	 */
	onShortcut({ container, title, tag, content, width, status, onClose }) {
		if (this.shortcutWindow) {
			this.shortcutWindow.toggle(status).ensureVisible();
			return;
		}
		this.shortcutWindow = this.constructor.windowImplementation.get({
			tag,
			content: content,
			title,
			container: container || document.body,
			onClose
		});

		this.shortcutWindow.titleBarEl.setAttribute(
			"title",
			"Keyboard Shortcut Guide. " +
				this.shortcutWindow.titleBarEl.getAttribute("title")
		);

		this.shortcutWindow.toggle(true).update({ width }).positionRelativeTo();
	}

	/**
	 * The listener for "floatingWindow" events where the `type` parameter of the event is
	 * "documentation" (see
	 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
	 *
	 * Creates and positions a floating window for feature help documentation.  There is a buton in the window to activate the feature.
	 *
	 * @param {object} params Listener parameters.
	 * @param {string} params.content The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the element (see
	 * 		{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}). Defaults to
	 * 		`document.body`.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {number} [params.width] The width of the floating window in pixels.
	 * @param {HTMLElement} [params.targetElement] Element to set focus on when window is closed.
	 * @param {object[]} [params.actionButtons] Properties of the buttons which enable the feature.
	 * @param {string} [params.actionButtons.label] Text for the button.
	 * @param {string|function} [params.actionButtons.action] What happens when button is pressed.
	 *        If "close", will close the window; if a function, will call that function.
	 * @param {string} [params.tag] A label that identifies the floating window type; for example,
	 * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
	 * 		legend. See the `tag` parameter of
	 * 		[floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}.
	 * @param {function} [params.onClose] A callback to execute when the floating window is
	 * 		closed.
	 *
	 * @tsmember WebComponents.FloatingWindow
	 * @since 8.2.0
	 */
	onDocumentation({
		container,
		title,
		tag,
		content,
		targetElement,
		actionButtons,
		width,
		onClose
	}) {
		function processButtonAction(action, documentationWindow) {
			return () => {
				if (action === "close") {
					documentationWindow.toggle(false);
				} else if (typeof action === "function") {
					action();
				}
			};
		}

		this.documentationWindow = this.constructor.windowImplementation.get({
			tag,
			content: content + "<br>",
			title,
			container: container || document.body,
			onClose
		});

		this.documentationWindow.targetElement = targetElement;

		const actionButtonContainer = document.createElement("div");
		actionButtonContainer.classList.add("ciq-window-actions");
		this.documentationWindow.bodyEl.appendChild(actionButtonContainer);

		// Add action buttons
		for (let buttonData of actionButtons) {
			const actionButton = document.createElement("button");
			actionButton.innerText = buttonData.label;
			actionButton.style.marginTop = "1em";
			actionButton.style.marginRight = "1em";
			actionButton.classList.add("ciq-btn");
			CIQ.safeClickTouch(
				actionButton,
				processButtonAction(buttonData.action, this.documentationWindow)
			);
			actionButtonContainer.appendChild(actionButton);
		}

		if (this.context.stx.translateUI)
			this.context.stx.translateUI(this.documentationWindow.w);

		this.documentationWindow.titleBarEl.setAttribute(
			"title",
			"Help window. " +
				this.documentationWindow.titleBarEl.getAttribute("title")
		);

		this.documentationWindow
			.toggle(true)
			.update({ width })
			.positionRelativeTo();
	}
}

/**
 * The window implementation of the [cq-floating-window]{@link WebComponents.FloatingWindow}
 * web component.
 *
 * @alias WebComponents.FloatingWindow.DocWindow
 * @class
 * @protected
 * @since 8.2.0
 */
class DocWindow {
	/**
	 * Creates the floating window DOM element and binds event handlers to the window.
	 *
	 * @param {object} params Constructor parameters.
	 * @param {string} params.content The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the container element.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {string} [params.tag] A label that identifies the floating window type; for example,
	 * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
	 * 		legend.
	 * @param {number} [params.minWidth] The minimum width of the floating window.
	 * @param {number} [params.minHeight] The minimum height of the floating window.
	 * @param {function} [params.onClose] A callback function to execute when the floating window
	 * 		closes.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @private
	 * @since 8.2.0
	 */
	constructor({
		content,
		title,
		tag,
		minWidth,
		minHeight,
		container,
		onClose
	}) {
		const w = document.createElement("div");
		w.innerHTML = this.constructor.markup;
		w.classList.add("ciq-window");
		(container.ownerDocument || document).body.append(w);
		w.tag = tag;
		w.docWindow = this;
		Object.assign(this, {
			isDragging: false,
			isResizing: false,
			isOpen: false,
			xDiff: 0,
			yDiff: 0,
			x: 50,
			y: 50,
			w
		});
		this.bindEvents();

		const closestContextContainer = CIQ.UI.closestContextContainer(container);
		if (closestContextContainer && closestContextContainer.currentTheme) {
			w.classList.add(closestContextContainer.currentTheme);
			const { stx } = closestContextContainer.CIQ.UI.context;
			stx.addEventListener("theme", () => {
				w.className = `ciq-window ${closestContextContainer.currentTheme}`;
			});
		}

		this.titleEl = w.querySelector(".ciq-window-title");
		this.bodyEl = w.querySelector(".ciq-window-body");
		this.titleBarEl = w.querySelector(".ciq-window-bar");

		this.setProps({ title, content, minWidth, minHeight, container, onClose });
		this.render();
	}

	/**
	 * Stores the function parameters as properties of the floating window object.
	 *
	 * @param {object} params Parameters to store as properties.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {string} [params.content] The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the container element (see
	 * 		[positionRelativeTo]{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}).
	 * @param {number} [params.minWidth] The minimum width of the floating window.
	 * @param {number} [params.minHeight] The minimum height of the floating window.
	 * @param {function} [params.onClose] A callback function to execute when the floating windows
	 * 		closes.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	setProps({ title, content, minWidth, minHeight, container, onClose }) {
		const { w, titleEl, bodyEl } = this;
		titleEl.removeAttribute("cq-translate-original");
		bodyEl.removeAttribute("cq-translate-original");
		if (title !== undefined) titleEl.textContent = title;
		if (content !== undefined) bodyEl.innerHTML = content;
		if (minWidth !== undefined) w.style.minWidth = minWidth + "px";
		if (minHeight !== undefined) w.style.minHeight = minHeight + "px";
		if (container) this.container = container;
		if (onClose !== undefined) this.onClose = onClose;
	}

	/**
	 * Adds event listeners to the floating window.
	 *
	 * The listeners enable the window to be moved, resized, collapsed/expanded, and closed.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	bindEvents() {
		const { w } = this;
		const qs = (path) => w.querySelector(path);

		qs(".ciq-window-bar").addEventListener(
			"mousedown",
			this.onStartDrag.bind(this)
		);

		const toggleCollapse = this.toggleCollapse.bind(this);
		qs(".ciq-window-bar").addEventListener("dblclick", toggleCollapse);
		qs(".ciq-window-collapse").addEventListener("click", toggleCollapse);

		const resizeControls = (
			"top, right, bottom, left, " +
			"top-right, bottom-right, bottom-left, top-left"
		).split(/, /);
		resizeControls.forEach((control) => {
			qs(`.ciq-window-resize-${control}`).addEventListener(
				"mousedown",
				startResize(this)
			);
		});
		w.ownerDocument.addEventListener("mousemove", this.onMouseMove.bind(this));
		w.ownerDocument.addEventListener("mouseup", this.onMouseUp.bind(this));

		qs(".ciq-window-close").addEventListener(
			"click",
			this.toggle.bind(this, false)
		);

		w.ownerDocument.defaultView.addEventListener(
			"resize",
			this.ensureVisible.bind(this)
		);

		function startResize(self) {
			return (e) => {
				if (e.button !== 0) return;
				CIQ.extend(self, {
					isResizing: e.target.className.replace(/ciq-window-resize-/, ""),
					downX: e.pageX,
					downY: e.pageY,
					startWidth: self.width,
					startHeight: self.height,
					startLeft: self.x,
					startTop: self.y
				});
			};
		}
	}

	/**
	 * Updates properties of the floating window.
	 *
	 * @param {object} params Floating window properties.
	 * @param {number} [params.x] The horizontal position of the floating window in pixels.
	 * @param {number} [params.y] The vertical position of the floating window in pixels.
	 * @param {number} [params.width] The width of the floating window in pixels.
	 * @param {number} [params.height] The height of the floating window in pixels.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	update({ x, y, width, height }) {
		Object.assign(this, { x, y, width, height });
		this.render();
		return this;
	}

	/**
	 * Positions the floating window relative to the
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect" target="_blank">
	 * DOMRect</a> of a DOM element.
	 *
	 * @param {object} params Positioning parameters.
	 * @param {HTMLElement} [params.container] The DOM element relative to which the floating
	 * 		window is positioned. Defaults to the `container` parameter of the
	 * 		[floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener} or,
	 * 		if the `container` parameter is not available, `document.body`.
	 * @param {string} [params.location="center"] The location of the floating window within the
	 * 		container element's bounding rectangle. If the value is "center" (the default), the
	 * 		floating window is centered horizontally and vertically within the container
	 * 		rectangle. Otherwise, the window is positioned in the upper left corner of the
	 * 		rectangle.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	positionRelativeTo({ container, location = "center" } = {}) {
		const { x, y, width, height } = (
			container ||
			this.container ||
			document.body
		).getBoundingClientRect();

		const scrollTop = this.w.ownerDocument.documentElement.scrollTop;
		const scrollLeft = this.w.ownerDocument.documentElement.scrollLeft;

		if (this.width > width - 20) this.width = width - 20;
		if (this.height > height - 20) this.height = height - 20;

		if (location === "center") {
			this.x = scrollLeft + (x + width / 2 - this.width / 2);
			this.y = scrollTop + (y + height / 2 - this.height / 2);
		}

		this.render();
		return this;
	}

	/**
	 * Repositions the floating window (if necessary) when the display is resized to keep the
	 * window within the document view.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	ensureVisible() {
		if (!this.isOpen) return;
		const { x, y, width } = this.w.getBoundingClientRect();
		const { innerWidth, innerHeight } = this.w.ownerDocument.defaultView;

		if (y > innerHeight - 20) {
			this.y = innerHeight - 20;
		}
		if (x > innerWidth - width) {
			this.x = innerWidth - width;
		}
		this.render();
	}

	/**
	 * Renders the position updates and open/close, dragging, and resizing state changes made to
	 * the floating window by other methods of this class.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @private
	 * @since 8.2.0
	 */
	render() {
		const { x, y } = this;
		Object.assign(this.w.style, {
			display: this.isOpen ? "" : "none",
			transform: "translate(" + x + "px, " + y + "px)"
		});
		this.w.classList.toggle(
			"ciq-wdragging",
			this.isDragging || this.isResizing
		);
	}

	get width() {
		return this.w.offsetWidth;
	}
	set width(value) {
		if (value) {
			this.w.style.width = value + "px";
		}
	}

	get height() {
		return this.w.offsetHeight;
	}
	set height(value) {
		if (value) {
			this.w.style.height = value + "px";
		}
	}

	/**
	 * Helper function that constrains the floating window to the document view when the window
	 * is dragged horizontally.
	 *
	 * Clamps the horizontal position of the floating window between 0 (so the window cannot be
	 * dragged off the left side of the view) and the width of the document view minus the width
	 * of the floating window (so the window cannot be dragged off the right side of the view).
	 *
	 * @param {number} value The position of the mouse relative to the left edge of the floating
	 * 		window.
	 * @return {number} The value for the clamped horizontal position of the floating window:
	 * - `value` if `value` is greater than 0 and less than the width of the document view minus
	 * the width of the floating window
	 * - 0 if `value` is less than 0
	 * - The width of the document view minus the width of the floating window if `value` is
	 * greater than the width of the document view minus the width of the floating window
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	clampX(value) {
		return Math.min(
			Math.max(value, 0),
			this.w.ownerDocument.defaultView.innerWidth - this.w.offsetWidth
		);
	}

	/**
	 * Helper function that constrains the floating window to the document view when the window
	 * is dragged vertically.
	 *
	 * Clamps the vertical position of the floating window between 0 (so the window cannot be
	 * dragged off the top of the view) and the height of the document view minus the height of
	 * the floating window title bar and a margin (so the window title bar cannot be dragged off
	 * the bottom of the view).
	 *
	 * @param {number} n The position of the mouse relative to the top edge of the floating window.
	 * @return {number} The value for the clamped vertical position of the floating window:
	 * - `n` if `n` is greater than 0 and less than the height of the document view minus the
	 * height of the floating window title bar and margin
	 * - 0 if `n` is less than 0
	 * - The height of the document view minus the height of the floating window title bar and
	 * margin if `n` is greater than the height of the document view minus the height of the
	 * floating window title bar and margin
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	clampY(n) {
		const margin = 8;
		return Math.min(
			Math.max(n, 0),
			this.w.ownerDocument.defaultView.innerHeight -
				this.titleBarEl.offsetHeight -
				margin
		);
	}

	/**
	 * The event listener for mouse move events that occur when a floating window is being dragged
	 * or resized.
	 *
	 * Moves or resizes the floating window.
	 *
	 * @param {MouseEvent} e The
	 * 		<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">
	 * 		mouse event</a> object.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	onMouseMove(e) {
		const { isDragging, isResizing } = this;

		if (!isDragging && !isResizing) return;

		const xDiff = e.pageX - this.downX;
		const yDiff = e.pageY - this.downY;

		if (isDragging) {
			this.x = this.clampX(xDiff);
			this.y = this.clampY(yDiff);
		}
		const { startWidth, startHeight } = this;
		const margin = 2;
		let height, width;

		if (/left/.test(isResizing)) {
			width = this.startWidth - xDiff;
			this.width = width;
			this.x = this.startLeft + xDiff;
		}

		if (/top/.test(isResizing)) {
			height = this.startHeight - yDiff;
			this.height = height;
			this.y = this.startTop + yDiff;
		}

		if (isResizing && /right|bottom/.test(isResizing)) {
			this.width = /right/.test(isResizing)
				? xDiff + startWidth
				: width || startWidth;

			this.height = /bottom/.test(isResizing)
				? yDiff + startHeight
				: height || startHeight;

			const win = this.w.ownerDocument.defaultView;
			if (this.x + this.width - margin > win.innerWidth) {
				this.width = win.innerWidth - this.x - margin;
			}
			if (this.y + this.height - margin > win.innerHeight) {
				this.height = win.innerHeight - this.y - margin;
			}
		}

		this.render();
	}

	/**
	 * The event listener for mouse down events that occur on the floating window's title bar.
	 *
	 * The mouse down event starts a click-and-drag action on the floating window.
	 *
	 * @param {MouseEvent} e The
	 * 		<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">
	 * 		mouse event</a> object.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	onStartDrag(e) {
		if (e.button !== 0) return;

		this.isDragging = true;
		this.downX = e.pageX - this.x;
		this.downY = e.pageY - this.y;
	}

	/**
	 * The event listener for mouse up events that occur on a floating window.
	 *
	 * Stops a dragging or resizing action of the floating window.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	onMouseUp() {
		this.isDragging = false;
		this.isResizing = false;
		this.render();
	}

	/**
	 * Opens and closes the floating window.
	 *
	 * @param {boolean} [value] If true, the floating window is opened. If false, the
	 * 		floating window is closed. If undefined, the floating window is toggled; that is,
	 * 		opened if it is currently closed, closed if it is currently open.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	toggle(value) {
		const newValue = value === undefined ? !this.isOpen : value;
		const changed = this.isOpen !== newValue;
		this.isOpen = newValue;
		if (this.isOpen) {
			this.w.setAttribute("aria-labelledby", "floating-window-title");
			this.w.setAttribute("aria-hidden", "false");
			this.w.setAttribute("role", "alertdialog");
			setTimeout(() => {
				this.w.tabIndex = -1;
				this.w.focus();
			}, 10);
		} else {
			this.w.removeAttribute("role");
			this.w.setAttribute("aria-hidden", "true");
			if (this.targetElement) {
				setTimeout(() => {
					this.targetElement.tabIndex = -1;
					this.targetElement.focus();
				}, 10);
			}
		}
		if (changed && !this.isOpen && this.onClose) {
			this.onClose();
			if (this.isCollapsed) this.toggleCollapse(); // reset to open for next time
		}
		this.render();
		return this;
	}

	/**
	 * Toggles the display state &mdash; expanded or collapsed &mdash; of the floating window.
	 *
	 * In the expanded state, the full floating window is displayed; in the collapsed state, only
	 * the floating window title bar appears.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	toggleCollapse() {
		this.isCollapsed = !this.isCollapsed;
		if (this.isCollapsed) {
			this.prevHeight = this.height;
			this.w.classList.add("ciq-window-collapsed");
			this.height = this.titleBarEl.offsetHeight;
			if (this.onCollapse) this.onCollapse();
		} else {
			this.height = this.prevHeight;
			this.w.classList.remove("ciq-window-collapsed");
		}
		const collapseEl = this.w.querySelector(".ciq-window-collapse");
		collapseEl.title = this.isCollapsed ? "Expand" : "Collapse";
		this.render();
	}
}

/**
 * Default markup for the component's innerHTML.
 *
 * @tsmember WebComponents.FloatingWindow.DocWindow
 * @static
 * @type {string}
 * @since 8.2.0
 */
DocWindow.markup = `
	<div class="ciq-window-bar" title="Drag to reposition, double click to collapse.">
		<div><h3 id="floating-window-title" class="ciq-window-title"></h3></div>
		<span class="ciq-window-collapse" title="Collapse" aria-hidden="true"></span>
		<span class="ciq-window-close" title="Click to close" role="button"></span>
	</div>
	<div class="ciq-window-body"></div>
	<div class="ciq-window-resize-left"></div>
	<div class="ciq-window-resize-top"></div>
	<div class="ciq-window-resize-right"></div>
	<div class="ciq-window-resize-bottom"></div>
	<div class="ciq-window-resize-bottom-right"></div>
	<div class="ciq-window-resize-bottom-left"></div>
	<div class="ciq-window-resize-top-left"></div>
	<div class="ciq-window-resize-top-right"></div>
`;

/**
 * Gets a floating window instance.
 *
 * If the `tag` parameter is provided, the function checks whether the document already contains
 * a floating window with that tag. If so, the function parameters are stored as properties of the
 * floating window object (see
 * [setProps]{@link WebComponents.FloatingWindow.DocWindow#setProps}), and a reference to the
 * floating window is returned. Otherwise, the function returns a new floating window created with
 * the provided parameters.
 *
 * **Note:** Tags can be used to manage floating windows in multi-chart documents. For more
 * information, see the `tag` parameter of
 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}.
 *
 * @param {object} params Floating window parameters.
 * @param {string} params.content The contents of the floating window, typically an HTML string.
 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
 * 		window. The floating window is positioned on screen relative to the container element (see
 * 		[positionRelativeTo]{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}).
 * @param {string} [params.title] Text that appears in the title bar of the floating window.
 * @param {string} [params.tag] A label that identifies the floating window type; for example,
 * 		"shortcut", which indicates that the floating window contains the chart keyboard shortcuts
 * 		legend.
 * @param {number} [params.minWidth] The minimum width of the floating window.
 * @param {number} [params.minHeight] The minimum height of the floating window.
 * @param {function} [params.onClose] A callback function to execute when the floating window
 * 		closes.
 * @return {object} A [DocWindow]{@link WebComponents.FloatingWindow.DocWindow} instance.
 *
 * @tsmember WebComponents.FloatingWindow.DocWindow
 * @static
 * @since 8.2.0
 */
DocWindow.get = function (params) {
	let w;
	if (params.tag) {
		w = Array.from(
			(params.container.ownerDocument || document).querySelectorAll(
				".ciq-window"
			)
		).find((el) => el.tag === params.tag);
		if (w) {
			w.docWindow.setProps(params);
			return w.docWindow;
		}
	}
	return new this(params);
};

/**
 * A reference to the class that implements the floating window.
 *
 * @default [DocWindow]{@link WebComponents.FloatingWindow.DocWindow}
 * @type {WebComponents.FloatingWindow.DocWindow}
 * @since 8.2.0
 *
 * @tsmember WebComponents.FloatingWindow
 */
FloatingWindow.windowImplementation = DocWindow;

CIQ.UI.addComponentDefinition("cq-floating-window", FloatingWindow);

};


let __js_webcomponents_gridSizePicker_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-grid-size-picker&gt;</h4>
 *
 * Creates a `<cq-grid-size-picker>` web component.
 *
 * This component supports the following attributes:
 * | attribute | description |
 * | :-------- | :---------- |
 * | maxrows   | Maximum number of rows allowed |
 * | maxcols   | Maximum number of columns allowed |
 * | resize    | Set to fixed will always have picker table at fixed max size |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a template or new size is picked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter  | this component |
 * | cause    | "useraction" |
 * | effect   | "update-grid" |
 * | action   | "click" |
 * | columns  | number of columns |
 * | rows     | number of rows |
 * | template | selected template |
 *
 * @example
 *		<cq-grid-size-picker maxrows="5" maxcols="5"></cq-grid-size-picker>
 *
 * @alias WebComponents.GridSizePicker
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since 7.2.0
 * @since 9.3.0 Added new emitter
 */
class GridSizePicker extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		this.innerHTML = this.render();
		this.columns = 2;
		this.rows = 2;
		this.generateTable(this.columns, this.rows);
		this.highlightTable(this.columns - 1, this.rows - 1);
		this.querySelector("table").addEventListener("mouseleave", () => {
			this.generateTable(this.columns + 1, this.rows + 1);
			this.highlightTable(this.columns, this.rows);
		});

		const { srMapping = {} } = this.constructor;

		const createGridLayoutButton = (layoutClass) => {
			let elem = document.createElement("li");
			elem.className = "ciq-multi-chart-button " + layoutClass;
			const srContent = srMapping[layoutClass] || "Custom Template";
			if (srContent) elem.setAttribute("aria-label", srContent);
			elem.setAttribute("role", "menuitem");
			CIQ.safeClickTouch(
				elem,
				function (event) {
					this.triggerUpdateGridEvent({
						template: layoutClass
					});
				}.bind(this)
			);
			return elem;
		};

		if (this.templates) {
			const layoutPicker = this.querySelector(".ciq-grid-layout-picker");
			this.templates.split(" ").forEach((template) => {
				layoutPicker.appendChild(createGridLayoutButton(template));
			});
			// Add empty div elements to fill in the layout icon.
			layoutPicker.childNodes.forEach((elem) => {
				const elemStyles = getComputedStyle(elem);
				let cellCt = 0;
				if (
					elemStyles.gridTemplateAreas &&
					elemStyles.gridTemplateAreas != "none"
				) {
					let uniqueTemplateAreas = [
						...new Set(elemStyles.gridTemplateAreas.match(/([a-z])+/gi))
					];
					cellCt = uniqueTemplateAreas.length;
				} else if (elemStyles.getPropertyValue("--grid-dimension")) {
					cellCt =
						parseInt(elemStyles.getPropertyValue("--grid-dimension")) || 0;
					// It will always have an extra chart initially, spanning the full width
					cellCt++;
				}

				for (let idx = 0; idx < cellCt; idx++) {
					elem.innerHTML += "<div></div>";
				}
			});
		}

		this.setAttribute("role", "menu");
		this.setAttribute("aria-label", "Multichart grid selector");
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, GridSizePicker);
		this.constructor = GridSizePicker;
	}

	get maxcols() {
		return this.getAttribute("maxcols") || 4;
	}

	set maxcols(newValue) {
		this.setAttribute("maxcols", newValue);
	}

	get maxrows() {
		return this.getAttribute("maxrows") || 4;
	}

	set maxrows(newValue) {
		this.setAttribute("maxrows", newValue);
	}

	get templates() {
		return this.getAttribute("templates") || "";
	}

	set templates(newValue) {
		this.setAttribute("templates", newValue);
	}

	get resize() {
		return this.getAttribute("resize") || "";
	}

	set resize(newValue) {
		this.setAttribute("resize", newValue);
	}

	/**
	 * Generates grid size picker table
	 *
	 * @param {number} columns Table column count
	 * @param {number} rows Table row count
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	generateTable(columns, rows) {
		const self = this;
		if (this.resize == "fixed") {
			columns = this.maxcols;
			rows = this.maxrows;
		}
		function mouseEnterFcn(event) {
			const { column, row } = event.target.dataset;
			// Clamp the rows and cols to their max setting before generating the new table
			let newColCt = parseInt(column) + 1;
			if (newColCt > self.maxcols) newColCt = self.maxcols;
			let newRowCt = parseInt(row) + 1;
			if (newRowCt > self.maxrows) newRowCt = self.maxrows;

			if (this.resize != "fixed") self.generateTable(newColCt, newRowCt);
			// Hilite based on the selected cell, not the expected grid size
			self.highlightTable(parseInt(column), parseInt(row));
		}

		let parentElem = this.querySelector("table");

		if (!parentElem) return;
		// Clear out the existing table
		this.cleanTable(columns, rows);

		columns = columns || 1;
		rows = rows || 1;

		for (let idx = 1; idx <= Math.min(rows, this.maxrows); idx++) {
			let tmpRow;
			if (parentElem.childNodes[idx - 1]) {
				tmpRow = parentElem.childNodes[idx - 1];
			} else {
				tmpRow = document.createElement("tr");
				parentElem.appendChild(tmpRow);
			}
			for (let jdx = 1; jdx <= Math.min(columns, this.maxcols); jdx++) {
				if (!tmpRow.childNodes[jdx - 1]) {
					let tmpCell = document.createElement("td");
					tmpCell.dataset.row = idx;
					tmpCell.dataset.column = jdx;
					tmpCell.dataset.rows = rows;
					tmpCell.dataset.columns = columns;
					tmpCell.addEventListener("mouseenter", mouseEnterFcn);
					tmpCell.setAttribute(
						"aria-label",
						`${idx} row${idx - 1 ? "s" : ""} ${jdx} column${jdx - 1 ? "s" : ""}`
					);
					tmpCell.setAttribute("role", "menuitem");
					tmpCell.addEventListener(
						"click",
						function (event) {
							this.triggerUpdateGridEvent({
								columns: event.target.dataset.column,
								rows: event.target.dataset.row
							});
						}.bind(this)
					);

					tmpCell.appendChild(document.createElement("div"));

					tmpRow.appendChild(tmpCell);
				}
			}
		}
	}

	/**
	 * Triggers grid upgrade event.
	 *
	 * @param {object} params Event parameters
	 * @param {string|number} params.columns Grid columns
	 * @param {string|number} params.rows Grid columns
	 * @param {string|number} params.template Grid template
	 *
	 * @private
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	triggerUpdateGridEvent({ columns, rows, template }) {
		this.columns = +columns;
		this.rows = +rows;
		this.template = template || "";
		this.highlightTable(this.columns, this.rows);
		this.highlightTemplate();
		this.emitCustomEvent({
			effect: "update-grid",
			detail: {
				columns: columns,
				rows: rows,
				template: template
			}
		});
		const context = this.closest("cq-context, [cq-context]");
		context.dispatchEvent(
			new CustomEvent("update-grid", {
				detail: {
					columns: columns,
					rows: rows,
					template: template,
					container: this.closest("cq-context")
				},
				bubbles: true,
				composed: true
			})
		);
	}

	/**
	 * Highlights provided number of rows and columns
	 *
	 * @param {number} columns Columns to highlight
	 * @param {number} rows Rows to highlight
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	highlightTable(columns, rows) {
		for (let gridCell of this.querySelectorAll("td")) {
			if (gridCell.dataset.column <= columns && gridCell.dataset.row <= rows) {
				gridCell.classList.add("highlight");
			} else {
				gridCell.classList.remove("highlight");
			}
		}
		const rowEl = this.querySelector(".row.count");
		const multEl = this.querySelector(".multiply");
		const hideRows = this.maxrows < 2;
		rowEl.style.display = hideRows ? "none" : "";
		multEl.style.display = hideRows ? "none" : "";
		rowEl.innerHTML = rows;
		this.querySelector(".column.count").innerHTML = columns;
	}

	/**
	 * Applies highlight on the idenified template
	 *
	 * @param {string|undefined} gridTemplate Template to highlight
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	highlightTemplate(gridTemplate) {
		if (gridTemplate) this.template = gridTemplate;
		const templateButtons = this.querySelectorAll(
			".ciq-grid-layout-picker .ciq-multi-chart-button"
		);
		templateButtons.forEach((button) => {
			button.classList.remove("active");
		});
		if (this.template) {
			const activeButton = Array.from(templateButtons).find((button) =>
				button.classList.contains(this.template)
			);
			if (activeButton) activeButton.classList.add("active");
		}
	}

	/**
	 * Removes unused rows and columns in the grid size picker table
	 *
	 * @param {number} columns Columns to keep
	 * @param {number} rows Rows to keep
	 *
	 * @tsmember WebComponents.GridSizePicker
	 */
	cleanTable(columns, rows) {
		let element = this.querySelector("table");
		// Remove unused rows
		while (element.childNodes.length > rows) {
			element.removeChild(element.lastChild);
		}
		// Remove unused columns from remaining rows
		for (let rowNode of element.childNodes) {
			while (rowNode.childNodes.length > columns) {
				rowNode.removeChild(rowNode.lastChild);
			}
		}
	}

	/**
	 * Returns the component content as a string to render it
	 *
	 * @returns {string} Component content
	 * @tsmember WebComponents.GridSizePicker
	 */
	render() {
		return `
				<ul class="ciq-grid-layout-picker"></ul>
				<cq-separator></cq-separator>
				<table class="grid-size-picker"></table>
				<p><span class="row count">1</span> <span class="multiply">+</span> <span class="column count">1</span></p>
			`;
	}
}

/**
 * Grid template mapping to sceen reader content
 *
 * @static
 * @type {string}
 *
 * @tsmember WebComponents.GridSizePicker
 * @since 9.3.0
 */
GridSizePicker.srMapping = {
	"ciq-auto-grid-1": "Top 1 chart, bottom 2 charts",
	"ciq-auto-grid-2": "Top 2 charts, bottom 1 chart",
	"ciq-auto-grid-3": "Left 1 chart, right 2 charts",
	"ciq-auto-grid-4": "Left 2 charts, right 1 chart",
	"ciq-auto-grid-5": "Top 1 chart, bottom 3 charts",
	"ciq-auto-grid-6": "Top 3 charts, bottom 1 chart",
	"ciq-auto-grid-7": "Left 1 chart, right 3 charts",
	"ciq-auto-grid-8": "Left 3 charts, right 1 chart",
	"ciq-auto-grid-9": "Top 1 chart, bottom 4 charts",
	"ciq-auto-grid-10": "Top 4 charts, bottom 1 chart",
	"ciq-auto-grid-11": "Left 1 chart, right 4 charts",
	"ciq-auto-grid-12": "Left 4 charts, right 1 chart"
};

CIQ.UI.addComponentDefinition("cq-grid-size-picker", GridSizePicker);

};


let __js_webcomponents_heading_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-heading&gt;</h4>
 *
 * In addition to representing the inner text of this component as an &lt;h4&gt; level header, this component also
 * allows one to filter what is displayed in a list of elements beneath another element in the DOM.  The filtering
 * is triggered by typing into to a search input.
 *
 * Note a MutationObserver is attached to the filterable element so if its contents change, this component will be
 * aware and render accordingly (see `filter-min` below).
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | filter-for   | A label to specify the element to filter.  The element to filter must also have its _filter-name_ attribute set to this value.  If _filter-for_ is omitted, will filter this element's next sibling. |
 * | filter-label | Text to put in the placeholder of the search input.  If omitted, will use "Search". |
 * | filter-min   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
 * | icon         | Optional icon class name to put on left of filter. |
 * | text         | Heading text.  Appears whether or not filtering is enabled. |
 *
 * Note that the `filter-for` attribute is disregarded if the component's `itemContainer` property is set.  This property should be set to a valid container selector if used.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component whenever the search input is changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "search" |
 * | action | "input" |
 * | value | _search string_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Study search filter</caption>
 * <cq-heading class="dropdown" filter-min="15" filter-for="studylist" text="Studies"></cq-heading>
 * <cq-studies filter-name="studylist">...</cq-studies>
 *
 * @alias WebComponents.Heading
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Heading extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["filter-for", "filter-label", "filter-min", "icon", "text"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (this.innerText && !this.text) this.text = this.innerText.trim();
		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);
		this.build();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Heading);
		this.constructor = Heading;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Heading
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (this.usingMarkup && this.attached) this.build();
	}

	/**
	 * Creates the component's markup.
	 *
	 * @tsmember WebComponents.Heading
	 */
	build() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			this.addDefaultMarkup(null, this.getMarkup());
			this.makeFilter();
		}
	}

	/**
	 * Formats the default markup, replacing any variables with the actual values provided by the attributes.
	 *
	 * @return {string} The prepared markup
	 *
	 * @tsmember WebComponents.Heading
	 */
	getMarkup() {
		let markup = this.markup || this.constructor.markup;
		const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
		if (names)
			names.forEach((name) => {
				const key = name.substring(2, name.length - 2);
				const attr = this[key];
				if (key === "icon") markup = markup.replace(name, attr || "hidden");
				else
					markup = markup.replace(
						name,
						attr || (key === "filter-label" ? "Search" : "")
					);
			});
		return markup;
	}

	/**
	 * Initializes the component's filter.
	 *
	 * @tsmember WebComponents.Heading
	 */
	makeFilter() {
		const wrapper = this.qsa(".searchFilter", this, true)[0];
		if (!this["filter-min"]) {
			if (wrapper) wrapper.remove();
			return;
		}

		const filterFor = this["filter-for"];
		let itemContainer =
			this.itemContainer ||
			(filterFor
				? this.qsa(`[filter-name='${filterFor}']`, null, true)[0]
				: this.nextElementSibling);
		if (!itemContainer || (!itemContainer.root && !itemContainer.children)) {
			// item to filter not yet in DOM
			setTimeout(() => this.makeFilter(), 100);
			return;
		}
		if (itemContainer.root && itemContainer !== itemContainer.root)
			itemContainer = itemContainer.root;
		let previousValue = "";

		const updateListVisibility = ({ target: { value } }) => {
			const re = new RegExp(value, "i");

			[...itemContainer.children]
				.filter((c) => !c.contains(this))
				.forEach((el) => {
					const visibilityAction =
						value && !re.test(el.textContent) ? "add" : "remove";
					el.classList[visibilityAction]("item-hidden");
					el.ariaHidden = visibilityAction === "add";
					if (previousValue !== value) {
						previousValue = value;
						this.removeFocused.apply(itemContainer);
						this.qsa(".cq-keyboard-selected-highlight").forEach(
							(highlightEl) => {
								highlightEl.classList.add("disabled");
							}
						);
						input.focus();
					}
				});
			this.emitCustomEvent({
				action: "input",
				effect: "search",
				detail: { value }
			});
		};
		const input = this.qsa("input", this, true)[0];
		if (input) {
			input.addEventListener("stxtap", (e) => e.stopPropagation(), true);
			input.addEventListener("input", updateListVisibility);
		}

		const minItemCount = this["filter-min"] || 15;
		if (wrapper) {
			const showFilterIfNecessary = () => {
				const itemCount = itemContainer.children.length;
				wrapper.classList[itemCount > minItemCount ? "add" : "remove"](
					"active"
				);
			};

			// Delay the execution of the filter activation check until sibling child nodes
			// have been created providing reference to the need for filter
			// based on filter-min setting
			if (typeof MutationObserver === "undefined") {
				wrapper.classList.add("active");
				return;
			}
			if (this.mutationObserver) this.mutationObserver.disconnect();
			this.mutationObserver = new MutationObserver(showFilterIfNecessary);
			this.mutationObserver.observe(itemContainer, {
				childList: true,
				subtree: true
			});

			showFilterIfNecessary();
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * This markup contains placeholder values which the component replaces with values from its attributes.
 * Variables are represented in double curly-braces, for example: `{{text}}`.
 * The following variables are defined:
 * | variable     | source |
 * | :----------- | :----- |
 * | text         | from attribute value |
 * | icon         | from attribute value |
 * | filter-label | from attribute value |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Heading
 */
Heading.markup = `
		<div>{{text}}</div>
		<div class="searchFilter">
			<span class="icon {{icon}}"></span>
			<input type="search" placeholder="{{filter-label}}" tabindex="-1"></input>
		</div>
	`;

CIQ.UI.addComponentDefinition("cq-heading", Heading);

};


let __js_webcomponents_headsupDynamic_ = (_exports) => {

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

};


let __js_webcomponents_headsupStatic_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-hu-static&gt;</h4>
 *
 * This web component displays the static heads up display.  This is a display of the market information at the point where the cursor lay.
 * The static heads-up marker does not follow the mouse cursor; rather, it shows in a static location on the chart as a marker.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.HeadsUpStatic
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.5.0
 */
class HeadsUpStatic extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, HeadsUpStatic);
		this.constructor = HeadsUpStatic;
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
	 * @tsmember WebComponents.HeadsUpStatic
	 * @since 7.5.0
	 */
	setContext(context) {
		this.addDefaultMarkup();
		const UIHeadsUpStatic = new CIQ.UI.HeadsUp(this, context, {
			autoStart: true
		});

		const headsUp =
			context.config && context.config.channels
				? context.config.channels.headsUp
				: "layout.headsUp";
		this.channelSubscribe(headsUp, (value) => {
			UIHeadsUpStatic[
				value === "static" || (value || {}).static ? "begin" : "end"
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
 * @tsmember WebComponents.HeadsUpStatic
 */
HeadsUpStatic.markup = `
		<div>
			<div>Price</div><cq-hu-price></cq-hu-price>
			<div>Open</div><cq-hu-open></cq-hu-open>
			<div>Close</div><cq-hu-close></cq-hu-close>
		</div>
		<div>
			<div>Vol</div>
			<cq-volume-section>
				<cq-hu-volume></cq-hu-volume>
				<cq-volume-rollup></cq-volume-rollup>
			</cq-volume-section>
			<div>High</div><cq-hu-high></cq-hu-high>
			<div>Low</div><cq-hu-low></cq-hu-low>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-hu-static", HeadsUpStatic);

};


let __js_webcomponents_help_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-help&gt;</h4>
 *
 * When long-pressed, this component can display help text. The text is displayed in a floating window popup over the chart.
 * The text which is discplayed is configured in the CIQ.Help namespace.
 * Sample help configuration is provided in the sample file in your library package, in /examples/help/helpContent.js.
 *
 * The long-press time is set in the [stxx.longHoldTime]{@link https://documentation.chartiq.com/CIQ.ChartEngine.html#callbacks%5B%60longhold%60%5D} function.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | help-id   | A key to the correct help text in CIQ.Help.Content. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is long-pressed enough for the help text to show.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "help" |
 * | action | "longpress" |
 * | helpId | _key_ |
 * | helpData | _text_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Help component within a toggle:</caption>
 * <cq-toggle class="ciq-CH active" config="crosshair" icon="crosshair">
 * 		<cq-help class="hidden" help-id="crosshair_help"></cq-help>
 * 		<span class="icon crosshair"></span>
 *	</cq-toggle>
 *
 * @alias WebComponents.Help
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Help extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["help-id"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		["mousedown", "pointerdown", "touchstart"].forEach((eventName) =>
			this.addEventListener(eventName, this.mouseTouchDown, { passive: false })
		);
		["mouseup", "pointerup", "touchend", "touchmove", "click"].forEach(
			(eventName) =>
				this.addEventListener(eventName, this.mouseTouchUp, { passive: false })
		);
		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Help);
		this.constructor = Help;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Help
	 */
	setContext(context) {
		this.addDefaultMarkup();
		let { stx } = context;
		if (CIQ.Help) CIQ.UI.activatePluginUI(stx, "help");
		this.ensureMessagingAvailable(stx);
		this.addClaim(this);
	}

	/**
	 * Handler for beginning a long-press.
	 *
	 * @param {Event} evt The mousedown event
	 *
	 * @tsmember WebComponents.Help
	 */
	mouseTouchDown(evt) {
		this.stopPropagation = false;
		if (
			!CIQ.Help ||
			!CIQ.Help.Content ||
			!CIQ.Help.Content[this["help-id"]] ||
			this.pressTimer ||
			(evt.button && evt.button >= 2)
		)
			return;
		this.pressTimer = setTimeout(() => {
			this.pressTimer = null;
			// Allow the press highlight animation to complete before removing
			setTimeout(() => this.classList.remove("pressing"), 1000);
			this.press();
		}, this.context.stx.longHoldTime);
		this.classList.add("pressing");
	}

	/**
	 * Handler for ending a long-press.  If the threshold time is reached (`pressing` class remains set), the help display is triggered.
	 *
	 * @param {Event} evt The mousedown event
	 *
	 * @tsmember WebComponents.Help
	 */
	mouseTouchUp(evt) {
		if (this.stopPropagation) evt.stopPropagation();
		if (
			!CIQ.Help ||
			!CIQ.Help.Content ||
			!CIQ.Help.Content[this["help-id"]] ||
			(evt.button && evt.button >= 2)
		)
			return;
		if (evt.type === "click") {
			if (!evt.detail && !this.classList.contains("pressing")) this.press();
			this.classList.remove("pressing");
		}
		if (!this.pressTimer) return;
		clearTimeout(this.pressTimer);
		this.pressTimer = null;
	}

	/**
	 * Handler for keyboard interaction.
	 *
	 * Question mark `?` key will trigger the help for the active component, if available.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Help
	 */
	keyStroke(hub, key, e) {
		if (key !== "?") return false;
		const myId = this["help-id"];
		let elemWithHelp = this.qsa("[help-id]", CIQ.getActiveElement(), true);
		if (elemWithHelp.length === 1) elemWithHelp = elemWithHelp[0];
		else elemWithHelp = null;
		if (!elemWithHelp)
			elemWithHelp = CIQ.climbUpDomTree(
				CIQ.getActiveElement(),
				"[help-id]",
				true
			)[0];
		if (!elemWithHelp && hub.tabActiveElement)
			elemWithHelp = this.qsa(
				"[help-id]",
				hub.tabActiveElement.element,
				true
			)[0];
		if (!elemWithHelp || myId !== elemWithHelp.getAttribute("help-id"))
			return false;
		this.press();
		return true;
	}

	/**
	 * Ensures that an instance of the [cq-floating-window]{@link WebComponents.FloatingWindow}
	 * web component is available to handle event messaging and create the shortcuts legend floating
	 * window.
	 *
	 * This function is called when the component's context is set (on load).
	 *
	 * @param {CIQ.ChartEngine} stx The chart engine that provides the UI context, which contains the
	 * [cq-floating-window]{@link WebComponents.FloatingWindow} web component.
	 *
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.Help
	 */
	ensureMessagingAvailable(stx) {
		setTimeout(() => {
			const contextContainer = stx.uiContext.topNode;
			if (!contextContainer.querySelector("cq-floating-window")) {
				contextContainer.append(document.createElement("cq-floating-window"));
			}
		});
	}

	/**
	 * Adds class `help-available` if a property matching this element's help-id attribute
	 * can be found in CIQ.Help.Content object. This class can be used to indicate that help
	 * is available for the element.  For example, a small dot can be shown.
	 *
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.Help
	 */
	verifyHelpContent() {
		if (!CIQ.Help || !CIQ.Help.Content) return;
		let helpData = CIQ.Help.Content[this["help-id"]];
		if (helpData) {
			this.classList.add("help-available");
		} else {
			this.classList.remove("help-available");
		}
	}

	/**
	 * Called from mouseTouchUp, this method will send the help text to the floating window for display.
	 *
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.Help
	 */
	press() {
		if (!CIQ.Help || !CIQ.Help.Content) return;
		let { stx } = this.context;
		let helpId = this["help-id"] || "default";
		let helpData = CIQ.Help.Content[helpId] || CIQ.Help.Content["default"];
		this.emitCustomEvent({
			action: "longpress",
			effect: "help",
			detail: {
				params: Object.assign({ helpId }, helpData)
			}
		});
		if (!helpData) return;

		stx.dispatch("floatingWindow", {
			type: "documentation",
			title: helpData.title,
			content: helpData.content,
			targetElement: this.parentElement || this.getRootNode().host,
			actionButtons: [],
			container: stx.chart.panel.subholder,
			onClose: () => true,
			width: 500,
			status: true,
			tag: "help"
		});

		this.stopPropagation = true;
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 * This markup contains a dot which can be displayed when help is available.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Help
 */
Help.markup = `
		<div class="ciq-help-widget"></div>
		<div class="press-indicator" aria-hidden="true">
			<!-- 1x1 transparent image to maintain aspect ratio when sizing by height -->
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-help", Help);

};


let __js_webcomponents_instantChart_ = (_exports) => {

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

};


let __js_webcomponents_languageDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.I18N) {
	console.error(
		"languageDialog component requires first activating i18n feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-language-dialog&gt;</h4>
	 *
	 * Creates a dialog that the user can use to change the language.
	 *
	 * The actual language choices are obtained from {@link CIQ.I18N.languages}. Choosing a different language causes the entire
	 * UI to be translated through use of the {@link CIQ.I18N.setLanguage} method.
	 *
	 * The `setHtmlLang` configuration property is used to control whether this component should change the page's default language,
	 * To disable this functionality, set this attribute to false.  This can be done as illustrated in the example below,
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when a language is selected.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "change" |
	 * | action | "click" |
	 * | language | _language code_ |
	 *
	 * @example
	 * <cq-dialog>
	 *    <cq-language-dialog>
	 *    </cq-language-dialog>
	 * </cq-dialog>
	 *
	 * @example <caption>Adjust context config to not set &lt;html&gt; `lang` attribute</caption>
	 * stxx.uiContext.config.setHtmlLang = false;
	 *
	 * @alias WebComponents.LanguageDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 4.0.0 New component added.
	 * - 4.1.0 Now it calls {@link CIQ.I18N.localize} instead of {@link CIQ.I18N.setLocale}.
	 * - 9.1.0 Added emitter.
	 * - 9.2.0 Added `cq-set-htmllang` attribute.
	 */
	class LanguageDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, LanguageDialog);
			this.constructor = LanguageDialog;
		}

		/**
		 * Closes dialog box.
		 *
		 * @tsmember WebComponents.LanguageDialog
		 * @since 4.0.0
		 */
		close() {
			const langDialog = this.ownerDocument.querySelector("cq-language-dialog");
			if (langDialog) langDialog.closest("cq-dialog,cq-menu").close();
		}

		/**
		 * Opens the language dialog.
		 *
		 * @param {Object} [params] Contains the chart context.
		 * @param {CIQ.UI.Context} [params.context] A context to set for the dialog. See
		 * 		{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.LanguageDialog
		 * @since 4.0.0
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);

			const cqLanguages = this.querySelector("cq-languages");
			[...cqLanguages.children].forEach((child) => {
				if (!child.matches("template")) child.remove();
			});
			const template = this.querySelector("template");
			const { languages } = CIQ.I18N;
			if (!languages) return;

			const switchToLanguage = (language) => {
				return () => {
					CIQ.UI.contextsForEach(function () {
						const { stx } = this;
						CIQ.I18N.localize(stx, language);
						if (this.config.setHtmlLang)
							document.documentElement.setAttribute("lang", language);
						stx.preferences.language = language;
						stx.changeOccurred("preferences");
						stx.draw();
					}, this);
					CIQ.I18N.translateUI(language, this.dialog);
					this.emitCustomEvent({
						effect: "change",
						detail: { language }
					});
				};
			};
			for (let langCode in languages) {
				const node = CIQ.UI.makeFromTemplate(template, cqLanguages)[0];
				node.querySelector("cq-language-name").innerText = languages[langCode];
				node.querySelector("cq-flag").setAttribute("cq-lang", langCode);
				CIQ.UI.stxtap(node, switchToLanguage(langCode));
			}
			// Set the main dialog as keyboard active to reset the highlight when this panel reloads
			if (this.ownerDocument.body.keystrokeHub) {
				let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
				if (tabActiveModals[0])
					this.ownerDocument.body.keystrokeHub.setKeyControlElement(
						tabActiveModals[0]
					);
			}
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.LanguageDialog
	 */
	LanguageDialog.markup = `
		<cq-languages role="listbox">
			<template><div keyboard-selectable="true" role="option"><cq-flag></cq-flag><cq-language-name></cq-language-name></div></template>
		</cq-languages>
	`;
	CIQ.UI.addComponentDefinition("cq-language-dialog", LanguageDialog);
}

};


let __js_webcomponents_loader_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-loader&gt;</h4>
 *
 * CSS loading icon.
 * The component may be shown or hidden either by calling its `show()` or `hide()` methods; or by adding or removing the `stx-show` class.
 *
 * @alias WebComponents.Loader
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class Loader extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Loader);
	}

	/**
	 * Shows the loading icon.
	 *
	 * @param {boolean} [applyClass=false] Applies the ciq-loading-data class to the chart container, which by default dims the chart.
	 *
	 * @since 9.4.0 added applyClass parameter
	 *
	 * @tsmember WebComponents.Loader
	 */
	show(applyClass) {
		this.classList.add("stx-show");
		const { context } = this;
		this.isShowing = true;
		if (context && applyClass) {
			this.applyClass = applyClass;
			context.stx.container.classList.add("ciq-loading-data");
		}
	}

	/**
	 * Hides the loading icon.
	 *
	 * @tsmember WebComponents.Loader
	 */
	hide() {
		this.classList.remove("stx-show");
		this.isShowing = false;
		const { context } = this;
		if (context && this.applyClass) {
			context.stx.container.classList.remove("ciq-loading-data");
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Loader
	 */
	setContext(context) {
		if (this.parentNode.stx) context.setLoader(this);
		if (!this.isShowing) this.hide();
	}
}

CIQ.UI.addComponentDefinition("cq-loader", Loader);

};


let __js_webcomponents_lookup_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.ChartEngine.Driver) {
	console.error(
		"lookup component requires first activating quoteFeed feature."
	);
} else if (!CIQ.ChartEngine.Driver.Lookup) {
	console.error(
		"lookup component requires first activating symbolLookupBase feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-lookup&gt;</h4>
	 *
	 * This component presents a search input for the user to enter either a ticker symbol or a part
	 * of the symbol's description.  Results of the search are presented in a dropdown for the user to choose. 
	 *
	 * A {@link CIQ.ChartEngine.Driver.Lookup} must be connected to this web component. The lookup
	 * driver searches financial exchanges for symbols that match the text entered in the
	 * component's input field.
	 *
	 * The symbol lookup can be toggled using the Ctrl+Alt+S keystroke combination (see the
	 * `symbolLookup` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
	 *
	 * A default lookup driver is specified in the chart configuration object (see the
	 * <a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
	 * tutorial).
	 *
	 * You can provide a different driver in the following ways:
	 * - Assign the driver to the
	 *   <a href="tutorial-Chart%20Configuration.html#lookupdriver" target="_blank">
	 *   <code class="codeLink">lookupDriver</code></a> property of the chart configuration
	 *   object
	 * - Connect the driver to this component using
	 *   [setDriver]{@link WebComponents.Lookup#setDriver}
	 * - Add the driver to the UI context with {@link CIQ.UI.Context#setLookupDriver}
	 *
	 * **Note:** If the lookup component is unable to access a lookup driver, the component's
	 * input field is active, but the component does not produce results.
	 *
	 * _**Keyboard control**_
	 *
	 * When selected with tab key navigation and activated with Return/Enter, this component has
	 * the following internal controls:
	 * - Up/Down arrow &mdash; Move selection between search input, filters, and search results
	 * - Left/Right arrow &mdash; Switch between search result filters
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute            | description |
	 * | :------------------- | :---------- |
	 * | cq-keystroke-default | Enables the component to respond to keystrokes when the lookup input field does not have focus. <p style="margin-bottom: 0">**Warning:** This feature may conflict with keyboard shortcuts set in other components. |
	 * | cq-uppercase         | Forces text to uppercase. |
	 * | cq-exchanges         | Comma-delimited list of financial exchanges searched by the lookup driver. Overrides the `exchanges` parameter of {@link CIQ.ChartEngine.Driver.Lookup}. |
	 *
	 * In addition, the following attributes are also supported:
	 * | attribute            | description |
	 * | :------------------- | :---------- |
	 * | cq-keystroke-claim   | Enables processing of keyboard input. |
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted by the component when a search is performed.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "search" |
	 * | action | "input" |
	 * | value | _search string_ |
	 * | filter | _filter_ |
	 * | exchanges | _exchange list_ |
	 *
	 * A custom event will be emitted by the component when a result is selected.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "select" |
	 * | action | "click" |
	 * | data | _symbol or symbolObject_ |
	 *
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * _**Customization**_
	 *
	 * - To hide the lookup results window, modify the CSS as follows:
	 * ```css
	 * .stxMenuActive cq-lookup-results { opacity: 0 }
	 * ```
	 *
	 * - To preload default results (rather than an empty result pane) on initial load, set an
	 * `onChartReady` handler in the chart configuration object (see the
	 * <a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
	 * tutorial); for example:
	 *
	 * ```
	 * config.onChartReady = (stx) => {
	 *     const defaultResults = [
	 *         {
	 *             "display": ["KW", "Kennedy - Wilson Holdings Inc", "NYSE"],
	 *             "data": {
	 *                 "symbol": "KW",
	 *                 "name": "Kennedy - Wilson Holdings Inc",
	 *                 "exchDisp ": "NYSE"
	 *             }
	 *         },
	 *         {
	 *             "display": ["RWR", "SPDR Series Trust - SPDR DJ Wilshire REIT ETF", "NYSEArca"],
	 *             "data": {
	 *                 "symbol": "RWR",
	 *                 "name": "SPDR Series Trust - SPDR DJ Wilshire REIT ETF",
	 *                 "exchDisp": "NYSEArca"
	 *             }
	 *         }
	 *     ];
	 *
	 *     const UISymbolLookup = document.querySelector(".ciq-search cq-lookup");
	 *     UISymbolLookup.results(defaultResults);
	 * }
	 * ````
	 *
	 * - The placeholder is programmatically set based on the width of the chart.
	 * On larger screens "Enter Symbol" is used, but on smaller screens only "Symbol" is used.
	 * As such, it is not sufficient to set a placeholder value on the HTML, as it will be overwritten by the Web Component logic.
	 * The following script will update the placeholder according to breakpoint values set in placeholderMapping.
	 * It should be placed inside the [onWebComponentsReady]{@tutorial Chart Configuration} callback provided in the
	 * `defaultConfiguration` object to ensure it is executed once all Web Components have been properly initialized.
	 * The approach here is to add a second breakpoint channel listener for the lookup component that overwrites the value set by default in the library.
	 *
	 * ```
	 * function setLookupPlaceholders(placeholderMapping = {
	 *     "break-lg": "Change symbol",
	 *     "break-md": "+ symbol",
	 *     "break-sm": ""
	 *  }) {

  	 *   Array.from(uiContext.topNode.querySelectorAll('cq-lookup'))
  	 *   .forEach(el => {
	 *         const { channels = {} } = el.context.config;
	 *         el.channelSubscribe(
	 *            channels.breakpoint || "channel.breakpoint",
	 *            (breakPoint) => {
	 *                     const symbolValue = placeholderMapping[breakpoint] || "Change symbol";
	 *
	 *                     const symbolInput = el.querySelector("input");
	 *                     symbolInput.setAttribute("placeholder", symbolValue);
	 *          );
	 *        });
	 *     });
	 * }
	 * setLookupPlaceholders();
	 * ```
	 *
	 * @example <caption>Markup for lookup component</caption>
	 * <cq-menu class="search ciq-lookup-icon" cq-focus="input" icon="ciq">
	 * 		<cq-lookup cq-keystroke-claim cq-uppercase cq-exchanges="XNYS,XNAS,forex"></cq-lookup>
	 * </cq-menu>
	 *
	 * @alias WebComponents.Lookup
	 * @extends CIQ.UI.ContextTag
	 * @class
	 * @protected
	 * @since
	 * - 4.0.0 Added optional `cq-uppercase` attribute.
	 * - 7.4.0 Added optional `cq-exchanges` attribute.
	 * - 8.3.0 Enabled internal keyboard navigation and selection.
	 * - 9.1.0 Observes attributes. Added emitter.
	 */
	class Lookup extends CIQ.UI.ContextTag {
		static get observedAttributes() {
			return ["cq-exchanges", "cq-keystroke-default", "cq-uppercase"];
		}

		constructor() {
			super();
			this.usingEmptyDriver = false;
			this.currentFilter = null;
			// Will hold references to filter tabs for keyboard navigation
			this.filterElements = null;
			this.params = {};
			this.overrideIsActive = false;
			//CIQ.UI.stxtap(this, () => {}); // forces composed path to be from within this element
			CIQ.UI.makeShadow(this);
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.attached = true;
			this.setupShadow();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Lookup);
			this.constructor = Lookup;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			this.removeClaim(this);
			super.disconnectedCallback();
		}

		/**
		 * Performs the search of symbols based on the parameters input.
		 *
		 * With the decoupling of the uiHelper to the Lookup.Driver you must be sure to include both an argument for maxResults and the closure to handle the results.
		 * maxResults must either be a number or a string to result in default value of 100.
		 *
		 * @param {string} value String to search for.
		 * @param {string} filter Name of exchange to limit results to.  The valid names are implementation-specific.
		 *
		 * @tsmember WebComponents.Lookup
		 * @since 3.0.0
		 */
		acceptText(value, filter) {
			if (!this.params.driver) {
				if (this.context.lookupDriver) {
					this.setDriver(this.context.lookupDriver);
				} else {
					this.setDriver(new CIQ.ChartEngine.Driver.Lookup());
					this.usingEmptyDriver = true;
				}
			}
			const closure = (results) => {
				this.params.driver.exchanges = this.params.driver.exchanges;
				this.results(results);
			};
			const exchanges = this["cq-exchanges"];
			if (exchanges) this.params.driver.exchanges = exchanges.split(",");
			this.emitCustomEvent({
				effect: "search",
				detail: { value, filter, exchanges }
			});
			this.params.driver.acceptText(value, filter, null, closure);
		}

		/**
		 * Closes the results list dropdown and passes the chosen symbol to be loaded onto the chart.
		 *
		 * @param {object} params
		 * @param {HTMLElement} params.node The element within the results list containing the chosen result.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		chooseResult({ node }) {
			CIQ.blur(this.input);
			this.selectItem(node.params.data);
			this.input.value = "";
			setTimeout(this.close.bind(this));
		}

		/**
		 * Closes the results list dropdown.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		close() {
			if (this.keyboardNavigation) {
				// Position the highlight over the input to wait for the collapse animation to complete
				this.highlightItem(
					this.input,
					1000 * (this.getOpenCloseTransition() || 0)
				);

				// Remove any focused property from the filter tabs
				this.removeFocused(this.filterElements);
				// Remove keyboard control from container
				this.resultList.keyboardNavigation = null;
			} else {
				// Reset the highlight in the event that tab navigation is activated while the lookup is open
				const keystrokeHub = this.ownerDocument.body.keystrokeHub;
				if (keystrokeHub) setTimeout(() => keystrokeHub.highlightAlign(), 250);
			}
			const menu = CIQ.climbUpDomTree(this, "cq-dialog,cq-menu", true)[0];
			if (menu) menu.close();
		}

		/**
		 * Takes whatever was input in the search box and uses it as the symbol to load the chart.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		forceInput() {
			const input = this.input;
			this.selectItem({ symbol: input.value });
			CIQ.blur(input);
			this.close();
			input.value = "";
		}

		/**
		 * Finds the width transition for the input box, which is used when focusing or unfocusing the search input.
		 *
		 * @return {String} Found transition value
		 * @private
		 *
		 * @tsmember WebComponents.Lookup
		 */
		getOpenCloseTransition() {
			let { transition } = getComputedStyle(this);
			if (transition) {
				transition = transition.match(/width ((\d{1,4}\.)?\d{1,4})s/);
				if (transition) transition = transition[1];
			}
			return transition;
		}

		/**
		 * Creates the markup of the component, and sets up event handlers.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		initialize() {
			const { root } = this;
			this.addDefaultMarkup();
			this.resultList = root.querySelector("cq-dropdown");

			this.input = root.querySelector("input");
			if (!this.input) {
				const hiddenInput = document.createElement("input");
				hiddenInput.setAttribute("type", "hidden");
				hiddenInput.value = "";
				this.input = root.appendChild(hiddenInput);
			}
			CIQ.UI.stxtap(this.input, function () {
				this.focus();
			});
			const self = this;
			Array.from(this.input).forEach(function (input) {
				input.addEventListener("paste", function (e) {
					const input = e.target;
					setTimeout(function () {
						self.acceptText(input.value, self.currentFilter);
					}, 0);
				});
			});
			const filters = root.querySelectorAll(".filters > *");
			if (filters) {
				filters.forEach(function (filter) {
					self.makeTap(filter, function () {
						filters.forEach(function (f) {
							f.classList.remove("true");
						});
						this.classList.add("true");
						self.currentFilter =
							this.getAttribute("cq-translate-original") || this.innerHTML;
						self.acceptText(self.input.value, self.currentFilter);
					});
				});
			}

			if (this.hasAttribute("cq-keystroke-claim")) {
				// add keyboard claim for entire body
				this.addClaim(this);
			}
		}

		/**
		 * Returns active state of the search input box.
		 *
		 * @return {boolean} True if active
		 *
		 * @tsmember WebComponents.Lookup
		 */
		isActive() {
			return this.input.value !== "";
		}

		/**
		 * Handler for keyboard interaction.
		 *
		 * Note that this captures keystrokes on the body. If the input box is focused then we need to allow the input box itself
		 * to handle the strokes but we still want to capture them in order to display the lookup results. We first check
		 * activeElement to see if the input is focused. If so then we bypass logic that manipulates the input.value. In order make
		 * sure that the lookup menu is responding to an up-to-date input.value therefore we have to put all of those pieces of code
		 * in setTimeout(0)
		 *
		 * Note that when comparisons are enabled, there are two Lookup components on the screen. Each keypress will therefore pass
		 * through this function twice, once for each Lookup component. Only the active component will process the keystroke.
		 *
		 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
		 * @param {string} key Key that was stroked
		 * @param {Event} e The event object
		 * @param {CIQ.UI.Keystroke} keystroke Contains status of function keys
		 * @return {boolean} true if keystroke was processed
		 *
		 * @tsmember WebComponents.Lookup
		 */
		keyStroke(hub, key, e, keystroke) {
			if (keystroke.ctrl || keystroke.cmd) return false;
			if (key == "Meta" || key == "Win") return false;

			const input = this.input;
			const activeElement = CIQ.getActiveElement();
			const focused = activeElement === input; // If focused then we need to allow the input box to get most keystrokes
			let result = false;
			// Rejecting alt key combinations only when the input is out of focus because some special chars can be typed with an alt key
			if (
				!focused &&
				(e.altKey ||
					(activeElement &&
						(activeElement.tagName == "INPUT" ||
							activeElement.tagName == "TEXTAREA")))
			) {
				return false; // either an alt key combination was pressed or some other input has focus
			}

			let iAmActive = false,
				iAmDisplayed = false;
			const menu = CIQ.climbUpDomTree(this, ".stxMenuActive", true)[0];

			if (menu) iAmDisplayed = true; // if my menu chain is active then I'm alive
			if (focused || iAmDisplayed) iAmActive = true; // If my input is focused or I'm displayed, then I'm alive
			if (!iAmActive) {
				// Otherwise, I may still be alive under certain conditions
				if (!this["cq-keystroke-default"]) return; // I'm always alive if I have default body keystrokes
				if (!iAmDisplayed && this.uiManager.topMenu()) return; // unless there's another menu active and it isn't me
			}
			if ((key === " " || key === "Spacebar") && input.value === "") {
				return false;
			}

			let focusedElements = this.findFocused(this.filterElements);

			switch (key) {
				case "Delete":
				case "Backspace":
				case "Del":
					if (input.value.length) {
						//ctrl-a or highlight all text + delete implies remove all text
						if (window.getSelection().toString()) {
							input.value = "";
						} else {
							if (!focused)
								input.value = input.value.substring(0, input.value.length - 1);
							if (input.value.length) {
								this.acceptText(input.value, this.currentFilter);
							}
						}

						result = true; // only capture delete key if there was something to delete
					}
					if (key == "Backspace") result = true; // always capture backspace because otherwise chrome will navigate back
					break;
				case "Escape":
				case "Esc":
					input.value = "";
					this.close();
					CIQ.blur(input);
					result = true;
					break;
				case "Enter":
					if (this.resultList.focused()) {
						input.value = "";
						return false;
					} else if (activeElement === input) {
						let { value } = input;
						const toUpperCase =
							["false", "0", null].indexOf(this["cq-uppercase"]) == -1;
						if (toUpperCase) value = value.toUpperCase();
						this.selectItem({ symbol: value });
						CIQ.blur(input);
						this.close();
						input.value = "";
					}
					if (this["cq-keystroke-default"]) result = true;
					else result = this.qsa("[cq-focused]", this, true).length;
					break;
				case "ArrowRight":
				case "Right":
					if (focusedElements.length) {
						// Remove control from the result list
						if (this.resultList.keyboardNavigation)
							this.resultList.keyboardNavigation = null;
						// Ignore right if a tab is not focused to allow cursor movement in input
						this.focusNextItem(this.filterElements);
						this.clickFocusedItem(this.filterElements, e);
					}
					break;
				case "ArrowLeft":
				case "Left":
					// Remove control from the result list
					if (this.resultList.keyboardNavigation)
						this.resultList.keyboardNavigation = null;
					// Ignore left if a tab is not focused to allow cursor movement in input
					if (focusedElements.length) {
						this.focusNextItem(this.filterElements, true);
						this.clickFocusedItem(this.filterElements, e);
					}
					break;
				case "ArrowDown":
				case "Down":
					// Up/Down arrows are only used in this component when keyboard navigation is enabled
					if (!this.keyboardNavigation) break;
					// If no tab is focused, then give the first one focus, otherwise, pass control to the resultList
					focusedElements = this.findFocused(this.filterElements);
					if (!focusedElements.length) {
						// If a tab hasn't been focused, highlight the active one.
						for (
							let filterIdx = 0;
							filterIdx < this.filterElements.length;
							filterIdx++
						) {
							const filterElement = this.filterElements[filterIdx];
							if (filterElement.classList.contains("true")) {
								this.focusItem(filterElement);
								break;
							}
						}
					} else if (!this.resultList.keyboardNavigation) {
						// Only pass control to the result list if there are results
						const resultItem = this.qsa(
							"[keyboard-selectable]",
							this.resultList,
							true
						)[0];
						if (resultItem) {
							this.resultList.keyboardNavigation = this.keyboardNavigation;
							this.focusItem(resultItem);
							return true;
						}
					}
					CIQ.blur(input);
					break;
				case "ArrowUp":
				case "Up":
					// Up/Down arrows are only used in this component when keyboard navigation is enabled
					if (!this.keyboardNavigation) break;
					// resultList has its own up/down control.
					if (this.resultList.keyboardNavigation) {
						// If the scroll has control, check for the top item selected and move highlight back to the tabs
						const firstResult = this.qsa(
							".item:first-of-type [cq-focused]",
							this.resultList,
							true
						)[0];
						if (firstResult) {
							firstResult.removeAttribute("cq-focused");
							this.resultList.keyboardNavigation = null;
							this.highlightFocusedItem(this.filterElements);
						}
					} else if (focusedElements.length) {
						//If a tab has the highlight, reset the highlight back to the input
						this.removeFocused(focusedElements);
						this.highlightItem(input);
						CIQ.focus(input);
					}
					break;
				default:
					// Prevent keys like Control and ArrowLeft from triggering focus
					if (key.length === 1) {
						// Changes the <input> value when keystrokes are registered against the body.
						if (!focused) input.value = input.value + key;
						this.acceptText(input.value, this.currentFilter);
						result = true;
					}
					break;
			}

			if (result) {
				// If we're focused, then keep the lookup open unless we hit escape.
				// Otherwise, if there is no length close it (user hit "escape", "enter", or "backspace/delete" while unfocused)
				if (
					this.usingEmptyDriver ||
					(!input.value.length &&
						(key == "Escape" || key == "Esc" || key == "Enter" || !focused))
				) {
					this.close();
				} else {
					this.open();
				}
				if (focused) return { allowDefault: true };
				return true;
			}
		}

		/**
		 * Opens the results list dropdown.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		open() {
			// Reposition the highlight after css animation is complete.
			this.highlightItem(
				this.input,
				1000 * (this.getOpenCloseTransition() || 0)
			);
			const menu = CIQ.climbUpDomTree(this, "cq-dialog,cq-menu", true)[0];
			if (menu) menu.open({ e: { target: this } });
		}

		/**
		 * Handler for when losing keyboard focus.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		onKeyboardDeselection() {
			CIQ.blur(this.input);
			this.close();
			// If we're using keyboard navigation, return the highlight to the tab selected element
			if (this.keyboardNavigation) this.keyboardNavigation.highlightPosition();
			this.resultList.keyboardNavigationWait = false;
		}

		/**
		 * Handler for when gaining keyboard focus.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		onKeyboardSelection() {
			// If we're using keyboard navigation, return the highlight to the tab selected element
			this.highlightItem(this.input);
			CIQ.focus(this.input);
			this.resultList.keyboardNavigationWait = true;
			this.open();
		}

		/**
		 * Clear out the input and results list.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		reset() {
			this.input[0].value = "";
			this.resultList.empty();
		}

		/**
		 * Displays an array of results returned by the {@link CIQ.ChartEngine.Driver.Lookup}.
		 *
		 * Each element in the array should be in the following format (see
		 * {@link CIQ.ChartEngine.Driver.Lookup#acceptText}):
		 * ```
		 * {
		 *     display: ["symbol ID", "symbol description", "exchange"],
		 *     data: {
		 *         symbol: "symbol ID",
		 *         name: "symbol description",
		 *         exchDis: "exchange"
		 *     }
		 * }
		 * ```
		 *
		 * The lookup component by default displays three columns as represented by the array. The
		 * data object can be a format required by your quote feed, or it can be a simple string
		 * if you just need to support a stock symbol.
		 *
		 * @param {array} arr The array of results.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		results(arr) {
			const container = this.root.querySelector("cq-dropdown");
			const helper = CIQ.UI.BaseComponent.getHelper(this, "MenuConfig");
			if (container && helper) {
				const id = CIQ.uniqueID();
				const content = [];
				arr.forEach((item) => {
					const [sym, desc, exch] = item.display;
					const label = `<span>${sym}</span><span>${desc}</span><span>${exch}</span>`;
					const result = {
						type: "item",
						label,
						tap: "chooseResult",
						data: item.data
					};
					content.push(result);
				});
				helper[id] = { content };
				container.setAttribute("config", id);
				delete helper[this.lastResultId];
				this.lastResultId = id;
			}
		}

		/**
		 * Accepts a new symbol or symbol object.
		 *
		 * @param {object} data Contains a symbol or symbol object in a form accepted by
		 * 		{@link CIQ.ChartEngine#loadChart}.
		 * @param {function} fn Function to execute when the callback set by
		 * 		[setCallback]{@link WebComponents.Lookup#setCallback} finishes.
		 *
		 * @since 8.2.0 Removed the `params` parameter. Added the `fn` parameter.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		selectItem(data, fn) {
			if (this.params.cb) {
				this.params.cb(data, fn);
			}
			if (data)
				this.emitCustomEvent({
					action: "input",
					effect: "select",
					detail: data
				});
		}

		/**
		 * Sets a callback function to be called when the user selects a symbol.
		 *
		 * @param {function} cb The callback function; for example, an implementation of
		 * 		{@link CIQ.UI.Context#changeSymbol}.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		setCallback(cb) {
			this.params.cb = cb;
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		setContext(context) {
			this.initialize();

			const { config, stx } = context;
			if (!config) return;
			const { channels = {} } = config;

			this.channelSubscribe(
				channels.breakpoint || "channel.breakpoint",
				(breakPoint) => {
					let placeholder = stx.crossSection
						? stx.crossSection.symbolInputType
						: "Symbol";
					if (breakPoint === "break-lg") {
						placeholder = "Enter " + placeholder;
					} else if (breakPoint === "break-sm") {
						placeholder = "";
					}
					this.input.setAttribute(
						"cq-translate-placeholder-original",
						placeholder
					);
					this.input.setAttribute("placeholder", stx.translateIf(placeholder));
					if (stx.translateUI) stx.translateUI(this.input.parentElement);
					this.root.querySelector("cq-dropdown").resize();
				}
			);

			// Get a list of filter tabs for keyboard navigation
			this.filterElements = this.root.querySelectorAll(".filters > *");

			if (!this.params.cb && context.changeSymbol)
				this.params.cb = context.changeSymbol;
		}

		/**
		 * Called for a registered component when the context is changed in a multichart environment.
		 *
		 * @param {CIQ.UI.Context} newContext The chart user interface context.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		changeContext(newContext) {
			if (this.params.cb && newContext.changeSymbol)
				this.params.cb = newContext.changeSymbol;
		}

		/**
		 * Connects a {@link CIQ.ChartEngine.Driver.Lookup} to the web component.
		 *
		 * The lookup driver searches financial exchanges for symbols that match the text entered
		 * in the component's input field.
		 *
		 * @param {CIQ.ChartEngine.Driver.Lookup} driver The lookup driver to connect to the web
		 * 		component.
		 *
		 * @tsmember WebComponents.Lookup
		 */
		setDriver(driver) {
			this.params.driver = driver;
		}
	}

	/**
	 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.Lookup
	 */
	Lookup.markup = `
		<div class="input-area" cq-no-close>
			<span class="icon search"></span>
			<input type="text" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" name="symbol" placeholder="" tabindex="-1">
			<div cq-tooltip>Search</div>
		</div>
		<div class="results-area">
			<ul class="filters" cq-no-close>
				<li class="true">ALL</li>
				<li>STOCKS</li>
				<li>FX</li>
				<li>INDEXES</li>
				<li>FUNDS</li>
				<li>FUTURES</li>
			</ul>
			<cq-dropdown class="lookup"></cq-dropdown>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-lookup", Lookup);
}

};


let __js_webcomponents_lookupDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */





const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-lookup-dialog&gt;</h4>
 *
 * This dialog allows the search and selection of securities to load on the chart.
 * It supports both primary and secondary series (comparison) selection.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | filter       | Security type filter for search results. |
 *
 * In addition, the following attributes are also supported:
 * | attribute        | description |
 * | :--------------- | :---------- |
 * | comparison       | INdicates that the dialog is for secondary series (comparisons). |
 * | cq-maintain-case | Set to something falsey to force capitalization of symbol. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component whenever the search input is changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "search" |
 * | action | "input" |
 * | value | _search string_ |
 *
 * A custom event will be emitted by the component whenever the search string is activated (the symbol is loaded).
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | symbol | _symbol_ |
 * | name | _symbol description_ |
 * | exchDisp | _symbol exchange_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.LookupDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 8.8.0
 * - 9.1.0 Added emitter.
 */
class LookupDialog extends CIQ.UI.DialogContentTag {
	static get observedAttributes() {
		return ["filter"];
	}

	constructor(params = {}) {
		super();
		this.params = params;
		this.swatchColors = CIQ.UI.defaultSwatchColors;
		this.initialized = false;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, LookupDialog);
		this.constructor = LookupDialog;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		switch (name) {
			case "filter":
				if (this.form) {
					const { filter, symbol } = this.form.elements;
					filter.value = newValue;
					this.acceptText(symbol.value);
				}
				break;
		}
	}

	/**
	 * Handles accepted text by the input and sends text to Lookup Driver.
	 * Passes results to {@link WebComponents.LookupDialog#results}.
	 *
	 * @param {string} value Input text
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	acceptText(value) {
		this.params.driver.acceptText(value, this.filter, null, (results) =>
			this.results(results)
		);
		this.emitCustomEvent({
			action: "input",
			effect: "search",
			detail: { value }
		});
	}

	/**
	 * Opens the dialog tag and displays it over the chart. Works with the dialog channel.
	 * @param {object} params Dialog box parameters.
	 * @param {CIQ.UI.Context} params.context The chart user interface context.
	 * @param {HTMLElement} [params.caller] caller element that triggered the opening.
	 *
	 * @tsmember WebComponents.LookupDialog
	 *
	 * @since 9.0.0 respect caller element cq-maintain-case for symbols added from input box.
	 */
	open(params) {
		const { caller, context } = params;

		const isComparison = caller && caller.hasAttribute("comparison");
		if (isComparison && !context.stx.chart.symbol) {
			return;
		}
		this.maintainCase =
			caller &&
			!["false", "0", null].includes(caller.getAttribute("cq-maintain-case"));
		super.open(params);
		this.isComparison = isComparison;
		this.dialog.setTitle(isComparison ? "Add Comparison" : "Symbol Lookup");

		if (isComparison) {
			this.input.parentElement.parentElement.classList.add("comparison");
			CIQ.UI.pickSwatchColor(this, this.swatch);
		} else {
			this.input.parentElement.parentElement.classList.remove("comparison");
		}

		if (!this.filter) {
			const element = this.filters.firstElementChild;
			this.currentFilter = element;
			this.filter = element.innerText;
			element.classList.add("true");
			element.ariaChecked = "true";
		}

		this.dialog.setAttribute("native-tabbing", true);
		setTimeout(() => {
			// input is not in viewport until after parent dialog opens
			this.input.focus();
		}, 10);
	}

	/**
	 * Closes the dialog and resets the input.
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	close() {
		this.channelWrite("channel.lookup", false, this.context.stx);
		this.input.value = "";

		super.close();
	}

	/**
	 * Hides the dialog.  This performs UI cleanup of the color picker.
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	hide() {
		if (this.swatch.colorPicker) this.swatch.colorPicker.close();
	}

	/**
	 * Initializes the component the first time it has been opened.
	 * Sets all the default markup and adds listeners.
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	initialize() {
		this.addDefaultMarkup();

		this.form = this.querySelector("form");
		this.input = this.querySelector("cq-lookup-input input");
		this.filters = this.querySelector("cq-lookup-filters");
		this.resultList = this.querySelector(".ciq-lookup-results");
		this.resultTemplate = this.querySelector("template#lookupResult");
		this.swatch = this.querySelector("cq-swatch");
		this.submit = this.querySelector("[type=submit]");

		this.input.addEventListener("input", (e) => {
			this.acceptText(e.target.value);
		});

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			this.selectItem(this.input.value);
		});

		this.onClose = () => this.reset();

		this.initialized = true;

		if (CIQ.UI.scrollbarStyling) {
			CIQ.UI.scrollbarStyling.refresh(this.resultList, {
				maxScrollbarLength: 500
			});
		}

		this.addClaim(this);
		this.filters.addEventListener("click", this.setFilter.bind(this));
		this.filters.addEventListener("mousedown", (e) => {
			this.context.stx.ownerWindow.requestAnimationFrame(() => e.target.blur());
		});
		this.verticalStructure = LookupDialog.verticalStructure.map((selector) => {
			return this.querySelector(selector);
		});
	}

	/**
	 * Resets the dialog back to its default state with no search results
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	reset() {
		const { input, resultList } = this;
		input.value = "";

		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}
	}

	/**
	 * Processes the results returned from the {@link CIQ.ChartEngine.Driver.Lookup}
	 * @param {object[]} resultsArr
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	results(resultsArr) {
		const { resultList } = this;

		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}

		this.input.ariaExpanded = "false";

		resultsArr.forEach((result) => {
			const li = document.createElement("li");
			let { data, display } = result;

			li.classList.add("result");

			// Filter data by display array;
			let show = Object.entries(data).filter((entry) => {
				return display.find((d) => entry[1] === d);
			});
			li.innerHTML = itemize(
				show
					.map((entry) => {
						return `<span class="${entry[0]}">${entry[1]}</span>`;
					})
					.join("")
			);

			// Use stxtap so that scrolling doesn't select the item.
			CIQ.UI.stxtap(li.firstChild, () => this.selectItem(data));
			resultList.append(li);
		});

		this.input.ariaExpanded = "true";

		function itemize(inner) {
			return `<cq-item tabindex="0">${inner}</cq-item>`;
		}
	}

	/**
	 * Function that triggers when an item is selected from either the input or results list.
	 *
	 * @param {string|object} value Either the value of the item selected or a symbolObject containing the symbol.
	 *
	 * @tsmember WebComponents.LookupDialog
	 *
	 * @since 8.8.0 `value` param accepts a string or symbolObject.
	 */
	selectItem(value) {
		const symbolObject = (value.symbol && value) || { symbol: value };
		let symbolValue = value.symbol || value;
		// Do not allow a symbol that is empty or white space.
		if (
			!symbolValue ||
			typeof symbolValue !== "string" ||
			!symbolValue.trim().length
		)
			return;

		// Capitalize the symbol unless cq-maintain-case is set on invoking element
		if (!this.maintainCase) symbolValue = symbolValue.toUpperCase();
		symbolObject.symbol = symbolValue;

		const { stx, changeSymbol } = this.context;
		const { symbol } = stx.chart;

		if (this.isComparison) {
			// Do not allow a comparison of the same symbol as the main chart
			if (symbol.toLowerCase() === symbolValue.toLowerCase()) {
				stx.dispatch("notification", "duplicatesymbol");
				return;
			}
			stx.addSeries(symbolValue, {
				name: "comparison " + symbolValue,
				symbolObject,
				color: this.swatch.style.backgroundColor,
				isComparison: true
			});
		} else {
			changeSymbol(symbolObject);
		}
		this.emitCustomEvent({
			effect: "select",
			detail: value.symbol ? value : { symbol: value }
		});
		this.close();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	setContext(context) {
		this.context = context;

		this.dialog = this.closest("cq-dialog");
		this.dialog.setAttribute("native-tabbing", true);

		if (!this.params.driver) this.setDriver(context.lookupDriver);
		if (!this.initialized) this.initialize();
	}

	/**
	 * Sets a selected filter as the active filter that is applied to {@link WebComponents.LookupDialog#acceptText}
	 *
	 * @param {PointerEvent} e Emitted pointer event
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	setFilter(e) {
		if (this.currentFilter) this.currentFilter.classList.remove("true");
		this.currentFilter.ariaChecked = "false";

		const src = e.target;
		e.preventDefault();

		src.classList.add("true");
		src.ariaChecked = "true";
		this.filter = src.innerText;
		this.currentFilter = src;
	}

	/**
	 * Connects a {@link CIQ.ChartEngine.Driver.Lookup} to the web component.
	 *
	 * The lookup driver searches financial exchanges for symbols that match the text entered
	 * in the component's input field.
	 *
	 * @param {CIQ.ChartEngine.Driver.Lookup} driver The lookup driver to connect to the web
	 * 		component.
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	setDriver(driver) {
		this.params.driver = driver;
	}

	/**
	 * Handle the keystroke event to keyboard navigate the dialog.
	 * Arrow keys and Enter are supported.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.LookupDialog
	 */
	keyStroke(hub, key, e) {
		// Allow Dialog to handle color picker
		const topMenu = this.context.uiManager.topMenu();
		if (topMenu && topMenu.matches("cq-color-picker")) return;

		const active = this.ownerDocument.activeElement;
		const parent = active.parentElement;
		const findIdx = (items) => items.findIndex((item) => item === active);
		let items, idx, next, target;
		const vertialIdx = this.verticalStructure.findIndex((i) => {
			return i.contains(active);
		});

		const isItem = active.matches("cq-item");
		const isRadio = active.matches("[role=radio]");
		switch (key) {
			case "ArrowDown":
			case "Down":
				if (isRadio) {
					target = active.nextElementSibling;
					if (target) break;
				}
				if (isItem) {
					items = this.naturalTabElements(this.resultList);
					idx = findIdx(items);
					target = items[idx + 1];
				} else {
					next = this.verticalStructure[vertialIdx + 1];
					target = this.naturalTabElements(next)[0];
				}
				break;

			case "ArrowUp":
			case "Up":
				if (isRadio) {
					target = active.previousElementSibling;
					if (target) break;
				}
				if (isItem) {
					items = this.naturalTabElements(this.resultList);
					idx = findIdx(items);
					target = items[idx - 1];
					// Break out of the top of the resultList
					if (idx === 0) {
						next = this.verticalStructure[vertialIdx - 1];
						target = this.naturalTabElements(next)[0];
					}
				} else {
					next = this.verticalStructure[vertialIdx - 1];
					target = this.naturalTabElements(next)[0];
				}
				break;

			case "ArrowLeft":
			case "Left":
				target = active.previousElementSibling;
				break;

			case "ArrowRight":
			case "Right":
				target = active.nextElementSibling;
				break;

			case "Enter":
				if (parent === this.filters) this.setFilter(e);
				if (active === this.input || active === this.submit) {
					if (this.form.requestSubmit) this.form.requestSubmit();
					else this.form.dispatchEvent(new Event("submit"));
				}
				break;

			default:
				break;
		}
		if (target) {
			this.removeFocused(items);
			this.focusItem(target);
		}
	}
}

/**
 * Defines order of subsections within the component.
 *
 * @static
 * @type {String[]}
 *
 * @tsmember WebComponents.LookupDialog
 */
LookupDialog.verticalStructure = [
	"cq-lookup-input",
	"cq-lookup-filters",
	".ciq-lookup-results"
];

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.LookupDialog
 */
LookupDialog.markup = `
	<form role="search">
		<div class="ciq-search-container">
			<cq-lookup-input class="hide-label">
				<cq-lookup-icon></cq-lookup-icon>
				<label id="lookup_dialog_input_label">Input Search Text</label>
				<input type="text"
					spellcheck="false"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="none"
					name="symbol"
					placeholder=""
					role="combobox"
					aria-expanded="false"
					aria-labelledby="lookup_dialog_input_label"
				>
			</cq-lookup-input>
			<cq-swatch-input class="hide-label">
				<label id="lookup_dialog_swatch_label">Comparison Series Color</label>
				<cq-swatch tabindex="0" name="color" aria-labelledby="lookup_dialog_swatch_label"></cq-swatch>
				<input name="color" type="hidden"/>
			</cq-swatch-input>
			<button type="submit" class="ciq-btn">GO</button>
		</div>
		<cq-lookup-filters role="group" aria-label="Search Result Filters">
			<button type="button" class="ciq-filter" role="radio">ALL</button>
			<button type="button" class="ciq-filter" role="radio">STOCKS</button>
			<button type="button" class="ciq-filter" role="radio">FX</button>
			<button type="button" class="ciq-filter" role="radio">INDEXES</button>
			<button type="button" class="ciq-filter" role="radio">FUNDS</button>
			<button type="button" class="ciq-filter" role="radio">FUTURES</button>
		</cq-lookup-filters>
		<input type="hidden" name="filter" />
	</form>
	<ul class="ciq-lookup-results" aria-label="Results"></ul>
	<template id="lookupResult">
		<li><span></span></li>
	</template>
	`;
CIQ.UI.addComponentDefinition("cq-lookup-dialog", LookupDialog);

};


let __js_webcomponents_marker_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-marker&gt;</h4>
 *
 * This is an implementation of the ContextTag that gets positioned as a marker.
 * This is similar the `cq-marker` attribute found on some webcomponents, except sometimes there
 * is a need to identify a certain group of DOM nodes as a marker.
 * For this reason, this component wraps around the DOM nodes in order that it be converted into a marker.
 *
 * @example <caption>Full-screen navigation menu as marker</caption>
 * 	<cq-marker class="chart-control-group full-screen-show">
 *		<cq-toggle class="ciq-lookup-icon" config ="symbolsearch" reader="Symbol Search" tooltip="Symbol Search" icon="search" help-id="search_symbol_lookup"></cq-toggle>
 *		<cq-toggle class="ciq-comparison-icon" config ="symbolsearch" reader="Add Comparison" tooltip="Add Comparison" icon="compare" help-id="add_comparison" comparison="true"></cq-toggle>
 *		<cq-toggle class="ciq-draw" member="drawing" reader="Draw" icon="draw" tooltip="Draw" help-id="drawing_tools_toggle"></cq-toggle>
 *		<cq-toggle class="ciq-CH" config="crosshair" reader="Crosshair" icon="crosshair" tooltip="Crosshair (Alt + \)"></cq-toggle>
 *		<cq-toggle class="ciq-DT" feature="tableview" member="tableView" reader="Table View" icon="tableview" tooltip="Table View"></cq-toggle>
 *		<cq-menu class="nav-dropdown ciq-period" config="period" text binding="Layout.periodicity"></cq-menu>
 *	</cq-marker>
 *
 * @alias WebComponents.Marker
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 9.1.0
 */
class Marker extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Marker);
	}
}

CIQ.UI.addComponentDefinition("cq-marker", Marker);

};


let __js_webcomponents_measurementLineSettingsDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-measurementline-settings-dialog&gt;</h4>
 *
 * Additional dialog for setting measurement line settings, specifically what is to appear in the callout for the measurement line drawing tool.
 *
 * A custom event will be emitted from the component when any of its fields are changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | field | _name of field toggled_ |
 * | value | _true or false_ |
 *
 * @alias WebComponents.MeasurementlineSettingsDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 8.9.0
 * - 9.1.0 Added emitter.
 */
class MeasurementlineSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, MeasurementlineSettingsDialog);
		this.constructor = MeasurementlineSettingsDialog;
	}

	/**
	 * Ensures that when the dialog is opened the input field is populated with the correct value.
	 * Also installs a listener to report changes to the value so the drawing can get updated.
	 *
	 * @param {Object} params parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 * @since 8.9.0
	 *
	 * @tsmember WebComponents.MeasurementlineSettingsDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);

		if (params) this.opener = params.caller;
		const { currentVectorParameters: vectorParams } = this.context.stx;
		const settings = vectorParams.measurementline || {};
		const inputFieldHover = this.querySelector(
			'div[fieldname="hoverdisplay"] input'
		);
		inputFieldHover.checked = settings.calloutOnHover;
		if (inputFieldHover.changeHandler)
			inputFieldHover.removeEventListener(
				"change",
				inputFieldHover.changeHandler
			);

		inputFieldHover.changeHandler = ({ target }) => {
			const checkedState = target.checked;

			settings.calloutOnHover = checkedState;
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.opener.dispatchEvent(event);
			this.emitCustomEvent({
				effect: "select",
				detail: {
					field: "hoverdisplay",
					value: checkedState
				}
			});
		};

		inputFieldHover.addEventListener("change", inputFieldHover.changeHandler);

		Object.keys(settings.displayGroups).forEach((groupName) => {
			const inputField = this.querySelector(
				`div[fieldname="${groupName}"] input`
			);
			if (!inputField) return;
			inputField.checked = settings.displayGroups[groupName];
			inputField.groupName = groupName;
			if (inputField.changeHandler)
				inputField.removeEventListener("change", inputField.changeHandler);

			inputField.changeHandler = ({ target }) => {
				const { checked, groupName } = target;

				settings.displayGroups[groupName] = checked;
				const event = new Event("change", {
					bubbles: true,
					cancelable: true
				});
				this.opener.dispatchEvent(event);
				this.emitCustomEvent({
					effect: "select",
					detail: {
						field: groupName,
						value: checked
					}
				});
			};

			inputField.addEventListener("change", inputField.changeHandler);
		});
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.MeasurementlineSettingsDialog
 */
MeasurementlineSettingsDialog.markup = `
	<cq-scroll cq-no-maximize>
		<div class="ciq-drawing-dialog-setting" fieldname="hoverdisplay">
			<div class="ciq-heading">Display Info on Hover</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>

		<div class="ciq-drawing-dialog-setting" fieldname="bars">
			<div class="ciq-heading"># Bars</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="delta">
			<div class="ciq-heading">Delta (% Delta)</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="annpercent">
			<div class="ciq-heading">Annualized %</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<!--<div class="ciq-drawing-dialog-setting" fieldname="totreturn">
			<div class="ciq-heading">Total Return</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>-->
		<div class="ciq-drawing-dialog-setting" fieldname="volume">
			<div class="ciq-heading">Volume</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
		<div class="ciq-drawing-dialog-setting" fieldname="studies">
			<div class="ciq-heading">Studies</div>
			<div class="stx-data">
				<input type="checkbox">
			</div>
		</div>
	</cq-scroll>
	<div class="ciq-dialog-cntrls">
		<div class="ciq-btn" stxtap="close()">Done</div>
	</div>
`;
CIQ.UI.addComponentDefinition(
	"cq-measurementline-settings-dialog",
	MeasurementlineSettingsDialog
);

};


let __js_webcomponents_menu_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-menu&gt;</h4>
 *
 * When tapped/clicked, this component will reveal or hide a dropdown menu.
 * The component is represented by either text, an icon, both, or either depending on the browser dimensions.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | binding       | Helper function to call which will register a listener when the menu is opened/closed.  Usually used to reflect the current menu selection as text or an icon. |
 * | config        | Key pointing to a configuration file entry which specifies the menu options. |
 * | help-id       | A key to the correct help text in CIQ.Help.Content. |
 * | icon          | Class name for image to use for the menu. |
 * | reader        | Accessibility text when focused by a screen reader. If omitted, will use value of `text` attribute. |
 * | responsive    | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
 * | state         | The current state of the menu. |
 * | text          | Displayed label for this menu. |
 * | tooltip       | Text for the tooltip which appears when hovering over the component. |
 * | lift-dropdown | Lifts dropdown to the top level of the css stacking context. |
 *
 * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
 *
 * In addition, the following attributes are also supported:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | cq-focus    | A selector to an element within the menu for which to provide focus. |
 * | cq-no-close | Set to true to force the menu to stay open when clicking on something in it (deprecated). |
 *
 * If no markup is specified in the menu component, a default markup will be provided.
 * In order to use the default markup, the selections in the menu's dropdown must be configured in the chart configuration file and specified
 * by key in the `config` attribute.  See example.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "open", "close" |
 * | action | "click" |
 *
 * `cause` and `action` are set only when the menu is opened or closed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Menu with binding:</caption>
 * <cq-menu class="nav-dropdown ciq-period" config="period" binding="Layout.periodicity" text="Periodicity"></cq-menu>
 * @example <caption>Menu with responsive icon:</caption>
 * <cq-menu class="nav-dropdown ciq-markers alignright" config="markers" text="Events" icon="events" responsive tooltip="Events"></cq-menu>
 * @example <caption>Sample configuration of a menu:</caption>
 * // set the menu component's config attribute to "example"
 * // This is documented further in the cq-dropdown component
 * stxx.uiContext.config.menus.example = {
 * 		content: [
 *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
 *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
 * 		]
 * };
 *
 * @alias WebComponents.Menu
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Menu extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return [
			"binding",
			"config",
			"help-id",
			"icon",
			"reader",
			"responsive",
			"state",
			"text",
			"tooltip",
			"lift-dropdown"
		];
	}

	/**
	 * READ ONLY. The value of the `cq-focus` attribute.
	 *
	 * @type {String}
	 * @since 7.5.0
	 * @tsmember WebComponents.Menu
	 * @tsdeclaration
	 * const focusElement : String
	 */
	get focusElement() {
		return this.getAttribute("cq-focus");
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
		this.activeClassName = "stxMenuActive";
		this.active = false;
		this.adjustLiftPosition = this.adjustLiftPosition.bind(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.uiManager = CIQ.UI.getUIManager(this);

		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);
		this.setMarkup();
		this.setupShadow();

		if (!this.listenersAdded) {
			this.addEventListener("stxtap", (e) => this.captureTap(e), true);
			CIQ.UI.stxtap(this, (e) => this.tap(e));
			this.listenersAdded = true;
		}

		window.addEventListener("resize", this.adjustLiftPosition);
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Menu);
		this.constructor = Menu;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Menu
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		const isLifted = this.lifts;
		if (isLifted) this.unlift();
		if (name === "state") this.processStateChange();
		else if (this.usingMarkup) {
			this.setMarkup();
		} else {
			// do nothing when using predefined content
		}
		if (isLifted) this.lift();
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		window.removeEventListener("resize", this.adjustLiftPosition);
		super.disconnectedCallback();
	}

	/**
	 * Captures a tap event *before* it descends down to what it is clicked on. The key thing this does is determine
	 * whether the thing clicked on was inside of a "cq-no-close" section. We do this on the way down, because the act
	 * of clicking on something may release it from the dom, making it impossible to figure out on propagation.
	 * @param {Event} e Event
	 * @private
	 *
	 * @tsmember WebComponents.Menu
	 */
	captureTap(e) {
		const clickedMenuIcons = () => {
			const bounds = this.getBoundingClientRect();
			return (
				e.pageX >= bounds.left &&
				e.pageX <= bounds.right &&
				e.pageY >= bounds.top &&
				e.pageY <= bounds.bottom
			);
		};

		// Determine if the tapped element has menu persistence enabled
		const composedPath = e.composedPath();
		// this === composedPath[0] means that means user clicked on non-clickable portion of dropdown, if clickedMenuIcons() returns false
		this.noClose =
			(this === composedPath[0] && !clickedMenuIcons()) ||
			composedPath.some((el) => {
				const attr = el.getAttribute && el.getAttribute("cq-no-close");
				return (
					(attr !== null && attr !== undefined && attr !== "false") ||
					(el.params && el.params.menuPersist)
				);
			});

		// Old stuff
		// Determine if the tapped element was inside of something untappable, like a cq-heading or cq-separator
		if (!this.noClose) {
			this.noClose = e.composedPath().some((el) => {
				return el.matches && el.matches("cq-separator,cq-heading");
			});
		}
	}

	/**
	 * Closes the menu.  This call will be passed to the UI Manager to close any parent menus.
	 *
	 * @tsmember WebComponents.Menu
	 */
	close() {
		this.uiManager.closeMenu(this);
	}

	/**
	 * Returns the menu to its collapsed state.  This will restore any lifts as well.
	 * This is called indirectly by {@link WebComponents.Menu#close}.
	 *
	 * @tsmember WebComponents.Menu
	 */
	hide() {
		if (!this.active) return;
		this.unlift();
		this.classList.remove(this.activeClassName);
		this.setAriaPressed();
		const screenReaderButton = this.root.querySelector("[aria-expanded]");
		if (screenReaderButton) screenReaderButton.ariaExpanded = false;
		this.active = false;
		this.state = "closed";
		// blur any input boxes that are inside the menu we're closing, to get rid of soft keyboard
		this.qsa("input", this, true).forEach((i) => {
			if (i === CIQ.getActiveElement()) i.blur();
		});
		this.root.querySelectorAll("cq-lookup").forEach((s) => {
			s.classList.remove("active");
		});
		// Disable keyboardNavigation controls in the dropdown
		const dropdown = this.root.querySelector("cq-dropdown, cq-menu-dropdown");
		if (dropdown) {
			dropdown.disablekeyboardNavigation();
		}
		if (this.ownerDocument.body.keystrokeHub) {
			let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
			if (tabActiveModals[0])
				this.ownerDocument.body.keystrokeHub.setKeyControlElement(
					tabActiveModals[0]
				);
		}

		// Close the lookup component
		const lookup = this.root.querySelector("cq-lookup");
		if (lookup) lookup.close();
	}

	/**
	 * Repositions any menus which are nested within another menu or dialog so that they do not get cut off by their container's
	 * boundaries.  Lifts are menu dropdowns which have an attribute `cq-lift`.
	 *
	 * @tsmember WebComponents.Menu
	 */
	lift() {
		const findLifts = () => {
			return [...this.querySelectorAll("*[cq-lift]")].filter((lift) => {
				// only valid if the closest cq-menu or cq-dialog parent is the menu itself
				// otherwise the lift is in a nested menu
				return CIQ.climbUpDomTree(lift, "cq-menu,cq-dialog", true)[0] == this;
			});
		};
		const context = CIQ.UI.getMyContext(this);
		const lifts = (this.lifts = findLifts());
		lifts.forEach((lift) => {
			// The lifted menu will no longer inherit the active theme class. Attach it directly to the element.
			if (context && context.config && context.config.themes) {
				let themes = Object.keys(context.config.themes.builtInThemes);
				// First remove any existing theme classes on the dialog
				lift.classList.remove(...themes);
				let activeTheme = themes.find(
					(r) => context.topNode.classList.contains(r) === true
				);
				// Add the active theme class to the dialog
				if (activeTheme) lift.classList.add(activeTheme);
			}

			const scrollElement = lift.closest("cq-scroll"); // TODO: cq-dialog has built-in scrolling?  Change element
			if (scrollElement) {
				lift.boundResize = lift.resize.bind(lift);
				scrollElement.addEventListener("scroll", this.adjustLiftPosition);
				scrollElement.addEventListener("scroll", lift.boundResize);
			}

			this.uiManager.lift(lift);
			lift.remember.scrollParent = scrollElement;
			// Focus the lifted menu
			setTimeout(() => {
				const root = lift.contentRoot || lift;
				root.tabIndex = -1;
				root.focus();
			}, 10);
			this.adjustLiftPosition();
		});
	}

	/**
	 * Computes the positioning for lifted menu dropdowns.
	 *
	 * @tsmember WebComponents.Menu
	 */
	adjustLiftPosition() {
		if (!this.lifts) return;
		this.lifts.forEach((lift) => {
			const { parentNode } = lift.remember;
			const rect = parentNode.getBoundingClientRect();
			const PARENT_BORDER_WIDTH = 1;

			lift.style.top = rect.bottom - PARENT_BORDER_WIDTH + "px";
			lift.style.left = rect.left + "px";
		});
	}

	/**
	 * Callback handler for when the keyboard navigation is removed from the element.
	 * This implementation closes the menu.
	 *
	 * @tsmember WebComponents.Menu
	 */
	onKeyboardDeselection() {
		this.close();
	}

	/**
	 * Opens the menu.  This call will be passed to the UI Manager to handle any overhead associated with menu opening.
	 *
	 * @param {object} params Menu configuration parameters
	 * @param {Event} params.e The event triggering the menu open.
	 *
	 * @tsmember WebComponents.Menu
	 */
	open(params) {
		this.uiManager.openMenu(this, params);
	}

	/**
	 * Opens or closes the menu if the attribute changes.
	 * @private
	 *
	 * @tsmember WebComponents.Menu
	 */
	processStateChange() {
		switch (this.state) {
			case "open":
				if (!this.active) this.open();
				break;
			case "closed":
				if (this.active) this.close();
				break;
			default:
				return;
		}
		this.emitCustomEvent({
			action: this.clicked ? "click" : null,
			effect: this.state
		});
	}

	/**
	 * Sets the content.
	 *
	 * @param {object[]} content Menu content.
	 * @param {boolean} [lift] Set to true to lift the menu dropdown.
	 *
	 * @tsmember WebComponents.Menu
	 */
	setContent(content, lift) {
		this.content = content;
		this.liftAttribute = lift;
		if (this.attached) this.setMarkup();
	}

	/**
	 * Sets the aria-pressed attribute.
	 *
	 * @param {boolean} [on] Set to true to set the aria attribute.
	 *
	 * @tsmember WebComponents.Menu
	 */
	setAriaPressed(on) {
		const ariaElem = this.root.querySelector("[aria-pressed]");
		if (ariaElem) {
			ariaElem.ariaPressed = !!on;
		}
	}

	/**
	 * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
	 *
	 * @tsmember WebComponents.Menu
	 */
	setMarkup() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			let markup = this.markup || this.constructor.markup;
			const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
			if (names)
				names.forEach((name) => {
					const key = name.substring(2, name.length - 2);
					if (key.includes("_class")) return;
					const attr = this[key];
					if (attr == null) {
						if (key === "reader" && this.text)
							markup = markup.replace(name, this.text);
						else if (key === "icon") markup = markup.replace(name, "hidden");
						else if (key === "help-id")
							markup = markup.replace(/\{\{help_class\}\}/g, "hidden");
						else if (key === "text")
							markup = markup.replace("{{label_class}}", "hidden");
						else if (key === "tooltip")
							markup = markup.replace("{{tooltip_class}}", "hidden");
						else markup = markup.replace(name, "");
					} else {
						if (key === "help-id")
							markup = markup.replace(/\{\{help_class\}\}/g, "");
						else if (key === "text")
							markup = markup.replace("{{label_class}}", "");
						else if (key === "tooltip")
							markup = markup.replace("{{tooltip_class}}", "");
						else if (key === "responsive")
							markup = markup.replace("{{responsive}}", "responsive");
						else if (key === "lift-dropdown")
							markup = markup.replace("{{lift-dropdown}}", "cq-lift");
						markup = markup.replace(name, attr);
					}
				});
			this.addDefaultMarkup(null, markup);

			if (this.content && !this.config) {
				const dropDown = this.root.querySelector("cq-dropdown");
				if (dropDown) {
					dropDown.content = this.content;
					dropDown.noscroll = this.noscroll;
					dropDown.populate();
					if (this.liftAttribute) dropDown.setAttribute("cq-lift", "");
				}
			}

			const iconSpan = this.qsa(".menu-clickable .icon", this, true)[0];
			if (iconSpan && this.binding && this.hasAttribute("icon")) {
				iconSpan.setAttribute("ciq-menu-icon", "");
				this.classList.add("ciq-menu-icon");
			} else {
				this.classList.remove("ciq-menu-icon");
			}
		}
	}

	/**
	 * Expands the menu.
	 * This is called indirectly by {@link WebComponents.Menu#open}.
	 *
	 * @tsmember WebComponents.Menu
	 */
	show() {
		if (this.active) return;
		this.active = true;
		this.classList.add(this.activeClassName);
		this.state = "open";
		this.setAriaPressed(true);
		const screenReaderButton = this.root.querySelector("[aria-expanded]");
		if (screenReaderButton) screenReaderButton.ariaExpanded = true;
		this.lift();
		this.root.querySelectorAll("cq-lookup").forEach((s) => {
			s.classList.add("active");
		});
		// For good measure, call resize on any nested scrollables to give them
		// a chance to change their height and scrollbars
		this.root.querySelectorAll("cq-dropdown").forEach((s) => s.resize());
		// Pass keyboard navigation over to the dropdown if it exists
		if (this.ownerDocument.body.keystrokeHub) {
			const dropdown = this.root.querySelector("cq-dropdown");
			if (dropdown)
				this.ownerDocument.body.keystrokeHub.setKeyControlElement(
					dropdown,
					true
				);
		}
	}

	/**
	 * Handler for the stxtap event which is fired in non-capture mode.  This means it fires after {@link WebComponents.Menu@captureTap}.
	 * Will alternate between opening and closing the menu.
	 *
	 * @param {Event} e Event
	 *
	 * @tsmember WebComponents.Menu
	 */
	tap(e) {
		e.stopPropagation();
		const doc = this.document || document;
		if (e.ciqStamp && e.ciqStamp <= doc.lastTap) return; // stopPropagation not working on Safari with VO
		this.clicked = true;
		const { uiManager } = this;
		if (this.active) {
			// tapping on the menu if it is open will close it
			if (!this.noClose) {
				uiManager.closeMenu(this);
			}
		} else {
			// if we've clicked on the label for the menu, then open the menu

			// If the tap came from within this menu's cq-dropdown then this is probably an accidental
			// "re-open", which occurs when a click on a menu item causes an action that closes the menu, tricking
			// it into thinking it should re-open
			const insideDropdown = e
				.composedPath()
				.includes(this.root.querySelector("cq-dropdown"));
			if (insideDropdown) return;

			let child = false;
			e.composedPath()
				.filter((el) => el.matches && el.matches("cq-menu"))
				.forEach((parent) => {
					if (parent.active) child = true;
				});

			if (!child) {
				const isInDialog = CIQ.climbUpDomTree(e.target, "cq-dialog", true)[0];
				uiManager.closeMenu(
					null,
					"cq-menu,cq-color-picker" + (isInDialog ? "" : ",cq-dialog")
				); // close all menus or color pickers, unless we're the child of an active menu (cascading)
			}
			this.open({ e });

			if (this.focusElement && !CIQ.isMobile) {
				const el = this.qsa(this.focusElement, this, true)[0];
				if (el) el.focus();
				const dropdown = this.qsa("cq-dropdown", this, true)[0];
				if (dropdown) dropdown.setFocus(this.focusElement);
			}
		}
		delete this.clicked;
	}

	/**
	 * Restores any menus that were lifted using {@link WebComponents.Menu#lift}.
	 * This is usually done automatically when the menu is closed.
	 *
	 * @tsmember WebComponents.Menu
	 */
	unlift() {
		const restoreLift = (element) => {
			if (!element) return;
			const { remember } = element;
			const scrollElement = remember.scrollParent;
			if (scrollElement) {
				scrollElement.removeEventListener("scroll", this.adjustLiftPosition);
				scrollElement.removeEventListener("scroll", element.boundResize);
			}

			element.doNotDisconnect = true;
			element.remove();
			delete element.doNotDisconnect;
			Object.assign(element.style, remember.css);
			remember.parentNode.appendChild(element);
		};
		const { lifts } = this;
		if (!lifts) return;
		lifts.forEach((lift) => restoreLift(lift));
		this.lifts = null;
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
 * | binding       | from attribute value |
 * | config        | from attribute value |
 * | reader        | from attribute value |
 * | icon          | from attribute value |
 * | text          | from attribute value |
 * | responsive    | from attribute value |
 * | help-id       | from attribute value |
 * | tooltip       | from attribute value |
 * | tooltip_class | "hidden" if `tooltip` attribute not specified |
 * | help_class    | "hidden" if `help-id` attribute not specified |
 * | label_class   | "hidden" if `text` attribute not specified |
 * | lift-dropdown | replaces the attribute value with a setting to lift the dropdown to the top level of the css stacking context |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Menu
 */
Menu.markup = `
		<div class="menu-clickable {{responsive}}" aria-hidden="true">
			<cq-help class="{{help_class}}" help-id="{{help-id}}" aria-hidden="true"></cq-help>
			<span class="icon {{icon}}">
				<div cq-tooltip class="{{tooltip_class}}" aria-hidden="true">{{tooltip}}</div>
			</span>
			<span class="{{label_class}}" label stxbind="{{binding}}">{{text}}</span>
		</div>
		<div class="ciq-screen-reader">
			<button type="button" aria-haspopup="menu" aria-expanded="false" tabindex="-1">{{reader}}</button>
			<em class="help-instr {{help_class}}">(Help available, press question mark key)</em>
		</div>
		<cq-dropdown config="{{config}}" {{lift-dropdown}}></cq-dropdown>
	`;

CIQ.UI.addComponentDefinition("cq-menu", Menu);

};


let __js_webcomponents_messageToaster_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-message-toaster&gt;</h4>
 *
 * Displays pop-up messages, also known as toasts.
 *
 * Listens for a chart engine event of type "notification" and displays the notification as a
 * pop-up message over the chart.
 *
 * To trigger the notification event, call {@link CIQ.ChartEngine#dispatch} with the
 * "notification" type and the required notification listener data (see
 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}), for example:
 * ```
 * stxx.dispatch("notification", { message: "A toast!" });
 * ```
 *
 * Toasts are displayed immediately unless another toast is already on screen. Concurrent toasts
 * are displayed sequentially, not simultaneously.
 *
 * When a toast is created, it's added to a display queue. The toast at the front of the queue is
 * dequeued and displayed when no other toasts are on screen. Toasts can be prioritized (that is,
 * reordered in the queue) by setting the `priority` parameter of the
 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener} argument.
 *
 * _**Attributes**_:
 *
 * | Name | Description | Valid Values |
 * | ---- | ----------- | ------------ |
 * | `default-display-time` | Amount of time, in seconds, toasts are displayed before being automatically dismissed (removed from the display). | Integer numbers >= 0. A value of 0 causes toasts to remain on screen &mdash; blocking the toast display queue &mdash; until selected by the user. |
 * | `default-position` | Vertical on-screen position of toasts relative to the chart. (Toasts are centered horizontally.) | "top" or "bottom" |
 * | `default-transition` | Animation used to display and dismiss toasts. | "fade", "slide", "pop" or "drop" | The default is no transition.
 *
 * **Note:** All attributes can be overridden by the argument provided to
 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a toast message is dismissed due to either:
 * - click (user interaction)
 * - alert (internal removal request)
 * - timeout (expiration)
 *
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction", "alert", "timeout" |
 * | effect | "remove" |
 * | action | "click", null |
 * | displayTime | _time before automatically dismissing_ |
 * | message | _toast message_ |
 * | priority | _toast priority_ |
 * | type | _toast style_ |
 *
 * A custom event will be emitted by the component when a toast message is displayed, or removed from the message queue.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "alert" |
 * | effect | "display", "recall" |
 * | action | null |
 * | displayTime | _time before automatically dismissing_ |
 * | message | _toast message_ |
 * | priority | _toast priority_ |
 * | type | _toast style_ |
 *
 * @example
 * <cq-message-toaster
 *     default-display-time="10"
 *     default-transition="slide"
 *     default-position="top"
 * </cq-message-toaster>
 *
 * @alias WebComponents.MessageToaster
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 8.2.0 Added
 * - 9.1.0 Observes attributes. Added emitter.
 */
class MessageToaster extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["default-display-time", "default-transition", "default-position"];
	}

	constructor() {
		super();
	}

	/**
	 * Initializes the message toaster web component.
	 *
	 * @private
	 * @since 8.2.0
	 * @tsmember WebComponents.MessageToaster
	 */
	connectedCallback() {
		super.connectedCallback();

		this.messageQueue = [];
		this.displayTimer = null;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, MessageToaster);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.MessageToaster
	 */
	setContext(context) {
		// Listen for notification events from the chartEngine
		context.stx.addEventListener("notification", (params) => {
			this.newMessage(params);
		});

		this.addInjection("append", "resizeChart", () => this.handleResize());
	}

	/**
	 * Updates the position settings of all toasts (all DOM elements with class
	 * `cq-toast-message`), including those not currently displayed, when the chart is resized.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	handleResize() {
		for (let idx = 0; idx < this.messageQueue.length; idx++) {
			if (this.messageQueue[idx].isDisplayed)
				this.positionElement(this.messageQueue[idx]);
		}
	}

	/**
	 * Sets the display position of the toast identified by `messageElement` within the bounds of
	 * the chart canvas. Centers the toast horizontally and positions it vertically based on the
	 * toast's <a href="WebComponents.MessageToaster.html#createMessageElement">
	 * <code class="codeLink">position</code></a> setting.
	 *
	 * @param {HTMLElement} messageElement The toast DOM element to position.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	positionElement(messageElement) {
		const canvasBounds = this.context.stx.chart.canvas.getBoundingClientRect();
		const contextBounds = this.context.topNode.getBoundingClientRect();
		const bottomAlign = messageElement.classList.contains("align-bottom");

		let offsetTop = canvasBounds.top - contextBounds.top;
		let offsetLeft = canvasBounds.left - contextBounds.left;

		Object.assign(messageElement.style, {
			top: bottomAlign
				? offsetTop + canvasBounds.height + "px"
				: offsetTop + "px",
			left: offsetLeft + canvasBounds.width * 0.5 + "px"
		});
	}

	/**
	 * Creates a new toast DOM element. Toast elements have the `cq-toast-message` class attribute.
	 *
	 * @param {object} notification Data object from a "notification" event. See
	 * 		[notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
	 * 		<p>**Note:** This parameter does not accommodate the string type specified in
	 * 		[notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
	 * @param {string} notification.message Text to display in the toast notification. Strings
	 * 		longer than 160 characters are truncated.
	 * @param {string} [notification.position="top"] Position of the toast on the chart: "top" or
	 * 		"bottom". Overrides the `default-position` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.type="info"] Toast style: "info", "error", "warning", or
	 * 		"confirmation". Overrides the `default-transition` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.transition] Type of animation used to display and dismiss the
	 * 		toast: "fade", "slide", "pop" or "drop". The default is no transition.
	 * @param {number} [notification.displayTime=10] Number of seconds to display the toast before
	 * 		automatically dismissing it. A value of 0 causes the toast to remain on
	 * 		screen&nbsp;&mdash;&nbsp;preventing other toasts from
	 * 		displaying&nbsp;&mdash;&nbsp;until the toast is selected by the user. Overrides the
	 * 		`default-display-time` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {number} [notification.priority=0] Priority of the toast relative to others in the
	 * 		display queue. Higher priority toasts are displayed before toasts with lower priority.
	 * 		For example, a toast with priority&nbsp;=&nbsp;4 is displayed before a toast with
	 * 		priority&nbsp;=&nbsp;1. Toasts with the same priority are displayed in the order
	 * 		they were created; that is, in the order they entered the display queue.
	 * @param {Function} [notification.callback] Function to call when the toast is selected
	 * 		(dismissed) by the user. If the toast is dismissed automatically (see `displayTime`),
	 * 		this function is not called.
	 * @return {HTMLElement} A toast DOM element.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	createMessageElement(notification) {
		if (!notification.message) return;

		let {
			message,
			position,
			type,
			transition,
			displayTime,
			priority,
			callback
		} = notification;

		let defaultDisplayTime = +this.getAttribute("default-display-time"); // Time in seconds
		if (isNaN(defaultDisplayTime)) defaultDisplayTime = 10;
		const defaultMessagePosition =
			this.getAttribute("default-position") || "top";
		const defaultMessageTransition =
			this.getAttribute("default-transition") || ""; // Default is no transition
		// A value of 0 will prevent the message from removing automatically.
		if (displayTime !== 0) displayTime = displayTime || defaultDisplayTime;
		position = position || defaultMessagePosition;
		transition = transition || defaultMessageTransition;
		priority = priority || 0;
		type = type || "info";

		// Truncate a string longer than 160 characters
		if (message.length > 160) {
			message = message.slice(0, 160) + "...";
		}

		let messageElement = document.createElement("div");
		messageElement.innerHTML = `
			<div class="cq-message-container">
				<div class="cq-message-icon"></div>
				<div class="cq-message-text"></div>
			</div>`;
		let textElement = messageElement.querySelector(".cq-message-text");
		CIQ.makeTranslatableElement(textElement, this.context.stx, message);
		messageElement.classList.add("cq-toast-message");
		messageElement.classList.add("type-" + type);
		messageElement.setAttribute("aria-label", "Toast Message");
		messageElement.setAttribute("role", "alert");
		if (transition)
			messageElement.classList.add("animate", "transition-" + transition);
		if (position == "bottom") messageElement.classList.add("align-bottom");
		messageElement.displayTime = displayTime;
		messageElement.priority = priority;
		messageElement.message = message;
		messageElement.type = type;

		CIQ.safeClickTouch(
			messageElement,
			function (messageElement, callback, event) {
				event.stopPropagation();
				if (callback) callback();
				this.removeMessageNode(messageElement, "click");
			}.bind(this, messageElement, callback)
		);

		this.positionElement(messageElement);

		return messageElement;
	}

	/**
	 * Displays the next toast in the display queue and sets a timer based on the toast
	 * <a href="WebComponents.MessageToaster.html#newMessage"><code class="codeLink">
	 * displayTime</code></a> property to automatically dismiss the toast.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	displayNextMessage() {
		if (!this.messageQueue.length) return;

		let messageNodes = this.context.topNode.querySelector(".cq-toast-message");
		if (!messageNodes) {
			let nextMessage = this.messageQueue[0];
			// Toast Message nodes are added to the body to ensure they appear over all other UI elements (e.g. Dialogs)
			this.context.topNode.appendChild(nextMessage);
			nextMessage.isDisplayed = true;
			this.emitCustomEvent({
				emitter: this,
				action: null,
				cause: "alert",
				effect: "display",
				detail: (({ displayTime, priority, message, type }) => ({
					displayTime,
					priority,
					message,
					type
				}))(nextMessage)
			});
			if (nextMessage.displayTime !== 0) {
				this.displayTimer = window.setTimeout(
					this.removeMessageNode.bind(this, nextMessage, "timeout"),
					nextMessage.displayTime * 1000
				);
			}
		}
	}

	/**
	 * Removes the toast specified by `messageNode` from the display queue and displays the next
	 * message in the queue.
	 *
	 * @param {HTMLElement} messageNode The toast to remove from the display queue.
	 * @param {string} [reason] The reason for the removal. Ex: "click" or "timeout".
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	removeMessageNode(messageNode, reason) {
		if (messageNode.classList.contains("hide")) return;

		messageNode.classList.add("hide");
		let delayTime = messageNode.classList.contains("animate") ? 500 : 0;

		window.setTimeout(() => {
			// Remove the node from the dom
			messageNode.remove();
			this.emitCustomEvent({
				emitter: this,
				action: reason === "click" ? "click" : null,
				cause: reason === "click" ? "useraction" : reason || "alert",
				effect: "remove",
				detail: (({ displayTime, priority, message, type }) => ({
					displayTime,
					priority,
					message,
					type
				}))(messageNode)
			});
			// Remove the node from the queue
			this.messageQueue.splice(this.messageQueue.indexOf(messageNode), 1);
			if (this.displayTimer)
				this.displayTimer = window.clearTimeout(this.displayTimer);
			this.displayNextMessage();
		}, delayTime);
	}

	/**
	 * Removes the toast specified by `messageNode` from the DOM but not from the display queue.
	 *
	 * Use this function to interrupt a toast and display one of higher priority. The interrupted
	 * toast is re-displayed by the next call to
	 * [displayNextMessage](WebComponents.MessageToaster.html#displayNextMessage).
	 *
	 * @param {HTMLElement} messageNode The toast to recall.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	recallMessageNode(messageNode) {
		if (messageNode.isDisplayed) {
			if (this.displayTimer)
				this.displayTimer = window.clearTimeout(this.displayTimer);
			messageNode.isDisplayed = false;
			this.context.topNode.removeChild(messageNode);
			this.emitCustomEvent({
				emitter: this,
				action: null,
				cause: "alert",
				effect: "recall",
				detail: (({ displayTime, priority, message, type }) => ({
					displayTime,
					priority,
					message,
					type
				}))(messageNode)
			});
		}
	}

	/**
	 * Creates a new toast and adds it to a queue that determines the display sequence of
	 * concurrent toasts.
	 *
	 * This function is the "notification" event listener. See
	 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
	 *
	 * @param {object|string} notification Either an object containing data relevant to the
	 * 		notification event or a string that identifies a property of the `systemMessages`
	 * 		property of the chart configuration object. The property contained in `systemMessages`
	 * 		is an object literal that specifies data relevant to the notification event (see
	 * 		<a href="tutorial-Chart%20Configuration.html#systemmessages" target="_blank">
	 * 		<code class="codeLink">systemMessages</code></a> in the
	 * 		<a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
	 * 		tutorial).
	 * @param {string} notification.message Text to display in the toast notification. Strings
	 * 		longer than 160 characters are truncated.
	 * @param {string} [notification.position="top"] Position of the toast on the chart: "top" or
	 * 		"bottom". Overrides the `default-position` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.type="info"] Toast style: "info", "error", "warning", or
	 * 		"confirmation". Overrides the `default-transition` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.transition] Type of animation used to display and dismiss the
	 * 		toast: "fade", "slide", "pop" or "drop". The default is no transition.
	 * @param {number} [notification.displayTime=10] Number of seconds to display the toast before
	 * 		automatically dismissing it. A value of 0 causes the toast to remain on
	 * 		screen&nbsp;&mdash;&nbsp;preventing other toasts from
	 * 		displaying&nbsp;&mdash;&nbsp;until the toast is selected by the user. Overrides the
	 * 		`default-display-time` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {number} [notification.priority=0] Priority of the toast relative to others in the
	 * 		display queue. Higher priority toasts are displayed before toasts with lower priority.
	 * 		For example, a toast with priority&nbsp;=&nbsp;4 is displayed before a toast with
	 * 		priority&nbsp;=&nbsp;1. Toasts with the same priority are displayed in the order
	 * 		they were created; that is, in the order they entered the display queue.
	 * @param {Function} [notification.callback] Function to call when the toast is selected
	 * 		(dismissed) by the user. If the toast is dismissed automatically (see `displayTime`),
	 * 		this function is not called.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since
	 * - 8.2.0
	 * - 8.4.0 Calling this method with a message that is already displayed or in the queue
	 * 		will return without doing anything.
	 */
	newMessage(notification) {
		if (typeof notification === "string" && this.context.config) {
			if (this.context.config.systemMessages)
				notification = this.context.config.systemMessages[notification];
		}
		if (!notification || typeof notification !== "object") return;
		if (notification.remove) {
			for (const queueItem of this.messageQueue) {
				if (queueItem.message === notification.message) {
					this.dismissMessage(notification.message);
				}
			}
			return;
		}
		let newMessage = this.createMessageElement(notification);
		if (newMessage) {
			// Determine if the message priority places it ahead of other messages in the queue
			const index = this.messageQueue.findIndex(
				(m) => m.priority < newMessage.priority
			);
			if (index >= 0) {
				// Recall the message if it's already displayed
				if (this.messageQueue[index].isDisplayed)
					this.recallMessageNode(this.messageQueue[index]);
				// Inject the new priority message before the first non-priority message
				this.messageQueue.splice(index, 0, newMessage);
			} else {
				this.messageQueue.push(newMessage);
			}
			this.displayNextMessage();
		}
	}

	/**
	 * Dismisses a message by removing it from the queue (including if it is already displayed).
	 *
	 * @param {string} message The message to dismiss.
	 *
	 * @tsmember WebComponents.MessageToaster
	 * @since 8.4.0
	 */
	dismissMessage(message) {
		for (const notification of this.messageQueue) {
			if (notification.message === message) {
				this.removeMessageNode(notification);
			}
		}
	}
}

CIQ.UI.addComponentDefinition("cq-message-toaster", MessageToaster);

};


let __js_webcomponents_palette_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-palette&gt;</h4>
 *
 * Provides a palette to dock alongside the chart or float above it. Palette components must be
 * placed within a `<cq-palette-dock>` component.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | docked      | The docked state of the palette. Set to "false" to float palette over the chart. |
 * | orientation | Accepted values are "horizontal" and "vertical". Vertical palettes dock to the left of the chart. Horizontal palettes dock to the top. |
 *
 * In addition, the following attributes are also supported:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | min-height   | Minimum height, in pixels, to display if not enough content. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it is docked, detached.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "dock", "detach" |
 * | action | "click" |
 *
 * A custom event will be emitted from the component when it is moved while undocked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "reposition" |
 * | action | "drag" |
 * | x | _x coordinate_ |
 * | y | _y coordinate_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 *
 * @alias WebComponents.Palette
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 7.2.0
 * - 9.1.0 Observes attributes. Added emitter.
 *
 * @example
 * <cq-palette docked="true" orientation="horizontal" min-height="40">
 *    <div class="palette-container">
 *        <div class="drag-strip"></div>
 *            ...
 *        <div class="resize-strip"></div>
 *    </div>
 * </cq-palette>
 */
class Palette extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["docked", "orientation"];
	}

	constructor() {
		super();
		this.dragMargin = 10; // number of px to constrain the draggable area within the chart.
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Palette);
	}

	init() {
		this.isDragging = false;
		this.minHeight = parseInt(this.getAttribute("min-height"), 10);
		// If the minimum height is not set, default to 25
		if (isNaN(this.minHeight)) {
			this.minHeight = 25;
		}
		this.paletteDock = this.parentElement.parentElement;
		this.dragStrip = this.querySelector(".drag-strip");
		this.resizeStrip = this.querySelector(".resize-strip");

		// Drag actions are managed by the palette dock
		if (this.dragStrip) {
			this.dragStrip.addEventListener(
				"mousedown",
				this.handleDragResize.bind(this, "dragging")
			);

			this.dragStrip.addEventListener(
				"touchstart",
				this.handleDragResize.bind(this, "dragging"),
				{ passive: false }
			);
		}

		// Resize actions are managed by the palette dock
		if (this.resizeStrip) {
			this.resizeStrip.addEventListener(
				"mousedown",
				this.handleDragResize.bind(this, "resizing")
			);
			this.resizeStrip.addEventListener(
				"touchstart",
				this.handleDragResize.bind(this, "resizing"),
				{ passive: false }
			);
		}

		if (this.paletteDock.paletteSubscribe) {
			this.sendMessage = this.paletteDock.paletteSubscribe(
				this.handleMessage.bind(this)
			);
		}
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Palette
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		switch (name) {
			case "docked":
				if (newValue === "false") {
					this.detach(100, 70, 0.8);
				} else {
					this.dock();
				}
				break;
		}
	}

	/**
	 * Sets dragging property in dock for this palette for mouse and touch events.
	 *
	 * @param {string} method Optional type of drag action, either "dragging" (default) or resizing
	 * @param {object} event Event that triggerd this function
	 *
	 * @tsmember WebComponents.Palette
	 */
	handleDragResize(method, event) {
		if (this.paletteDock.hasOwnProperty("dragging")) {
			this.paletteDock.startDrag(this, method);
		}
	}

	/**
	 * Overridden by child objects to respond to messaging sent from other palettes
	 *
	 * @param {string} id Identifier for the message
	 * @param {object | string} message Optional data accompanying the message
	 *
	 * @tsmember WebComponents.Palette
	 */
	handleMessage(id, message) {}

	/**
	 * Detach palette from dock, positioning it over the chart.
	 *
	 * @param {number} xPos X coordinate of palette relative to palette dock.
	 * @param {number} yPos Y coordinate of palette relative to palette dock.
	 * @param {number} scale Palette height relative to its current height.
	 *
	 * @tsmember WebComponents.Palette
	 */
	detach(xPos, yPos, scale) {
		let breakSm = this.ownerDocument.body.classList.contains("break-sm");
		// Never detach on small screens
		if (breakSm) return;

		if (typeof xPos !== "number") xPos = null;

		this.docked = "false";
		// Set a safe default position  when detaching
		xPos = xPos || 10;
		yPos = yPos || 10;

		// Get the parent bounds to check position
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getChartBoundsOffset();
		}
		// When the palette is detached to a location, it should show all or most of its contents even if the location is close to the right edge
		// Check the position of the palette against the right bound of the parent
		if (xPos > parentBounds.left + parentBounds.width - this.clientWidth) {
			xPos = parentBounds.left + parentBounds.width - this.clientWidth;
		}
		// Always set the position for instances where repositioning is necessary.
		this.setTransformPosition(xPos, yPos);
		this.paletteDock.setChartDimensions();
		this.context.stx.resizeChart();
		if (scale) this.setHeightByScale(scale);
		else this.paletteDock.setVerticalPaletteHeight();

		this.emitCustomEvent({
			effect: "detach"
		});
	}

	/**
	 * Fix palette position along edge of chart.
	 *
	 * @tsmember WebComponents.Palette
	 */
	dock() {
		this.docked = "true";
		this.transform = "";
		this.style.left = "";
		this.style.top = "";
		if (this.paletteDock) this.paletteDock.setChartDimensions();
		this.emitCustomEvent({
			effect: "dock"
		});
	}

	/**
	 * Get the current height of the palette.
	 *
	 * @return {number} The element height in pixels.
	 *
	 * @tsmember WebComponents.Palette
	 */
	getHeight() {
		return this.clientHeight;
	}

	/**
	 * Get the current width of the palette.
	 *
	 * @return {number} The element width in pixels.
	 *
	 * @tsmember WebComponents.Palette
	 */
	getWidth() {
		return this.clientWidth;
	}

	/**
	 * Get the offset position of the palette and call setTransformPosition
	 * to clamp the palette position in the event of a chartContainer resize
	 *
	 * @tsmember WebComponents.Palette
	 */
	checkPosition() {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getChartBounds) {
			parentBounds = this.paletteDock.getChartBounds();
		}
		let chartBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			chartBounds = this.paletteDock.getBounds();
		}
		const coordinates = (this.transform || [0, 0]).slice(0);
		// Apply the offsets normally produced by the mouse pointer. Needed to satisfy setTransformPosition
		coordinates[0] =
			chartBounds.left +
			Math.min(
				coordinates[0] + this.dragStrip.clientWidth * 0.5,
				parentBounds.left + parentBounds.width - this.clientWidth
			);
		coordinates[1] =
			chartBounds.top +
			Math.min(
				coordinates[1] + this.dragStrip.clientHeight * 0.5,
				parentBounds.top + parentBounds.height - this.clientHeight
			);

		this.setTransformPosition(coordinates[0], coordinates[1]);
	}

	/**
	 * Set the palette transform position clamping palette within the chart area.
	 * Calls `setTransform`.
	 *
	 * @param {number} x X coordinate of palette relative to palette dock.
	 * @param {number} y Y coordinate of palette relative to palette dock.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setTransformPosition(x, y) {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getChartBoundsOffset();
		}
		let chartBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			chartBounds = this.paletteDock.getBounds();
		}
		let nextTop = Math.floor(y - this.dragStrip.clientHeight * 0.5);
		let nextLeft = Math.floor(x - this.dragStrip.clientWidth * 0.5);

		// Clamp the top position within chart bounds
		nextTop =
			Math.min(
				Math.max(nextTop, parentBounds.top + this.dragMargin),
				parentBounds.height - (this.dragStrip.clientHeight + this.dragMargin)
			) - chartBounds.top;
		// Clamp the left position within chart bounds
		nextLeft =
			Math.min(
				Math.max(nextLeft, parentBounds.left + this.dragMargin),
				parentBounds.width - (this.dragStrip.clientWidth + this.dragMargin)
			) - chartBounds.left;

		this.setTransform(nextLeft, nextTop);
	}

	/**
	 * Set the palette transform property explicitly.
	 *
	 * @param {number} x X coordinate of palette relative to palette dock.
	 * @param {number} y Y coordinate of palette relative to palette dock.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setTransform(x, y) {
		this.transform = [x, y];
		this.style.left = x + "px";
		this.style.top = y + "px";
		this.emitCustomEvent({
			action: this.paletteDock.dragging ? "drag" : null,
			effect: "reposition",
			detail: { x, y }
		});
	}

	/**
	 * Set the palette height property based on location.
	 *
	 * @param {number} yPosition Y coordinate of palette bottom
	 *
	 * @tsmember WebComponents.Palette
	 */
	setHeightToPosition(yPosition) {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getBounds();
		}

		let paletteViewportOffset = this.getBoundingClientRect();
		let nextHeight = yPosition - paletteViewportOffset.top;

		if (this.orientation === "vertical") {
			if (
				nextHeight > this.minHeight &&
				nextHeight + (paletteViewportOffset.top - parentBounds.top) <
					parentBounds.height
			) {
				this.setHeight(nextHeight);
			}
		}
	}

	/**
	 * Set the palette height property relative to its current height property.
	 * For example, a scale of 0.5 will set the palette height to one half of its
	 * current height.
	 *
	 * @param {number} scale Size multiplier.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setHeightByScale(scale) {
		this.style.height =
			Math.floor(parseInt(this.style.height, 10) * scale) + "px";
	}

	/**
	 * Set the palette height property explicitly.
	 *
	 * @param {number} nextHeight Height in pixels.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setHeight(nextHeight) {
		this.style.height = nextHeight + "px";
	}
}

CIQ.UI.addComponentDefinition("cq-palette", Palette);

};


let __js_webcomponents_paletteDock_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-palette-dock&gt;</h4>
 *
 * This is a container for `<cq-palette>` components. Provides docking and dragging capabilities to child
 * palettes.
 *
 * The `<cq-palette-dock>` element does not wrap the chart. It must be a sibling of the chart
 * container.
 *
 * @example
 * <cq-palette-dock>
 *    <div class="palette-dock-container">
 *        ...
 *    </div>
 * </cq-palette-dock>
 *
 * @alias WebComponents.PaletteDock
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.2.0
 */
class PaletteDock extends CIQ.UI.ContextTag {
	constructor() {
		super();
		//let shadowRoot = this.attachShadow({mode: 'open'});
		//shadowRoot.innerHTML = this.render();

		this.dragging = false; /* pointer to the palette currently dragging */
		this.paletteRegistry = [];
		// Use to store and cancel the mouseout check
		this.mouseOutCk = false;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, PaletteDock);
	}

	/**
	 * Set up event listeners for dragging and resizing.
	 * @private
	 * @tsmember WebComponents.PaletteDock
	 */
	initListeners() {
		const { stx, config = {} } = this.context;
		const self = this;

		this.setVerticalPaletteHeight();

		// palette mouse events are handled here, on the parent, to prevent losing the event if the pointer moves off the palette
		this.addEventListener("touchend", (e) => this.stopDrag(e));
		this.addEventListener("touchmove", handleTouchMove, { passive: false });

		this.addEventListener("mouseup", (e) => this.stopDrag(e));
		this.addEventListener("mouseleave", handleMouseLeave);
		this.addEventListener("mouseenter", handleMouseEnter);
		this.addEventListener("mousemove", handleMouseMove);

		// Close a palette context menu when clicking anywhere over the chart
		this.addEventListener("mousedown", this.stopContext.bind(this));

		// respond to resizes, prevent loops
		this.addInjection("append", "resizeChart", () =>
			this.handleResize({ resizeChart: false })
		);

		const channel = (config.channels || {}).drawing || "channel.drawing";
		this.channelSubscribe(channel, handleEnableDrawing);

		function handleMouseLeave(event) {
			stx.showCrosshairs();
			// An extra guard against spastic mousing.
			// Mouseout of the draggable area does not immediately cancel in case
			// the user unintentionally leaves the area for a brief moment
			self.mouseOutCk = setTimeout(() => self.stopDrag(), 500);
		}

		function handleMouseEnter(event) {
			stx.undisplayCrosshairs();
			if (!self.dragging) return;

			// Checking for a re-entry while the mouse button is still down
			if (event.buttons === 1) {
				clearTimeout(self.mouseOutCk);
				return;
			}
			// If all else fails, cancel the drag
			self.stopDrag();
		}

		function handleMouseMove(event) {
			if (self.dragging) {
				event.stopPropagation();
				if (self.dragging.classList.contains("dragging")) {
					self.dragging.setTransformPosition(event.clientX, event.clientY);
				}
				if (self.dragging.classList.contains("resizing")) {
					self.dragging.setHeightToPosition(event.clientY);
				}
			}
		}

		function handleTouchMove(event) {
			if (self.dragging && event.touches[0]) {
				event.stopPropagation();
				if (self.dragging.classList.contains("dragging")) {
					self.dragging.setTransformPosition(
						event.touches[0].clientX,
						event.touches[0].clientY
					);
				}
				if (self.dragging.classList.contains("resizing")) {
					self.dragging.setHeightToPosition(event.touches[0].clientY);
				}
			}
		}

		function handleEnableDrawing(value) {
			self.setChartDimensions();
			// if (value) this.dockAllPalettes();
			stx.resizeChart();
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	setContext(context) {
		this.initListeners();
	}

	/**
	 * Put a message on the palette registry to execute on.
	 *
	 * @param {string} id
	 * @param {string} message
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	palettePublish(id, message) {
		this.paletteRegistry.forEach((cb) => cb(id, message));
	}

	/**
	 * Register a palette callback.
	 *
	 * @param {function} paletteCallback Function to register
	 * @return {function} Bound palettePublish function
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	paletteSubscribe(paletteCallback) {
		this.paletteRegistry.push(paletteCallback);
		return this.palettePublish.bind(this);
	}

	/**
	 * Get bounds of the palette container
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	getBounds() {
		return this.parentNode.getBoundingClientRect();
	}

	/**
	 * Get bounds of the chart within the chart container
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	getChartBounds() {
		let clientBounds = this.parentNode.getBoundingClientRect();
		let bounds = {
			top: 0,
			left: 0,
			height: clientBounds.height,
			width: clientBounds.width
		};

		const palettes = this.querySelectorAll('[docked="true"]');
		[...palettes].forEach((palette) => {
			if (palette.orientation === "vertical") {
				bounds.width -= palette.getWidth();
				bounds.left += palette.getWidth();
			} else if (palette.orientation === "horizontal") {
				bounds.height -= palette.getHeight();
				bounds.top += palette.getHeight();
			}
		});
		return bounds;
	}

	/**
	 * Get bounds of the chart within the chart container, but offset from top and left
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	getChartBoundsOffset() {
		let clientBounds = this.parentNode.getBoundingClientRect();
		let bounds = this.getChartBounds();

		bounds.top += clientBounds.top;
		bounds.left += clientBounds.left;

		return bounds;
	}

	/**
	 * Handle the drawing palette contextual menu open state to allow clicking anywhere over the chart to close
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	startContext() {
		this.classList.add("context");
	}

	/**
	 * Stop handling started by startContext()
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	stopContext() {
		this.classList.remove("context");
		this.palettePublish("context", "stop");
	}

	/**
	 * Indicate a palette is presently in dragging mode
	 * Extends overlay via css in dragging mode to capture mouse position
	 *
	 * @param {HTMLElement} palette Palette to start dragging
	 * @param {string} paletteMode "dragging"
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	startDrag(palette, paletteMode) {
		const palettes = this.querySelectorAll('[docked="false"]');
		[...palettes].forEach(
			(palette) => (palette.style.zIndex = 1) // Drop down any palettes which were previously bumped to the top of the z-index
		);

		// Default to dragging unless resizing is specified
		paletteMode = paletteMode || "dragging";
		this.dragging = palette;
		// The palette dock is always dragging regardless of the palette's mode
		this.classList.add("dragging");
		this.dragging.classList.add(paletteMode);
		this.dragging.style.zIndex = 10; // Bump the active palette to the top of the z-index
	}

	/**
	 * Stop the drag mode
	 *
	 * @param {Event} e Event representing end of operation (mouseup, touchend).
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	stopDrag(e) {
		if (e) e.preventDefault(); // prevent mouse event from firing if both touch and mouse are supported
		this.classList.remove("dragging");
		this.dragging = false;
		this.resizing = false;
		[...this.querySelectorAll('[docked="false"]')].forEach((docked) =>
			docked.classList.remove("dragging", "resizing")
		);
	}

	/**
	 * Indicate a palette is presently in resize mode
	 * Extends overlay via css in dragging mode to capture mouse position
	 *
	 * @param {HTMLElement} palette Palette to start dragging
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	startResize(palette) {
		this.resizing = palette;
		this.classList.add("dragging");
		this.dragging.classList.add("dragging");
	}

	/**
	 * Execute the resize operation.
	 *
	 * @param {object} params
	 * @param {boolean} [params.resizeChart=true] Resize the whole chart
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	handleResize({ resizeChart = true } = {}) {
		// Notify palettes that a resize is about to occur
		this.palettePublish("dockWillResize");
		this.setChartDimensions();
		this.setVerticalPaletteHeight();

		const breakSm = this.ownerDocument.body.classList.contains("break-sm");
		// Palettes can move out of view or the display context can change to mobile,
		// so adjust the floating palettes on resize
		const palettes = this.querySelectorAll('[docked="false"]');
		[...palettes].forEach((palette) => {
			if (breakSm) {
				// If in the mobile context, double check that all palettes are docked
				palette.dock();
			} else {
				// Set detached palettes positions equal to themselves. setTransformPosition will
				// check against the chart bounds and move the palette if it will go off-screen
				palette.checkPosition();
			}
		});

		// Notify palettes that a resize has occured
		this.palettePublish("dockDidResize");

		// prevent loop as this function is can be invoked on resizeChart injection
		if (resizeChart) this.context.stx.resizeChart();
	}

	/**
	 * Sets height of vertically oriented palettes.
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	setVerticalPaletteHeight() {
		// Set height of vertically oriented child palettes
		[...this.querySelectorAll("[orientation=vertical]")].forEach((elem) => {
			if (elem.getAttribute("docked") === "true") {
				elem.style.height = this.parentNode.clientHeight + "px";
			}
		});
	}

	/**
	 * Resize chart to accommodate palette gutters
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	setChartDimensions() {
		const chartContainer = this.context.stx.container;
		const { top, left, width, height } = this.getChartBounds();

		const { config } = this.context;

		const { isMultiChartHost } = this.context.topNode;
		let sidePanelWidth = 0;
		if (config && config.channels) {
			this.channelWrite(
				config.channels.drawingPalettes || "channel.drawingPalettes",
				{
					top,
					left,
					width,
					height
				}
			);
			if (isMultiChartHost)
				sidePanelWidth =
					this.channelRead(
						config.channels.sidepanelSize || "channel.sidepanelSize"
					) || 0;
		} else {
			// configuration not available support previous direct updates (React app using v7.3)
			chartContainer.style.width = width + "px";
			chartContainer.style.height = height + "px";

			chartContainer.style.top = top + "px";
			chartContainer.style.left = left + "px";

			if (isMultiChartHost)
				sidePanelWidth = +(
					this.context.topNode.querySelector("cq-side-panel") || {
						style: { width: "" }
					}
				).style.width.replace("px", "");
		}

		// Align any horizontal docked palettes with the chart left
		const hPalettes = this.querySelectorAll(
			'[orientation="horizontal"][docked="true"]'
		);
		[...hPalettes].forEach((hPalette) => {
			// Offset horizontal palettes by the width of the vertical palettes
			// Add 1px for the border
			hPalette.style.left = left + 1 + "px";
			hPalette.style.width = width - sidePanelWidth - 3 + "px";
		});
		// Align any vertical docked palettes with the chart left
		const vPalettes = this.querySelectorAll('[orientation="vertical"]');
		[...vPalettes].forEach((vPalette) => {
			// Only offset vertical palettes when undocked. Docked vertical palettes are flush with the chart top edge.
			if (vPalette.docked === "false") {
				vPalette.style.top = top + "px";
			} else {
				vPalette.style.top = 0;
			}
		});
	}

	/**
	 * Dock all palettes.
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	dockAllPalettes() {
		const palettes = this.querySelectorAll('[docked="false"]');
		[...palettes].forEach((palette) => palette.dock());
	}
}

CIQ.UI.addComponentDefinition("cq-palette-dock", PaletteDock);

};


let __js_webcomponents_redo_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-redo&gt;</h4>
 *
 * This component will redo an undone drawing.  This works with complementary component [cq-undo]{@link WebComponents.Undo}.
 *
 * @example
 * <cq-undo-section>
 *     <cq-undo class="ciq-btn">Undo</cq-undo>
 *     <cq-redo class="ciq-btn">Redo</cq-redo>
 * </cq-undo-section>

 * @alias WebComponents.Redo
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class Redo extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Redo);
	}

	/**
	 * Finds {@link WebComponents.Undo} and pairs with it to find the last undo and reverse it.
	 * @param {WebComponents.Undo} undo A cq-undo webcomponent
	 * @example
	 * document.querySelector("cq-redo").pairUp(document.querySelector("cq-undo"));
	 *
	 * @tsmember WebComponents.Redo
	 */
	pairUp(undo) {
		this.undo = undo;
		this.undo.redoButton = this;
		CIQ.UI.stxtap(this, () => this.undo.redo());
		this.undo.setButtonStyle();
	}
}

CIQ.UI.addComponentDefinition("cq-redo", Redo);

};


let __js_webcomponents_scroll_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-scroll&gt;</h4>
 *
 * This component creates a scrollable container, which resizes itself when the screen
 * is resized. If CIQ.UI.scrollbarStyling is initialized to a scrollbar implementation (such as
 * PerfectScrollbar), the scrollbar implementation replaces the native scrollbar.
 *
 * _**Attributes**_
 *
 * This component supports the following attributes:
 * | attribute      | description |
 * | :------------- | :---------- |
 * | cq-no-claim    | Do not apply any keystroke capturing |
 * | cq-no-maximize | Do not automatically maximize the height (but keep it showing on screen) |
 * | cq-no-resize   | Do not apply any sizing logic |
 * | cq-max-height  | Maximum height |
 *
 * _**Keyboard Control**_
 *
 * When selected with tab key navigation and activated with Return/Enter, this component has the
 * following internal controls:
 * | key              | action |
 * | :--------------- | :----- |
 * | Up/Down arrow    | Move selection between internal cq-item elements. |
 * | Left/Right arrow | Select a control within a selected element. |
 *
 * @example
 * <cq-lookup-results>
 *     <cq-lookup-filters cq-no-close>
 *         <cq-filter class="true">ALL</cq-filter>
 *         <cq-filter>STOCKS</cq-filter>
 *         <cq-filter>FX</cq-filter>
 *         <cq-filter>INDEXES</cq-filter>
 *         <cq-filter>FUNDS</cq-filter>
 *         <cq-filter>FUTURES</cq-filter>
 *     </cq-lookup-filters>
 *     <cq-scroll></cq-scroll>
 * </cq-lookup-results>
 *
 * @alias WebComponents.Scroll
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 6.1.0 Added `cq-no-claim` attribute.
 * - 8.3.0 Enabled internal keyboard navigation and selection.
 */
class Scroll extends CIQ.UI.BaseComponent {
	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (!this.hasAttribute("cq-no-claim")) this.addClaim(this);
		if (this.hasAttribute("cq-no-scroll")) return;
		// Setting CSS in constructor will throw exception when calling document.createElement (done in plugins)
		// So set default CSS here when connected instead.
		this.style.overflowY = "auto";
		this.uiManager = CIQ.UI.getUIManager(this);
		if (this.uiManager.length) this.uiManager = this.uiManager[0];

		// prevent mousewheel event from propagating up to parents, such as when embedded
		// in a chart, e.g. comparison lookup component
		this.addEventListener(CIQ.wheelEvent, (e) => e.stopPropagation(), {
			passive: false
		});

		CIQ.UI.addResizeListener(this, () => this.resize());
		this.resize();

		this.maxHeight = this.getAttribute("cq-max-height");
		this.addEventListener("scroll", () => {
			this.uiManager.closeOpenColorPicker();
		});
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Scroll);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		CIQ.UI.removeResizeListener(this);
		if (CIQ.UI.scrollbarStyling) CIQ.UI.scrollbarStyling.destroy(this);
		super.disconnectedCallback();
	}

	/**
	 * Returns the focused element or null. An item is focused if it has
	 * attribute cq-focused.
	 *
	 * @return {HTMLElement} The element or null
	 *
	 * @tsmember WebComponents.Scroll
	 */
	focused() {
		return this.querySelector("cq-item[cq-focused]");
	}

	/**
	 * Handler for keyboard interaction.
	 *
	 * Scroll components can handle up and down enter keystrokes.
	 * They do not register for claims directly. Another section of code must
	 * establish the claim on their behalf or proxy the keystroke.
	 *
	 * Up and Down arrows will iterate through the scrollable elements. The attribute
	 * cq-focused will be added to the currently focused tag. This can then be
	 * queried later, such as when a user hits enter.
	 *
	 * Left and Right arrows will iterate through the elements on the focused scrollable element,
	 * such as Remove and Edit buttons. Child elements must have the attribute `keyboard-selectable-child`
	 * set to "true" to be selectable with these keys.
	 *
	 * Space bar or Enter will call the selectFC callback on the element if it exists.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Scroll
	 */
	keyStroke(hub, key, e) {
		if (!this.keyboardNavigation) {
			if (this.keyboardNavigationWait || !this.matches(".stxMenuActive *"))
				return;
		}

		if (!CIQ.trulyVisible(this)) return false;

		const items = this.querySelectorAll(
			"[keyboard-selectable='true'], cq-item:not(.item-hidden), li"
		);
		if (!items.length) return false;

		if (key == " " || key == "Spacebar" || key == "Enter") {
			const focused = this.findFocused(items);
			if (!focused || !focused.length) return false;
			const childItemsSelected = focused[0].querySelectorAll(
				"[keyboard-selectable-child='true'][cq-focused]"
			);
			if (childItemsSelected.length) {
				const studyLegend = focused[0].closest("cq-study-legend");
				if (studyLegend)
					studyLegend.storeFocused(focused, childItemsSelected[0]);
				this.clickItem(childItemsSelected[0], e);
			} else this.clickItem(focused[0], e);
		} else if (key == "ArrowDown" || key == "Down") {
			this.focusNextItem(items);
		} else if (key == "ArrowUp" || key == "Up") {
			this.focusNextItem(items, true);
		} else if (key == "ArrowRight" || key == "Right") {
			const focused = this.findFocused(items);
			if (!focused || !focused.length) return false;
			const childItems = focused[0].querySelectorAll(
				"[keyboard-selectable-child='true']"
			);
			if (childItems.length) this.focusNextItem(childItems);
		} else if (key == "ArrowLeft" || key == "Left") {
			const focused = this.findFocused(items)[0];
			if (!focused) return false;
			const childItems = focused.querySelectorAll(
				"[keyboard-selectable-child='true']"
			);
			// If the end of the child items has been reached select the parent item instead
			if (childItems.length && !this.focusNextItem(childItems, true)) {
				this.removeFocused(childItems);
				this.focusItem(focused);
			}
		}
		return true;
	}

	/**
	 * Overrides [focusItem](CIQ.UI.BaseComponent.html#focusItem) in
	 * [CIQ.UI.BaseComponent]{@link CIQ.UI.BaseComponent}.
	 *
	 * Scrolls to an item and gives the item focus.
	 *
	 * @param {HTMLElement} item The element to scroll to and focus. Must be a child of this component.
	 *
	 * @tsmember WebComponents.Scroll
	 *
	 * @since 8.3.0
	 */
	focusItem(item) {
		this.scrollToElement(item);
		super.focusItem(item);
	}

	/**
	 * If we're using keyboard navigation, returns the highlight to the tab selected element.
	 *
	 * @tsmember WebComponents.Scroll
	 */
	onKeyboardDeselection() {
		// If we're using keyboard navigation, return the highlight to the tab selected element
		if (this.keyboardNavigation && this.keyboardNavigation !== null)
			this.keyboardNavigation.highlightPosition();
	}

	/**
	 * Resizes the componewnt when the screen is resized, or even if the configuraton is reloaded to add or remove items.
	 *
	 * @tsmember WebComponents.Scroll
	 */
	resize() {
		const context = this.closest("cq-context");
		if (this.closest(".sharing"))
			return; /*share.js appends this class to the body.
			Do not attempt unnecessary resize of scroll
			for a chart about to become a shared image.*/
		if (this.hasAttribute("cq-no-resize")) return;
		if (this.hasAttribute("cq-no-maximize")) this.noMaximize = true;
		const position = this.getBoundingClientRect();
		if (!position.height) return;
		// defaulted to 45 to take into account 15px of padding on menus and then an extra 5px for aesthetics
		const reduceMenuHeight = this.reduceMenuHeight || 45;
		let contextHeight, contextTop;
		if (context) {
			const { multiChartContainer } = context;
			const contextRect = (
				multiChartContainer || context
			).getBoundingClientRect();
			contextHeight = contextRect.height;
			contextTop = contextRect.top;
		} else {
			// Fallback to the window height if context element cannot be found
			contextHeight = this.ownerDocument.defaultView.innerHeight;
			contextTop = 0;
		}
		if (!contextHeight) return;
		let height = contextHeight - (position.top - contextTop) - reduceMenuHeight;
		const holders = CIQ.climbUpDomTree(
			this,
			".stx-holder,.stx-subholder,.chartContainer",
			true
		);
		if (holders.length) {
			holders.forEach((holder) => {
				const holderBottom =
					holder.getBoundingClientRect().top +
					CIQ.elementDimensions(holder).height;
				height = Math.min(height, holderBottom - position.top - 5); // inside a holder we ignore reduceMenuHeight, but take off 5 pixels just for aesthetics
			});
		}

		// If there are subsequent siblings that have a fixed height then make room for them
		const children = [...this.parentNode.children];
		const nextAll = children.slice(children.indexOf(this) + 1);
		for (let i = 0; i < nextAll.length; i++) {
			const sibling = nextAll[i];
			if (sibling && !CIQ.trulyVisible(sibling)) continue; // skip hidden siblings
			height -= CIQ.elementDimensions(sibling, {
				border: 1,
				padding: 1,
				margin: 1
			}).height;
		}
		if (this.maxHeight && this.maxHeight < height) {
			height = this.maxHeight;
		}
		if (!this.noMaximize) this.style.height = height + "px";

		// The drop-up-menu attribute indicates that this element is positioned from its bottom and can potentially flow off screen
		if (this.hasAttribute("cq-drop-up-menu")) {
			const currentBottom = +this.style.bottom.replace("px", "");
			const newBottom = Math.min(
				position.top - contextTop - reduceMenuHeight + currentBottom - 4,
				25
			);
			this.style.bottom = newBottom + "px";
		}
		this.style.maxHeight = height + "px";
		this.refresh();
	}

	/**
	 * Scrolls to an element.
	 *
	 * @param {HTMLElement} item The element to scroll to. Must be a child of this component.
	 *
	 * @tsmember WebComponents.Scroll
	 */
	scrollToElement(item) {
		const bottom = this.clientHeight,
			scrolled = this.scrollTop;
		const itemBottom = item.offsetTop + item.clientHeight;
		if (item.offsetTop > scrolled && itemBottom < bottom + scrolled) return;
		this.scrollTop = Math.max(itemBottom - bottom, 0);
		this.refresh();
	}

	/**
	 * Scroll back to top
	 *
	 * @tsmember WebComponents.Scroll
	 */
	top() {
		this.scrollTop = 0;
		this.refresh();
	}

	/**
	 * Scroll back to top (calls `top()`).
	 *
	 * @tsmember WebComponents.Scroll
	 */
	scrollToTop() {
		this.top();
	}

	/**
	 * Refreshes the scrollbar, if CIQ.UI.scrollbarStyling is enabled.
	 *
	 * @since 7.2.0
	 *
	 * @tsmember WebComponents.Scroll
	 */
	refresh() {
		if (CIQ.UI.scrollbarStyling) CIQ.UI.scrollbarStyling.refresh(this);
	}
}

CIQ.UI.addComponentDefinition("cq-scroll", Scroll);

};


let __js_webcomponents_shareButton_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-share-button&gt;</h4>
 *
 * Button that opens a dialog that can be used to share a chart.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute      | description |
 * | :------------- | :---------- |
 * | help-id        | A key to the correct help text in CIQ.Help.Content. |
 * | icon           | Class name for image to use. |
 * | reader         | Accessibility text when focused by a screen reader. |
 * | responsive     | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
 * | text           | Displayed label for this button. |
 * | tooltip        | Text for the tooltip which appears when hovering over the component. |
 *
 * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when button is pressed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "click" |
 * | action | "click" |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Button with responsive icon:</caption>
 * <cq-share-button class="bottom" text="Share" icon="share" responsive tooltip="Share"></cq-share-button>
 *
 * @alias WebComponents.ShareButton
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.0.0 Added functionality to export layouts to social media services.
 * - 9.1.0 Observes attributes. Added emitter.
 */
class ShareButton extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["help-id", "icon", "reader", "responsive", "text", "tooltip"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);

		this.reset();
		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ShareButton);
		this.constructor = ShareButton;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (this.usingMarkup) {
			this.reset();
		} else {
			// do nothing when using predefined content
		}
	}

	/**
	 * Formats the default markup, replacing any variables with the actual values provided by the attributes.
	 *
	 * @return {string} The prepared markup
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	getMarkup() {
		let markup = this.markup || this.constructor.markup;
		const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
		if (names)
			names.forEach((name) => {
				const key = name.substring(2, name.length - 2);
				if (key.includes("_class")) return;
				const attr = this[key];
				if (attr == null) {
					if (key === "reader" && this.text)
						markup = markup.replace(name, this.text);
					else if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "hidden");
					else if (key === "icon") markup = markup.replace(name, "hidden");
					else if (key === "text")
						markup = markup.replace("{{label_class}}", "hidden");
					else if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "hidden");
					else markup = markup.replace(name, "");
				} else {
					if (key === "text") markup = markup.replace("{{label_class}}", "");
					else if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "");
					else if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "");
					else if (key === "responsive")
						markup = markup.replace("{{responsive}}", "responsive");
					markup = markup.replace(name, attr);
				}
			});
		return markup;
	}

	/**
	 * Called when an attribute changes, will regenerate the shareButton component,
	 * updating whatever needs to be updated as a result of the attribute change.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	reset() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			const div = document.createElement("div");
			this.addDefaultMarkup(div, this.getMarkup());
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	setContext(context) {
		this.makeTap(this, (e) => {
			e.stopPropagation();
			this.tap();
		});
		CIQ.Share.onClipboard((shareID) => {
			CIQ.Share.loadChartFromID(this.context.stx, shareID);
		});
		this.reset();
	}

	/**
	 * Opens a customizable dialog that can share a chart.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	tap() {
		this.uiManager.closeMenu(null, "cq-menu,cq-dialog,cq-color-picker");
		const { context } = this;
		if (context.config) {
			this.channelWrite(
				context.config.channels.dialog,
				{ type: "share", params: { context } },
				context.stx
			);
		} else {
			const shareDialog = this.ownerDocument.querySelector("cq-share-dialog");
			if (shareDialog && shareDialog.open) shareDialog.open({ context });
		}
		this.emitCustomEvent({ effect: "click" });
	}

	/**
	 * Used to extract a shareID from the clipboard content.
	 *
	 * @tsmember WebComponents.ShareButton
	 */
	async getClipboard() {
		const shareID = await CIQ.Share.getClipboard();

		if (shareID) {
			CIQ.Share.loadChartFromID(this.context.stx, shareID);
		} else {
			this.tap();
		}
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
 * | reader        | from attribute value |
 * | icon          | from attribute value |
 * | text          | from attribute value |
 * | help-id       | from attribute value |
 * | responsive    | from attribute value |
 * | tooltip       | from attribute value |
 * | tooltip_class | "hidden" if `tooltip` attribute not specified |
 * | help_class    | "hidden" if `help-id` attribute not specified |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ShareButton
 */
ShareButton.markup = `
		<div class="share-clickable {{responsive}}">
			<cq-help class="{{help_class}}" help-id="{{help-id}}"aria-hidden="true"></cq-help>
			<span class="icon {{icon}}">
				<div cq-tooltip class="{{tooltip_class}}" aria-hidden="true">{{tooltip}}</div>
			</span>
			<span class="{{label_class}}" label>{{text}}</span>
		</div>
		<div class="ciq-screen-reader">
			<button type="button" tabindex="-1">{{reader}}</button>
			<em	class="help-instr {{help_class}}">(Help available, press question mark key)</em>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-share-button", ShareButton);

};


let __js_webcomponents_shareDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Share) {
	console.error(
		"shareDialog component requires first activating share feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-share-dialog&gt;</h4>
	 *
	 * Dialog form that allows users share/post their charts to a remote service, such as social media or a file server.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when data is generated for sharing.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" or "auto" |
	 * | effect | "share" or "id" |
	 * | action | "click" or null |
	 * | value | _link to image, or id_ |
	 *
	 * A custom event will be emitted from the component when data is copied to the clipboard.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "copy" |
	 * | action | "click" |
	 * | value | _contents of clipboard_ |
	 *
	 * @alias WebComponents.ShareDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 9.0.0 Added functionality to export layouts to social media services.
	 * - 9.1.0 Added emitter.
	 */
	class ShareDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ShareDialog);
			this.constructor = ShareDialog;
		}

		/**
		 * Opens the share dialog.
		 *
		 * @param {object} params
		 * @param {CIQ.UI.Context} [params.context] A context to set. See
		 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			this.closeTeamsDialog();

			if (
				!params.context ||
				!params.context.stx ||
				!params.context.stx.chart ||
				!params.context.stx.chart.canvas
			)
				return;

			super.open(params);

			const { chartSharing } = params.context.config;

			if (chartSharing && chartSharing.getChartLayout) {
				this.querySelector("[cq-share-dialog-div]").classList.add(
					"has-live-chart-sharing"
				);
				this.shareChartID("auto");
			} else {
				this.shareChartImage("auto");
			}

			// Set the main dialog as keyboard active to reset the highlight when this panel reloads
			if (this.ownerDocument.body.keystrokeHub) {
				let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
				if (tabActiveModals[0])
					this.ownerDocument.body.keystrokeHub.setKeyControlElement(
						tabActiveModals[0]
					);
			}
		}

		/**
		 * Creates an image of the chart.
		 *
		 * @return {Promise<void>}
		 * @async
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		async createImage() {
			return new Promise((resolve) => {
				const { stx } = this.context;
				const shareLink = this.querySelector(
					".share-image-container .share-copyable-link"
				);
				if (shareLink) shareLink.innerHTML = "Loading...";

				const copyButton = this.querySelector(
					`.share-image-container .cq-share-copy`
				);
				if (copyButton) copyButton.setAttribute("disabled", "");

				// "hide" is a selector list, of DOM elements to be hidden while an image of the chart is created.  "cq-comparison-add-label" and ".chartSize" are hidden by default.
				CIQ.UI.bypassBindings = true;
				CIQ.Share.createImage(
					stx,
					{
						hide: [
							".ciq-nav",
							".ciq-footer",
							"cq-dialog",
							"cq-dialogs",
							".stx_chart_controls",
							".stx-btn-panel",
							".stx_jump_today",
							".stx-baseline-handle",
							".ciq-edit",
							".ciq-close",
							"cq-marker-label"
						]
					},
					(data) => {
						CIQ.UI.bypassBindings = false;
						const id = CIQ.uniqueID();
						const host = "https://share.chartiq.com"; //TODO make configurable
						const startOffset = stx.getStartDateOffset();
						const metaData = {
							layout: stx.exportLayout(),
							drawings: stx.exportDrawings(),
							xOffset: startOffset,
							startDate: stx.chart.dataSegment[startOffset].Date,
							endDate:
								stx.chart.dataSegment[stx.chart.dataSegment.length - 1].Date,
							id,
							symbol: stx.chart.symbol
						};
						const url = host + "/upload/" + id;
						const payload = { id, image: data, config: metaData };
						CIQ.Share.uploadImage(data, url, payload, (err, response) => {
							if (err !== null) {
								CIQ.alert("error: " + err);
							} else {
								const link = host + response;
								if (shareLink) shareLink.innerHTML = link;
								if (copyButton) copyButton.removeAttribute("disabled");
								resolve(link);
							}
						});
					}
				);
				// Set the main dialog as keyboard active to reset the highlight when this panel reloads
				if (this.ownerDocument.body.keystrokeHub) {
					let { tabActiveModals } = this.ownerDocument.body.keystrokeHub;
					if (tabActiveModals[0])
						this.ownerDocument.body.keystrokeHub.setKeyControlElement(
							tabActiveModals[0]
						);
				}
			});
		}

		/**
		 * Function for copying PNG image.
		 * @param {object} activator
		 * @param {HTMLElement} activator.node The button which was tapped to execute this function
		 *
		 * @tsmember WebComponents.ShareDialog
		 * @since 9.2.0
		 */
		copy_image({ node }) {
			if (!node.disabled) this.copy("image");
		}

		/**
		 * Function for copying chart layout.
		 * @param {object} activator
		 * @param {HTMLElement} activator.node The button which was tapped to execute this function
		 *
		 * @tsmember WebComponents.ShareDialog
		 * @since 9.2.0
		 */
		copy_layout({ node }) {
			if (!node.disabled) this.copy("layout");
		}

		/**
		 * Copies the chart image or layout ID to the clipboard.
		 *
		 * @param {String} type image|layout
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		copy(type) {
			const shareLink = this.querySelector(
				`.share-${type}-container .share-copyable-link`
			);
			if (!shareLink) return;
			const linkToCopy = shareLink.innerText;
			const tempInputElem = document.createElement("input");
			tempInputElem.type = "text";
			tempInputElem.value = linkToCopy;
			tempInputElem.contentEditable = true;
			tempInputElem.readOnly = true;
			this.ownerDocument.body.appendChild(tempInputElem);
			tempInputElem.focus();
			tempInputElem.select();
			if (!CIQ.isIE) {
				const range = document.createRange();
				range.selectNodeContents(tempInputElem);
				const s = window.getSelection();
				s.removeAllRanges();
				s.addRange(range);
				tempInputElem.setSelectionRange(0, linkToCopy.length);
			}
			this.ownerDocument.execCommand("copy");
			this.ownerDocument.body.removeChild(tempInputElem);
			shareLink.parentElement.classList.add("share-copied");

			const copyButton = this.querySelector(
				`.share-${type}-container .cq-share-copy`
			);

			const origText = copyButton.innerHTML;

			if (type === "image") {
				copyButton.innerHTML = "URL Copied!";
			} else {
				copyButton.innerHTML = "ID Copied!";
			}

			this.emitCustomEvent({
				effect: "copy",
				detail: { value: linkToCopy }
			});

			setTimeout(() => {
				copyButton.innerHTML = origText;
			}, 3000);
		}

		/**
		 * Loads a chart from a provided layout ID.
		 *
		 * @param {object} response
		 * @param {Event} response.e The event triggering the load.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		loadChart(response) {
			CIQ.Share.loadChart(
				this.context.stx,
				response.e.target.previousElementSibling.value
			);
		}

		/**
		 * Shows the appropriate "tab" in the dialog, whether for sharing a chart or an image.
		 *
		 * @param {string} type "id" or "image".
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		activateTab(type) {
			const activeTab = this.querySelector(
					`.ciq-share-chart-tab[type="${type}"]`
				),
				activeContent = this.querySelector(
					`.ciq-share-chart-tab-content[type="${type}"]`
				);

			[
				...this.querySelectorAll(
					".ciq-share-chart-tab, .ciq-share-chart-tab-content"
				)
			].forEach((tab) => {
				tab.classList.remove("ciq-active");
			});

			activeTab.classList.add("ciq-active");
			activeContent.classList.add("ciq-active");

			return { activeTab, activeContent };
		}

		/**
		 * Shares the layout ID to a social media service.
		 *
		 * @param {string} source Indicates a cause for the sharing.  Used in the emitter.
		 * @async
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		async shareChartID(source) {
			const { activeContent: shareContainer } = this.activateTab("id");

			CIQ.Share.saveChartLayout(this.context.stx).then((shareID) => {
				const { chartSharing } = this.context.config;

				this.emitCustomEvent({
					action: source ? null : undefined,
					cause: source,
					effect: "share",
					detail: { value: shareID }
				});

				if (chartSharing.generateURL) {
					chartSharing.generateURL(shareID).then((shareURL) => {
						const encodedMessage = encodeURI(`${shareURL}`);

						const copyableLinkContainer = this.querySelector(
							".share-layout-container .share-copyable-link"
						);

						if (copyableLinkContainer)
							copyableLinkContainer.innerHTML = shareURL;
						if (shareContainer)
							shareContainer.classList.add("share-layout-loaded");

						const copyButton = this.querySelector(
							`.share-layout-container .cq-share-copy`
						);
						if (copyButton) copyButton.removeAttribute("disabled");

						this.updateSocialLinks("layout", encodedMessage);
					});
				}
			});
		}

		/**
		 * Open Microsoft Teams dialog area.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		openTeamsDialog() {
			this.querySelector(".ciq-share-teams").classList.add("ciq-active");
			const dialog = this.closest("cq-dialog");
			dialog.setTitle("Share With Teams");
		}

		/**
		 * Close Microsoft Teams dialog area.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		closeTeamsDialog() {
			this.querySelector(".ciq-share-teams").classList.remove("ciq-active");
			const dialog = this.closest("cq-dialog");
			dialog.setTitle("Share Your Chart");
		}

		/**
		 * Update Microsoft Teams posting link.
		 *
		 * @param {Event} e Input event
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		updateTeamsLink(e) {
			const link = e.target.parentElement.querySelector(
				".ciq-share-teams-link"
			);
			link.href = `https://teams.microsoft.com/l/chat/0/0?users=${
				e.target.value
			}&topicName=View%20Chart&message=${link.getAttribute(
				"ciq-encoded-message"
			)}`; //TODO use regex to do replacement of message value
		}

		/**
		 * Update social media posting link.
		 *
		 * @param {string} type "layout" or "image".
		 * @param {string} encodedMessage URI-encoded data to post.
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		updateSocialLinks(type, encodedMessage) {
			const { chartSharing } = this.context.config;

			if (chartSharing && chartSharing.quickLinks) {
				const { quickLinks } = chartSharing;

				[
					...this.querySelectorAll(`.share-${type}-container .ciq-share-link`)
				].forEach((button) => {
					const name = button.getAttribute("cq-share-name");

					// check if sharing is disabled for this 3rd party service
					if (quickLinks[name] === false) return;

					switch (name) {
						case "msteams":
							button.href = `https://teams.microsoft.com/l/chat/0/0?users=&topicName=View%20Chart&message=${encodedMessage}`; //TODO make configurable
							button.addEventListener("click", (e) => {
								e.preventDefault();
								this.openTeamsDialog();
								const teamsLink = this.querySelector(".ciq-share-teams-link");
								const teamsInput = this.querySelector(
									".ciq-share-teams textarea"
								);
								teamsInput.addEventListener("change", this.updateTeamsLink);
								teamsInput.addEventListener("keyup", this.updateTeamsLink);
								teamsLink.setAttribute("ciq-encoded-message", encodedMessage);
								teamsLink.addEventListener("click", () => {
									this.closeTeamsDialog();
								});
							});
							break;
						case "twitter":
							button.href = `http://twitter.com/share?text=${encodedMessage}&hashtags=&url=`; //TODO make configurable
							break;
						case "symphony":
							button.href = `https://open.symphony.com/?startChat=&message=${encodedMessage}`; //TODO make configurable
					}
				});
			}
		}

		/**
		 * Shares the image PNG to a social media service.
		 *
		 * @param {string} source Indicates a cause for the sharing.  Used in the emitter.
		 * @async
		 *
		 * @tsmember WebComponents.ShareDialog
		 */
		async shareChartImage(source) {
			this.activateTab("image");

			const link = await this.createImage();

			this.updateSocialLinks("image", encodeURI(link));

			this.emitCustomEvent({
				action: source ? null : undefined,
				cause: source,
				effect: "link",
				detail: { value: link }
			});

			setTimeout(() => {
				this.tabIndex = -1;
				this.focus();
			}, 10);
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.ShareDialog
	 */
	ShareDialog.markup = `
		<div class="ciq-share-teams">
			<div>Enter Teams recipients separated by commas:</div>
			<textarea></textarea>
			<div class="ciq-share-teams-buttons">
				<a href="#" target="_blank" class="ciq-btn ciq-share-teams-link" stxtap="shareTeams()">Share</a>
			</div>
		</div>
		<div class="ciq-share-form">
			<div cq-share-dialog-div>
				<div class="ciq-share-chart-tabs">
					<div class="ciq-share-chart-tab" type="id" keyboard-selectable="true" stxtap="shareChartID()">
						<span class="ciq-radio"><span></span></span>
						<span>Live Chart</span>
					</div>
					<div class="ciq-share-chart-tab" type="image" keyboard-selectable="true" stxtap="shareChartImage()">
						<span class="ciq-radio"><span></span></span>
						<span>Chart Image</span>
					</div>
				</div>

				<cq-separator></cq-separator>

				<div class="ciq-share-chart-tab-content share-layout-container" type="id">
					<div class="share-copy-container">
						<div class="share-copyable-link">Loading...</div>
						<button class="ciq-btn cq-share-copy" stxtap="copy_layout()" disabled>Copy URL</button>
					</div>
					<div class="ciq-share-icons">
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="twitter">
							<span class="ciq-share-name">Share to Twitter</span>
						</a>
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="msteams">
							<span class="ciq-share-name">Share to Microsoft Teams</span>
						</a>
						<!--
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="symphony">
							<span class="ciq-share-name">Share to Symphony</span>
						</a>
						-->
					</div>

					<!--
					<cq-separator></cq-separator>

					<h4 class="title">Load Chart</h4>
					<div class="share-load-container">
						<input type="text" placeholder="Paste share ID" />
						<button class="ciq-btn" stxtap="loadChart()">Load Chart</button>
					</div>
					-->
				</div>
				<div class="ciq-share-chart-tab-content share-image-container" type="image">
					<div class="share-copy-container">
						<div class="share-copyable-link">Loading...</div>
						<button class="ciq-btn cq-share-copy" stxtap="copy_image()" disabled>Copy URL</button>
					</div>
					<div class="ciq-share-icons">
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="twitter">
							<span class="ciq-share-name">Share to Twitter</span>
						</a>
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="msteams">
							<span class="ciq-share-name">Share to Microsoft Teams</span>
						</a>
						<!--
						<a href="#" target="_blank" class="ciq-btn ciq-share-link" cq-share-name="symphony">
							<span class="ciq-share-name">Share to Symphony</span>
						</a>
						-->
					</div>
				</div>
			</div>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-share-dialog", ShareDialog);
}

};


let __js_webcomponents_showRange_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-show-range&gt;</h4>
 *
 * This component is a container of options which allow selection of a chart's date range.  These ranges end at the present time, and begin at various
 * other times which can be programmed in the component's configuration (see example below).
 * To bind the component's configuration, set its `config` attribute to an object in the {@link CIQ.UI.Context}.config.groups object.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | config      | Key pointing to a component configuration entry which specifies the content items. |
 *
 * If no markup is specified in this component, a default markup will be provided.  In order to use the default markup, the selections in the menu
 * must be configured in the context configuration file and specified by key in the `config` attribute.  See example.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when that action is triggered on an item.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "select" |
 * | action | "click" |
 * | multiplier | _multiplier_ |
 * | base | _base_ |
 * | periodicity | { inteval: _interval_, period: _period_, timeUnit: _timeUnit_ } |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Configuration**_
 *
 * Configuration is accomplished by setting up an object within the context configuration's groups object.  Each configuration is assigned a unique name which is
 * itself an object property of the groups object.  This property name is used as the value of the `config` attribute of this component.
 * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
 * Each array element is an object which represents one item in the group.  Let's call one of these array elements, `item`.
 * Each `item` has several properties which describe the nature of the range to display.  The following table of properties describes what they mean.
 *
 * | property    | description |
 * | :---------- | :---------- |
 * | type        | Describes what type of item to display.  Valid values are described in the table below. |
 * | label       | Text to display. |
 * | className   | Optional class name to apply to item. |
 * | tap         | Name of helper function to execute when item is clicked. |
 * | iconCls     | Optional class name of an icon to display on the item. |
 * | value       | Array of arguments to pass to `tap` function. |
 * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
 * | helpId      | A key to the correct help text in CIQ.Help.Content. |
 * | id          | DOM id for the item. |
 *
 * Valid `type`s are described here:
 * | type      | description |
 * | :-------- | :---------- |
 * | item      | Standard text which when clicked will execute `tap` action via a helper. |
 * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
 * | separator | Unclickable vertical line, used to separate two menu sections. |
 *
 * @example <caption>Show Range tag:</caption>
 * <cq-show-range config="example"></cq-show-range>
 * @example <caption>Sample configuration for the above tag:</caption>
 * stxx.uiContext.config.groups.example = {
 * 		content: [
 *			{ type: "item", label: "1D", tap: "set", value: [1, "today"] },
 *			{ type: "item", label: "1M", tap: "set", value: [1, month", 30, 8, "minute"] }
 * 		]
 * };
 *
 * @alias WebComponents.ShowRange
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class ShowRange extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["config"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		if (this.isShadowComponent && this.children.length) {
			const parent = document.createElement("div");
			this.root.appendChild(parent);
			while (this.children.length) {
				parent.appendChild(this.firstChild);
			}
		} else if (!this.children.length) {
			const ul = document.createElement("ul");
			this.root.appendChild(ul);
		}

		this.contentRoot =
			this.root.querySelector(".content") || this.root.firstChild;
		this.contentRoot.classList.add("content");
		this.contentRoot.setAttribute("role", "menu");

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ShowRange);
		this.constructor = ShowRange;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.ShowRange
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		if (!this.attached) return;
		if (name === "config") {
			const helper = CIQ.UI.BaseComponent.getHelper(this, "GroupConfig");
			if (!helper || !helper[newValue]) return;
			Object.assign(this, helper[newValue]);
			this.config = newValue;
			this.populate();
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ShowRange
	 */
	setContext(context) {
		this.handlePropertyChange("config", this.config, "");
		this.handlePropertyChange("config", "", this.getAttribute("config"));
	}

	/**
	 * Creates the group items by parsing the configuration object and using the default markup to create each item.
	 *
	 * @tsmember WebComponents.ShowRange
	 */
	populate() {
		const contentArr = this.content;
		if (contentArr instanceof Array) {
			while (this.contentRoot.firstChild) this.contentRoot.firstChild.remove();
			contentArr.forEach((item) => {
				const div = document.createElement("div");
				div.innerHTML = this.constructor.itemTemplate(item);
				const menuItem = div.children[0];
				this.contentRoot.appendChild(menuItem);
				menuItem.params = item;
				CIQ.UI.BaseComponent.scheduleForBinding(menuItem, this);
			});
		}
	}

	/**
	 * Proxies UI requests for span changes to the chart engine.
	 *
	 * Usage Examples:
	 * - `set(5,'day',30,2,'minute')` means that you want to combine two 30-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every 30 minutes. A total of 2 data points per hour.
	 * - `set(5,'day',2,30,'minute')` means that you want to combine thirty 2-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every 2 minutes. A total of 30 data points per hour.
	 * - `set(5,'day', 1, 60,'minute')` means that you want to combine sixty 1-minute bars into a single candle.
	 *   - So your quote feed must return one data object for every minute . A total of 60 data points per hour.
	 * - `set(5,'day', 60, 1,'minute')` means that you want to have a single 60 minute bar per period.
	 *   - So your quote feed must return one data object for every 60 minutes . A total of 1 data point per hour.
	 *
	 * @param {Object} activator Activation information
	 * @param {Number} multiplier   The period that will be passed to {@link CIQ.ChartEngine#setSpan}
	 * @param {Number} base The interval that will be passed to {@link CIQ.ChartEngine#setSpan}
	 * @param {Number} [interval] Chart interval to use (leave empty for autodetect)
	 * @param {Number} [period] Chart period to use (leave empty for autodetect)
	 * @param {Number} [timeUnit] Chart timeUnit to use (leave empty for autodetect)
	 *
	 * @tsmember WebComponents.ShowRange
	 *
	 * @since 5.1.1 timeUnit added
	 */
	set(activator, multiplier, base, interval, period, timeUnit) {
		const { context } = this;
		if (context.loader) context.loader.show();
		const params = {
			multiplier,
			base,
			padding: 40
		};
		if (interval) {
			params.periodicity = {
				interval,
				period: period || 1,
				timeUnit
			};
		}
		context.stx.setSpan(params, () => {
			if (context.loader) context.loader.hide();
			delete params.padding;
			this.emitCustomEvent({
				effect: "select",
				detail: { params }
			});
		});
	}
}

/**
 * Default markup generator for an item's innerHTML.  This function is called for each item in the dropdown.
 * Based on the parameters passed in, the appropriate markup is generated.
 * This function is called by {@link WebComponents.ShowRange#populate}.
 *
 * @param {Object} params
 * @param {String} params.type Type of item, e.g. `item`, `heading`, `separator`.
 * @param {String} [params.className] Class name of item
 * @param {String} [params.feature] Name of add-on which when loaded, this item will become visible
 * @param {String} [params.helpId] Name associated with help for this item
 * @param {String} [params.iconCls] Class for the icon in the item
 * @param {String} [params.label] Text for the item
 * @param {String} [params.tap] Helper function for tapping
 * @param {Array|String} [params.value] Parameter(s) to pass to the `tap`, function.
 * 					If these aren't supplied, value will be stored in a `data` attribute.
 * 					The value is always available in the `data-value` attribute.
 * @param {String} [params.id] DOM id atribute for the item.
 *
 * @return {String} Markup for a single item.
 *
 * @tsmember WebComponents.ShowRange
 * @static
 */
ShowRange.itemTemplate = ({
	type,
	className,
	feature,
	helpId,
	iconCls,
	label,
	tap,
	value,
	id
}) => {
	const classString = `${className ? `${className} ` : ""}`;
	const params =
		value && value !== 0
			? Array.isArray(value)
				? value.map((i) => (typeof i === "string" ? `'${i}'` : i)).join()
				: `'${value}'`
			: "";
	const role =
		{
			separator: "separator",
			heading: "presentation"
		}[type] || "menuitem";
	const tabbable = type === "item";

	return `
		<li class="${classString}${type}-item item" role="${role}"
			${
				tap
					? `stxtap="${tap}(${params})"`
					: params && !role.indexOf("menuitem")
					? `data='${JSON.stringify(value).replace(/'/g, "'")}'`
					: ""
			}
			${feature ? `feature="${feature}"` : ""}
			${value && tap ? `data-value="${value}"` : ""}
			${tabbable ? "keyboard-selectable" : ""}
		>\
			${
				label
					? type === "heading"
						? `<h4><cq-heading class="inline" text="${label}"${
								id ? ` id="${id}"` : ""
						  }></cq-heading></h4>`
						: `
							${helpId ? `<cq-help help-id="${helpId}" aria-hidden="true"></cq-help>` : ""}\
							${iconCls ? `<span class="icon ${iconCls}"></span>` : ""}\
							<span label ${id ? `id="${id}"` : ""} >${label}</span>`
					: ""
			}\
			${
				helpId
					? `<div class="ciq-screen-reader">
						<em class="help-instr">(Help available, press question mark key)</em>
					</div>`
					: ""
			}\
		</li>`;
};

CIQ.UI.addComponentDefinition("cq-show-range", ShowRange);

};


let __js_webcomponents_sideNav_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-side-nav&gt;</h4>
 *
 * Responds to the `breakpoint` and `sidenav` channels to control side navigation panel
 * availability.
 *
 * @alias WebComponents.SideNav
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.5.0
 */
class SideNav extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, SideNav);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * Subscribes to the `sidenav`, `breakpoint`, and `tfc` channels. Sets the side navigation
	 * availability based on the contents of the channels.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.SideNav
	 * @since 7.5.0
	 */
	setContext(context) {
		const { config: { channels = {} } = {} } = context;
		if (this.init) return;
		this.init = true;
		const node = this.querySelector("div");
		const toggleWrapper = this.qs(".sidenav-toggle", "thisChart");
		const isOn = this.getAttribute("cq-on") || "sidenavOn";
		const isOff = this.getAttribute("cq-off") || "sidenavOff";
		const breakpointChannel = channels.breakpoint || "channel.breakpoint";
		const crosshairChannel = channels.crosshair || "layout.crosshair";
		const headsUpChannel = channels.headsUp || "layout.headsUp";
		const sidenavChannel = channels.sidenav || "layout.sidenav";
		const sidenavSizeChannel = channels.sidenavSize || "channel.sidenavSize";
		const tfcChannel = channels.tfc || "channel.tfc";

		this.insertAdjacentHTML(
			"afterend",
			"<span sidenav-placeholder aria-hidden=false></span>"
		);

		let prevBreakSm;
		let isBreakSm;
		const setActive = () => {
			const breakpointValue = this.channelRead(breakpointChannel);
			const crosshairActive = this.channelRead(crosshairChannel);
			const sideChannel = this.channelRead(sidenavChannel);

			if (
				typeof breakpointValue === "string" &&
				!breakpointValue.includes("height")
			) {
				isBreakSm = breakpointValue === "break-sm";
			}

			const show = isBreakSm && sideChannel === isOn;

			if (!node) return;
			node.classList.remove("sidenav", "ciq-toggles");
			node.classList.add(isBreakSm ? "sidenav" : "ciq-toggles");

			node.classList[show ? "add" : "remove"]("active");

			this.channelWrite(
				sidenavSizeChannel,
				show ? node.getBoundingClientRect().width : 0
			);

			if (toggleWrapper) {
				toggleWrapper
					.querySelectorAll("cq-menu")
					.forEach((el) => el.setAttribute("aria-hidden", isBreakSm));

				// For accesibilty sequencing move panel inside wrapper
				if (prevBreakSm !== isBreakSm) {
					prevBreakSm = isBreakSm;
					if (isBreakSm) {
						this.preventChildNodeDisconnect();
						toggleWrapper.append(this);
						this.preventChildNodeDisconnect(false);
					} else {
						const placeholder = this.qs("[sidenav-placeholder]", "thisChart");
						if (placeholder) {
							this.preventChildNodeDisconnect();
							placeholder.before(this);
							this.preventChildNodeDisconnect(false);
						}
					}
				}
			}

			this.setAttribute("aria-hidden", isBreakSm && !show);
			if (isBreakSm) {
				this.channelWrite(headsUpChannel, "static");
				if (!crosshairActive) this.channelWrite(crosshairChannel, false);
			}
		};

		this.channelSubscribe(sidenavChannel, setActive);
		this.channelSubscribe(breakpointChannel, setActive);
		this.channelSubscribe(tfcChannel, (isActive) => {
			if (isActive) this.channelWrite(sidenavChannel, isOff);
		});
	}

	/**
	 * Marks child toggle component status for disconnect call
	 *
	 * @param {boolean} [val] Value of disconnect status defaults to true preventing disconnect call from running.
	 * @private
	 *
	 * @tsmember WebComponents.SideNav
	 * @since 9.1.0
	 */
	preventChildNodeDisconnect(val = true) {
		this.querySelectorAll("cq-toggle").forEach((ch) => {
			if (val) ch.doNotDisconnect = val;
			else delete ch.doNotDisconnect;
		});
	}
}

CIQ.UI.addComponentDefinition("cq-side-nav", SideNav);

};


let __js_webcomponents_sidePanel_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-side-panel&gt;</h4>
 *
 * This component is a container for one or more plugins that render to the "side" of the chart.
 * It controls its own visibility as well as the visibility of the plugins within it.
 *
 * Use component's open() and close() methods to show and hide.
 *
 * _**Attributes**_
 *
 * The following attributes are supported:
 * | attribute       | description |
 * | :-------------- | :---------- |
 * | cq-active       | Reflects the shown/hidden status of the component. Read only. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component whenever the component is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "channel" |
 * | effect | "open", "close" |
 * | action | null |
 *
 * @alias WebComponents.SidePanel
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class SidePanel extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.callbacks = [];
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, SidePanel);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	setContext(context) {
		const { config, stx } = context;
		if (!config) return;

		const { channels = {} } = config;
		const resizeHandler = this.resizeMyself.bind(this);

		const handleSizeChanges = () => {
			setTimeout(resizeHandler);
		};

		const handleTfcOpen = (isOpen) => {
			if (isOpen) this.setAttribute("cq-active", true);
			else this.removeAttribute("cq-active");
			this.emitCustomEvent({
				action: null,
				cause: "channel",
				effect: isOpen ? "open" : "close"
			});

			handleSizeChanges();
		};

		this.channelSubscribe(
			channels.breakpoint || "channel.breakpoint",
			handleSizeChanges
		);
		this.channelSubscribe(channels.tfc || "channel.tfc", handleTfcOpen, stx);
	}

	/**
	 * Closes child plugins.
	 * @private
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	cleanup() {
		[...this.children].forEach((child) => {
			if (child.sidePanelActiveClass)
				child.classList.remove(child.sidePanelActiveClass);
			// turn off a child by removing the class name added to it
			else child.removeAttribute(child.sidePanelActiveAttribute); // turn off a child by removing the attribute name added to it
		});
	}

	/**
	 * Closes the side panel and all of its child plugins.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	close() {
		this.removeAttribute("cq-active");
		this.cleanup();
		this.emitCustomEvent({
			effect: "close",
			action: null
		});
		setTimeout(() => this.resizeMyself(), 0);
	}

	/**
	 * Use this method to get the width instead of querying the node directly because the side panel may be animated.
	 *
	 * @return {number} The width
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	nonAnimatedWidth() {
		let width = 0;
		[...this.children].forEach(
			(child) => (width += CIQ.elementDimensions(child).width)
		); // accumulate width of all children
		return width;
	}

	/**
	 * Opens the side panel to show more plugins.
	 *
	 * @param  {Object} params Parameters
	 * @param {string} params.selector The selector for which child to enable.
	 * @param {string} [params.className] The class name to add to turn on the panel.
	 * @param {string} [params.attribute] The attribute to add to turn on the panel.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	open(params) {
		this.cleanup();
		const children = this.querySelectorAll(params.selector);
		if (params.className) {
			[...children].forEach((child) => {
				child.classList.add(params.className);
				child.sidePanelActiveClass = params.className; // store the class name used to turn it on
			});
		} else {
			[...children].forEach((child) => {
				child.setAttribute(params.attribute, "true");
				child.sidePanelActiveAttribute = params.attribute; // store the attribute name used to turn it on
			});
		}
		this.setAttribute("cq-active", "true");
		this.emitCustomEvent({
			effect: "open",
			action: null
		});
		setTimeout(() => this.resizeMyself(), 0);
	}

	/**
	 * Sets any callback to be executed when the side panel resizes.
	 *
	 * @param {function} fc Callback function.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	registerCallback(fc) {
		this.callbacks.push(fc);
	}

	/**
	 * Resizes this component.
	 * Any registered callbacks will execute after the width adjustment.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	resizeMyself() {
		const width = this.nonAnimatedWidth();
		this.style.width = width + "px"; // expand the side panel
		this.callbacks.forEach((cb) => cb.call(this, width));

		// channel notification
		const { config, stx } = this.context || {};
		if (!config) return;
		const channel =
			(config.channels || {}).sidepanelSize || "channel.sidepanelSize";
		this.channelWrite(channel, width, stx);
	}
}

/**
 * A side panel contains children that should be enabled by calling open({selector:selector}).
 */
CIQ.UI.addComponentDefinition("cq-side-panel", SidePanel);

};


let __js_webcomponents_studies_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-studies&gt;</h4>
 *
 * This component builds a list of studies.  Clicking on a study in the list will activate it on the chart.
 * The list can be configured to not display certain studies, open the study dialog first, or allow editing as soon as the study is added.
 * Additionally, the component allows users to set favorite studies. Favorites are displayed at the top of the list.
 * The study list is alphabetized based on the language in which it is displayed.
 * Usually this component is nested within a menu or dropdown component, in order to manage the scrolling of the list.
 *
 * The results of this component can be filtered.  See {@link WebComponents.Heading} for details.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | favorites | If present, favorited studies will be promoted to the top of the list. |
 *
 * Note: The favorites feature requires importing the Study Browser plugin.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a study is selected.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | value | _study name_ |
 *
 * A custom `toggle` event will be emitted from the component when a study is favorited/unfavorited.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "toggle" |
 * | action | "click" |
 * | favorite | _true/false_ |
 * | value | _study name_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.Studies
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 5.2.0
 * - 8.8.0 Added `cq-favorites` flag.
 * - 9.1.0 Observes attributes. Added emitter.. Changed `cq-favorites` flag to `favorites`.
 *
 */
class Studies extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["favorites"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Studies);
		this.constructor = Studies;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.context) {
			CIQ.UI.unobserveProperty(
				"studyLibraryHash",
				this.context.stx.chart,
				this.listener
			);
			this.context.stx.removeEventListener("preferences", this.listener);
		}
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Studies
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		this.updateOrder();
	}

	/**
	 * Initializes and displays the list of available studies.
	 *
	 * @param {object} [params] Parameters to control initialization of the studies list.
	 * @param {object} [params.excludedStudies] A map of study names that should be excluded from
	 * 		the studies list, for example: <code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>.
	 * @param {object|boolean} [params.alwaysDisplayDialog=false] If set to boolean true (not
	 * 		truthy), the study edit dialog box is automatically opened for any of the available
	 * 		studies after the study has been added to the chart. If set to boolean false, the
	 * 		study edit dialog box is not opened for any of the available studies after the study
	 * 		has been added to the chart.
	 * 		<p>If set to an object containing a map of study names and boolean values (for example,
	 * 		<code>{&nbsp;"ma":&nbsp;true,&nbsp;"AVWAP":&nbsp;true&nbsp;}</code>), the study edit
	 * 		dialog box is opened after the study has been added to the chart for studies in the
	 * 		map that have a boolean value of true but not for those that have a value of false or
	 * 		for any studies not included in the map.
	 * @param {object|boolean} [params.dialogBeforeAddingStudy=false] If set to boolean true (not
	 * 		truthy), the study edit dialog box is automatically opened for any of the available
	 * 		studies before the study is added to the chart. If set to boolean false, the study
	 * 		edit dialog box is not opened for any of the available studies before the study is
	 * 		added to the chart.
	 * 		<p>If set to an object containing a map of study names and boolean values (for example,
	 * 		<code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>), the study edit dialog box is opened
	 * 		before the study is added to the chart for studies in the map that have a boolean value
	 * 		of true but not for those that have a value of false or for any studies not included
	 * 		in the map.
	 *
	 * @since 5.2.0 The `CIQ.UI.StudyMenu` helper has been deprecated. Please call
	 * 		`document.querySelector("cq-studies").initialize()` now.
	 *
	 * @example
	 * let params = {
	 *     excludedStudies: { "macd": true },  // Exclude studies from the list of available studies.
	 *     alwaysDisplayDialog: { "ma": true },  // Show the study preferences dialog after adding studies.
	 *     dialogBeforeAddingStudy: { "rsi": true }  // Show the study preferences dialog before adding studies.
	 * };
	 * document.querySelectorAll("cq-studies").forEach(function(i) {
	 *     i.initialize(params);
	 * });
	 *
	 * @tsmember WebComponents.Studies
	 */
	initialize(params) {
		this.params = params || {};
		this.alwaysDisplayDialog = this.params.alwaysDisplayDialog || false;
		this.excludedStudies = this.params.excludedStudies || [];
		this.renderMenu(this.context.stx);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Studies
	 */
	setContext(context) {
		const { config, stx } = context;
		this.addDefaultMarkup();
		if (config) {
			this.initialize(Object.assign({}, config.menuStudiesConfig));
		}
		const listener = () => this.renderMenu(stx);
		CIQ.UI.observeProperty("studyLibraryHash", this.context.chart, listener);
		stx.addEventListener("preferences", listener);
	}

	/**
	 * Creates a Study menu.
	 *
	 * You have the option of creating a hardcoded HTML menu and just using {@link CIQ.Studies}
	 * for processing `stxtap` attributes, or you can call this method to automatically generate
	 * the menu.
	 *
	 * @param  {CIQ.ChartEngine} stx The chart object
	 *
	 * @tsmember WebComponents.Studies
	 *
	 * @since 8.8.0 Added `stx` parameter.
	 */
	renderMenu(stx) {
		if (!CIQ.Studies) return;
		let alphabetized = [];
		let sd;

		for (let field in CIQ.Studies.studyLibrary) {
			sd = CIQ.Studies.studyLibrary[field];
			if (
				!sd ||
				this.excludedStudies[field] ||
				this.excludedStudies[sd.name] ||
				sd.siqList !== undefined
			)
				continue; // siqList = ScriptIQ entry
			if (!sd.name) sd.name = field; // Make sure there's always a name
			alphabetized.push([field, stx.translateIf(sd.name)]);
		}
		alphabetized.sort(function (lhs, rhs) {
			return lhs[1].localeCompare(rhs[1], stx.locale || "en", {
				sensitivity: "base",
				caseFirst: "upper"
			});
		});
		const tapFn = (studyName) => {
			return (e) => {
				const doc = this.document || document;
				if (e.ciqStamp && e.ciqStamp <= doc.lastTap) {
					e.stopPropagation();
					return;
				}
				const isInfoButton = e.target.classList.contains("ciq-info-btn");

				if (isInfoButton) {
					if (this.showStudyInfo) {
						this.showStudyInfo(studyName);
					}
					e.stopPropagation();
					return;
				}
				pickStudy(e, studyName);
				this.dispatchEvent(new Event("resize", { composed: true }));
			};
		};

		const { root } = this;
		let item;
		while ((item = root.querySelector(".item, cq-item"))) {
			item.remove();
		}

		const addFavorites =
			CIQ.Studies.Favorites && this.hasAttribute("favorites");

		alphabetized.forEach((study) => {
			const menuItem = CIQ.UI.makeFromTemplate(
				root.querySelector("template")
			)[0];
			sd = CIQ.Studies.studyLibrary[study[0]];

			const spanEl = menuItem.querySelector("span");
			spanEl.id = spanEl.id + sd.name.replace(/ /g, "");
			CIQ.makeTranslatableElement(spanEl || menuItem, stx, sd.name);
			menuItem.type = study[0];
			const favElement = menuItem.querySelector(".fav-marker");
			if (favElement) {
				if (addFavorites) {
					this.makeTap(favElement, getFavoriteHandler.call(this, sd, stx));
					menuItem.setAttribute("aria-labelledby", spanEl.id);
				} else {
					favElement.remove();
				}
			}

			this.makeTap(menuItem, tapFn(study[0]));
			const infoBtn = menuItem.querySelector(".ciq-info-btn");
			if (infoBtn && (!CIQ.Studies.Info || !CIQ.Studies.Info[sd.name])) {
				infoBtn.style.display = "none";
			}

			root.appendChild(menuItem);
		});
		if (addFavorites) {
			this.updateOrder();
		}

		const studyDialog = (params, addWhenDone) => {
			const { context } = this;

			if (context.config) {
				this.channelWrite(
					context.config.channels.dialog,
					{
						type: "study",
						params: Object.assign({}, params, { context, addWhenDone })
					},
					context.stx
				);
			} else {
				// legacy use when config is not available
				params.context = this.context;
				const dialog = this.ownerDocument.querySelector("cq-study-dialog");
				dialog.addWhenDone = addWhenDone;
				dialog.open(params);
			}
		};

		const pickStudy = (e, studyName) => {
			const {
				alwaysDisplayDialog = {},
				context: { stx }
			} = this;

			function handleSpecialCase(flag, params, addWhenDone) {
				if (flag === true) {
					studyDialog(params, addWhenDone);
					return true;
				} else if (typeof flag === "object") {
					for (let i in flag) {
						if (i == studyName && flag[i]) {
							studyDialog(params, addWhenDone);
							return true;
						}
					}
				}
			}

			this.emitCustomEvent({
				effect: "select",
				detail: { value: studyName }
			});

			if (
				handleSpecialCase(
					this.params.dialogBeforeAddingStudy,
					{ stx, name: studyName },
					true
				)
			) {
				return;
			}

			const studyParams = alwaysDisplayDialog[studyName]
				? { interactiveAdd: false } // interactiveAdd and dialog are not compatible
				: null;
			const sd = CIQ.Studies.addStudy(stx, studyName, null, null, studyParams);

			if (
				!e.target.classList.contains("ciq-favorite") &&
				!e.target.parentElement.classList.contains("ciq-favorite")
			)
				this.uiManager.closeMenu();
			if (
				!sd.parameters.interactiveAdd &&
				!handleSpecialCase(alwaysDisplayDialog, { sd, stx })
			)
				e.stopPropagation();
		};

		function getFavoriteHandler(sd, stx) {
			return (e) => {
				e.stopPropagation();
				const item = e.target.parentElement;
				const isFavorite = item.classList.contains("ciq-favorite");

				item.classList.add(isFavorite ? "ciq-move-down" : "ciq-move-up");

				this.emitCustomEvent({
					effect: "toggle",
					detail: { favorite: isFavorite, value: sd.name }
				});

				setTimeout(() => {
					item.classList[isFavorite ? "remove" : "add"]("ciq-favorite");
					if (CIQ.Studies.Favorites)
						CIQ.Studies.Favorites[isFavorite ? "remove" : "add"](sd.name);
					this.updateOrder();
				}, 200);
			};
		}
	}

	/**
	 * Reorders the study menu.  Order is alphabetical.  The menu is reordered when the language is changed.
	 * If there are favorites, and the Study Browser is imported, the favorited studies are sorted alphabetically
	 * on the top of the list.
	 *
	 * @tsmember WebComponents.Studies
	 */
	updateOrder() {
		if (!this.context) return;
		const { stx } = this.context;
		if (!CIQ.Studies.Favorites) return;
		CIQ.Studies.Favorites.retrieveList(stx, (favoriteList) => {
			const addFavorites = this.hasAttribute("favorites");
			const list = Array.from(this.root.querySelectorAll(".item, cq-item"));
			const favorites = favoriteList
				.filter(({ isCustomized }) => !isCustomized)
				.reduce((acc, { type }) => ({ ...acc, [type]: true }), {});

			const sortFunction = (
				{ textContent: textA, type: typeA },
				{ textContent: textB, type: typeB }
			) => {
				if (addFavorites) {
					if (favorites[typeA] && !favorites[typeB]) return -1;
					if (!favorites[typeA] && favorites[typeB]) return 1;
				}
				return textA.localeCompare(textB, stx.locale || "en", {
					sensitivity: "base",
					caseFirst: "upper"
				});
			};

			list.sort(sortFunction).forEach((item) => {
				item.classList[favorites[item.type] ? "add" : "remove"]("ciq-favorite");
				item.classList.remove("ciq-move-up");
				item.classList.remove("ciq-move-down");
				this.root.append(item);
			});
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Studies
 */
Studies.markup = `
		<template>
			<li class="item" role="group" tabindex="0" keyboard-selectable>
				<div class="fav-marker" role="menuitemcheckbox" keyboard-selectable-child>
					<div class="ciq-screen-reader">Toggle favorite</div>
				</div>
				<span id="study_" role=menuitem label></span>
			</li>
		</template>
	`;
CIQ.UI.addComponentDefinition("cq-studies", Studies);

};


let __js_webcomponents_studyContext_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-context&gt;</h4>
 *
 * This component appears when a study is right-clicked.  A menu of actions are displayed relevant to that study.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an action is clicked from the displayed menu.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "edit", "remove", "favorite", or other custom action |
 * | action | "click" |
 * | item | _object on which the action occurs, usually a study descriptor_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.StudyContext
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 4.1.0 cq-study-context is now required (cq-dialog[cq-study-context] no longer works).
 * - 9.1.0 Added emitter.
 */
class StudyContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyContext);
		this.constructor = StudyContext;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.StudyContext
	 */
	setContext(context) {
		let { markup } = this.constructor;
		const hasFavorites = !!context.topNode.querySelector(".ciq-sb-container");

		if (!hasFavorites) {
			markup = markup
				.split(/\n/g)
				.filter((line) => !/StudyEdit\.addToFavorites/i.test(line))
				.join("\n");
		}

		this.addDefaultMarkup(this, markup);
		this.classList.add("ciq-context-menu");
		super.setContext(context);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {string} effect What action was performed as a result of the stxtap event.
	 * @param {Object} item Object being effected by the action.
	 *
	 * @tsmember WebComponents.StudyContext
	 */
	postProcess(effect, item) {
		this.emitCustomEvent({
			effect,
			detail: { item }
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.StudyContext
 */
StudyContext.markup = `
		<div stxtap="StudyEdit.edit()">Edit Settings...</div>
		<div stxtap="StudyEdit.addToFavorites()">Add to Favorites</div>
		<div stxtap="StudyEdit.remove()">Delete Study</div>
	`;
CIQ.UI.addComponentDefinition("cq-study-context", StudyContext);

};


let __js_webcomponents_studyDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */










const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"studyDialog component requires first activating studies feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-study-dialog&gt;</h4>
	 *
	 * Creates and manages study dialogs based on the corresponding study library entry (title,
	 * inputs, outputs, parameters, etc.).
	 *
	 * Requires {@link CIQ.UI.StudyEdit}.
	 *
	 * _**Attributes**_
	 *
	 * The following attributes are supported (but not observed for changes):
	 * | attribute      | description |
	 * | :------------- | :---------- |
	 * | cq-study-axis  | Displays UI for selecting the y-axis position (left, right, etc.), color and for inverting the y-axis *if not shared with the primary-axis*. |
	 * | cq-study-panel | Displays UI for selecting the panel for the study (own, shared, etc.) and whether it is rendered as an underlay (under the primary chart) or an overlay (over the primary chart). Set this attribute to "alias" to have the panel names listed as "<Panel 1>", "<Panel 2>", etc.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it updates a study.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "update" |
	 * | action | "change" |
	 * | updates | _updated settings_ |
	 *
	 * `cause` and `action` are set only when the dialog is updated as a direct result of changing a form field.
	 *
	 * @example
	 * <caption> Here is an example of how to create a study dialog. We add the
	 * <code>cq-study-axis</code> and <code>cq-study-panel</code> attributes to enable form fields
	 * used to control axis position, color, study panel, and underlay/overlay.
	 * </caption>
	 * <cq-dialog>
	 *      <cq-study-dialog cq-study-axis cq-study-panel></cq-study-dialog>
	 * </cq-dialog>
	 *
	 * @alias WebComponents.StudyDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 5.2.0 Optional Attributes `cq-study-axis` and `cq-study-panel` are now available.
	 * - 6.3.0 `cq-study-axis` now also provides a check box allowing users to invert study y-axis
	 * 		if not shared with the primary-axis.
	 * - 9.1.0 Added emitter.
	 */
	class StudyDialog extends CIQ.UI.DialogContentTag {
		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.queuedUpdates = {};
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, StudyDialog);
			this.constructor = StudyDialog;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			CIQ.UI.unobserveProperty("signal", this.helper);
			super.disconnectedCallback();
		}

		/**
		 * Closes the study dialog.  This will also update the study with any changes made in the dialog.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		close() {
			if (this.addWhenDone) {
				const helper = this.helper;
				const sd = CIQ.Studies.addStudy(helper.stx, helper.name);
				if (!CIQ.isEmpty(this.queuedUpdates)) {
					helper.sd = sd;
					helper.updateStudy(this.queuedUpdates);
					this.queuedUpdates = {};
				}
				delete this.addWhenDone;
			}
		}

		/**
		 * Closes the menu that may be open on the study dialog.
		 *
		 * @param {HTMLElement} node The open menu node.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		closeActiveMenu(node) {
			const hub = this.ownerDocument.body.keystrokeHub;
			const activeMenu = this.querySelector("*.stxMenuActive");
			const uiManager = CIQ.UI.getUIManager(this);
			if (
				!activeMenu ||
				!hub ||
				!hub.tabActiveElement ||
				hub.tabActiveElement.element !== node
			)
				return;
			hub.tabActiveElement = null;
			hub.highlightHide();
			uiManager.closeMenu(activeMenu);
		}

		/**
		 * Forces a date string into yyyy-mm-dd format.
		 *
		 * @param {string} date Date in an "almost" yyyy-mm-dd format.  Meaning, it may have dashes or slashes, or no separators, but the date components must be in the proper order.
		 * @return {String} Date in yyyy-mm-dd format.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		formatDateInput(date) {
			date = date.replace(/-/g, "");
			if (!date.search(/^\d{8}$/))
				date =
					date.substring(0, 4) +
					"-" +
					date.substring(4, 6) +
					"-" +
					date.substring(6, 8);
			return date;
		}

		/**
		 * Forces a time string into HH:nn or HH:nn:ss format.  Seconds appear in the return value only if they were present in the input parameter.
		 *
		 * @param {string} time Time in an "almost" correct format.  Meaning, it may have colons or not, but the time components must be in the proper order.
		 * @return {String} Time in HH:nn or HH:nn:ss format.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		formatTimeInput(time) {
			time = time.replace(/:/g, "");
			if (!time.search(/^\d{4,6}$/))
				time =
					time.substring(0, 2) +
					":" +
					time.substring(2, 4) +
					(time.length == 4 ? "" : ":" + time.substring(4, 6));
			return time;
		}

		/**
		 * Hides the dialog.  This performs UI cleanup of the lifted menus.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		hide() {
			if (!CIQ.isEmpty(this.queuedUpdates)) {
				this.helper.updateStudy(this.queuedUpdates);
				this.queuedUpdates = {};
			}
			[...this.querySelectorAll("cq-menu")].forEach((el) => {
				if (el.unlift) el.unlift();
			});
			[...this.querySelectorAll("cq-swatch")].forEach((el) => {
				if (el.colorPicker) el.colorPicker.close();
			});
		}

		/**
		 * Creates and returns a form menu (droopdown select box) using the inputs provided.
		 *
		 * @param {string} name Menu name, ultimately used as a key for updates.
		 * @param {string} currentValue The current selection value.  This is what is displayed even when menu is closed.
		 * @param {Object} fields Options for the menu.  These are key-value pairs representing the selection value as the key and the text as the value.
		 * @param {string} section Where the menu will be placed.  Possible values are "inputs" and "parameters".
		 * @return {WebComponents.Menu} a menu webcomponent.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		makeMenu(name, currentValue, fields, section) {
			const menu = document.createElement("cq-menu");
			menu.className = "ciq-select";
			menu.setAttribute(
				"id",
				"cq-study-dialog-" + section + "-" + name.replace(/ /g, "_")
			);
			const menuContent = [];
			for (const field in fields) {
				const item = {};
				item.type = "item";
				item.label = fields[field];
				item.tap = "StudyDialog.setSelectOption"; // must call StudyDialog because the item is "lifted" and so doesn't know its parent
				item.value = [section, name, field];
				menuContent.push(item);
			}
			const translatedValue =
				fields[currentValue] || this.helper.stx.translateIf(currentValue);
			if (menu && menu.setContent) menu.setContent(menuContent, true);
			menu.setAttribute("text", translatedValue);
			menu.setAttribute("reader", translatedValue);

			return menu;
		}

		/**
		 * Opens the study dialog, showing the proper fields based on the parameters provided.
		 *
		 * @param {Object} params
		 * @param {string} [params.axisSelect] If this key is present, axis selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.panelSelect] If this key is present, panel selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.addWhenDone] If set, and adding a new study, then study will only be added if "Done" key is pressed.
		 * @param {HTMLElement} [params.caller] The HTML element that triggered this dialog to open
		 * @param {CIQ.UI.Context} [params.context] A context to set. See
		 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			this.selectTemplates();

			if (!("axisSelect" in params)) {
				params.axisSelect = this.getAttribute("cq-study-axis");
				if (params.axisSelect === "") params.axisSelect = true;
			}
			if (!("panelSelect" in params)) {
				params.panelSelect = this.getAttribute("cq-study-panel");
				if (params.panelSelect === "") params.panelSelect = true;
			}

			if (typeof params.addWhenDone !== "undefined")
				this.addWhenDone = params.addWhenDone;

			// Generate a "helper" which tells us how to create a dialog
			CIQ.UI.unobserveProperty("signal", this.helper);
			this.helper = new CIQ.Studies.DialogHelper(params);

			const dialog = this.closest("cq-dialog");
			dialog.setTitle(this.helper.title);

			super.open(params);

			CIQ.UI.observeProperty("signal", this.helper, (obj) => {
				this.refreshInputs();
				this.refreshOutputs();
				this.refreshParameters(params);
			});

			// Create form elements for all of the inputs
			this.refreshInputs(true);

			// Create form elements for all of the outputs
			this.refreshOutputs(true);

			// Create form elements for all of the parameters
			this.refreshParameters(params, true);
		}

		/**
		 * Creates/recreates the fields in the "inputs" section of the dialog.
		 *
		 * @param {boolean} [empty] If true, clears all inputs fields first.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		refreshInputs(empty) {
			const inputs = this.querySelector("cq-study-inputs");
			if (empty) [...inputs.children].forEach((child) => child.remove());
			for (let i = 0; i < this.helper.inputs.length; i++) {
				const input = this.helper.inputs[i];
				const inputContainer = document.createElement("div");
				CIQ.UI.makeFromTemplate(this.inputTemplate, inputContainer);
				const newInput = inputContainer.querySelector("cq-study-input");
				this.menuTemplate = newInput.querySelector("template[cq-menu]");
				const id = "cq-study-dialog-inputs-" + input.name.replace(/ /g, "_");
				const heading = newInput.querySelector(".ciq-heading");
				if (heading) {
					heading.innerText = input.heading;
					const label = newInput.querySelector("label");
					if (label) label.setAttribute("for", id);
				}
				newInput.setAttribute("fieldname", input.name);
				let formField = null;

				let iAttr;
				const attributes = this.helper.attributes[input.name];
				if (input.type == "number") {
					formField = document.createElement("input");
					formField.setAttribute("type", "number");
					formField.setAttribute("id", id);
					formField.value = input.value;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes) {
						let iAttrVal = attributes[iAttr];
						// poor IE/Edge can't perform decimal step validation properly, so we need to change step to any and give up the neat step effect
						if (
							(CIQ.isIE || CIQ.isEdge) &&
							iAttr == "step" &&
							Math.floor(iAttrVal) != iAttrVal
						)
							iAttrVal = "any";
						if (iAttr !== "hidden") formField.setAttribute(iAttr, iAttrVal);
					}
				} else if (
					input.type == "text" ||
					input.type == "date" ||
					input.type == "time"
				) {
					formField = document.createElement("input");
					formField.setAttribute("type", CIQ.UI.supportedInputType(input.type));
					formField.setAttribute("id", id);
					if (input.type == "date")
						formField.value = this.formatDateInput(input.value);
					else if (input.type == "time")
						formField.value = this.formatTimeInput(input.value);
					else formField.value = input.value;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes)
						if (iAttr !== "hidden")
							formField.setAttribute(iAttr, attributes[iAttr]);
				} else if (input.type == "select") {
					formField = this.makeMenu(
						input.name,
						input.value,
						input.options,
						"inputs"
					);
					if (attributes && attributes.readonly)
						formField.setAttribute("readonly", attributes.readonly);
				} else if (input.type == "checkbox") {
					formField = document.createElement("input");
					formField.setAttribute("type", "checkbox");
					formField.setAttribute("id", id);
					if (input.value) formField.checked = true;
					this.setChangeEvent(formField, "inputs", input.name);
					for (iAttr in attributes)
						if (iAttr !== "hidden")
							formField.setAttribute(iAttr, attributes[iAttr]);
				}
				if (attributes && attributes.hidden)
					[...inputContainer.children].forEach((el) => (el.hidden = true));
				if (formField) newInput.querySelector(".stx-data").append(formField);

				newInput.originalOuterHTML = newInput.outerHTML;
				const oldInput = inputs.querySelector(
					"[fieldname='" + input.name + "']"
				);
				if (!oldInput) {
					inputs.append(...inputContainer.children);
				} else if (oldInput.originalOuterHTML !== newInput.originalOuterHTML) {
					oldInput.replaceWith(newInput);
				}
			}
		}

		/**
		 * Creates/recreates the fields in the "outputs" section of the dialog.
		 *
		 * @param {boolean} [empty] If true, clears all outputs fields first.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		refreshOutputs(empty) {
			const outputs = this.querySelector("cq-study-outputs");
			if (empty) [...outputs.children].forEach((child) => child.remove());
			for (let i = 0; i < this.helper.outputs.length; i++) {
				const output = this.helper.outputs[i];
				const outputContainer = document.createElement("div");
				CIQ.UI.makeFromTemplate(this.outputTemplate, outputContainer);
				const newOutput = outputContainer.querySelector("cq-study-output");
				newOutput.initialize({
					studyDialog: this,
					output: output.name
				});
				const id = "cq-study-dialog-outputs-" + output.name.replace(/ /g, "_");
				const heading = newOutput.querySelector(".ciq-heading");
				if (heading) {
					heading.innerText = output.heading;
					const label = newOutput.querySelector("label");
					if (label) label.setAttribute("for", id);
				}
				newOutput.setAttribute("fieldname", output.name);

				newOutput.originalOuterHTML = newOutput.outerHTML;
				const oldOutput = outputs.querySelector(
					"[fieldname='" + output.name + "']"
				);
				if (!oldOutput) {
					outputs.append(...outputContainer.children);
				} else if (
					oldOutput.originalOuterHTML !== newOutput.originalOuterHTML
				) {
					oldOutput.replaceWith(newOutput);
				}
				const swatch = newOutput.querySelector("cq-swatch");
				if (swatch) {
					swatch.setAttribute("id", id);
					let color = output.color;
					if (typeof color === "object") {
						color = color.color;
					}
					swatch.setColor(color, false, output.isAuto); // don't percolate
				}

				const menu = newOutput.querySelector("cq-menu");
				const { pattern = "solid", width = 1 } = output.color || {};

				menu.icon = `ciq-${pattern}-${width}`;
			}
		}

		/**
		 * Creates/recreates the fields in the "parameters" section of the dialog.
		 *
		 * @param {Object} params
		 * @param {string} [params.axisSelect] If this key is present, axis selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.panelSelect] If this key is present, panel selection options appear in the Parameters section of the dialog.
		 * @param {string} [params.addWhenDone] If set, and adding a new study, then study will only be added if "Done" key is pressed.
		 * @param {boolean} [empty] If true, clears all parameters fields first.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		refreshParameters(params, empty) {
			const parameters = this.querySelector("cq-study-parameters");
			if (empty) [...parameters.children].forEach((child) => child.remove());
			for (let i = 0; i < this.helper.parameters.length; i++) {
				const parameter = this.helper.parameters[i];
				const paramContainer = document.createElement("div");
				CIQ.UI.makeFromTemplate(this.parameterTemplate, paramContainer);
				const newParam = paramContainer.querySelector("cq-study-parameter");
				this.menuTemplate = newParam.querySelector("template[cq-menu]");
				if (!this.menuTemplate && parameter.options) continue;

				const id =
					"cq-study-dialog-parameters-" + parameter.name.replace(/ /g, "_");
				const heading = newParam.querySelector(".ciq-heading");
				if (heading) {
					heading.innerText = parameter.heading;
					const label = newParam.querySelector("label");
					if (label) label.setAttribute("for", id);
				}
				newParam.setAttribute("fieldname", parameter.name);
				const swatch = newParam.querySelector("cq-swatch");
				let paramInput = document.createElement("input");
				let pAttr;
				let setSwatch = false;
				let attributes = {};
				if (parameter.defaultValue.constructor == Boolean) {
					paramInput.setAttribute("type", "checkbox");
					paramInput.setAttribute("id", id);
					if (parameter.value) paramInput.checked = true;
					this.setChangeEvent(
						paramInput,
						"parameters",
						parameter.name + "Enabled"
					);
					if (swatch) swatch.remove();

					attributes = this.helper.attributes[parameter.name + "Enabled"];
					for (pAttr in attributes)
						if (pAttr !== "hidden")
							paramInput.setAttribute(pAttr, attributes[pAttr]);
				} else if (parameter.defaultValue.constructor == String) {
					let paramName = parameter.name;
					paramInput.setAttribute("id", id);
					if (parameter.defaultColor) {
						newParam.initialize({
							studyDialog: this,
							parameter: parameter.name + "Color",
							params
						});
						setSwatch = true;
						paramName = paramName + "Value";
					} else {
						if (swatch) swatch.remove();
					}
					if (parameter.options) {
						paramInput = this.makeMenu(
							paramName,
							parameter.value,
							parameter.options,
							"parameters"
						);
					} else {
						paramInput.value = parameter.value;
					}
					attributes = this.helper.attributes[paramName];
					for (pAttr in attributes)
						if (pAttr !== "hidden")
							paramInput.setAttribute(pAttr, attributes[pAttr]);
				} else if (parameter.defaultValue.constructor == Number) {
					paramInput.setAttribute("type", "number");
					paramInput.setAttribute("id", id);
					paramInput.value = parameter.value;
					this.setChangeEvent(
						paramInput,
						"parameters",
						parameter.name + "Value"
					);
					newParam.initialize({
						studyDialog: this,
						parameter: parameter.name + "Color",
						params
					});
					setSwatch = true;

					attributes = this.helper.attributes[parameter.name + "Value"];
					for (pAttr in attributes) {
						let pAttrVal = attributes[pAttr];
						// poor IE/Edge can't perform decimal step validation properly, so we need to change step to any and give up the neat step effect
						if (
							(CIQ.isIE || CIQ.isEdge) &&
							pAttr == "step" &&
							Math.floor(pAttrVal) != pAttrVal
						)
							pAttrVal = "any";
						if (pAttr !== "hidden") paramInput.setAttribute(pAttr, pAttrVal);
					}
				} else continue;

				if (attributes && attributes.hidden)
					[...paramContainer.children].forEach((el) => (el.hidden = true));
				if (paramInput) newParam.querySelector(".stx-data").append(paramInput);

				newParam.originalOuterHTML = newParam.outerHTML;
				const oldParam = parameters.querySelector(
					"[fieldname='" + parameter.name + "']"
				);
				if (!oldParam) {
					parameters.append(...paramContainer.children);
				} else if (oldParam.originalOuterHTML !== newParam.originalOuterHTML) {
					oldParam.replaceWith(newParam);
				}
				if (setSwatch)
					swatch.setColor(parameter.color, false, parameter.isAuto); // don't percolate
			}
		}
		/**
		 * Sets up a handler to process changes to input fields
		 *
		 * @param {HTMLElement} node    The input field
		 * @param {string} section The section that is being updated, "inputs","outputs","parameters"
		 * @param {string} name    The name of the field being updated
		 * @private
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		setChangeEvent(node, section, name) {
			const changeCallback = (e) => {
				const { target } = e;
				const updates = {
					[section]: {
						[name]: ["checkbox", "radio"].includes(target.type)
							? target.checked
							: target.value
					}
				};
				this.updateStudy(updates, true);
			};
			node.addEventListener("change", changeCallback.bind(this));
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		setContext(context) {
			this.context = context;
			context.advertiseAs(this, "StudyDialog");
		}

		/**
		 * Accepts new menu (select box) selections.
		 *
		 * @param {object} activator The object representing the dropdown selection
		 * @param {HTMLElement} activator.node The node of the dropdown
		 * @param {string} section Section within the dialog ("inputs", "outputs", "parameters")
		 * @param {string} name Text of selection
		 * @param {string} value Value of selection
		 *
		 * @tsmember WebComponents.StudyDialog
		 *
		 * @since 5.2.0 Added `section` parameter.
		 * @since 9.1.0 Added `name` and `value` parameters.
		 */
		setSelectOption(activator, section, name, value) {
			const { node } = activator;
			name = name || node.getAttribute("name");
			value = value || node.getAttribute("value");
			const updates = {
				[section]: {
					[name]: value
				}
			};
			// Close the option menu here when selected via keyboard because keyboard navigation
			// doesn't provide the necessary mouse event to close it automatically.
			this.closeActiveMenu(node);
			this.updateStudy(updates, true);
		}

		/**
		 * Performs the updates on the study itself.
		 *
		 * @param {Object} updates Changes made in the dialog form elements from the defaults, that will be saved in the study.
		 * @param {Object} [updates.inputs] Changes made in the inputs section.
		 * @param {Object} [updates.outputs] Changes made in the outputs section.
		 * @param {Object} [updates.parameters] Changes made in the parameters section.
		 * @param {boolean} [wasChange=false] True if updating due to change in a field, False if performing a batch update.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		updateStudy(updates, wasChange = false) {
			if (this.querySelector(":invalid")) return;
			if (this.addWhenDone) {
				CIQ.extend(this.queuedUpdates, updates);
				return;
			}
			if (this.helper.libraryEntry.deferUpdate) {
				CIQ.extend(this.queuedUpdates, { inputs: updates.inputs });
				this.helper.updateStudy({
					outputs: updates.outputs,
					parameters: updates.parameters
				});
			} else {
				this.helper.updateStudy(updates);
			}
			this.emitCustomEvent({
				action: wasChange ? "change" : null,
				effect: "update",
				detail: { updates }
			});
		}

		/**
		 * Selects template elements and attaches them as class properties only once
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		selectTemplates() {
			if (this.inputTemplate) return;
			this.inputTemplate = this.querySelector("template[cq-study-input]");
			this.outputTemplate = this.querySelector("template[cq-study-output]");
			this.parameterTemplate = this.querySelector(
				"template[cq-study-parameters]"
			);
		}

		/**
		 * Updates the line style, width, and color for the study output.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node The corresponding line style dropdown.
		 * @param {number} width The selected line width.
		 * @param {string} pattern The selected line pattern.
		 *
		 * @tsmember WebComponents.StudyDialog
		 */
		setLine(activator, width, pattern) {
			const menu = CIQ.climbUpDomTree(activator.node, "cq-dropdown")[0]
				.owningMenu;
			const studyOutput = CIQ.climbUpDomTree(menu, "cq-study-output")[0];
			const { color } = studyOutput.querySelector("cq-swatch");
			menu.icon = `ciq-${pattern}-${width}`;
			this.updateStudy({
				outputs: { [studyOutput.params.output]: { width, pattern, color } }
			});
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.StudyDialog
	 */
	StudyDialog.markup = `
		<cq-scroll cq-no-maximize>
			<cq-study-inputs>
				<template cq-study-input>
					<cq-study-input>
						<label>
							<span class="ciq-heading"></span>
							<div class="stx-data">
								<template cq-menu>
									<cq-menu class="ciq-select"></cq-menu>
								</template>
							</div>
						</label>
					</cq-study-input>
					<hr>
				</template>
			</cq-study-inputs>
			<cq-study-outputs>
				<template cq-study-output>
					<cq-study-output>
						<label>
							<span class="ciq-heading"></span>
							<div class="stx-data">
								<cq-menu lift-dropdown class="ciq-select ciq-line-style" reader="Line Style" config="studyLinestyle" icon="ciq-solid-1" tooltip="Line Style"></cq-menu>
								<cq-swatch overrides="auto"></cq-swatch>
							</div>
						</label>
					</cq-study-output>
					<hr>
				</template>
			</cq-study-outputs>
			<cq-study-parameters>
				<template cq-study-parameters>
					<cq-study-parameter>
						<label>
							<span class="ciq-heading"></span>
							<div class="stx-data"><cq-swatch overrides="auto"></cq-swatch>
								<template cq-menu>
									<cq-menu class="ciq-select"></cq-menu>
								</template>
							</div>
						</label>
					</cq-study-parameter>
					<hr>
				</template>
			</cq-study-parameters>
		</cq-scroll>
		<div class="ciq-dialog-cntrls">
			<div class="ciq-btn" stxtap="close()">Done</div>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-study-dialog", StudyDialog);
}

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-output&gt;</h4>
 *
 * Set the color of study outputs in the {@link WebComponents.StudyDialog}.
 *
 * @alias WebComponents.StudyOutput
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 */
class StudyOutput extends CIQ.UI.BaseComponent {
	constructor() {
		super();
		this.type = this.tagName.split("-").pop().toLowerCase();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyOutput);
	}

	initialize(params) {
		this.params = params;
	}

	/**
	 * Sets the color swatch to the selected color.
	 * The `color` argument must be only string-type for StudyParameter component.
	 *
	 * @param {object|string} color Color value or object containing color key and value.
	 *
	 * @tsmember WebComponents.StudyOutput
	 */
	setColor(color) {
		if (!this.params) return;
		const key = `${this.type}s`;
		const updates = { [key]: {} };
		updates[key][this.params[this.type]] =
			this.type === "output" ? { color } : color;
		this.params.studyDialog.updateStudy(updates, true);
	}
}
CIQ.UI.addComponentDefinition("cq-study-output", StudyOutput);

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-parameter&gt;</h4>
 *
 * Set the color of study parameters in the {@link WebComponents.StudyDialog}.
 *
 * @alias WebComponents.StudyParameter
 * @extends WebComponents.StudyOutput
 * @class
 * @protected
 */
class StudyParameter extends StudyOutput {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyParameter);
	}
}
CIQ.UI.addComponentDefinition("cq-study-parameter", StudyParameter);

};


let __js_webcomponents_studyLegend_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"studyLegend component requires first activating studies feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-study-legend&gt;</h4>
	 *
	 * This component displays a menu of studies displayed on the chart.  It has several modes of operation:
	 * - It can be embedded in a menu dropdown to display active studies
	 * - It can be placed as a marker to display all plots (including comparisons) on a panel
	 * - Permutations of the above
	 *
	 * The legend may facilitate the following operations on the plot, depending on the attribute configuration:
	 * - Remove the plot
	 * - Disable the plot
	 * - Change the color of the plot
	 * - Edit study parameters
	 * - View comparison prices
	 *
	 * _**Keyboard control**_
	 *
	 * When selected with tab key navigation and activated with Return/Enter, this component has
	 * the following internal controls:
	 * - Up/Down arrow &mdash; Move selection between legend entries
	 * - Left/Right arrow &mdash; Select a control within a selected entry, such as
	 * the Remove button. Child elements must have the attribute `keyboard-selectable-child` set to
	 * be selectable with these keys.
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute        | description |
	 * | :--------------- | :---------- |
	 * | button-clear-all | Set to a handler to show the Clear All button. Handler will be called when button is pressed. |
	 * | button-edit      | Set to enable the edit icon, otherwise, clicking on the plot name will open edit. |
	 * | button-remove    | Set to enable the remove icon. |
	 * | clone-to-panel   | Set to place this legend on every panel. |
	 * | content-keys     | Optional selector for which nodes have content, to indicate if legend is populated.  Default is `"[label],[description]"`. |
	 * | filter           | Comma delimited list of types of plots to display. Valid values, which may be combined, are: `panel`, `overlay`, `signal`, `custom-removal` |
	 * | heading          | Set to a value to display when legend is embedded in a dropdown menu. |
	 * | marker-label     | Set to the name to display on the legend which appears on the chart, e.g. "Plots". |
	 * | series           | Set to `true` to include comparisons in the legend. |
	 *
	 * The filter values are further defined as follows:
	 * - `custom-removal`: show studies needing custom removal.
	 * - `overlay`: only show overlays.
	 * - `panel`: only show studies in this panel.
	 * - `signal`: only show signalling studies.
	 *
	 * In addition, the following attributes are also supported:
	 * | attribute    | description |
	 * | :----------- | :---------- |
	 * | chart-legend | READ ONLY, set internally by component - indicates that legend is on a chart panel, as opposed to embedded in a menu. |
	 * | cq-marker    | Set to true to allow legend to be properly positioned on a chart panel. |
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted by the component when a legend item is toggled, removed, or edited.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "toggle", remove", "edit" |
	 * | action | "click" |
	 * | name | _plot name_ |
	 * | value | _enabledstate -or- study inputs, outputs, and parameters_ |
	 *
	 * Note:
	 * -  `detail.value` not available on remove effect
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @example <caption>Legend on the chart, placed on each panel:</caption>
	 * <cq-study-legend marker-label="Plots" clone-to-panel filter="panel" button-remove="true" series="true" cq-marker></cq-study-legend>
	 * @example <caption>Legend for signals:</caption>
	 * <cq-study-legend marker-label="Signals" filter="signal" cq-marker></cq-study-legend>
	 *
	 * @alias WebComponents.StudyLegend
	 * @extends CIQ.UI.ModalTag
	 * @class
	 * @protected
	 * @since
	 * - 8.3.0 Enabled internal keyboard navigation and selection.
	 * - 8.6.0 added `cq-signal-studies-only` flag.
	 * - 9.1.0 Observes attributes. Added emitter.
	 */
	class StudyLegend extends CIQ.UI.ModalTag {
		static get observedAttributes() {
			return [
				"button-clear-all",
				"button-edit",
				"button-remove",
				"clone-to-panel",
				"content-keys",
				"filter", // "panel, overlay, signal, custom-removal"
				"heading",
				"marker-label",
				"series"
			];
		}

		constructor() {
			super();
			CIQ.UI.makeShadow(this);
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();

			this.addClaim(this);

			// Update the keyboard navigation. New study legend components can be added at runtime.
			if (this.context && this.context.config && this.context.config.channels) {
				this.channelWrite(
					this.context.config.channels.keyboardNavigation ||
						"channel.keyboardNavigation",
					{ action: "registerElements" }
				);
			}
			if (this.isShadowComponent && this.children.length) {
				while (this.children.length) {
					this.root.appendChild(this.firstChild);
				}
			}
			this.markup = this.trimInnerHTMLWhitespace();
			this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);
			this.setMarkup();
			this.setupShadow();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, StudyLegend);
			this.constructor = StudyLegend;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			if (this.context) {
				// Update the keyboard navigation. Need to remove this element from the index now that it's detached
				if (this.context.config && this.context.config.channels) {
					this.channelWrite(
						this.context.config.channels.keyboardNavigation ||
							"channel.keyboardNavigation",
						{ action: "registerElements" }
					);
				}
			}
			window.removeEventListener("resize", this.resizeListener);
			this.setActiveState(false);
			this.removeClaim(this);
			super.disconnectedCallback();
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (oldValue === newValue) return;
			this[name] = newValue;
			if (["content-keys", "heading", "button-clear-all"].includes(name)) {
				if (this.usingMarkup) {
					this.setMarkup();
				} else {
					// do nothing when using predefined content
				}
			}
			this.renderLegend();
		}

		/**
		 * Called when component is initialized, from {@link WebComponents.StudyLegend#setContext}.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		begin() {
			if (this.init) return;

			if (this.hasAttribute("cq-marker")) {
				this.setAttribute("chart-legend", "");
				CIQ.UI.stxtap(this, function (e) {
					if (e.target.isConnected && !e.target.closest("[section-dynamic]"))
						this.setActiveState();
				});
			}

			this.init = true;
		}

		/**
		 * Sets the `ciq-active` class on the component, and modalizes the legend for keyboard navigation.
		 *
		 * @param {boolean} newState `true` to show the legend, `false` to hide.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setActiveState(newState) {
			const isActive = this.classList.contains("ciq-active");
			// If newState is undefined, toggle the active state
			newState = typeof newState === "undefined" ? !isActive : newState;
			const keystrokeHub = this.ownerDocument.body.keystrokeHub;
			if (newState) {
				this.classList.add("ciq-active");
				// Treat the legend like a modal so keyboard navigation is returned after using colorPicker
				if (keystrokeHub && this.keyboardNavigation)
					keystrokeHub.addActiveModal(this);
			} else {
				this.classList.remove("ciq-active");
				if (keystrokeHub) keystrokeHub.removeActiveModal(this);
			}
		}

		/**
		 * Handler for keyboard interaction.
		 *
		 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
		 * @param {string} key Key that was stroked
		 * @param {Event} e The event object
		 * @return {boolean} true if keystroke was processed
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		keyStroke(hub, key, e) {
			if (!this.keyboardNavigation) return false;
			const items = this.qsa(
				"[keyboard-selectable]:not(.item-hidden), cq-comparison-item",
				this,
				true
			);

			if (key == " " || key == "Spacebar" || key == "Enter") {
				const focused = this.findFocused(items);
				if (!focused || !focused.length) return;
				const childItemsSelected = focused[0].querySelector(
					"[keyboard-selectable-child][cq-focused]"
				);
				if (childItemsSelected) {
					this.storeFocused(focused, childItemsSelected);
					this.clickItem(childItemsSelected, e);
				} else {
					// If no child item is seleted, but there is a swatch, go ahead and click it.
					const selectabelSwatch = focused[0].querySelector("cq-swatch");
					if (selectabelSwatch) this.clickItem(selectabelSwatch, e);
					else this.clickItem(focused[0], e);
				}
			} else if (key == "ArrowDown" || key == "Down") {
				this.focusNextItem(items);
			} else if (key == "ArrowUp" || key == "Up") {
				this.focusNextItem(items, true);
			} else if (key == "ArrowRight" || key == "Right") {
				const focused = this.findFocused(items);
				if (!focused || !focused.length) return;
				const childItems = focused[0].querySelectorAll(
					"[keyboard-selectable-child]"
				);
				if (childItems.length) this.focusNextItem(childItems);
			} else if (key == "ArrowLeft" || key == "Left") {
				const focused = this.findFocused(items)[0];
				if (!focused) return;
				const childItems = focused.querySelectorAll(
					"[keyboard-selectable-child]"
				);
				// If the end of the child items has been reached select the parent item instead
				if (childItems.length && !this.focusNextItem(childItems, true)) {
					this.removeFocused(childItems);
					this.focusItem(focused);
				}
			} else if (key === "Tab" || key === "Esc" || key === "Escape") {
				this.removeFocused(items);
				this.setActiveState(false);
				const keystrokeHub = this.ownerDocument.body.keystrokeHub;
				if (keystrokeHub) {
					keystrokeHub.highlightPosition({
						element: this,
						position: this.getBoundingClientRect()
					});
				}
			} else return false;

			return true;
		}

		/**
		 * Records last focused element.
		 *
		 * @param {HTMLElement} focused Element that had keyboard focus
		 * @param {HTMLElement} childItemsSelected Child element that was selected
		 * @private
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		storeFocused(focused, childItemsSelected) {
			let el = focused[0].querySelector("cq-label") || focused[0];
			const isSwitch = childItemsSelected.classList.contains("ciq-switch");
			if (!isSwitch) {
				el =
					(focused[0].previousElementSibling.matches("template") &&
						focused[0].previousElementSibling) ||
					focused[0].nextElementSibling;
				if (el && el.querySelector("cq-label"))
					el = el.querySelector("cq-label");
			}
			if (el) {
				this.clickedItem = {
					name: el.textContent.trim(),
					isSwitch,
					ms: +new Date()
				};
			}
		}

		/**
		 * If a color-picker is opened within this component, this will make sure the component stays active.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		launchColorPicker() {
			this.setActiveState(true);
		}

		/**
		 * Renders the legend based on the current studies in the CIQ.ChartEngine object, taking attribute settings into account.
		 * If the `series` attribute is set to `true`, comparisons will also be included in the legend.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		renderLegend() {
			if (this.currentlyDisabling) return;

			let { filter } = this;
			if (!filter) filter = "";
			filter = filter.split(",");

			if (!this.context) return;
			const { stx } = this.context;

			const template = this.root.querySelector("template[cq-study-legend]");
			while (template.nextSibling) template.nextSibling.remove();

			if (this.series === "true" && !this.root.querySelector("cq-comparison")) {
				const comparison = document.createElement("cq-comparison");
				comparison.setAttribute("chart-legend", "");
				template.insertAdjacentElement("beforebegin", comparison);
			} else if (this.series !== "true") {
				const comparison = this.root.querySelector("cq-comparison");
				if (comparison) comparison.remove();
			}

			const getSwatch = (sd) => {
				const colors = Object.values(sd.outputs);
				if (!stx.defaultColor) stx.getDefaultColor();
				const els = colors
					.slice(0, 3)
					.map((item) => {
						const color = item.color || item;
						const bgColor = CIQ.getBackgroundColor(this.parentNode);
						const border = CIQ.chooseForegroundColor(bgColor);
						const hslb = CIQ.hsl(bgColor);
						const isAuto = color === "auto";
						let fillColor = isAuto ? stx.defaultColor : color;
						const hslf = CIQ.hsl(fillColor);
						const brdr =
							(isAuto && colors.length === 1) ||
							Math.abs(hslb[2] - hslf[2]) < 0.2
								? `solid ${border} 1px`
								: "";
						const bg =
							isAuto && colors.length === 1
								? `linear-gradient(to right bottom, ${fillColor}, ${fillColor} 49%, ${bgColor} 50%, ${bgColor})`
								: isAuto
								? fillColor
								: color;
						return `<span style="border: ${brdr}; background: ${bg};"></span>`;
					})
					.join("");

				return els;
			};

			const removeStudy = (sd) => {
				return (e) => {
					e.stopPropagation();
					this.emitCustomEvent({
						effect: "remove",
						detail: { name: (sd.signalData || sd).name }
					});
					// Need to run this in the nextTick because the study legend can be removed by this click
					// causing the underlying chart to receive the mousedown (on IE win7)
					setTimeout(() => {
						if (!sd.permanent) CIQ.Studies.removeStudy(stx, sd);
						if (this.hasAttribute("cq-marker")) stx.modalEnd();
						this.renderLegend();
					}, 0);
				};
			};
			const editStudy = (sd) => {
				return (e) => {
					const {
						inputs,
						outputs,
						parameters,
						permanent,
						editFunction,
						signalData
					} = sd;
					this.emitCustomEvent({
						effect: "edit",
						detail: {
							name: (signalData || sd).name,
							value: { inputs, outputs, parameters }
						}
					});
					if (permanent || !editFunction) {
						stx.dispatch("notification", "studynoteditable");
						return;
					}
					setTimeout(() =>
						this.context
							.getAdvertised("StudyEdit")
							.editPanel({ stx, sd, inputs, outputs, parameters })
					);
				};
			};
			const handleToggle = (sd, stx) => {
				return (e) => {
					e.stopPropagation();
					this.currentlyDisabling = true;
					sd.toggleDisabledState(stx);
					let { target, currentTarget } = e;
					target.ariaPressed = !sd.disabled;

					// element inside the legend has been clicked: switch, label, span, etc.
					if (
						target !== currentTarget ||
						target.classList.contains("ciq-switch")
					)
						target = target.parentElement;
					target.classList[sd.disabled ? "remove" : "add"]("ciq-active");

					this.emitCustomEvent({
						effect: "toggle",
						detail: { name: sd.name, value: !sd.disabled }
					});
					this.currentlyDisabling = false;
				};
			};

			const panel = filter.includes("panel");
			const overlay = filter.includes("overlay");
			const customRemoval = filter.includes("custom-removal");
			const signal = filter.includes("signal");
			const markerLabel = this["marker-label"];
			const holder = this.closest(".stx-holder");
			const panelName = holder ? holder.panel.name : null;
			let isNativeMobile = false;

			const context = CIQ.UI.closestContextContainer(this);
			if (context && context.hasAttribute("ciq-native-mobile"))
				isNativeMobile = true;

			if (CIQ.Studies) {
				for (let id in stx.layout.studies) {
					const sd = stx.layout.studies[id];
					if (sd.customLegend) continue;
					if (customRemoval && !sd.study.customRemoval) continue;
					if (panel && sd.panel != panelName) continue;
					if (overlay && !sd.overlay && !sd.underlay) continue;
					if (
						(!holder || panelName === "chart") &&
						CIQ.xor(signal, sd.signalData)
					)
						continue;
					const template = this.root.querySelector("template[cq-study-legend]");
					const newChild = CIQ.UI.makeFromTemplate(template)[0];
					template.parentNode.appendChild(newChild);
					const label = newChild.querySelector("[label]");
					CIQ.makeTranslatableElement(label, stx, sd.inputs.display);
					if (!markerLabel) label.setAttribute("role", "menuitem");
					newChild.setAttribute("title", label.innerText);

					if (holder) newChild.appendChild(label);

					const { disabled, signalData } = sd;
					const swatch = newChild.querySelector(".swatch");
					if (swatch) {
						if (!holder || signalData) swatch.classList.add("hidden");
						else swatch.innerHTML = getSwatch(sd);
					}

					const toggle = newChild.querySelector(".ciq-switch");
					const labelid = CIQ.uniqueID() + "_toggle_label";
					toggle.setAttribute("aria-labelledBy", labelid);
					toggle.ariaPressed = !disabled;
					if (!disabled) newChild.classList.add("ciq-active");

					CIQ.UI.stxtap(toggle, handleToggle(sd, stx));
					const labelForToggle = newChild.querySelector("[id][hidden]");
					if (labelForToggle) labelForToggle.id = labelid;
					toggle.classList.remove("hidden");

					// restore focus
					if (
						this.clickedItem &&
						+new Date() - this.clickedItem.ms < 100 &&
						this.clickedItem.name.replace(/\u200C/g, "") ===
							sd.inputs.display.replace(/\u200C/g, "")
					) {
						this.focusItem(newChild);
						if (this.clickedItem.isSwitch) {
							this.focusItem(toggle);
						}
					}

					const close = newChild.querySelector(".close");
					if (close) {
						if (!this["button-remove"] || this["button-remove"] === "false") {
							close.classList.add("hidden");
						} else if (sd.permanent) {
							close.style.visibility = "hidden";
						} else {
							CIQ.UI.stxtap(close, removeStudy(sd));
						}
					}
					let edit = newChild.querySelector(".options");
					if (
						sd.permanent ||
						!sd.editFunction ||
						this["button-edit"] !== "true"
					) {
						if (edit) edit.classList.add("hidden");
						edit = newChild;
						label.setAttribute("role", "button");
					}
					// If there isn't an edit button, put the edit function on the parent so it responds to a keyboard navigation click
					CIQ.UI.stxtap(
						edit || newChild,
						isNativeMobile ? handleToggle(sd, stx) : editStudy(sd)
					);

					// Fixes an issue on mobile where the close study option has an unpredictable target area
					// if we don't assign a tap event to the surrounding elements
					if (CIQ.isMobile) {
						CIQ.UI.stxtap(newChild.querySelector(".swatch"), () => {});
						CIQ.UI.stxtap(newChild.querySelector("[label]"), () => {});
					}
				}

				this.setPanelLegendWidth();
			}
			//Only want to display the marker label if at least one study has been
			//rendered in the legend. If no studies are rendered, only the template tag
			//will be in there.
			if (typeof markerLabel != "undefined") {
				if (!this.root.querySelector(".marker-label")) {
					const label = document.createElement("span");
					label.className = "marker-label";
					CIQ.makeTranslatableElement(label, stx, markerLabel);

					const styles = this.root.querySelectorAll("link, style");
					this.root.insertBefore(
						label,
						styles.length
							? styles[styles.length - 1].nextSibling
							: this.root.firstChild
					);
				}
			}
			stx.translateUI(this);
			this.displayLegendTitle();
		}

		/**
		 * Legend title specified in the `marker-label` attribute will be displayed only if there are plots within the legend.
		 * It will also be translated into the selected language here.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		displayLegendTitle() {
			const notInTemplate = (el) => {
				while (el) {
					if (el.nodeName.toLowerCase() === "template") return false;
					el = el.parentElement;
				}
				return true;
			};
			const hasKeys = () => {
				// checks if key is not template as in frameworks such as React or Angular
				// templates may be rendered as regular node allowing to inner content queries
				return [
					...this.qsa(
						this["content-keys"] || "[label], [description]",
						this,
						true
					)
				].some(notInTemplate);
			};
			if (hasKeys()) {
				this.style.display = "";
				this.style.width = "";
			} else {
				this.style.display = "none";
				this.style.width = "0px";
			}

			if (this.context.stx.translateUI)
				this.context.stx.translateUI(this.node[0]);
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setContext(context) {
			if (!this.parentElement) return;
			const cloneToPanels = this["clone-to-panel"] !== undefined;
			if (cloneToPanels) {
				CIQ.UI.closestContextContainer(this).classList.add("stx-panel-legend");
				this.spawnPanelLegend();
				const cb = () => {
					if (this["clone-to-panel"] === undefined)
						context.stx.unappend("stackPanel", cb);
					else this.spawnPanelLegend();
				};
				context.stx.append("stackPanel", cb);
			}
			this.begin();
			this.changeContext(context);
		}

		/**
		 * Called for a registered component when the context is changed in a multichart environment.
		 *
		 * @param {CIQ.UI.Context} newContext The chart user interface context.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		changeContext(newContext) {
			if (!this.init) {
				// context change in multichart is executed prior setContext
				this.context = newContext;
				this.setContext(newContext);
				return;
			}
			this.eventListeners.forEach((listener) => {
				this.context.stx.removeEventListener(listener);
			});
			this.eventListeners = [
				newContext.stx.addEventListener("layout", this.renderLegend.bind(this)),
				newContext.stx.addEventListener("theme", this.renderLegend.bind(this))
			];
			this.resizeListener = this.setPanelLegendWidth.bind(this);
			window.addEventListener("resize", this.resizeListener);

			this.context = newContext;
			this.renderLegend();
		}

		/**
		 * Sets the legend width to synchronize with the placement of the panel controls.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setPanelLegendWidth() {
			if (!this.parentElement) return; // can happen if resizing whilst disconnected
			if (!this.parentElement.matches(".fixed-wrapper")) return;
			if (!CIQ.trulyVisible(this)) return;

			const panelControl = CIQ.climbUpDomTree(
					this,
					"div.stx-panel-control",
					true
				)[0],
				allButtons = panelControl.querySelectorAll(".stx-btn-panel");

			for (let button of allButtons) {
				button.style.marginLeft = "";
			}

			const firstBtn =
					panelControl.querySelector(".stx-btn-panel.stx-show") || null,
				firstBtnOffset = firstBtn ? firstBtn.offsetLeft : null,
				lastBtn = panelControl.lastChild || null,
				lastBtnOffset = lastBtn
					? lastBtn.offsetLeft + lastBtn.offsetWidth
					: null;

			const breakpointValue = this.channelRead("channel.breakpoint");
			if (breakpointValue === "break-sm") {
				firstBtn.style.marginLeft = "";
			} else {
				firstBtn.style.marginLeft =
					"-" + (lastBtnOffset - firstBtnOffset + 20) + "px";
			}
		}

		/**
		 * Creates a copy of this component on all panels, if the `clone-to-panels` attribute is set.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		spawnPanelLegend() {
			const { stx } = this.context;
			function tap(legend) {
				return function (e) {
					const clickedOn = e.currentTarget;
					if (clickedOn === this || clickedOn.matches("[label]"))
						legend.setActiveState();
				};
			}
			for (let p in stx.panels) {
				if (p == stx.chart.panel.name) continue;
				const legendHolder =
					stx.panels[p].subholder.querySelector(".stx-panel-legend");
				if (legendHolder) {
					let panelLegend = legendHolder.querySelector(this.nodeName);
					if (!panelLegend) {
						if (this.ownerDocument !== document) {
							const templ = document.createElement("template");
							templ.innerHTML = this.outerHTML;
							document.body.append(templ);
							panelLegend = CIQ.UI.makeFromTemplate(templ)[0];
							templ.remove();
						} else {
							panelLegend = this.cloneNode(true);
							panelLegend.innerHTML = this.root.innerHTML;
						}
						panelLegend.removeAttribute("clone-to-panel");
						panelLegend.removeAttribute("cq-marker");
						panelLegend.setAttribute("chart-legend", "");
						this.makeTap(panelLegend, tap(panelLegend));
						const mLabel = panelLegend.querySelector(".marker-label");
						if (mLabel) mLabel.remove();
						const fixedWrapper = document.createElement("div");
						fixedWrapper.className = "fixed-wrapper";
						fixedWrapper.appendChild(panelLegend);
						legendHolder.appendChild(fixedWrapper);
						panelLegend.begin();
					}
				}
			}
		}

		/**
		 * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setMarkup() {
			const { children } = this.root;
			if (!children.length || this.usingMarkup) {
				this.usingMarkup = true;
				if (children.length) {
					[...children].forEach((child) => {
						if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
					});
				}
				let markup = this.markup || this.constructor.markup;
				const { filter } = this;
				const rMode = new RegExp("{{mode}}", "g");
				markup = markup
					.replace("{{heading}}", this.heading || "")
					.replace("{{heading_class}}", this.heading ? "" : "hidden")
					.replace("{{heading_style}}", this.heading ? "" : "margin: 0;")
					.replace("{{button_action}}", this["button-clear-all"] || "")
					.replace("{{button_class}}", this["button-clear-all"] ? "" : "hidden")
					.replace(
						rMode,
						(filter || "").split(",").includes("signal") ? "signal" : "study"
					);
				this.addDefaultMarkup(null, markup);
				const heading = this.root.querySelector("cq-heading");
				if (heading && this.matches(".template-item *"))
					heading.classList.add("dropdown");
			}
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
	 * | mode          | "signal" or "study", based on `filter` attribute |
	 * | heading       | from attribute value |
	 * | heading_class | "hidden" if `heading` attribute not specified |
	 * | heading_style | "margin: 0;" if `heading` attribute not specified |
	 * | button_class  | "hidden" if `button-clear-all` attribute not specified |
	 * | button_action | from `button-clear-all` attribute value |
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.StudyLegend
	 */
	StudyLegend.markup = `
		<div section-dynamic>
			<h4 class="{{heading_class}}" style="{{heading_style}}">
				<cq-heading text="{{heading}}"></cq-heading>
			</h4>
			<div>
				<template cq-study-legend>
					<div class="item" role="group" keyboard-selectable>
						<span label></span>
						<span class="icon options" keyboard-selectable-child>
							<div class="ciq-screen-reader" role="button">Edit this {{mode}}</div>
						</span>
						<div class="icon close ciq-icon ciq-close" keyboard-selectable-child>
							<div class="ciq-screen-reader" role="button">Remove this {{mode}}</div>
						</div>
						<span class="ciq-switch hidden" role="button" keyboard-selectable-child aria-labelledby="xyz"></span>
						<span id="xyz" hidden>Toggle this plot</span>
						<div class="swatch"></div>
					</div>
				</template>
			</div>
			<cq-clickable cq-no-close role="button" class="clickable-item item ciq-btn sm {{button_class}}" stxtap="{{button_action}}" keyboard-selectable>
				<span>Clear All</span>
			</cq-clickable>
		</div>
	`;

	CIQ.UI.addComponentDefinition("cq-study-legend", StudyLegend);
}

};


let __js_webcomponents_swatch_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;
/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-swatch&gt;</h4>
 *
 * An interactive color swatch. Relies on the existence of a {@link CIQ.UI.ColorPicker} component.
 * Interactivity can be disabled by adding cq-static attribute.
 *
 * When a color is selected, setColor(color) will get called for any parent component with that
 * method.
 * The swatch will display special states such as "auto" or "none" with distinct images.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | color     | Active swatch color |
 * | overrides | A comma-delimited list of "colors" which should be supported by the color picker when the swatch is clicked. |
 * | static    | Set to "true" to disable interactivity. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it is clicked, and the color picker opened.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "open" |
 * | action | "click" |
 *
 * A custom event will be emitted from the component when the color is changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "setColor", undefined |
 * | effect | "change" |
 * | action | null |
 * | value | _color value_ |
 *
 * @example
 * <cq-swatch color="red" overrides="auto" static="false"></cq-swatch>
 *
 * @alias WebComponents.Swatch
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Swatch extends CIQ.UI.BaseComponent {
	static get observedAttributes() {
		return ["color", "overrides", "static"];
	}

	constructor() {
		super();
		/**
		 * Optionally set the default color for the swatch.
		 * @type {string}
		 *
		 * @tsmember WebComponents.Swatch
		 */
		this.defaultColor = null;
		this.preventPercolate = null;
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.attached = true;

		this.tapListener = (e) => {
			this.launchColorPicker();
			e.stopPropagation();
		};
		this._setInteractive(this.getAttribute("static"));
		this.setAttribute("role", "button");

		if (!this.children.length) this.addDefaultMarkup();

		if (this.color) this._updateSwatchColor(this.color, true);
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Swatch);
		this.constructor = Swatch;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Swatch
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (newValue === oldValue) return;
		this[name] = newValue;
		switch (name) {
			case "color":
				this._updateSwatchColor(newValue);
				return;
			case "overrides":
				const { activeMenuStack } = CIQ.UI.getUIManager();
				if (
					activeMenuStack &&
					activeMenuStack.length &&
					activeMenuStack[activeMenuStack.length - 1].callingNode === this
				)
					this.launchColorPicker();
				return;
			case "static":
				this._setInteractive(newValue);
				return;
		}
	}

	/**
	 * Enable/disable interactivity
	 * @param {string} staticAttr Value of the "static" attribute ("true" or "false").
	 * @private
	 *
	 * @tsmember WebComponents.Swatch
	 */
	_setInteractive(staticAttr) {
		if (typeof staticAttr === "string" && staticAttr !== "false") {
			this.style.cursor = "default";
			this.removeEventListener("stxtap", this.tapListener);
		} else {
			this.style.cursor = "pointer";
			this.addEventListener("stxtap", this.tapListener);
		}
	}

	/**
	 * Update color based on "color" attribute value.
	 * @param {string} color Color value acceptable for CSS.
	 * @param {boolean} [onConnectedCallback] True if called from `connectedCallback()`.
	 * @private
	 *
	 * @tsmember WebComponents.Swatch
	 */
	_updateSwatchColor(color, onConnectedCallback) {
		if (!color) color = "transparent";

		let bgColor = this.parentNode
			? CIQ.getBackgroundColor(this.parentNode)
			: "";
		const border = CIQ.chooseForegroundColor(bgColor);
		const hslb = CIQ.hsl(bgColor);
		const isAuto = color === "auto";
		let fillColor = isAuto ? this.getDefaultColor() : color;
		if (fillColor.indexOf("rgba(") === 0) {
			// strip out the alpha component
			fillColor = (fillColor.split(",").slice(0, 3).join(",") + ")").replace(
				/rgba/,
				"rgb"
			);
		}
		const hslf = CIQ.hsl(fillColor);
		const isTransparent = CIQ.isTransparent(color);

		this.style.background = this.value = fillColor;
		if (isAuto || Math.abs(hslb[2] - hslf[2]) < 0.2 || isTransparent) {
			this.style.border = "solid " + border + " 1px";
			if (isTransparent)
				this.style.background =
					"linear-gradient(to bottom right, transparent, transparent 49%, " +
					border +
					" 50%, transparent 51%, transparent)";
		} else {
			this.style.border = "";
		}

		if (isAuto) {
			bgColor = CIQ.chooseForegroundColor(fillColor);
			this.style.background =
				"linear-gradient(to bottom right, " +
				fillColor +
				", " +
				fillColor +
				" 49%, " +
				bgColor +
				" 50%, " +
				bgColor +
				")";
		}

		if (onConnectedCallback) return;

		this.emitCustomEvent({
			action: null,
			cause: this.cause,
			effect: "change",
			detail: {
				value: color
			}
		});

		if (this.preventPercolate === true) this.preventPercolate = null;
		else CIQ.UI.containerExecute(this, "setColor", color, this);
	}

	/**
	 * Attempts to identify the default color for the associated chart. It does so by traversing
	 * up the parent stack and looking for any component that has a context. Or you can set
	 * the default color manually by setting member variable defaultColor.
	 *
	 * @return {string} color value
	 *
	 * @tsmember WebComponents.Swatch
	 */
	getDefaultColor() {
		if (this.defaultColor) return this.defaultColor;
		const context = CIQ.UI.getMyContext(this);
		if (context) return context.stx.defaultColor; // some parent with a context
		return "transparent";
	}

	/**
	 * Sets the swatch to a color provided.
	 *
	 * @param {string} color Color value acceptable for CSS.
	 * @param {boolean} percolate If true, will "percolate" up, calling `setColor` on the closest parent wiith that function.
	 * @param {boolean} isAuto True if "auto" color selected.
	 *
	 * @since 6.2.0 Colors strip out the opacity so they are the rgb representation
	 *
	 * @tsmember WebComponents.Swatch
	 */
	setColor(color, percolate, isAuto) {
		if (!this.parentNode) return;
		if (percolate === false) this.preventPercolate = true;
		this.cause = "setColor";
		const resolvedColor = isAuto ? "auto" : color;
		this.setAttribute("color", resolvedColor);
		delete this.cause;
		const label = this.querySelector("[label]");
		if (label) label.innerText = resolvedColor;
	}

	/**
	 * Opens the color picker dialog.  This component calls this function when the swatch is tapped.
	 *
	 * @tsmember WebComponents.Swatch
	 */
	launchColorPicker() {
		if (!this.attached) return;
		CIQ.UI.containerExecute(this, "launchColorPicker");
		const colorPicker = CIQ.UI.getUIManager().getColorPicker(this);
		if (colorPicker) {
			colorPicker.callback = (color) =>
				this.setColor(color, null, color === "auto");
			let overrides = this.overrides;
			if (overrides) overrides = overrides.split(",");

			setTimeout(
				() => {
					colorPicker.display({
						node: this,
						context: CIQ.UI.getMyContext(this),
						overrides
					});
					this.colorPicker = colorPicker;
					this.emitCustomEvent({ effect: "open" });
				},
				// give time for virtual keyboard to close
				CIQ.isMobile ? 250 : 0
			);
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Swatch
 */
Swatch.markup = `
	<span class="ciq-screen-reader">Color Swatch</span>
	<span class="ciq-screen-reader" label></span>
`;
CIQ.UI.addComponentDefinition("cq-swatch", Swatch);

};


let __js_webcomponents_themeDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */







const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.ThemeHelper) {
	console.error(
		"themeDialog component requires first activating theme feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-theme-dialog&gt;</h4>
	 *
	 * Enables creation of custom chart themes.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * See {@link WebComponents.Themes} for more details on menu management for this component.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it saves a theme.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "save" |
	 * | action | "click" |
	 * | name | _theme name_ |
	 * | theme | _theme data_ |
	 *
	 * @alias WebComponents.ThemeDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 9.1.0 Added emitter.
	 */
	class ThemeDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ThemeDialog);
			this.constructor = ThemeDialog;
		}

		/**
		 * Applies changes to all charts on the screen.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		applyChanges() {
			const isMultiChart = this.context.topNode.getCharts;
			const charts = isMultiChart
				? this.context.topNode.getCharts()
				: [this.context.stx];

			charts.forEach((stx) => {
				if (!stx) return;
				this.helper.update(stx);
				stx.changeOccurred("theme");
			});
		}

		/**
		 * Closes the theme dialog box.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		close() {
			this.helper.settings = this.revert;
			this.applyChanges();
			super.close();
		}

		/**
		 * Opens the theme dialog box.
		 *
		 * @param {object} params Dialog box parameters.
		 * @param {CIQ.UI.Context} params.context The chart user interface context.
		 * @param {object} [params.initiatingMenu] The menu that contains the user interface
		 * 		control that opened the theme dialog box.
		 * @param {string} [params.themeName] Hint text for the name of the custom theme. Used in
		 * 		the theme name input field of the theme dialog box.
		 *
		 * @since 6.2.0 `basecolor` of mountain chart can be configured with "mb" piece.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			let { themeName, initiatingMenu } = params;

			this.initiatingMenu = initiatingMenu;
			this.context = params.context;
			this.helper = new CIQ.ThemeHelper({ stx: this.context.stx });
			this.revert = CIQ.clone(this.helper.settings);

			const configurePiece = (name, obj, field, type) => {
				const piece = this.querySelector(`cq-theme-piece[cq-piece="${name}"]`);
				if (!piece) return;
				piece.piece = { obj, field };
				if (type == "color") {
					piece.querySelector("cq-swatch").setColor(obj[field], false);
				}
			};
			const { settings } = this.helper;
			const candleBarSettings = settings.chartTypes["Candle/Bar"];
			configurePiece("cu", candleBarSettings.up, "color", "color");
			configurePiece("cd", candleBarSettings.down, "color", "color");
			configurePiece("wu", candleBarSettings.up, "wick", "color");
			configurePiece("wd", candleBarSettings.down, "wick", "color");
			configurePiece("bu", candleBarSettings.up, "border", "color");
			configurePiece("bd", candleBarSettings.down, "border", "color");
			configurePiece("lc", settings.chartTypes.Line, "color", "color");
			configurePiece("mb", settings.chartTypes.Mountain, "basecolor", "color");
			configurePiece("mc", settings.chartTypes.Mountain, "color", "color");
			configurePiece("bg", settings.chart.Background, "color", "color");
			configurePiece("gl", settings.chart["Grid Lines"], "color", "color");
			configurePiece("dd", settings.chart["Grid Dividers"], "color", "color");
			configurePiece("at", settings.chart["Axis Text"], "color", "color");

			if (!themeName) themeName = "My Theme";
			const input = this.querySelector("cq-action input");
			if (input) input.value = themeName;
			super.open(params);
		}

		/**
		 * Saves the custom theme and closes the theme dialog box.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		save() {
			const input = this.querySelector("cq-action input");
			const theme = {
				settings: CIQ.clone(this.helper.settings),
				name: input && input.value,
				builtIn: null
			};
			CIQ.UI.contextsForEach(function () {
				this.stx.updateListeners("theme");
			}, this);
			this.context.topNode.CIQ.UI.Components.filter(
				(n) => n.matches("cq-themes") && n.ownerDocument === this.ownerDocument
			).forEach((t) => {
				theme.builtIn = t.currentLoadedBuiltIn;
				t.addCustom(theme, this.initiatingMenu);
			});
			if (theme.name) {
				this.emitCustomEvent({
					effect: "save",
					detail: {
						name: theme.name,
						theme: theme.settings
					}
				});
			}
			super.close();
		}

		/**
		 * Sets a theme property, such as candle color, and applies the new property to all charts
		 * on the screen.
		 *
		 * @param {object} obj Contains the properties of a theme element.
		 * @param {string} field The property for which the new value is set.
		 * @param {string} value The new value for the theme property.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		setValue(obj, field, value) {
			obj[field] = value;
			this.applyChanges();
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.ThemeDialog
	 */
	ThemeDialog.markup = `
		<cq-scroll cq-no-maximize>
			<cq-section>
				<cq-placeholder>Candle Color
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="cu"><cq-swatch overrides="Hollow"></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="cd"><cq-swatch overrides="Hollow"></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Candle Wick
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="wu"><cq-swatch></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="wd"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Candle Border
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="bu"><cq-swatch overrides="No Border"></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="bd"><cq-swatch overrides="No Border"></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-separator></cq-separator>
				<cq-placeholder>Line/Bar Chart
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="lc"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-separator></cq-separator>
				<cq-placeholder>Mountain Base
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="mb"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Mountain Peak
				<cq-theme-piece-container>
					<cq-theme-piece cq-piece="mc"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-theme-piece-container>
				</cq-placeholder>
			</cq-section>
			<cq-section>
				<cq-placeholder>Background
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="bg"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Grid Lines
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="gl"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Date Dividers
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="dd"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Axis Text
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="at"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
			</cq-section>
			<cq-action>
				<div style="text-align:center;margin-top:10px;">
					<label for="cq-theme-dialog-input-name"><div>Enter name of theme:</div>
						<br>
						<input id="cq-theme-dialog-input-name" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" maxlength="40" placeholder="Name"><br>
						<br>
					</label>
					<button class="ciq-btn" stxtap="save()">Save</button>
				</div>
			</cq-action>
		</cq-scroll>
	`;
	CIQ.UI.addComponentDefinition("cq-theme-dialog", ThemeDialog);
}

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-theme-piece&gt;</h4>
 *
 * Manages an item in the theme.  The item can be a color or a flag.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when a theme piece is chosen.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "change" |
 * | action | "click" |
 * | name | _theme piece name_ |
 * | value | _theme piece value_ |
 *
 * @alias WebComponents.ThemePiece
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class ThemePiece extends CIQ.UI.BaseComponent {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ThemePiece);
	}

	/**
	 * Sets a flag in the theme for this piece.
	 * @param {boolean} result Value of flag
	 *
	 * @tsmember WebComponents.ThemePiece
	 */
	setBoolean(result) {
		CIQ.UI.containerExecute(
			this,
			"setValue",
			this.piece.obj,
			this.piece.field,
			result
		);
		this.emitCustomEvent({
			effect: "change",
			detail: { name: this.getAttribute("cq-piece"), value: result }
		});
	}

	/**
	 * Sets the color in the theme for this piece.
	 * @param {string} color CSS color, or "Hollow" or "No Border".
	 *
	 * @tsmember WebComponents.ThemePiece
	 */
	setColor(color) {
		if (color == "Hollow" || color == "No Border") {
			color = "transparent";
			this.querySelector("cq-swatch").setColor("transparent", false);
		}
		CIQ.UI.containerExecute(
			this,
			"setValue",
			this.piece.obj,
			this.piece.field,
			color
		);
		this.emitCustomEvent({
			effect: "change",
			detail: { name: this.getAttribute("cq-piece"), value: color }
		});
	}
}

CIQ.UI.addComponentDefinition("cq-theme-piece", ThemePiece);

};


let __js_webcomponents_themes_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-themes&gt;</h4>
 *
 * This web component displays available themes in a menu.  It also allows for custom themes to be removed.
 * The menu updates automatically with new themes that are created from the theme dialog.
 *
 * Built in themes are merely the names of classes that will be added to the top element of the UIContext when
 * selected.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | theme     | Name of last theme selected. Note the current theme's attributes may be changed after setting the theme. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a theme is selected or removed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select", "remove" |
 * | action | "click" |
 * | value | _theme name_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.Themes
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class Themes extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["theme"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Themes);
		this.constructor = Themes;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Themes
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (name === "theme") {
			this.load(newValue);
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Themes
	 */
	setContext(context) {
		const { config } = context;
		if (!config) return; // grid does not provide config
		const {
			chartId: id,
			themes: { builtInThemes, defaultTheme }
		} = config;
		const nameValueStore =
			config.themes.nameValueStore || config.nameValueStore;
		this.initialize({ builtInThemes, defaultTheme, nameValueStore, id });
	}

	/**
	 * Adds a custom theme
	 *
	 * @param {object} theme The theme descriptor
	 * @param {WebComponents.Themes} initiatingMenu The component which initially called ThemeDialog. This is used in order to save the new theme as the current theme.
	 *
	 * @tsmember WebComponents.Themes
	 */
	addCustom(theme, initiatingMenu) {
		this.params.customThemes[theme.name] = theme;
		this.currentThemeSettings = (theme && theme.settings) || theme;
		if (initiatingMenu === CIQ.climbUpDomTree(this, "cq-menu", true)[0])
			this.currentTheme = theme.name;
		this.configureMenu();
		this.persist();
	}

	/**
	 * Create the inner markup of the component.  The UI for the component will resmble a menu of choices,
	 * beginning with the default themes and additionally any custom themes, with the ability to remove any custom theme.
	 *
	 * @tsmember WebComponents.Themes
	 */
	configureMenu() {
		const load = (className) => {
			return (e) => {
				this.clicked = true;
				this.setAttribute("theme", className);
				delete this.clicked;
			};
		};
		[...this.builtInMenu.children].forEach(
			(child) => !child.matches("template") && child.remove()
		);
		[...this.customMenu.children].forEach(
			(child) => !child.matches("template") && child.remove()
		);
		let newMenuItem;
		const { builtInThemes, customThemes } = this.params;
		for (let className in builtInThemes) {
			newMenuItem = CIQ.UI.makeFromTemplate(this.builtInTemplate)[0];
			newMenuItem.innerText = builtInThemes[className];
			this.makeTap(newMenuItem, load(className));
			this.builtInMenu.appendChild(newMenuItem);
		}
		if (this.context.stx.translateUI)
			this.context.stx.translateUI(this.builtInMenu);

		if (this.customMenu && this.customTemplate) {
			const removeFn = (themeName) => {
				return (e) => {
					e.stopPropagation();
					this.emitCustomEvent({
						effect: "remove",
						detail: { value: themeName }
					});
					this.removeTheme(themeName);
				};
			};
			for (let themeName in customThemes) {
				newMenuItem = CIQ.UI.makeFromTemplate(this.customTemplate)[0];
				newMenuItem.querySelector("[label]").innerText = themeName;
				this.makeTap(newMenuItem, load(themeName));
				const close = newMenuItem.querySelector(".close");
				if (close) {
					close.setAttribute("keyboard-selectable-child", "");
					CIQ.UI.stxtap(close, removeFn(themeName));
				}
				this.customMenu.appendChild(newMenuItem);
			}
		}
	}

	/**
	 * Initialize the web component
	 * @param {Object} params Parameters
	 * @param {Object} [params.builtInThemes] Object map of built-in theme names, display names
	 * @param {Object} [params.defaultTheme] The default built-in theme to use
	 * @param {Object} [params.nameValueStore] A {@link CIQ.NameValueStore} object for fetching and saving theme state
	 * @param {string} [params.id] id which can be used to disambiguate when multiple charts are on the screen
	 *
	 * @tsmember WebComponents.Themes
	 */
	initialize(params) {
		if (this.initialized) return;
		this.initialized = true;

		this.addDefaultMarkup();
		this.selectTemplates(this);

		this.params = {};
		if (params) this.params = params;
		const isConstructor = (check) => typeof check === "function";
		CIQ.ensureDefaults(this.params, {
			customThemes: {},
			builtInThemes: {},
			nameValueStore: CIQ.NameValueStore && new CIQ.NameValueStore()
		});
		if (this.params.id) this.id = "themes_" + this.params.id;

		let { nameValueStore } = this.params;
		if (nameValueStore) {
			if (isConstructor(nameValueStore))
				nameValueStore = this.params.nameValueStore = new nameValueStore();
			// Retrieve any custom themes the user has created
			nameValueStore.get("CIQ.Themes.prototype.custom", (err, result) => {
				if (!err && result) {
					this.params.customThemes = result;
				}
				// Set the current theme to the last one selected by user
				nameValueStore.get(
					this.id + "CIQ.Themes.prototype.current",
					(err, result) => {
						if (!err && result && result.theme) {
							this.setAttribute("theme", result.theme);
						} else {
							this.setAttribute("theme", this.params.defaultTheme);
						}
						this.configureMenu();
					}
				);
			});
		} else {
			this.loadTheme(this.theme || this.params.defaultTheme);
		}
	}

	/**
	 * Loads a theme.
	 *
	 * @param {string} className Name of theme, for example, "ciq-night".
	 *
	 * @private
	 *
	 * @tsmember WebComponents.Themes
	 */
	load(className) {
		if (!this.context) return;
		this.loadTheme(className);
		this.emitCustomEvent({
			effect: "select",
			action: this.clicked ? "click" : null,
			detail: { value: className }
		});
		if (this.params.callback) {
			this.params.callback({ theme: this.currentTheme });
		}
		this.persist("current");
	}

	/**
	 * Loads a built-in theme.
	 *
	 * @param {string} className Name of built-in theme, for example, "ciq-night".  Built-in themes are just classes added to the component.
	 *
	 * @tsmember WebComponents.Themes
	 */
	loadBuiltIn(className) {
		if (this.currentLoadedBuiltIn) {
			this.removeThemeClass(this.currentLoadedBuiltIn);
		}
		this.addThemeClass(className);
		this.currentLoadedBuiltIn = this.currentTheme = className;
		this.reinitializeChart();
	}

	/**
	 * Loads a custom theme.
	 *
	 * @param {string} themeName Name of custom theme, which user used to save the theme when it was first created.
	 *
	 * @tsmember WebComponents.Themes
	 */
	loadCustom(themeName) {
		if (this.currentLoadedBuiltIn) {
			this.removeThemeClass(this.currentLoadedBuiltIn);
		}
		const theme = this.params.customThemes[themeName];
		if (theme.builtIn) this.addThemeClass(theme.builtIn);
		this.currentLoadedBuiltIn = theme.builtIn;
		this.currentTheme = theme.name;
		this.reinitializeChart(theme);
	}

	/**
	 * Loads a theme.
	 *
	 * @param {string} themeName Name of theme to load.
	 *
	 * @tsmember WebComponents.Themes
	 */
	loadTheme(themeName) {
		if (this.params.customThemes[themeName]) this.loadCustom(themeName);
		else if (this.params.builtInThemes[themeName]) this.loadBuiltIn(themeName);
		else this.loadBuiltIn(this.params.defaultTheme);
	}

	/**
	 * READ ONLY. All context containers on the multichart.
	 *
	 * @type {HTMLElement[]}
	 *
	 * @tsmember WebComponents.Themes
	 * @tsdeclaration
	 * const contextContainers : HTMLElement[]
	 */
	get contextContainers() {
		const topEl = this.context.topNode;
		return [topEl].concat([...topEl.querySelectorAll("cq-context")]);
	}

	/**
	 * Adds a theme class to the elements in the DOM which need it.
	 *
	 * @param {string} name Name of theme to add.
	 *
	 * @tsmember WebComponents.Themes
	 */
	addThemeClass(name) {
		const addClass = (container) => {
			container.currentTheme = name;
			container.classList.add(name);
			const { context } = container.CIQ.UI;
			const channel =
				(context.config.channels || {}).componentClass ||
				"channel.componentClass";
			this.channelWrite(channel, { [name]: "add" }, context.stx);
			//TODO see if we still need this
			//this.context.topNode.setCurrentThemeClass = (container, stx) => {
			//	stx.setThemeSettings(this.currentThemeSettings);
			//}
		};
		this.contextContainers.forEach(addClass);
		this.context.topNode.setCurrentThemeClass = addClass;
	}

	/**
	 * Removes a theme class from the elements in the DOM.
	 *
	 * @param {string} name Name of theme to remove.
	 *
	 * @tsmember WebComponents.Themes
	 */
	removeThemeClass(name) {
		const removeClass = (container) => {
			container.classList.remove(name);
			const { context } = container.CIQ.UI;
			const channel =
				(context.config.channels || {}).componentClass ||
				"channel.componentClass";
			this.channelWrite(channel, { [name]: "remove" }, context.stx);
		};
		this.contextContainers.forEach(removeClass);
		this.context.topNode.setCurrentThemeClass = null;
		this.context.topNode.currentTheme = null;
	}

	/**
	 * Adds a new custom theme to the component.
	 *
	 * @deprecated As of 9.1.0. Adding a new theme to this component is now achieved via {@link WebComponents.Themes#addCustom}.
	 *
	 * @tsmember WebComponents.Themes
	 */
	newTheme() {
		const { context } = this;
		if (context.config) {
			this.channelWrite(
				context.config.channels.dialog,
				{ type: "theme", params: { context, initiatingMenu: this } },
				context.stx
			);
		} else {
			this.ownerDocument
				.querySelector("cq-theme-dialog")
				.open({ context: this.context, initiatingMenu: this });
		}
	}

	/**
	 * Sets storage for the themes.
	 *
	 * @param {string} [which] Type of theme to store.  Valid values are `current` or `custom`.  If left blank. both types will store.
	 *
	 * @tsmember WebComponents.Themes
	 */
	persist(which) {
		if (!this.params.nameValueStore) return;
		if (!which || which == "current")
			this.params.nameValueStore.set(this.id + "CIQ.Themes.prototype.current", {
				theme: this.currentTheme
			});
		if (!which || which == "custom")
			this.params.nameValueStore.set(
				"CIQ.Themes.prototype.custom",
				this.params.customThemes
			);
	}

	/**
	 * Removes a custom theme from the component.
	 *
	 * @param {string} themeName Name of theme to remove.
	 *
	 * @tsmember WebComponents.Themes
	 */
	removeTheme(themeName) {
		let saved = false;
		this.context.topNode.CIQ.UI.Components.filter(
			(n) => n.matches("cq-themes") && n.ownerDocument === this.ownerDocument
		).forEach((t) => {
			delete t.params.customThemes[themeName];
			t.configureMenu();
			if (!saved) {
				t.persist();
				saved = true;
			}
		});
	}

	/**
	 * Copies the component's sub-elements into its properties.
	 *
	 * @private
	 *
	 * @tsmember WebComponents.Themes
	 */
	selectTemplates() {
		if (this.builtInMenu) return;
		this.builtInMenu = this.root.querySelector("div[themes-builtin]");
		this.builtInTemplate = this.builtInMenu.querySelector("template");
		this.customMenu = this.root.querySelector("div[themes-custom]");
		this.customTemplate = this.customMenu.querySelector("template");
	}

	/**
	 * Resets the chart's themes when a new theme is chosen.
	 *
	 * @private
	 * @param {object} theme
	 *
	 * @tsmember WebComponents.Themes
	 */
	reinitializeChart(theme) {
		const isMultiChart = this.context.topNode.getCharts;
		const { styles } = this.context.topNode;

		if (styles) {
			Object.values(styles).forEach((style) => {
				for (let key in style) {
					delete style[key];
				}
			});
		} else {
			this.context.topNode.styles = {};
		}

		const charts = isMultiChart
			? this.context.topNode.getCharts()
			: [this.context.stx];

		this.currentThemeSettings = (theme && theme.settings) || theme;

		charts.forEach((stx) => {
			if (stx && stx.setThemeSettings) {
				stx.setThemeSettings(theme ? theme.settings : null);
			}
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Themes
 */
Themes.markup = `
		<div>
			<div themes-builtin>
				<template>
					<div class="item" role="menuitem" keyboard-selectable></div>
				</template>
			</div>
			<div themes-custom>
				<template>
					<div class="item" keyboard-selectable>
						<span label role="menuitem"></span>
						<div class="icon close ciq-icon ciq-close">
							<div class="ciq-screen-reader" role="button">Remove this theme</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-themes", Themes);

};


let __js_webcomponents_timezoneDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */





const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

// this check is a heuristic for determining whether standard.js has been loaded
if (!CIQ.timeZoneMap) {
	console.error(
		"timezoneDialog component requires first activating timezone feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-timezone-dialog&gt;</h4>
	 *
	 * Provides content for timezone settings dialog.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it changes the timezone, or removes the current setting.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "change", "remove" |
	 * | action | "click" |
	 * | zone | _timezone_ |
	 *
	 * @alias WebComponents.TimezoneDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 9.1.0 Added emitter.
	 */
	class TimezoneDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, TimezoneDialog);
			this.constructor = TimezoneDialog;
		}

		/**
		 * Opens the dialog and sets the timezone provided by the user.
		 *
		 * @param {Object} [params] Contains the chart context.
		 * @param {CIQ.UI.Context} [params.context] A context to set for the dialog. See
		 * 		{@link CIQ.UI.DialogContentTag#setContext}.
		 *
		 * @tsmember WebComponents.TimezoneDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);
			this.context = params.context;
			const { stx } = this.context;

			const displayZone = () => {
				const currentUserTimeZone = this.querySelector(".currentUserTimeZone");
				if (stx.displayZone) {
					let fullZone = stx.displayZone;
					for (let tz in CIQ.timeZoneMap) {
						if (CIQ.timeZoneMap[tz] === stx.displayZone) fullZone = tz;
					}
					currentUserTimeZone.innerText =
						stx.translateIf("Current Timezone is") +
						" " +
						stx.translateIf(fullZone);
					button.style.display = "";
				} else {
					currentUserTimeZone.innerText = stx.translateIf(
						"Your timezone is your current location"
					);
					button.style.display = "none";
				}
			};

			const setTimezone = (zone) => {
				return (e) => {
					const translatedZone = CIQ.timeZoneMap[zone];
					CIQ.ChartEngine.defaultDisplayTimeZone = translatedZone;
					stx.setTimeZone(stx.dataZone, translatedZone);
					if (stx.chart.symbol) stx.draw();
					displayZone();
					this.emitCustomEvent({
						effect: "change",
						detail: {
							zone: translatedZone
						}
					});
				};
			};

			const ul = this.querySelector("ul, .ciq-ul");
			const button = this.querySelector(".ciq-btn");
			if (!this.template) {
				this.template = ul.querySelector("li.timezoneTemplate").cloneNode(true);
			}

			ul.innerHTML = "";
			for (let key in CIQ.timeZoneMap) {
				const li = this.template.cloneNode(true);
				li.innerHTML = stx.translateIf(key);
				CIQ.safeClickTouch(li, setTimezone(key).bind(this));
				ul.append(li);
			}

			displayZone();
		}

		/**
		 * Removes any user-selected time zone settings, and sets the time zone to the user's
		 * current location.
		 *
		 * @tsmember WebComponents.TimezoneDialog
		 */
		removeTimezone() {
			CIQ.ChartEngine.defaultDisplayTimeZone = null;
			const { stx } = this.context;
			stx.displayZone = null;
			stx.setTimeZone();

			if (stx.displayInitialized) stx.draw();

			this.emitCustomEvent({
				effect: "remove"
			});

			this.close();
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.TimezoneDialog
	 */
	TimezoneDialog.markup = `
		<p class="currentUserTimeZone"></p>
		<div class="detect">
			<div class="ciq-btn" stxtap="removeTimezone()">Use My Current Location</div>
		</div>
		<div class="timezoneDialogWrapper">
			<cq-scroll cq-no-maximize class="ciq-ul" role="listbox">
				<li class="timezoneTemplate" role="option"></li>
			</cq-scroll>
		</div>
		<div class="instruct">(Scroll for more options)</div>
	`;
	CIQ.UI.addComponentDefinition("cq-timezone-dialog", TimezoneDialog);
}

};


let __js_webcomponents_toggle_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-toggle&gt;</h4>
 *
 * When tapped/clicked, this component will toggle through different states.  Each state represents a value of an object's member;
 * for example, the object could be the chart's layout or preferences, while the member could be a property of these objects.
 * If the `member` attribute of the toggle is set, the toggle state is bound to that member, meaning, if the underlying member value
 * is changed, the toggle will change state to reflect that.
 *
 * Use [registerCallback]{@link WebComponents.Toggle#registerCallback} to receive a callback
 * every time the toggle changes. When a callback is registered, any automatic class changes are
 * bypassed.
 *
 * To bind the component's configuration, set its `config` attribute to an object in the {@link CIQ.UI.Context}.config.toggles object.
 * Using a configuration allows easy customization of callback functions.  See example below.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute      | description |
 * | :------------- | :---------- |
 * | action         | If set to "class" (the default), will set/unset the "active" class on the component when executing callbacks. |
 * | config         | Key pointing to a configuration file entry which specifies the callback functions. |
 * | help-id        | A key to the correct help text in CIQ.Help.Content. |
 * | icon           | Class name for image to use for the toggle. |
 * | member         | Object member to observe. If not provided, then callbacks are used exclusively. |
 * | multichart-distribute | Option for multichart context. Distributes object member change to all charts. |
 * | reader         | Accessibility text when focused by a screen reader. |
 * | stxtap         | Custom click handling which overrides the default toggling functionality. |
 * | toggles        | A comma-separated list of values which are toggled through with each click. The list can include "null". Stringified booleans and "null" are converted to their primitive values. All other values are passed to the Number constructor. If the result is a number (not NaN), the number is used. Otherwise the value is left as a string. |
 * | toggle-classes | A comma-separated list of classes associated with the toggle setting. If a setting requires multiple classes, they need to be separated with spaces. |
 * | tooltip        | Text for the tooltip which appears when hovering over the component. |
 * | value          | The current state of the toggle. |
 *
 * In addition, the following attributes are also supported:
 * | attribute     | description |
 * | :------------ | :---------- |
 * | active-class  | A class name to add to a binary state toggle if it is in an active state. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "toggle" |
 * | action | "click" |
 * | value | _value_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Toggle bound to layout.crosshair:</caption>
 * <cq-toggle member="layout.crosshair" reader="Crosshair" tooltip="Crosshair (Alt + \)" icon="crosshair"></cq-toggle>
 * @example <caption>Registering a callback function directly:</caption>
 * document.querySelector("cq-toggle").registerCallback(function(value){
 *    console.log("current value is " + value);
 *    if(value != false) this.classList.add("active");
 * });
 * @example <caption>Registering a callback function via the config:</caption>
 * // set the toggle component's config attribute to "example"
 * stxx.uiContext.config.toggles.example.callbacks = [function (value) {
 *    console.log("current value is " + value);
 *    if(value != false) this.classList.add("active");
 * }];
 *
 * @alias WebComponents.Toggle
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 2015
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Toggle extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return [
			"action",
			"config",
			"help-id",
			"icon",
			"member",
			"multichart-distribute",
			"reader",
			"stxtap",
			"toggles",
			"toggle-classes",
			"tooltip",
			"value"
		];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
		this.defaultParams = {
			action: "class",
			activeClass: "active",
			member: null,
			toggles: "",
			classes: {},
			callbacks: []
		};
		Object.assign(this, this.defaultParams);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);

		const activeClass = this.getAttribute("active-class");
		if (activeClass) this.activeClass = activeClass;

		this.reset();
		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Toggle);
		this.constructor = Toggle;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.disconnectObservable();
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Toggle
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (name === "value") {
			this.set(this.splitAndNormalize(newValue)[0]);
			this.postProcess();
			return;
		}
		if (name === "stxtap") CIQ.UI.BaseComponent.buildReverseBindings(this.root);
		else if (this.usingMarkup) {
			this.reset();
		} else {
			// do nothing when using predefined content
		}
	}

	/**
	 * Sets up an observable if there is a `member` supplied in the attributes.  Will remove any existing observable.
	 * The observable information is stored in the component instance's `observeInfo` property.
	 * If there is no member supplied in the attributes, you can still have the component observe
	 * an object's member manually by using the {@link CIQ.UI.observeProperty} function, but you should also
	 * set the `observeInfo` property so a proper cleanup can be performed when the component is disconnected.
	 *
	 * @example
	 * CIQ.UI.observeProperty("headsUp", stxx.layout, listenerFunction);
	 * this.observeInfo = { member: "headsUp", obj: stxx.layout, listener: listenerFunction };
	 *
	 * @tsmember WebComponents.Toggle
	 */
	connectObservable() {
		const { member, obj, listener } = this;
		if (member) {
			this.disconnectObservable();
			this.listener = () => {
				this.updateFromBinding();
			};
			CIQ.UI.observeProperty(member, obj, listener);
			this.observeInfo = { member, obj, listener };
		}
	}

	/**
	 * Removes any observable set up by {@link WebComponents.Toggle#connectObservable}.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	disconnectObservable() {
		if (!this.observeInfo) return;
		const { member, obj, listener } = this.observeInfo;
		CIQ.UI.unobserveProperty(member, obj, listener);
	}

	/**
	 * Initializes the handler when the toggle is clicked.  Called once when the context becomes available.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	begin() {
		this.connectObservable();
		if (this.tapInitialized) return;
		this.lastTap = {};
		this.tapInitialized = true;
		// Use only the stxtap attribute action if assigned as running the stxtap function will remove attributed binding
		if (this.getAttribute("stxtap")) return;
		CIQ.UI.stxtap(this, (e) => {
			e.stopPropagation();
			const tapTime = Date.now();
			if (
				this.lastTap.target !== e.target &&
				tapTime - this.lastTap.tapTime < 200
			)
				return; // prevent "double click" caused by pressing Enter
			this.lastTap = { tapTime, target: e.target };
			this.clicked = true;
			const isInDialog = CIQ.climbUpDomTree(e.target, "cq-dialog", true)[0];
			const isInMenu = CIQ.climbUpDomTree(e.target, "cq-menu", true)[0];
			this.uiManager.closeMenu(
				null,
				"cq-color-picker" +
					(isInDialog ? "" : ",cq-dialog") +
					(isInMenu ? "" : ",cq-menu")
			); // close all menus, dialogs or color pickers, unless we're the child of one (cascading)
			let toggles = this.toggles || this.defaultParams.toggles;
			if (toggles) {
				toggles = this.splitAndNormalize(toggles);
				// Cycle through each field in the array with each tap
				let i;
				for (i = 0; i < toggles.length; i++) {
					const toggle = toggles[i];
					if (this.value == toggle) {
						if (i < toggles.length - 1) this.set(toggles[i + 1]);
						else this.set(toggles[0]);
						break;
					}
				}
				if (i == toggles.length) {
					// default to first item in toggle
					this.set(toggles[0]);
				}
			} else {
				this.set(!this.value);
			}
			delete this.clicked;
		});
	}

	/**
	 * sets the layout or preferences in storage when the toggle is toggled.
	 * @private
	 *
	 * @tsmember WebComponents.Toggle
	 */
	postProcess() {
		if (!this.context) return;

		this.emitCustomEvent({
			action: this.clicked ? "click" : null,
			effect: "toggle",
			detail: { value: this.value }
		});

		const { stx } = this.context;
		stx.draw();
		const { obj } = this;
		if (obj === stx.layout) stx.changeOccurred("layout");
		if (obj === stx.preferences) stx.changeOccurred("preferences");
	}

	/**
	 * Formats the default markup, replacing any variables with the actual values provided by the attributes.
	 *
	 * @return {string} The prepared markup
	 *
	 * @tsmember WebComponents.Toggle
	 */
	getMarkup() {
		let markup = this.markup || this.constructor.markup;
		const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
		if (names)
			names.forEach((name) => {
				const key = name.substring(2, name.length - 2);
				if (["help_class", "tooltip_class"].includes(key)) return;
				const attr = this[key];
				if (attr == null) {
					if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "hidden");
					else if (key === "icon") markup = markup.replace(name, "hidden");
					else if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "hidden");
					else markup = markup.replace(name, "");
				} else {
					markup = markup.replace(name, attr || "");
					if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "");
					else if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "");
				}
			});
		return markup;
	}

	/**
	 * Adds a callback function to the toggle.
	 *
	 * @param {function} fc The callback function to add to the toggle. The function accepts the
	 * 		current value of the toggle as a parameter. The value of `this` within the callback
	 * 		function is the toggle component.
	 * @param {boolean} immediate A flag that indicates whether to immediately call the callback
	 * 		function after it has been registered with the toggle.
	 *
	 * @since 2015
	 *
	 * @tsmember WebComponents.Toggle
	 */
	registerCallback(fc, immediate) {
		if (immediate !== false) immediate = true;
		this.callbacks.push(fc);
		if (immediate) fc.call(this, this.value);
	}

	/**
	 * Formats the attribute values.
	 * By default, anything in the toggle attribute will be a string, which can cause issues when observing a member because "true"!==true.
	 * This function will set "true", "false", and "null" to be their native alternatives instead of strings.
	 * It also checks to see if it can cast the number and if it is not NaN it changes it to be a number.
	 * Be aware this will change an empty string to 0 but you shouldn't be setting an empty string!
	 *
	 * @param {any} input Input string, possibly comma-delimited
	 * @return {any[]} Formatted results, in an array and in their assumed type
	 *
	 * @tsmember WebComponents.Toggle
	 */
	splitAndNormalize(input) {
		if (typeof input === "string") {
			input = input.split(",");
			input.forEach((piece, i) => {
				if (piece === "null") piece = null;
				else if (piece === "true" || piece === "false")
					piece = piece === "true";
				else if (!isNaN(Number(piece))) piece = Number(piece);
				input[i] = piece;
			});
		} else {
			input = [input];
		}
		return input;
	}

	/**
	 * Called when an attribute changes, will regenerate the toggle component,
	 * updating whatever needs to be updated as a result of the attribute change.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	reset() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			const div = document.createElement("div");
			this.addDefaultMarkup(div, this.getMarkup());
		}
		if (!this.value && this.value !== 0) this.value = false; // if it were set to true before, leave it
		const cfgAttr = this.config;
		if (cfgAttr) {
			const helper = CIQ.UI.BaseComponent.getHelper(this, "ToggleConfig");
			if (helper && helper[cfgAttr] && helper[cfgAttr].callbacks) {
				this.callbacks = [];
				helper[cfgAttr].callbacks.forEach(function (cb) {
					if (typeof cb === "object") {
						this.registerCallback(cb.fn, cb.immediate);
					} else this.registerCallback(cb);
				}, this);
			}
		}
		if (this.context) {
			this.obj = this.context.stx.layout;
			const { contextConfig } = this;
			let member = this.originalMember || this.member;
			if (
				contextConfig &&
				contextConfig.channels &&
				contextConfig.channels[member]
			) {
				member = contextConfig.channels[member];
			}
			if (member && member.indexOf(".") !== -1) {
				const m = member.split(".");
				this.obj = this.context.stx[m[0]];
				if (typeof this.obj === "undefined") {
					this.context.stx[m[0]] = this.obj = {};
					this.originalMember = member;
				}
				member = m[1];
			}
			if (member) this.objectsMember = member;
			let toggles = this.toggles || this.defaultParams.toggles;
			if (toggles) {
				toggles = this.splitAndNormalize(toggles);
			}
			// associate class with toggle setting
			const toggleClasses = this["toggle-classes"] || "";

			// extract an array of class settings from comma or comma-space separated class list
			const toggleClassArr = toggleClasses.split(/, |,/);

			// find classes to be cleared when new setting is applied,
			// taking in account that a setting can have more than one space separated class assigned
			this.removeClasses = toggleClasses.split(/, | |,/).filter((el) => el);

			// associate each setting with applicable class(es)
			this.classes = (toggles || []).reduce(function (
				classLookup,
				setting,
				index
			) {
				classLookup[setting] = toggleClassArr[index].split(/ /);
				return classLookup;
			}, {});

			// set default value if object[member] is undefined
			if (member && this.obj[member] === undefined) {
				const defaultValue =
					toggles && toggles.length ? toggles[toggles.length - 1] : false;
				this.obj[member] = defaultValue;
			}
		}
		this.connectObservable();
		this.setAriaPressed();
	}

	/**
	 * Called when the toggle is activated through a click or change of the `value` attribute,
	 * will update whatever needs to be updated in the component as a result of the activation.  This comprises
	 * the class and aria settings.
	 *
	 * @param {any} value New value of toggle
	 *
	 * @tsmember WebComponents.Toggle
	 */
	set(value) {
		if (this.setting) return;
		this.setting = true;
		if (this.member) {
			const { context, objectsMember: member, obj } = this,
				{ stx, topNode } = context || {};
			if (
				context &&
				topNode.getCharts &&
				this.hasAttribute("multichart-distribute")
			) {
				let charts = topNode.getCharts();
				let objType = null;
				if (obj === stx.layout) objType = "layout";
				if (obj === stx.preferences) objType = "preferences";
				if (objType) {
					charts.forEach((chart) => {
						chart[objType][member] = value;
						if (chart !== stx) chart.changeOccurred(objType);
					});
				}
			}
			if (obj) obj[member] = value;
			this.value = value;
		} else {
			if (this.callbacks) this.callbacks.forEach((cb) => cb.call(this, value));
			this.value = value;
		}
		this.updateClass();
		this.setAriaPressed();
		delete this.setting;
	}

	/**
	 * Sets the aria-pressed attribute based on the component's class.
	 * A class value of either active, on or off will set the aria value.
	 * A truthy value for the component's current value will also set the aria value.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	setAriaPressed() {
		const ariaElem = this.root.querySelector("[aria-pressed]");
		if (ariaElem) {
			ariaElem.ariaPressed = this.toggles
				? !!this.matches(".active, .on, .true")
				: !!this.value;
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	setContext(context) {
		const { config } = context;
		this.contextConfig = config;
		this.reset(config);

		this.begin();
	}

	/**
	 * Called for a registered component when the context is changed in a multichart environment.
	 *
	 * @param {CIQ.UI.Context} newContext The chart user interface context.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	changeContext(newContext) {
		this.context = newContext;
		this.setContext(newContext);
	}

	/**
	 * Updates the toggle's class based on the current toggle value.
	 * Used when toggle has more than binary values.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	updateClass() {
		const { removeClasses, classes } = this;
		if (!removeClasses || this.value === undefined) {
			return;
		}

		this.classList.remove(...removeClasses);
		let currentClasses = classes[this.value];
		if (currentClasses && currentClasses[0])
			this.classList.add(...currentClasses);
	}

	/**
	 * Updates the toggle's appearance when the member to which it is bound has changed value.  For example, if the toggle
	 * controls the crosshair, if the crosshair value in the layout changes, this function will be called to keep in sync
	 * with the layout value.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	updateFromBinding() {
		this.value = this.obj[this.objectsMember];

		if (!this.callbacks.length) {
			if (this.action == "class") {
				if (this.value) {
					this.classList.add(this.activeClass);
				} else {
					this.classList.remove(this.activeClass);
				}
			}
		} else {
			this.callbacks.forEach((cb) => cb.call(this, this.value));
		}
		this.updateClass();
		this.setAriaPressed();

		if (this.member == "crosshair" && this.value === false)
			this.context.stx.doDisplayCrosshairs();
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
 * | reader        | from attribute value |
 * | icon          | from attribute value |
 * | help-id       | from attribute value |
 * | tooltip       | from attribute value |
 * | tooltip_class | "hidden" if `tooltip` attribute not specified |
 * | help_class    | "hidden" if `help-id` attribute not specified |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Toggle
 */
Toggle.markup = `
		<cq-help class="{{help_class}}" help-id="{{help-id}}"aria-hidden="true"></cq-help>
		<span class="icon {{icon}}">
			<div cq-tooltip class="{{tooltip_class}}" aria-hidden="true">{{tooltip}}</div>
		</span>
		<span class="ciq-screen-reader">
			<button type="button" aria-pressed="false" tabindex="-1">{{reader}}</button>
			<em	class="help-instr {{help_class}}">(Help available, press question mark key)</em>
		</span>
	`;

CIQ.UI.addComponentDefinition("cq-toggle", Toggle);

};


let __js_webcomponents_typedefs_ = (_exports) => {
/**
 * The following is a set of web components used in our sample templates to illustrate how the API can be leveraged to build a full featured UI to control the chart.
 *
 * Feel free to use them as provided or modify the web components to meet your needs. You can find all of the source code for these components in `js/components.js`
 * and `js/componentUI.js`.
 *
 * This implementation assumes the chart is attached to a quote feed for interactive data loading. If you will not be using a quote feed, you will need to adjust
 * these components accordingly.
 *
 * >Two special tags are required to run the framework:
 * >
 * >`cq-ui-manager` is a component that manages all menus and dialogs on the page. It does so by attaching itself to the HTML body element, monitoring touch and mouse events,
 * and then instantiating menus and dialogs. For instance, when a user taps on the screen, they expect that any open menus will be closed. This is one of the responsibilities
 * that `cq-ui-manager` assumes.
 * > <br>**One cq-ui-manager tag is allowed for the entire page, even when multiple charts are instantiated.**
 * >
 * > `cq-context` is a special tag that groups a set of components to a particular chart. Any component that is nested within a `cq-context` will look to that context
 * in order to find its chart. For instance, menu items within a `cq-context` will interact with the chart engine that is attached to the context.
 *
 * **Performance considerations:** These web components include dynamically updating modules that will react to every data change and redraw certain elements.
 * Although visually pleasing, they can sometimes cause performance issues on slow devices or when multiple charts are displayed.
 * See {@link CIQ.UI.animatePrice} for setting options.
 *
 * See {@link CIQ.UI.ContextTag}, which provides a model and base functionality for many components
 *
 * See the following tutorial for further details on how to work with and customize the included web components: {@tutorial Web Component Interface}.
 *
 * @namespace
 * @name WebComponents
 */

};


let __js_webcomponents_undo_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-undo&gt;</h4>
 *
 * This component will undo a drawing.  There is a complementary component [cq-redo]{@link WebComponents.Redo} which reverts the undo operation.
 *
 * @example
 * <cq-undo-section>
 *     <cq-undo class="ciq-btn">Undo</cq-undo>
 *     <cq-redo class="ciq-btn">Redo</cq-redo>
 * </cq-undo-section>

 * @alias WebComponents.Undo
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class Undo extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.redoButton = null;
		this.undostack = [];
		this.redostack = [];
		this.contexts = [];
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		CIQ.UI.stxtap(this, () => this.undo());
		this.setButtonStyle();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Undo);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Clears the stack of all redo or undo operations for the context
	 *
	 * @param  {CIQ.UI.Context} context The context to clear
	 *
	 * @tsmember WebComponents.Undo
	 */
	clear(context) {
		this.setButtonStyle();
	}

	/**
	 * Handles the "undoStamp" event.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 * @param {string} type Must be "undoStamp"
	 * @param {object} data
	 * @param {CIQ.Drawing[]} data.before Array of drawing objects which should exist after the undo operation.
	 *
	 * @tsmember WebComponents.Undo
	 */
	handleEvent(context, type, data) {
		this.undostack.push({ context: context, drawings: data.before });
		this.redostack = [];
		this.setButtonStyle();
	}

	/**
	 * Handler for keyboard interaction.
	 * "Ctrl-z" undoes, "Ctrl-y" redoes.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @param {CIQ.UI.Keystroke} keystroke Contains status of function keys
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Undo
	 */
	keyStroke(hub, key, e, keystroke) {
		if (key == "z" && (keystroke.ctrl || keystroke.cmd)) {
			// ctrl-z
			if (keystroke.shift) {
				this.redo();
			} else {
				this.undo();
			}
			return true;
		}
		if (key == "y" && (keystroke.ctrl || keystroke.cmd)) {
			// ctrl-y
			this.redo();
			return true;
		}
	}

	/**
	 * Sets up the undo stack for each context of a multichart setup.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 * @private
	 *
	 * @tsmember WebComponents.Undo
	 */
	manageContext(context) {
		this.addClaim(this);
		this.eventListeners.push(
			context.stx.addEventListener("undoStamp", (data) =>
				this.handleEvent(context, "undoStamp", data)
			)
		);
		this.contexts.push(context);
	}

	/**
	 * Reverts latest undone drawing.
	 *
	 * @tsmember WebComponents.Undo
	 */
	redo() {
		const state = this.redostack.pop();
		if (state) {
			const { context, drawings } = state;
			this.undostack.push({
				context,
				drawings: context.stx.exportDrawings()
			});
			context.stx.abortDrawings(true);
			context.stx.importDrawings(drawings);
			context.stx.changeOccurred("vector");
			context.stx.draw();
		}
		this.setButtonStyle();
	}

	/**
	 * Enables or disables button style
	 *
	 * @private
	 *
	 * @tsmember WebComponents.Undo
	 */
	setButtonStyle() {
		if (this.undostack.length) {
			this.setAttribute("cq-active", "true");
			this.removeAttribute("aria-disabled");
		} else {
			this.removeAttribute("cq-active");
			this.setAttribute("aria-disabled", "true");
		}
		if (this.redoButton) {
			if (this.redostack.length) {
				this.redoButton.setAttribute("cq-active", "true");
				this.redoButton.removeAttribute("aria-disabled");
			} else {
				this.redoButton.removeAttribute("cq-active");
				this.redoButton.setAttribute("aria-disabled", "true");
			}
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Undo
	 */
	setContext(context) {
		let contextArr = [this.context];
		if (this.context.topNode.getCharts) {
			const stxArr = this.context.topNode.getCharts();
			contextArr = stxArr.map((stx) => stx.uiContext);
		}
		contextArr.forEach((targetContext) => {
			this.manageContext(targetContext);
		});

		this.addInjection("append", "initializeChart", () => {
			this.undostack = [];
			this.redostack = [];
			this.clear();
		});
	}

	/**
	 * Reverts last drawing made.
	 *
	 * @tsmember WebComponents.Undo
	 */
	undo() {
		// If a drawing tool is in action, then pressing undo will kill the current tool
		let foundOne = false;
		for (let i = 0; i < this.contexts.length; i++) {
			if (this.contexts[i].stx.activeDrawing) {
				this.contexts[i].stx.undo();
				foundOne = true;
			}
		}
		if (foundOne) return;

		// otherwise proceed to popping off the stack
		const state = this.undostack.pop();
		if (state) {
			const { context, drawings } = state;
			this.redostack.push({
				context,
				drawings: context.stx.exportDrawings()
			});
			context.stx.abortDrawings(true);
			context.stx.importDrawings(drawings);
			context.stx.changeOccurred("vector");
			context.stx.draw();
		}
		this.setButtonStyle();
	}
}

CIQ.UI.addComponentDefinition("cq-undo", Undo);

};


let __js_webcomponents_viewDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-view-dialog&gt;</h4>
 *
 * Provides content for view save dialog.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * See {@link WebComponents.Views} for more details on menu management for this component.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it saves a view.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "save" |
 * | action | "click" |
 * | name | _view name_ |
 * | view | _view data_ |
 *
 * @alias WebComponents.ViewDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class ViewDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ViewDialog);
		this.constructor = ViewDialog;
	}

	/**
	 * Opens the aggregation dialog.
	 *
	 * @param {object} params
	 * @param {CIQ.UI.Context} [params.context] A context to set. See
	 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
	 *
	 * @tsmember WebComponents.ViewDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		this.querySelector("input").value = "";
		super.open(params);
	}

	/**
	 * Saves the new view. This updates all cq-view menus on the screen and persists the view in the nameValueStore.
	 *
	 * @tsmember WebComponents.ViewDialog
	 */
	save() {
		const viewName = this.querySelector("input").value;
		if (!viewName) return;

		let madeChange = false;
		let newView;
		this.updateContext();
		const layout = this.context.stx.exportLayout();
		this.context.topNode.CIQ.UI.Components.filter(
			(n) => n.matches("cq-views") && n.ownerDocument === this.ownerDocument
		).forEach((v) => {
			const obj = v.params.viewObj;
			let view;
			let i = 0;
			for (; i < obj.views.length; i++) {
				view = obj.views[i];
				if (viewName == CIQ.first(view)) break;
			}
			if (i == obj.views.length) {
				view = {};
				view[viewName] = {};
				obj.views.push(view);
			}
			view[viewName] = layout;
			delete view[viewName].candleWidth;
			v.renderMenu();
			//this.context.stx.updateListeners("layout");
			if (!madeChange) {
				// We might have a cq-view menu on multiple charts on the screen. Only persist once.
				madeChange = true;
				if (v.params.nameValueStore)
					v.params.nameValueStore.set("stx-views", obj.views);
			}
			newView = view[viewName];
		});
		if (newView) {
			this.emitCustomEvent({
				effect: "save",
				detail: {
					name: viewName,
					view: newView
				}
			});
		}
		this.close();
	}

	/**
	 * Updates chart context to that of the active chart.
	 *
	 * @tsmember WebComponents.ViewDialog
	 */
	updateContext() {
		const { topNode } = this.context;
		let activeChart = topNode.querySelector(
			"cq-context-wrapper.active cq-context"
		);

		if (!activeChart) {
			if (topNode.multiChartContainer) {
				activeChart = topNode.multiChartContainer.querySelector(
					"cq-context-wrapper.active cq-context"
				);
			}
		}
		if (activeChart) {
			this.context = activeChart.CIQ.UI.context;
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ViewDialog
 */
ViewDialog.markup = `
		<div style="text-align:center;margin-top:10px;">
			<label for="cq-view-dialog-input-name"><div>Enter name of view:</div>
				<br>
				<input id="cq-view-dialog-input-name" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" maxlength="40" placeholder="Name"></input><br>
				<br>
			</label>
			<button class="ciq-btn" stxtap="save()">Save</button>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-view-dialog", ViewDialog);

};


let __js_webcomponents_views_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-views&gt;</h4>
 *
 * This web component displays available views in a menu.  It also allows for custom views to be removed.
 * The menu updates automatically with new views that are created from the views dialog.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a view is selected or removed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select", "remove" |
 * | action | "click" |
 * | value | _layout_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.Views
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class Views extends CIQ.UI.ContextTag {
	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Views);
		this.constructor = Views;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Views
	 */
	setContext(context) {
		this.addDefaultMarkup();
		this.config = context.config;
		this.initialize();
	}

	/**
	 * Initializes the views menu.
	 *
	 * @param {object} [config] Parameters used to initialize the menu.
	 * @param {object} [config.viewObj = { views: [] }] Contains the menu items; that is, an array
	 * 		of objects that contain the specifications for saved views of the chart.
	 * @param {object} [config.nameValueStore] The class or constructor function that saves and
	 * 		retrieves the chart views by means of a name/value store. See the custom storage
	 * 		class example below. Defaults to the `nameValueStore` property of the chart
	 * 		configuration if available (see the {@tutorial Chart Configuration} tutorial);
	 * 		otherwise, defaults to {@link CIQ.NameValueStore}.
	 * @param {object} [config.renderCB = null] A callback function executed on the menu after the
	 * 		menu has been rendered. Takes the menu as an argument.
	 * @param {object} [config.cb] A callback function called when the saved views have been
	 * 		retrieved from the name/value store. No arguments are passed to the callback function.
	 *
	 * @since
	 * - 3.0.7 Added the `params.cb` parameter.
	 * - 4.1.0 The `ViewMenu` helper has been deprecated. Call
	 * 		`document.querySelector("cq-views").initialize()` instead.
	 *
	 * @example <caption>Create a custom name/value store for the <code>cq-views</code> web component.</caption>
	 * // Set the custom name/value store as the storage location for the web component.
	 * document.querySelector("cq-views").initialize({ nameValueStore: MyNameValueStore });
	 *
	 * // Create the custom name/value store.
	 * const MyNameValueStore = function() { };
	 *
	 * // Create custom storage functions using the same signatures and callback requirements as those in CIQ.NameValueStore.
	 * // For the cq-views web component, the data that is saved and retrieved is the array represented by params.viewObj.views.
	 *
	 * MyNameValueStore.prototype.set = function(name, value, cb) {
	 *     // Add code here to send the view object (value) to your repository and store it under the provided key (name).
	 *     if (cb) cb(error);
	 * };
	 *
	 * MyNameValueStore.prototype.get = function(name, cb) {
	 *     // Add code here to get the view object for the provided key (name) from your repository and pass it to the callback.
	 *     cb(error, viewObj);
	 * };
	 *
	 * MyNameValueStore.prototype.remove = function(name, cb) {
	 *     // Add code here to remove the view object associated with the provided key (name) from your repository.
	 *     if (cb) cb(error);
	 * };
	 *
	 * @example <caption>Reload the drop-down menu with the latest stored data.<br>
	 * (Useful if you are sharing the data with other applications that may also be modifying the
	 * data in real time.)</caption>
	 * let self = CIQ.UI.BaseComponent.prototype.qsa("cq-views", null, true)[0];
	 * self.params.nameValueStore.get("stx-views", function(err, obj) {
	 *     if (!err && obj) self.params.viewObj.views = obj;
	 *     else self.params.viewObj = { views: [] };
	 *     if (self.params.cb) self.params.cb.call(self);
	 *     self.renderMenu();
	 * // alternatively, if existing storage configuration is sufficient, to perform the same function:
	 * self.initialize();
	 * });
	 *
	 * @tsmember WebComponents.Views
	 */
	initialize(config) {
		if (!config) config = this.config;
		const { nameValueStore, menuViewConfig } = config;
		this.params = Object.assign({}, menuViewConfig);

		CIQ.ensureDefaults(this.params, {
			viewObj: { views: [] },
			nameValueStore:
				(nameValueStore && new nameValueStore()) ||
				(CIQ.NameValueStore && new CIQ.NameValueStore())
		});
		const { params } = this;
		if (params.nameValueStore)
			params.nameValueStore.get("stx-views", (err, obj) => {
				if (!err && obj) params.viewObj.views = obj;
				if (params.cb) params.cb.call(this);
				this.renderMenu();
			});
	}

	/**
	 * Creates the menu.
	 *
	 * @tsmember WebComponents.Views
	 */
	renderMenu() {
		const remove = (i, layout) => {
			return (e) => {
				e.stopPropagation();
				this.emitCustomEvent({
					effect: "remove",
					detail: { value: layout }
				});
				const { views } = this.params.viewObj;
				views.splice(i, 1);
				if (this.params.nameValueStore)
					this.params.nameValueStore.set("stx-views", views);
				const viewMenus =
					this.root !== this
						? CIQ.UI.shadowComponents
						: new Map(
								this.context.topNode.CIQ.UI.Components.map((el) => [
									el,
									this.context.topNode
								])
						  );

				viewMenus.forEach((ctx, el) => {
					if (el.tagName === this.tagName && ctx === this.context.topNode) {
						el.params.viewObj.views = views.slice(0);
						el.renderMenu();
					}
				});
			};
		};

		const enable = (i, layout) => {
			return (e) => {
				this.emitCustomEvent({
					effect: "select",
					detail: { value: layout }
				});
				const { loader } = this.context;
				if (loader) loader.show();
				const importLayout = () => {
					const { stx } = this.context;
					const finishImportLayout = () => {
						stx.changeOccurred("layout");
						if (loader) loader.hide();
					};
					stx.importLayout(this.params.viewObj.views[i][layout], {
						managePeriodicity: true,
						preserveTicksAndCandleWidth: true,
						cb: finishImportLayout
					});
				};
				setTimeout(importLayout, 10);
			};
		};

		this.root.querySelectorAll(".list .item").forEach((el) => el.remove());
		const div = this.root.querySelector(".list");
		this.params.viewObj.views.forEach((view, i) => {
			const key = CIQ.first(view);
			if (key == "recent") return;
			const item = CIQ.UI.makeFromTemplate(div.querySelector("template"))[0];
			const label = item.querySelector("[label]");
			if (label) {
				label.innerText = key; //using innerText here to prevent script injection
				const trimmedKey = key.trim().replace(/\s+/g, "-"); // replace inner whitespace with dashes
				label.classList.add("view-name-" + trimmedKey);
			}
			const removeView = item.querySelector(".close");
			if (removeView) {
				removeView.setAttribute("keyboard-selectable-child", "");
				CIQ.UI.stxtap(removeView, remove(i, key));
			}
			this.makeTap(item, enable(i, key));
			div.appendChild(item);
		});
		if (this.params.renderCB) this.params.renderCB(this);
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Views
 */
Views.markup = `
		<div class="list" filter-name="views">
			<template>
				<div class="item" keyboard-selectable>
					<span label role="menuitem"></span>
					<div class="icon close ciq-icon ciq-close">
						<div class="ciq-screen-reader" role="button">Remove this view</div>
					</div>
				</div>
			</template>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-views", Views);

};


let __js_webcomponents_volumeProfileSettingsDialog_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */



const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-volumeprofile-settings-dialog&gt;</h4>
 *
 * Additional dialog for setting volume profile settings, specifically what is to appear in the callout for the volume profile drawing tool.
 *
 * A custom event will be emitted from the component when any of its fields are changed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | field | _name of field toggled_ |
 * | value | _true or false_ |
 *
 * @alias WebComponents.VolumeprofileSettingsDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 8.4.0
 * - 9.1.0 Added emitter.
 */
class VolumeprofileSettingsDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, VolumeprofileSettingsDialog);
		this.constructor = VolumeprofileSettingsDialog;
	}

	/**
	 * Ensures that when the dialog is opened the input field is populated with the correct value.
	 * Also installs a listener to report changes to the value so the drawing can get updated.
	 *
	 * @param {Object} params parameters
	 * @param {HTMLElement} params.caller The HTML element that triggered this dialog to open
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.VolumeprofileSettingsDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		super.open(params);

		if (params) this.opener = params.caller;
		const { currentVectorParameters: vectorParams } = this.context.stx;
		if (!vectorParams.volumeprofile) vectorParams.volumeprofile = {};
		const settings = vectorParams.volumeProfile;
		const inputField = this.querySelector(
			'div[fieldname="Price Buckets"] input'
		);
		inputField.value = settings.priceBuckets;
		if (inputField.changeHandler)
			inputField.removeEventListener("change", inputField.changeHandler);

		inputField.changeHandler = ({ target }) => {
			const intVal = parseInt(target.value);
			if (isNaN(intVal)) return;

			settings.priceBuckets = intVal;
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.opener.dispatchEvent(event);
			this.emitCustomEvent({
				effect: "change",
				detail: {
					field: "priceBuckets",
					value: intVal
				}
			});
		};

		inputField.addEventListener("change", inputField.changeHandler);
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.VolumeprofileSettingsDialog
 */
VolumeprofileSettingsDialog.markup = `
	<cq-scroll cq-no-maximize>
		<div class="ciq-drawing-dialog-setting" fieldname="Price Buckets">
			<div class="ciq-heading">Price Buckets</div>
			<div class="stx-data">
				<input type="number" min="1" step="1">
			</div>
		</div
	</cq-scroll>
	<div class="ciq-dialog-cntrls">
		<div class="ciq-btn" stxtap="close()">Done</div>
	</div>
`;
CIQ.UI.addComponentDefinition(
	"cq-volumeprofile-settings-dialog",
	VolumeprofileSettingsDialog
);

};


let __js_webcomponents_waveParameters_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-wave-parameters&gt;</h4>
 *
 * The wave parameters web component is used to supplement the [cq-drawing-settings]{@link WebComponents.DrawingSettings} component.
 * It displays additional settings options specific to the Elliott Wave drawing tool.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute  | description |
 * | :--------- | :---------- |
 * | corrective | Sequence of labels representing the corrective wave. |
 * | decoration | Vertex labeling style. |
 * | impulse    | Sequence of labels representing the impulse wave. |
 * | show-lines | Whether the lines are drawn between vertices. |
 * | template   | Wave pattern.  Changing this may change other attributes automatically. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | name | _property_ |
 * | value | _value_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Markup for Wave Parameters</caption>
 *		<cq-wave-parameters role="group" aria-label="Wave Parameters"></cq-wave-parameters>
 *
 * @alias WebComponents.WaveParameters
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class WaveParameters extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["corrective", "decoration", "impulse", "show-lines", "template"];
	}

	static templates() {
		return {
			"Grand Supercycle": {
				impulse: ["I", "II", "III", "IV", "V"],
				corrective: ["a", "b", "c"],
				decoration: "enclosed"
			},
			Supercycle: {
				impulse: ["I", "II", "III", "IV", "V"],
				corrective: ["a", "b", "c"],
				decoration: "parentheses"
			},
			Cycle: {
				impulse: ["I", "II", "III", "IV", "V"],
				corrective: ["a", "b", "c"],
				decoration: "none"
			},
			Primary: {
				impulse: ["1", "2", "3", "4", "5"],
				corrective: ["A", "B", "C"],
				decoration: "enclosed"
			},
			Intermediate: {
				impulse: ["1", "2", "3", "4", "5"],
				corrective: ["A", "B", "C"],
				decoration: "parentheses"
			},
			Minor: {
				impulse: ["1", "2", "3", "4", "5"],
				corrective: ["A", "B", "C"],
				decoration: "none"
			},
			Minute: {
				impulse: ["i", "ii", "iii", "iv", "v"],
				corrective: ["a", "b", "c"],
				decoration: "enclosed"
			},
			Minuette: {
				impulse: ["i", "ii", "iii", "iv", "v"],
				corrective: ["a", "b", "c"],
				decoration: "parentheses"
			},
			"Sub-Minuette": {
				impulse: ["i", "ii", "iii", "iv", "v"],
				corrective: ["a", "b", "c"],
				decoration: "none"
			}
		};
	}

	constructor() {
		super();
		this.templates = WaveParameters.templates();
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.template = "Grand Supercycle";
		if (this.children.length === 0) this.addDefaultMarkup();
		this.templateHeader = this.qsa(".ciq-active-template", this, true)[0];
		this.impulseHeader = this.qsa(".ciq-active-impulse", this, true)[0];
		this.correctiveHeader = this.qsa(".ciq-active-corrective", this, true)[0];
		this.decorators = {
			none: this.qsa(".ciq-btn:nth-of-type(1n)", this, true)[0],
			parentheses: this.qsa(".ciq-btn:nth-of-type(2n)", this, true)[0],
			enclosed: this.qsa(".ciq-btn:nth-of-type(3n)", this, true)[0]
		};
		this.lineToggleCheckbox = this.qsa("span.ciq-checkbox", this, true)[0];
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, WaveParameters);
		this.constructor = WaveParameters;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		const action = this.activator ? "click" : null;
		delete this.activator;

		this[name] = newValue;
		if (!this.stx) return;
		let vector = this.stx.currentVectorParameters;
		let waveParameters = vector.waveParameters || {};
		let parameters;
		switch (name) {
			case "template":
				let newTemplate = this.templates[newValue];
				if (newTemplate) {
					parameters = {
						decoration: newTemplate.decoration
					};
				}
				this.update(null, "template", newValue);
				break;
			case "impulse":
			case "corrective":
				parameters = { [name]: newValue && newValue.split(",") };
				this.update(null, name, newValue);
				break;
			case "decoration":
				parameters = { decoration: newValue };
				this.update(null, "decoration", newValue);
				break;
			case "show-lines":
				parameters = { showLines: newValue };
				this.update(null, "showLines", newValue);
				break;
			default:
				break;
		}
		vector.waveParameters = Object.assign(waveParameters, parameters);

		if (!this.context || (name === "template" && this.customizingTemplate))
			return;

		this.emitCustomEvent({
			action,
			effect: "select",
			detail: { name, value: newValue === undefined ? null : newValue }
		});
	}

	/**
	 * Initializes the parameters.  Called from {@link Webcomponents.DrawingSettings#sync}.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	activate() {
		const { stx } = this;
		if (!stx) return;
		this.cvp = stx.currentVectorParameters;
		if (!this.cvp.waveParameters) this.template = "Grand Supercycle";
		this.update(null, "template", this.template);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	setContext(context) {
		this.stx = context.stx;
	}

	/**
	 * Toggle whether to show lines on wave drawing, or just vertices.
	 *
	 * @param {Object} [activator] Pass `null` when calling programmatically.
	 * @param {HTMLElement} [activator.node] Element that triggered this function.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	toggleLines(activator) {
		this.activator = activator;
		let checkbox = this.lineToggleCheckbox;
		let active = this["show-lines"];
		this["show-lines"] = !active;
		if (active) checkbox.classList.remove("ciq-active");
		else checkbox.classList.add("ciq-active");
		checkbox.setAttribute("aria-checked", (!active).toString());
	}

	/**
	 * Updates the wave parameters settings.
	 *
	 * @param {Object} [activator] Pass `null` when calling programmatically.
	 * @param {HTMLElement} [activator.node] Element that triggered this function.
	 * @param {string} field The field to update
	 * @param {number} value Value of the field to update.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	update(activator, field, value) {
		let isTemplate = field === "template";
		if (!isTemplate) {
			this.activator = activator;
			if (field === "decoration") {
				for (let d in this.decorators) {
					this.decorators[d].classList[d === value ? "add" : "remove"](
						"ciq-active"
					);
					this.decorators[d].setAttribute(
						"aria-checked",
						(d === value).toString()
					);
				}
				this.decoration = value;
			} else if (field === "impulse" || field === "corrective") {
				let u = value ? value.split(",") : value;
				this[field] = value;
				this[field + "Header"].setAttribute("text", u ? u.join(" ") : "- - -");
			}
			if (field === "showLines") {
				this["show-lines"] = value;
				this.lineToggleCheckbox.classList[value === "true" ? "add" : "remove"](
					"ciq-active"
				);
				this.lineToggleCheckbox.setAttribute("aria-checked", value);
			} else if (!this.customizingTemplate) {
				this.template = "Custom";
				this.templateHeader.setAttribute("text", this.template);
			}
		} else {
			let newTemplate = this.templates[value];
			if (newTemplate) {
				this.customizingTemplate = true;
				this.impulse = newTemplate.impulse.join(",");
				this.impulseHeader.setAttribute("text", newTemplate.impulse.join(" "));

				this.corrective = newTemplate.corrective.join(",");
				this.correctiveHeader.setAttribute(
					"text",
					newTemplate.corrective.join(" ")
				);

				for (let d in this.decorators) {
					this.decorators[d].classList.remove("ciq-active");
					this.decorators[d].setAttribute("aria-checked", "false");
				}
				let decorator = newTemplate.decoration || "none";
				this.decorators[decorator].classList.add("ciq-active");
				this.decorators[decorator].setAttribute("aria-checked", "true");
				this.decoration = decorator;

				this["show-lines"] = true;
				this.lineToggleCheckbox.classList.add("ciq-active");
				this.lineToggleCheckbox.setAttribute("aria-checked", "true");

				this.cvp.waveParameters = CIQ.clone(newTemplate);
				this.cvp.waveParameters.showLines = true;

				this.activator = activator;
				this.customizingTemplate = false;
				this.template = value;
				this.templateHeader.setAttribute("text", value);
			} else {
				this.cvp.waveParameters = {
					corrective: this.corrective && this.corrective.split(","),
					impulse: this.impulse && this.impulse.split(","),
					decoration: this.decoration,
					showLines: this["show-lines"]
				};
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
 * @tsmember WebComponents.WaveParameters
 */
WaveParameters.markup = `
		<div class="ciq-wave-template" cq-section>
			<div class="ciq-heading">WAVE TEMPLATE</div>
			<cq-menu class="ciq-select ciq-active-template" reader="WAVE TEMPLATE" config="wavetemplate" text="WAVE TEMPLATE"></cq-menu>
		</div>
		<div class="ciq-wave-impulse" cq-section>
			<div class="ciq-heading">IMPULSE</div>
			<cq-menu class="ciq-select ciq-active-impulse" reader="IMPULSE" config="waveimpulse" text="IMPULSE"></cq-menu>
		</div>
		<div class="ciq-wave-corrective" cq-section>
			<div class="ciq-heading">CORRECTIVE</div>
			<cq-menu class="ciq-select ciq-active-corrective" reader="CORRECTIVE" config="wavecorrective" text="CORRECTIVE"></cq-menu>
		</div>
		<div role="radiogroup" aria-label="Vertex Options" cq-section>
			<span role="radio" class="ciq-icon-btn ciq-btn" decoration="none" stxtap="update('decoration','none')" cq-section>
				<cq-tooltip>None</cq-tooltip>
			</span>
			<span role="radio" class="ciq-icon-btn ciq-btn" decoration="parentheses" stxtap="update('decoration','parentheses')" cq-section>
				<cq-tooltip>Parentheses</cq-tooltip>
			</span>
			<span role="radio" class="ciq-icon-btn ciq-btn" decoration="enclosed" stxtap="update('decoration','enclosed')" cq-section>
				<cq-tooltip>Enclosed</cq-tooltip>
			</span>
		</div>
		<div class="ciq-heading ciq-show-lines" cq-section>
			<span role="checkbox" stxtap="toggleLines()" class="ciq-checkbox ciq-active" aria-checked="true">
				<div class="ciq-heading">Show Lines:</div>
				<span></span>
			</span>
		</div>
	`;

CIQ.UI.addComponentDefinition("cq-wave-parameters", WaveParameters);

};


let __js_webcomponents_yAxisContext_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-yaxis-context&gt;</h4>
 *
 * This component appears when a yaxis is right-clicked.  A menu of actions are displayed relevant to that yaxis.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an action is clicked from the displayed menu.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "edit", "remove", "favorite", or other custom action |
 * | action | "click" |
 * | item | _object on which the action occurs, usually a yaxis descriptor_ |
 *
 * This component comes with a default markup that is utilized when the component tag is added to the DOM without any other markup.
 * The default markup provided includes accessibility features.
 *
 * @alias WebComponents.YAxisContext
 * @extends CIQ.UI.DialogContentTag
 * @since 9.3.0
 */
class YAxisContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, YAxisContext);
		this.constructor = YAxisContext;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.YAxisContext
	 */
	setContext(context) {
		const { stx } = context,
			{ currentYAxis } = stx,
			panel = findPanelByYAxis(stx, currentYAxis),
			// Give some tolerance in case there is few 1px wide y-axes on left such as Bollinger b
			isRHS = Math.abs(panel.right - currentYAxis.left) < 3,
			isLHS = panel.left === currentYAxis.left + currentYAxis.width,
			hasAdjacentLeftAxis = getAdjacentYAxis(currentYAxis, panel, "left"),
			hasAdjacentRightAxis = getAdjacentYAxis(currentYAxis, panel, "right"),
			studies = stx.currentYAxis.studies.filter((name) => {
				const study = stx.overlays[name];
				return !study.underlay;
			}),
			hasMerged = currentYAxis.renderers.length + studies.length >= 2;

		let menuItems = "";
		menuItems += hasAdjacentLeftAxis || isRHS ? this.menuItems.moveLeft : ``;
		menuItems += hasAdjacentRightAxis || isLHS ? this.menuItems.moveRight : ``;
		menuItems += hasAdjacentLeftAxis ? this.menuItems.mergeLeft : ``;
		menuItems += hasAdjacentRightAxis ? this.menuItems.mergeRight : ``;
		menuItems += hasMerged ? this.menuItems.unmerge : ``;

		this.innerHTML = menuItems;
		CIQ.UI.BaseComponent.buildReverseBindings(this);

		this.classList.add("ciq-context-menu");

		super.setContext(context);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {string} effect What action was performed as a result of the stxtap event.
	 * @param {Object} item Object being effected by the action.
	 *
	 * @tsmember WebComponents.YAxisContext
	 */
	postProcess(effect, item) {
		this.emitCustomEvent({
			effect,
			detail: { item }
		});
	}

	updateYAxis(menuEvent, type, direction) {
		if (type === "unmerge") {
			unmergeYAxis(this.context.stx);
		} else {
			moveYAxis(this.context.stx, type, direction);
		}

		this.close();
	}
}

YAxisContext.prototype.menuItems = {
	moveLeft: `<div stxtap="updateYAxis('move', 'left')" keyboard-selectable="true">Move Left</div>`,
	moveRight: `<div stxtap="updateYAxis('move', 'right')" keyboard-selectable="true">Move Right</div>`,
	mergeLeft: `<div stxtap="updateYAxis('merge', 'left')" keyboard-selectable="true">Merge Left</div>`,
	mergeRight: `<div stxtap="updateYAxis('merge', 'right')" keyboard-selectable="true">Merge Right</div>`,
	unmerge: `<div stxtap="updateYAxis('unmerge')" keyboard-selectable="true">Unmerge</div>`
};

function getAxisTargetPosition(type, direction, panel, targetYAxis) {
	if (!targetYAxis) {
		if (direction === "right") {
			return panel.right;
		}

		return panel.left;
	}

	if (type === "merge") {
		return targetYAxis.left + targetYAxis.width / 2;
	}

	if (direction === "right") {
		return targetYAxis.left + targetYAxis.width;
	}

	return targetYAxis.left;
}
function unmergeYAxis(stx, type, direction) {
	const { currentYAxis } = stx,
		panel = findPanelByYAxis(stx, currentYAxis),
		dragTarget = (draggable) => {
			panel.subholder.classList.add("dropzone");
			panel.subholder.classList.add(
				currentYAxis.left > panel.left ? "right" : "left"
			);

			stx.grabbingScreen = false;
			stx.highlightedDraggable = draggable;
			stx.grabStartPanel = panel;

			stx.dragPlotOrAxis(
				currentYAxis.left - 1,
				panel.bottom - panel.height / 2
			);
		};

	currentYAxis.renderers.forEach((seriesName) => {
		if (seriesName !== stx.mainSeriesRenderer.params.name) {
			dragTarget(stx.chart.seriesRenderers[seriesName]);
		}
	});

	currentYAxis.studies.forEach((studyName) => {
		dragTarget(stx.layout.studies[studyName]);
	});
}

function moveYAxis(stx, type, direction) {
	const { currentYAxis } = stx,
		panel = findPanelByYAxis(stx, currentYAxis),
		targetYAxis = getAdjacentYAxis(currentYAxis, panel, direction),
		yPosition = panel.top + (panel.bottom - panel.top) / 2,
		targetAxisPosition = getAxisTargetPosition(
			type,
			direction,
			panel,
			targetYAxis
		);

	currentYAxis.showMenuToggle(false);

	stx.mousemoveinner(stx.left + currentYAxis.left, stx.top + yPosition);

	stx.grabbingScreen = true;
	stx.highlightedDraggable = currentYAxis;
	stx.grabStartPanel = panel;

	stx.mousemoveinner(stx.left + targetAxisPosition, stx.top + yPosition);
	stx.mouseup({
		clientX: stx.left + targetAxisPosition,
		clientY: stx.top + yPosition
	});
}

function findPanelByYAxis(stx, sourceYAxis) {
	return Object.values(stx.panels).find((panel) =>
		panel.yaxisLHS
			.concat(panel.yaxisRHS)
			.some((targetYAxis) => stx.yaxisMatches(sourceYAxis, targetYAxis))
	);
}

function getAdjacentYAxis(sourceAxis, panel, direction) {
	const sourceAxisLeft = sourceAxis.left,
		sourceAxisRight = sourceAxis.left + sourceAxis.width,
		sourceAxisTop = sourceAxis.top;

	return panel.yaxisLHS
		.concat(panel.yaxisRHS)
		.filter((targetAxis) => targetAxis !== sourceAxis)
		.find((targetAxis) => {
			const targetAxisLeft = targetAxis.left,
				targetAxisRight = targetAxisLeft + targetAxis.width;

			if (sourceAxisTop !== targetAxis.top || targetAxis.width < 2) {
				return false;
			}

			if (direction === "left") {
				return sourceAxisLeft === targetAxisRight;
			}

			return sourceAxisRight === targetAxisLeft;
		});
}

CIQ.UI.addComponentDefinition("cq-yaxis-context", YAxisContext);

};


let __js_webcomponents_dialog_colorPicker_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Dialog = CIQ.UI._webcomponents.list["cq-dialog"];
if (!Dialog) {
	console.error(
		"colorPicker component requires first activating dialog component."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-color-picker&gt;</h4>
	 *
	 * The color picker is a dialog which allows the user to choose a color to apply to the item which presented the color picker.
	 * The item is usually a "swatch" {@link WebComponents.Swatch} which is embedded in elsewhere, like in a study dialog or drawing palette.
	 * In addition to colors, there can be configured "overrides", which are buttons under the color picker allowing the user to choose something
	 * other than a specific color, for example, "None" or "Auto".
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute    | description |
	 * | :----------- | :---------- |
	 * | cq-active    | Set if the element is visible |
	 * | cq-colors    | Contains a comma-separated list of CSS colors to use |
	 *
	 * In addition, there are two ways to set the colors.  These are given in the examples below.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when a color is selected.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "select" |
	 * | action | "click" |
	 * | value | _color value_ |
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 * This component is automatically created if it doesn't exist in the DOM already.
	 *
	 * @example <caption>Set colors for instance: `setColors()` can be passed a two dimensional array of colors</caption>
	 * const myColorPicker = document.querySelector("cq-color-picker");
	 * myColorPicker.setColors([["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]]);
	 *
	 * @example <caption>Set colors for Component class: `ColorPicker.defaultColors` can be set to a two dimensional array of colors</caption>
	 * // Note: do this before creating the ChartEngine
	 * const pickerClassDef = CIQ.UI.components("cq-color-picker")[0].classDefinition;
	 * pickerClassDef.defaultColors=[["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]];
	 *
	 * @alias WebComponents.ColorPicker
	 * @extends WebComponents.Dialog
	 * @class
	 * @protected
	 * @since
	 * - 9.1.0 Added emitter.
	 */
	class ColorPicker extends Dialog.classDefinition {
		static get observedAttributes() {
			return ["cq-active", "cq-colors"];
		}

		constructor() {
			super();
			this.params = {
				colorMap: []
			};
			this.items = [];
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			this.setAttribute("cq-close-button", "false");
			super.connectedCallback();
			this.build();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ColorPicker);
			this.constructor = ColorPicker;
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (newValue === oldValue) return;
			this[name] = newValue;
			switch (name) {
				case "cq-active":
					this.reposition();
					return;
				case "cq-colors":
					this.build();
					return;
			}
		}

		/**
		 * Sets the class members up with the proper colors and overrides.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		build() {
			this.addDefaultMarkup();
			let colors = this.getAttribute("cq-colors");
			if (colors) {
				// Convert a csv list of colors to a two dimensional array
				colors = colors.split(",");
				const cols = Math.ceil(Math.sqrt(colors.length));
				this.params.colorMap = [];
				let col = 0,
					row = [];
				colors.forEach((i) => {
					if (col >= cols) {
						col = 0;
						this.params.colorMap.push(row);
						row = [];
					}
					row.push(i);
					col++;
				});
				this.params.colorMap.push(row);
			} else {
				this.params.colorMap = this.constructor.defaultColors;
			}

			this.cqOverrides = this.querySelector("[cq-overrides]");
			if (this.cqOverrides)
				this.template = this.cqOverrides.querySelector("template");
			this.initialize();
		}

		/**
		 * Displays the color picker in proximity to the node passed in
		 * @param {object} activator The object representing what caused picker to display
		 * @param {HTMLElement} [activator.node] The node near where to display the color picker
		 * @param {string[]} [activator.overrides] Array of overrides. For each of these, a button will be created that if pressed
		 * will pass that override back instead of the color
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		display(activator) {
			// Algorithm to place the color picker to the right of whichever node was just pressed
			const { node } = activator;
			this.callingNode = node;
			const positionOfNode = node.getBoundingClientRect();
			this.style.top = this.style.left = "0px";
			const positionOfColorPicker = this.parentNode.getBoundingClientRect();
			const oneSwatchDims = CIQ.elementDimensions(node, { border: true });
			let x =
				positionOfNode.left -
				positionOfColorPicker.left +
				oneSwatchDims.width +
				10;
			let y = positionOfNode.top - positionOfColorPicker.top + 15;

			if (this.cqOverrides) {
				[...this.cqOverrides.children].forEach((child) => {
					if (!child.matches("template")) child.remove();
				});
			}
			const context =
				activator.context || this.context || CIQ.UI.getMyContext(this);
			this.uiManager = context.uiManager || CIQ.UI.getUIManager(this);

			if (activator.overrides && this.template) {
				let n;
				activator.overrides.forEach((override) => {
					n = CIQ.UI.makeFromTemplate(this.template, true)[0];
					n.innerText = context.stx
						? context.stx.translateIf(override)
						: override;
					CIQ.UI.stxtap(n, () =>
						this.pickColor(override == "none" ? "transparent" : override)
					);
				});
			}

			// ensure color picker doesn't go off right edge of screen
			const dims = CIQ.elementDimensions(this, { border: true });
			const doc = this.ownerDocument || document;
			const docWidth = CIQ.guaranteedSize(doc).width;
			const w = dims.width;
			if (x + w > docWidth) x = docWidth - w - 20; // 20 for a little whitespace and padding

			// or bottom of screen
			const docHeight = CIQ.guaranteedSize(doc).height;
			const h = dims.height;
			if (y + h > docHeight) y = docHeight - h - 30; // 30 for a little whitespace and padding

			this.style.left = x + "px";
			this.style.top = y + "px";

			if (!this.hasAttribute("aria-label"))
				this.setAttribute("aria-label", "Color Picker");

			if (!this.classList.contains("stxMenuActive")) {
				this.open({ context, caller: node }); // Manually activate the color picker
			} else {
				if (context.e) context.e.stopPropagation(); // Otherwise the color picker is closed when you swap back and forth between fill and line swatches on the toolbar
			}

			this.items = this.querySelectorAll("[cq-colorgrid] span, .ciq-btn");

			// Set keyboard focus on the color selector
			setTimeout(() => this.colors.focus());
		}

		/**
		 * Repositions the color picker so it fits on the screen.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		reposition() {
			// ensure color picker doesn't go off right edge of screen
			const dims = CIQ.elementDimensions(this, { border: true });
			const doc = this.ownerDocument || document;
			const docWidth = CIQ.guaranteedSize(doc).width;
			const w = dims.width;
			if (CIQ.stripPX(this.style.left) + w > docWidth)
				this.style.left = docWidth - w - 20 + "px"; // 20 for a little whitespace and padding

			// or bottom of screen
			const docHeight = CIQ.guaranteedSize(doc).height;
			const h = dims.height;
			if (CIQ.stripPX(this.style.top) + h > docHeight)
				this.style.top = docHeight - h - 30 + "px"; // 30 for a little whitespace and padding
		}

		/**
		 * Generates the HTML for the component.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		initialize() {
			this.colors = this.querySelector("[cq-colorgrid]");
			if (!this.colors) this.colors = this;
			[...this.colors.children].forEach((i) => i.remove()); // allow re-initialize, with new colors for instance

			this.params.colorMap.forEach((lineOfColors) => {
				const ul = document.createElement("ul");
				this.colors.appendChild(ul);
				lineOfColors.forEach((color) => {
					const li = document.createElement("li");
					ul.appendChild(li);
					const span = document.createElement("span");
					li.appendChild(span);
					span.style.backgroundColor = color;
					CIQ.UI.stxtap(span, () => this.pickColor(color));
					span.setAttribute("role", "option");
					span.setAttribute("tabindex", "0");
					span.setAttribute("aria-label", color);
				});
			});
			this.rowLength = this.params.colorMap[0].length || 0;
		}

		/**
		 * Handler for keyboard interaction.
		 * Arrow keys move around the picker, while `Enter` will select.
		 *
		 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
		 * @param {string} key Key that was stroked
		 * @param {Event} e The event object
		 * @return {boolean} true if keystroke was processed
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		keyStroke(hub, key, e) {
			if (hub && hub.tabActiveModals[0] !== this) return;

			const { items } = this;
			switch (key) {
				case "Tab":
					this.focusNextItem(items, !!e.shiftKey);
					break;
				case "ArrowRight":
					this.focusNextItem(items);
					break;
				case "ArrowLeft":
					this.focusNextItem(items, true);
					break;
				case "ArrowDown":
					this.focusNextRow(items);
					break;
				case "ArrowUp":
					this.focusNextRow(items, { reverse: true });
					break;
				case "Enter":
					const focused = this.findFocused(items);
					this.clickItem(focused[0], e);
					return true;
			}
		}

		/**
		 * Switches the focus to the next row of colors.
		 *
		 * @param {NodeList} items List of items in the picker (rows and overrides)
		 * @param {object} [options]
		 * @param {boolean} [options.reverse] If true, reverses order for focus
		 * @return {boolean} true if next item is focusable
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		focusNextRow(items, options) {
			const { reverse } = options || {};
			const focused = this.findFocused(items);
			let i = -1;
			if (focused.length) {
				// find our location in the list of items
				for (i = 0; i < items.length; i++) if (items[i] === focused[0]) break;
			}

			if (reverse) {
				// Find the previous available item
				do {
					i -= this.rowLength;
					if (i < 0) break;
				} while (!CIQ.trulyVisible(items[i]));
			} else {
				// Find the next available item
				do {
					i += this.rowLength;
					if (i >= items.length) {
						i = items.length - 1;
						break;
					}
				} while (!CIQ.trulyVisible(items[i]));
			}

			if (i > -1 && i < items.length && items[i] !== focused[0]) {
				this.removeFocused(items);
				this.focusItem(items[i]);
				return true;
			}
			return false;
		}

		/**
		 * After color is chosen from the picker, this function will pass it back to the element which caused the picker to display.
		 *
		 * @param {string} color Color to pass back.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		pickColor(color) {
			const keystrokeHighlight = this.context.topNode.querySelector(
					".cq-keyboard-selected-highlight"
				),
				keyboardNavigation =
					keystrokeHighlight &&
					!keystrokeHighlight.classList.contains("disabled");
			if (this.callback) this.callback(color);
			this.emitCustomEvent({
				effect: "select",
				detail: {
					value: color
				}
			});
			this.close();
			const controller = CIQ.getFromNS(
				document,
				"body.keystrokeHub.keyControlElement"
			);
			if (controller && keyboardNavigation) controller.focusItem(this.caller);
			else this.caller.focus();
		}

		resize() {
			// do nothing for resize, overrides Dialog default which centers
		}

		/**
		 * Sets the colors to a newly provided two dimensional array of colors.
		 *
		 * @param {object} colorMap Object that holds an array of various color arrays.
		 *
		 * @tsmember WebComponents.ColorPicker
		 */
		setColors(colorMap) {
			this.params.colorMap = colorMap;
			this.initialize();
		}
	}

	/**
	 * Default array of colors for the component.
	 *
	 * @static
	 * @type {String[][]}
	 *
	 * @example
	 * ColorPicker.defaultColors = [
	 *	["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7"],
	 *	["#f4977c", "#f7ac84", "#fbc58d", "#fff69e"]
	 * ];
	 *
	 * @tsmember WebComponents.ColorPicker
	 */
	ColorPicker.defaultColors = [
		["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"],
		["#f4977c", "#f7ac84", "#fbc58d", "#fff69e", "#c4de9e", "#85c99e", "#7fcdc7", "#75d0f4", "#81a8d7", "#8594c8", "#8983bc", "#a187bd", "#bb8dbe", "#f29bc1"],
		["#ef6c53", "#f38d5b", "#f8ae63", "#fff371", "#acd277", "#43b77a", "#2ebbb3", "#00bff0", "#4a8dc8", "#5875b7", "#625da6", "#8561a7", "#a665a7", "#ee6fa9"],
		["#ea1d2c", "#ee652e", "#f4932f", "#fff126", "#8ec648", "#00a553", "#00a99c", "#00afed", "#0073ba", "#0056a4", "#323390", "#66308f", "#912a8e", "#e9088c"],
		["#9b0b16", "#9e4117", "#a16118", "#c6b920", "#5a852d", "#007238", "#00746a", "#0077a1", "#004c7f", "#003570", "#1d1762", "#441261", "#62095f", "#9c005d"],
		["#770001", "#792e03", "#7b4906", "#817a0b", "#41661e", "#005827", "#005951", "#003b5c", "#001d40", "#000e35", "#04002c", "#19002b", "#2c002a", "#580028"],
	]; // prettier-ignore

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.ColorPicker
	 */
	ColorPicker.markup = `
		<div cq-colorgrid aria-label="Color Choices" role="region" tabindex="-1"></div>
		<div cq-overrides>
			<template>
				<div class="ciq-btn" role="button"></div>
			</template>
		</div>
	`;
	CIQ.UI.addComponentDefinition("cq-color-picker", ColorPicker);
}

};


let __js_webcomponents_palette_drawingPalette_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */








const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Palette = CIQ.UI._webcomponents.list["cq-palette"];
if (!Palette) {
	console.error(
		"drawingPalette component requires first activating palette component."
	);
} else if (!CIQ.Drawing) {
	console.error(
		"drawingPalette component requires first activating drawing feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 *  This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 *  <h4>&lt;cq-drawing-palette&gt;</h4>
	 *
	 * This component is used to facilitate drawing and annotating on the chart. It displays a palette
	 * for control and management of drawing tools.
	 *
	 * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
	 *
	 * This works in conjunction with the [cq-drawing-settings]{@link WebComponents.DrawingSettings} component
	 * and replaces the cq-toolbar component, providing additional functionality
	 * and an improved user experience.
	 *
	 * Drawing tools support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool
	 * `cq-item` element. Combinations take the form Alt+key (upper- or lowercase); for example, Alt+a or
	 * Alt+A &mdash; in either case, the key combination works whether the key is shifted or not. Users can also
	 * add the modifier Ctrl to the keystroke combination. For example, both Alt+R and Ctrl+Alt+R activate the
	 * Rectangle tool. The added Ctrl modifier helps provide a unique keystroke combination in the event the Alt+key
	 * combination is assigned to a function in the web browser or to an application on the user's system.
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute   | description |
	 * | :---------- | :---------- |
	 * | view        | Palette display style: "grid" or "list". |
	 * | active-tool | Current active drawing tool. |
	 * | docked      | The docked state of the palette. Set to "false" to float palette over the chart. |
	 *
	 * In addition, the following attributes are also supported:
	 * | attribute            | description |
	 * | :------------------- | :---------- |
	 * | cq-keystroke-claim   | Enables processing of keyboard input. |
	 *
	 * If no markup is specified in the menu component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
	 * to be used.
	 * The default markup utilizes the drawing tools and grouping options set in the default configuration, which is customizable through the component's `context.config` property.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when its view mode is changed.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | effect | "toggle" |
	 * | view | _mode_ |
	 *
	 * A custom event will be emitted from the component when the active tool is changed.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | effect | "select" |
	 * | toolName | _tool name_ |
	 * | activator | _button element pressed_ |
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @example
	 *	<cq-drawing-palette
	 *		class="palette-drawing grid palette-hide"
	 *		docked="true"
	 *		orientation="vertical"
	 *		min-height="300"
	 *		cq-drawing-edit="none"
	 *		cq-keystroke-claim
	 *		view="grid"
	 *		active-tool="notool"
	 *	></cq-drawing-settings>
	 *
	 * @alias WebComponents.DrawingPalette
	 * @extends WebComponents.Palette
	 * @class
	 * @protected
	 * @since
	 * - 7.1.0
	 * - 7.2.0 The drawing settings section has been moved into its own component, [cq-drawing-settings]{@link WebComponents.DrawingSettings}.
	 * - 7.4.0 Drawing tools now support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool button.
	 * - 9.1.0 Observes attributes. Added emitter.
	 */
	class DrawingPalette extends Palette.classDefinition {
		static get observedAttributes() {
			return ["docked", "orientation", "view", "active-tool"];
		}

		constructor() {
			super();
			this.mode = "";
			this.callbacks = [];
			this.toolSettings = {
				favList: [], // A list of tool names to mark as favorite.
				toolGroup: ""
			};
			this.toolGroups = [];
			this.groupedTools = {};

			// Stores a list of keyboard shortcuts.
			this.toolShortcuts = {};
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, DrawingPalette);
			this.constructor = DrawingPalette;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			this.removeClaim(this);
			CIQ.UI.unobserveProperty(
				"toolGroup",
				this.toolSettings,
				this.toolSettingsListener
			);
			super.disconnectedCallback();
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (newValue === oldValue) return;
			switch (name) {
				case "view":
					this.changeView(null, newValue);
					break;
				case "active-tool":
					this.tool(null, newValue);
					break;
			}
			super.handlePropertyChange(name, oldValue, newValue);
		}

		/**
		 * Enable keyboard shortcuts for tools that have a shortcut defined in the chart config.
		 * Add keyboard shortcut text to tooltip.
		 *
		 * @param {object} context Chart context
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setupKeyboardActivation(context) {
			if (this.hasAttribute("cq-keystroke-claim")) {
				// Define keystrokes
				let toolsWithShortcuts = this.context.topNode.querySelectorAll(
					"*[cq-tool][cq-tool-shortcut]"
				);
				for (let idx = 0; idx < toolsWithShortcuts.length; idx++) {
					let letter = toolsWithShortcuts[idx].getAttribute("cq-tool-shortcut");
					// Test for a single alphanumeric character
					if (/^[A-Za-z0-9]{1}$/g.test(letter)) {
						// Store ref to node and toolname for tool selection
						this.toolShortcuts[letter.toUpperCase()] = {
							toolName: toolsWithShortcuts[idx].getAttribute("cq-tool"),
							node: toolsWithShortcuts[idx]
						};
						// Add keyboard shortcut to button tool tip
						let buttonLabel = toolsWithShortcuts[idx].querySelector("[label]");
						let shortcutLabel = document.createElement("span");
						shortcutLabel.classList.add("shortcut");
						shortcutLabel.innerHTML = " (Alt+" + letter.toUpperCase() + ")";

						buttonLabel.appendChild(shortcutLabel);
					} else {
						console.warn(
							"cq-tool-shortcut attribute must be a single letter: " +
								letter +
								" ignored."
						);
					}
				}
				// add keyboard claim for entire body
				this.addClaim(this);
			}
		}

		/**
		 * Handler for keyboard interaction.
		 *
		 * Key combinations defined in the context config will activate select tools.
		 *
		 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
		 * @param {string} key Key that was stroked
		 * @param {object} e The event object
		 * @return {boolean} true if keystroke was processed
		 *
		 * @example <caption>Configuration of a shortcut in context (Alt-w will activate Annotation tool):</caption>
		 * stxx.uiContext.config.drawingTools = [
		 *	{ type: "dt", tool: "annotation", group: "text", label: "Annotation", shortcut: "w" },
		 *  ...
		 * ];
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		keyStroke(hub, key, e) {
			if (e.altKey && !e.ctrlKey && !e.shiftKey) {
				key = e.code.replace(/^(Key|Digit|Numpad)/, "");
				let toolSelection = this.toolShortcuts[key.toUpperCase()];

				if (toolSelection) {
					// Activate the drawing palette if it isn't already
					// this.context.stx.layout.drawing=true;
					const drawingChannel = this.channels
						? this.channels.drawing
						: "channel.drawing";
					this.channelWrite(drawingChannel, true);

					// Activate the tool. Pass a reference to the palette button so its activated state is changed.
					this.tool({ node: toolSelection.node }, toolSelection.toolName);
				}
			} else if (e.key === "Escape") {
				let notoolTool = this.context.topNode.querySelector(
					'*[cq-tool="notool"]'
				);
				if (notoolTool) this.noTool({ node: notoolTool });
			}
		}

		/**
		 * Handler for responding to messaging sent from other palettes `sendMessage` function.
		 *
		 * @param {string} id Identifier for the message
		 * @param {object | string} message Optional data accompanying the message
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		handleMessage(id, message) {
			switch (id) {
				case "changeToolSettings":
					this.activateTool(message.activator, message.toolName);
					break;
				case "toggleDrawingPalette":
					this.togglePalette();
					break;
				case "hideDrawingPalette":
					this.hidePalette();
					break;
				case "dockWillResize":
					this.hidePalette();
					break;
				case "dockDidResize":
					this.resetScroller();
					break;
				case "context":
					if (message === "stop") this.toolContextMenu.style.display = "none";
			}
		}

		/**
		 * Retrieve list of tools from local storage.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		loadToolSettings() {
			if (this.store) {
				let self = this;
				this.store.get(
					"CIQ.DrawingToolSettings",
					function (error, lsDrawingTools) {
						if (!error && lsDrawingTools && lsDrawingTools.favList) {
							self.toolSettings = Object.assign(
								self.toolSettings,
								lsDrawingTools
							);
						}
					}
				);
			}
		}

		/**
		 * Save tool settings to local storage
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		storeToolSettings() {
			if (this.store)
				this.store.set(
					"CIQ.DrawingToolSettings",
					JSON.stringify(this.toolSettings)
				);
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setContext(context) {
			const { config, stx } = context;

			if (config) {
				const {
					channels = {},
					drawingToolGrouping = [],
					nameValueStore
				} = config;

				const { groupedTools } = this;
				if (config.drawingTools) {
					(config.drawingTools = config.drawingTools.filter(
						({ tool }) => CIQ.Drawing[tool]
					)).forEach((toolElem) => {
						let toolGroup = toolElem.group;
						groupedTools[toolGroup] = groupedTools[toolGroup]
							? [...groupedTools[toolGroup], toolElem]
							: [toolElem];
					});
				}
				this.toolGroups = drawingToolGrouping || [];
				this.store =
					(nameValueStore && new nameValueStore()) ||
					(CIQ.NameValueStore && new CIQ.NameValueStore());
				this.addDefaultMarkup(this, this.getMarkup(config));

				const toolGrouping = config.drawingToolGrouping
					.filter((groupListItem) => {
						return (
							["All", "Favorites"].includes(groupListItem) ||
							config.drawingTools.some(
								({ group }) => group === groupListItem.toLowerCase()
							)
						);
					})
					.map((group) => {
						return {
							type: "item",
							label: group,
							tap: "setToolGroup",
							value: group.toLowerCase()
						};
					});

				context.config.menus.toolgrouping.content = toolGrouping;
				const toolGroupMenu = this.querySelector(".ciq-tool-group-selection");
				if (toolGroupMenu) {
					toolGroupMenu.setAttribute("config", "");
					toolGroupMenu.setAttribute("config", "toolgrouping");
				}
				this.channels = { drawing: channels.drawing || "channel.drawing" };
			}
			this.init();
			this.loadToolSettings();
			this.params = {
				toolGroupSelection: this.node.find("*[cq-tool-group-selection]")
			};
			this.setFavorites();
			this.setMode("grid");
			this.setEvenOdd();

			// Inject the right click menu
			this.toolContextMenu = this.createContextMenu();

			this.addEventListener(
				"contextmenu",
				function (event) {
					const targetElem = event.target.hasAttribute("cq-tool-group")
						? event.target
						: CIQ.climbUpDomTree(event.target, "[cq-tool-group]")[0];
					event.preventDefault();
					if (targetElem) {
						// Only concerned with elements that have a cq-tool-group property
						let targetRect = targetElem.getBoundingClientRect();
						// Need to position the context menu relative to the parent because the palette can change position
						let parentRect = this.getBoundingClientRect();
						this.showToolContextMenu(
							targetElem.getAttribute("cq-tool"),
							event.clientY + targetRect.height - parentRect.top,
							event.clientX - parentRect.left
						);
					}
				}.bind(this)
			);

			this.setupKeyboardActivation();
			this.pairUndoRedo();

			// Set the tool group if it has been saved in local storage
			if (this.toolSettings.toolGroup) {
				// Allow the menu to render before attempting to select a group
				setTimeout(() => {
					// TODO: Once shadow dom is lifted, this can skip selecting groupMenu and instead use this.querySelector to get the menu item.
					const groupMenu = this.querySelector(
						"cq-menu.ciq-tool-group-selection"
					);
					if (groupMenu) {
						let groupMenuItem = groupMenu.qsa(
							'li.item[feature="' + this.toolSettings.toolGroup + '"]',
							groupMenu,
							true
						);
						window.testBtn = groupMenuItem;
						if (groupMenuItem[0]) groupMenuItem[0].click();
					}
				});
			}

			if (this.channels) {
				this.channelSubscribe(
					this.channels.drawing || "channel.drawing",
					(value) => {
						const currentVectorType = stx.currentVectorParameters.vectorType;
						if (value) {
							this.resetScroller();
							if (!currentVectorType) {
								// setting value to "" signals that crosshairs should be disabled
								stx.changeVectorType(this.priorVectorType || "");
							}
							this.setActiveTool(currentVectorType || "notool");
							setTimeout(() => {
								this.tabIndex = -1;
								this.focus();
							}, 10);
						} else {
							const { multiChartContainer } = this.container.topNode;
							if (
								multiChartContainer &&
								CIQ.getFromNS(this, "context.config.soloActive.onDraw")
							) {
								Array.from(
									multiChartContainer.querySelectorAll("cq-drawing-palette")
								).forEach((palette) => {
									palette.priorVectorType = currentVectorType;
								});
							} else {
								this.priorVectorType = currentVectorType;
							}
							// setting value to null signals that normal crosshair behavior should return
							stx.changeVectorType(null);
						}
					}
				);
				this.channelSubscribe(
					this.channels.breakpoint || "channel.breakpoint",
					(value) => {
						if (value === "break-sm") this.setMode("list");
					}
				);
			}
		}

		/**
		 * Pair undo and redo buttons
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		pairUndoRedo() {
			const redo = this.qs("cq-redo", this);
			const undo = this.qs("cq-undo", this);
			redo.pairUp(undo);
		}

		/**
		 * Change palette view mode
		 *
		 * @param {Object} [activator] Pass `null` when calling programmatically.
		 * @param {HTMLElement} [activator.node] Element that triggered this function.
		 * @param {string} modeName Palette view mode. Either "list" or "grid".
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		changeView(activator, modeName) {
			if (!this.context) return;
			this.setMode(modeName);
			for (
				let i = 0;
				i < this.callbacks.length;
				i++ // let any callbacks know that the palette mode has changed
			)
				this.callbacks[i].call(this, this.mode);
		}

		/**
		 * Create palette context menu for adding/removing favorite tool assignment in grid view.
		 *
		 * @return {HTMLElement} The context menu element.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		createContextMenu() {
			// Add/Remove Favorites menu item
			let addToFavorites = document.createElement("div");
			addToFavorites.className = "menu-item";
			addToFavorites.innerHTML = "Add/Remove Favorite";
			addToFavorites.addEventListener(
				"mousedown",
				function (event) {
					event.stopPropagation();
					if (event.button < 2) {
						// Right click fires this event too so check for a left mouse button event
						this.toggleFavorite(
							event.currentTarget.parentElement.getAttribute("context-tool")
						);
						this.paletteDock.stopContext(this);
					}
				}.bind(this)
			);

			// Stop propagation on pointerdown to prevent enabling any drawing tools as a result of clicking the menu
			addToFavorites.addEventListener("pointerdown", (event) =>
				event.stopPropagation()
			);

			let contextMenu = document.createElement("div");
			contextMenu.appendChild(addToFavorites);
			contextMenu.className = "tool-context-menu";
			this.node.append(contextMenu);
			return contextMenu;
		}

		/**
		 * Register callback function
		 *
		 * @param {function} fc Callback function
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		registerCallback(fc) {
			this.callbacks.push(fc);
		}

		/**
		 * Resets the tool scrollbar. Use if the container size or contents have changes.
		 *
		 * @return {boolean} Returns false when scroller element is not found.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		resetScroller() {
			const scroller = this.querySelector(".tool-group cq-scroll");
			if (!scroller) {
				return false;
			}
			this.setEvenOdd();
			scroller.refresh();
			return true;
		}

		/**
		 * Set the active tool.
		 *
		 * @param {string} toolName Name of drawing tool to activate.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setActiveTool(toolName) {
			const toolButton = this.querySelector(`cq-item[cq-tool=${toolName}]`);
			if (toolButton) this.tool({ node: toolButton });
		}

		/**
		 * Set tool button as active.
		 *
		 * @param {HTMLElement} activeNode Tool button element.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setActiveButton(activeNode) {
			const previousActive = this.node.find(".ciq-tool.active");
			if (previousActive) {
				previousActive.removeClass("active");
				previousActive.removeAttr("aria-checked");
				previousActive.removeAttr("aria-current");
			}
			if (activeNode) {
				activeNode.classList.add("active");
				const aria =
					activeNode.getAttribute("role") === "radio"
						? "aria-checked"
						: "aria-current";
				activeNode.setAttribute(aria, "true");
				activeNode.setAttribute("aria-checked", "true");
				activeNode.setAttribute("aria-current", "true");
			}
			// Don't want to automatically show the palette when using the mobile menu
			if (
				!CIQ.trulyVisible(
					this.ownerDocument.querySelector(".ciq-mobile-palette-toggle")
				)
			)
				this.togglePalette();
		}

		/**
		 * Set palette view mode
		 *
		 * @param {string} mode Palette view mode. Either "list" or "grid".
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setMode(mode) {
			// Default to grid mode unless list is specified
			mode = mode === "list" ? mode : "grid";
			this.mode = mode;
			this.classList.remove("list", "grid");
			this.classList.add(this.mode);
			this.setAttribute("view", this.mode);

			this.querySelectorAll("[cq-view]").forEach((el) =>
				el.setAttribute("aria-checked", "false")
			);
			this.querySelector(`[cq-view=${mode}]`).setAttribute(
				"aria-checked",
				"true"
			);
			// set up tools as groups in list mode, since there will be option to add/remove favorite
			this.querySelectorAll(".fav-marker").forEach((el) => {
				const labelledby = el.parentElement.querySelector("[id]");
				el.setAttribute("role", mode === "list" ? "button" : "none");
				el.parentElement.setAttribute(
					"role",
					mode === "list" ? "group" : "radio"
				);
				if (labelledby) {
					labelledby.setAttribute("role", mode === "list" ? "radio" : "none");
					el.parentElement.setAttribute(
						"aria-labelledby",
						mode === "list" ? labelledby.id : ""
					);
				}
			});

			this.sortToolButtons();

			this.resetScroller();
			if (this.paletteDock.handleResize)
				this.paletteDock.handleResize({ resizeChart: true });

			this.emitCustomEvent({
				effect: "view",
				detail: {
					view: mode
				}
			});
		}

		/**
		 * Set palette palette tool button even/odd class for styling in grid view mode.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setEvenOdd() {
			// Gives an 'odd' class to odd number buttons in each group div in 'grid' mode in order to place their tooltips correctly.
			const groupNodes = this.querySelectorAll(
				".tool-group cq-scroll .drawing-tools-group"
			);
			if (!groupNodes.length) return;
			groupNodes.forEach((node) => {
				const groupToolNodes = node.querySelectorAll("cq-item");
				let odd = false;
				for (let n = 0; n < groupToolNodes.length; n++) {
					if (!CIQ.trulyVisible(groupToolNodes[n])) continue;
					groupToolNodes[n].classList[odd ? "add" : "remove"]("odd");
					odd = !odd;
				}
			});
		}

		/**
		 * Add the favorite badge to relevant tools. Add a favorite toggle star to each tool for use in list view and mobile layout.
		 *
		 * @param {boolean} propagateSettings Effect the settings on all charts in a multichart environment.  Defaults to `true`.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setFavorites(propagateSettings = true) {
			const toolButtons = this.querySelectorAll(".tool-group [cq-tool]");
			for (
				let toolButtonIdx = 0;
				toolButtonIdx < toolButtons.length;
				toolButtonIdx++
			) {
				const toolButton = toolButtons[toolButtonIdx];
				let favMarker = toolButton.querySelector(".fav-marker");
				if (favMarker === null) {
					favMarker = document.createElement("div");
					// All buttons get the div.fav-marker element to click on in list view.
					favMarker.className = "fav-marker";
					favMarker.setAttribute("aria-label", "Favorite");
					favMarker.addEventListener(
						"click",
						this.handleFavoriteClick.bind(this)
					);
					favMarker.addEventListener(
						"touchstart",
						this.handleFavoriteClick.bind(this),
						{ capture: true, passive: false }
					);
					favMarker.addEventListener("pointerdown", (event) =>
						event.stopPropagation()
					);
					toolButton.appendChild(favMarker);
				}
				if (toolButton.getAttribute("cq-tool-group").indexOf("favorite") >= 0) {
					// Remove favorite group value if it's there.
					toolButton.setAttribute(
						"cq-tool-group",
						toolButton.getAttribute("cq-tool-group").replace("favorite", "")
					);
					favMarker.removeAttribute("aria-pressed");
				}
				if (
					this.toolSettings.favList.indexOf(
						toolButton.getAttribute("cq-tool")
					) >= 0
				) {
					// Apply the favorite tool group to tools in the favorites list.
					toolButton.setAttribute(
						"cq-tool-group",
						toolButton.getAttribute("cq-tool-group") + " favorite"
					);
					favMarker.setAttribute("aria-pressed", "true");
				}
			}
			this.sortToolButtons();
			const { multiChartContainer } = this.context.topNode;
			if (propagateSettings && multiChartContainer) {
				// synchronize favourites in other open palettes.
				multiChartContainer.getCharts().forEach((chart) => {
					const contextContainer = chart.uiContext.topNode;
					const wrapper = contextContainer.closest("cq-context-wrapper");
					if (!wrapper || contextContainer === this.context.topNode) return;
					const drawingPalette =
						contextContainer.querySelector("cq-drawing-palette");

					setTimeout(() => {
						drawingPalette.loadToolSettings();
						drawingPalette.setFavorites(false);
					});
				});
			}
		}

		/**
		 * Sort buttons in order defined by the config, grouping those marked favorite first.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		sortToolButtons() {
			const toolContainer = this.querySelector(".tool-group cq-scroll"),
				scrollbar =
					toolContainer &&
					toolContainer.querySelector(".ps__rail-x, .ps__rail-y"),
				{ groupedTools, toolGroups, toolSettings } = this,
				{ favList } = toolSettings,
				mode = this.classList.contains("grid") ? "grid" : "list",
				addToContainer = (elem) => {
					// insertBefore automatically detaches the element from its current position and reattaches it at the bottom above the scrollbar
					if (scrollbar) toolContainer.insertBefore(elem, scrollbar);
					else toolContainer.appendChild(elem);
				},
				makeToolGroupDiv = (group, groupName) => {
					const groupDiv = document.createElement("div");
					groupDiv.setAttribute("class", `drawing-tools-group ${groupName}`);
					groupDiv.setAttribute("role", "group");
					groupDiv.setAttribute(
						"aria-labelledby",
						`drawing_tools_group_${groupName}`
					);
					group.forEach((tool) => {
						const name = tool.tool || tool;
						if (groupName !== "favorites" && favList.includes(name)) return;
						const toolElem = this.querySelector(
							".tool-group [cq-tool=" + name + "]"
						);
						if (toolElem) groupDiv.appendChild(toolElem);
					});

					groupDiv.insertAdjacentHTML(
						"beforeend",
						`<cq-separator><span hidden id="drawing_tools_group_${groupName}">${CIQ.capitalize(
							groupName
						)} tools</span></cq-separator>`
					);

					return groupDiv;
				},
				moveToolToBottom = (tool, isFavGroup) => {
					const toolElem = this.querySelector(
							".tool-group [cq-tool=" + tool.tool + "]"
						),
						isFavTool = toolElem
							.getAttribute("cq-tool-group")
							.includes("favorite"),
						isFavMatch = isFavGroup ? isFavTool : !isFavTool;
					if (toolElem && isFavMatch) addToContainer(toolElem);
				},
				removeToolGroupDivs = () => {
					toolContainer
						.querySelectorAll("div.drawing-tools-group")
						.forEach((elem) => {
							if (elem.children.length <= 1) elem.remove();
						});
				};
			if (mode === "grid") {
				if (favList.length)
					addToContainer(makeToolGroupDiv(favList, "favorites"));
				toolGroups.forEach((groupName) => {
					const groupname = groupName.toLowerCase();
					const groupTools = groupedTools[groupname];
					if (groupTools) {
						const toolGroupDiv = makeToolGroupDiv(groupTools, groupname);
						addToContainer(toolGroupDiv);
					}
				});
				for (const groupname in groupedTools) {
					if (!toolGroups.includes(CIQ.capitalize(groupname))) {
						const toolGroupDiv = makeToolGroupDiv(
							groupedTools[groupname],
							groupname
						);
						addToContainer(toolGroupDiv);
					}
				}
			}
			if (mode === "list") {
				// Sort buttons in order defined by the config, grouping those marked favorite first.
				for (let tool of this.context.config.drawingTools) {
					moveToolToBottom(tool, true);
				}
				for (let tool of this.context.config.drawingTools) {
					moveToolToBottom(tool, false);
				}
			}
			// Remove group divs if they have no tools in them.
			removeToolGroupDivs();
		}

		/**
		 * Handle tool favorite button click
		 *
		 * @param {Event} event Button click event.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		handleFavoriteClick(event) {
			event.stopPropagation();
			event.preventDefault();
			this.toggleFavorite(event.target.parentElement.getAttribute("cq-tool"));
			// The mobile palette is toggled after the tool selection so hide it now so the toggle will show it again
			this.hidePalette();
		}

		/**
		 * Add the tool to the list of favorites
		 *
		 * @param {string} toolName Name of drawing tool
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		addFavorite(toolName) {
			if (this.toolSettings.favList.indexOf(toolName) < 0) {
				this.toolSettings.favList.push(toolName);
				this.storeToolSettings();
				this.setFavorites();
			}
		}

		/**
		 * Display the tool context menu.
		 *
		 * @param {string} toolName Name of drawing tool.
		 * @param {number} top Top coordinate of context menu position relative to chart context.
		 * @param {number} left Left coordinate of context menu position relative to chart context.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		showToolContextMenu(toolName, top, left) {
			this.toolContextMenu.style.display = "block";
			this.toolContextMenu.style.top = top + "px";
			this.toolContextMenu.style.left = left + "px";
			this.toolContextMenu.setAttribute("context-tool", toolName);
			this.paletteDock.startContext(this);
		}

		/**
		 * Toggle favorite state of drawing tool.
		 *
		 * @param {string} toolName Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		toggleFavorite(toolName) {
			let toggleIdx = this.toolSettings.favList.indexOf(toolName);
			if (toggleIdx >= 0) {
				this.toolSettings.favList.splice(toggleIdx, 1);
			} else {
				this.toolSettings.favList.push(toolName);
			}
			this.storeToolSettings();
			this.setFavorites();
			this.setEvenOdd();
		}

		/**
		 * Change displayed tool group.
		 *
		 * @param {Object} [activator] Pass `null` when calling programmatically.
		 * @param {HTMLElement} [activator.node] Element that triggered this function.
		 * @param {string} groupName Name of tool group to display.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		setToolGroup(activator, groupName) {
			// Filter tools by their group.
			this.toolSettings.toolGroup = groupName;
			this.querySelector(".tool-group").setAttribute(
				"tool-group-filter",
				this.toolSettings.toolGroup
			);
			this.querySelector(".tool-group cq-scroll").top();
			this.setEvenOdd();
			for (
				let i = 0;
				i < this.callbacks.length;
				i++ // let any callbacks know that the palette mode has changed
			)
				this.callbacks[i].call(this, this.mode);
			// The mobile palette will be hidden if resize is called in the callbacks. Show it again afterward
			this.showPalette();
			this.storeToolSettings();
		}

		/**
		 * Binding function for the Tool Groups filter.
		 *
		 * @param {HTMLElement} node Node that owns the binding; usually, the filter menu.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		bindToolGroups(node) {
			this.toolSettingsListener = (obj) => {
				CIQ.makeTranslatableElement(
					node,
					this.context.stx,
					CIQ.capitalize(obj.value || "all")
				);
			};
			CIQ.UI.observeProperty(
				"toolGroup",
				this.toolSettings,
				this.toolSettingsListener
			);
		}

		/**
		 * Used in break-sm context to show/hide the palette for mobile layout
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		togglePalette() {
			this.classList.toggle("palette-hide");
		}

		/**
		 * Used in break-sm context to hide the palette for mobile layout
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		hidePalette() {
			this.classList.add("palette-hide");
		}

		/**
		 * Used in break-sm context to show the palette for mobile layout
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		showPalette() {
			this.classList.remove("palette-hide");
		}

		/**
		 * Activate drawing tool. Called by `tool` function.
		 *
		 * @param {Object} [activator] Pass `null` when calling programmatically.
		 * @param {HTMLElement} [activator.node] Element that triggered this function.
		 * @param {string} toolName Name of drawing tool to activate.
		 *
		 * @return {HTMLElement} Returns palette tool button element for the specified tool.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		activateTool(activator, toolName) {
			let buttonRef = null;
			if ((!activator || !activator.node) && toolName) {
				// Find the tool button by its cq-tool attribute.
				// Necessary for cases then the button is not clicked, such as the drawing context menu "Edit Settings"
				buttonRef = this.querySelector("[cq-tool=" + toolName + "]");
			} else {
				buttonRef = activator.node;
			}
			this.setActiveButton(buttonRef);
			this.setAttribute("active-tool", toolName);

			if (this.lastToolChangeEvent !== toolName) {
				this.lastToolChangeEvent = toolName;
				this.emitCustomEvent({
					effect: "select",
					detail: {
						toolName: toolName,
						activator: buttonRef
					}
				});
			}

			let stxArr = [this.context.stx];
			if (stxArr[0].uiContext.topNode.getCharts)
				stxArr = stxArr[0].uiContext.topNode.getCharts();
			stxArr.forEach((stx) => {
				stx.clearMeasure();
				stx.changeVectorType(toolName == "notool" ? "" : toolName);
				if (toolName === "notool") {
					stx.container.classList.remove("stx-crosshair-cursor-on");
				} else {
					stx.container.classList.add("stx-crosshair-cursor-on");
				}
			});

			return buttonRef;
		}

		/**
		 * Activate No Tool. Disables any active drawing tools.
		 *
		 * @param {Object} [activator] Pass `null` when calling programmatically.
		 * @param {HTMLElement} [activator.node] Element that triggered this function.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		noTool(activator) {
			this.tool(activator, "notool");
		}

		/**
		 * Activate drawing tool. Sends `changeTool` message to other palettes.
		 *
		 * @param {Object} [activator] Pass `null` when calling programmatically.
		 * @param {HTMLElement} [activator.node] Element that triggered this function.
		 * @param {string} toolName Name of drawing tool to activate.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		tool(activator, toolName) {
			const { stx } = this.context;
			if (!toolName && activator)
				toolName = activator.node.getAttribute("cq-tool");
			if (!toolName || !this.context) return;
			if (stx.currentVectorParameters.vectorType == toolName) return;
			let activatedToolButton = this.activateTool(activator, toolName);
			if (!activator) activator = { node: activatedToolButton };
			let toolLabel = activator.node.querySelector("[label]").innerHTML;
			if (this.sendMessage) {
				this.sendMessage("changeTool", {
					activator: activator,
					toolName: toolName,
					toolLabel: toolLabel
				});
			}
			if (toolName !== "notool" && stx.chart.hideDrawings) {
				const dToggle = stx.uiContext.topNode.querySelector(
					'cq-toggle[member="chart.hideDrawings"]'
				);
				if (dToggle) dToggle.dispatchEvent(new Event("stxtap"));
				else stx.chart.hideDrawings = false;
				stx.dispatch("notification", "drawingsRevealed");
			}
		}

		/**
		 * Sends `clearDrawings` message to other palettes.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		clearDrawings() {
			if (this.sendMessage) {
				this.sendMessage("clearDrawings");
			}
		}

		/**
		 * Restore drawing settings default configuration.
		 *
		 * @param {Object} [activator] Pass `null` when calling programmatically.
		 * @param {HTMLElement} [activator.node] Element that triggered this function.
		 * @param {boolean} all Set to `true` to restore default for all drawing objects. Otherwise only the active drawing object's defaults are restored.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		restoreDefaultConfig(activator, all) {
			if (this.sendMessage) {
				this.sendMessage("restoreDefaultConfig", {
					activator: activator,
					all: all
				});
			}
		}

		/**
		 * Injects tool button markup, set in the chart config, into component markup.
		 *
		 * @param {object} config Chart configuration object
		 * @returns {string} Modified markup.
		 *
		 * @tsmember WebComponents.DrawingPalette
		 */
		getMarkup(config) {
			const tools = config.getMenu("drawingTools", true).join("");

			return this.constructor.markup.replace("{{tools}}", tools);
		}
	}

	/**
	 * Default markup for the innerHTML of a cq-item tag. Used by {@link DrawingPalette.markup}.
	 *
	 * @param {string} label text to be displayed or read.
	 * @param {string} [icon] icon class.
	 * @param {string} [helpId] value of the help-id attribute.
	 * @return {string} HTML markup for the tag's interior.
	 *
	 * @static
	 *
	 * @tsmember WebComponents.DrawingPalette
	 */
	DrawingPalette.itemInterior = (label, icon, helpId) => {
		return `
			<span>
				<span class="icon ${icon || ""}"></span><span label>${label}</span>
				${
					helpId
						? `<em class="ciq-screen-reader help-instr">(Help available, press question mark key)</em>
					       <cq-help help-id="${helpId}" aria-hidden="true"></cq-help>`
						: ""
				}
			</span>
		`;
	};

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * This markup contains placeholder values which the component replaces with values from its attributes.
	 * Variables are represented in double curly-braces, for example: `{{text}}`.
	 * The following variables are defined:
	 * | variable  | source |
	 * | :-------- | :----- |
	 * | tools     | from context configuration object |
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.DrawingPalette
	 */
	DrawingPalette.markup = `
	<div role="group" aria-label="Drawing Tool Palette" class="palette-container">
		<div class="drag-strip" aria=hidden="true"></div>
			<div class="mini-widget-group">
					<span role="radiogroup" aria-label="Palette Type View">
						<cq-item role="radio" tabindex="-1" class="ciq-mini-widget" cq-view="list" stxtap="changeView('list')">
							${DrawingPalette.itemInterior("List View", null, "drawing_palette_list_view")}
						</cq-item>
						<cq-item role="radio" tabindex="-1" class="ciq-mini-widget" cq-view="grid" stxtap="changeView('grid')">
							${DrawingPalette.itemInterior("Grid View", null, "drawing_palette_grid_view")}
						</cq-item>
					</span>
					<cq-item role="button" tabindex="-1" class="ciq-mini-widget" cq-view="detach" stxtap="detach()">
						${DrawingPalette.itemInterior("Detach Palette", null, "drawing_palette_detach")}
					</cq-item>
					<cq-item role="button" tabindex="-1" class="ciq-mini-widget" cq-view="attach" stxtap="dock()">
						${DrawingPalette.itemInterior("Dock Palette", null, "drawing_palette_attach")}
					</cq-item>
			</div>
			<cq-separator></cq-separator>
			<div class="primary-tool-group">
				<cq-item role="button" tabindex="-1" class="ciq-tool active" cq-tool="notool" stxtap="tool()">
					${DrawingPalette.itemInterior("No Tool", "pointer", "drawing_palette_notool")}
				</cq-item>
				<cq-item role="button" tabindex="-1" class="ciq-tool" cq-tool="measure" stxtap="tool()">
					${DrawingPalette.itemInterior("Measure", "measure", "drawing_palette_measure")}
				</cq-item>
				<cq-undo role="button" tabindex="-1" class="ciq-tool">
					${DrawingPalette.itemInterior("Undo", "undo", "drawing_palette_undo")}
				</cq-undo>
				<cq-redo role="button" tabindex="-1" class="ciq-tool">
					${DrawingPalette.itemInterior("Redo", "redo", "drawing_palette_redo")}
				</cq-redo>
				<cq-menu
					class="ciq-select
					ciq-tool-group-selection"
					config="toolgrouping"
					reader="Tool Groups"
					text="All"
					help-id="drawing_palette_tool_categories"
					binding="bindToolGroups()"
				></cq-menu>
			</div>
			<cq-separator></cq-separator>
			<div class="tool-group" tool-group-filter="all">
				<cq-scroll cq-no-resize role="radiogroup" aria-label="Tools">
					{{tools}}
				</cq-scroll>
				<cq-separator></cq-separator>
				<div class="mini-widget-group mini-widget-foot">
					<cq-item tabindex="-1" class="ciq-mini-widget">
						<cq-toggle
							class="ciq-magnet bottom"
							member="preferences.magnet"
							toggles="true,75,false"
							toggle-classes="active strong,active,"
							multichart-distribute="true"
							reader="Magnet"
							help-id="drawing_palette_magnet"
						></cq-toggle>
						<span class="icon magnet"></span><span label aria-hidden="true">Magnet</span>
					</cq-item>
					<cq-item role="button" tabindex="-1" class="ciq-mini-widget ciq-hide-drawings">
						<cq-toggle
							class="ciq-hide bottom"
							member="chart.hideDrawings"
							toggles="true,false"
							toggle-classes="active,"
							multichart-distribute="true"
							reader="Hide"
							help-id="drawing_palette_hide"
						></cq-toggle>
						<span class="icon hide"></span><span label aria-hidden="true">Hide All Drawings (Shift+Alt+H)</span>
					</cq-item>
					<cq-item role="button" tabindex="-1" class="ciq-mini-widget" stxtap="clearDrawings()">
						${DrawingPalette.itemInterior(
							"Clear All Drawings",
							"clear",
							"drawing_palette_clear"
						)}
					</cq-item>
					<cq-item role="button" tabindex="-1" class="ciq-mini-widget" stxtap="restoreDefaultConfig(true)">
						${DrawingPalette.itemInterior(
							"Restore Default Parameters",
							"restore",
							"drawing_palette_restore"
						)}
					</cq-item>
				</div>
			</div>
		<div class="resize-strip"></div>
	</div>
	`;
	CIQ.UI.addComponentDefinition("cq-drawing-palette", DrawingPalette);
}

};


let __js_webcomponents_palette_drawingSettings_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */








const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Palette = CIQ.UI._webcomponents.list["cq-palette"];
if (!Palette) {
	console.error(
		"drawingSettings component requires first activating palette component."
	);
} else if (!CIQ.Drawing) {
	console.error(
		"drawingSettings component requires first activating drawing feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-drawing-settings&gt;</h4>
	 *
	 * Drawing Settings palette web component used to draw and annotate on the chart. Displays a palette
	 * along the top of the chart for managing tool settings.
	 *
	 * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
	 *
	 * This works in conjunction with the [cq-drawing-palette]{@link WebComponents.DrawingPalette} component
	 * and replaces the cq-toolbar component, providing additional functionality
	 * and an improved user experience.
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute    | description |
	 * | :----------- | :---------- |
	 * | docked       | The docked state of the palette. Set to "false" to float palette over the chart. |
	 * | hide         | The hidden state of the palette. Set to "false" to show palette. |
	 * | active-tool  | Current active drawing tool. |
	 * | axis-label   | "true" to enable axis label. |
	 * | line-color   | Current line color in hex format, or "auto" to select color from theme. |
	 * | fill-color   | Current fill color in hex format, or "auto" to select color from theme. |
	 * | font-family  | Current font name. Note: specified font must be available in the end-user's system. |
	 * | font-size    | Current font size in valid css units. |
	 * | font-italic  | "true" to enable font italics style. |
	 * | font-bold    | "true" to enable font bold style. |
	 * | line-width   | Line width in pixels. |
	 * | line-pattern | Line pattern: "solid", "dotted" or "dashed". |
	 * | show-callout | "true" to enable display of callout. |
	 * | span-panels  | "true" to enable span panels. |
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted by the component when it is clicked.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "select" |
	 * | action | "click" |
	 * | name | _property_ |
	 * | value | _value_ |
	 *
	 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @example
	 *	<cq-drawing-settings
	 *		class="palette-settings"
	 *		docked="true"
	 *		hide="true"
	 *		orientation="horizontal"
	 *		min-height="40"
	 *		cq-drawing-edit="none"
	 *		line-pattern="solid"
	 *		font-size="12px"
	 *		font-family="Helvetica, sans-serif"
	 *		fill-color="#7DA6F5"
	 *		line-color="auto"
	 *		active-tool="notool"
	 *	></cq-drawing-settings>
	 *
	 * @alias WebComponents.DrawingSettings
	 * @extends WebComponents.Palette
	 * @class
	 * @protected
	 * @since
	 * - 7.2.0
	 * - 9.1.0 Observes attributes. Added emitter.
	 */
	class DrawingSettings extends Palette.classDefinition {
		static get observedAttributes() {
			return [
				"docked",
				"hide",
				"active-tool",
				"axis-label",
				"fill-color",
				"font-bold",
				"font-family",
				"font-italic",
				"font-size",
				"line-color",
				"line-pattern",
				"line-width",
				"orientation",
				"show-callout",
				"span-panels"
			];
		}

		constructor() {
			super();
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();
			this.addEventListener("stxtap", (e) => e.stopPropagation());
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, DrawingSettings);
			this.constructor = DrawingSettings;
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setContext(context) {
			this.addDefaultMarkup();
			this.init();
			this.params = {
				lineSelection: this.querySelector(".ciq-line-style"),
				fontSizeSelection: this.querySelector(".ciq-font-size"),
				fontFamilySelection: this.querySelector(".ciq-font-family"),
				fontStyleToggle: this.querySelector("cq-annotation-italic"),
				fontWeightToggle: this.querySelector("cq-annotation-bold"),
				fontOptions: this.querySelector("cq-annotation"),
				axisLabelToggle: this.querySelector("cq-axis-label .ciq-checkbox"),
				spanPanelsToggle: this.querySelector("cq-span-panels .ciq-checkbox"),
				showCalloutToggle: this.querySelector("cq-show-callout .ciq-checkbox"),
				fillColor: this.querySelector("cq-fill-color:not(cq-cvp-controller)"),
				lineColor: this.querySelector("cq-line-color:not(cq-cvp-controller)"),
				cvpControllers: this.querySelectorAll("cq-cvp-controller"),
				waveParameters: this.querySelector("cq-wave-parameters")
			};
			this.params.cvpControllers.forEach(
				(controller) => (controller.toolbar = this)
			);

			// Add a texture to the drag strip
			//this.querySelector('.drag-strip').style.backgroundImage = "url('css/img/palette-drag-strip.svg')";
			this.sync();
			this.dirty(false);
			const self = this;
			CIQ.UI.contextsForEach(function () {
				if (this.stx.setDrawingContainer) this.stx.setDrawingContainer(self);
			});
			context.stx.addEventListener("theme", () => {
				const isDirty = this.querySelector("*[cq-toolbar-dirty].ciq-active");
				this.sync();
				if (!isDirty) this.dirty(false);
			});
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (newValue === oldValue) return;
			const action = this.activator ? "click" : null;
			delete this.activator;

			switch (name) {
				case "active-tool":
					this.tool(null, newValue);
					break;
				case "line-color":
					this.setColor(newValue, "line");
					break;
				case "fill-color":
					this.setColor(newValue, "fill");
					break;
				case "font-family":
					this.setFontFamily(null, newValue);
					break;
				case "font-size":
					this.setFontSize(null, newValue);
					break;
				case "font-italic":
					this.setFontStyle("italic", newValue === "true" ? true : false);
					break;
				case "font-bold":
					this.setFontStyle("bold", newValue === "true" ? true : false);
					break;
				case "line-width":
					this.setLine(null, newValue, null);
					break;
				case "line-pattern":
					this.setLine(null, null, newValue);
					break;
				case "axis-label":
				case "span-panels":
				case "show-callout":
					this.toggleCheckbox(null, name, newValue === "true");
					break;
			}
			super.handlePropertyChange(name, oldValue, newValue);

			if (!this.context) return;

			if (!this.syncing) {
				this.emitCustomEvent({
					action,
					effect: "select",
					detail: { name, value: newValue }
				});
			}
		}

		/**
		 * Overloaded from palette class.
		 * Handler for responding to messaging sent from other palettes `sendMessage` function.
		 *
		 * @param {string} id Identifier for the message
		 * @param {object | string} message Optional data accompanying the message
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		handleMessage(id, message) {
			switch (id) {
				case "changeTool":
					// The Order is important as tool setting initiates chart repositioning
					// and should be last to make sure that updated height is available
					// A safer approach would be define static label size that may not be
					// as desirable from UI layout perspective
					this.setActiveToolLabel(message.toolLabel);
					this.toolSettings(message.activator, message.toolName);
					break;
				case "clearDrawings":
					this.clearDrawings();
					break;
				case "restoreDefaultConfig":
					this.restoreDefaultConfig(message.activator, message.all);
			}
		}

		/**
		 * Remove all drawings from the chart.
		 */
		clearDrawings() {
			const wrappers =
				this.context.topNode.querySelectorAll("cq-context-wrapper");
			if (wrappers.length)
				wrappers.forEach((wrapper) => {
					if (wrapper.classList.contains("active")) {
						const activeContextNode = wrapper.querySelector("cq-context");
						activeContextNode.context.stx.clearDrawings(null, false);
					}
				});
			else this.context.stx.clearDrawings(null, false);
		}

		/**
		 * Enable crosshairs.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		crosshairs(activator) {
			const { stx } = this.context;
			stx.changeVectorType(null);
			stx.layout.crosshair = true;
			stx.doDisplayCrosshairs();
			stx.findHighlights(false, true);
			stx.changeOccurred("layout");
			stx.draw();
			stx.updateChartAccessories();
			this.querySelectorAll("*[cq-section]").forEach((el) =>
				el.classList.remove("ciq-active")
			);
			this.emit();
		}

		/**
		 * Enable settings UI for specified drawing tool. Sends `changeToolSettings` message to other palettes.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} toolName Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		tool(activator, toolName) {
			if (!this.context) return;
			this.toolSettings(activator, toolName);
			this.setActiveToolLabel(toolName);
			this.sendMessage("changeToolSettings", { activator, toolName });
		}

		/**
		 * Enable settings UI for specified drawing tool. Called by `tool` function.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} toolName Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toolSettings(activator, toolName) {
			if (!this.context) return;
			const { stx } = this.context;
			this.querySelectorAll("*[cq-section]").forEach((section) =>
				section.classList.remove("ciq-active")
			);
			let removeDirty = !this.querySelector("*[cq-toolbar-dirty].ciq-active");
			const drawingParameters = CIQ.Drawing.getDrawingParameters(stx, toolName);
			let actionEl;
			if (drawingParameters) {
				actionEl = this.querySelector("*[cq-toolbar-action='save']");
				if (actionEl) actionEl.classList.add("ciq-active");
				const drawingPrefs = stx.preferences.drawings;
				if (drawingPrefs && drawingPrefs[toolName]) {
					actionEl = this.querySelector("*[cq-toolbar-action='restore']");
					if (actionEl) actionEl.classList.add("ciq-active");
					removeDirty = true;
				}
				// fibtimezone has no values to display in the settings dialog
				if (toolName === "fibtimezone") {
					delete drawingParameters.parameters;
				}

				const none = this.params.lineSelection.querySelector(".fills-only");
				if (none) none.setAttribute("hidden", "");
				let elements = this.defaultElements(drawingParameters, toolName);
				for (let i = 0; i < elements.length; i++) {
					const els = this.querySelectorAll(
						`${elements[i]}[cq-section], ${elements[i]} [cq-section]`
					);
					els.forEach((el) => el.classList.add("ciq-active"));
					if (none && elements[i] == "cq-fill-color")
						none.removeAttribute("hidden");
				}
				// special sections which have their own webcomponents, do not activate children of these
				elements = CIQ.Drawing[toolName].prototype.$controls;
				if (elements) {
					for (let i = 0; i < elements.length; i++) {
						const els = this.querySelectorAll(`${elements[i]}[cq-section]`);
						els.forEach((el) => el.classList.add("ciq-active"));
					}
				}
				if (
					toolName === "trendline" &&
					!stx.currentVectorParameters.showCallout
				) {
					["fontOptions", "fillColor"].forEach((name) =>
						this.params[name].classList.remove("ciq-active")
					);
				}
			}
			if (toolName === "notool") {
				stx.changeVectorType("");
				// Don't disengage the magnet
				/*if (stx.preferences.magnet) {
					this.toggleMagnet(this);
				}*/
				this.hide = "true";
			} else {
				this.hide = "false";
				if (this.restoreDocked) {
					this.dock();
					delete this.restoreDocked;
				}
				setTimeout(() => {
					const node = this.querySelector(".palette-container");
					node.tabIndex = -1;
					node.focus();
				}, 10);
			}
			// Resizing the dock because the setting palette is hidden/shown based on the 'no tool' selection
			this.paletteDock.handleResize();
			this["active-tool"] = toolName;
			this.sync();
			if (removeDirty) this.dirty(false);
		}

		/**
		 * Array of element selectors for drawing setting UI elements used by the specified tool.
		 *
		 * @param {object} drawingParameters Drawing parameters object.
		 * @param {string} toolName Name of drawing tool.
		 * @returns Array of drawing setting element selectors
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		defaultElements(drawingParameters, toolName) {
			const arr = [];
			for (let param in drawingParameters) {
				if (param == "color") arr.push("cq-line-color");
				else if (param == "fillColor") arr.push("cq-fill-color");
				else if (param == "pattern" || param == "lineWidth")
					arr.push("cq-line-style");
				else if (param == "axisLabel") arr.push("cq-axis-label");
				else if (param == "spanPanels") arr.push("cq-span-panels");
				else if (param == "showCallout") arr.push("cq-show-callout");
				else if (param == "font") arr.push("cq-annotation");
				else if (param == "parameters") {
					switch (toolName) {
						case "volumeprofile":
							arr.push("cq-clickable[cq-volumeprofile-settings]");
							break;
						case "measurementline":
							arr.push("cq-clickable[cq-measurementline-settings]");
							break;
						default:
							arr.push("cq-clickable[cq-fib-settings]");
					}
				}
			}

			return arr;
		}

		/**
		 * Sets active state of drawing settings Save Config button
		 *
		 * @param {boolean} [on=true] Set to `true` to set active.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		dirty(on = true) {
			this.querySelector("*[cq-toolbar-dirty]").classList.toggle(
				"ciq-active",
				on
			);
		}

		/**
		 * Emits a change event.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		emit() {
			const event = new Event("change", {
				bubbles: true,
				cancelable: true
			});
			this.dirty();
			this.dispatchEvent(event);
		}

		/**
		 * Gets the current drawing color and updates display in palette.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} mode Type of color: `fill` or `line`.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		getColor(activator, mode) {
			if (mode !== "fill" && mode !== "line") return;
			const { node } = activator;
			const specialColorStyles = ["color-auto", "color-transparent"];
			const color =
				this.context.stx.currentVectorParameters[
					mode === "line" ? "currentColor" : "fillColor"
				];
			this[mode + "-color"] = color;
			specialColorStyles.forEach((style) => node.classList.remove(style));
			if (specialColorStyles.includes("color-" + color)) {
				node.removeAttribute("style");
				node.classList.add("color-" + color);
			} else {
				node.style.background = color;
				const bgColor = CIQ.getBackgroundColor(this.parentNode);
				if (!color || Math.abs(CIQ.hsl(bgColor)[2] - CIQ.hsl(color)[2]) < 0.2) {
					const border = CIQ.chooseForegroundColor(bgColor);
					node.style.border = "solid " + border + " 1px";
				} else {
					node.style.border = "";
				}
			}
			const label = node.querySelector("[label]");
			if (label) label.innerText = color;
		}

		/**
		 * Enables colorPicker and provides callback to `setColor`, depending on `mode` value.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} mode Type of color: `fill` or `line`.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		pickColor(activator, mode) {
			if (mode !== "fill" && mode !== "line") return;
			const { node } = activator;
			const colorPicker = this.uiManager.getColorPicker(this);
			colorPicker.callback = (color) => {
				this.activator = activator;
				this.setColor(color, mode);
				this.emit();
			};
			let overrides = node.getAttribute("cq-overrides");
			if (overrides) overrides = overrides.split(",");
			colorPicker.display({ node, overrides, context: this.context });
		}

		/**
		 * Sets the default line or fill color, depending on `mode` value.
		 *
		 * @param {string} color A Valid css color value.
		 * @param {string} mode Type of color: `fill` or `line`.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setColor(color, mode) {
			if (mode !== "fill" && mode !== "line") return;
			if (!this.context) return;
			this.context.stx.currentVectorParameters[
				mode === "line" ? "currentColor" : "fillColor"
			] = color;
			this.getColor(
				{
					node: this.ownerDocument.querySelector("cq-" + mode + "-color")
				},
				mode
			);
			this.emit();
		}

		/**
		 * Restore drawing settings default configuration.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {boolean} all Set to `true` to restore default for all drawing objects. Otherwise only the active drawing object's defaults are restored.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		restoreDefaultConfig(activator, all) {
			const { stx } = this.context;
			CIQ.Drawing.restoreDefaultConfig(
				stx,
				stx.currentVectorParameters.vectorType,
				all
			);
			const actionEl = this.querySelector("*[cq-toolbar-action='restore']");
			if (actionEl) actionEl.classList.remove("ciq-active");
			this.sync();
			this.dirty(false);
		}

		/**
		 * Save current drawing settings as default configuration.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		saveConfig() {
			const { stx } = this.context;
			CIQ.Drawing.saveConfig(stx, stx.currentVectorParameters.vectorType);
			const actionEl = this.querySelector("*[cq-toolbar-action='restore']");
			if (actionEl) actionEl.classList.add("ciq-active");
			this.sync();
			this.dirty(false);
		}

		/**
		 * Set drawing settings for fibonacci drawing tools.
		 *
		 * @param {number} width Line width
		 * @param {string} pattern Line pattern
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFibs(width, pattern) {
			const fib = this.context.stx.currentVectorParameters.fibonacci;
			if (fib) {
				for (let i = 0; i < fib.fibs.length; i++) {
					fib.fibs[i].parameters.lineWidth = width;
					fib.fibs[i].parameters.pattern = pattern;
				}
				fib.timezone.parameters.lineWidth = width;
				fib.timezone.parameters.pattern = pattern;
			}
		}

		/**
		 * Sets the default font family.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} fontFamily A Valid css font-family value.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFontFamily(activator, fontFamily) {
			if (!this.context) return;
			this.activator = activator;
			const { stx } = this.context;

			if (stx.currentVectorParameters.annotation) {
				if (fontFamily == "Default") {
					stx.currentVectorParameters.annotation.font.family = null;
				} else {
					stx.currentVectorParameters.annotation.font.family = fontFamily;
				}
			}
			this["font-family"] = fontFamily;
			this.params.fontFamilySelection.setAttribute("text", fontFamily);
			this.emit();
		}

		/**
		 * Sets the default font size.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} fontSize A Valid css font-size value.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFontSize(activator, fontSize) {
			if (!this.context) return;
			this.activator = activator;
			const { stx } = this.context;

			if (stx.currentVectorParameters.annotation)
				stx.currentVectorParameters.annotation.font.size = fontSize;
			this["font-size"] = fontSize;
			this.params.fontSizeSelection.setAttribute("text", fontSize);
			this.emit();
		}

		/**
		 * Set drawing line style.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {number} width Line width
		 * @param {string} pattern Line pattern
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setLine(activator, width, pattern) {
			if (!this.context) return;
			this.activator = activator;
			const { stx } = this.context;

			width = width || stx.currentVectorParameters.lineWidth;
			pattern = pattern || stx.currentVectorParameters.pattern;

			stx.currentVectorParameters.lineWidth = width;
			stx.currentVectorParameters.pattern = pattern;
			this.setFibs(width, pattern);
			this.currentLineSelectedClass =
				"ciq-" + pattern + "-" + parseInt(width, 10);
			if (pattern == "none") {
				this.currentLineSelectedClass = null;
			}
			this.params.lineSelection.setAttribute(
				"icon",
				this.currentLineSelectedClass
			);
			if (!this.querySelector("cq-fill-color.ciq-active")) {
				const none = this.params.lineSelection.querySelector(".fills-only");
				if (none) none.setAttribute("hidden", "");
			}
			this["line-width"] = width;
			this["line-pattern"] = pattern;
			this.emit();
		}

		/**
		 * Set text of palette active tool label element.
		 *
		 * @param {string} activeToolLabel Name of drawing tool.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setActiveToolLabel(activeToolLabel) {
			// Clean up tool labels
			if (activeToolLabel === "No Tool") {
				activeToolLabel = "";
			} else if (activeToolLabel === "freeform") {
				activeToolLabel = "Doodle";
			} else {
				activeToolLabel = activeToolLabel + ":";
			}
			this.querySelector(".ciq-active-tool-label").innerHTML = activeToolLabel;
			this.querySelector(".ciq-mobile-palette-toggle span").innerHTML =
				activeToolLabel || "Select Tool";
		}

		/**
		 * Synchronizes the drawing toolbar with stx.currentVectorParameters. Poor man's data binding.
		 *
		 * @param {object} [cvp=stx.currentVectorParameters] A new drawing object, otherwise defaults to the current one
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		sync(cvp) {
			this.syncing = true;
			const { stx } = this.context;

			if (!cvp) cvp = stx.currentVectorParameters;
			else
				stx.currentVectorParameters = CIQ.extend(
					stx.currentVectorParameters || {},
					cvp
				);

			const { params } = this;
			this.setLine(null, cvp.lineWidth, cvp.pattern);

			const style = stx.canvasStyle("stx_annotation");

			const font = cvp.annotation && cvp.annotation.font;

			const initialSize = (font && font.size) || style.fontSize;
			this.setFontSize(null, initialSize);

			const initialFamily = (font && font.family) || style.fontFamily;
			this.setFontFamily(null, initialFamily);

			const initialFontStyle = (font && font.style) || style.fontStyle;
			const initialWeight = (font && font.weight) || style.fontWeight;
			this.setFontStyle("italic", initialFontStyle === "italic");
			this.setFontStyle(
				"bold",
				initialWeight === "bold" || initialWeight >= 700
			);

			this.toggleCheckbox(null, "axis-label", cvp.axisLabel);
			this.toggleCheckbox(null, "show-callout", cvp.showCallout);
			this.toggleCheckbox(null, "span-panels", cvp.spanPanels);

			this.getColor({ node: params.fillColor }, "fill");
			this.getColor({ node: params.lineColor }, "line");

			params.cvpControllers.forEach((controller) => {
				controller.sync(cvp);
			});

			const { waveParameters } = params;
			if (waveParameters) {
				waveParameters.activate();
			}
			this.syncing = false;
		}

		/**
		 * Toggle checked state of checkbox element and update associated drawing setting.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} id Drawing setting property name
		 * @param {boolean} [forceValue=null] If set, will force the toggle to that value.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toggleCheckbox(activator, id, forceValue = null) {
			if (!this.context) return;
			this.activator = activator;
			const cvp = this.context.stx.currentVectorParameters;
			id = id.replace(/-./g, (x) => x[1].toUpperCase());
			cvp[id] = forceValue === null ? !cvp[id] : forceValue;
			const node = this.params[id + "Toggle"];
			if (node) node.classList[cvp[id] ? "add" : "remove"]("ciq-active");
			if (id === "showCallout" && cvp.vectorType === "trendline") {
				["fontOptions", "fillColor"].forEach((name) =>
					this.params[name].classList[cvp[id] ? "add" : "remove"]("ciq-active")
				);
			}
			const attrName = id.replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`);
			this[attrName] = cvp[id].toString();
			this.params[id + "Toggle"].setAttribute(
				"aria-checked",
				cvp[id].toString()
			);
			this.emit();
		}

		/**
		 * Toggle active state of font "bold" and "italic" styles and update drawing settings.
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 * @param {string} fontStyle Style to toggle, "bold" or "italic".
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toggleFontStyle(activator, fontStyle) {
			const { stx } = this.context;
			let currentState = false;
			this.activator = activator;

			if (fontStyle == "italic") {
				currentState =
					stx.currentVectorParameters.annotation.font.style == "italic";
			} else if (fontStyle == "bold" || fontStyle >= 700) {
				currentState =
					stx.currentVectorParameters.annotation.font.weight == "bold";
			}
			this.setFontStyle(fontStyle, !currentState);
		}

		/**
		 * Set drawing tool font style
		 *
		 * @param {string} fontStyle Style to set, "bold" or "italic".
		 * @param {boolean} state Active state, set to "true" to enable.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		setFontStyle(fontStyle, state) {
			if (!this.context) return;
			const { stx } = this.context;
			const node = this.querySelector("cq-annotation-" + fontStyle);

			if (fontStyle == "italic") {
				stx.currentVectorParameters.annotation.font.style = state
					? "italic"
					: null;
			} else if (fontStyle == "bold") {
				stx.currentVectorParameters.annotation.font.weight = state
					? "bold"
					: null;
			} else return;

			this["font-" + fontStyle] = state ? "true" : "false";
			if (node) {
				node.classList[state ? "add" : "remove"]("ciq-active");
				node.setAttribute("aria-pressed", state);
			}
			this.emit();
		}

		/**
		 * Toggle grabbing magnet state
		 *
		 * @param {Object} activator
		 * @param {HTMLElement} activator.node Element that triggered this function.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		toggleMagnet(activator) {
			const toggle = activator.node;
			const { stx } = this.context;
			if (stx.preferences.magnet) {
				toggle.classList.remove("active");
				stx.preferences.magnet = false;
			} else {
				toggle.classList.add("active");
				stx.preferences.magnet = true;
			}
			CIQ.UI.contextsForEach(function () {
				this.stx.preferences.magnet = stx.preferences.magnet;
				if (this.stx.chart.tempCanvas)
					CIQ.clearCanvas(this.stx.chart.tempCanvas, this.stx);
			});
		}

		/**
		 * Sends `toggleDrawingPalette` message to other palettes.
		 *
		 * @tsmember WebComponents.DrawingSettings
		 */
		togglePalette() {
			this.sendMessage("toggleDrawingPalette");
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.DrawingSettings
	 */
	DrawingSettings.markup = `
	<div role="group" aria-label="Drawing Tool Settings Palette" class="palette-container">	
		<div class="drag-strip" aria-hidden="true"></div>
			<div class="drawing-settings-wrapper">
					<div class="mini-widget-group">
						<cq-item class="ciq-mini-widget" cq-view="detach" stxtap="detach()" aria-label="Detach Palette" role="button"><span class="icon" aria-hidden="true"></span><label>Detach</label></cq-item>
						<cq-item class="ciq-mini-widget" cq-view="attach" stxtap="dock()" aria-label="Dock Palette" role="button"><span class="icon" aria-hidden="true"></span><label>Attach</label></cq-item>
					</div>
				<cq-clickable class="ciq-select ciq-mobile-palette-toggle" stxtap="togglePalette()"><span>Select Tool</span></cq-clickable>
				<cq-toolbar-settings>
					<div class="ciq-active-tool-label ciq-heading"></div>
					<cq-fill-color cq-section cq-overrides="auto,none" class="ciq-color" stxbind="getColor('fill')" stxtap="pickColor('fill')" role="button">
						<span class="icon" aria-hidden="true"></span>
						<span class="ciq-screen-reader">Fill Color</span>
						<span class="ciq-screen-reader" label></span>
					</cq-fill-color>
					<div>
						<cq-line-color cq-section cq-overrides="auto" class="ciq-color" stxbind="getColor('line')" stxtap="pickColor('line')" role="button">
							<span class="icon" aria-hidden="true"></span>
							<span class="ciq-screen-reader">Line Color</span>
							<span class="ciq-screen-reader" label></span>
						</cq-line-color>
						<cq-line-style cq-section>
							<cq-menu class="ciq-select ciq-line-style" reader="Line Style" config="linestyle" icon="ciq-solid-1" tooltip="Line Style"></cq-menu>
						</cq-line-style>
					</div>

					<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="2"></cq-cvp-controller>
					<cq-cvp-controller cq-section cq-cvp-header="3"></cq-cvp-controller>

					<cq-axis-label cq-section>
						<span role="checkbox" stxtap="toggleCheckbox('axisLabel')" class="ciq-checkbox ciq-active" aria-checked="true">
							<div class="ciq-heading">Axis Label:</div>
							<span></span>
						</span>
					</cq-axis-label>

					<cq-span-panels cq-section>
						<span role="checkbox" stxtap="toggleCheckbox('spanPanels')" class="ciq-checkbox ciq-active" aria-checked="true">
							<div class="ciq-heading">Span Panels:</div>
							<span></span>
						</span>
					</cq-span-panels>
	
					<cq-show-callout cq-section>
						<span role="checkbox" stxtap="toggleCheckbox('showCallout')" class="ciq-checkbox" aria-checked="false">
							<div class="ciq-heading">Show Callout:</div>
							<span></span>
						</span>
					</cq-show-callout>
	
					<cq-annotation cq-section role="group" aria-label="Annotation Settings">
						<cq-annotation-italic role="button" aria-label="Font Italic" stxtap="toggleFontStyle('italic')" class="ciq-btn" style="font-style:italic;" aria-pressed="false">I</cq-annotation-italic>
						<cq-annotation-bold role="button" aria-label="Font Bold" stxtap="toggleFontStyle('bold')" class="ciq-btn" style="font-weight:bold;" aria-pressed="false">B</cq-annotation-bold>
						<cq-menu class="ciq-select ciq-font-size" reader="Font Size" config="fontsize" text="Font Size"></cq-menu>
						<cq-menu class="ciq-select ciq-font-family" reader="Font Family" config="fontfamily" text="Font Family"></cq-menu>
					</cq-annotation>
					<cq-clickable role="button" aria-label="Fibonacci Settings" cq-fib-settings selector="cq-fib-settings-dialog" method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable role="button" aria-label="Volume Profile Settings" cq-volumeprofile-settings selector="cq-volumeprofile-settings-dialog" method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<cq-clickable role="button" aria-label="Measurement Line Settings" cq-measurementline-settings selector="cq-measurementline-settings-dialog" method="open" cq-section>
						<span class="ciq-icon-btn cq-icon-gear">
							<cq-tooltip>Settings</cq-tooltip>
						</span>
					</cq-clickable>
					<div class="ciq-drawing-edit-only" cq-section>
						<div role="button" aria-label="Done Edit" cq-toolbar-action="done_edit" stxtap="DrawingEdit.endEdit('close')" cq-section><cq-tooltip>Done Editing</cq-tooltip></div>
					</div>
					<br cq-section cq-wave-parameters><!-- This break is not displayed by default but uses the .ciq-active class to be displayed and push cq-wave-parameters onto a new line in the toolbar -->
					<cq-wave-parameters cq-section role="group" aria-label="Wave Parameters"></cq-wave-parameters>
					<div class="ciq-drawing-edit-hidden" cq-section>
						<div role="button" aria-label="Save Config" cq-toolbar-action="save" stxtap="saveConfig()" cq-section><div cq-toolbar-dirty></div><cq-tooltip>Save Config</cq-tooltip></div>
						<div role="button" aria-label="Restore Config" cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section><cq-tooltip>Restore Config</cq-tooltip></div>
					</div>
				</cq-toolbar-settings>
				<cq-measure><span class="mMeasure" aria-label="Measurement"></span></cq-measure>
			</div>
		<div class="resize-strip"></div>
	</div>
	`;
	CIQ.UI.addComponentDefinition("cq-drawing-settings", DrawingSettings);
}

};


let __js_webcomponents_scroll_menuDropdown_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

const Scroll = CIQ.UI._webcomponents.list["cq-scroll"];
if (!Scroll) {
	console.error(
		"menuDropdown component requires first activating scroll component."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-menu-dropdown&gt;</h4>
	 *
	 * Menu DropDown handles holding the items that go inside a custom menu component.
	 *
	 * Menu DropDown is a semantic element to be used in menus that has the same functionality as {@link WebComponents.Scroll} The main difference is that Menu DropDown sets noMaximize to true which means that the component will not automatically resize.
	 *
	 * The preferred way of creating menus is to use the [<cq-dropdown>]{@link WebComponents.Dropdown} component.  This component is supported for legacy purposes only.
	 *
	 * @example
	 *	 <cq-menu class="ciq-menu ciq-studies collapse">
	 *		 <span>Studies</span>
	 *		 <cq-menu-dropdown cq-no-scroll>
	 *			 <cq-study-legend cq-no-close>
	 *				 <cq-section-dynamic>
	 *					 <cq-heading>Current Studies</cq-heading>
	 *					 <cq-study-legend-content>
	 *						 <template>
	 *							 <cq-item>
	 *								 <cq-label class="click-to-edit"></cq-label>
	 *								 <div class="ciq-icon ciq-close"></div>
	 *							 </cq-item>
	 *						 </template>
	 *					 </cq-study-legend-content>
	 *					 <cq-placeholder>
	 *						 <div stxtap="Layout.clearStudies()" class="ciq-btn sm">Clear All</div>
	 *					 </cq-placeholder>
	 *				 </cq-section-dynamic>
	 *			 </cq-study-legend>
	 *			 <cq-scroll>
	 *				 <cq-studies>
	 *				 	 <cq-studies-content>
	 *						<template>
	 *							<cq-item>
	 *								<cq-label></cq-label>
	 *							</cq-item>
	 *						</template>
	 *					 </cq-studies-content>
	 *				 </cq-studies>
	 *			 </cq-scroll>
	 *		 </cq-menu-dropdown>
	 *	</cq-menu>
	 * @alias WebComponents.MenuDropDown
	 * @extends WebComponents.Scroll
	 * @class
	 * @protected
	 * @since 7.0.0 no longer dual inherits CIQ.UI.BaseComponent and CIQ.UI.Scroll. Now directly inherits Scroll which extends BaseComponent.
	 */
	class MenuDropDown extends Scroll.classDefinition {
		constructor() {
			super();
			this.noMaximize = true;
		}

		connectedCallback() {
			super.connectedCallback();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, MenuDropDown);
		}

		disablekeyboardNavigation() {
			if (this.keyboardNavigation) {
				this.keyboardNavigation.setKeyControlElement();
			}
		}
	}

	CIQ.UI.addComponentDefinition("cq-menu-dropdown", MenuDropDown);
}

};


let _exports = {CIQ:__CIQ_};

export {__js_webcomponents_abstractMarker_ as abstractMarker};
export {__js_webcomponents_advertisement_ as advertisement};
export {__js_webcomponents_aggregationDialog_ as aggregationDialog};
export {__js_webcomponents_attribution_ as attribution};
export {__js_webcomponents_chartInstructions_ as chartInstructions};
export {__js_webcomponents_chartTitle_ as chartTitle};
export {__js_webcomponents_clickable_ as clickable};
export {__js_webcomponents_close_ as close};
export {__js_webcomponents_comparison_ as comparison};
export {__js_webcomponents_cvpController_ as cvpController};
export {__js_webcomponents_dataDialog_ as dataDialog};
export {__js_webcomponents_dialog_ as dialog};
export {__js_webcomponents_doubleSlider_ as doubleSlider};
export {__js_webcomponents_drawingContext_ as drawingContext};
export {__js_webcomponents_dropdown_ as dropdown};
export {__js_webcomponents_fibSettingsDialog_ as fibSettingsDialog};
export {__js_webcomponents_floatingWindow_ as floatingWindow};
export {__js_webcomponents_gridSizePicker_ as gridSizePicker};
export {__js_webcomponents_heading_ as heading};
export {__js_webcomponents_headsupDynamic_ as headsupDynamic};
export {__js_webcomponents_headsupStatic_ as headsupStatic};
export {__js_webcomponents_help_ as help};
export {__js_webcomponents_instantChart_ as instantChart};
export {__js_webcomponents_languageDialog_ as languageDialog};
export {__js_webcomponents_loader_ as loader};
export {__js_webcomponents_lookup_ as lookup};
export {__js_webcomponents_lookupDialog_ as lookupDialog};
export {__js_webcomponents_marker_ as marker};
export {__js_webcomponents_measurementLineSettingsDialog_ as measurementLineSettingsDialog};
export {__js_webcomponents_menu_ as menu};
export {__js_webcomponents_messageToaster_ as messageToaster};
export {__js_webcomponents_palette_ as palette};
export {__js_webcomponents_paletteDock_ as paletteDock};
export {__js_webcomponents_redo_ as redo};
export {__js_webcomponents_scroll_ as scroll};
export {__js_webcomponents_shareButton_ as shareButton};
export {__js_webcomponents_shareDialog_ as shareDialog};
export {__js_webcomponents_showRange_ as showRange};
export {__js_webcomponents_sideNav_ as sideNav};
export {__js_webcomponents_sidePanel_ as sidePanel};
export {__js_webcomponents_studies_ as studies};
export {__js_webcomponents_studyContext_ as studyContext};
export {__js_webcomponents_studyDialog_ as studyDialog};
export {__js_webcomponents_studyLegend_ as studyLegend};
export {__js_webcomponents_swatch_ as swatch};
export {__js_webcomponents_themeDialog_ as themeDialog};
export {__js_webcomponents_themes_ as themes};
export {__js_webcomponents_timezoneDialog_ as timezoneDialog};
export {__js_webcomponents_toggle_ as toggle};
export {__js_webcomponents_typedefs_ as typedefs};
export {__js_webcomponents_undo_ as undo};
export {__js_webcomponents_viewDialog_ as viewDialog};
export {__js_webcomponents_views_ as views};
export {__js_webcomponents_volumeProfileSettingsDialog_ as volumeProfileSettingsDialog};
export {__js_webcomponents_waveParameters_ as waveParameters};
export {__js_webcomponents_yAxisContext_ as yAxisContext};
export {__js_webcomponents_dialog_colorPicker_ as colorPicker};
export {__js_webcomponents_palette_drawingPalette_ as drawingPalette};
export {__js_webcomponents_palette_drawingSettings_ as drawingSettings};
export {__js_webcomponents_scroll_menuDropdown_ as menuDropdown};

export {__CIQ_ as CIQ};

/* global __TREE_SHAKE__ */
if (typeof __TREE_SHAKE__ === "undefined" || !__TREE_SHAKE__) {
	_exports.CIQ.activateImports(
		__js_webcomponents_abstractMarker_,
		__js_webcomponents_advertisement_,
		__js_webcomponents_aggregationDialog_,
		__js_webcomponents_attribution_,
		__js_webcomponents_chartInstructions_,
		__js_webcomponents_chartTitle_,
		__js_webcomponents_clickable_,
		__js_webcomponents_close_,
		__js_webcomponents_comparison_,
		__js_webcomponents_cvpController_,
		__js_webcomponents_dataDialog_,
		__js_webcomponents_dialog_,
		__js_webcomponents_doubleSlider_,
		__js_webcomponents_drawingContext_,
		__js_webcomponents_dropdown_,
		__js_webcomponents_fibSettingsDialog_,
		__js_webcomponents_floatingWindow_,
		__js_webcomponents_gridSizePicker_,
		__js_webcomponents_heading_,
		__js_webcomponents_headsupDynamic_,
		__js_webcomponents_headsupStatic_,
		__js_webcomponents_help_,
		__js_webcomponents_instantChart_,
		__js_webcomponents_languageDialog_,
		__js_webcomponents_loader_,
		__js_webcomponents_lookup_,
		__js_webcomponents_lookupDialog_,
		__js_webcomponents_marker_,
		__js_webcomponents_measurementLineSettingsDialog_,
		__js_webcomponents_menu_,
		__js_webcomponents_messageToaster_,
		__js_webcomponents_palette_,
		__js_webcomponents_paletteDock_,
		__js_webcomponents_redo_,
		__js_webcomponents_scroll_,
		__js_webcomponents_shareButton_,
		__js_webcomponents_shareDialog_,
		__js_webcomponents_showRange_,
		__js_webcomponents_sideNav_,
		__js_webcomponents_sidePanel_,
		__js_webcomponents_studies_,
		__js_webcomponents_studyContext_,
		__js_webcomponents_studyDialog_,
		__js_webcomponents_studyLegend_,
		__js_webcomponents_swatch_,
		__js_webcomponents_themeDialog_,
		__js_webcomponents_themes_,
		__js_webcomponents_timezoneDialog_,
		__js_webcomponents_toggle_,
		__js_webcomponents_typedefs_,
		__js_webcomponents_undo_,
		__js_webcomponents_viewDialog_,
		__js_webcomponents_views_,
		__js_webcomponents_volumeProfileSettingsDialog_,
		__js_webcomponents_waveParameters_,
		__js_webcomponents_yAxisContext_,
		__js_webcomponents_dialog_colorPicker_,
		__js_webcomponents_palette_drawingPalette_,
		__js_webcomponents_palette_drawingSettings_,
		__js_webcomponents_scroll_menuDropdown_,
		null
	);
}