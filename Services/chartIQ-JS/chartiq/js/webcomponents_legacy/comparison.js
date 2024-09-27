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
 * Symbol comparison component `<cq-comparison>`.
 *
 * Add attribute `cq-marker` to have the component insert itself as a marker on the chart.
 *
 * For `cq-comparison-keys`:
 * - Add `attribute cq-panel-only` to have the component show only series in the panel
 * - Add `attribute cq-all-series` to have the component show even non-comparison series in the legend
 *
 * **Note:**
 * - By default, the comparison web component will not connect gaps in the data to indicate data points are missing due to discrepancies between marker hours or due to thinly traded instruments. If you want it to behave differently, you will need to override these defaults.
 * Do not make the changes directly on *components.js*, but rather create a separate file with a copy of the methods you are overwriting and load that file right after the *components.js* file is loaded, but before any web components are instantiated. This allows for easier upgrades.
 * Look for the `addSeries` call and use the `gapDisplayStyle` parameter (or any other required parameter) as outlined in {@link CIQ.ChartEngine#addSeries}.
 *
 * - To adjust the comparison's automatic color selector, set `document.querySelector('cq-comparison').swatchColors` to an array of colors.
 * To adjust colors from the color picker popup, execute:
 *   ```
 *   const picker = document.querySelector('cq-color-picker');
 *   picker.params.colorMap=[[row 1 of colors],[row 2 of colors],[row 3 of colors],[etc.]]
 *   picker.initialize();
 *   ```
 *
 *   You can use `cq-swatch` rather than `cq-comparison-swatch` to allow user to change the series color.
 *
 * @namespace WebComponents.cq-comparison
 *
 * @example
 * document.querySelector('cq-comparison').swatchColors=["rgb(142, 198, 72)"];
 * const picker = document.querySelector('cq-color-picker');
 * picker.params.colorMap=[["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]];
 * picker.initialize();
 *
 * @example
 * <cq-comparison cq-marker>
 *     <cq-menu class="cq-comparison-new">
 *         <cq-comparison-add-label>
 *             <cq-comparison-plus></cq-comparison-plus><span>Compare</span><span>...</span>
 *         </cq-comparison-add-label>
 *         <cq-comparison-add>
 *             <cq-comparison-lookup-frame>
 *                 <cq-lookup cq-keystroke-claim>
 *                     <cq-lookup-input cq-no-close>
 *                         <input type="text" cq-focus spellcheck="false" autocomplete="off" autocorrect="off"
 *                                            autocapitalize="none" placeholder="">
 *                         <cq-lookup-icon></cq-lookup-icon>
 *                     </cq-lookup-input>
 *                     <cq-lookup-results>
 *                         <cq-lookup-filters cq-no-close>
 *                             <cq-filter class="true">ALL</cq-filter>
 *                             <cq-filter>STOCKS</cq-filter>
 *                             <cq-filter>FX</cq-filter>
 *                             <cq-filter>INDEXES</cq-filter>
 *                             <cq-filter>FUNDS</cq-filter>
 *                             <cq-filter>FUTURES</cq-filter>
 *                         </cq-lookup-filters>
 *                         <cq-scroll></cq-scroll>
 *                     </cq-lookup-results>
 *                 </cq-lookup>
 *             </cq-comparison-lookup-frame>
 *             <cq-swatch cq-no-close></cq-swatch>
 *             <span><cq-accept-btn class="stx-btn">ADD</cq-accept-btn></span>
 *         </cq-comparison-add>
 *     </cq-menu>
 *     <cq-comparison-key>
 *         <template cq-comparison-item>
 *             <cq-comparison-item>
 *                 <cq-comparison-swatch></cq-comparison-swatch>
 *                 <cq-comparison-label>AAPL</cq-comparison-label>
 *                 <!-- cq-comparison-price displays the current price with color animation -->
 *                 <cq-comparison-price cq-animate></cq-comparison-price>
 *                 <!-- cq-comparison-tick-price displays the price for the active crosshair item -->
 *                 <!-- <cq-comparison-tick-price></cq-comparison-tick-price>    -->
 *                 <cq-comparison-loader></cq-comparison-loader>
 *                 <div class="stx-btn-ico ciq-close"></div>
 *             </cq-comparison-item>
 *         </template>
 *     </cq-comparison-key>
 * </cq-comparison>
 *
 * @since 7.3.0 Added the ability to set series color using `cq-swatch`.
 */
class Comparison extends CIQ.UI.ModalTag {
	constructor() {
		super();
		this.swatchColors = [];
		this.loading = [];
	}

	connectedCallback() {
		if (this.attached) return;
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
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Comparison);
	}

	disconnectedCallback() {
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Initializes all the children UI elements that make up `<cq-comparison>`.
	 * @alias configureUI
	 * @memberof WebComponents.cq-comparison#
	 */
	configureUI() {
		const node = this.node,
			addNew = node.find("cq-accept-btn");
		this.template = node.find("*[cq-comparison-item]");
		const swatchColors = node.find("cq-swatch").attr("cq-colors");
		if (swatchColors) this.swatchColors = swatchColors.split(",");
		this.swatchColors = CIQ.convertToNativeColor(this.swatchColors);
		const lookup = node.find("cq-lookup");
		if (lookup.length)
			lookup[0].setCallback(
				(function (self) {
					return function () {
						self.selectItem.apply(self, arguments);
					};
				})(this)
			);
		CIQ.UI.stxtap(addNew[0], function (e) {
			lookup[0].forceInput();
			e.stopPropagation();
		});

		// Add the keystroke claim
		this.addClaim(this);

		const keystrokeHub = this.ownerDocument.body.keystrokeHub;
		if (!keystrokeHub) return;

		let menu = this.querySelector("cq-menu.cq-comparison-new");
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

		// Add a stxtap handler to the component strictly for keyboard navigation
		CIQ.UI.stxtap(this, function (e) {
			if (this.keyboardNavigation) {
				// Open the menu automatically
				if (menu) menu.open();
				// Treat the legend like a modal so keyboard navigation is returned after using colorPicker
				keystrokeHub.addActiveModal(this);
			}
			e.stopPropagation();
		});
	}

	/**
	 * left and Right arrows will move between symbol lookup, color piker and "Add" button.
	 * The attribute cq-focused will be added to the currently focused tag. This can then be
	 * queried later, such as when a user hits enter.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {object} e The event object
	 * @return {boolean}
	 */
	keyStroke(hub, key, e) {
		if (!this.keyboardNavigation) return;
		const items = this.querySelectorAll(
			"cq-lookup, cq-swatch, cq-accept-btn, [keyboard-selectable='true']"
		);
		if (!items.length) return;
		const focused = this.findFocused(items);
		switch (key) {
			case "Enter":
				if (!focused[0]) return;
				this.clickItem(focused[0], e, this);
				break;
			case "Tab":
				if (focused[0] && focused[0].tagName == "CQ-LOOKUP") {
					this.keyboardNavigation.disableKeyControlElement(focused[0], true);
					hub.tabActiveElement.element.blur();
					focused[0].overrideIsActive = true;
				}
				let newFocused = this.focusNextItem(items, false, true);
				if (newFocused.tagName == "CQ-LOOKUP") {
					newFocused.keyboardNavigation = this.keyboardNavigation;
					if (newFocused.onKeyboardSelection) newFocused.onKeyboardSelection();
					newFocused.overrideIsActive = false;
				}
				break;
			case "Esc":
			case "Escape":
				this.removeFocused(items);
				let menu = this.querySelector("cq-menu.cq-comparison-new");
				if (menu) menu.hide();
				break;
			default:
				e.preventDefault();
				break;
		}
	}

	/**
	 * Triggers the comparison lookup component and passes keyboard control into the internal
	 * [cq-lookup]{@link WebComponents.cq-lookup} element.
	 *
	 * Called when keyboard navigation activates this element by pressing Return/Enter.
	 *
	 * @alias onKeyboardSelection
	 * @memberof WebComponents.cq-comparison#
	 * @since 8.3.0
	 */
	onKeyboardSelection() {
		// Pass control to the lookup component
		let lookup = this.querySelector("cq-lookup");
		lookup.setAttribute("cq-focused", "true");
		lookup.overrideIsActive = false;
		lookup.keyboardNavigation = this.keyboardNavigation;
		if (lookup.onKeyboardSelection) lookup.onKeyboardSelection();
	}

	/**
	 * Picks a color to display the new comparison as.
	 * Loops through preset colors and picks the next one on the list.
	 * If all colors are taken, then the last color will be repeated.
	 * @alias pickSwatchColor
	 * @memberof WebComponents.cq-comparison#
	 */
	pickSwatchColor() {
		CIQ.UI.pickSwatchColor(this, this.querySelector("cq-swatch"));
	}

	position() {
		var stx = this.context.stx;
		var bar = stx.barFromPixel(stx.cx);
		this.tick = stx.tickFromPixel(stx.cx);
		var prices = stx.chart.xaxis[bar];
		var self = this;

		function printValues() {
			var key;
			self.timeout = null;
			for (var s in stx.chart.series) {
				if (!key) key = self.node.find("cq-comparison-key");
				var price = key.find(
					'cq-comparison-item[cq-symbol="' + s + '"] cq-comparison-tick-price'
				);
				if (price.text() !== "") price.text("");
				if (price.length && prices && prices.data) {
					var symbol = stx.chart.series[s].parameters.symbol;
					var paddedPrice = stx.padOutPrice(prices.data[symbol]);
					if (price.text() !== paddedPrice) price.text(paddedPrice);
					var pdSymbol = prices.data[symbol];
					if (pdSymbol !== null) {
						if (typeof pdSymbol === "object") pdSymbol = pdSymbol.Close;
						paddedPrice = stx.padOutPrice(pdSymbol);
						if (price.text() !== paddedPrice) price.text(paddedPrice);
					}
				}
			}
		}
		if (this.tick != this.prevTick) {
			if (this.timeout) clearTimeout(this.timeout);
			var ms = 0; // IE and FF struggle to keep up with the dynamic heads up.
			this.timeout = setTimeout(printValues, ms);
		}
		this.prevTick = this.tick; // We don't want to update the dom every pixel, just when we cross into a new candle
	}

	/**
	 * Handles removing a series from the comparison.
	 * @param {string} symbol Name of series as a string.
	 * @param {object}  series Object containing info on series.
	 * @alias removeSeries
	 * @memberof WebComponents.cq-comparison#
	 */
	removeSeries(symbol, series) {
		this.context.stx.removeSeries(symbol);
	}

	/**
	 * The legend gets re-rendered whenever we createDataSet() (wherein the series may have changed).
	 * We re-render the entire thing each time, but we use a virtual DOM to determine whether
	 * to actually change anything on the screen (so as to avoid unnecessary flickering)
	 * @alias renderLegend
	 * @memberof WebComponents.cq-comparison#
	 */
	renderLegend() {
		function tapFunction(self, s, series) {
			return function () {
				self.nomore = true;
				if (!series.parameters.permanent) self.removeSeries(s, series);
				self.modalEnd(); // tricky, we miss mouseout events when we remove items from under ourselves
			};
		}
		this.pickSwatchColor();
		var holder = this.closest(".stx-holder");
		var key = CIQ.cqvirtual(this.querySelector("cq-comparison-key"));
		if (!key) return;
		var keyAppend = function (i) {
			key.appendChild(i);
		};
		var stx = this.context.stx;
		stx.getDefaultColor();
		var panelOnly = key.hasAttribute("cq-panel-only");
		var comparisonOnly = !key.hasAttribute("cq-all-series");
		for (var r in stx.chart.seriesRenderers) {
			var renderer = stx.chart.seriesRenderers[r];
			if (renderer == stx.mainSeriesRenderer) continue;
			if (comparisonOnly && !renderer.params.isComparison) continue;
			if (panelOnly && (!holder || renderer.params.panel != holder.panel.name))
				continue;
			for (var s = 0; s < renderer.seriesParams.length; s++) {
				var rSeries = renderer.seriesParams[s];
				var frag = CIQ.UI.makeFromTemplate(this.template);
				var toggleEl = frag.find(".ciq-switch");
				var comparisonSwatch = frag.find("cq-comparison-swatch");
				var swatch = frag.find("cq-swatch");
				var label = frag.find("cq-comparison-label");
				var description = frag.find("cq-comparison-description");
				var loader = frag.find("cq-comparison-loader");
				var btn = frag.find(".ciq-close");
				var series = stx.chart.series[rSeries.id];
				var seriesParameters = series.parameters;
				var color = seriesParameters.color || renderer.colors[series.id].color;
				var isAuto = color == "auto";
				if (isAuto) color = stx.defaultColor;
				comparisonSwatch.css({ background: color });
				if (swatch.length) {
					swatch[0].seriesId = rSeries.id;
					swatch[0].setColor(color, false, isAuto);
				}
				if (seriesParameters.opacity) {
					comparisonSwatch.css({ opacity: seriesParameters.opacity });
					swatch.css({ opacity: seriesParameters.opacity });
				}
				label.text(stx.translateIf(series.display));
				description.text(stx.translateIf(series.description));
				frag.attr("cq-symbol", series.id);

				var symbol = seriesParameters.symbol;
				var q = stx.mostRecentClose(symbol);
				if (q || q === 0) {
					var price = frag.find("cq-comparison-price");
					if (price.length) {
						price.text(stx.padOutPrice(q));
					}
				}

				if (this.loading[seriesParameters.symbolObject.symbol])
					loader.addClass("stx-show");
				else loader.removeClass("stx-show");

				if (seriesParameters.error) frag.attr("cq-error", true);
				if (!seriesParameters.color || seriesParameters.permanent) btn.hide();
				else {
					CIQ.UI.stxtap(btn[0], tapFunction(this, series.id, series));
				}
				Array.from(frag).forEach(keyAppend);

				toggleEl[0].parentElement.classList[
					seriesParameters.disabled ? "remove" : "add"
				]("ciq-active");
				CIQ.safeClickTouch(toggleEl[0], getToggleHandle(series, stx));
			}
		}

		function getToggleHandle(series, stx) {
			return function () {
				stx.modifySeries(series.id, {
					disabled: !series.parameters.disabled
				});
				stx.changeOccurred("layout");
			};
		}

		var legendParent = CIQ.climbUpDomTree(CIQ.cqrender(key), "cq-study-legend");
		legendParent.forEach(function (i) {
			if (i.displayLegendTitle) i.displayLegendTitle();
		});
	}

	/**
	 * Changes the color of a series; triggered if using [cq-swatch]{@link WebComponents.cq-swatch} to show the series color.
	 *
	 * @param {string} color New color.
	 * @param {object} swatch Swatch from which the color setting is made.
	 *
	 * @alias setColor
	 * @memberof WebComponents.cq-comparison#
	 * @since 7.3.0
	 */
	setColor(color, swatch) {
		if (swatch.seriesId)
			this.context.stx.modifySeries(swatch.seriesId, { color: color });
	}

	/**
	 * Adds an injection to the ChartEngine that tracks the price of Comparisons.
	 * @param {number} updatePrices
	 * @alias startPriceTracker
	 * @memberof WebComponents.cq-comparison#
	 */
	startPriceTracker(updatePrices) {
		var self = this;
		this.addInjection("append", "createDataSet", function () {
			if (updatePrices) self.updatePrices();
			if (this.chart.dataSet && this.chart.dataSet.length) {
				if (self.node.attr("cq-show") !== "true")
					self.node.attr("cq-show", "true");
			} else if (self.hasAttribute("cq-show")) self.removeAttribute("cq-show");
		});
	}

	startTickPriceTracker() {
		this.prevTick = null;
		this.addInjection(
			"prepend",
			"headsUpHR",
			(function (self) {
				return function () {
					self.position();
				};
			})(this)
		);
	}

	/**
	 * Fires whenever a new security is added as a comparison. Handles all the necessary events
	 * to update the chart with the new comparison.
	 *
	 * @param {object} obj Contains information about the security.
	 * @param {string} obj.symbol The symbol that identifies the security.
	 *
	 * @alias selectItem
	 * @memberof WebComponents.cq-comparison#
	 * @since 8.2.0 Removed the `context` parameter. The context is now accessed from the base
	 * 		component class.
	 */
	selectItem(obj) {
		var context = this.context;
		var self = this;
		function cb(err, series) {
			if (err) {
				series.parameters.error = true;
			}
			self.loading[series.parameters.symbolObject.symbol] = false;
			self.renderLegend();
		}
		var swatch = this.node.find("cq-swatch");
		var color = "auto",
			pattern = null,
			width = 1;
		if (swatch[0]) {
			var style = swatch[0].style;
			color = style.backgroundColor;
			pattern = style.borderTopStyle;
			width = style.width || 1;
		}
		var stx = context.stx;
		this.loading[obj.symbol] = true;
		var params = {
			name: "comparison " + obj.symbol,
			symbolObject: obj,
			isComparison: true,
			color: color,
			pattern: pattern,
			width: width || 1,
			data: { useDefaultQuoteFeed: true },
			forceData: true
		};

		// don't allow symbol if same as main chart, comparison already exists, or just white space
		var exists = stx.getSeries({ symbolObject: obj });
		for (var i = 0; i < exists.length; i++)
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

	setContext(context) {
		this.node.attr("cq-show", "true");
		// if attribute cq-marker then detach and put ourselves in the chart holder
		this.configureUI();
		var self = this,
			stx = this.context.stx,
			chart = stx.chart;
		function renderIfChanged(obj) {
			self.renderLegend();
		}
		["layout", "symbolImport", "symbolChange", "theme"].forEach(function (ev) {
			stx.addEventListener(ev, renderIfChanged);
		});
		this.addInjection("append", "modifySeries", function () {
			self.renderLegend();
		});
		this.renderLegend();
		if (!this.template.length) return;
		var frag = CIQ.UI.makeFromTemplate(this.template);
		this.startPriceTracker(frag.find("cq-comparison-price").length);
		if (frag.find("cq-comparison-tick-price")) {
			this.startTickPriceTracker();
		}
	}

	/**
	 * Loops thru `stxx.chart.series` to update the current price of all comparisons.
	 * @alias updatePrices
	 * @memberof WebComponents.cq-comparison#
	 */
	updatePrices() {
		var key; // lazy eval this to prevent work when no comparisons exist
		var stx = this.context.stx;
		var historical = stx.isHistoricalModeSet;
		var isDaily = CIQ.ChartEngine.isDailyInterval(stx.layout.interval);
		for (var s in stx.chart.series) {
			if (!key) key = this.node.find("cq-comparison-key");
			var price = key.find(
				'cq-comparison-item[cq-symbol="' + s + '"] cq-comparison-price'
			);
			if (price.length) {
				var symbol = stx.chart.series[s].parameters.symbol;
				var q = stx.chart.series[s].lastQuote;
				if (!q || !q.DT || (!q.Close && q.Close !== 0)) continue;
				if (
					!isDaily &&
					stx.chart.market &&
					stx.chart.market.getSession(q.DT) === null
				)
					continue; // don't update when no session
				var newPrice = q.Close;
				var field = stx.chart.series[s].parameters.subField || "Close";
				var oldPrice = parseFloat(price.text());
				if (newPrice && (newPrice[field] || newPrice[field] === 0))
					newPrice = newPrice[field];
				if (!newPrice && newPrice !== 0 && stx.chart.series[s].lastQuote)
					newPrice = stx.chart.series[s].lastQuote[field];
				var priceText = stx.padOutPrice(historical ? "" : newPrice);
				if (price.text() !== priceText) price.text(priceText);
				if (historical) return;
				if (typeof price.attr("cq-animate") != "undefined")
					CIQ.UI.animatePrice(price, newPrice, oldPrice);
			}
		}
	}
}

CIQ.UI.addComponentDefinition("cq-comparison", Comparison);
