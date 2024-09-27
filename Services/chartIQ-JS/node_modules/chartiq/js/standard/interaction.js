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


import { CIQ as _CIQ } from "../../js/chartiq.js";
import "../../js/standard/movement.js";


let __js_standard_interaction_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Contains information about the latest set of pointer events on the chart.
 *
 * Events are pushed into `down` or `up` from pointer or mouse up or down events. The 0 index is
 * always the current up/down event. The 1 index is always the previous up/down event.
 *
 * @member CIQ.ChartEngine
 * @type {object}
 * @private
 * @since 8.0.0
 */
CIQ.ChartEngine.prototype.pointerEvents = {
	/**
	 * Holds information about the previous and current down events.
	 * @property {array}
	 */
	down: [],
	/**
	 * Holds information about the previous and current up events.
	 * @property {array}
	 */
	up: []
};

/**
 * If true when the chart initially is rendered, then the CIQ.ChartEngine object will register to listen and manage touch and mouse browser events within then canvas by attaching them to the container div.
 *
 * Set to false, and all interactivity with the chart will cease; turning it into a static display and 'shedding' all HTML overlays and events required for user interaction, for a much more lightweight interface.
 * Alternatively you can selectively set any {@link CIQ.ChartEngine.htmlControls} id to null, including `CIQ.ChartEngine.htmlControls=null` to disable them all.
 *
 * See the {@tutorial Creating Static Charts} tutorial for more details.
 *
 * It is possible to re-enable the events after the chart has been rendered, but you must call stx.initializeChart(); stx.draw(); to register the events once again.
 * @type boolean
 * @default
 * @alias manageTouchAndMouse
 * @memberof CIQ.ChartEngine.prototype
 * @example
 * // if enabling events after the chart was already rendered, you must reinitialize to re register the browser events.
 * stxx.manageTouchAndMouse = true;
 * stxx.initializeChart();
 * stxx.draw();
 */
CIQ.ChartEngine.prototype.manageTouchAndMouse = true;

/**
 * Registers touch and mouse events for the chart (for dragging, clicking, zooming). The events are registered on the container div (not the canvas).
 * Set {@link CIQ.ChartEngine#manageTouchAndMouse} to false to disable the built-in event handling (events will not be registered with the container).
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.registerTouchAndMouseEvents = function () {
	if (this.touchAndMouseEventsRegistered) return;
	this.touchAndMouseEventsRegistered = true;
	var source = this.controls.chartControls || document;
	var zoomInEl = source.querySelector(".stx-zoom-in");
	var zoomOutEl = source.querySelector(".stx-zoom-out");
	var containerElement = this.chart.container;
	var self = this;
	var addListener = function (event, listener, options) {
		function uberListener(args) {
			if (self.mainSeriesRenderer.nonInteractive) return;
			listener(args);
		}
		self.addDomEventListener(containerElement, event, uberListener, options);
	};
	if (!CIQ.touchDevice) {
		addListener("mousemove", function (e) {
			self.mousemove(e);
		});
		addListener("mouseenter", function (e) {
			self.mousemove(e);
		});
		addListener("mousedown", function (e) {
			self.mousedown(e);
		});
		addListener("mouseup", function (e) {
			self.mouseup(e);
		});
	} else {
		if (CIQ.isSurface) {
			addListener("mousemove", function (e) {
				self.msMouseMoveProxy(e);
			});
			addListener("mouseenter", function (e) {
				self.msMouseMoveProxy(e);
			});
			addListener("mousedown", function (e) {
				self.msMouseDownProxy(e);
			});
			addListener("mouseup", function (e) {
				self.msMouseUpProxy(e);
			});

			addListener("pointerdown", function (e) {
				return self.startProxy(e);
			});
			addListener("pointermove", function (e) {
				self.moveProxy(e);
			});
			addListener("pointerenter", function (e) {
				return self.moveProxy(e);
			});
			addListener("pointerup", function (e) {
				return self.endProxy(e);
			});
		} else {
			// We need mouse events for all-in-one computers that accept both mouse and touch commands
			// Actually, only for Firefox and Chrome browsers. IE10 sends pointers which are managed by the isSurface section
			if (!CIQ.isMobile) {
				addListener("mousemove", function (e) {
					self.iosMouseMoveProxy(e);
				});
				addListener("mouseenter", function (e) {
					self.iosMouseMoveProxy(e);
				});
				addListener("mousedown", function (e) {
					self.iosMouseDownProxy(e);
				});
				addListener("mouseup", function (e) {
					self.iosMouseUpProxy(e);
				});
			}

			addListener(
				"touchstart",
				function (e) {
					self.touchstart(e);
				},
				{ passive: false }
			);
			addListener(
				"touchmove",
				function (e) {
					self.touchmove(e);
				},
				{ passive: false }
			);
			addListener("touchend", function (e) {
				self.touchend(e);
			});

			// capture a "pen" device, so we can treat it as a mouse
			addListener("pointerdown", function (e) {
				self.touchPointerType = e.pointerType;
			});
		}
	}

	var wheelEvent = CIQ.wheelEvent;

	if (this.captureMouseWheelEvents) {
		addListener(
			wheelEvent,
			function (e) {
				self.mouseWheel(e);
			},
			{ passive: false }
		);
	}
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Called when the user presses the mouse button down. This will activate dragging operations once the user moves a few pixels
 * within {@link CIQ.ChartEngine#mousemoveinner}.
 * @param  {Event} e The mouse event
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias mousedown
 */
CIQ.ChartEngine.prototype.mousedown = function (e) {
	if (this.runPrepend("mousedown", arguments)) return;
	this.grabOverrideClick = false;
	//if(this.openDialog!=="") return;
	if (!this.displayInitialized) return; // No chart displayed yet
	if (!this.displayCrosshairs) return;
	if (this.repositioningDrawing) return; // if mouse went off screen this might happen
	if (this.editingAnnotation) return;
	if (e.target && e.target.closest("[draggable]")) return;
	if (e.button && e.button >= 2) {
		// only trigger for a primary mouse down event.
		return;
	}
	const rect = this.container.getBoundingClientRect();
	this.top = rect.top;
	this.left = rect.left;
	this.right = this.left + this.width;
	this.bottom = this.top + this.height;
	if (
		e.clientX >= this.left &&
		e.clientX <= this.right &&
		e.clientY >= this.top &&
		e.clientY <= this.bottom
	) {
		this.insideChart = true;
	} else {
		this.insideChart = false;
		return;
	}
	if (!this.currentPanel) return;
	if (
		this.manageTouchAndMouse &&
		e &&
		e.preventDefault &&
		this.captureTouchEvents
	)
		e.preventDefault(); // Added 9/19/13 to prevent IE from going into highlight mode when you mouseout of the container
	this.mouseTimer = Date.now();
	this.longHoldTookEffect = false;
	this.hasDragged = false;
	this.userPointerDown = true;

	// only register the pointerEvent if there is nothing open over the chart
	if (this.openDialog === "")
		this.registerPointerEvent(
			{ x: e.clientX, y: e.clientY, time: this.mouseTimer },
			"down"
		);

	const { chart } = this.currentPanel;
	for (let i = 0; i < this.drawingObjects.length; i++) {
		const drawing = this.drawingObjects[i];
		if (drawing.highlighted && !drawing.permanent) {
			if (this.cloneDrawing) {
				// clone a drawing if flag set
				const Factory = CIQ.ChartEngine.drawingTools[drawing.name];
				const clonedDrawing = new Factory();
				clonedDrawing.reconstruct(this, drawing.serialize());
				this.drawingObjects.push(clonedDrawing);
				this.activateRepositioning(clonedDrawing);
				clonedDrawing.repositioner = drawing.repositioner;
				return;
			}
			const drawingTool = this.currentVectorParameters.vectorType;
			// do not allow repositioning if the drawing tool has dragToDraw (like the freeform)
			if (
				!CIQ.Drawing ||
				!drawingTool ||
				!CIQ.Drawing[drawingTool] ||
				!new CIQ.Drawing[drawingTool]().dragToDraw
			) {
				this.activateRepositioning(drawing);
				return;
			}
		}
	}

	const { anchorHandles } = this.controls;
	if (anchorHandles) {
		for (let i in anchorHandles) {
			let { handle, sd, highlighted } = anchorHandles[i];
			if (highlighted) {
				this.repositioningAnchorSelector = { sd };
				handle.classList.add("stx-grab");
				return;
			}
		}
	}

	if (this.drawingClick) {
		if (this.currentPanel.subholder === e.target)
			this.drawingClick(this.currentPanel, this.cx, this.cy);
		if (this.activeDrawing && this.activeDrawing.dragToDraw) return;
	}

	this.grabbingScreen = true;
	chart.spanLock = false;
	this.yToleranceBroken = false;
	/* use e.client instead of e.page since we need the value to be relative to the viewport instead of the overall document size.
		if(!e.pageX){
			e.pageX=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			e.pageY=e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		*/
	this.grabStartX = e.clientX;
	this.grabStartY = e.clientY;
	this.grabStartMicropixels = this.micropixels;
	this.grabStartScrollX = chart.scroll;
	this.grabStartScrollY = this.currentPanel.yAxis.scroll;
	this.grabStartCandleWidth = this.layout.candleWidth;
	this.grabStartYAxis = this.whichYAxis(this.currentPanel);
	this.grabStartZoom = this.grabStartYAxis ? this.grabStartYAxis.zoom : 0;
	this.grabStartPanel = this.currentPanel;

	setTimeout(
		(function (self) {
			return function () {
				self.grabbingHand();
			};
		})(this),
		100
	);
	if (this.swipeStart) this.swipeStart(chart);
	if (this.longHoldTime || this.longHoldTime === 0) this.startLongHoldTimer();
	this.runAppend("mousedown", arguments);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Handles mouse movement events. This method calls {@link CIQ.ChartEngine#mousemoveinner} which has the core logic
 * for dealing with panning and zooming. See also {@link CIQ.ChartEngine.AdvancedInjectable#touchmove} which is the equivalent method for touch events.
 * @param {Event} mouseEvent A mouse move event
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias mousemove
 */
CIQ.ChartEngine.prototype.mousemove = function (mouseEvent) {
	var e = mouseEvent;
	/* use e.client instead of e.page since we need the value to be relative to the viewport instead of the overall document size.
		if(!e.pageX){
			e.pageX=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			e.pageY=e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		*/
	CIQ.ChartEngine.crosshairX = e.clientX; // These are used by the UI so make sure they are set even if no chart is set
	CIQ.ChartEngine.crosshairY = e.clientY;
	if (e.type.toLowerCase().indexOf("enter") > -1) {
		this.positionCrosshairsAtPointer();
		return;
	}
	if (this.runPrepend("mousemove", arguments)) return;
	if (!this.displayInitialized) return; // No chart displayed yet
	if (this.openDialog !== "") return; // Don't show crosshairs when dialog is open
	if (this.grabbingScreen && e.buttons !== 1) {
		this.cancelLongHold = true;
		this.displayDragOK();
		// Added 9/19/2013 to release grabbing when the mouse moves out of the container
		this.grabbingScreen = false;
		this.findHighlights(false, true);
	}
	this.mousemoveinner(e.clientX, e.clientY);
	this.runAppend("mousemove", arguments);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Called whenever the user lifts the mousebutton up. This may send a click to a drawing, or cease a drag operation.
 * @param  {Event} e A mouse event
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias mouseup
 * @since 6.3.0 baseline chart recenters itself after adjusting baseline
 * @since 9.2.0 baseline chart recentering logic moved out of this function
 */
CIQ.ChartEngine.prototype.mouseup = function (e) {
	if (this.runPrepend("mouseup", arguments)) return;
	this.swipe.end = true;
	this.cancelLongHold = true;
	if (this.repositioningDrawing) {
		// if we single click with a drawing tool enabled, then start another drawing instead of moving current one
		if (
			!this.currentVectorParameters.vectorType ||
			Date.now() - this.mouseTimer > 250
		) {
			this.changeOccurred("vector");
			CIQ.clearCanvas(this.chart.tempCanvas, this);
			this.activateRepositioning(null);
			this.adjustDrawings();
			this.draw();
			return;
		}
		this.activateRepositioning(null);
	}

	if (this.repositioningAnchorSelector) {
		const { sd } = this.repositioningAnchorSelector;
		CIQ.Studies.repositionAnchor(this, sd);
		if (this.controls.anchorHandles[sd.uniqueId]) {
			this.repositioningAnchorSelector = null;
			this.controls.anchorHandles[sd.uniqueId].highlighted = false;
			CIQ.Studies.displayAnchorHandleAndLine(this, sd, this.chart.dataSegment);
			Object.values(this.controls.anchorHandles || {}).forEach(({ handle }) =>
				handle.classList.remove("stx-grab")
			);
			this.findHighlights();
		}
		return;
	}

	const wasMouseDown = this.userPointerDown;
	this.userPointerDown = false;
	if (!this.displayInitialized) return; // No chart displayed yet

	const cy = this.backOutY(e.clientY);
	const cx = this.backOutX(e.clientX);
	const isRightClick = e.button && e.button >= 2;
	const openDialog = this.openDialog !== "";

	if (!openDialog && !isRightClick)
		this.registerPointerEvent(
			{ x: e.clientX, y: e.clientY, time: Date.now() },
			"up"
		);

	this.grabbingScreen = false;
	if (this.highlightedDraggable) {
		if (this.dragPlotOrAxis) this.dragPlotOrAxis(cx, cy);
		this.currentPanel = this.whichPanel(cy);
	}
	const panel = this.currentPanel;

	this.grabStartYAxis = null;
	this.displayDragOK();
	if (this.openDialog !== "") {
		if (this.insideChart) this.container.classList.remove("stx-drag-chart"); //in case they were grabbing the screen and let go on top of the button.
		return;
	}
	if (this.grabOverrideClick) {
		if (!this.overXAxis && !this.overYAxis && this.swipeRelease)
			this.swipeRelease();
		this.container.classList.remove("stx-drag-chart");
		this.grabOverrideClick = false;
		this.doDisplayCrosshairs();
		this.updateChartAccessories();
		return;
	}
	//if(!this.displayCrosshairs) return;
	if (this.insideChart) this.container.classList.remove("stx-drag-chart");
	if (CIQ.ChartEngine.resizingPanel) {
		this.releaseHandle();
		//CIQ.clearCanvas(this.chart.tempCanvas, this);
		//this.resizePanels();
		//CIQ.ChartEngine.resizingPanel=null;
		return;
	}
	if (isRightClick || e.ctrlKey) {
		if (this.anyHighlighted && this.bypassRightClick !== true) {
			if (this.overYAxis) {
				const currentYAxis = panel.yaxisLHS
					.concat(panel.yaxisRHS)
					.find((yaxis) => yaxis.highlight === true);

				if (currentYAxis && currentYAxis.showContextMenu) {
					currentYAxis.showContextMenu(
						CIQ.ChartEngine.crosshairX,
						CIQ.ChartEngine.crosshairY
					);
				}
			}
			this.rightClickHighlighted();

			if (e.preventDefault && this.captureTouchEvents) e.preventDefault();
			e.stopPropagation();
			return false;
		}
		this.dispatch("rightClick", { stx: this, panel, x: cx, y: cy });
		return true;
	}
	if (e.clientX < this.left || e.clientX > this.right) return;
	if (e.clientY < this.top || e.clientY > this.bottom) return;

	const targettingSubholder = panel && panel.subholder === e.target;
	// Unlike drawings and marker clicks, allow doubleClick to target axis outside panel subholder
	if (
		this.isDoubleClick() &&
		(targettingSubholder || this.overYAxis || this.overXAxis)
	) {
		this.doubleClick(e.button, cx, cy);
		this.resetClickState();
	} else {
		if (wasMouseDown && targettingSubholder) {
			if (this.drawingClick && (!this.longHoldTookEffect || this.activeDrawing))
				this.drawingClick(panel, cx, cy);
			if (
				!this.longHoldTookEffect &&
				this.activeMarker &&
				!this.activeMarker.params.noInteraction
			)
				this.activeMarker.click({ cx, cy, panel });
		}
		if (!this.longHoldTookEffect && !this.activeDrawing) {
			let doTap = true;
			if (
				this.anyHighlighted &&
				this.leftClickPinTooltip &&
				this.allowPinning &&
				this.highlightedPlot &&
				this.allowPinning(this.highlightedPlot.type)
			) {
				doTap = !this.leftClickPinTooltip({ cx, cy });
			}
			if (doTap) this.dispatch("tap", { stx: this, panel, x: cx, y: cy });
		}
	}
	this.runAppend("mouseup", arguments);
};

/**
 * Adds an event to the `pointerEvents` array for a given type.
 *
 * **This is the only method that should ever add entries to a `pointerEvents` array.**
 *
 * @param {object} info The event object.
 * @param {string} type Event type to which the event is added. Valid types are 'up' and 'down'.
 *
 * @memberof CIQ.ChartEngine
 * @private
 * @since 8.0.0
 */
CIQ.ChartEngine.prototype.registerPointerEvent = function (info, type) {
	if (this.pointerEvents[type].length > 1) this.pointerEvents[type].pop();
	this.pointerEvents[type].unshift(info);
};

/**
 * Resets a `pointerEvents` array to an initial empty state.
 *
 * **This is the only method that should ever clear entries from a `pointerEvents` array.**
 *
 * @param {string} type The event type for which all events are removed. Valid types are 'up'
 * 		and 'down'.
 *
 * @memberof CIQ.ChartEngine
 * @private
 * @since 8.0.0
 */
CIQ.ChartEngine.prototype.resetPointerEvent = function (type) {
	this.pointerEvents[type].splice(0);
};

/**
 * Resets a double-click state.
 * Call when done processing a double click.
 *
 * @memberof CIQ.ChartEngine
 * @private
 * @since 8.9.0
 */
CIQ.ChartEngine.prototype.resetClickState = function () {
	this.resetPointerEvent("up");
	this.resetPointerEvent("down");
	this.cancelTouchSingleClick = true;
};
/**
 * Determines whether the chart has received a double-click based on the `pointerEvents`
 * tuple. This method double-checks the coordinates and timing of the last two clicks to
 * determine:
 *  - the clicks were within {@link CIQ.ChartEngine.prototype.doubleClickTime}
 *  - the clicks were within 20px of each other
 *  - neither click was a long-hold
 *
 *
 * @param {boolean} [isTouch] Set this parameter to true when checking whether a touch event is a
 * 		double-click (double-tap). When the parameter is true, the allowable area where a
 * 		double-click can occur is increased to accommodate fingers, which are larger than a mouse
 * 		cursor.
 * @return {boolean} True if a double click was detected.
 *
 * @memberof CIQ.ChartEngine
 * @private
 * @since
 * - 8.0.0
 * - 8.1.0 Added `isTouch` parameter.
 */
CIQ.ChartEngine.prototype.isDoubleClick = function (isTouch) {
	const boundary = isTouch ? 35 : 20;
	const {
		up: [thisUp, lastUp],
		down: [thisDown, lastDown]
	} = this.pointerEvents;
	const retVal =
		lastUp &&
		lastDown &&
		thisDown.time - lastUp.time < this.doubleClickTime &&
		CIQ.withinRadius(lastDown, thisDown, boundary) &&
		CIQ.withinRadius(lastUp, thisDown, boundary) &&
		lastUp.time - lastDown.time < this.longHoldTime &&
		thisUp.time - thisDown.time < this.longHoldTime;
	this.cancelTouchSingleClick = retVal;
	return retVal;
};

/**
 * Handles all double-clicks on the chart container.
 *
 * Applies a double-click event to a {@link CIQ.Marker} and dispatches the "doubleClick" event,
 * which invokes the [doubleClickEventListener]{@link CIQ.ChartEngine~doubleClickEventListener}.
 *
 * If the return value of the marker's {@link CIQ.Marker#doubleClick} method is truthy, the
 * "doubleClick" event is not dispatched.
 *
 * @param {number} button The button used to double-click.
 * @param {number} x The x-coordinate of the double-click.
 * @param {number} y The y-coordinate of the double-click.
 *
 * @alias doubleClick
 * @memberof CIQ.ChartEngine.prototype
 * @since 8.0.0
 */
CIQ.ChartEngine.prototype.doubleClick = function (button, x, y) {
	if (this.runPrepend("doubleClick", arguments)) return;
	if (this.editingAnnotation) return;
	if (CIQ.ChartEngine.drawingLine) {
		if (this.currentVectorParameters.vectorType == "continuous")
			CIQ.ChartEngine.completeDrawing(this);
		return this.undo();
	}
	if (this.activeDrawing) return;

	let handledMarker =
		this.activeMarker &&
		this.activeMarker.doubleClick({ cx: x, cy: y, panel: this.currentPanel });
	if (!handledMarker)
		this.dispatch("doubleClick", { stx: this, button: button, x: x, y: y });

	this.runAppend("doubleClick", arguments);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * This is called whenever the mouse leaves the chart area. Crosshairs are disabled, stickies are hidden, dragDrawings are completed.
 * @param  {Event} e The mouseout event
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias handleMouseOut
 */
CIQ.ChartEngine.prototype.handleMouseOut = function (e) {
	e = e || window.event;
	if (
		!e.relatedTarget ||
		!CIQ.withinElement(this.chart.container, e.pageX, e.pageY)
	) {
		if (this.runPrepend("handleMouseOut", arguments)) return;
		if (!this.grabbingScreen) this.findHighlights(null, true);
		this.undisplayCrosshairs();
		this.touches = [];
		this.touching = false;
		if (this.activeDrawing && this.userPointerDown) {
			//end the drawing
			this.userPointerDown = false;
			this.drawingLine = false;
			var cy = this.backOutY(e.pageY);
			var cx = this.backOutX(e.pageX);
			this.drawingClick(this.currentPanel, cx, cy);
		}

		const { sd, tapToAdd } = this.repositioningAnchorSelector || {};
		if (sd && !tapToAdd) {
			this.repositioningAnchorSelector = null;
			this.controls.anchorHandles[sd.uniqueId].highlighted = false;
			CIQ.Studies.displayAnchorHandleAndLine(this, sd, this.chart.dataSegment);
			this.draw();
		}

		this.insideChart = false;
		this.overYAxis = false;
		this.overXAxis = false;
		// Added to remove sticky when the mouse moves out of the container
		this.displaySticky();
		var dragControl = this.controls.dragOk;
		if (dragControl) dragControl.style.display = "none";

		this.runAppend("handleMouseOut", arguments);
	}
};

CIQ.ChartEngine.prototype.startLongHoldTimer = function (cb) {
	var stx = this;
	this.cancelLongHold = false;
	if (this.longHoldTimeout) clearTimeout(this.longHoldTimeout);
	var callback = function () {
		if (stx.cancelLongHold) return;
		stx.longHoldTookEffect = true;
		if (cb) cb();
		stx.dispatch("longhold", {
			stx: stx,
			panel: stx.currentPanel,
			x: stx.cx,
			y: stx.cy
		});
		stx.displayDragOK();
	};
	if (this.longHoldTime) {
		this.longHoldTimeout = setTimeout(callback, this.longHoldTime);
	} else if (this.longHoldTime === 0) {
		callback();
	}
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Event handler that is called when the handle of a panel is grabbed, for resizing
 * @param  {CIQ.ChartEngine.Panel} panel The panel that is being grabbed
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias grabHandle
 */
CIQ.ChartEngine.prototype.grabHandle = function (panel) {
	if (this.runPrepend("grabHandle", arguments)) return;
	//if(e.preventDefault) e.preventDefault();
	if (!panel) return;
	CIQ.ChartEngine.crosshairY = this.resolveY(panel.top);
	CIQ.ChartEngine.resizingPanel = panel;
	panel.handle.classList.add("stx-grab");
	this.runAppend("grabHandle", arguments);
};

/**
 * Turns on the grabbing hand cursor. It does this by appending the class "stx-drag-chart" to the chart container.
 * If this is a problem then just eliminate this function from the prototype.
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.grabbingHand = function () {
	if (!this.allowScroll) return;
	if (!this.grabbingScreen) return;
	if (CIQ.touchDevice) return;
	this.container.classList.add("stx-drag-chart");
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Event handler that is called when a panel handle is released.
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias releaseHandle
 */
CIQ.ChartEngine.prototype.releaseHandle = function () {
	if (this.runPrepend("releaseHandle", arguments)) return true;
	//if(e.preventDefault) e.preventDefault();
	CIQ.clearCanvas(this.chart.tempCanvas, this);
	this.resizePanels();
	if (CIQ.ChartEngine.resizingPanel)
		CIQ.ChartEngine.resizingPanel.handle.classList.remove("stx-grab");
	CIQ.ChartEngine.resizingPanel = null;
	this.runAppend("releaseHandle", arguments);
};

/**
 * Finds any objects that should be highlighted by the current crosshair position. All drawing objects have their highlight() method
 * called in order that they may draw themselves appropriately.
 * @param  {boolean} isTap If true then it indicates that the user tapped the screen on a touch device, and thus a wider radius is used to determine which objects might have been highlighted.
 * @param {boolean} clearOnly Set to true to clear highlights
 * @memberof CIQ.ChartEngine
 * @since 4.0.0 {@link CIQ.ChartEngine#displaySticky} is now called to display the 'series.symbol' if the 'series.display' is not present
 */
CIQ.ChartEngine.prototype.findHighlights = function (isTap, clearOnly) {
	var radius =
		this.preferences[isTap ? "highlightsTapRadius" : "highlightsRadius"]; // 30:10
	this.highlightViaTap = isTap; // internal use state var

	var { cx, cy } = this;
	this.anyHighlighted = false;
	if (!this.currentPanel) return;
	var { chart } = this.currentPanel;

	if (this.activeDrawing) clearOnly = true;
	var somethingChanged = false;
	var drawingToMeasure = null;
	var stickyArgs = clearOnly ? {} : { forceShow: true, type: "drawing" };

	var box = {
		x0: this.tickFromPixel(cx - radius, chart),
		x1: this.tickFromPixel(cx + radius, chart),
		y0: this.valueFromPixel(cy - radius, this.currentPanel),
		y1: this.valueFromPixel(cy + radius, this.currentPanel),
		cx0: cx - radius,
		cx1: cx + radius,
		cy0: cy - radius,
		cy1: cy + radius,
		r: radius
	};
	if (this.repositioningDrawing && box.x1 - box.x0 < 2) {
		box.x1++;
		box.x0--;
	} else if (box.x1 == box.x0) {
		box.x0 -= 0.5;
		box.x1 += 0.5;
	}

	/* begin test code
		// show the box
		this.chart.canvas.context.strokeStyle="red";
		this.chart.canvas.context.strokeRect(this.pixelFromTick(box.x0,chart),cy-radius,this.pixelFromTick(box.x1,chart)-this.pixelFromTick(box.x0,chart),2*radius);
		this.chart.canvas.context.strokeStyle="blue";
		this.chart.canvas.context.strokeRect(cx-radius,cy-radius,2*radius,2*radius);
		  end test code */

	if (!chart.hideDrawings) {
		for (var i = this.drawingObjects.length - 1; i >= 0; i--) {
			var drawing = this.drawingObjects[i];
			var panel = this.panels[drawing.panelName];
			if (
				drawing.hidden ||
				!panel ||
				(drawing.field && !this.getYAxisByField(panel, drawing.field))
			) {
				drawing.highlighted = false;
				continue;
			}
			if (this.repositioningDrawing && this.repositioningDrawing != drawing)
				continue;

			var prevHighlight = drawing.highlighted;
			var highlightMe =
				drawing.panelName == this.currentPanel.name || drawing.spanPanels;
			if (highlightMe) {
				drawing.repositioner = drawing.intersected(
					this.crosshairTick,
					this.crosshairValue,
					box
				);
			}

			highlightMe =
				highlightMe &&
				drawing.repositioner &&
				!this.overXAxis &&
				!this.overYAxis;

			if (!clearOnly && highlightMe) {
				if (prevHighlight) {
					drawingToMeasure = drawing;
					if (this.anyHighlighted && this.singleDrawingHighlight)
						drawing.highlighted = false;
					if (drawing.highlighted && drawing.highlighted != prevHighlight)
						somethingChanged = true; // drawing is still highlighted, but a different positioner is active
				} else if (prevHighlight != drawing.highlight(true)) {
					if (!drawingToMeasure) drawingToMeasure = drawing;
					if (this.anyHighlighted && this.singleDrawingHighlight)
						drawing.highlighted = false;
					somethingChanged = true;
				}
				this.anyHighlighted = true;
			} else {
				if (prevHighlight != drawing.highlight(false)) {
					somethingChanged = true;
				}
			}
			if (drawing.highlighted) {
				stickyArgs.noDelete = drawing.permanent;
				stickyArgs.noEdit = !this.callbackListeners.drawingEdit.length;
				stickyArgs.noText = stickyArgs.noEdit || !drawing.edit;
				stickyArgs.message = this.translateIf(CIQ.capitalize(drawing.name));
			}
		}
	}

	var n, o, m, marker, series;
	for (n in this.layout.studies) {
		o = this.layout.studies[n];
		o.prev = o.highlight;
		o.highlight = this.yaxisMatches(o, this.grabStartYAxis);
	}
	for (n in chart.seriesRenderers) {
		var r = chart.seriesRenderers[n];
		r.params.highlight = this.yaxisMatches(r, this.grabStartYAxis);
		for (var j = 0; j < r.seriesParams.length; j++) {
			series = r.seriesParams[j];
			series.prev = series.highlight;
			series.highlight = r.params.highlight;
		}
	}
	var { anchorHandles } = this.controls;
	if (anchorHandles) {
		for (var id in anchorHandles) {
			anchorHandles[id].highlighted = false;
		}
	}
	var markers = this.markerHelper && this.markerHelper.visibleCanvasMarkers;
	if (markers) {
		for (m = 0; m < markers.length; m++) {
			marker = markers[m];
			this.activeMarker = null;
			marker.prev = marker.highlight;
			marker.highlight = false;
		}
	}
	if (this.markerHelper) this.markerHelper.highlighted = [];
	this.highlightedDataSetField = null;
	this.highlightedPlot = {};
	this.highlightedDraggable = null;

	// Function to detect if a "box" drawn around the cursor position is intersected by the overlay.
	// Up to two overlay segments may be tested:
	// The segment endpointed by the previous dataSet element containing that field and the current dataSet element behind the cursor,
	// and the current dataSet element behind the cursor and the next dataSet element containing that field.
	// In case there are gaps in the data, one of these segments may not exist.
	// This routine is designed to also handle comparison overlays which cause the dataSet to be transformed.
	// The argument "fullField" represents the series symbol and the subField, separated by a period (e.g. GOOG.High).
	// If there is no subField, a subField of Close is presumed.
	function isOverlayIntersecting(refBar, box, fullField, yAxis, renderer, id) {
		var stx = this,
			chart = stx.chart,
			currentPanel = stx.currentPanel;
		if (!yAxis) yAxis = currentPanel.yAxis;
		var parts = fullField.split("-->");
		var field = parts[0];
		var subField = parts[1];
		if (!subField) subField = "Close";
		function getVal(quote) {
			if (!quote) return null;
			var theVal = quote[field];
			if (theVal && (theVal[subField] || theVal[subField] === 0)) {
				// For OHLC, hover over imaginary line connecting closes
				theVal = theVal[subField];
			}
			if (renderer && renderer.getBasis)
				theVal += renderer.getBasis(quote, field, subField);
			if (!chart.transformFunc || yAxis != chart.yAxis) return theVal;
			else if (quote.transform && field in quote.transform) {
				theVal = quote.transform[field];
				if (theVal && (theVal[subField] || theVal[subField] === 0)) {
					// For OHLC, hover over imaginary line connecting closes
					theVal = theVal[subField];
				}
				return theVal;
			}
			return chart.transformFunc(stx, chart, theVal);
		}
		var quote = chart.dataSegment[bar],
			quotePrev,
			quoteNext;
		var val,
			valPrev,
			valNext,
			tick = null,
			tickPrev = null,
			tickNext = null;
		var usedCache = new Array(3);
		var cache = renderer && renderer.caches[id];
		if (quote && cache) {
			val = cache[bar];
			tick = quote.tick;
			if (val || val === 0) usedCache[0] = 1;
			var ci;
			for (ci = bar - 1; ci >= 0; ci--) {
				if (cache[ci] || cache[ci] === 0) {
					valPrev = cache[ci];
					tickPrev = tick - (bar - ci);
					usedCache[1] = 1;
					break;
				}
			}
			for (ci = bar + 1; ci < chart.dataSegment.length; ci++) {
				if (cache[ci] || cache[ci] === 0) {
					valNext = cache[ci];
					tickNext = tick - (bar - ci);
					usedCache[2] = 1;
					break;
				}
			}
		}
		if (tickPrev === null) {
			quotePrev = stx.getPreviousBar.call(stx, chart, fullField, bar);
			if (quotePrev) {
				tickPrev = quotePrev.tick;
				valPrev = getVal(quotePrev);
			}
		}
		if (tickNext === null) {
			quoteNext = stx.getNextBar.call(stx, chart, fullField, bar);
			if (quoteNext) {
				tickNext = quoteNext.tick;
				valNext = getVal(quoteNext);
			}
		}
		if (tickPrev === null && tickNext === null) return false;

		if (!cache) {
			val = getVal(quote);
			valPrev = getVal(quotePrev);
			valNext = getVal(quoteNext);
			tick = quote.tick;
			if (quotePrev) tickPrev = quotePrev.tick;
			if (quoteNext) tickNext = quoteNext.tick;
		}

		if (!valPrev && valPrev !== 0) {
			valPrev = 0;
			tickPrev = 0;
		}
		if (!valNext && valNext !== 0) {
			if (val || val === 0) {
				valNext = val;
				usedCache[2] = usedCache[0];
			} else {
				valNext = valPrev;
				usedCache[2] = usedCache[1];
			}
			if (
				id &&
				chart.series[id] &&
				chart.series[id].parameters.extendToEndOfDataSet
			) {
				tickNext = chart.dataSet.length - 1;
			} else {
				tickNext = tickPrev;
			}
		}
		if (!val && val !== 0) {
			val = valNext;
			tick = tickNext;
			usedCache[0] = usedCache[2];
			if (valPrev === 0 && tickPrev === 0) {
				valPrev = val;
				tickPrev = tick;
				usedCache[1] = usedCache[0];
			}
		}

		// The following code will get the pixel value of the price from either the renderer's series cache or the computation.
		// Then it will convert the pixel value back to the price value for the current panel's axis.
		// Using the cache is the only way to go for an overlay.  There is a shortcoming for the overlay though, in that
		// if valPrev or valNext were off the screen, they wouldn't be in the cache and so their y-axis value would be inaccurate.

		var pftv = stx.pixelFromTransformedValue.bind(stx),
			vfp = stx.valueFromPixel.bind(stx);
		val = vfp(
			usedCache[0] ? val : pftv(val, currentPanel, yAxis),
			currentPanel
		);
		valPrev = vfp(
			usedCache[1] ? valPrev : pftv(valPrev, currentPanel, yAxis),
			currentPanel
		);
		valNext = vfp(
			usedCache[2] ? valNext : pftv(valNext, currentPanel, yAxis),
			currentPanel
		);

		var pixelBox = CIQ.convertBoxToPixels(stx, currentPanel.name, box);
		var pixelPoint1 = CIQ.convertBoxToPixels(stx, currentPanel.name, {
			x0: tickPrev,
			y0: valPrev,
			x1: tick,
			y1: val
		});
		var pixelPoint2 = CIQ.convertBoxToPixels(stx, currentPanel.name, {
			x0: tick,
			y0: val,
			x1: tickNext,
			y1: valNext
		});
		if (
			CIQ.boxIntersects(
				pixelBox.x0,
				pixelBox.y0,
				pixelBox.x1,
				pixelBox.y1,
				pixelPoint1.x0,
				pixelPoint1.y0,
				pixelPoint1.x1,
				pixelPoint1.y1,
				"segment"
			) ||
			CIQ.boxIntersects(
				pixelBox.x0,
				pixelBox.y0,
				pixelBox.x1,
				pixelBox.y1,
				pixelPoint2.x0,
				pixelPoint2.y0,
				pixelPoint2.x1,
				pixelPoint2.y1,
				"segment"
			)
		) {
			return Math.min(
				Math.pow(cy - (pixelPoint1.y1 + pixelPoint1.y0) / 2, 2) +
					Math.pow(cx - (pixelPoint1.x1 + pixelPoint1.x0) / 2, 2),
				Math.pow(cy - (pixelPoint2.y1 + pixelPoint2.y0) / 2, 2) +
					Math.pow(cx - (pixelPoint2.x1 + pixelPoint2.x0) / 2, 2)
			);
		}
		return false;
	}

	function getBackground(color, opacity) {
		if (Array.isArray(color)) {
			var grd = "linear-gradient(to right, ";
			var bg = 0,
				len = Math.min(3, color.length);
			for (; bg < len; bg++) {
				grd += color[bg] + " " + Math.round((100 * bg) / len) + "%, ";
				grd += color[bg] + " " + Math.round((100 * (bg + 1)) / len) + "%, ";
			}
			grd += "transparent)";
			return grd;
		}
		if (color == "auto") color = this.defaultColor;
		if (opacity && opacity !== 1)
			color = CIQ.hexToRgba(CIQ.colorToHex(color), parseFloat(opacity));
		return color;
	}

	if (!clearOnly && !this.anyHighlighted && anchorHandles) {
		for (let id in anchorHandles) {
			const anchorHandle = anchorHandles[id];
			if (CIQ.getFromNS(anchorHandle, "sd.signalData.reveal") === false)
				continue;

			if (!this.anyHighlighted) {
				const { sd, currentPixel } = anchorHandle;

				const left = currentPixel - radius;
				const right = currentPixel + radius;
				const panel = this.panels[sd.panel];
				const { top, bottom } = panel.yAxis; // yAxis bottom accounts for x-axis
				const lineIntersects = CIQ.boxIntersects(
					left,
					top,
					right,
					bottom,
					cx,
					cy,
					cx,
					cy
				);

				if (lineIntersects) {
					this.anyHighlighted = true;
					anchorHandle.highlighted = true;
					somethingChanged = true;
					stickyArgs = {
						message: sd.name,
						type: "anchorHandle",
						noDelete: true
					};
					continue;
				}
			}

			if (anchorHandle.highlighted === true) {
				anchorHandle.highlighted = false;
				somethingChanged = true;
			}
		}
	}

	if (!clearOnly && !this.anyHighlighted && chart.dataSegment) {
		var bar = this.barFromPixel(cx);
		if (bar >= 0 && bar < chart.dataSegment.length) {
			var y;
			var pxBox = CIQ.convertBoxToPixels(this, this.currentPanel.name, box);
			var distance = Number.MAX_VALUE;
			if (markers) {
				for (m = 0; m < markers.length; m++) {
					marker = markers[m];
					var mbox = marker.params.box;
					if (!mbox) continue; // Only created when the dataSegment is drawn.
					if (marker.params.panelName !== this.currentPanel.name) continue;
					//If it doesn't exist then it is off the screen and cannot be intersected.
					if (
						CIQ.boxIntersects(
							pxBox.x0,
							pxBox.y0,
							pxBox.x1,
							pxBox.y1,
							mbox.x0,
							mbox.y0,
							mbox.x1,
							mbox.y1
						)
					) {
						var myDist =
							Math.pow(cy - (mbox.y1 + mbox.y0) / 2, 2) +
							Math.pow(cx - (mbox.x1 + mbox.x0) / 2, 2);
						if (myDist <= distance) {
							distance = myDist;
							this.activeMarker = marker;
						}
						this.anyHighlighted = true;
						stickyArgs = {};
						marker.highlight = true;
						this.markerHelper.highlighted.push(marker);
					}
					if (marker.prev != marker.highlight) somethingChanged = true;
				}
			}
			if (!this.anyHighlighted) {
				distance = Number.MAX_VALUE;
				var closestMatch = null;
				for (n in this.overlays) {
					if (markers && this.markerHelper.highlighted.length) break;

					o = this.overlays[n];

					// check to make sure not study event
					if (o.signalData && !o.signalData.reveal) continue;

					// check to make sure not disabled
					if (o.disabled) continue;

					// check handles before this to make sure to set highlight state to false where appropriate
					if (o.panel != this.currentPanel.name) continue;

					//custom highlight detection
					if (o.study.isHighlighted === false) continue;
					else if (typeof o.study.isHighlighted == "function") {
						var highlighted = o.study.isHighlighted(this, cx, cy);
						if (highlighted) {
							var closestOutput =
								highlighted === true ? o.study.name : highlighted;
							closestMatch = { o: o, out: closestOutput };
							distance = 0;
							break;
						}
						continue;
					}

					var quote = chart.dataSegment[bar];
					if (!quote) continue;

					for (var out in o.outputMap) {
						var oDist = isOverlayIntersecting.call(
							this,
							bar,
							box,
							out,
							o.getYAxis(this)
						);
						if (oDist !== false && oDist <= distance) {
							closestMatch = { o: o, out: out };
							distance = oDist;
						}
					}
				}
				for (n in chart.seriesRenderers) {
					if (this.highlightedDataSetField) break;
					var renderer = chart.seriesRenderers[n];
					var rendererPanel = renderer.params.panel;
					if (!this.leftClickPinTooltip && renderer == this.mainSeriesRenderer)
						continue;
					if (
						!renderer.params.highlightable &&
						!this.currentVectorParameters.vectorType
					)
						continue;
					if (rendererPanel != this.currentPanel.name) continue;
					for (m = 0; m < renderer.seriesParams.length; m++) {
						series = renderer.seriesParams[m];
						if (series.disabled) continue;
						var fullField = series.field || this.defaultPlotField || "Close";
						if (series.symbol && series.subField)
							fullField += "-->" + series.subField;
						var yAxis = renderer.params.yAxis;
						if (!yAxis && rendererPanel)
							yAxis = this.panels[rendererPanel].yAxis;
						if (renderer.params.step && bar > 0) {
							// In a step series we also need to check for intersection with
							// the vertical bar (the step) that connects two points
							if (!renderer.caches[series.id]) continue;
							y = renderer.caches[series.id][bar];
							if (!y && y !== 0) continue;
							var py = renderer.caches[series.id][bar - 1];
							if (
								((py || py === 0) && cy + radius >= y && cy - radius <= py) ||
								(cy - radius <= y && cy + radius >= py)
							) {
								closestMatch = { s: series, fullField: fullField };
								break;
							}
						} else {
							var rDist = isOverlayIntersecting.call(
								this,
								bar,
								box,
								fullField,
								yAxis,
								renderer,
								series.id
							);
							if (rDist !== false && rDist <= distance) {
								closestMatch = { s: series, fullField: fullField };
								distance = rDist;
							}
						}
					}
				}
				if (closestMatch) {
					this.highlightedPlot = closestMatch;
					o = closestMatch.o;
					if (o) {
						closestMatch.type = "study";
						if (o.name != o.panel) this.anyHighlighted = true;
						o.highlight = closestMatch.out;
						this.highlightedDataSetField = closestMatch.out;
					} else {
						closestMatch.type = "series";
						this.anyHighlighted = true;
						closestMatch.s.highlight = true;
						this.highlightedDataSetField = closestMatch.fullField;
					}
				}
			}
		}
	}
	var highlightedDraggable;
	var drag = this.preferences.dragging;

	var yAxisToHighlight;

	for (n in this.overlays) {
		o = this.overlays[n];
		if (o.highlight) {
			this.anyHighlighted = true;
			var display = o.inputs.display || o.name;
			display = this.translateIf(display);
			stickyArgs = {
				message: display,
				noDelete: o.permanent,
				noEdit: !o.editFunction,
				noText: !o.textFunction,
				noDrag: o.undraggable && o.undraggable(this),
				type: "study",
				backgroundColor: getBackground(
					chart.legendColorMap[o.name] && chart.legendColorMap[o.name].color
				)
			};
			drawingToMeasure = null;
			if (drag === true || (drag && drag.study)) {
				if (!o.undraggable(this)) highlightedDraggable = o;
			}

			// Find corresponding y-axis
			yAxisToHighlight = o.getYAxis(this);
		}
		if (o.prev != o.highlight) somethingChanged = true;
	}

	for (n in chart.seriesRenderers) {
		var r2 = chart.seriesRenderers[n];
		var bColor = r2.params.yAxis ? r2.params.yAxis.textStyle : null;
		for (var m2 = 0; m2 < r2.seriesParams.length; m2++) {
			series = r2.seriesParams[m2];
			if (r2.params.highlightable && series.highlight) {
				this.anyHighlighted = true;
				var bgColor =
					(chart.legendColorMap[n] && chart.legendColorMap[n].color) ||
					series.color ||
					bColor;
				bgColor = getBackground(bgColor, series.opacity);
				stickyArgs = {
					message: series.display || series.symbol,
					backgroundColor: bgColor,
					noDelete: r2.params.permanent || series.permanent,
					noDrag: r2.undraggable && r2.undraggable(this),
					type: "series"
				};
				drawingToMeasure = null;
				if (drag === true || (drag && drag.series)) {
					highlightedDraggable = r2;
					r2.params.highlight = true;
				}

				// Find corresponding y-axis
				yAxisToHighlight = r2.getYAxis(this);
			}
			if (series.prev != series.highlight) somethingChanged = true;
		}
	}

	for (n in this.plugins) {
		var plugin = this.plugins[n];
		var pluginHighlights = {};
		if (plugin.findHighlights) {
			pluginHighlights = plugin.findHighlights(this, isTap, clearOnly);
			if (pluginHighlights.somethingChanged) somethingChanged = true;
			if (pluginHighlights.anyHighlighted) {
				this.anyHighlighted = true;
				stickyArgs = pluginHighlights.stickyArgs || {};
			}
		}
	}

	var myPanel = this.whichPanel(cy);
	var myYAxis = this.whichYAxis(myPanel, cx);

	if (!yAxisToHighlight) yAxisToHighlight = myYAxis;
	if (this.currentBaseline)
		yAxisToHighlight = this.currentBaseline.getYAxis(this);

	// Highlight yAxisToHighlight if applicable
	if (yAxisToHighlight) {
		if (!yAxisToHighlight.highlight) somethingChanged = true;
		yAxisToHighlight.highlight = true;
	}

	// Collect all y-axes in array for easy referencing
	// Collect all in case you move from highlighting axis across panels
	var allYAxes = [];
	for (var p in this.panels) {
		allYAxes = allYAxes
			.concat(this.panels[p].yaxisLHS)
			.concat(this.panels[p].yaxisRHS);
	}

	for (n = 0; n < allYAxes.length; n++) {
		if (yAxisToHighlight == allYAxes[n] && !clearOnly) continue;
		if (allYAxes[n].highlight) somethingChanged = true;
		allYAxes[n].highlight = false;
	}

	if ((drag === true || (drag && drag.yaxis)) && myYAxis && !myYAxis.noDraw) {
		this.anyHighlighted = true;
		highlightedDraggable = myYAxis;
		stickyArgs = {};
	}

	if (somethingChanged) {
		this.draw();
		stickyArgs.panel = myPanel;
		if (this.anyHighlighted && !this.grabStartYAxis) stickyArgs.panel = myPanel;
		else stickyArgs = {};
		this.displaySticky(stickyArgs);
		this.clearMeasure();
		if (drawingToMeasure) drawingToMeasure.measure();
	}

	if (!this.anyHighlighted) {
		this.setMeasure();
	} else if (this.controls.mSticky) {
		if (stickyArgs && stickyArgs.positioner) {
			stickyArgs.positioner.call(this, this.controls.mSticky);
		} else {
			this.positionSticky(this.controls.mSticky);
		}
	}

	if (highlightedDraggable && myPanel && !myPanel.noDrag) {
		if (this.longHoldTookEffect && !this.cancelLongHold) {
			if (highlightedDraggable.params) {
				// series, highlight relatives
				if (highlightedDraggable.params.dependentOf) {
					// series, highlight relatives
					highlightedDraggable =
						chart.seriesRenderers[highlightedDraggable.params.dependentOf];
					highlightedDraggable.params.highlight = true;
				}
				for (n in chart.seriesRenderers) {
					if (
						chart.seriesRenderers[n].params.dependentOf ==
						highlightedDraggable.params.name
					) {
						chart.seriesRenderers[n].params.highlight = true;
					}
				}
			}
			this.highlightedDraggable = highlightedDraggable;
			if (highlightedDraggable.getDependents) {
				// study, highlight dependents
				var dependents = highlightedDraggable.getDependents(this, true);
				for (n in this.overlays) {
					o = this.overlays[n];
					if (dependents.indexOf(o) > -1) o.highlight = true;
				}
			}
		}
		if (!stickyArgs.noDrag) this.container.classList.add("stx-draggable");
	} else {
		this.container.classList.remove("stx-draggable");
	}

	this.highlightedDataSetField = this.adjustHighlightedDataSetField(
		this.highlightedDataSetField
	);
	this.displayDrawOK();
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * This function is called when the user right clicks on a highlighted overlay, series or drawing.<br>
 * Calls deleteHighlighted() which calls rightClickOverlay() for studies.
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias rightClickHighlighted
 * @example
 * stxx.prepend("rightClickHighlighted", function(){
 * 	console.log('do nothing on right click');
 * 	return true;
 * });
 */
CIQ.ChartEngine.prototype.rightClickHighlighted = function () {
	if (this.runPrepend("rightClickHighlighted", arguments)) return;
	this.deleteHighlighted(true);
	this.runAppend("rightClickHighlighted", arguments);
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Removes all highlighted overlays, series or drawings.
 *
 * @param {boolean} callRightClick When true, call the right click method for the given highlight:
 * - Drawing highlight calls {@link CIQ.ChartEngine.AdvancedInjectable#rightClickDrawing}
 * - Overlay study highlight calls {@link CIQ.ChartEngine.AdvancedInjectable#rightClickOverlay}
 * @param {boolean} forceEdit Skip the context menu and begin editing immediately. Usually for
 * 		touch devices.
 * @param {boolean} forceText Skip the context menu and begin text edit immediately. Usually for
 * 		touch devices.
 *
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias deleteHighlighted
 * @since
 * - 4.1.0 Removes a renderer from the chart if it has no series attached to it.
 * - 6.2.0 Calls {@link CIQ.ChartEngine.AdvancedInjectable#rightClickDrawing} when a drawing is
 * 		highlighted and the `callRightClick` paramenter is true.
 * - 8.6.0 Add `forceText` flag.
 */
CIQ.ChartEngine.prototype.deleteHighlighted = function (
	callRightClick,
	forceEdit,
	forceText
) {
	if (this.runPrepend("deleteHighlighted", arguments)) return;
	this.cancelTouchSingleClick = true;
	CIQ.clearCanvas(this.chart.tempCanvas, this);
	var canDeleteAll = this.bypassRightClick === false;
	if (canDeleteAll || !this.bypassRightClick.drawing) {
		for (var i = this.drawingObjects.length - 1; i >= 0; i--) {
			var drawing = this.drawingObjects[i];

			if (!drawing.highlighted) continue;

			if (callRightClick) {
				this.rightClickDrawing(drawing, forceEdit, forceText);
			} else if (!drawing.permanent) {
				var dontDeleteMe = drawing.abort();
				if (!dontDeleteMe) {
					var before = this.exportDrawings();
					this.drawingObjects.splice(i, 1);
					this.undoStamp(before, this.exportDrawings());
				}
				this.changeOccurred("vector");
			}
		}
	}
	if (canDeleteAll || !this.bypassRightClick.study) {
		for (var name in this.overlays) {
			var o = this.overlays[name];
			if ((o.overlay || o.underlay) && o.highlight && !o.permanent) {
				if (callRightClick || forceEdit)
					this.rightClickOverlay(name, forceEdit);
				else this.removeOverlay(name);
			}
		}
	}

	var chart = this.currentPanel && this.currentPanel.chart;
	if (chart && (canDeleteAll || !this.bypassRightClick.series)) {
		for (var r in chart.seriesRenderers) {
			var renderer = chart.seriesRenderers[r];
			if (renderer.params.highlightable && !renderer.params.permanent) {
				var rPanel = this.panels[renderer.params.panel];
				var yAxisName = rPanel && rPanel.yAxis.name;
				for (var sp = renderer.seriesParams.length - 1; sp >= 0; sp--) {
					var series = renderer.seriesParams[sp];
					if (
						(renderer.params.highlight || series.highlight) &&
						!series.permanent
					) {
						renderer.removeSeries(series.id);
						if (renderer.seriesParams.length < 1) {
							this.removeSeriesRenderer(renderer);
							if (renderer.params.name == yAxisName) {
								this.electNewPanelOwner(renderer.params.panel);
							} else {
								this.checkForEmptyPanel(renderer.params.panel);
								var rendererAxis = this.getYAxisByName(
									rPanel,
									renderer.params.name
								);
								if (rendererAxis) {
									rendererAxis.name =
										rendererAxis.studies[0] || rendererAxis.renderers[1];
								}
							}
						}
					}
				}
			}
		}
	}

	this.draw();
	if (!callRightClick && !forceEdit) this.resizeChart();
	this.clearMeasure();
	var mSticky = this.controls.mSticky;
	if (mSticky) {
		mSticky.style.display = "none";
		mSticky.querySelector(".mStickyInterior").innerHTML = "";
	}
	this.runAppend("deleteHighlighted", arguments);
};

/**
 * Displays the "ok to drag" div and the study/series which is highlighted, near the crosshairs.
 * @param {boolean} [soft] True to just set the position of an already displayed div, otherwise, toggles display style based on whether long press was completed.
 * @memberof CIQ.ChartEngine
 * @since 7.1.0
 */
CIQ.ChartEngine.prototype.displayDragOK = function (soft) {
	var stx = this;
	function showText(control) {
		var text = stx.translateIf(
			control.querySelector(".field").getAttribute("text")
		);
		var hoveredYAxis = stx.whichYAxis(stx.whichPanel(stx.cy), stx.cx, stx.cy);
		if (hoveredYAxis && hoveredYAxis.dropzone == "all") {
			text += "-->" + stx.translateIf(hoveredYAxis.name);
		}
		control.querySelector(".field").innerHTML = text;
	}
	var dragControl = this.controls.dragOk;
	if (dragControl) {
		if (!soft) {
			if (!this.tapForHighlighting || !this.touching || this.anyHighlighted) {
				this.findHighlights(this.highlightViaTap); // trigger highlighting
			}
		}
		var draggableObject = this.highlightedDraggable; // set by findHighlights
		var dragNotAllowed =
			draggableObject &&
			draggableObject.undraggable &&
			draggableObject.undraggable(this);
		var cx = this.cx,
			cy = this.cy;

		var showDragControl =
			draggableObject && !dragNotAllowed && this.longHoldTookEffect;

		if (soft) {
			if (showDragControl && this.insideChart)
				dragControl.style.display = "inline-block";
		} else {
			if (showDragControl && !this.cancelLongHold) {
				var baseText =
					(draggableObject.inputs && draggableObject.inputs.display) ||
					(draggableObject.params &&
						(draggableObject.params.display || draggableObject.params.name)) ||
					draggableObject.name;
				dragControl.querySelector(".field").setAttribute("text", baseText);
				showText.call(this, dragControl);
				dragControl.style.display = "inline-block";
				this.draw(); // trigger opacity change
				this.displaySticky();
				if (this.grabStartYAxis)
					this.container.classList.replace("stx-drag-chart", "stx-drag-axis");
				else
					this.container.classList.replace("stx-drag-chart", "stx-drag-series");
			} else {
				dragControl.style.display = "none";
				this.draw();
				this.container.classList.remove("stx-drag-series");
				this.container.classList.remove("stx-drag-axis");
				for (var panel in this.panels) {
					var classList = this.panels[panel].subholder.classList;
					classList.remove("dropzone"); // IE 11 won't let you pass multiple classes
					classList.remove("all");
					classList.remove("left");
					classList.remove("right");
					classList.remove("top");
					classList.remove("bottom");
					var y;
					for (y = 0; y < this.panels[panel].yaxisLHS.length; y++) {
						this.panels[panel].yaxisLHS[y].dropzone = null;
					}
					for (y = 0; y < this.panels[panel].yaxisRHS.length; y++) {
						this.panels[panel].yaxisRHS[y].dropzone = null;
					}
				}
			}
			this.draw();
		}
		if (draggableObject) {
			var top = cy + dragControl.offsetHeight;
			var left = Math.max(0, cx - dragControl.offsetWidth);
			dragControl.style.top = top + "px";
			dragControl.style.left = left + "px";
			showText.call(this, dragControl);
		}
	}
};

/**
 * Displays the "ok to draw" icon and the field which is highlighted, near the crosshairs.
 *
 * In general, any series and most studies can have a drawing placed on it.
 * When such a plot is highlighted, this function will show the [drawOk chart control]{@link CIQ.ChartEngine.htmlControls}
 * and display the field being highlighted.
 * @memberof CIQ.ChartEngine
 * @since
 * - 7.0.0
 * - 8.4.0 Works with any drawing.
 */
CIQ.ChartEngine.prototype.displayDrawOK = function () {
	var drawable = this.controls.drawOk;
	if (drawable && CIQ.Drawing) {
		var drawing = CIQ.Drawing[this.currentVectorParameters.vectorType];
		if (drawing) drawing = new drawing();
		if (
			this.highlightedDataSetField &&
			drawing &&
			drawing.isAllowed(this, this.highlightedDataSetField)
		) {
			drawable.style.display = "inline-block";
			var top = this.cy + drawable.offsetHeight;
			var left = this.cx - drawable.offsetWidth;
			drawable.style.top = top + "px";
			drawable.style.left = left + "px";
			drawable.querySelector(".field").innerHTML = this.translateIf(
				this.highlightedDataSetField
			);
		} else drawable.style.display = "none";
	}
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Zooms (vertical swipe / mousewheel) or pans (horizontal swipe) the chart based on a mousewheel event.
 *
 * Uses for following for zooming:
 *  -  {@link CIQ.ChartEngine#zoomIn}
 *  -  {@link CIQ.ChartEngine#zoomOut}
 *
 * Uses the following for panning:
 *  -  {@link CIQ.ChartEngine#mousemoveinner}
 *
 * Circumvented if:
 * - {@link CIQ.ChartEngine#allowZoom} is set to `false`
 * - {@link CIQ.ChartEngine#captureMouseWheelEvents} is set to `false`
 * - on a vertical swipe and {@link CIQ.ChartEngine#allowSideswipe} is `false`
 *
 * See the following options:
 * - {@link CIQ.ChartEngine#reverseMouseWheel}
 * - {@link CIQ.ChartEngine#mouseWheelAcceleration}
 *
 * @param  {Event} e		  The event
 * @return {boolean}			Returns false if action is taken
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias mouseWheel
 */
CIQ.ChartEngine.prototype.mouseWheel = function (e) {
	if (this.runPrepend("mouseWheel", arguments)) return;
	if (e.preventDefault) e.preventDefault();
	if (this.openDialog !== "") return; // don't zoom when dialog or menu is open
	var deltaX = e.deltaX,
		deltaY = e.deltaY;

	/*
		// OSX trackpad is very sensitive since it accommodates diagonal
		// motion which is not relevant to us. So we ignore any changes
		// in direction below the threshold time value
		var threshold=50; //ms
		if(Date.now()-this.lastMouseWheelEvent<threshold){
			if(this.lastMove=="horizontal") deltaY=0;
			else deltaX=0;
		}*/
	if (Math.abs(deltaY) > Math.abs(deltaX)) deltaX = 0;
	else deltaY = 0;

	this.lastMouseWheelEvent = Date.now();
	if (Math.abs(deltaX) === 0 && Math.abs(deltaY) === 0) return;

	if (e.shiftKey && deltaY) {
		deltaX = deltaY;
		deltaY = 0;
	}

	var multiplier;
	if (this.allowSideswipe && deltaX !== 0) {
		this.lastMove = "horizontal";
		var delta = deltaX;
		this.grabbingScreen = true;
		if (!this.currentPanel) this.currentPanel = this.chart.panel;
		this.grabStartX = CIQ.ChartEngine.crosshairX;
		this.grabStartY = CIQ.ChartEngine.crosshairY;
		this.grabStartScrollX = this.chart.scroll;
		this.grabStartScrollY = this.currentPanel.yAxis.scroll;
		this.grabStartMicropixels = this.micropixels;
		this.grabStartPanel = this.currentPanel;
		// Calculate the percentage change to the chart. Arrived at heuristically, cube root of the mousewheel distance.
		// The multipliers are adjusted to take into consideration reversed compounding rates between a zoomin and a zoomout
		if (this.mouseWheelAcceleration) {
			multiplier = Math.max(Math.pow(Math.abs(delta), 0.3), 1);
			delta *= multiplier;
		}
		this.mousemoveinner(
			CIQ.ChartEngine.crosshairX - delta,
			CIQ.ChartEngine.crosshairY
		);
		CIQ.ChartEngine.crosshairX = this.crosshairX = e.clientX;
		this.updateChartAccessories();
		this.grabbingScreen = false;
		return;
	}
	this.lastMove = "vertical";
	if (!this.allowZoom || (this.activeDrawing && !this.allowDrawingZoom)) return;
	if (!this.displayInitialized) return;
	/* originally added to address a magic mouse issue - removing this code because it is affecting new Macs which seem to come back for more zooming immediately causing uneven zooming.
		if(this.wheelInMotion) return;
		this.wheelInMotion=true;
		setTimeout(function(self){return function(){self.wheelInMotion=false;};}(this), 40);
		*/
	if (!deltaY) {
		if (CIQ.wheelEvent == "mousewheel") {
			deltaY = (-1 / 40) * e.wheelDelta;
			if (e.wheelDeltaX) deltaX = (-1 / 40) * e.wheelDeltaX;
		} else {
			deltaY = e.detail;
		}
	}
	if (typeof e.deltaMode == "undefined")
		e.deltaMode = e.type == "MozMousePixelScroll" ? 0 : 1;

	//var distance=e.deltaX;
	//if(!distance) distance=e.deltaY;
	var distance = -deltaY;
	if (e.deltaMode == 1) {
		// 1 is line mode so we approximate the distance in pixels, arrived at through trial and error
		distance *= 33;
	}

	var pctIn = null;
	var pctOut = null;
	// Calculate the percentage change to the chart. Arrived at heuristically, cube root of the mousewheel distance.
	// The multipliers are adjusted to take into consideration reversed compounding rates between a zoomin and a zoomout
	if (this.mouseWheelAcceleration) {
		multiplier = Math.max(Math.pow(Math.abs(distance), 0.3), 1);
		pctIn = Math.max(Number.MIN_VALUE, 1 - 0.1 * multiplier);
		pctOut = 1 / pctIn;
	}

	this.zoomInitiatedByMouseWheel = true;

	if (distance > 0) {
		if (this.reverseMouseWheel) this.zoomOut(null, pctOut);
		else this.zoomIn(null, pctIn);
	} else if (distance < 0) {
		if (this.reverseMouseWheel) this.zoomIn(null, pctIn);
		else this.zoomOut(null, pctOut);
	}
	if (this.runAppend("mouseWheel", arguments)) return;
	return false;
};

/**
 * This code prevents the browser context menu from popping up when right-clicking on a drawing or overlay.
 *
 * See [rightClickEventListener]{@link CIQ.ChartEngine~rightClickEventListener}.
 *
 * @param {object} [e=event] Event
 * @return {boolean}
 *
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.handleContextMenu = function (e) {
	var containers = CIQ.ChartEngine.registeredContainers;
	for (var i = 0; i < containers.length; i++) {
		if (e.target.ownerDocument !== containers[i].ownerDocument) continue;
		var stx = containers[i].stx;
		if (stx) {
			if (stx.anyHighlighted) {
				if (e.preventDefault) e.preventDefault();
				return false;
			}
		}
	}
};

CIQ.ChartEngine.registerGlobalEvent(
	"contextmenu",
	CIQ.ChartEngine.handleContextMenu
);

/**
 * Defines raw html for the chart controls.
 *
 * These controls can be overridden by manually placing HTML elements in the chart container with the same ID.
 *
 * To completely disable a chart control, programmatically set `controls[controlID]=null` where controlID is the control to disable.
 * You can also set the main `htmlControls` object to null to disable all controls at once.
 * @example
 * var stxx=new CIQ.ChartEngine({container:document.querySelector(".chartContainer"), controls: {chartControls:null}});
 * @example
 * // before calling loadChart(). Disables all controls
 * stxx.controls=null;
 * @example
 * // before calling loadChart(). Disables only the chartControls (zoom on and out buttons)
 * stxx.controls["chartControls"]=null;
 * @type {object}
 * @static
 * @memberof CIQ.ChartEngine
 * @since 5.2.0 Any id can be set to null to disable
 */
CIQ.ChartEngine.htmlControls = {
	/**
	 * controlID for the Annotation Save button (class="stx-btn stx_annotation_save").
	 * @alias CIQ.ChartEngine.htmlControls[`annotationSave`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	annotationSave:
		'<span class="stx-btn stx_annotation_save" style="display: none;"></span>',
	/**
	 * controlID for the Annotation Cancel button (class="stx-btn stx_annotation_cancel").
	 * @alias CIQ.ChartEngine.htmlControls[`annotationCancel`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	annotationCancel:
		'<span class="stx-btn stx_annotation_cancel" style="display: none; margin-left:10px;"></span>',
	/**
	 * controlID for the Trash Can button / Series delete panel (class="mSticky"). Also see {@link CIQ.ChartEngine#displaySticky}
	 * @alias CIQ.ChartEngine.htmlControls[`mSticky`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 * @example
	 * // Disable the tooltip that appears when hovering over an overlay (drawing, line study, etc.).
	 * stxx.controls["mSticky"]=null;
	 */
	mSticky: `
		<div class="stx_sticky">
			<span class="label">
				<span class="mStickyThumbnail"></span>
				<span class="mStickyInterior"></span>
			</span>
			<span class="mousePinTooltip">(left-click to pin tooltip)</span>
			<span class="mStickyRightClick">
				<span class="overlayText stx-btn" style="display:none">
					<span>&nbsp;</span>
				</span>
				<span class="overlayEdit stx-btn" style="display:none">
					<span>&nbsp;</span>
				</span>
				<span class="overlayTrashCan stx-btn" style="display:none">
					<span>&nbsp;</span>
				</span>
				<span class="mouseDeleteInstructions">
					<span>(</span>
					<span class="mouseDeleteText">right-click to delete</span>
					<span class="mouseManageText">right-click to manage</span>
					<span>)</span>
				</span>
			</span>
			<span class="stickyLongPressText">(long-press to drag)</span>
			<span class="customInstructions">
				<span>(</span>
				<span class="dragAnchorText" type="anchorHandle">
					drag to change anchor time
				</span>
				<span>)</span>
			</span>
		</div>
	`,
	/**
	 * Indicator that it is OK to draw average lines on this plot line
	 * @alias CIQ.ChartEngine.htmlControls[`drawOk`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 * @since 7.0.0
	 */
	drawOk:
		'<div class="stx_draw_ok"><div class="icon"></div><div class="field"></div></div>',
	/**
	 * Indicator that it is OK to move a study or series
	 * @alias CIQ.ChartEngine.htmlControls[`dragOk`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 * @since 7.1.0
	 */
	dragOk:
		'<div class="stx_drag_ok"><div class="icon"></div><div class="field"></div></div>',
	/**
	 * controlID for the Horizontal Crosshair line (class="stx_crosshair stx_crosshair_x").
	 * @alias CIQ.ChartEngine.htmlControls[`crossX`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	crossX:
		'<div class="stx_crosshair stx_crosshair_x" style="display: none;"></div>',
	/**
	 * controlID for the Vertical Crosshair line (class="stx_crosshair stx_crosshair_y").
	 * @alias CIQ.ChartEngine.htmlControls[`crossY`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	crossY:
		'<div class="stx_crosshair stx_crosshair_y" style="display: none;"></div>',
	/**
	 * controlID for the zoom-in and zoom-out buttons (class="stx_chart_controls").
	 * @alias CIQ.ChartEngine.htmlControls[`chartControls`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	chartControls: `<div class="stx_chart_controls" style="display: none;">
		<div class="chartSize">
			<span class="stx-zoom-out" role="button" aria-label="Zoom Out"></span>
			<span class="stx-zoom-in" role="button" aria-label="Zoom In"></span>
		</div></div>`,
	/**
	 * controlID for the home button (class="stx_jump_today home").
	 * The button goes away if you are showing the most current data. See example to manually turn it off.
	 * You can call `stxx.home();` programmatically.	 See {@link CIQ.ChartEngine#home} for more details
	 * @alias CIQ.ChartEngine.htmlControls[`home`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 * @example
	 * // disable the home button
	 * var stxx=new CIQ.ChartEngine({container:document.querySelector(".chartContainer"), layout:{"candleWidth": 16, "crosshair":true}});
	 * stxx.controls["home"]=null;
	 */
	home: '<div class="stx_jump_today" role="button" aria-label="Home" style="display:none"><span></span></div>',
	/**
	 * controlID for div which floats along the x-axis with the crosshair date (class="stx-float-date").
	 * @alias CIQ.ChartEngine.htmlControls[`floatDate`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	floatDate: '<div class="stx-float-date" style="visibility: hidden;"></div>',
	/**
	 * controlID for div which controls the handle to resize panels (class="stx-ico-handle").
	 * @alias CIQ.ChartEngine.htmlControls[`handleTemplate`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 * @example
	 * // example to hide the handle and prevent resizing of panels
	 * .stx-ico-handle {
	 *		display: none;
	 * }
	 */
	handleTemplate:
		'<div class="stx-ico-handle" style="display: none;"><span></span></div> ',
	/**
	 * controlID for the div which hosts the panel title (symbol name, study name ) and the study control icons on the on the upper left hand corner of each panel (class="stx-panel-control")
	 * This control can not be disabled, but can be manipulated using the corresponding CSS style classes.
	 * On the main chart panel, `stx-chart-panel` is added to the class definition ( in addition to `stx-panel-title` which just controls the tile) so you can manipulate the entire chart controls section, separately from the rest of the study panel controls.
	 *
	 * @example
	 * // example to hide the chart symbol title
	 * .stx-panel-control.stx-chart-panel .stx-panel-title{
	 * 		display:none;
	 * }
	 *
	 * // for backwards compatibility, this is still supported:
	 * .chart-title{
	 *		display	: none;
	 *	}
	 *
	 * @example
	 * // example to hide all panels titles
	 * .stx-panel-control .stx-panel-title{
	 * 		display:none;
	 * }
	 *
	 * @alias CIQ.ChartEngine.htmlControls[`iconsTemplate`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	iconsTemplate:
		'<div class="stx-panel-control"><div class="stx-panel-title"></div><div class="stx-panel-legend"></div><div class="stx-btn-panel"><span class="stx-ico-up"></span></div><div class="stx-btn-panel"><span class="stx-ico-focus"></span></div><div class="stx-btn-panel"><span class="stx-ico-down"></span></div><div class="stx-btn-panel"><span class="stx-ico-edit"></span></div><div class="stx-btn-panel"><span class="stx-ico-close"></span></div></div>',
	/**
	 * controlID for grabber which sits to right of baseline so it can be moved.
	 * @alias CIQ.ChartEngine.htmlControls[`baselineHandle`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 */
	baselineHandle:
		'<div class="stx-baseline-handle" style="display: none;"></div>',
	/**
	 * Holds notifications displayed by the chart. See {@link CIQ.ChartEngine#displayNotification}.
	 *
	 * @alias CIQ.ChartEngine.htmlControls[`notificationTray`]
	 * @type string
	 * @memberof CIQ.ChartEngine.htmlControls
	 * @since 8.0.0
	 */
	notificationTray:
		'<div class="stx_notification_tray"><template><div><span class="icon"></span><span class="message"></span></div></template></div>'
};

/**
 * Appends additional chart controls and attaches a click event handler.
 *
 * @param {string} controlClass CSS class to attach to the control element.
 * @param {string} controlLabel Descriptive name for the control; appears in tooltip.
 * @param {function} clickHandler Called when the control is selected.
 * @return {node} Reference to the new control element.
 *
 * @memberof CIQ.ChartEngine
 * @since 7.3.0
 */
CIQ.ChartEngine.prototype.registerChartControl = function (
	controlClass,
	controlLabel,
	clickHandler
) {
	var controls = this.controls;
	if (!controls || !controls.chartControls) return;
	if (controls.chartControls.querySelector("." + controlClass)) return;
	var customButton = null;
	var zoomInControl = controls.chartControls.querySelector(".stx-zoom-in");
	if (zoomInControl) {
		customButton = document.createElement("span");
		customButton.ariaLabel = controlLabel;
		customButton.role = "button";
		customButton.innerHTML =
			'<div class="stx-tooltip" aria-hidden="true">' + controlLabel + "</div>";
		customButton.className = "stx-chart-control-button " + controlClass;
		zoomInControl.parentNode.appendChild(customButton);

		if (clickHandler) {
			CIQ.safeClickTouch(customButton, clickHandler, { keyboardClick: true });
		}

		return customButton;
	}
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Zooms the chart out. The chart is zoomed incrementally by the percentage indicated each time this is called.
 * @param  {Event} e The mouse click event, if it exists (from clicking on the chart control)
 * @param  {number} pct The percentage, **in decimal equivalent**, to zoom out the chart. Default is 1/0.7 (~1.42), to reverse the 0.7 (30%) multiplier used in {@link CIQ.ChartEngine.ChartEngine#zoomIn}
 * @example
 * // 30% zoom adjustment
 * zoomOut(null, 1.3);
 * @memberof CIQ.ChartEngine
 * @since 4.0.0 If both {@link CIQ.ChartEngine.Chart#allowScrollPast} and {@link CIQ.ChartEngine.Chart#allowScrollFuture} are set to false, the zoom operation will stop mid animation to prevent white space from being created.
 */
CIQ.ChartEngine.prototype.zoomOut = function (e, pct) {
	if (this.runPrepend("zoomOut", arguments)) return;
	if (this.preferences.zoomOutSpeed) pct = this.preferences.zoomOutSpeed;
	else if (!pct) pct = 1 / 0.7;
	if (e && e.preventDefault) e.preventDefault();
	this.cancelTouchSingleClick = true;

	var self = this;
	function closure(chart) {
		return function (candleWidth) {
			self.zoomSet(candleWidth, chart);
			if (self.animations.zoom.hasCompleted) {
				if (self.runAppend("zoomOut", arguments)) return;
				self.changeOccurred("layout");
				if (self.continuousZoom) self.continuousZoom.execute(true);
			}
		};
	}

	for (var chartName in this.charts) {
		var chart = this.charts[chartName];

		var newTicks = (chart.width * pct) / this.layout.candleWidth;
		if (
			chart.allowScrollFuture === false &&
			chart.allowScrollPast === false &&
			newTicks > chart.dataSet.length
		) {
			// make sure we keep candles big enough to show all data so no white space is created on either side.
			newTicks = chart.dataSet.length;
		}
		var newCandleWidth = this.chart.width / newTicks;

		this.layout.setSpan = null;
		this.layout.range = null;
		this.animations.zoom.run(
			closure(chart),
			this.layout.candleWidth,
			newCandleWidth,
			false,
			this.ownerWindow
		);
	}
};

/**
 * <span class="injection">INJECTABLE</span>
 *
 * Zooms the chart in. The chart is zoomed incrementally by the percentage indicated each time this is called.
 * @param  {Event} e The mouse click event, if it exists (from clicking on the chart control)
 * @param  {number} pct The percentage, **in decimal equivalent**, to zoom in the chart. Default is 0.7 (30%)
 * @example
 * // 30% zoom adjustment
 * zoomIn(null, 0.7);
 * @memberof CIQ.ChartEngine
 */
CIQ.ChartEngine.prototype.zoomIn = function (e, pct) {
	if (this.runPrepend("zoomIn", arguments)) return;
	if (this.preferences.zoomInSpeed) pct = this.preferences.zoomInSpeed;
	else if (!pct) pct = 0.7;
	if (e && e.preventDefault) e.preventDefault();
	this.cancelTouchSingleClick = true;

	var self = this;
	function closure(chart) {
		return function (candleWidth) {
			self.zoomSet(candleWidth, chart);
			if (self.animations.zoom.hasCompleted) {
				if (self.runAppend("zoomIn", arguments)) return;
				self.changeOccurred("layout");
				if (self.continuousZoom) self.continuousZoom.execute();
			}
		};
	}

	for (var chartName in this.charts) {
		var chart = this.charts[chartName];

		var newTicks = (chart.width * pct) / this.layout.candleWidth;
		// At some point the zoom percentage compared to the bar size may be too small, we get stuck at the same candle width.
		// (because we ceil() and 0.5 candle when we set the maxTicks in setCandleWidth()).
		// So we want to force a candle when this happens.
		if (chart.maxTicks - newTicks < 1) newTicks = chart.maxTicks - 1;
		if (newTicks < this.minimumZoomTicks) newTicks = this.minimumZoomTicks;
		var newCandleWidth = this.chart.width / newTicks;

		this.layout.setSpan = null;
		this.layout.range = null;
		this.animations.zoom.run(
			closure(chart),
			this.layout.candleWidth,
			newCandleWidth,
			false,
			this.ownerWindow
		);
	}
};

/**
 * <span class="injection">INJECTABLE</span>
 * <span class="animation">Animation Loop</span>
 *
 * Registers mouse events for the crosshair elements (to prevent them from picking up events)
 * @memberof CIQ.ChartEngine.AdvancedInjectable#
 * @alias createCrosshairs
 */
CIQ.ChartEngine.prototype.createCrosshairs = function () {
	if (this.runPrepend("createCrosshairs", arguments)) return;
	if (!this.manageTouchAndMouse || this.mainSeriesRenderer.nonInteractive)
		return;

	var crossX = this.controls.crossX,
		crossY = this.controls.crossY;
	if (crossX) {
		if (!crossX.onmousedown) {
			crossX.onmousedown = function (e) {
				if (e.preventDefault) e.preventDefault();
				return false;
			};
		}
	}

	if (crossY) {
		if (!crossY.onmousedown) {
			crossY.onmousedown = function (e) {
				if (e.preventDefault) e.preventDefault();
				return false;
			};
		}
	}

	this.runAppend("createCrosshairs", arguments);
};

let warned = false;
CIQ.ChartEngine.prototype.mousemoveinner =
	CIQ.ChartEngine.prototype.mousemoveinner ||
	function (epX, epY) {
		if (!warned)
			console.error(
				"interaction feature requires activating movement feature."
			);
		warned = true;
	};

};
__js_standard_interaction_(typeof window !== "undefined" ? window : global);
