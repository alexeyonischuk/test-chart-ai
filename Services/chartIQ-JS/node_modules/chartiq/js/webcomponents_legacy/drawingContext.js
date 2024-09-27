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
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/menu.js";
import "../../js/webcomponents/scroll/menuDropdown.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Drawing Context Dialog web component `<cq-drawing-context>`.
 * Managed by an instance of {CIQ.UI.DrawingEdit}.
 *
 * @namespace WebComponents.cq-drawing-context
 * @since 6.2.0
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
	 */
	open(params) {
		this.addDefaultMarkup();
		this.classList.add("ciq-context-menu");

		this.drawing = params.drawing;
		var textEdit = this.node.find("[cq-edit-text]");
		if (this.drawing.edit) {
			textEdit.show();
		} else {
			textEdit.hide();
		}
		return super.open(params);
	}
}

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
