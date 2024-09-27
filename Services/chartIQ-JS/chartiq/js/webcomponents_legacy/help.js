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
import "../../js/webcomponents/floatingWindow.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Help web component `<cq-help>` displays help if available. Long-press time is set in the [stxx.longHoldTime]{@link https://documentation.chartiq.com/CIQ.ChartEngine.html#callbacks%5B%60longhold%60%5D} function.
 * 
 * **Configuring help pop-ups**
 * 
 * The *chartiq/examples/help/* folder contains image files and the *helpContent.js* file for configuring help pop ups.
 * 
 * ```js
 * import { CIQ } from "../../js/chartiq.js";
 * CIQ.Help = CIQ.Help || function () {};
 * CIQ.Help.Message = "Dots indicate which items have help available. At any time, long press a feature to make the help window appear.";
 * CIQ.Help.Actions = {
 * 		close: {
 * 			label: "Exit Help",
 * 			action: "close" // Close is handled by the floating window
 *		},
 *		enable: {
 *			label: "Enable This Feature",
 *			action: function (target) {
 *				// Click the target (parent of the <cq-help> element)
 *				target.dispatchEvent(new Event("stxtap"));
 *      	}
 *   	}
 * };
 * CIQ.Help.Content = {
 * 		drawing_tools_toggle: {
 *      title: "Toggle: Drawing Tools",
 *      content:
 *			"Toggles display of the drawing tools palette. Drawing tools allow you to add custom markings and annotations to the chart."
 *   	},
 *		drawing_palette_rectangle: {
 *      title: "Drawing Tool: Rectangle",
 *      content:
 *          "<img src='./examples/help/rectangle.png' width='200' style='float:right; margin:1em;'/> Add a rectangle shape onto the chart."
 *		},
 *		drawing_palette_annotation: {
 *			title: "Drawing Tool: Annotation",
 *			content: "Add text annotations onto the chart."
 *		},
 *		drawing_palette_arrow: {
 *			title: "Drawing Tool: Arrow",
 *			content: "Add an arrow shape onto the chart."
 *		},
 *		drawing_palette_line: {
 *			title: "Drawing Tool: Line",
 *			content: "Add a line at any angle or position across the chart."
 *		},
 *		drawing_palette_horizontal: {
 *			title: "Drawing Tool: Horizontal",
 *			content: "Add a horizontal line at any point onto the chart."
 *		},
 *		drawing_palette_vertical: {
 *			title: "Drawing Tool: Vertical",
 *			content: "Add a vertical line at any point onto the chart."
 *		},
 *		drawing_palette_segment: {
 *			title: "Drawing Tool: Segment",
 *			content: "Add a line segment onto the chart."
 *		},
 *		default: {
 *			title: "Help not available.",
 *			content: "No documentation for this topic could be found.",
 *			actions: [CIQ.Help.Actions.close]
 *		}
 * };
```

 * - `CIQ.Help.Content` defines the content object. 
 * - Properties such as `drawing_palette_rectangle` match with an identifier set in the HTML. 
 * - The help author adds `title` and `content`.
 * - Actions are optional.
 * 
 * @namespace WebComponents.cq-help
 * @example
 * <cq-help help-id="rectangle">
 * </cq-help>
 *
 */
class Help extends CIQ.UI.ContextTag {
	connectedCallback() {
		if (this.attached) return;
		super.connectedCallback();

		["mousedown", "pointerdown", "touchstart"].forEach((eventName) =>
			this.addEventListener(eventName, this.mouseTouchDown, { passive: false })
		);
		["mouseup", "pointerup", "touchend", "touchmove", "click"].forEach(
			(eventName) =>
				this.addEventListener(eventName, this.mouseTouchUp, { passive: false })
		);
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Help);
		this.constructor = Help;
	}

	disconnectedCallback() {
		["mousedown", "pointerdown", "touchstart"].forEach((eventName) =>
			this.removeEventListener(eventName, this.mouseTouchDown)
		);
		["mouseup", "pointerup", "touchend", "touchmove"].forEach((eventName) =>
			this.removeEventListener(eventName, this.mouseTouchUp)
		);
		super.disconnectedCallback();
	}

	setContext() {
		this.addDefaultMarkup();
		const attributeName = "help-feature";
		let { topNode, stx } = this.context;
		if (CIQ.Help && !topNode.hasAttribute(attributeName))
			topNode.setAttribute(attributeName, "");
		this.ensureMessagingAvailable(stx);
	}

	mouseTouchDown(evt) {
		if (
			!CIQ.Help ||
			!CIQ.Help.Content ||
			!CIQ.Help.Content[this.getAttribute("help-id")] ||
			this.pressTimer ||
			(evt.button && evt.button >= 2)
		)
			return;
		this.pressTimer = setTimeout(() => {
			this.pressTimer = null;
			// Allow the press highlight animation to complete before removing
			setTimeout(() => this.classList.remove("pressing"), 1000);
			this.press();
		}, this.context.stx.longHoldTime);
		this.classList.add("pressing");
	}

	mouseTouchUp(evt) {
		if (
			!CIQ.Help ||
			!CIQ.Help.Content ||
			!CIQ.Help.Content[this.getAttribute("help-id")] ||
			(evt.button && evt.button >= 2)
		)
			return;
		if (evt.type === "click") {
			if (!this.classList.contains("pressing")) this.press();
			this.classList.remove("pressing");
		}
		if (!this.pressTimer) return;
		clearTimeout(this.pressTimer);
		this.pressTimer = null;
	}

	/**
	 * Ensures that an instance of the [cq-floating-window]{@link WebComponents.cq-floating-window}
	 * web component is available to handle event messaging and create the shortcuts legend floating
	 * window.
	 *
	 * This function is called when the add-on is instantiated.
	 *
	 * @param {CIQ.ChartEngine} stx The chart engine that provides the UI context, which contains the
	 * [cq-floating-window]{@link WebComponents.cq-floating-window} web component.
	 *
	 * @memberof WebComponents.cq-help
	 * @alias ensureMessagingAvailable
	 * @since 8.4.0
	 */
	ensureMessagingAvailable(stx) {
		setTimeout(() => {
			const contextContainer = stx.uiContext.topNode;
			if (!contextContainer.querySelector("cq-floating-window")) {
				contextContainer.append(document.createElement("cq-floating-window"));
			}
		});
	}

	/**
	 * Adds class `help-available` if a property matching this elements help-id attribute
	 * can be found in CIQ.Help.Content object. The help indicator (dot) will not
	 * appear unless this class is present.
	 *
	 * @alias verifyHelpContent
	 * @memberof WebComponents.cq-help
	 * @since 8.4.0
	 */
	verifyHelpContent() {
		if (!CIQ.Help || !CIQ.Help.Content) return;
		let helpData = CIQ.Help.Content[this.getAttribute("help-id")];
		if (helpData) {
			this.classList.add("help-available");
		} else {
			this.classList.remove("help-available");
		}
	}

	/**
	 * @alias press
	 * @memberof WebComponents.cq-help
	 * @since 8.4.0
	 */
	press() {
		if (!CIQ.Help || !CIQ.Help.Content) return;
		let { stx } = this.context;
		let helpId = this.getAttribute("help-id") || "default";
		let helpData = CIQ.Help.Content[helpId] || CIQ.Help.Content["default"];
		if (!helpData) return;
		// Add "close" & "enable" action buttons if no actions are provided
		if (!helpData.actions) helpData.actions = [CIQ.Help.Actions.enable];

		// Pass the parent element to each action function
		helpData.actionButtons = [];

		function processAction(actionItem, parentElement) {
			return () => actionItem.action(parentElement);
		}

		for (let actionItem of helpData.actions) {
			let { label, action } = actionItem;
			if (typeof action === "function") {
				action = processAction(actionItem, this.parentElement);
			}
			helpData.actionButtons.push({ label, action });
		}

		stx.dispatch("floatingWindow", {
			type: "documentation",
			title: helpData.title,
			content: helpData.content,
			actionButtons: helpData.actionButtons,
			container: stx.container.querySelector(".stx-subholder"),
			onClose: () => true,
			width: 500,
			status: true,
			tag: "help"
		});
	}
}

Help.markup = `
		<div class="ciq-help-widget"></div>
		<div class="press-indicator">
			<!-- 1x1 transparent image to maintain aspect ratio when sizing by height -->
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-help", Help);
