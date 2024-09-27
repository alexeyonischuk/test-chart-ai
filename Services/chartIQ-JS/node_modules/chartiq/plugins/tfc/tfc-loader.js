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


/*
 *
 * TFC package.  This loads up the Trade From Chart module.
 *
 */
import { CIQ } from "../../js/componentUI.js";
import TFC from "./tfc.js";
import { html, toggle } from "./config.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./tfc.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./tfc.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(new URL("./tfc.css", import.meta.url).href, resolve);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "tfc")); // a framework, such as Angular, may require style addition

function start(config) {
	let { stx, account, allowUniqueAccountConstruction } = config;

	const accountIsInstance = typeof account !== "function";

	if (allowUniqueAccountConstruction || accountIsInstance) {
		config.account = accountIsInstance ? account : new account();
	} else {
		TFC.sharedAccount =
			TFC.sharedAccount || (accountIsInstance ? account : new account());
		config.account = TFC.sharedAccount;
	}

	const tfc = (stx.tfc = new TFC(config));

	const topNode = config.context
		? config.context.topNode.multiChartContainer || config.context.topNode
		: stx.container.ownerDocument;
	const qs = (path) => topNode.querySelector(path);

	const sidePanel = qs("cq-side-panel");

	if (!topNode.querySelector("cq-side-panel .stx-trade-panel")) {
		// Add trade panel if markup is not already present in side panel
		sidePanel.appendChild(qs(".stx-trade-panel"));
	}
	// Start with compact panel
	if (config.startCompact) {
		topNode.querySelector(".stx-trade-nav").classList.toggle("active", true);
		topNode.querySelector(".stx-trade-info").classList.toggle("active", false);
	}

	if (config.context) {
		// Resize side panel based on tradePanel width
		sidePanel.resizeMyself();
	}
}

// Stub function to allow child classes to be defined by the user
CIQ.Account = CIQ.Account || function () {};

// **Note:** The CIQ.TFC documentation is in *plugins/tfc/tfc.js*.
//
// Stub function used to create the plug-in object on the page before the class is loaded.
//
// @param {object} config Configuration parameters.
// @param {CIQ.ChartEngine} config.stx A reference to the chart engine.
// @param {CIQ.Account} [config.account] Account object for querying a brokerage and placing
// 		trades. If this parameter is omitted, the plug-in uses the `CIQ.Account.Demo` demo account.
// @param {CIQ.ChartEngine.Chart} [config.chart] The specific chart (panel) for trading componentry. Defaults to
// 		the default chart.
// @param {CIQ.UI.Context} [config.context] UI context for interaction between TFC and the UI (for
// 		example, switching the chart's symbol).
// @param {HTMLElement} [config.container] The DOM element to which the TFC
// 		toggle is attached.
// @param {boolean} [config.loadTemplate] Set to false if the Trade from Chart markup is already
//		present in the document.
// @param {string} [config.htmlTemplate] Markup string to use instead of the default loaded HTML
// 		string.
// @param {boolean} [config.loadSample] Set to true to load the sample demo account.
//
// @since
// - 6.2.0 Added `context` parameter.
// - 8.1.0 Added `config.loadTemplate` and `config.htmlTemplate`.
// - 8.4.0 Added `config.loadSample`.
// - 8.8.0 Added `config.container` element.
CIQ.TFC = function (config) {
	const topNode = config.context
		? config.context.topNode
		: config.chart.container.ownerDocument.body;

	const multiChartContainer = topNode.multiChartContainer;

	if (multiChartContainer && multiChartContainer.tfcInitialized) return;
	if (multiChartContainer) multiChartContainer.tfcInitialized = true;

	const tfcConfig = Object.assign({}, config);

	if (tfcConfig.account) {
		CIQ.ensureDefaults(
			typeof tfcConfig.account === "function"
				? tfcConfig.account.prototype
				: tfcConfig.account.constructor.prototype,
			CIQ.Account.prototype
		);
	} else if (CIQ.Account.Demo) {
		tfcConfig.account = CIQ.Account.Demo;
	} else if (config.loadSample) {
		const pathbits = import.meta.url.split("/");
		pathbits.pop();
		CIQ.loadScript(
			pathbits.join("/") + "/tfc-demo.js",
			function () {
				tfcConfig.account = CIQ.Account.Demo;
				cb();
			},
			true
		);
	} else {
		console.warn(
			"The TFC plugin requires account, neither TFC plugin account has been provided " +
				"in the plugin config nor has CIQ.Account.Demo been made available using tfc-demo.js import."
		);
		return;
	}

	if (config.loadTemplate !== false) {
		// markup is not present in document

		(multiChartContainer || topNode).insertAdjacentHTML(
			"beforeend",
			config.htmlTemplate || html
		);
	}
	if (typeof config.container === "string") {
		config.container = (multiChartContainer || topNode).querySelector(
			config.container
		);
	}

	if (
		config.container &&
		!config.container.querySelector(
			"cq-toggle[member=tfc], cq-toggle[cq-member=tfc]"
		)
	) {
		const div = document.createElement("div");
		CIQ.innerHTML(div, config.toggleMarkup || toggle);
		Array.from(div.childNodes, (node) => {
			config.container.appendChild(node.cloneNode(true));
		});
	}

	let calledBack = false;
	function cb() {
		if (!calledBack && tfcConfig.account) {
			calledBack = true;
			start(tfcConfig);
		}
	}
	cssReady.then(cb);
};

export { TFC };
