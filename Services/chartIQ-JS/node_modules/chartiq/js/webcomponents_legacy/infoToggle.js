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
import "../../js/webcomponents/headsupDynamic.js";
import "../../js/webcomponents/headsupStatic.js";
import "../../js/webcomponents_legacy/toggle.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * The information toggle web component `<cq-info-toggle>`.
 *
 * Provides toggle management for the three-state heads-up display.
 *
 * By default, the component toggles among three states: `dynamic`, `static`, and `null` (off).
 * States are changed using the `cq-toggles` attribute which can have any of the three toggle
 * values: `dynamic`, `static`, or `null`.
 *
 * The component appends a [cq-hu-dynamic]{@link WebComponents.cq-hu-dynamic} or
 * [cq-hu-static]{@link WebComponents.cq-hu-static} element to the top node of the chart
 * context if one is required and not already present.
 *
 * The info toggle is mobile and crosshairs aware and can change the toggle state to
 * accommodate both conditions; for example, if the crosshairs are active or the chart is on a
 * mobile device, the component automatically makes the heads-up display static.
 *
 * @namespace WebComponents.cq-info-toggle
 * @since 7.5.0
 *
 * @example
 * <cq-toggle
 *     class="ciq-HU"
 *     cq-member="headsUp",
 *     cq-toggles="dynamic,static,null">
 *     <span></span>
 *     <cq-tooltip>Info</cq-tooltip>
 * </cq-toggle>
 */
class InfoToggle extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, InfoToggle);
		this.constructor = InfoToggle;
	}

	/**
	 * Adds the default markup. Sets the toggle tooltip. Subscribes to the `headsUp` and
	 * `crosshair` channels. Appends a [cq-hu-dynamic]{@link WebComponents.cq-hu-dynamic} or
	 * [cq-hu-static]{@link WebComponents.cq-hu-static} element to the top node of the chart
	 * context if one is not already attached.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @alias setContext
	 * @memberof WebComponents.cq-info-toggle
	 * @since 7.5.0
	 */
	setContext(context) {
		let markup = this.constructor.markup;
		const toggles = this.getAttribute("cq-toggles");
		if (toggles) {
			markup = markup.replace(/dynamic,static,null/, toggles);
		}

		this.addDefaultMarkup(this, markup);
		this.tooltip = this.querySelector("cq-tooltip");

		let channels = context.config
			? context.config.channels
			: {
					headsUp: "layout.headsUp",
					crosshair: "layout.crosshair"
			  };
		this.channelSubscribe(channels.headsUp, () => this.applyValues(channels));

		this.channelSubscribe(channels.crosshair, (value) => {
			if (
				(CIQ.isMobile || value) &&
				this.channelRead(channels.headsUp) === "dynamic"
			) {
				setTimeout(() => this.channelWrite(channels.headsUp, "static"));
			}
		});

		this.initInfoComponents(context);
	}

	/**
	 * Sets a tooltip on the toggle.
	 *
	 * @param {String} value The text of the tooltip, which is appended to the string "Info ".
	 * 		If a value is not provided, the tooltip is "Info off".
	 *
	 * @alias setTooltip
	 * @memberof WebComponents.cq-info-toggle
	 * @since 7.5.0
	 */
	setTooltip(value) {
		const {
			context: { stx },
			tooltip
		} = this;
		tooltip.innerText = stx.translateIf(`Info ${value ? value : "off"}`);
	}

	/**
	 * Appends a [cq-hu-dynamic]{@link WebComponents.cq-hu-dynamic} or
	 * [cq-hu-static]{@link WebComponents.cq-hu-static} element to the top node of the chart
	 * context if one is not already present.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @alias initInfoComponents
	 * @memberof WebComponents.cq-info-toggle
	 * @since 7.5.0
	 */
	initInfoComponents(context) {
		const toggles = this.querySelector("cq-toggle").getAttribute("cq-toggles");
		["dynamic", "static"].forEach(function (i) {
			if (new RegExp(i).test(toggles)) {
				if (!context.topNode.querySelector(`cq-hu-${i}`)) {
					const hu = document.createElement(`cq-hu-${i}`);
					context.topNode.append(hu);
				}
			}
		});
	}

	/**
	 * Sets the toggle state to `static` if on a mobile device or the crosshairs are active.
	 * If on a mobile device and the toggle state is `static`, activates the crosshairs.
	 *
	 * @param {Object} channels The web component communication channels.
	 *
	 * @alias applyValues
	 * @memberof WebComponents.cq-info-toggle
	 * @since 7.5.0
	 */
	applyValues(channels) {
		const crosshair = this.channelRead(channels.crosshair);
		const headsUp = this.channelRead(channels.headsUp);

		if (headsUp === "dynamic" && (crosshair || CIQ.isMobile)) {
			// The dynamic headsUp doesn't make any sense on mobile devices or with crosshair
			// setting the toggle to "static"
			setTimeout(() => this.channelWrite(channels.headsUp, "static"));
		}
		if (CIQ.isMobile && headsUp === "static") {
			setTimeout(() => this.channelWrite(channels.crosshair, true));
		}
		this.setTooltip(headsUp);
	}
}

InfoToggle.markup = `
		<cq-toggle
			class="ciq-HU"
			cq-member="headsUp"
			cq-toggles="dynamic,static,null">
			<span></span>
			<cq-tooltip>Info</cq-tooltip>
		</cq-toggle>
	`;
CIQ.UI.addComponentDefinition("cq-info-toggle", InfoToggle);
