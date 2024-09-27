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
