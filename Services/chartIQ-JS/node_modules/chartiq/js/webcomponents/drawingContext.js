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
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/menu.js";
import "../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-drawing-context&gt;</h4>
 *
 * This component appears when a drawing is right-clicked.  A menu of actions are displayed relevant to that drawing.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an action is clicked from the displayed menu.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "editsettings", "edittext", "clone", remove", "layertop", "layerbottom", "layerup", "layerdown", or other custom action |
 * | action | "click" |
 * | item | _object on which the action occurs, usually a study descriptor_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.DrawingContext
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 6.2.0
 * - 9.1.0 Added emitter.
 */
class DrawingContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, DrawingContext);
		this.constructor = DrawingContext;
	}

	/**
	 * Open the context menu as a dialog.
	 *
	 * @param {Object} params
	 * @param {number} params.x used to position the dialog
	 * @param {number} params.y used to position the dialog
	 * @param {CIQ.Drawing} params.drawing sets the `drawing` instance property
	 * @param {CIQ.UI.Context} params.context passed to the components setContext method
	 * @since 6.2.0
	 *
	 * @tsmember WebComponents.DrawingContext
	 */
	open(params) {
		this.addDefaultMarkup();
		this.classList.add("ciq-context-menu");

		this.drawing = params.drawing;
		const textEdit = this.node.find("[cq-edit-text]");
		if (this.drawing.edit) {
			textEdit.show();
		} else {
			textEdit.hide();
		}
		return super.open(params);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {string} effect What action was performed as a result of the stxtap event.
	 *
	 * @tsmember WebComponents.DrawingContext
	 */
	postProcess(effect) {
		this.emitCustomEvent({
			effect,
			detail: { item: this.drawing }
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.DrawingContext
 */
DrawingContext.markup = `
		<div stxtap="DrawingEdit.text()" cq-edit-text>Edit Text</div>
		<div stxtap="DrawingEdit.edit()">Edit Settings</div>
		<div stxtap="DrawingEdit.clone()">Clone Drawing</div>
		<cq-menu stxtap="resize()" cq-close-top="cq-dialog[cq-drawing-context]">
			<cq-menu-dropdown cq-no-scroll="true" class="context-menu-right">
				<cq-item stxtap="DrawingEdit.reorderLayer('top')">Bring to Top</cq-item>
				<cq-item stxtap="DrawingEdit.reorderLayer('up')">Bring Forward</cq-item>
				<cq-item stxtap="DrawingEdit.reorderLayer('down')">Send Backward</cq-item>
				<cq-item stxtap="DrawingEdit.reorderLayer('bottom')">Send to Bottom</cq-item>
			</cq-menu-dropdown>
			<!-- element here so that <cq-menu-dropdown> can keep "top: auto;" -->
			<div>Layer Management<div class="context-button-right-arrow"></div></div>
		</cq-menu>
		<div stxtap="DrawingEdit.remove()">Delete Drawing</div>
	`;
CIQ.UI.addComponentDefinition("cq-drawing-context", DrawingContext);
