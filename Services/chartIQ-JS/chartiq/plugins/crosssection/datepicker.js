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
import Pikaday from "./thirdparty/pikaday.esm.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./datepicker.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./datepicker.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("./datepicker.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "datepicker")); // a framework, such as Angular, may require style addition

/**
 * Date picker web component `<cq-datepicker>`.
 *
 * This web component enables users to enter dates. It works as a wrapper for the Pikaday datepicker, and as such,
 * requires Pikaday.js as a dependency. When the web component loads, it looks for a `div` with the ID "datepicker"
 * and loads the Pikaday datepicker on that `div`.
 *
 * @name CIQ.UI.Datepicker
 * @namespace WebComponents.cq-datepicker
 * @since 7.3.0
 *
 * @example
 * <cq-datepicker>
 *     <div id="datepicker"></div>
 * </cq-datepicker>
 */
class Datepicker extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.callbacks = [];
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;

		const loadComponent = () => {
			const picker = new Pikaday({
				onSelect: (date) => {
					this.executeCallbacks(this.setLive ? "live" : date);
					this.setLive = false;
				}
			});

			picker.hide(); // no simple way to initialize hidden/closed without binding to a form

			this.picker = picker;
			this.insertBefore(picker.el, this.firstElementChild);

			CIQ.UI.stxtap(
				this,
				() => {
					this.setLive = true;
					picker.setDate(new Date());
				},
				".ciq-btn"
			);
		};

		cssReady.then(loadComponent);

		CIQ.UI.stxtap(this, function (event) {
			// prevent datepicker from closing on clicks
			event.stopPropagation();
		});

		const menu = this.closest("cq-menu");
		if (menu) {
			// specifying show/hide is to prevent picker from listening to keypress events unless visible
			const menuObserver = new MutationObserver(() => {
				if (menu.classList.contains(menu.activeClassName)) {
					this.picker.show();
				} else {
					this.picker.hide();
				}
			});
			menuObserver.observe(menu, { attributes: true });
		}

		const dialog = this.closest("cq-dialog");
		if (dialog) {
			// `picker.show()` gets called from within the dialog so we can safely hide on any mutation
			const menuObserver = new MutationObserver(() => this.picker.hide());
			menuObserver.observe(dialog, { attributeFilter: ["cq-active"] });
		}

		super.connectedCallback();
	}

	registerCallback(cb) {
		this.callbacks.push(cb);
	}

	executeCallbacks(date) {
		this.callbacks.forEach(function (cb) {
			cb(date);
		});
	}
}

CIQ.UI.addComponentDefinition("cq-datepicker", Datepicker);
