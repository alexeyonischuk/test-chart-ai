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
import "../../js/webcomponents_legacy/close.js";
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents_legacy/swatch.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */





var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Search/lookup dialog for changing the main symbol of the chart and adding comparisons.
 *
 * @namespace WebComponents.cq-lookup-dialog
 * @param {object} params
 * @param {CIQ.ChartEngine.Driver.Lookup} [params.driver]
 * @since 8.8.0
 */
class LookupDialog extends CIQ.UI.DialogContentTag {
	static get observedAttributes() {
		return ["filter", "dialog-title"];
	}

	get activeFilter() {
		return this.getAttribute("filter");
	}

	set activeFilter(element) {
		this.setAttribute("filter", element.innerText);
	}

	get dialogTitle() {
		return this.getAttribute("dialog-title");
	}

	set dialogTitle(text) {
		this.setAttribute("dialog-title", text);
	}

	constructor(params = {}) {
		super();
		this.params = params;
		this.swatchColors = CIQ.UI.defaultSwatchColors;
		this.initialized = false;
	}

	/**
	 * Handles accepted text by the input and sends text to Lookup Driver.
	 * Passes results to {@link WebComponents.cq-lookup-dialog#results}.
	 *
	 * @param {string} value
	 * @alias acceptText
	 * @memberof WebComponents.cq-lookup-dialog
	 */
	acceptText(value) {
		const self = this;
		this.params.driver.acceptText(value, this.activeFilter, null, closure);
		function closure(results) {
			self.results(results);
		}
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

	attributeChangedCallback(name, oldAttr, newAttr) {
		switch (name) {
			// html2canvas causes issues where the element is emptied and cloned!
			case "dialog-title":
				if (this.titleEl) this.titleEl.innerText = newAttr;
				break;
			case "filter":
				if (this.form) {
					const { filter, symbol } = this.form.elements;
					filter.value = newAttr;
					if (oldAttr !== newAttr) this.acceptText(symbol.value);
				}
				break;
			default:
				break;
		}
	}

	/**
	 * Opens the dialog tag and displays it over the chart. Works with the dialog channel.
	 * @param {object} params
	 * @param {HTMLElement} [params.caller] caller element that triggered the opening
	 * @alias open
	 * @memberof WebComponents.cq-lookup-dialog
	 *
	 * @since 9.0.0 respect caller element cq-maintain-case for symbols added from input box
	 */
	open(params) {
		const { caller } = params;
		const self = this;

		const isComparison = caller && caller.hasAttribute("comparison");
		if (isComparison && !params.context.stx.chart.symbol) {
			return;
		}
		this.maintainCase =
			caller &&
			!["false", "0", null].includes(caller.getAttribute("cq-maintain-case"));
		super.open(params);
		this.isComparison = isComparison;
		this.dialogTitle = isComparison ? "Add Comparison" : "Symbol Lookup";

		if (isComparison) {
			this.input.parentElement.parentElement.classList.add("comparison");
			CIQ.UI.pickSwatchColor(this, this.swatch);
		} else {
			this.input.parentElement.parentElement.classList.remove("comparison");
		}

		if (!this.activeFilter) {
			this.activeFilter = this.filters.firstElementChild;
			this.currentFilter = this.filters.firstElementChild;
			this.filters.firstElementChild.classList.add("true");
		}

		//this.dialog.setAttribute("native-tabbing", true);
		setTimeout(() => {
			// input is not in viewport until after parent dialog opens
			self.input.focus();
		}, 0);
	}

	/**
	 * Closes the dialog and resets the input.
	 * @alias close
	 * @memberof WebComponents.cq-lookup-dialog
	 */
	close() {
		this.channelWrite("channel.lookup", false, this.context.stx);
		this.input.value = "";

		super.close();
	}

	/**
	 * Initializes the component the first time it has been opened.
	 * Sets all the default markup and adds listeners.
	 *
	 * @private
	 * @memberof WebComponents.cq-lookup-dialog
	 */
	initialize() {
		const self = this;
		this.addDefaultMarkup();

		this.titleEl = this.querySelector("h4");
		this.closeBtn = this.querySelector("cq-close");
		this.form = this.querySelector("form");
		this.input = this.querySelector("cq-lookup-input input");
		this.filters = this.querySelector("cq-lookup-filters");
		this.resultList = this.querySelector(".ciq-lookup-results");
		this.resultTemplate = this.querySelector("template#lookupResult");
		this.swatch = this.querySelector("cq-swatch");
		this.submit = this.querySelector("[type=submit]");

		// Use event listener so that we don't reset on close after selecting a symbol
		this.closeBtn.addEventListener("pointerup", () => {
			self.reset();
		});

		this.input.addEventListener("input", function (e) {
			self.acceptText(e.target.value);
		});

		this.form.addEventListener("submit", function (e) {
			e.preventDefault();
			self.selectItem(self.input.value);
		});

		this.initialized = true;

		if (CIQ.UI.scrollbarStyling) {
			CIQ.UI.scrollbarStyling.refresh(this.resultList, {
				maxScrollbarLength: 500
			});
		}

		this.addClaim(this);
		this.filters.addEventListener("pointerup", this.setFilter.bind(this));
		this.filters.addEventListener("mousedown", function (e) {
			self.context.stx.ownerWindow.requestAnimationFrame(() => e.target.blur());
		});
		this.verticalStructure = LookupDialog.verticalStructure.map((selector) => {
			return this.querySelector(selector);
		});
	}

	/**
	 * Resets the dialog back to its default state with no search results
	 * @alias reset
	 * @memberof WebComponents.cq-lookup-dialog
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
	 * @alias results
	 * @memberof WebComponents.cq-lookup-dialog
	 */
	results(resultsArr) {
		const self = this;
		const { resultList } = this;

		while (resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}

		resultsArr.forEach((result) => {
			const li = document.createElement("LI");
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
			CIQ.UI.stxtap(li.firstChild, function () {
				self.selectItem(data);
			});

			resultList.append(li);
		});

		function itemize(inner) {
			return `<cq-item tabindex="0">${inner}</cq-item>`;
		}
	}

	/**
	 * Function that triggers when an item is selected from either the input or results list.
	 *
	 * @param {string|object} value Either the value of the item selected or a symbolObject containing the symbol.
	 * @alias selectItem
	 * @memberof WebComponents.cq-lookup-dialog
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
		this.close();
	}

	setContext(context) {
		this.context = context;

		this.dialog = this.closest("cq-dialog");
		//this.dialog.setAttribute("native-tabbing", true);

		if (!this.params.driver) this.setDriver(context.lookupDriver);
		if (!this.initialized) this.initialize();
	}

	/**
	 * Sets a selected filter as the activeFilter that is applied to {@link WebComponents.cq-lookup-dialog#acceptText}
	 *
	 * @param {PointerEvent} e Emitted pointer event
	 * @alias setFilter
	 * @memberof WebComponents.cq-lookup-dialog
	 */
	setFilter(e) {
		if (this.currentFilter) this.currentFilter.classList.remove("true");

		const src = e.target;
		e.preventDefault();

		src.classList.add("true");
		this.activeFilter = src;
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
	 * @alias setDriver
	 * @memberof WebComponents.cq-lookupDialog
	 */
	setDriver(driver) {
		this.params.driver = driver;
	}

	keyStroke(hub, key, e) {
		// Allow Dialog to handle color picker
		const topMenu = this.context.uiManager.topMenu();
		if (topMenu && topMenu.tagName === "CQ-COLOR-PICKER") return;

		const active = this.ownerDocument.activeElement;
		const parent = active.parentElement;
		const findIdx = (items) => items.findIndex((item) => item === active);
		let items, idx, next, target;
		const vertialIdx = this.verticalStructure.findIndex((i) => {
			return i.contains(active);
		});

		const isItem = active.tagName === "CQ-ITEM";
		switch (key) {
			case "ArrowDown":
			case "Down":
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
		if (target) target.focus();
	}
}

LookupDialog.verticalStructure = [
	"cq-lookup-input",
	"cq-lookup-filters",
	".ciq-lookup-results"
];

LookupDialog.markup = `
<h4 class="title">Symbol Lookup</h4>
<cq-close></cq-close>
<form role="search">
<div class="ciq-search-container">
<cq-lookup-input>
	<cq-lookup-icon></cq-lookup-icon>
	<input type="text"
		spellcheck="false"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="none"
		name="symbol"
		placeholder=""
	>
	</cq-lookup-input>
	<cq-swatch-input class="hide-label">
		<label>Color</label>
		<cq-swatch tabindex="0" name="color"></cq-swatch>
		<input name="color" type="hidden"/>
	</cq-swatch-input>
	<button type="submit" class="ciq-btn">GO</button>
</div>
<cq-lookup-filters role="group" aria-label="Filters">
	<button type="button" class="ciq-filter">ALL</button>
	<button type="button" class="ciq-filter">STOCKS</button>
	<button type="button" class="ciq-filter">FX</button>
	<button type="button" class="ciq-filter">INDEXES</button>
	<button type="button" class="ciq-filter">FUNDS</button>
	<button type="button" class="ciq-filter">FUTURES</button>
</cq-lookup-filters>
<input type="hidden" name="filter" />
</form>
<ul class="ciq-lookup-results" aria-label="Results"></ul>
<template id="lookupResult">
	<li><span></span></li>
</template>
`;

CIQ.UI.addComponentDefinition("cq-lookup-dialog", LookupDialog);
