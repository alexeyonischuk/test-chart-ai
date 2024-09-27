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


import { CIQ } from "../../js/componentUI.js";
import "./scriptiqEditor.js";

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-scriptiq&gt;</h4>
 *
 * ScriptIQ web component.
 *
 * **Only available if subscribing to the scriptIQ module.**
 *
 * @alias WebComponents.ScriptIQ
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 *
 * @example
 * <cq-scriptiq></cq-scriptiq>
 */
class ScriptIQ extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ScriptIQ);
	}

	initialize() {
		const self = this;
		// If not defined, define the namespace...
		if (!CIQ.Scripting) CIQ.Scripting = {};
		// ... and then assign it to the webcomponent so it can be accessed by the sandbox frame
		self.sandboxedCIQ = {
			Scripting: CIQ.Scripting,
			Studies: CIQ.Studies,
			prepareChannelFill: CIQ.prepareChannelFill
		};
		const { topNode: contextContainer } = this.context;
		let editor = (self.editor =
			contextContainer.querySelector("cq-scriptiq-editor"));
		if (editor) {
			editor.remove();
		} else {
			editor = self.editor = document.createElement("cq-scriptiq-editor");
			editor.setAttribute("role", "group");
			editor.setAttribute("aria-label", "Study Editor");
		}
		contextContainer.appendChild(editor);
		if (editor.initialize) editor.initialize();
		self.context.stx.prepend("resizeChart", self.resize.bind(self));
	}

	resize() {
		if (this.editor && this.editor.resizeScriptingArea)
			this.editor.resizeScriptingArea();
	}

	setContext(context) {
		this.initialize();
		CIQ.UI.activatePluginUI(this.context.stx, "scriptiq");
	}
}

CIQ.UI.addComponentDefinition("cq-scriptiq", ScriptIQ);

/**
 * Adds an instance of the ScriptIQ plug-in to the chart
 *
 * @param {object} params Parameters for setting up the plug-in.
 * @param {CIQ.ChartEngine} params.stx A reference to the chart to which the plug-in is
 * 		added.
 * @param {CIQ.UI.Context} params.context A reference to the user interface context.
 *
 * @constructor
 * @name CIQ.ScriptIQ
 * @since 8.9.0
 */
CIQ.ScriptIQ = function (params) {
	params.context.topNode.appendChild(document.createElement("cq-scriptiq"));
};
