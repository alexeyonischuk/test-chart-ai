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


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-context&gt;</h4>
 *
 * This component appears when a study is right-clicked.  A menu of actions are displayed relevant to that study.
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
 * | effect |  "edit", "remove", "favorite", or other custom action |
 * | action | "click" |
 * | item | _object on which the action occurs, usually a study descriptor_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.StudyContext
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 4.1.0 cq-study-context is now required (cq-dialog[cq-study-context] no longer works).
 * - 9.1.0 Added emitter.
 */
class StudyContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyContext);
		this.constructor = StudyContext;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.StudyContext
	 */
	setContext(context) {
		let { markup } = this.constructor;
		const hasFavorites = !!context.topNode.querySelector(".ciq-sb-container");

		if (!hasFavorites) {
			markup = markup
				.split(/\n/g)
				.filter((line) => !/StudyEdit\.addToFavorites/i.test(line))
				.join("\n");
		}

		this.addDefaultMarkup(this, markup);
		this.classList.add("ciq-context-menu");
		super.setContext(context);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {string} effect What action was performed as a result of the stxtap event.
	 * @param {Object} item Object being effected by the action.
	 *
	 * @tsmember WebComponents.StudyContext
	 */
	postProcess(effect, item) {
		this.emitCustomEvent({
			effect,
			detail: { item }
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.StudyContext
 */
StudyContext.markup = `
		<div stxtap="StudyEdit.edit()">Edit Settings...</div>
		<div stxtap="StudyEdit.addToFavorites()">Add to Favorites</div>
		<div stxtap="StudyEdit.remove()">Delete Study</div>
	`;
CIQ.UI.addComponentDefinition("cq-study-context", StudyContext);
