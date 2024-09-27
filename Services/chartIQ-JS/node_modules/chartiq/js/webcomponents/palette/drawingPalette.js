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


import { CIQ as _CIQ } from "../../../js/componentUI.js";
import "../../../js/standard/drawing.js";
import "../../../js/webcomponents/palette.js";
import "../../../js/webcomponents/menu.js";
import "../../../js/webcomponents/redo.js";
import "../../../js/webcomponents/scroll.js";
import "../../../js/webcomponents/toggle.js";
import "../../../js/webcomponents/undo.js";


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
