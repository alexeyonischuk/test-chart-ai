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
import "../../js/standard/symbolLookupBase.js";
import "../../js/webcomponents/scroll.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */



var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

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
	 * Symbol lookup component `<cq-lookup>`.
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
	 *   [setDriver]{@link WebComponents.cq-lookup#setDriver}
	 * - Add the driver to the UI context with {@link CIQ.UI.Context#setLookupDriver}
	 *
	 * **Note:** If the lookup component is unable to access a lookup driver, the component's
	 * input field is active, but the component does not produce results.
	 *
	 * **Keyboard control**
	 *
	 * When selected with tab key navigation and activated with Return/Enter, this component has
	 * the following internal controls:
	 * - Up/Down arrow &mdash; Move selection between search input, filters, and search results
	 * - Left/Right arrow &mdash; Switch between search result filters
	 *
	 * **Attributes**
	 * | Name | Description | Valid Values |
	 * | ---- | ----------- | ------------ |
	 * | <code style="white-space: nowrap">cq-keystroke-claim</code> | Enables processing of keyboard input. | <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#boolean_attributes" target="_blank">Boolean attribute</a> |
	 * | <code style="white-space: nowrap">cq-keystroke-default</code> | Enables the component to respond to keystrokes when the lookup input field does not have focus. <p style="margin-bottom: 0">**Warning:** This feature may conflict with keyboard shortcuts set in other components. | <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#boolean_attributes" target="_blank">Boolean attribute</a> |
	 * | <code style="white-space: nowrap">cq-uppercase</code> | Forces text to uppercase. | <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#boolean_attributes" target="_blank">Boolean attribute</a> |
	 * | <code style="white-space: nowrap">cq-exchanges</code> | Specifies a list of financial exchanges searched by the lookup driver. Overrides the `exchanges` parameter of {@link CIQ.ChartEngine.Driver.Lookup}. | Comma-delimited list of exchange names; for example, "futures,govt,muni,corp"|
	 *
	 * **Customization**
	 *
	 * - To hide the lookup results window, modify the CSS as follows:
	 * ```css
	 * .stxMenuActive cq-lookup-results { opacity: 0 }
	 * ```
	 *
	 * - To preload default results (rather than an empty result pane) on initial load , set an
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
	 * @namespace WebComponents.cq-lookup
	 * @since
	 * - 4.0.0 Added optional `cq-uppercase` attribute.
	 * - 7.4.0 Added optional `cq-exchanges` attribute.
	 * - 8.3.0 Enabled internal keyboard navigation and selection.
	 *
	 * @example
	 * <cq-lookup cq-keystroke-claim cq-uppercase cq-keystroke-default>
	 *     <cq-lookup-input cq-no-close>
	 *         <input type="text" spellcheck="false" autocomplete="off"
	 *                autocorrect="off" autocapitalize="none" name="symbol"
	 *                placeholder="">
	 *         <cq-lookup-icon></cq-lookup-icon>
	 *     </cq-lookup-input>
	 *     <cq-lookup-results>
	 *         <cq-lookup-filters cq-no-close>
	 *             <cq-filter class="true">ALL</cq-filter>
	 *             <cq-filter>STOCKS</cq-filter>
	 *             <cq-filter>FX</cq-filter>
	 *             <cq-filter>INDEXES</cq-filter>
	 *             <cq-filter>FUNDS</cq-filter>
	 *             <cq-filter>FUTURES</cq-filter>
	 *         </cq-lookup-filters>
	 *         <cq-scroll></cq-scroll>
	 *     </cq-lookup-results>
	 * </cq-lookup>
	 */
	class Lookup extends CIQ.UI.ContextTag {
		constructor() {
			super();
			this.usingEmptyDriver = false;
			this.currentFilter = null;
			// Will hold references to filter tabs for keyboard navigation
			this.filterElements = null;
			this.params = {};
			this.overrideIsActive = false;
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, Lookup);
			this.constructor = Lookup;
		}

		disconnectedCallback() {
			this.removeClaim(this);
			super.disconnectedCallback();
		}

		/**
		 * With the decoupling of the uiHelper to the Lookup.Driver you must be sure to include both an argument for maxResults and the closure to handle the results.
		 * maxResults must either be a number or a string to result in default value of 100.
		 * @alias acceptText
		 * @memberof WebComponents.cq-lookup#
		 * @since 3.0.0
		 */
		acceptText(value, filter) {
			var self = this;
			if (!this.params.driver) {
				if (this.context.lookupDriver) {
					this.setDriver(this.context.lookupDriver);
				} else {
					this.setDriver(new CIQ.ChartEngine.Driver.Lookup());
					this.usingEmptyDriver = true;
				}
			}
			var restoredExchanges = this.params.driver.exchanges;
			function closure(results) {
				self.params.driver.exchanges = restoredExchanges;
				self.results(results);
			}
			var exchanges = this.getAttribute("cq-exchanges");
			if (exchanges) this.params.driver.exchanges = exchanges.split(",");
			this.params.driver.acceptText(value, filter, null, closure);
		}

		attachDriver(driver) {
			this.driver = driver;
		}

		close() {
			if (this.keyboardNavigation) {
				// Position the highlight over the input to wait for the collapse animation to complete
				this.highlightItem(this.input[0]);
				// Reposition the highlight after css animation is complete.
				setTimeout(this.highlightItem.bind(this, this.input[0]), 250);

				// Remove any focused property from the filter tabs
				this.removeFocused(this.filterElements);
				// Remove keyboard control from scroll
				this.resultList[0].keyboardNavigation = null;
			} else {
				// Reset the hilight. In the event that tab navigation is activated while the lookup is open
				const keystrokeHub = this.ownerDocument.body.keystrokeHub;
				if (keystrokeHub) setTimeout(() => keystrokeHub.highlightAlign(), 250);
			}
			this.closest("cq-dialog,cq-menu").close();
		}

		forceInput() {
			var input = this.input[0];
			this.selectItem({ symbol: input.value });
			CIQ.blur(input);
			this.close();
			input.value = "";
		}

		initialize() {
			this.addDefaultMarkup();
			var node = this.node;

			this.label = this.querySelector("label");
			this.labelName = this.getAttribute("label-name");
			this.labelText = this.getAttribute("label-text");

			if (this.label && this.labelText && this.labelName) {
				const { config: { chartId = "" } = {} } = this.context;
				this.label.id = chartId
					? `${this.labelName}-${chartId}`
					: this.labelName;
				this.label.innerText = this.labelText;
				if (chartId) this.setAttribute("aria-labelledby", this.label.id);
			}

			this.resultList = node.find("cq-scroll");

			this.input = node.find("input");
			if (!this.input.length) {
				var hiddenInput = document.createElement("input");
				hiddenInput.setAttribute("type", "hidden");
				hiddenInput.value = "";
				this.input = node.append(hiddenInput);
			}
			CIQ.UI.stxtap(this.input[0], function () {
				this.focus();
			});
			var self = this;
			Array.from(this.input).forEach(function (input) {
				input.addEventListener("paste", function (e) {
					var input = e.target;
					setTimeout(function () {
						self.acceptText(input.value, self.currentFilter);
					}, 0);
				});
			});
			var filters = this.querySelector("cq-lookup-filters");
			if (filters) {
				var allFilters = filters.querySelectorAll("cq-filter");
				allFilters.forEach(function (filter) {
					CIQ.UI.stxtap(filter, function () {
						allFilters.forEach(function (f) {
							f.classList.remove("true");
						});
						this.classList.add("true");
						var translate = this.querySelector("cq-translate");
						if (translate) {
							// if the filter text has been translated then it will be in a <cq-translate> tag
							self.currentFilter = translate.getAttribute("original");
						} else {
							self.currentFilter = this.innerHTML;
						}
						self.acceptText(self.input.val(), self.currentFilter);
					});
				});
			}

			if (typeof node.attr("cq-keystroke-claim") != "undefined") {
				// add keyboard claim for entire body
				this.addClaim(this);
			}
		}

		isActive() {
			return this.input[0].value !== "";
		}

		// Note that this captures keystrokes on the body. If the input box is focused then we need to allow the input box itself
		// to handle the strokes but we still want to capture them in order to display the lookup results. We first check
		// activeElement to see if the input is focused. If so then we bypass logic that manipulates the input.value. In order make
		// sure that the lookup menu is responding to an up-to-date input.value therefore we have to put all of those pieces of code
		// in setTimeout(0)
		//
		// Note that when comparisons are enabled, there are two Lookup components on the screen. Each keypress will therefore pass
		// through this function twice, once for each Lookup component. Only the active component will process the keystroke.
		keyStroke(hub, key, e, keystroke) {
			if (keystroke.ctrl || keystroke.cmd) return false;
			if (key == "Meta" || key == "Win") return false;

			var input = this.input[0];
			var result = false;
			var activeElement = this.ownerDocument.activeElement;
			var focused = activeElement === input; // If focused then we need to allow the input box to get most keystrokes
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

			var iAmActive = false,
				iAmDisplayed = false;
			if (CIQ.climbUpDomTree(this, ".stxMenuActive").length) {
				iAmDisplayed = true; // if my menu chain is active then I'm alive
			}
			if (focused || iAmDisplayed) iAmActive = true; // If my input is focused or I'm displayed, then I'm alive
			if (!iAmActive) {
				// Otherwise, I may still be alive under certain conditions
				if (typeof this.node.attr("cq-keystroke-default") == "undefined")
					return; // I'm always alive if I have default body keystrokes
				if (!iAmDisplayed && this.uiManager.topMenu()) return; // unless there's another menu active and it isn't me
			}
			if ((key === " " || key === "Spacebar") && input.value === "") {
				return false;
			}
			var self = this;
			var focusedElements = this.findFocused(this.filterElements);

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
								self.acceptText(input.value, self.currentFilter);
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
					var scrollable = this.resultList;
					focused = scrollable.length && scrollable[0].focused(); // Using cursor keys to maneuver down lookup results
					if ((input.value === "" && !focused) || this.overrideIsActive) break;
					if (focused && focused.selectFC) {
						focused.selectFC.apply(focused, {});
					} else {
						var val = input.value;
						var toUpperCase =
							["false", "0", null].indexOf(this.getAttribute("cq-uppercase")) ==
							-1;
						if (toUpperCase) val = val.toUpperCase();
						this.selectItem({ symbol: val });
					}

					CIQ.blur(input);
					this.close();
					input.value = "";
					result = true;
					break;
				case "ArrowRight":
				case "Right":
					if (focusedElements.length) {
						// Remove control from the result list
						if (this.resultList[0].keyboardNavigation)
							this.resultList[0].keyboardNavigation = null;
						// Ignore right if a tab is not focused to allow cursor movement in input
						this.focusNextItem(this.filterElements);
						this.clickFocusedItem(this.filterElements, e);
					}
					break;
				case "ArrowLeft":
				case "Left":
					// Remove control from the result list
					if (this.resultList[0].keyboardNavigation)
						this.resultList[0].keyboardNavigation = null;
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
							let filterElement = this.filterElements[filterIdx];
							if (filterElement.classList.contains("true")) {
								this.focusItem(filterElement);
								break;
							}
						}
					} else if (!this.resultList[0].keyboardNavigation) {
						// Only pass control to the result list if there are results
						var resultItem = this.resultList[0].querySelector("cq-item");
						if (resultItem)
							this.resultList[0].keyboardNavigation = this.keyboardNavigation;
					}
					CIQ.blur(input);
					break;
				case "ArrowUp":
				case "Up":
					// Up/Down arrows are only used in this component when keyboard navigation is enabled
					if (!this.keyboardNavigation) break;
					// resultList has its own up/down control.
					if (this.resultList[0].keyboardNavigation) {
						// If the scroll has control, check for the top item selected and move highlight back to the tabs
						var firstResult = this.resultList[0].querySelector(
							"cq-item:first-of-type"
						);
						if (firstResult && firstResult.hasAttribute("cq-focused")) {
							firstResult.removeAttribute("cq-focused");
							this.resultList[0].keyboardNavigation = null;
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
						self.acceptText(input.value, self.currentFilter);
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

		open() {
			// Reposition the highlight after css animation is complete.
			setTimeout(this.highlightItem.bind(this, this.input[0]), 250);
			this.closest("cq-dialog,cq-menu").open();
		}

		onKeyboardDeselection() {
			CIQ.blur(this.input[0]);
			this.close();
			// If we're using keyboard navigation, return the highlight to the tab selected element
			if (this.keyboardNavigation) this.keyboardNavigation.highlightPosition();
			this.resultList[0].keyboardNavigationWait = false;
		}

		onKeyboardSelection() {
			// If we're using keyboard navigation, return the highlight to the tab selected element
			this.highlightItem(this.input[0]);
			CIQ.focus(this.input[0]);
			this.resultList[0].keyboardNavigationWait = true;
			this.open();
		}

		/**
		 *
		 * @param {*} arr
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
		 * @alias results
		 * @memberof WebComponents.cq-lookup#
		 */
		results(arr) {
			function closure(self, data) {
				return function (e) {
					CIQ.blur(self.input[0]);
					//self.close();
					self.selectItem(data);
					self.input[0].value = "";
				};
			}

			this.resultList = CIQ.UI.$(this.resultList);
			this.resultList.empty();
			for (var i = 0; i < arr.length; i++) {
				var item = arr[i];
				var nodeText = "";
				for (var j = 0; j < item.display.length; j++) {
					nodeText += "<SPAN>" + item.display[j] + "</SPAN>";
				}

				var node = document.createElement("cq-item");
				node.innerHTML = nodeText;
				node.setAttribute("role", "menuitem");
				this.resultList.append(node);
				node.selectFC = closure(this, item.data);
				CIQ.UI.stxtap(node, node.selectFC);
			}
			var scrollable = this.resultList;
			if (scrollable[0]) scrollable[0].top();

			// Reset the hilight position
			this.highlightFocusedItem(this.filterElements);
		}

		/**
		 * Accepts a new symbol or symbol object.
		 *
		 * @param {object} data Contains a symbol or symbol object in a form accepted by
		 * 		{@link CIQ.ChartEngine#loadChart}.
		 * @param {function} fn Function to execute when the callback set by
		 * 		[setCallback]{@link WebComponents.cq-lookup#setCallback} finishes.
		 *
		 * @alias selectItem
		 * @memberof WebComponents.cq-lookup#
		 * @since 8.2.0 Removed the `params` parameter. Added the `fn` parameter.
		 */
		selectItem(data, fn) {
			if (this.params.cb) {
				this.params.cb(data, fn);
			}
		}

		/**
		 * Sets a callback function to be called when the user selects a symbol.
		 *
		 * @param {function} cb The callback function; for example, an implementation of
		 * 		{@link CIQ.UI.Context#changeSymbol}.
		 *
		 * @alias setCallback
		 * @memberof WebComponents.cq-lookup#
		 */
		setCallback(cb) {
			this.params.cb = cb;
		}

		setContext(context) {
			this.initialize();

			const symbolInput = this.querySelector("cq-lookup-input input");
			const { config, stx } = context;
			if (!config) return;
			const { channels = {} } = config;

			this.channelSubscribe(
				channels.breakpoint || "channel.breakpoint",
				(breakPoint) => {
					var placeholder = stx.crossSection
						? stx.crossSection.symbolInputType
						: "Symbol";
					if (breakPoint === "break-lg") {
						placeholder = "Enter " + placeholder;
					} else if (breakPoint === "break-sm") {
						placeholder = "";
					}
					symbolInput.setAttribute(
						"cq-translate-placeholder-original",
						placeholder
					);
					symbolInput.setAttribute("placeholder", stx.translateIf(placeholder));
				}
			);

			// Get a list of filter tabs for keyboard navigation
			this.filterElements = this.querySelectorAll(
				"cq-lookup-filters cq-filter"
			);

			if (!this.params.cb && context.changeSymbol)
				this.params.cb = context.changeSymbol;
		}

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
		 * @alias setDriver
		 * @memberof WebComponents.cq-lookup#
		 */
		setDriver(driver) {
			this.params.driver = driver;
		}
	}

	Lookup.markup = `
		<label></label>
		<cq-lookup-input cq-no-close>
			<input type="text"
				spellcheck="false"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="none"
				name="symbol"
				placeholder=""
				tabindex="-1"
			>
			<cq-lookup-icon></cq-lookup-icon>
		</cq-lookup-input>
		<cq-lookup-results>
			<cq-lookup-filters cq-no-close role="group" aria-label="Filters">
				<cq-filter class="true">ALL</cq-filter>
				<cq-filter>STOCKS</cq-filter>
				<cq-filter>FX</cq-filter>
				<cq-filter>INDEXES</cq-filter>
				<cq-filter>FUNDS</cq-filter>
				<cq-filter>FUTURES</cq-filter>
			</cq-lookup-filters>
			<cq-scroll role="menu" aria-label="Results"></cq-scroll>
		</cq-lookup-results>
	`;
	CIQ.UI.addComponentDefinition("cq-lookup", Lookup);
}
