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
import "../../js/webcomponents/close.js";
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents/swatch.js";


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
