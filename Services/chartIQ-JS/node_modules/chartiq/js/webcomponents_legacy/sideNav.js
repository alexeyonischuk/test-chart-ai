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
 * The side navigation web component `<cq-side-nav>`.
 *
 * Responds to the `breakpoint` and `sidenav` channels to control side navigation panel
 * availability.
 *
 * @namespace WebComponents.cq-side-nav
 * @since 7.5.0
 */
class SideNav extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, SideNav);
	}

	/**
	 * Subscribes to the `sidenav`, `breakpoint`, and `tfc` channels. Sets the side navigation
	 * availability based on the contents of the channels.
	 *
	 * @param {object} params context Function parameters.
	 * @param {object} params.config Chart configuration.
	 * @param {object} params.config.channels The web component communication channels.
	 * @param {CIQ.ChartEngine} [stx] A reference to the chart engine. Unused.
	 *
	 * @alias setContext
	 * @memberof WebComponents.cq-side-nav
	 * @since 7.5.0
	 */
	setContext({ config: { channels = {} } = {}, stx }) {
		const node = this.querySelector("div");
		const isOn = this.getAttribute("cq-on") || "sidenavOn";
		const isOff = this.getAttribute("cq-off") || "sidenavOff";
		const breakpointChannel = channels.breakpoint || "channel.breakpoint";
		const sidenavChannel = channels.sidenav || "layout.sidenav";
		const sidenavSizeChannel = channels.sidenavSize || "channel.sidenavSize";
		const tfcChannel = channels.tfc || "channel.tfc";

		const setActive = () => {
			const breakpointValue = this.channelRead(breakpointChannel);

			let available = this.channelRead(breakpointChannel) === "break-sm";
			if (
				typeof breakpointValue === "string" &&
				breakpointValue.includes("height")
			) {
				// When setting a vertical breakpoint, use the sidenav class to determine existing availability of side menu.
				available = node.classList.contains("sidenav");
			}

			const show = available && this.channelRead(sidenavChannel) === isOn;

			node.classList.remove("sidenav", "ciq-toggles");
			node.classList.add(available ? "sidenav" : "ciq-toggles");

			node.classList[show ? "add" : "remove"]("active");

			this.channelWrite(
				sidenavSizeChannel,
				show ? node.getBoundingClientRect().width : 0
			);
		};

		this.channelSubscribe(sidenavChannel, setActive);
		this.channelSubscribe(breakpointChannel, setActive);
		this.channelSubscribe(tfcChannel, (isActive) => {
			if (isActive) this.channelWrite(sidenavChannel, isOff);
		});
	}
}

CIQ.UI.addComponentDefinition("cq-side-nav", SideNav);
