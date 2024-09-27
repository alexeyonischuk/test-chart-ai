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
 * <h4>&lt;cq-undo&gt;</h4>
 *
 * This component will undo a drawing.  There is a complementary component [cq-redo]{@link WebComponents.Redo} which reverts the undo operation.
 *
 * @example
 * <cq-undo-section>
 *     <cq-undo class="ciq-btn">Undo</cq-undo>
 *     <cq-redo class="ciq-btn">Redo</cq-redo>
 * </cq-undo-section>

 * @alias WebComponents.Undo
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class Undo extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.redoButton = null;
		this.undostack = [];
		this.redostack = [];
		this.contexts = [];
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		CIQ.UI.stxtap(this, () => this.undo());
		this.setButtonStyle();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Undo);
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Clears the stack of all redo or undo operations for the context
	 *
	 * @param  {CIQ.UI.Context} context The context to clear
	 *
	 * @tsmember WebComponents.Undo
	 */
	clear(context) {
		this.setButtonStyle();
	}

	/**
	 * Handles the "undoStamp" event.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 * @param {string} type Must be "undoStamp"
	 * @param {object} data
	 * @param {CIQ.Drawing[]} data.before Array of drawing objects which should exist after the undo operation.
	 *
	 * @tsmember WebComponents.Undo
	 */
	handleEvent(context, type, data) {
		this.undostack.push({ context: context, drawings: data.before });
		this.redostack = [];
		this.setButtonStyle();
	}

	/**
	 * Handler for keyboard interaction.
	 * "Ctrl-z" undoes, "Ctrl-y" redoes.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @param {CIQ.UI.Keystroke} keystroke Contains status of function keys
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Undo
	 */
	keyStroke(hub, key, e, keystroke) {
		if (key == "z" && (keystroke.ctrl || keystroke.cmd)) {
			// ctrl-z
			if (keystroke.shift) {
				this.redo();
			} else {
				this.undo();
			}
			return true;
		}
		if (key == "y" && (keystroke.ctrl || keystroke.cmd)) {
			// ctrl-y
			this.redo();
			return true;
		}
	}

	/**
	 * Sets up the undo stack for each context of a multichart setup.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 * @private
	 *
	 * @tsmember WebComponents.Undo
	 */
	manageContext(context) {
		this.addClaim(this);
		this.eventListeners.push(
			context.stx.addEventListener("undoStamp", (data) =>
				this.handleEvent(context, "undoStamp", data)
			)
		);
		this.contexts.push(context);
	}

	/**
	 * Reverts latest undone drawing.
	 *
	 * @tsmember WebComponents.Undo
	 */
	redo() {
		const state = this.redostack.pop();
		if (state) {
			const { context, drawings } = state;
			this.undostack.push({
				context,
				drawings: context.stx.exportDrawings()
			});
			context.stx.abortDrawings(true);
			context.stx.importDrawings(drawings);
			context.stx.changeOccurred("vector");
			context.stx.draw();
		}
		this.setButtonStyle();
	}

	/**
	 * Enables or disables button style
	 *
	 * @private
	 *
	 * @tsmember WebComponents.Undo
	 */
	setButtonStyle() {
		if (this.undostack.length) {
			this.setAttribute("cq-active", "true");
			this.removeAttribute("aria-disabled");
		} else {
			this.removeAttribute("cq-active");
			this.setAttribute("aria-disabled", "true");
		}
		if (this.redoButton) {
			if (this.redostack.length) {
				this.redoButton.setAttribute("cq-active", "true");
				this.redoButton.removeAttribute("aria-disabled");
			} else {
				this.redoButton.removeAttribute("cq-active");
				this.redoButton.setAttribute("aria-disabled", "true");
			}
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Undo
	 */
	setContext(context) {
		let contextArr = [this.context];
		if (this.context.topNode.getCharts) {
			const stxArr = this.context.topNode.getCharts();
			contextArr = stxArr.map((stx) => stx.uiContext);
		}
		contextArr.forEach((targetContext) => {
			this.manageContext(targetContext);
		});

		this.addInjection("append", "initializeChart", () => {
			this.undostack = [];
			this.redostack = [];
			this.clear();
		});
	}

	/**
	 * Reverts last drawing made.
	 *
	 * @tsmember WebComponents.Undo
	 */
	undo() {
		// If a drawing tool is in action, then pressing undo will kill the current tool
		let foundOne = false;
		for (let i = 0; i < this.contexts.length; i++) {
			if (this.contexts[i].stx.activeDrawing) {
				this.contexts[i].stx.undo();
				foundOne = true;
			}
		}
		if (foundOne) return;

		// otherwise proceed to popping off the stack
		const state = this.undostack.pop();
		if (state) {
			const { context, drawings } = state;
			this.redostack.push({
				context,
				drawings: context.stx.exportDrawings()
			});
			context.stx.abortDrawings(true);
			context.stx.importDrawings(drawings);
			context.stx.changeOccurred("vector");
			context.stx.draw();
		}
		this.setButtonStyle();
	}
}

CIQ.UI.addComponentDefinition("cq-undo", Undo);
