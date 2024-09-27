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

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Clickable web component `<cq-clickable>`.
 *
 * When tapped/clicked, this component can run a method on any other component. Set the
 * `cq-selector` attribute to a selector for the other component. Set `cq-method` to the method
 * to run on that component. The parameter provided to the method is an object that contains
 * the context (if available) for this clickable component ("context") and a reference to the
 * component ("caller").
 *
 * For example:
 * ```html
 * <cq-clickable cq-selector="cq-sample-dialog" cq-method="open">Settings</cq-clickable>
 * ```
 * runs
 * ```js
 * document.querySelector("cq-sample-dialog").open({context: this.context, caller: this});
 * ```
 *
 * @namespace WebComponents.cq-clickable
 * @since 3.0.9
 */
class Clickable extends CIQ.UI.ContextTag {
	connectedCallback() {
		if (this.attached) return;
		super.connectedCallback();
		var self = this;

		CIQ.UI.stxtap(this, function (e) {
			if (!this.closest("cq-menu")) {
				this.uiManager.closeMenu();
				e.stopPropagation();
			}
			self.runMethod();
		});
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Clickable);
	}

	/**
	 * Runs a method on the clickable component.
	 *
	 * @alias runMethod
	 * @memberof WebComponents.cq-clickable
	 */
	runMethod() {
		const { context } = this;
		const selector = this.getAttribute("cq-selector");
		const method = this.getAttribute("cq-method");

		if (/-dialog/.test(selector) && method === "open" && context.config) {
			const channel =
				(context.config.channels || {}).dialog || "channel.dialog";

			this.channelWrite(
				channel,
				{
					type: selector.replace(/cq-|-dialog/g, ""),
					params: { context, caller: this }
				},
				context.stx
			);
			return;
		}

		var clickable = this;
		this.ownerDocument.querySelectorAll(selector).forEach(function (i) {
			if (i[method])
				i[method].call(i, {
					context: clickable.context,
					caller: clickable
				});
		});
	}
}

CIQ.UI.addComponentDefinition("cq-clickable", Clickable);
