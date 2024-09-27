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


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Provides a palette to dock alongside the chart or float above it. Palette components must be
 * placed within a `<cq-palette-dock>` component.
 *
 * @param {Boolean} docked The initial docked state of the palette.
 * @param {String} orientation Accepted values are "horizontal" and "vertical". Horizontal
 * 		palettes dock to the left of the chart. Vertical palettes dock to the top.
 * @param {String} min-height Minimum height to display if not enough content.
 *
 * @namespace WebComponents.cq-palette
 * @since 7.2.0
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
	constructor() {
		super();

		this.dragMargin = 10; // number of px to constrain the draggable area within the chart.
	}

	connectedCallback() {
		if (this.attached) return;
		super.connectedCallback();
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

	static get observedAttributes() {
		return ["docked", "hide", "orientation"];
	}

	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		switch (name) {
			case "docked":
				if (newValue === "false") {
					this.setTransform(100, 70);
					this.setHeightByScale(0.8);
				} else {
					this.style.transform = "";
				}
				break;
		}
	}

	// Sets dragging property in dock for this palette for mouse and touch events.
	handleDragResize(method, event) {
		if (this.paletteDock.hasOwnProperty("dragging")) {
			this.paletteDock.startDrag(this, method);
		}
	}

	// Overloaded by child objects to respond to messaging sent from other palettes
	handleMessage(id, message) {
		return {
			id: id,
			message: message
		};
	}

	detach(xPos, yPos) {
		let breakSm = this.ownerDocument.body.classList.contains("break-sm");
		// Never detach on small screens
		if (this.docked === "true" && !breakSm) {
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
			this.paletteDock.setVerticalPaletteHeight();
		}
	}

	dock() {
		if (this.docked === "false") {
			this.docked = "true";
			this.paletteDock.setChartDimensions();
			this.paletteDock.setVerticalPaletteHeight();
		}
	}

	getHeight() {
		return this.clientHeight;
	}

	getWidth() {
		return this.clientWidth;
	}

	// Get the offset position of the palette and call setTransformPosition
	// to clamp the palette position in the event of a chartContainer resize
	checkPosition() {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getChartBoundsOffset();
		}
		// Get the xyz values in px
		const transformValue = this.style.transform.match(/-?[0-9]{1,5}(?=px)/g);
		// Parse out the integer values from the style
		const coordinates = transformValue.map(function (val) {
			return parseInt(val);
		});
		// Apply the offsets normally produced by the mouse pointer. Nneeded to satisfy setTransformPosition
		coordinates[0] += parentBounds.left + this.dragStrip.clientWidth * 0.5;
		coordinates[1] += parentBounds.top + this.dragStrip.clientHeight * 0.5;

		this.setTransformPosition(coordinates[0], coordinates[1]);
	}

	// Set the palette transform property based on mouse position
	setTransformPosition(x, y) {
		let parentBounds = { top: 0, left: 0, width: 0, height: 0 };
		if (this.paletteDock.getBounds) {
			parentBounds = this.paletteDock.getChartBoundsOffset();
		}
		let nextTop = Math.floor(
			y - parentBounds.top - this.dragStrip.clientHeight * 0.5
		);
		let nextLeft = Math.floor(
			x - parentBounds.left - this.dragStrip.clientWidth * 0.5
		);

		// Clamp the top position within chart bounds
		nextTop = Math.min(
			Math.max(nextTop, this.dragMargin),
			parentBounds.height - (this.dragStrip.clientHeight + this.dragMargin)
		);
		// Clamp the left position within chart bounds
		nextLeft = Math.min(
			Math.max(nextLeft, this.dragMargin),
			parentBounds.width - (this.dragStrip.clientWidth + this.dragMargin)
		);

		this.setTransform(nextLeft, nextTop);
	}

	// Set the palette transform property explicitly
	setTransform(x, y) {
		this.style.transform = "translate3d(" + x + "px," + y + "px, 0px)";
	}

	// Set the palette height property based on mouse position
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

	// Set the palette height property relative to its current height property
	setHeightByScale(scale) {
		this.style.height =
			Math.floor(parseInt(this.style.height, 10) * scale) + "px";
	}

	// Set the palette height property explicitly
	setHeight(nextHeight) {
		this.style.height = nextHeight + "px";
	}
}

CIQ.UI.addComponentDefinition("cq-palette", Palette);
