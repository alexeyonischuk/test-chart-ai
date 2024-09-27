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
