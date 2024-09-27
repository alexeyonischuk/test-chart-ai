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
 * <h4>&lt;cq-view-dialog&gt;</h4>
 *
 * Provides content for view save dialog.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * See {@link WebComponents.Views} for more details on menu management for this component.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when it saves a view.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "save" |
 * | action | "click" |
 * | name | _view name_ |
 * | view | _view data_ |
 *
 * @alias WebComponents.ViewDialog
 * @extends CIQ.UI.DialogContentTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class ViewDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ViewDialog);
		this.constructor = ViewDialog;
	}

	/**
	 * Opens the aggregation dialog.
	 *
	 * @param {object} params
	 * @param {CIQ.UI.Context} [params.context] A context to set. See
	 * 		[setContext]{@link CIQ.UI.DialogContentTag#setContext}.
	 *
	 * @tsmember WebComponents.ViewDialog
	 */
	open(params) {
		this.addDefaultMarkup();
		this.querySelector("input").value = "";
		super.open(params);
	}

	/**
	 * Saves the new view. This updates all cq-view menus on the screen and persists the view in the nameValueStore.
	 *
	 * @tsmember WebComponents.ViewDialog
	 */
	save() {
		const viewName = this.querySelector("input").value;
		if (!viewName) return;

		let madeChange = false;
		let newView;
		this.updateContext();
		const layout = this.context.stx.exportLayout();
		this.context.topNode.CIQ.UI.Components.filter(
			(n) => n.matches("cq-views") && n.ownerDocument === this.ownerDocument
		).forEach((v) => {
			const obj = v.params.viewObj;
			let view;
			let i = 0;
			for (; i < obj.views.length; i++) {
				view = obj.views[i];
				if (viewName == CIQ.first(view)) break;
			}
			if (i == obj.views.length) {
				view = {};
				view[viewName] = {};
				obj.views.push(view);
			}
			view[viewName] = layout;
			delete view[viewName].candleWidth;
			v.renderMenu();
			//this.context.stx.updateListeners("layout");
			if (!madeChange) {
				// We might have a cq-view menu on multiple charts on the screen. Only persist once.
				madeChange = true;
				if (v.params.nameValueStore)
					v.params.nameValueStore.set("stx-views", obj.views);
			}
			newView = view[viewName];
		});
		if (newView) {
			this.emitCustomEvent({
				effect: "save",
				detail: {
					name: viewName,
					view: newView
				}
			});
		}
		this.close();
	}

	/**
	 * Updates chart context to that of the active chart.
	 *
	 * @tsmember WebComponents.ViewDialog
	 */
	updateContext() {
		const { topNode } = this.context;
		let activeChart = topNode.querySelector(
			"cq-context-wrapper.active cq-context"
		);

		if (!activeChart) {
			if (topNode.multiChartContainer) {
				activeChart = topNode.multiChartContainer.querySelector(
					"cq-context-wrapper.active cq-context"
				);
			}
		}
		if (activeChart) {
			this.context = activeChart.CIQ.UI.context;
		}
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ViewDialog
 */
ViewDialog.markup = `
		<div style="text-align:center;margin-top:10px;">
			<label for="cq-view-dialog-input-name"><div>Enter name of view:</div>
				<br>
				<input id="cq-view-dialog-input-name" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" maxlength="40" placeholder="Name"></input><br>
				<br>
			</label>
			<button class="ciq-btn" stxtap="save()">Save</button>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-view-dialog", ViewDialog);
