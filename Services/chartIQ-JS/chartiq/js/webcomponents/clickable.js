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
 * <h4>&lt;cq-clickable&gt;</h4>
 *
 * When tapped/clicked, this component can run a method on another component. Set the
 * `selector` attribute to a selector for the other component. Set `method` attribute to the method
 * on that other component that should be executed. The parameter provided to the method is an object that contains
 * the context (if available) for this clickable component ("context") and a reference to the
 * component ("caller").
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | method | A function within another web component to call. |
 * | selector | A css selector to another web component. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "click" |
 * | action | "click" |
 *
 * @example <caption>Component with method and selector.
 *          When clicked, the following equivalent code is run from within the component:<br>
 *          <pre>document.querySelector("cq-sample-dialog").open({context: this.context, caller: this});</pre></caption>
 * <cq-clickable selector="cq-sample-dialog" method="open">Settings</cq-clickable>
 *
 * @alias WebComponents.Clickable
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 3.0.9
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Clickable extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["method", "selector"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		CIQ.UI.stxtap(this, (e) => {
			if (!CIQ.climbUpDomTree(this, "cq-menu", true).length)
				e.stopPropagation();
			this.runMethod();
			this.emitCustomEvent({
				effect: "click"
			});
		});
		this.setAttribute("role", "button");

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Clickable);
	}

	/**
	 * Runs a method on the clickable component.
	 *
	 * @tsmember WebComponents.Clickable
	 */
	runMethod() {
		const selector = this.selector;
		const method = this.method;
		if (!selector || !method) return;

		const { context } = this;

		if (/-dialog/.test(selector) && method === "open" && context.config) {
			const channel =
				(context.config.channels || {}).dialog || "channel.dialog";

			this.channelWrite(
				channel,
				{
					type: selector.replace(/cq-|-dialog/g, ""),
					params: {
						context,
						caller: this,
						initiatingMenu: CIQ.climbUpDomTree(this, "cq-menu", true)[0]
					}
				},
				context.stx
			);
			return;
		}

		const clickable = this;
		this.qsa(selector, this.context.topNode, true).forEach(function (i) {
			if (i[method])
				i[method].call(i, {
					context: clickable.context,
					caller: clickable
				});
		});
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Clickable
	 */
	setContext(context) {
		this.addDefaultMarkup(); // this will put any children into shadowRoot
	}
}

CIQ.UI.addComponentDefinition("cq-clickable", Clickable);
