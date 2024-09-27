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
 * <h4>&lt;cq-side-nav&gt;</h4>
 *
 * Responds to the `breakpoint` and `sidenav` channels to control side navigation panel
 * availability.
 *
 * @alias WebComponents.SideNav
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 7.5.0
 */
class SideNav extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, SideNav);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * Subscribes to the `sidenav`, `breakpoint`, and `tfc` channels. Sets the side navigation
	 * availability based on the contents of the channels.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.SideNav
	 * @since 7.5.0
	 */
	setContext(context) {
		const { config: { channels = {} } = {} } = context;
		if (this.init) return;
		this.init = true;
		const node = this.querySelector("div");
		const toggleWrapper = this.qs(".sidenav-toggle", "thisChart");
		const isOn = this.getAttribute("cq-on") || "sidenavOn";
		const isOff = this.getAttribute("cq-off") || "sidenavOff";
		const breakpointChannel = channels.breakpoint || "channel.breakpoint";
		const crosshairChannel = channels.crosshair || "layout.crosshair";
		const headsUpChannel = channels.headsUp || "layout.headsUp";
		const sidenavChannel = channels.sidenav || "layout.sidenav";
		const sidenavSizeChannel = channels.sidenavSize || "channel.sidenavSize";
		const tfcChannel = channels.tfc || "channel.tfc";

		this.insertAdjacentHTML(
			"afterend",
			"<span sidenav-placeholder aria-hidden=false></span>"
		);

		let prevBreakSm;
		let isBreakSm;
		const setActive = () => {
			const breakpointValue = this.channelRead(breakpointChannel);
			const crosshairActive = this.channelRead(crosshairChannel);
			const sideChannel = this.channelRead(sidenavChannel);

			if (
				typeof breakpointValue === "string" &&
				!breakpointValue.includes("height")
			) {
				isBreakSm = breakpointValue === "break-sm";
			}

			const show = isBreakSm && sideChannel === isOn;

			if (!node) return;
			node.classList.remove("sidenav", "ciq-toggles");
			node.classList.add(isBreakSm ? "sidenav" : "ciq-toggles");

			node.classList[show ? "add" : "remove"]("active");

			this.channelWrite(
				sidenavSizeChannel,
				show ? node.getBoundingClientRect().width : 0
			);

			if (toggleWrapper) {
				toggleWrapper
					.querySelectorAll("cq-menu")
					.forEach((el) => el.setAttribute("aria-hidden", isBreakSm));

				// For accesibilty sequencing move panel inside wrapper
				if (prevBreakSm !== isBreakSm) {
					prevBreakSm = isBreakSm;
					if (isBreakSm) {
						this.preventChildNodeDisconnect();
						toggleWrapper.append(this);
						this.preventChildNodeDisconnect(false);
					} else {
						const placeholder = this.qs("[sidenav-placeholder]", "thisChart");
						if (placeholder) {
							this.preventChildNodeDisconnect();
							placeholder.before(this);
							this.preventChildNodeDisconnect(false);
						}
					}
				}
			}

			this.setAttribute("aria-hidden", isBreakSm && !show);
			if (isBreakSm) {
				this.channelWrite(headsUpChannel, "static");
				if (!crosshairActive) this.channelWrite(crosshairChannel, false);
			}
		};

		this.channelSubscribe(sidenavChannel, setActive);
		this.channelSubscribe(breakpointChannel, setActive);
		this.channelSubscribe(tfcChannel, (isActive) => {
			if (isActive) this.channelWrite(sidenavChannel, isOff);
		});
	}

	/**
	 * Marks child toggle component status for disconnect call
	 *
	 * @param {boolean} [val] Value of disconnect status defaults to true preventing disconnect call from running.
	 * @private
	 *
	 * @tsmember WebComponents.SideNav
	 * @since 9.1.0
	 */
	preventChildNodeDisconnect(val = true) {
		this.querySelectorAll("cq-toggle").forEach((ch) => {
			if (val) ch.doNotDisconnect = val;
			else delete ch.doNotDisconnect;
		});
	}
}

CIQ.UI.addComponentDefinition("cq-side-nav", SideNav);
