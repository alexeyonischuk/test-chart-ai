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
import "../../../js/webcomponents_legacy/palette.js";
import "../../../js/webcomponents_legacy/menu.js";
import "../../../js/webcomponents/redo.js";
import "../../../js/webcomponents/scroll.js";
import "../../../js/webcomponents_legacy/toggle.js";
import "../../../js/webcomponents/undo.js";
import "../../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */









var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

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
	 * Drawing palette web component used to draw and annotate on the chart. Displays a palette
	 * along the left side of the chart for control and management of drawing tools.
	 *
	 * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
	 *
	 * This works in conjunction with the [cq-drawing-settings]{@link WebComponents.cq-drawing-settings} component
	 * and replaces the [cq-toolbar]{@link WebComponents.cq-toolbar} component, providing additional functionality
	 * and an improved user experience.
	 *
	 * Drawing tools support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool
	 * `cq-item` element. Combinations take the form Alt+key (upper- or lowercase); for example, Alt+a or
	 * Alt+A &mdash; in either case, the key combination works whether the key is shifted or not. Users can also
	 * add the modifier Ctrl to the keystroke combination. For example, both Alt+R and Ctrl+Alt+R activate the
	 * Rectangle tool. The added Ctrl modifier helps provide a unique keystroke combination in the event the Alt+key
	 * combination is assigned to a function in the web browser or to an application on the user's system.
	 *
	 * @namespace WebComponents.cq-drawing-palette
	 * @example
		<cq-drawing-palette class="palette-drawing grid" docked="true" orientation="vertical" min-height="300" cq-drawing-edit="none">
			<div class="mini-widget-group">
					<cq-item class="ciq-mini-widget" cq-view="list" stxtap="changeView('list')"><span class="icon"></span><label>List View</label></cq-item>
					<cq-item class="ciq-mini-widget" cq-view="grid" stxtap="changeView('grid')"><span class="icon"></span><label>Grid View</label></cq-item>
					<cq-item class="ciq-mini-widget" cq-view="list" stxtap="detach()"><span class="icon"></span><label>Detach</label></cq-item>
					<cq-separator></cq-separator>
			</div>
			<div class="primary-tool-group">
				<cq-item class="ciq-tool active" cq-tool="notool" stxtap="tool()"><span class="icon pointer"></span><label>No Tool</label></cq-item>
				<cq-item class="ciq-tool" cq-tool="measure" stxtap="tool()"><span class="icon measure"></span><label>Measure</label></cq-item>
				<cq-undo class="ciq-tool"><span class="icon undo"></span><label>Undo</label></cq-undo>
				<cq-redo class="ciq-tool"><span class="icon redo"></span><label>Redo</label></cq-redo>
				<cq-menu class="ciq-select">
					<span cq-tool-group-selection>All</span>
					<cq-menu-dropdown class="ciq-tool-group-selection">
						<cq-item stxtap="setToolGroup('all')">All</cq-item>
						<cq-item stxtap="setToolGroup('text')">Text</cq-item>
						<cq-item stxtap="setToolGroup('statistics')">Statistics</cq-item>
						<cq-item stxtap="setToolGroup('technicals')">Technicals</cq-item>
						<cq-item stxtap="setToolGroup('fibonacci')">Fibonacci</cq-item>
						<cq-item stxtap="setToolGroup('marking')">Markings</cq-item>
						<cq-item stxtap="setToolGroup('line')">Lines</cq-item>
					</cq-menu-dropdown>
				</cq-menu>
			</div>
			<cq-separator></cq-separator>
			<div class="tool-group" tool-group-filter="all">
				<cq-scroll cq-no-resize>
					<cq-item class="ciq-tool" cq-tool="annotation" cq-tool-shortcut="t" cq-tool-group="text" stxtap="tool()"><span class="icon annotation"></span><label>Annotation</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="callout" cq-tool-group="text" stxtap="tool()"><span class="icon callout"></span><label>Callout</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="average" cq-tool-group="statistics" stxtap="tool()"><span class="icon average"></span><label>Average Line</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="channel" cq-tool-group="line" stxtap="tool()"><span class="icon channel"></span><label>Channel</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="continuous" cq-tool-group="line" stxtap="tool()"><span class="icon continuous"></span><label>Continuous</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="crossline" cq-tool-group="line" stxtap="tool()"><span class="icon crossline"></span><label>Crossline</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="freeform" cq-tool-group="line" stxtap="tool()"><span class="icon freeform"></span><label>Doodle</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="ellipse" cq-tool-shortcut="e" cq-tool-group="marking" stxtap="tool()"><span class="icon ellipse"></span><label>Ellipse</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="retracement" cq-tool-group="fibonacci" stxtap="tool()"><span class="icon retracement"></span><label>Fib Retracement</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="fibprojection" cq-tool-group="fibonacci" stxtap="tool()"><span class="icon fibprojection"></span><label>Fib Projection</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="fibarc" cq-tool-group="fibonacci" stxtap="tool()"><span class="icon fibarc"></span><label>Fib Arc</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="fibfan" cq-tool-group="fibonacci" stxtap="tool()"><span class="icon fibfan"></span><label>Fib Fan</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="fibtimezone" cq-tool-group="fibonacci" stxtap="tool()"><span class="icon fibtimezone"></span><label>Fib Time Zone</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="gannfan" cq-tool-group="technicals" stxtap="tool()"><span class="icon gannfan"></span><label>Gann Fan</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="gartley" cq-tool-group="technicals" stxtap="tool()"><span class="icon gartley"></span><label>Gartley</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="horizontal" cq-tool-shortcut="h" cq-tool-group="line" stxtap="tool()"><span class="icon horizontal"></span><label>Horizontal</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="line" cq-tool-shortcut="l" cq-tool-group="line" stxtap="tool()"><span class="icon line"></span><label>Line</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="pitchfork" cq-tool-group="technicals" stxtap="tool()"><span class="icon pitchfork"></span><label>Pitchfork</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="quadrant" cq-tool-group="statistics" stxtap="tool()"><span class="icon quadrant"></span><label>Quadrant Lines</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="ray" cq-tool-group="line" stxtap="tool()"><span class="icon ray"></span><label>Ray</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="rectangle" cq-tool-shortcut="r" cq-tool-group="marking" stxtap="tool()"><span class="icon rectangle"></span><label>Rectangle</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="regression" cq-tool-group="statistics" stxtap="tool()"><span class="icon regression"></span><label>Regression Line</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="segment" cq-tool-group="line" stxtap="tool()"><span class="icon segment"></span><label>Segment</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="arrow" cq-tool-shortcut="a" cq-tool-group="marking" stxtap="tool()"><span class="icon arrow"></span><label>Arrow</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="check" cq-tool-group="marking" stxtap="tool()"><span class="icon check"></span><label>Check</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="xcross" cq-tool-group="marking" stxtap="tool()"><span class="icon xcross"></span><label>Cross</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="focusarrow" cq-tool-group="marking" stxtap="tool()"><span class="icon focusarrow"></span><label>Focus</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="heart" cq-tool-group="marking" stxtap="tool()"><span class="icon heart"></span><label>Heart</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="star" cq-tool-group="marking" stxtap="tool()"><span class="icon star"></span><label>Star</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="speedarc" cq-tool-group="technicals" stxtap="tool()"><span class="icon speedarc"></span><label>Speed Resistance Arc</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="speedline" cq-tool-group="technicals" stxtap="tool()"><span class="icon speedline"></span><label>Speed Resistance Line</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="timecycle" cq-tool-group="technicals" stxtap="tool()"><span class="icon timecycle"></span><label>Time Cycle</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="tirone" cq-tool-group="statistics" stxtap="tool()"><span class="icon tirone"></span><label>Tirone Levels</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="trendline" cq-tool-group="text" stxtap="tool()"><span class="icon trendline"></span><label>Trend Line</label></cq-item>
					<cq-item class="ciq-tool" cq-tool="vertical" cq-tool-shortcut="v" cq-tool-group="line" stxtap="tool()"><span class="icon vertical"></span><label>Vertical</label></cq-item>
				</cq-scroll>
				<cq-separator></cq-separator>
				<cq-item class="ciq-tool" stxtap="clearDrawings()"><span class="icon clear"></span><label>Clear All Drawings</label></cq-item>
				<cq-item class="ciq-tool" stxtap="restoreDefaultConfig(true)"><span class="icon restore"></span><label>Restore Default Parameters</label></cq-item>
			</div>
		</cq-drawing-palette>
	 * @since
	 * - 7.1.0
	 * - 7.2.0 The drawing settings section has been moved into its own component, [cq-drawing-settings]{@link WebComponents.cq-drawing-settings}.
	 * - 7.4.0 Drawing tools now support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool button.
	 */
	class DrawingPalette extends Palette.classDefinition {
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
			this.removeClaim(this);
			super.disconnectedCallback();
		}

		setupKeyboardActivation(context) {
			if (typeof this.getAttribute("cq-keystroke-claim") != "undefined") {
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
						let buttonLabel = toolsWithShortcuts[idx].querySelector("label");
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

		// Handle keystroke event to activate drawing tools
		keyStroke(hub, key, e, keystroke) {
			let toolName = "";
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

		// Retrieve list of tools from local storage.
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
		// Save tool settings to local storage
		storeToolSettings() {
			if (this.store)
				this.store.set(
					"CIQ.DrawingToolSettings",
					JSON.stringify(this.toolSettings)
				);
		}

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
						: event.target.parentElement;
					event.preventDefault();
					if (
						targetElem !== null &&
						targetElem.getAttribute("cq-tool-group") !== null
					) {
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
				this.setToolGroup(
					{
						node: this.querySelector(
							'cq-item[cq-tool-group="' + this.toolSettings.toolGroup + '"]'
						)
					},
					this.toolSettings.toolGroup
				);
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

		pairUndoRedo() {
			const redo = this.qs("cq-redo", this);
			const undo = this.qs("cq-undo", this);
			redo.pairUp(undo);
		}

		changeView(activator, modeName) {
			this.setMode(modeName);
			for (
				var i = 0;
				i < this.callbacks.length;
				i++ // let any callbacks know that the palette mode has changed
			)
				this.callbacks[i].call(this, this.mode);
		}

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

		registerCallback(fc) {
			this.callbacks.push(fc);
		}

		// Resets the tool scrollbar
		// Use if the container size or contents have changes
		resetScroller() {
			const scroller = this.querySelector(".tool-group cq-scroll");
			if (!scroller) {
				return false;
			}
			this.setEvenOdd();
			scroller.refresh();
		}

		setActiveTool(toolName) {
			const toolButton = this.querySelector(`cq-item[cq-tool=${toolName}]`);
			if (toolButton) this.tool({ node: toolButton });
		}

		setActiveButton(activeNode) {
			this.node.find(".ciq-tool.active").removeClass("active");
			if (activeNode) activeNode.classList.add("active");
			// Don't want to automatically show the palette when using the mobile menu
			if (
				!CIQ.trulyVisible(
					this.ownerDocument.querySelector(".ciq-mobile-palette-toggle")
				)
			)
				this.togglePalette();
		}

		setMode(mode) {
			// Default to grid mode unless list is specified
			mode = mode === "list" ? mode : "grid";
			this.mode = mode;
			this.classList.remove("list", "grid");
			this.classList.add(this.mode);

			this.sortToolButtons();

			this.resetScroller();
			this.paletteDock.handleResize({ resizeChart: true });
		}

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

		// Add the favorite badge to relevant tools
		// Add a favorite toggle star to each tool for use in list view and mobile layout
		setFavorites(propagateSettings = true) {
			var toolButtons = this.querySelectorAll(".tool-group [cq-tool]");
			for (
				var toolButtonIdx = 0;
				toolButtonIdx < toolButtons.length;
				toolButtonIdx++
			) {
				var toolButton = toolButtons[toolButtonIdx];
				if (toolButton.querySelector(".fav-marker") === null) {
					// All buttons get the div.fav-marker element to click on in list view.
					let favMarker = document.createElement("div");
					favMarker.className = "fav-marker";
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

		// Sort buttons in order defined by the config, grouping those marked favorite first.
		sortToolButtons() {
			const toolContainer = this.querySelector(".tool-group cq-scroll"),
				scrollbar = toolContainer.querySelector(".ps__rail-x, .ps__rail-y"),
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
						"<cq-separator></cq-separator>"
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

		handleFavoriteClick(event) {
			event.stopPropagation();
			event.preventDefault();
			this.toggleFavorite(event.target.parentElement.getAttribute("cq-tool"));
			// The mobile palette is toggled after the tool selection so hide it now so the toggle will show it again
			this.hidePalette();
		}

		// Add the tool to the list of favorites
		addFavorite(toolName) {
			if (this.toolSettings.favList.indexOf(toolName) < 0) {
				this.toolSettings.favList.push(toolName);
				this.storeToolSettings();
				this.setFavorites();
			}
		}

		showToolContextMenu(toolName, top, left) {
			this.toolContextMenu.style.display = "block";
			this.toolContextMenu.style.top = top + "px";
			this.toolContextMenu.style.left = left + "px";
			this.toolContextMenu.setAttribute("context-tool", toolName);
			this.paletteDock.startContext(this);
		}

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
				var i = 0;
				i < this.callbacks.length;
				i++ // let any callbacks know that the palette mode has changed
			)
				this.callbacks[i].call(this, this.mode);
			// The mobile palette will be hidden if resize is called in the callbacks. Show it again afterward
			this.showPalette();
			this.params.toolGroupSelection.html(activator.node.innerHTML);
			this.storeToolSettings();
		}

		/*
		 * Used in break-sm context to show/hide the palette for mobile layout
		 */
		togglePalette() {
			this.classList.toggle("palette-hide");
		}

		/*
		 * Used in break-sm context to hide the palette for mobile layout
		 */
		hidePalette() {
			this.classList.add("palette-hide");
		}

		/*
		 * Used in break-sm context to show the palette for mobile layout
		 */
		showPalette() {
			this.classList.remove("palette-hide");
		}

		activateTool(activator, toolName) {
			let buttonRef = null;
			if (!activator.node && toolName) {
				// Find the tool button by its cq-tool attribute.
				// Necessary for cases then the button is not clicked, such as the drawing context menu "Edit Settings"
				buttonRef = this.querySelector("[cq-tool=" + toolName + "]");
			} else {
				buttonRef = activator.node;
			}
			this.setActiveButton(buttonRef);

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
		}

		noTool(activator, toolName) {
			this.tool(activator, "notool");
		}

		tool(activator, toolName) {
			if (!toolName) toolName = activator.node.getAttribute("cq-tool");
			if (!toolName) return;
			var toolLabel = activator.node.querySelector("label").innerHTML;
			this.activateTool(activator, toolName);
			if (this.sendMessage) {
				this.sendMessage("changeTool", {
					activator: activator,
					toolName: toolName,
					toolLabel: toolLabel
				});
			}
		}

		clearDrawings() {
			if (this.sendMessage) {
				this.sendMessage("clearDrawings");
			}
		}

		restoreDefaultConfig(activator, all) {
			if (this.sendMessage) {
				this.sendMessage("restoreDefaultConfig", {
					activator: activator,
					all: all
				});
			}
		}

		getMarkup(config) {
			const tools = config.getMenu("drawingTools", true).join("");
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
					return `<cq-item
					stxtap="setToolGroup('${group.toLowerCase()}')"
					cq-tool-group="${group.toLowerCase()}">${group}
				</cq-item>`;
				})
				.join("");

			return this.constructor.markup
				.replace("{{tools}}", tools)
				.replace("{{toolGrouping}}", toolGrouping);
		}
	}

	DrawingPalette.markup = `
	<div class="palette-container">
		<div class="drag-strip"></div>
			<div class="mini-widget-group">
					<cq-item class="ciq-mini-widget" cq-view="list" stxtap="changeView('list')">
						<cq-help help-id="drawing_palette_list_view"></cq-help>
						<span class="icon"></span><label>List View</label>
					</cq-item>
					<cq-item class="ciq-mini-widget" cq-view="grid" stxtap="changeView('grid')">
						<cq-help help-id="drawing_palette_grid_view"></cq-help>
						<span class="icon"></span><label>Grid View</label>
					</cq-item>
					<cq-item class="ciq-mini-widget" cq-view="detach" stxtap="detach()">
						<cq-help help-id="drawing_palette_detach"></cq-help>
						<span class="icon"></span><label>Detach</label>
					</cq-item>
					<cq-item class="ciq-mini-widget" cq-view="attach" stxtap="dock()">
						<cq-help help-id="drawing_palette_attach"></cq-help>
						<span class="icon"></span><label>Attach</label>
					</cq-item>
			</div>
			<cq-separator></cq-separator>
			<div class="primary-tool-group">
				<cq-item class="ciq-tool active" cq-tool="notool" stxtap="tool()"><cq-help help-id="drawing_palette_notool"></cq-help><span class="icon pointer"></span><label>No Tool</label></cq-item>
				<cq-item class="ciq-tool" cq-tool="measure" stxtap="tool()"><cq-help help-id="drawing_palette_measure"></cq-help><span class="icon measure"></span><label>Measure</label></cq-item>
				<cq-undo class="ciq-tool"><cq-help help-id="drawing_palette_undo"></cq-help><span class="icon undo"></span><label>Undo</label></cq-undo>
				<cq-redo class="ciq-tool"><cq-help help-id="drawing_palette_redo"></cq-help><span class="icon redo"></span><label>Redo</label></cq-redo>
				<cq-menu class="ciq-select">
					<cq-help help-id="drawing_palette_tool_categories"></cq-help>
					<span cq-tool-group-selection>All</span>
					<cq-menu-dropdown class="ciq-tool-group-selection">
						{{toolGrouping}}
					</cq-menu-dropdown>
				</cq-menu>
			</div>
			<cq-separator></cq-separator>
			<div class="tool-group" tool-group-filter="all">
				<cq-scroll cq-no-resize>
					{{tools}}
				</cq-scroll>
				<cq-separator></cq-separator>
				<div class="mini-widget-group mini-widget-foot">
					<cq-toggle class="ciq-mini-widget ciq-magnet" cq-member="preferences.magnet" cq-toggles="true,75,false" cq-toggle-classes="active strong,active," cq-multichart-distribute="true">
						<cq-help help-id="drawing_palette_magnet"></cq-help>
						<span class="icon magnet"></span><label>Magnet</label>
					</cq-toggle>
					<cq-item class="ciq-mini-widget" stxtap="clearDrawings()">
						<cq-help help-id="drawing_palette_clear"></cq-help>
						<span class="icon clear"></span><label>Clear All Drawings</label>
					</cq-item>
					<cq-item class="ciq-mini-widget" stxtap="restoreDefaultConfig(true)">
						<cq-help help-id="drawing_palette_restore"></cq-help>
						<span class="icon restore"></span><label>Restore Default Parameters</label>
					</cq-item>
				</div>
			</div>
		<div class="resize-strip"></div>
	</div>
	`;
	CIQ.UI.addComponentDefinition("cq-drawing-palette", DrawingPalette);
}
