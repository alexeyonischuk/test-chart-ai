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


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * View Dialog web component `<cq-view-dialog>`.
 *
 * See {@link WebComponents.cq-views} for more details on menu management for this component.
 *
 * @namespace WebComponents.cq-view-dialog
 *
 * @example
 * <cq-dialog>
 *     <cq-view-dialog>
 *         <h4>Save View</h4>
 *         <div stxtap="close()" class="ciq-icon ciq-close"></div>
 *         <div style="text-align:center;margin-top:10px;">
 *             <i>Enter name of view:</i>
 *             <p>
 *                 <input spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" maxlength="40" placeholder="Name"><br>
 *             </p>
 *             <span class="ciq-btn" stxtap="save()">Save</span>
 *         </div>
 *     </cq-view-dialog>
 * </cq-dialog>
 */
class ViewDialog extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ViewDialog);
		this.constructor = ViewDialog;
	}

	open(params) {
		this.addDefaultMarkup();
		this.querySelector("input").value = "";
		super.open(params);
	}

	/**
	 * Saves the new view. This updates all cq-view menus on the screen and persists the view in the nameValueStore.
	 * @alias save
	 * @memberof WebComponents.cq-view-dialog
	 */
	save() {
		const viewName = this.node.find("input").val();
		if (!viewName) return;

		let madeChange = false;
		this.updateContext();
		const layout = this.context.stx.exportLayout();
		this.ownerDocument.querySelectorAll("cq-views").forEach(function (v) {
			const obj = v.params.viewObj;
			let view;

			for (var i = 0; i < obj.views.length; i++) {
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
		});
		this.close();
	}

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

ViewDialog.markup = `
		<h4>Save View</h4>
		<div stxtap="close()" class="ciq-icon ciq-close"></div>
		<div style="text-align:center;margin-top:10px;">
		<i>Enter name of view:</i>
		<p>
			<input spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" maxlength="40" placeholder="Name"><br>
		</p>
		<span class="ciq-btn" stxtap="save()">Save</span>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-view-dialog", ViewDialog);
