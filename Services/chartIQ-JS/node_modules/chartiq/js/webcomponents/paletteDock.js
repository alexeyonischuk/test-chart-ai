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
 * <h4>&lt;cq-palette-dock&gt;</h4>
 *
 * This is a container for `<cq-palette>` components. Provides docking and dragging capabilities to child
 * palettes.
 *
 * The `<cq-palette-dock>` element does not wrap the chart. It must be a sibling of the chart
 * container.
 *
 * @example
 * <cq-palette-dock>
 *    <div class="palette-dock-container">
 *        ...
 *    </div>
 * </cq-palette-dock>
 *
 * @alias WebComponents.PaletteDock
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.2.0
 */
class PaletteDock extends CIQ.UI.ContextTag {
	constructor() {
		super();
		//let shadowRoot = this.attachShadow({mode: 'open'});
		//shadowRoot.innerHTML = this.render();

		this.dragging = false; /* pointer to the palette currently dragging */
		this.paletteRegistry = [];
		// Use to store and cancel the mouseout check
		this.mouseOutCk = false;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, PaletteDock);
	}

	/**
	 * Set up event listeners for dragging and resizing.
	 * @private
	 * @tsmember WebComponents.PaletteDock
	 */
	initListeners() {
		const { stx, config = {} } = this.context;
		const self = this;

		this.setVerticalPaletteHeight();

		// palette mouse events are handled here, on the parent, to prevent losing the event if the pointer moves off the palette
		this.addEventListener("touchend", (e) => this.stopDrag(e));
		this.addEventListener("touchmove", handleTouchMove, { passive: false });

		this.addEventListener("mouseup", (e) => this.stopDrag(e));
		this.addEventListener("mouseleave", handleMouseLeave);
		this.addEventListener("mouseenter", handleMouseEnter);
		this.addEventListener("mousemove", handleMouseMove);

		// Close a palette context menu when clicking anywhere over the chart
		this.addEventListener("mousedown", this.stopContext.bind(this));

		// respond to resizes, prevent loops
		this.addInjection("append", "resizeChart", () =>
			this.handleResize({ resizeChart: false })
		);

		const channel = (config.channels || {}).drawing || "channel.drawing";
		this.channelSubscribe(channel, handleEnableDrawing);

		function handleMouseLeave(event) {
			stx.showCrosshairs();
			// An extra guard against spastic mousing.
			// Mouseout of the draggable area does not immediately cancel in case
			// the user unintentionally leaves the area for a brief moment
			self.mouseOutCk = setTimeout(() => self.stopDrag(), 500);
		}

		function handleMouseEnter(event) {
			stx.undisplayCrosshairs();
			if (!self.dragging) return;

			// Checking for a re-entry while the mouse button is still down
			if (event.buttons === 1) {
				clearTimeout(self.mouseOutCk);
				return;
			}
			// If all else fails, cancel the drag
			self.stopDrag();
		}

		function handleMouseMove(event) {
			if (self.dragging) {
				event.stopPropagation();
				if (self.dragging.classList.contains("dragging")) {
					self.dragging.setTransformPosition(event.clientX, event.clientY);
				}
				if (self.dragging.classList.contains("resizing")) {
					self.dragging.setHeightToPosition(event.clientY);
				}
			}
		}

		function handleTouchMove(event) {
			if (self.dragging && event.touches[0]) {
				event.stopPropagation();
				if (self.dragging.classList.contains("dragging")) {
					self.dragging.setTransformPosition(
						event.touches[0].clientX,
						event.touches[0].clientY
					);
				}
				if (self.dragging.classList.contains("resizing")) {
					self.dragging.setHeightToPosition(event.touches[0].clientY);
				}
			}
		}

		function handleEnableDrawing(value) {
			self.setChartDimensions();
			// if (value) this.dockAllPalettes();
			stx.resizeChart();
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	setContext(context) {
		this.initListeners();
	}

	/**
	 * Put a message on the palette registry to execute on.
	 *
	 * @param {string} id
	 * @param {string} message
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	palettePublish(id, message) {
		this.paletteRegistry.forEach((cb) => cb(id, message));
	}

	/**
	 * Register a palette callback.
	 *
	 * @param {function} paletteCallback Function to register
	 * @return {function} Bound palettePublish function
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	paletteSubscribe(paletteCallback) {
		this.paletteRegistry.push(paletteCallback);
		return this.palettePublish.bind(this);
	}

	/**
	 * Get bounds of the palette container
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	getBounds() {
		return this.parentNode.getBoundingClientRect();
	}

	/**
	 * Get bounds of the chart within the chart container
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	getChartBounds() {
		let clientBounds = this.parentNode.getBoundingClientRect();
		let bounds = {
			top: 0,
			left: 0,
			height: clientBounds.height,
			width: clientBounds.width
		};

		const palettes = this.querySelectorAll('[docked="true"]');
		[...palettes].forEach((palette) => {
			if (palette.orientation === "vertical") {
				bounds.width -= palette.getWidth();
				bounds.left += palette.getWidth();
			} else if (palette.orientation === "horizontal") {
				bounds.height -= palette.getHeight();
				bounds.top += palette.getHeight();
			}
		});
		return bounds;
	}

	/**
	 * Get bounds of the chart within the chart container, but offset from top and left
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	getChartBoundsOffset() {
		let clientBounds = this.parentNode.getBoundingClientRect();
		let bounds = this.getChartBounds();

		bounds.top += clientBounds.top;
		bounds.left += clientBounds.left;

		return bounds;
	}

	/**
	 * Handle the drawing palette contextual menu open state to allow clicking anywhere over the chart to close
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	startContext() {
		this.classList.add("context");
	}

	/**
	 * Stop handling started by startContext()
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	stopContext() {
		this.classList.remove("context");
		this.palettePublish("context", "stop");
	}

	/**
	 * Indicate a palette is presently in dragging mode
	 * Extends overlay via css in dragging mode to capture mouse position
	 *
	 * @param {HTMLElement} palette Palette to start dragging
	 * @param {string} paletteMode "dragging"
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	startDrag(palette, paletteMode) {
		const palettes = this.querySelectorAll('[docked="false"]');
		[...palettes].forEach(
			(palette) => (palette.style.zIndex = 1) // Drop down any palettes which were previously bumped to the top of the z-index
		);

		// Default to dragging unless resizing is specified
		paletteMode = paletteMode || "dragging";
		this.dragging = palette;
		// The palette dock is always dragging regardless of the palette's mode
		this.classList.add("dragging");
		this.dragging.classList.add(paletteMode);
		this.dragging.style.zIndex = 10; // Bump the active palette to the top of the z-index
	}

	/**
	 * Stop the drag mode
	 *
	 * @param {Event} e Event representing end of operation (mouseup, touchend).
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	stopDrag(e) {
		if (e) e.preventDefault(); // prevent mouse event from firing if both touch and mouse are supported
		this.classList.remove("dragging");
		this.dragging = false;
		this.resizing = false;
		[...this.querySelectorAll('[docked="false"]')].forEach((docked) =>
			docked.classList.remove("dragging", "resizing")
		);
	}

	/**
	 * Indicate a palette is presently in resize mode
	 * Extends overlay via css in dragging mode to capture mouse position
	 *
	 * @param {HTMLElement} palette Palette to start dragging
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	startResize(palette) {
		this.resizing = palette;
		this.classList.add("dragging");
		this.dragging.classList.add("dragging");
	}

	/**
	 * Execute the resize operation.
	 *
	 * @param {object} params
	 * @param {boolean} [params.resizeChart=true] Resize the whole chart
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	handleResize({ resizeChart = true } = {}) {
		// Notify palettes that a resize is about to occur
		this.palettePublish("dockWillResize");
		this.setChartDimensions();
		this.setVerticalPaletteHeight();

		const breakSm = this.ownerDocument.body.classList.contains("break-sm");
		// Palettes can move out of view or the display context can change to mobile,
		// so adjust the floating palettes on resize
		const palettes = this.querySelectorAll('[docked="false"]');
		[...palettes].forEach((palette) => {
			if (breakSm) {
				// If in the mobile context, double check that all palettes are docked
				palette.dock();
			} else {
				// Set detached palettes positions equal to themselves. setTransformPosition will
				// check against the chart bounds and move the palette if it will go off-screen
				palette.checkPosition();
			}
		});

		// Notify palettes that a resize has occured
		this.palettePublish("dockDidResize");

		// prevent loop as this function is can be invoked on resizeChart injection
		if (resizeChart) this.context.stx.resizeChart();
	}

	/**
	 * Sets height of vertically oriented palettes.
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	setVerticalPaletteHeight() {
		// Set height of vertically oriented child palettes
		[...this.querySelectorAll("[orientation=vertical]")].forEach((elem) => {
			if (elem.getAttribute("docked") === "true") {
				elem.style.height = this.parentNode.clientHeight + "px";
			}
		});
	}

	/**
	 * Resize chart to accommodate palette gutters
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	setChartDimensions() {
		const chartContainer = this.context.stx.container;
		const { top, left, width, height } = this.getChartBounds();

		const { config } = this.context;

		const { isMultiChartHost } = this.context.topNode;
		let sidePanelWidth = 0;
		if (config && config.channels) {
			this.channelWrite(
				config.channels.drawingPalettes || "channel.drawingPalettes",
				{
					top,
					left,
					width,
					height
				}
			);
			if (isMultiChartHost)
				sidePanelWidth =
					this.channelRead(
						config.channels.sidepanelSize || "channel.sidepanelSize"
					) || 0;
		} else {
			// configuration not available support previous direct updates (React app using v7.3)
			chartContainer.style.width = width + "px";
			chartContainer.style.height = height + "px";

			chartContainer.style.top = top + "px";
			chartContainer.style.left = left + "px";

			if (isMultiChartHost)
				sidePanelWidth = +(
					this.context.topNode.querySelector("cq-side-panel") || {
						style: { width: "" }
					}
				).style.width.replace("px", "");
		}

		// Align any horizontal docked palettes with the chart left
		const hPalettes = this.querySelectorAll(
			'[orientation="horizontal"][docked="true"]'
		);
		[...hPalettes].forEach((hPalette) => {
			// Offset horizontal palettes by the width of the vertical palettes
			// Add 1px for the border
			hPalette.style.left = left + 1 + "px";
			hPalette.style.width = width - sidePanelWidth - 3 + "px";
		});
		// Align any vertical docked palettes with the chart left
		const vPalettes = this.querySelectorAll('[orientation="vertical"]');
		[...vPalettes].forEach((vPalette) => {
			// Only offset vertical palettes when undocked. Docked vertical palettes are flush with the chart top edge.
			if (vPalette.docked === "false") {
				vPalette.style.top = top + "px";
			} else {
				vPalette.style.top = 0;
			}
		});
	}

	/**
	 * Dock all palettes.
	 *
	 * @private
	 *
	 * @tsmember WebComponents.PaletteDock
	 */
	dockAllPalettes() {
		const palettes = this.querySelectorAll('[docked="false"]');
		[...palettes].forEach((palette) => palette.dock());
	}
}

CIQ.UI.addComponentDefinition("cq-palette-dock", PaletteDock);
