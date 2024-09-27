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

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Menu web component `<cq-heading>`.
 *
 * Attribute cq-filter adds input for filtering cq-items in
 * cq-heading sibling container based on entered input.
 * Filter is matching input pattern anywhere in cq-item text.
 *
 * Attribute value passed in cq-filter is used for input placeholder.
 * Default placeholder is set to "Search"
 *
 * cq-search-icon attribute adds cq-lookup-icon before search input
 *
 * Attribute cq-filter-min can be used to override the default minimum
 * number of records for filter to show.  The default is 15.
 *
 * @namespace WebComponents.cq-menu-item-filter
 * @example
 * <!-- default "Search" input placeholder -->
 * <cq-heading cq-filter>Studies</cq-heading>
 *
 * <!-- "Filter" placeholder -->
 * <cq-heading cq-filter="Filter">Studies</cq-heading>
 *
 * <!-- No visible placeholder, minimum length for filter set to 20 -->
 * <cq-heading cq-filter=" " cq-filter-min=20>Studies</cq-heading>
 */
class Heading extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Heading);
	}

	setContext() {
		if (!this.hasAttribute("cq-filter")) return;

		const filter = this.getAttribute("cq-filter") || "Search";
		this.createFilter(filter);
	}

	createFilter(placeholder) {
		if (this.filterCreated) return;
		const searchWrapper = document.createElement("div");
		searchWrapper.classList.add("searchFilter");
		this.appendChild(searchWrapper);
		const input = document.createElement("input");
		input.type = "search";
		input.placeholder = placeholder;
		input.setAttribute("tabindex", "-1");
		if (this.hasAttribute("cq-search-icon")) {
			searchWrapper.appendChild(
				this.ownerDocument.createElement("cq-lookup-icon")
			);
		}
		searchWrapper.appendChild(input);
		this.searchWrapper = searchWrapper;

		const itemContainer = this.nextElementSibling;
		let previousValue = "";

		const updateListVisibility = ({ target: { value } }) => {
			const re = new RegExp(value, "i");
			const qsa = this.qsa;

			qsa("cq-item", itemContainer).forEach((el) => {
				const visibilityAction =
					value && !re.test(el.textContent) ? "add" : "remove";
				el.classList[visibilityAction]("item-hidden");
				if (previousValue !== value) {
					previousValue = value;
					this.removeFocused.apply(itemContainer);
					qsa(".cq-keyboard-selected-highlight").forEach((highlightEl) => {
						highlightEl.classList.add("disabled");
					});
					input.focus();
				}
			});
			if (typeof itemContainer.scrollToTop === "function") {
				itemContainer.scrollToTop();
			}
		};
		input.addEventListener("input", updateListVisibility);
		input.addEventListener("keyup", updateListVisibility);

		input.addEventListener("pointerdown", (e) => {
			e.stopPropagation();
		});

		const minItemCount = this.getAttribute("cq-filter-min") || 15;

		const showFilterIfNecessary = () => {
			const itemCount = this.qsa("cq-item", itemContainer).length;
			searchWrapper.classList[itemCount > minItemCount ? "add" : "remove"](
				"active"
			);
		};

		// Delay the execution of the filter activation check until sibling child nodes
		// have been created providing reference to the need for filter
		// based on cq-filter-min setting
		if (typeof MutationObserver === "undefined") {
			searchWrapper.classList.add("active");
			return;
		}
		new MutationObserver(showFilterIfNecessary).observe(this.parentElement, {
			childList: true,
			subtree: true
		});

		showFilterIfNecessary();
		this.filterCreated = true;
	}
}
CIQ.UI.addComponentDefinition("cq-heading", Heading);
