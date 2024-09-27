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
 * <h4>&lt;cq-views&gt;</h4>
 *
 * This web component displays available views in a menu.  It also allows for custom views to be removed.
 * The menu updates automatically with new views that are created from the views dialog.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a view is selected or removed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select", "remove" |
 * | action | "click" |
 * | value | _layout_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.Views
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class Views extends CIQ.UI.ContextTag {
	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Views);
		this.constructor = Views;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Views
	 */
	setContext(context) {
		this.addDefaultMarkup();
		this.config = context.config;
		this.initialize();
	}

	/**
	 * Initializes the views menu.
	 *
	 * @param {object} [config] Parameters used to initialize the menu.
	 * @param {object} [config.viewObj = { views: [] }] Contains the menu items; that is, an array
	 * 		of objects that contain the specifications for saved views of the chart.
	 * @param {object} [config.nameValueStore] The class or constructor function that saves and
	 * 		retrieves the chart views by means of a name/value store. See the custom storage
	 * 		class example below. Defaults to the `nameValueStore` property of the chart
	 * 		configuration if available (see the {@tutorial Chart Configuration} tutorial);
	 * 		otherwise, defaults to {@link CIQ.NameValueStore}.
	 * @param {object} [config.renderCB = null] A callback function executed on the menu after the
	 * 		menu has been rendered. Takes the menu as an argument.
	 * @param {object} [config.cb] A callback function called when the saved views have been
	 * 		retrieved from the name/value store. No arguments are passed to the callback function.
	 *
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
	 * let self = CIQ.UI.BaseComponent.prototype.qsa("cq-views", null, true)[0];
	 * self.params.nameValueStore.get("stx-views", function(err, obj) {
	 *     if (!err && obj) self.params.viewObj.views = obj;
	 *     else self.params.viewObj = { views: [] };
	 *     if (self.params.cb) self.params.cb.call(self);
	 *     self.renderMenu();
	 * // alternatively, if existing storage configuration is sufficient, to perform the same function:
	 * self.initialize();
	 * });
	 *
	 * @tsmember WebComponents.Views
	 */
	initialize(config) {
		if (!config) config = this.config;
		const { nameValueStore, menuViewConfig } = config;
		this.params = Object.assign({}, menuViewConfig);

		CIQ.ensureDefaults(this.params, {
			viewObj: { views: [] },
			nameValueStore:
				(nameValueStore && new nameValueStore()) ||
				(CIQ.NameValueStore && new CIQ.NameValueStore())
		});
		const { params } = this;
		if (params.nameValueStore)
			params.nameValueStore.get("stx-views", (err, obj) => {
				if (!err && obj) params.viewObj.views = obj;
				if (params.cb) params.cb.call(this);
				this.renderMenu();
			});
	}

	/**
	 * Creates the menu.
	 *
	 * @tsmember WebComponents.Views
	 */
	renderMenu() {
		const remove = (i, layout) => {
			return (e) => {
				e.stopPropagation();
				this.emitCustomEvent({
					effect: "remove",
					detail: { value: layout }
				});
				const { views } = this.params.viewObj;
				views.splice(i, 1);
				if (this.params.nameValueStore)
					this.params.nameValueStore.set("stx-views", views);
				const viewMenus =
					this.root !== this
						? CIQ.UI.shadowComponents
						: new Map(
								this.context.topNode.CIQ.UI.Components.map((el) => [
									el,
									this.context.topNode
								])
						  );

				viewMenus.forEach((ctx, el) => {
					if (el.tagName === this.tagName && ctx === this.context.topNode) {
						el.params.viewObj.views = views.slice(0);
						el.renderMenu();
					}
				});
			};
		};

		const enable = (i, layout) => {
			return (e) => {
				this.emitCustomEvent({
					effect: "select",
					detail: { value: layout }
				});
				const { loader } = this.context;
				if (loader) loader.show();
				const importLayout = () => {
					const { stx } = this.context;
					const finishImportLayout = () => {
						stx.changeOccurred("layout");
						if (loader) loader.hide();
					};
					stx.importLayout(this.params.viewObj.views[i][layout], {
						managePeriodicity: true,
						preserveTicksAndCandleWidth: true,
						cb: finishImportLayout
					});
				};
				setTimeout(importLayout, 10);
			};
		};

		this.root.querySelectorAll(".list .item").forEach((el) => el.remove());
		const div = this.root.querySelector(".list");
		this.params.viewObj.views.forEach((view, i) => {
			const key = CIQ.first(view);
			if (key == "recent") return;
			const item = CIQ.UI.makeFromTemplate(div.querySelector("template"))[0];
			const label = item.querySelector("[label]");
			if (label) {
				label.innerText = key; //using innerText here to prevent script injection
				const trimmedKey = key.trim().replace(/\s+/g, "-"); // replace inner whitespace with dashes
				label.classList.add("view-name-" + trimmedKey);
			}
			const removeView = item.querySelector(".close");
			if (removeView) {
				removeView.setAttribute("keyboard-selectable-child", "");
				CIQ.UI.stxtap(removeView, remove(i, key));
			}
			this.makeTap(item, enable(i, key));
			div.appendChild(item);
		});
		if (this.params.renderCB) this.params.renderCB(this);
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Views
 */
Views.markup = `
		<div class="list" filter-name="views">
			<template>
				<div class="item" keyboard-selectable>
					<span label role="menuitem"></span>
					<div class="icon close ciq-icon ciq-close">
						<div class="ciq-screen-reader" role="button">Remove this view</div>
					</div>
				</div>
			</template>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-views", Views);
