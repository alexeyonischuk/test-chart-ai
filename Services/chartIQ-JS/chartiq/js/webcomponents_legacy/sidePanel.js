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
 * Side Panel web component `<cq-side-panel>`.
 *
 * @namespace WebComponents.cq-side-panel
 *
 * @example
 * <cq-side-panel><cq-side-panel>
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

	setContext(context) {
		const { config, stx } = context;
		if (!config) return;

		const { channels = {} } = config;
		const resizeHandler = this.resizeMyself.bind(this);
		const { node } = this;

		this.channelSubscribe(
			channels.breakpoint || "channel.breakpoint",
			handleSizeChanges
		);
		this.channelSubscribe(channels.tfc || "channel.tfc", handleTfcOpen, stx);

		function handleSizeChanges() {
			setTimeout(resizeHandler);
		}

		function handleTfcOpen(isOpen) {
			if (isOpen) node.attr("cq-active", true);
			else node.removeAttr("cq-active");

			handleSizeChanges();
		}
	}

	close() {
		this.node.removeAttr("cq-active");
		var children = this.node.children();
		children.each(function () {
			if (this.sidePanelActiveClass)
				this.classList.remove(this.sidePanelActiveClass);
			// turn off a child by removing the class name added to it
			else this.removeAttribute(this.sidePanelActiveAttribute); // turn off a child by removing the attribute name added to it
		});
		var self = this;
		setTimeout(function () {
			self.resizeMyself();
		}, 0);
	}

	/**
	 * Use this method to get the width instead of querying the node directly because the side panel may be animated.
	 * @return {number} The width
	 */
	nonAnimatedWidth() {
		var width = 0;
		Array.from(this.children).forEach(function (child) {
			width += CIQ.elementDimensions(child).width;
		}); // accumulate width of all children
		return width;
	}

	/**
	 * Opens a side panel to show more options in mobile.
	 * @param  {Object} params Parameters
	 * @param {string} params.selector The selector for which child to enable
	 * @param {string} [params.className] The class name to add to turn on the panel
	 * @param {string} [params.attribute] The attribute to add to turn on the panel
	 * @alias open
	 * @memberof WebComponents.cq-side-panel
	 */
	open(params) {
		this.close();
		var children = this.node.find(params.selector);
		if (params.className) {
			children.addClass(params.className);
			children.each(function () {
				this.sidePanelActiveClass = params.className; // store the class name used to turn it on
			});
		} else {
			children.attr(params.attribute, "true");
			children.each(function () {
				this.sidePanelActiveAttribute = params.attribute; // store the attribute name used to turn it on
			});
		}
		this.node.attr("cq-active", "true");
		var self = this;
		setTimeout(function () {
			self.resizeMyself();
		}, 0);
	}

	registerCallback(fc) {
		this.callbacks.push(fc);
	}

	resizeMyself() {
		var width = this.nonAnimatedWidth();
		this.node.css({ width: width + "px" }); // expand the side panel
		for (
			var i = 0;
			i < this.callbacks.length;
			i++ // let any callbacks know that we've been resized
		)
			this.callbacks[i].call(this, width);

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
