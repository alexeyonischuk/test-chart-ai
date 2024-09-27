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
import "../../js/webcomponents_legacy/heading.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Views web component `<cq-views>`.
 *
 * Displays a menu containing available saved chart views and provides a dialog for saving new
 * views.
 *
 * @namespace WebComponents.cq-views
 *
 * @example
 * <cq-menu class="ciq-menu ciq-views collapse">
 *     <span>Views</span>
 *     <cq-menu-dropdown>
 *         <cq-views>
 *             <cq-heading>Saved Views</cq-heading>
 *             <cq-views-content>
 *                 <template cq-view>
 *                     <cq-item>
 *                         <cq-label></cq-label>
 *                         <div class="ciq-icon ciq-close"></div>
 *                     </cq-item>
 *                 </template>
 *             </cq-views-content>
 *             <cq-separator cq-partial></cq-separator>
 *             <cq-view-save>
 *                 <cq-item><cq-plus></cq-plus>Save View</cq-item>
 *             </cq-view-save>
 *         </cq-views>
 *     </cq-menu-dropdown>
 * </cq-menu>
 */
class Views extends CIQ.UI.ContextTag {
	/**
	 * Initializes the views menu.
	 *
	 * @param {object} [params] Parameters used to initialize the menu.
	 * @param {object} [params.viewObj = { views: [] }] Contains the menu items; that is, an array
	 * 		of objects that contain the specifications for saved views of the chart.
	 * @param {object} [params.nameValueStore] The class or constructor function that saves and
	 * 		retrieves the chart views by means of a name/value store. See the custom storage
	 * 		class example below. Defaults to the `nameValueStore` property of the chart
	 * 		configuration if available (see the {@tutorial Chart Configuration} tutorial);
	 * 		otherwise, defaults to {@link CIQ.NameValueStore}.
	 * @param {object} [params.renderCB = null] A callback function executed on the menu after the
	 * 		menu has been rendered. Takes the menu as an argument.
	 * @param {object} [params.cb] A callback function called when the saved views have been
	 * 		retrieved from the name/value store. No arguments are passed to the callback function.
	 *
	 * @memberof WebComponents.cq-views
	 * @since
	 * - 3.0.7 Added the `params.cb` parameter.
	 * - 4.1.0 The `ViewMenu` helper has been deprecated. Call
	 * 		`document.querySelector("cq-views").initialize()` instead.
	 *
	 * @example <caption>Create a custom name/value store for the <code>cq-views</code> web component.</caption>
	 * // Set the custom name/value store as the storage location for the web component.
	 * document.querySelector("cq-views").initialize({ nameValueStore: MyNameValueStore });
	 *
	 * // Create the custom name/value store.
	 * const MyNameValueStore = function() { };
	 *
	 * // Create custom storage functions using the same signatures and callback requirements as those in CIQ.NameValueStore.
	 * // For the cq-views web component, the data that is saved and retrieved is the array represented by params.viewObj.views.
	 *
	 * MyNameValueStore.prototype.set = function(name, value, cb) {
	 *     // Add code here to send the view object (value) to your repository and store it under the provided key (name).
	 *     if (cb) cb(error);
	 * };
	 *
	 * MyNameValueStore.prototype.get = function(name, cb) {
	 *     // Add code here to get the view object for the provided key (name) from your repository and pass it to the callback.
	 *     cb(error, viewObj);
	 * };
	 *
	 * MyNameValueStore.prototype.remove = function(name, cb) {
	 *     // Add code here to remove the view object associated with the provided key (name) from your repository.
	 *     if (cb) cb(error);
	 * };
	 *
	 * @example <caption>Reload the drop-down menu with the latest stored data.<br>
	 * (Useful if you are sharing the data with other applications that may also be modifying the
	 * data in real time.)</caption>
	 * let self = document.querySelector("cq-views");
	 * self.params.nameValueStore.get("stx-views", function(err, obj) {
	 *     if (!err && obj) self.params.viewObj.views = obj;
	 *     else self.params.viewObj = { views: [] };
	 *     if (self.params.cb) self.params.cb.call(self);
	 *     self.renderMenu();
	 * });
	 */
	initialize(params) {
		this.params = Object.assign({}, params);

		const { config } = this.context;
		let { nameValueStore } = config;

		CIQ.ensureDefaults(this.params, {
			viewObj: { views: [] },
			nameValueStore:
				(nameValueStore && new nameValueStore()) ||
				(CIQ.NameValueStore && new CIQ.NameValueStore()),
			template: "template[cq-view]"
		});
		this.params.template = this.querySelector(this.params.template);
		var self = this;
		if (this.params.nameValueStore)
			this.params.nameValueStore.get("stx-views", function (err, obj) {
				if (!err && obj) self.params.viewObj.views = obj;
				if (self.params.cb) self.params.cb.call(self);
				self.renderMenu();
			});
	}

	connectedCallback() {
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Views);
		this.constructor = Views;
	}

	setContext({ config }) {
		this.addDefaultMarkup();
		if (config && config.menuViewConfig) {
			this.initialize(config.menuViewConfig);
		}
	}

	/**
	 * Creates the menu.
	 *
	 * @memberof WebComponents.cq-views
	 */
	renderMenu() {
		var menu = this.node;
		var self = this;

		function remove(i) {
			return function (e) {
				e.stopPropagation();
				var saved = false;
				self.ownerDocument.querySelectorAll("cq-views").forEach(function (v) {
					v.params.viewObj.views.splice(i, 1);
					if (!saved) {
						if (v.params.nameValueStore)
							v.params.nameValueStore.set(
								"stx-views",
								self.params.viewObj.views
							);
						saved = true;
					}
					v.renderMenu();
				});
			};
		}

		function enable(i) {
			return function (e) {
				e.stopPropagation();
				self.uiManager.closeMenu();
				if (self.context.loader) self.context.loader.show();
				var layout = CIQ.first(self.params.viewObj.views[i]);
				function importLayout() {
					var stx = self.context.stx;
					var finishImportLayout = function () {
						stx.changeOccurred("layout");
						if (self.context.loader) self.context.loader.hide();
					};
					stx.importLayout(self.params.viewObj.views[i][layout], {
						managePeriodicity: true,
						preserveTicksAndCandleWidth: true,
						cb: finishImportLayout
					});
				}
				setTimeout(importLayout, 10);
			};
		}

		menu.find("cq-views-content cq-item").remove();
		for (var v = 0; v < this.params.viewObj.views.length; v++) {
			var view = CIQ.first(self.params.viewObj.views[v]);
			if (view == "recent") continue;
			var item = CIQ.UI.makeFromTemplate(this.params.template);
			var label = item.find("cq-label");
			var removeView = item.find("div");

			if (label.length) {
				label.text(view); //using text() here to prevent script injection
				const trimmedView = view.trim().replace(/\s+/g, "-"); // replace inner whitespace with dashes
				label.addClass("view-name-" + trimmedView);
			}
			if (removeView.length) CIQ.UI.stxtap(removeView[0], remove(v));
			this.makeTap(item[0], enable(v));
			menu.find("cq-views-content").append(item);
		}

		var addNew = menu.find("cq-view-save");
		if (addNew) {
			const { context } = this;
			const self = this;
			this.makeTap(addNew.find("cq-item")[0], function (e) {
				if (context.config) {
					self.channelWrite(context.config.channels.dialog, {
						type: "view",
						params: { context }
					});
				} else {
					self.ownerDocument.querySelector("cq-view-dialog").open({ context });
				}
				const uiManager = CIQ.UI.getUIManager(this);
				const viewMenu = context.topNode.querySelector(".ciq-views");
				if (uiManager && viewMenu) uiManager.closeMenu(viewMenu);
			});
		}
		if (this.params.renderCB) this.params.renderCB(menu);
	}
}

Views.markup = `
		<cq-heading>Saved Views</cq-heading>
		<cq-views-content>
			<template cq-view>
				<cq-item>
					<cq-label></cq-label>
					<div class="ciq-icon ciq-close" keyboard-selectable-child="true"></div>
				</cq-item>
			</template>
		</cq-views-content>
		<cq-separator cq-partial></cq-separator>
		<cq-view-save>
			<cq-item><cq-plus></cq-plus>Save View</cq-item>
		</cq-view-save>
	`;
CIQ.UI.addComponentDefinition("cq-views", Views);
