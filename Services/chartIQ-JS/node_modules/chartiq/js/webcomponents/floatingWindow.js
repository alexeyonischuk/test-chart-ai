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
 * <h4>&lt;cq-floating-window&gt;</h4>
 *
 * This component manages a "floating window" containing content.
 * A floating window can be moved around the screen within the boundaries of the context container.
 * It can also be resized on each edge and corner.  Finally, it can be collapsed and expanded via its title bar.
 *
 * Note that the actually window contents are not found within the DOM of this component; rather, this component has a
 * "windowImplementation" which points to the actual DOM element containing the window.
 * The implementation is of the class {@link WebComponents.FloatingWindow.DocWindow}.
 *
 * @alias WebComponents.FloatingWindow
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 8.2.0
 * - 9.1.0 Observes attributes. Added emitter.
 */
class FloatingWindow extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, FloatingWindow);
		this.constructor = FloatingWindow;
	}

	/**
	 * Initializes the context of the floating window component. Dynamically adds a listener for
	 * the "floatingWindow" event based on the `type` parameter of the event (see
	 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.FloatingWindow
	 * @since 8.2.0
	 */
	setContext(context) {
		const { stx } = context;
		if (!stx.callbackListeners.floatingWindow) {
			stx.callbackListeners.floatingWindow = [];
		}

		stx.addEventListener("floatingWindow", (message) => {
			const exec = this["on" + CIQ.capitalize(message.type)];
			if (exec) {
				exec.call(this, message);
				return true;
			}
		});
	}

	/**
	 * The listener for "floatingWindow" events where the `type` parameter of the event is
	 * "shortcut" (see
	 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
	 *
	 * Creates and positions a floating window for keyboard shortcuts.  This is a scrollable, informational window.
	 *
	 * @param {object} params Listener parameters.
	 * @param {string} params.content The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the element (see
	 * 		{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}). Defaults to
	 * 		`document.body`.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {number} [params.width] The width of the floating window in pixels.
	 * @param {boolean} [params.status] The state of the floating window: true, to open the
	 * 		window; false, to close it. If the parameter is not provided, the floating window is
	 * 		toggled (opened if closed, closed if open).
	 * @param {string} [params.tag] A label that identifies the floating window type; for example,
	 * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
	 * 		legend. See the `tag` parameter of
	 * 		[floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}.
	 * @param {function} [params.onClose] A callback to execute when the floating window is
	 * 		closed.
	 *
	 * @tsmember WebComponents.FloatingWindow
	 * @since 8.2.0
	 */
	onShortcut({ container, title, tag, content, width, status, onClose }) {
		if (this.shortcutWindow) {
			this.shortcutWindow.toggle(status).ensureVisible();
			return;
		}
		this.shortcutWindow = this.constructor.windowImplementation.get({
			tag,
			content: content,
			title,
			container: container || document.body,
			onClose
		});

		this.shortcutWindow.titleBarEl.setAttribute(
			"title",
			"Keyboard Shortcut Guide. " +
				this.shortcutWindow.titleBarEl.getAttribute("title")
		);

		this.shortcutWindow.toggle(true).update({ width }).positionRelativeTo();
	}

	/**
	 * The listener for "floatingWindow" events where the `type` parameter of the event is
	 * "documentation" (see
	 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
	 *
	 * Creates and positions a floating window for feature help documentation.  There is a buton in the window to activate the feature.
	 *
	 * @param {object} params Listener parameters.
	 * @param {string} params.content The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the element (see
	 * 		{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}). Defaults to
	 * 		`document.body`.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {number} [params.width] The width of the floating window in pixels.
	 * @param {HTMLElement} [params.targetElement] Element to set focus on when window is closed.
	 * @param {object[]} [params.actionButtons] Properties of the buttons which enable the feature.
	 * @param {string} [params.actionButtons.label] Text for the button.
	 * @param {string|function} [params.actionButtons.action] What happens when button is pressed.
	 *        If "close", will close the window; if a function, will call that function.
	 * @param {string} [params.tag] A label that identifies the floating window type; for example,
	 * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
	 * 		legend. See the `tag` parameter of
	 * 		[floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}.
	 * @param {function} [params.onClose] A callback to execute when the floating window is
	 * 		closed.
	 *
	 * @tsmember WebComponents.FloatingWindow
	 * @since 8.2.0
	 */
	onDocumentation({
		container,
		title,
		tag,
		content,
		targetElement,
		actionButtons,
		width,
		onClose
	}) {
		function processButtonAction(action, documentationWindow) {
			return () => {
				if (action === "close") {
					documentationWindow.toggle(false);
				} else if (typeof action === "function") {
					action();
				}
			};
		}

		this.documentationWindow = this.constructor.windowImplementation.get({
			tag,
			content: content + "<br>",
			title,
			container: container || document.body,
			onClose
		});

		this.documentationWindow.targetElement = targetElement;

		const actionButtonContainer = document.createElement("div");
		actionButtonContainer.classList.add("ciq-window-actions");
		this.documentationWindow.bodyEl.appendChild(actionButtonContainer);

		// Add action buttons
		for (let buttonData of actionButtons) {
			const actionButton = document.createElement("button");
			actionButton.innerText = buttonData.label;
			actionButton.style.marginTop = "1em";
			actionButton.style.marginRight = "1em";
			actionButton.classList.add("ciq-btn");
			CIQ.safeClickTouch(
				actionButton,
				processButtonAction(buttonData.action, this.documentationWindow)
			);
			actionButtonContainer.appendChild(actionButton);
		}

		if (this.context.stx.translateUI)
			this.context.stx.translateUI(this.documentationWindow.w);

		this.documentationWindow.titleBarEl.setAttribute(
			"title",
			"Help window. " +
				this.documentationWindow.titleBarEl.getAttribute("title")
		);

		this.documentationWindow
			.toggle(true)
			.update({ width })
			.positionRelativeTo();
	}
}

/**
 * The window implementation of the [cq-floating-window]{@link WebComponents.FloatingWindow}
 * web component.
 *
 * @alias WebComponents.FloatingWindow.DocWindow
 * @class
 * @protected
 * @since 8.2.0
 */
class DocWindow {
	/**
	 * Creates the floating window DOM element and binds event handlers to the window.
	 *
	 * @param {object} params Constructor parameters.
	 * @param {string} params.content The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the container element.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {string} [params.tag] A label that identifies the floating window type; for example,
	 * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
	 * 		legend.
	 * @param {number} [params.minWidth] The minimum width of the floating window.
	 * @param {number} [params.minHeight] The minimum height of the floating window.
	 * @param {function} [params.onClose] A callback function to execute when the floating window
	 * 		closes.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @private
	 * @since 8.2.0
	 */
	constructor({
		content,
		title,
		tag,
		minWidth,
		minHeight,
		container,
		onClose
	}) {
		const w = document.createElement("div");
		w.innerHTML = this.constructor.markup;
		w.classList.add("ciq-window");
		(container.ownerDocument || document).body.append(w);
		w.tag = tag;
		w.docWindow = this;
		Object.assign(this, {
			isDragging: false,
			isResizing: false,
			isOpen: false,
			xDiff: 0,
			yDiff: 0,
			x: 50,
			y: 50,
			w
		});
		this.bindEvents();

		const closestContextContainer = CIQ.UI.closestContextContainer(container);
		if (closestContextContainer && closestContextContainer.currentTheme) {
			w.classList.add(closestContextContainer.currentTheme);
			const { stx } = closestContextContainer.CIQ.UI.context;
			stx.addEventListener("theme", () => {
				w.className = `ciq-window ${closestContextContainer.currentTheme}`;
			});
		}

		this.titleEl = w.querySelector(".ciq-window-title");
		this.bodyEl = w.querySelector(".ciq-window-body");
		this.titleBarEl = w.querySelector(".ciq-window-bar");

		this.setProps({ title, content, minWidth, minHeight, container, onClose });
		this.render();
	}

	/**
	 * Stores the function parameters as properties of the floating window object.
	 *
	 * @param {object} params Parameters to store as properties.
	 * @param {string} [params.title] Text that appears in the title bar of the floating window.
	 * @param {string} [params.content] The contents of the floating window, typically an HTML
	 * 		string.
	 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
	 * 		window. The window is positioned on screen relative to the container element (see
	 * 		[positionRelativeTo]{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}).
	 * @param {number} [params.minWidth] The minimum width of the floating window.
	 * @param {number} [params.minHeight] The minimum height of the floating window.
	 * @param {function} [params.onClose] A callback function to execute when the floating windows
	 * 		closes.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	setProps({ title, content, minWidth, minHeight, container, onClose }) {
		const { w, titleEl, bodyEl } = this;
		titleEl.removeAttribute("cq-translate-original");
		bodyEl.removeAttribute("cq-translate-original");
		if (title !== undefined) titleEl.textContent = title;
		if (content !== undefined) bodyEl.innerHTML = content;
		if (minWidth !== undefined) w.style.minWidth = minWidth + "px";
		if (minHeight !== undefined) w.style.minHeight = minHeight + "px";
		if (container) this.container = container;
		if (onClose !== undefined) this.onClose = onClose;
	}

	/**
	 * Adds event listeners to the floating window.
	 *
	 * The listeners enable the window to be moved, resized, collapsed/expanded, and closed.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	bindEvents() {
		const { w } = this;
		const qs = (path) => w.querySelector(path);

		qs(".ciq-window-bar").addEventListener(
			"mousedown",
			this.onStartDrag.bind(this)
		);

		const toggleCollapse = this.toggleCollapse.bind(this);
		qs(".ciq-window-bar").addEventListener("dblclick", toggleCollapse);
		qs(".ciq-window-collapse").addEventListener("click", toggleCollapse);

		const resizeControls = (
			"top, right, bottom, left, " +
			"top-right, bottom-right, bottom-left, top-left"
		).split(/, /);
		resizeControls.forEach((control) => {
			qs(`.ciq-window-resize-${control}`).addEventListener(
				"mousedown",
				startResize(this)
			);
		});
		w.ownerDocument.addEventListener("mousemove", this.onMouseMove.bind(this));
		w.ownerDocument.addEventListener("mouseup", this.onMouseUp.bind(this));

		qs(".ciq-window-close").addEventListener(
			"click",
			this.toggle.bind(this, false)
		);

		w.ownerDocument.defaultView.addEventListener(
			"resize",
			this.ensureVisible.bind(this)
		);

		function startResize(self) {
			return (e) => {
				if (e.button !== 0) return;
				CIQ.extend(self, {
					isResizing: e.target.className.replace(/ciq-window-resize-/, ""),
					downX: e.pageX,
					downY: e.pageY,
					startWidth: self.width,
					startHeight: self.height,
					startLeft: self.x,
					startTop: self.y
				});
			};
		}
	}

	/**
	 * Updates properties of the floating window.
	 *
	 * @param {object} params Floating window properties.
	 * @param {number} [params.x] The horizontal position of the floating window in pixels.
	 * @param {number} [params.y] The vertical position of the floating window in pixels.
	 * @param {number} [params.width] The width of the floating window in pixels.
	 * @param {number} [params.height] The height of the floating window in pixels.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	update({ x, y, width, height }) {
		Object.assign(this, { x, y, width, height });
		this.render();
		return this;
	}

	/**
	 * Positions the floating window relative to the
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect" target="_blank">
	 * DOMRect</a> of a DOM element.
	 *
	 * @param {object} params Positioning parameters.
	 * @param {HTMLElement} [params.container] The DOM element relative to which the floating
	 * 		window is positioned. Defaults to the `container` parameter of the
	 * 		[floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener} or,
	 * 		if the `container` parameter is not available, `document.body`.
	 * @param {string} [params.location="center"] The location of the floating window within the
	 * 		container element's bounding rectangle. If the value is "center" (the default), the
	 * 		floating window is centered horizontally and vertically within the container
	 * 		rectangle. Otherwise, the window is positioned in the upper left corner of the
	 * 		rectangle.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	positionRelativeTo({ container, location = "center" } = {}) {
		const { x, y, width, height } = (
			container ||
			this.container ||
			document.body
		).getBoundingClientRect();

		const scrollTop = this.w.ownerDocument.documentElement.scrollTop;
		const scrollLeft = this.w.ownerDocument.documentElement.scrollLeft;

		if (this.width > width - 20) this.width = width - 20;
		if (this.height > height - 20) this.height = height - 20;

		if (location === "center") {
			this.x = scrollLeft + (x + width / 2 - this.width / 2);
			this.y = scrollTop + (y + height / 2 - this.height / 2);
		}

		this.render();
		return this;
	}

	/**
	 * Repositions the floating window (if necessary) when the display is resized to keep the
	 * window within the document view.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	ensureVisible() {
		if (!this.isOpen) return;
		const { x, y, width } = this.w.getBoundingClientRect();
		const { innerWidth, innerHeight } = this.w.ownerDocument.defaultView;

		if (y > innerHeight - 20) {
			this.y = innerHeight - 20;
		}
		if (x > innerWidth - width) {
			this.x = innerWidth - width;
		}
		this.render();
	}

	/**
	 * Renders the position updates and open/close, dragging, and resizing state changes made to
	 * the floating window by other methods of this class.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @private
	 * @since 8.2.0
	 */
	render() {
		const { x, y } = this;
		Object.assign(this.w.style, {
			display: this.isOpen ? "" : "none",
			transform: "translate(" + x + "px, " + y + "px)"
		});
		this.w.classList.toggle(
			"ciq-wdragging",
			this.isDragging || this.isResizing
		);
	}

	get width() {
		return this.w.offsetWidth;
	}
	set width(value) {
		if (value) {
			this.w.style.width = value + "px";
		}
	}

	get height() {
		return this.w.offsetHeight;
	}
	set height(value) {
		if (value) {
			this.w.style.height = value + "px";
		}
	}

	/**
	 * Helper function that constrains the floating window to the document view when the window
	 * is dragged horizontally.
	 *
	 * Clamps the horizontal position of the floating window between 0 (so the window cannot be
	 * dragged off the left side of the view) and the width of the document view minus the width
	 * of the floating window (so the window cannot be dragged off the right side of the view).
	 *
	 * @param {number} value The position of the mouse relative to the left edge of the floating
	 * 		window.
	 * @return {number} The value for the clamped horizontal position of the floating window:
	 * - `value` if `value` is greater than 0 and less than the width of the document view minus
	 * the width of the floating window
	 * - 0 if `value` is less than 0
	 * - The width of the document view minus the width of the floating window if `value` is
	 * greater than the width of the document view minus the width of the floating window
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	clampX(value) {
		return Math.min(
			Math.max(value, 0),
			this.w.ownerDocument.defaultView.innerWidth - this.w.offsetWidth
		);
	}

	/**
	 * Helper function that constrains the floating window to the document view when the window
	 * is dragged vertically.
	 *
	 * Clamps the vertical position of the floating window between 0 (so the window cannot be
	 * dragged off the top of the view) and the height of the document view minus the height of
	 * the floating window title bar and a margin (so the window title bar cannot be dragged off
	 * the bottom of the view).
	 *
	 * @param {number} n The position of the mouse relative to the top edge of the floating window.
	 * @return {number} The value for the clamped vertical position of the floating window:
	 * - `n` if `n` is greater than 0 and less than the height of the document view minus the
	 * height of the floating window title bar and margin
	 * - 0 if `n` is less than 0
	 * - The height of the document view minus the height of the floating window title bar and
	 * margin if `n` is greater than the height of the document view minus the height of the
	 * floating window title bar and margin
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	clampY(n) {
		const margin = 8;
		return Math.min(
			Math.max(n, 0),
			this.w.ownerDocument.defaultView.innerHeight -
				this.titleBarEl.offsetHeight -
				margin
		);
	}

	/**
	 * The event listener for mouse move events that occur when a floating window is being dragged
	 * or resized.
	 *
	 * Moves or resizes the floating window.
	 *
	 * @param {MouseEvent} e The
	 * 		<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">
	 * 		mouse event</a> object.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	onMouseMove(e) {
		const { isDragging, isResizing } = this;

		if (!isDragging && !isResizing) return;

		const xDiff = e.pageX - this.downX;
		const yDiff = e.pageY - this.downY;

		if (isDragging) {
			this.x = this.clampX(xDiff);
			this.y = this.clampY(yDiff);
		}
		const { startWidth, startHeight } = this;
		const margin = 2;
		let height, width;

		if (/left/.test(isResizing)) {
			width = this.startWidth - xDiff;
			this.width = width;
			this.x = this.startLeft + xDiff;
		}

		if (/top/.test(isResizing)) {
			height = this.startHeight - yDiff;
			this.height = height;
			this.y = this.startTop + yDiff;
		}

		if (isResizing && /right|bottom/.test(isResizing)) {
			this.width = /right/.test(isResizing)
				? xDiff + startWidth
				: width || startWidth;

			this.height = /bottom/.test(isResizing)
				? yDiff + startHeight
				: height || startHeight;

			const win = this.w.ownerDocument.defaultView;
			if (this.x + this.width - margin > win.innerWidth) {
				this.width = win.innerWidth - this.x - margin;
			}
			if (this.y + this.height - margin > win.innerHeight) {
				this.height = win.innerHeight - this.y - margin;
			}
		}

		this.render();
	}

	/**
	 * The event listener for mouse down events that occur on the floating window's title bar.
	 *
	 * The mouse down event starts a click-and-drag action on the floating window.
	 *
	 * @param {MouseEvent} e The
	 * 		<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">
	 * 		mouse event</a> object.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	onStartDrag(e) {
		if (e.button !== 0) return;

		this.isDragging = true;
		this.downX = e.pageX - this.x;
		this.downY = e.pageY - this.y;
	}

	/**
	 * The event listener for mouse up events that occur on a floating window.
	 *
	 * Stops a dragging or resizing action of the floating window.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	onMouseUp() {
		this.isDragging = false;
		this.isResizing = false;
		this.render();
	}

	/**
	 * Opens and closes the floating window.
	 *
	 * @param {boolean} [value] If true, the floating window is opened. If false, the
	 * 		floating window is closed. If undefined, the floating window is toggled; that is,
	 * 		opened if it is currently closed, closed if it is currently open.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	toggle(value) {
		const newValue = value === undefined ? !this.isOpen : value;
		const changed = this.isOpen !== newValue;
		this.isOpen = newValue;
		if (this.isOpen) {
			this.w.setAttribute("aria-labelledby", "floating-window-title");
			this.w.setAttribute("aria-hidden", "false");
			this.w.setAttribute("role", "alertdialog");
			setTimeout(() => {
				this.w.tabIndex = -1;
				this.w.focus();
			}, 10);
		} else {
			this.w.removeAttribute("role");
			this.w.setAttribute("aria-hidden", "true");
			if (this.targetElement) {
				setTimeout(() => {
					this.targetElement.tabIndex = -1;
					this.targetElement.focus();
				}, 10);
			}
		}
		if (changed && !this.isOpen && this.onClose) {
			this.onClose();
			if (this.isCollapsed) this.toggleCollapse(); // reset to open for next time
		}
		this.render();
		return this;
	}

	/**
	 * Toggles the display state &mdash; expanded or collapsed &mdash; of the floating window.
	 *
	 * In the expanded state, the full floating window is displayed; in the collapsed state, only
	 * the floating window title bar appears.
	 *
	 * @tsmember WebComponents.FloatingWindow.DocWindow
	 * @since 8.2.0
	 */
	toggleCollapse() {
		this.isCollapsed = !this.isCollapsed;
		if (this.isCollapsed) {
			this.prevHeight = this.height;
			this.w.classList.add("ciq-window-collapsed");
			this.height = this.titleBarEl.offsetHeight;
			if (this.onCollapse) this.onCollapse();
		} else {
			this.height = this.prevHeight;
			this.w.classList.remove("ciq-window-collapsed");
		}
		const collapseEl = this.w.querySelector(".ciq-window-collapse");
		collapseEl.title = this.isCollapsed ? "Expand" : "Collapse";
		this.render();
	}
}

/**
 * Default markup for the component's innerHTML.
 *
 * @tsmember WebComponents.FloatingWindow.DocWindow
 * @static
 * @type {string}
 * @since 8.2.0
 */
DocWindow.markup = `
	<div class="ciq-window-bar" title="Drag to reposition, double click to collapse.">
		<div><h3 id="floating-window-title" class="ciq-window-title"></h3></div>
		<span class="ciq-window-collapse" title="Collapse" aria-hidden="true"></span>
		<span class="ciq-window-close" title="Click to close" role="button"></span>
	</div>
	<div class="ciq-window-body"></div>
	<div class="ciq-window-resize-left"></div>
	<div class="ciq-window-resize-top"></div>
	<div class="ciq-window-resize-right"></div>
	<div class="ciq-window-resize-bottom"></div>
	<div class="ciq-window-resize-bottom-right"></div>
	<div class="ciq-window-resize-bottom-left"></div>
	<div class="ciq-window-resize-top-left"></div>
	<div class="ciq-window-resize-top-right"></div>
`;

/**
 * Gets a floating window instance.
 *
 * If the `tag` parameter is provided, the function checks whether the document already contains
 * a floating window with that tag. If so, the function parameters are stored as properties of the
 * floating window object (see
 * [setProps]{@link WebComponents.FloatingWindow.DocWindow#setProps}), and a reference to the
 * floating window is returned. Otherwise, the function returns a new floating window created with
 * the provided parameters.
 *
 * **Note:** Tags can be used to manage floating windows in multi-chart documents. For more
 * information, see the `tag` parameter of
 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}.
 *
 * @param {object} params Floating window parameters.
 * @param {string} params.content The contents of the floating window, typically an HTML string.
 * @param {HTMLElement} [params.container] The DOM element that visually contains the floating
 * 		window. The floating window is positioned on screen relative to the container element (see
 * 		[positionRelativeTo]{@link WebComponents.FloatingWindow.DocWindow#positionRelativeTo}).
 * @param {string} [params.title] Text that appears in the title bar of the floating window.
 * @param {string} [params.tag] A label that identifies the floating window type; for example,
 * 		"shortcut", which indicates that the floating window contains the chart keyboard shortcuts
 * 		legend.
 * @param {number} [params.minWidth] The minimum width of the floating window.
 * @param {number} [params.minHeight] The minimum height of the floating window.
 * @param {function} [params.onClose] A callback function to execute when the floating window
 * 		closes.
 * @return {object} A [DocWindow]{@link WebComponents.FloatingWindow.DocWindow} instance.
 *
 * @tsmember WebComponents.FloatingWindow.DocWindow
 * @static
 * @since 8.2.0
 */
DocWindow.get = function (params) {
	let w;
	if (params.tag) {
		w = Array.from(
			(params.container.ownerDocument || document).querySelectorAll(
				".ciq-window"
			)
		).find((el) => el.tag === params.tag);
		if (w) {
			w.docWindow.setProps(params);
			return w.docWindow;
		}
	}
	return new this(params);
};

/**
 * A reference to the class that implements the floating window.
 *
 * @default [DocWindow]{@link WebComponents.FloatingWindow.DocWindow}
 * @type {WebComponents.FloatingWindow.DocWindow}
 * @since 8.2.0
 *
 * @tsmember WebComponents.FloatingWindow
 */
FloatingWindow.windowImplementation = DocWindow;

CIQ.UI.addComponentDefinition("cq-floating-window", FloatingWindow);
