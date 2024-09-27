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
import "../../js/webcomponents/dropdown.js";


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
