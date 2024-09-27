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
import "../../js/webcomponents/paletteDock.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-palette&gt;</h4>
 *
 * Provides a palette to dock alongside the chart or float above it. Palette components must be
 * placed within a `<cq-palette-dock>` component.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute   | description |
 * | :---------- | :---------- |
 * | docked      | The docked state of the palette. Set to "false" to float palette over the chart. |
 * | orientation | Accepted values are "horizontal" and "vertical". Vertical palettes dock to the left of the chart. Horizontal palettes dock to the top. |
 *
 * In addition, the following attributes are also supported:
 * | attribute    | description |
 * | :----------- | :---------- |
 * | min-height   | Minimum height, in pixels, to display if not enough content. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it is docked, detached.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "dock", "detach" |
 * | action | "click" |
 *
 * A custom event will be emitted from the component when it is moved while undocked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "reposition" |
 * | action | "drag" |
 * | x | _x coordinate_ |
 * | y | _y coordinate_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 *
 * @alias WebComponents.Palette
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 7.2.0
 * - 9.1.0 Observes attributes. Added emitter.
 *
 * @example
 * <cq-palette docked="true" orientation="horizontal" min-height="40">
 *    <div class="palette-container">
 *        <div class="drag-strip"></div>
 *            ...
 *        <div class="resize-strip"></div>
 *    </div>
 * </cq-palette>
 */
class Palette extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["docked", "orientation"];
	}

	constructor() {
		super();
		this.dragMargin = 10; // number of px to constrain the draggable area within the chart.
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Palette);
	}

	init() {
		this.isDragging = false;
		this.minHeight = parseInt(this.getAttribute("min-height"), 10);
		// If the minimum height is not set, default to 25
		if (isNaN(this.minHeight)) {
			this.minHeight = 25;
		}
		this.paletteDock = this.parentElement.parentElement;
		this.dragStrip = this.querySelector(".drag-strip");
		this.resizeStrip = this.querySelector(".resize-strip");

		// Drag actions are managed by the palette dock
		if (this.dragStrip) {
			this.dragStrip.addEventListener(
				"mousedown",
				this.handleDragResize.bind(this, "dragging")
			);

			this.dragStrip.addEventListener(
				"touchstart",
				this.handleDragResize.bind(this, "dragging"),
				{ passive: false }
			);
		}

		// Resize actions are managed by the palette dock
		if (this.resizeStrip) {
			this.resizeStrip.addEventListener(
				"mousedown",
				this.handleDragResize.bind(this, "resizing")
			);
			this.resizeStrip.addEventListener(
				"touchstart",
				this.handleDragResize.bind(this, "resizing"),
				{ passive: false }
			);
		}

		if (this.paletteDock.paletteSubscribe) {
			this.sendMessage = this.paletteDock.paletteSubscribe(
				this.handleMessage.bind(this)
			);
		}
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Palette
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		switch (name) {
			case "docked":
				if (newValue === "false") {
					this.detach(100, 70, 0.8);
				} else {
					this.dock();
				}
				break;
		}
	}

	/**
	 * Sets dragging property in dock for this palette for mouse and touch events.
	 *
	 * @param {string} method Optional type of drag action, either "dragging" (default) or resizing
	 * @param {object} event Event that triggerd this function
	 *
	 * @tsmember WebComponents.Palette
	 */
	handleDragResize(method, event) {
		if (this.paletteDock.hasOwnProperty("dragging")) {
			this.paletteDock.startDrag(this, method);
		}
	}

	/**
	 * Overridden by child objects to respond to messaging sent from other palettes
	 *
	 * @param {string} id Identifier for the message
	 * @param {object | string} message Optional data accompanying the message
	 *
	 * @tsmember WebComponents.Palette
	 */
	handleMessage(id, message) {}

	/**
	 * Detach palette from dock, positioning it over the chart.
	 *
	 * @param {number} xPos X coordinate of palette relative to palette dock.
	 * @param {number} yPos Y coordinate of palette relative to palette dock.
	 * @param {number} scale Palette height relative to its current height.
	 *
	 * @tsmember WebComponents.Palette
	 */
	detach(xPos, yPos, scale) {
		let breakSm = this.ownerDocument.body.classList.contains("break-sm");
		// Never detach on small screens
		if (breakSm) return;

		if (typeof xPos !== "number") xPos = null;

		this.docked = "false";
		// Set a safe default position  when detaching
		xPos = xPos || 10;
		yPos = yPos || 10;

		// Get the parent bounds to check position
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getChartBoundsOffset();
		}
		// When the palette is detached to a location, it should show all or most of its contents even if the location is close to the right edge
		// Check the position of the palette against the right bound of the parent
		if (xPos > parentBounds.left + parentBounds.width - this.clientWidth) {
			xPos = parentBounds.left + parentBounds.width - this.clientWidth;
		}
		// Always set the position for instances where repositioning is necessary.
		this.setTransformPosition(xPos, yPos);
		this.paletteDock.setChartDimensions();
		this.context.stx.resizeChart();
		if (scale) this.setHeightByScale(scale);
		else this.paletteDock.setVerticalPaletteHeight();

		this.emitCustomEvent({
			effect: "detach"
		});
	}

	/**
	 * Fix palette position along edge of chart.
	 *
	 * @tsmember WebComponents.Palette
	 */
	dock() {
		this.docked = "true";
		this.transform = "";
		this.style.left = "";
		this.style.top = "";
		if (this.paletteDock) this.paletteDock.setChartDimensions();
		this.emitCustomEvent({
			effect: "dock"
		});
	}

	/**
	 * Get the current height of the palette.
	 *
	 * @return {number} The element height in pixels.
	 *
	 * @tsmember WebComponents.Palette
	 */
	getHeight() {
		return this.clientHeight;
	}

	/**
	 * Get the current width of the palette.
	 *
	 * @return {number} The element width in pixels.
	 *
	 * @tsmember WebComponents.Palette
	 */
	getWidth() {
		return this.clientWidth;
	}

	/**
	 * Get the offset position of the palette and call setTransformPosition
	 * to clamp the palette position in the event of a chartContainer resize
	 *
	 * @tsmember WebComponents.Palette
	 */
	checkPosition() {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getChartBounds) {
			parentBounds = this.paletteDock.getChartBounds();
		}
		let chartBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			chartBounds = this.paletteDock.getBounds();
		}
		const coordinates = (this.transform || [0, 0]).slice(0);
		// Apply the offsets normally produced by the mouse pointer. Needed to satisfy setTransformPosition
		coordinates[0] =
			chartBounds.left +
			Math.min(
				coordinates[0] + this.dragStrip.clientWidth * 0.5,
				parentBounds.left + parentBounds.width - this.clientWidth
			);
		coordinates[1] =
			chartBounds.top +
			Math.min(
				coordinates[1] + this.dragStrip.clientHeight * 0.5,
				parentBounds.top + parentBounds.height - this.clientHeight
			);

		this.setTransformPosition(coordinates[0], coordinates[1]);
	}

	/**
	 * Set the palette transform position clamping palette within the chart area.
	 * Calls `setTransform`.
	 *
	 * @param {number} x X coordinate of palette relative to palette dock.
	 * @param {number} y Y coordinate of palette relative to palette dock.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setTransformPosition(x, y) {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getChartBoundsOffset();
		}
		let chartBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			chartBounds = this.paletteDock.getBounds();
		}
		let nextTop = Math.floor(y - this.dragStrip.clientHeight * 0.5);
		let nextLeft = Math.floor(x - this.dragStrip.clientWidth * 0.5);

		// Clamp the top position within chart bounds
		nextTop =
			Math.min(
				Math.max(nextTop, parentBounds.top + this.dragMargin),
				parentBounds.height - (this.dragStrip.clientHeight + this.dragMargin)
			) - chartBounds.top;
		// Clamp the left position within chart bounds
		nextLeft =
			Math.min(
				Math.max(nextLeft, parentBounds.left + this.dragMargin),
				parentBounds.width - (this.dragStrip.clientWidth + this.dragMargin)
			) - chartBounds.left;

		this.setTransform(nextLeft, nextTop);
	}

	/**
	 * Set the palette transform property explicitly.
	 *
	 * @param {number} x X coordinate of palette relative to palette dock.
	 * @param {number} y Y coordinate of palette relative to palette dock.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setTransform(x, y) {
		this.transform = [x, y];
		this.style.left = x + "px";
		this.style.top = y + "px";
		this.emitCustomEvent({
			action: this.paletteDock.dragging ? "drag" : null,
			effect: "reposition",
			detail: { x, y }
		});
	}

	/**
	 * Set the palette height property based on location.
	 *
	 * @param {number} yPosition Y coordinate of palette bottom
	 *
	 * @tsmember WebComponents.Palette
	 */
	setHeightToPosition(yPosition) {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getBounds();
		}

		let paletteViewportOffset = this.getBoundingClientRect();
		let nextHeight = yPosition - paletteViewportOffset.top;

		if (this.orientation === "vertical") {
			if (
				nextHeight > this.minHeight &&
				nextHeight + (paletteViewportOffset.top - parentBounds.top) <
					parentBounds.height
			) {
				this.setHeight(nextHeight);
			}
		}
	}

	/**
	 * Set the palette height property relative to its current height property.
	 * For example, a scale of 0.5 will set the palette height to one half of its
	 * current height.
	 *
	 * @param {number} scale Size multiplier.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setHeightByScale(scale) {
		this.style.height =
			Math.floor(parseInt(this.style.height, 10) * scale) + "px";
	}

	/**
	 * Set the palette height property explicitly.
	 *
	 * @param {number} nextHeight Height in pixels.
	 *
	 * @tsmember WebComponents.Palette
	 */
	setHeight(nextHeight) {
		this.style.height = nextHeight + "px";
	}
}

CIQ.UI.addComponentDefinition("cq-palette", Palette);
