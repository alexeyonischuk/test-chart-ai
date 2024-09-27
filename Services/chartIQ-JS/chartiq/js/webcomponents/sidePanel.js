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
 * <h4>&lt;cq-side-panel&gt;</h4>
 *
 * This component is a container for one or more plugins that render to the "side" of the chart.
 * It controls its own visibility as well as the visibility of the plugins within it.
 *
 * Use component's open() and close() methods to show and hide.
 *
 * _**Attributes**_
 *
 * The following attributes are supported:
 * | attribute       | description |
 * | :-------------- | :---------- |
 * | cq-active       | Reflects the shown/hidden status of the component. Read only. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component whenever the component is opened or closed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "channel" |
 * | effect | "open", "close" |
 * | action | null |
 *
 * @alias WebComponents.SidePanel
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 */
class SidePanel extends CIQ.UI.ContextTag {
	constructor() {
		super();
		this.callbacks = [];
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, SidePanel);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	setContext(context) {
		const { config, stx } = context;
		if (!config) return;

		const { channels = {} } = config;
		const resizeHandler = this.resizeMyself.bind(this);

		const handleSizeChanges = () => {
			setTimeout(resizeHandler);
		};

		const handleTfcOpen = (isOpen) => {
			if (isOpen) this.setAttribute("cq-active", true);
			else this.removeAttribute("cq-active");
			this.emitCustomEvent({
				action: null,
				cause: "channel",
				effect: isOpen ? "open" : "close"
			});

			handleSizeChanges();
		};

		this.channelSubscribe(
			channels.breakpoint || "channel.breakpoint",
			handleSizeChanges
		);
		this.channelSubscribe(channels.tfc || "channel.tfc", handleTfcOpen, stx);
	}

	/**
	 * Closes child plugins.
	 * @private
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	cleanup() {
		[...this.children].forEach((child) => {
			if (child.sidePanelActiveClass)
				child.classList.remove(child.sidePanelActiveClass);
			// turn off a child by removing the class name added to it
			else child.removeAttribute(child.sidePanelActiveAttribute); // turn off a child by removing the attribute name added to it
		});
	}

	/**
	 * Closes the side panel and all of its child plugins.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	close() {
		this.removeAttribute("cq-active");
		this.cleanup();
		this.emitCustomEvent({
			effect: "close",
			action: null
		});
		setTimeout(() => this.resizeMyself(), 0);
	}

	/**
	 * Use this method to get the width instead of querying the node directly because the side panel may be animated.
	 *
	 * @return {number} The width
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	nonAnimatedWidth() {
		let width = 0;
		[...this.children].forEach(
			(child) => (width += CIQ.elementDimensions(child).width)
		); // accumulate width of all children
		return width;
	}

	/**
	 * Opens the side panel to show more plugins.
	 *
	 * @param  {Object} params Parameters
	 * @param {string} params.selector The selector for which child to enable.
	 * @param {string} [params.className] The class name to add to turn on the panel.
	 * @param {string} [params.attribute] The attribute to add to turn on the panel.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	open(params) {
		this.cleanup();
		const children = this.querySelectorAll(params.selector);
		if (params.className) {
			[...children].forEach((child) => {
				child.classList.add(params.className);
				child.sidePanelActiveClass = params.className; // store the class name used to turn it on
			});
		} else {
			[...children].forEach((child) => {
				child.setAttribute(params.attribute, "true");
				child.sidePanelActiveAttribute = params.attribute; // store the attribute name used to turn it on
			});
		}
		this.setAttribute("cq-active", "true");
		this.emitCustomEvent({
			effect: "open",
			action: null
		});
		setTimeout(() => this.resizeMyself(), 0);
	}

	/**
	 * Sets any callback to be executed when the side panel resizes.
	 *
	 * @param {function} fc Callback function.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	registerCallback(fc) {
		this.callbacks.push(fc);
	}

	/**
	 * Resizes this component.
	 * Any registered callbacks will execute after the width adjustment.
	 *
	 * @tsmember WebComponents.SidePanel
	 */
	resizeMyself() {
		const width = this.nonAnimatedWidth();
		this.style.width = width + "px"; // expand the side panel
		this.callbacks.forEach((cb) => cb.call(this, width));

		// channel notification
		const { config, stx } = this.context || {};
		if (!config) return;
		const channel =
			(config.channels || {}).sidepanelSize || "channel.sidepanelSize";
		this.channelWrite(channel, width, stx);
	}
}

/**
 * A side panel contains children that should be enabled by calling open({selector:selector}).
 */
CIQ.UI.addComponentDefinition("cq-side-panel", SidePanel);
