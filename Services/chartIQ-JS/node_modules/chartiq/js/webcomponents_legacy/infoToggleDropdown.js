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
 * The drop-down toggle web component `<cq-info-toggle-dropdown>`.
 *
 * Provides toggle management for the crosshairs and heads-up display.
 *
 * Typically wraps a [cq-toggle]{@link WebComponents.cq-toggle} component and
 * [cq-menu]{@link WebComponents.cq-menu} component (see the examples below). The
 * [cq-toggle]{@link WebComponents.cq-toggle} web component creates the user interface toggle
 * control, which is similar to a button. The [cq-menu]{@link WebComponents.cq-menu} web component
 * creates a drop-down menu that provides component options. For example, for the heads-up display,
 * the options menu enables activation of either a dynamic callout or floating tooltip; for the
 * crosshairs, activation of a static information display (also referred to as the static heads-up
 * display, or static HUD).
 *
 * The drop-down toggle component appends a <a href="WebComponents.cq-hu-dynamic.html">
 * <code class="codeLink">\<cq-hu-dynamic\></code></a>,
 * `<cq-hu-floating>`, or <a href="WebComponents.cq-hu-static.html">
 * <code class="codeLink">\<cq-hu-static\></code></a> element to the top node of the chart context
 * if one is required and not already present. The elements represent the heads-up dynamic callout,
 * heads-up floating tooltip, and crosshairs static HUD, respectively.
 *
 * The drop-down toggle is mobile aware. On mobile devices, the drop-down menu of the component is
 * hidden, and the following mobile-friendly behavior is set automatically:
 * - The crosshairs drop-down toggle turns the crosshairs and static HUD on and off in unison
 * - The heads-up display drop-down toggle is not available
 *
 * The HUD menu can be managed programmatically by sending a 'channel' message to enable or disable the different HUD modes.<br>
 * Here is the code you will need:
 *
 * ```
 *  function changeHUD(type, stx) {
 *    const hudChannel = stx.uiContext.config.channels.headsUp;
 *    const { channelWrite } = CIQ.UI.BaseComponent.prototype;
 *    channelWrite(hudChannel, type, stx);
 * }
 * ```
 *
 * Then you can do things such as:
 *
 *  - `changeHUD(false, stxx); // turn off HUD`
 *  - `changeHUD({dynamic: true, floating: false}, stxx); // turn on the dynamic HUD`
 *  - `changeHUD({dynamic: false, floating: true}, stxx); // turn on the floating HUD`
 *
 * @namespace WebComponents.cq-info-toggle-dropdown
 * @since 8.2.0
 *
 * @example <caption>Heads-up display drop-down toggle:</caption>
 * <cq-info-toggle-dropdown>
 *     <cq-toggle
 *         class="ciq-HU"
 *         cq-member="headsUp">
 *         <span></span>
 *         <cq-tooltip></cq-tooltip> <!-- Tooltip text is added programmatically. -->
 *     </cq-toggle>
 *
 *     <cq-menu class="ciq-menu toggle-options collapse tooltip-ui">
 *         <span></span>
 *         <cq-menu-dropdown>
 *             <cq-item cq-member="headsUp-dynamic">Show Dynamic Callout<span class="ciq-radio"><span></span></span></cq-item>
 *             <cq-item cq-member="headsUp-floating">Show Tooltip<span class="ciq-radio"><span></span></span></cq-item>
 *         </cq-menu-dropdown>
 *     </cq-menu>
 *
 * @example <caption>Crosshairs drop-down toggle:</caption>
 * <cq-info-toggle-dropdown>
 *     <cq-toggle
 *         class="ciq-CH"
 *         cq-member="crosshair">
 *         <span></span>
 *         <cq-tooltip>Crosshair (Alt + \)</cq-tooltip> <!-- Tooltip text is hard coded. -->
 *     </cq-toggle>
 *
 *     <cq-menu class="ciq-menu toggle-options collapse">
 *         <span></span>
 *         <cq-menu-dropdown>
 *             <cq-item cq-member="crosshair">Hide Heads-Up Display<span class="ciq-radio"><span></span></span></cq-item>
 *             <cq-item cq-member="headsUp-static">Show Heads-Up Display<span class="ciq-radio"><span></span></span></cq-item>
 *         </cq-menu-dropdown>
 *     </cq-menu>
 * </cq-info-toggle-dropdown>
 */
class InfoToggleDropdown extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, InfoToggleDropdown);
	}

	/**
	 * Sets the status of the drop-down toggle; that is, whether the drop-down toggle is active or
	 * inactive.
	 *
	 * @param {boolean} value The status of the drop-down toggle. If true, the drop-down toggle
	 * is active; if false, inactive.
	 *
	 * @alias set
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @since 8.2.0
	 */
	set(value) {
		const { toggleEl, options, selected, stx } = this;
		const { crossX, crossY } = stx.controls;
		const { obj: layout } = toggleEl.params;
		const newLayoutValues = {};

		options.forEach((option) => {
			const [member, type] = option.getAttribute("cq-member").split("-");
			const valueToSet = option === selected && value === true;

			if (type) {
				newLayoutValues[member] = Object.assign(newLayoutValues[member] || {}, {
					[type]: valueToSet
				});
			} else {
				newLayoutValues[member] = valueToSet;
			}
		});

		this.connectedCharts().forEach((chartEngine) => {
			Object.entries(newLayoutValues).forEach(([key, prop]) => {
				if (typeof prop === "object") {
					// replace reference in order to trigger channelSubscribe
					chartEngine.layout[key] = Object.assign(
						{},
						chartEngine.layout[key],
						prop
					);
				} else {
					chartEngine.layout[key] = prop;
				}
			});
			chartEngine.changeOccurred("layout");
		});

		if (toggleEl.params.action === "class") {
			toggleEl.classList[value ? "add" : "remove"](toggleEl.params.value);
		}

		toggleEl.currentValue = value;
		toggleEl.updateClass();
		this.applyValues(this.channels);

		const isMultiChart = this.context.topNode.getCharts;
		if (value) {
			const activeChart = isMultiChart
				? this.connectedCharts().find((el) => {
						const wrapper = el.container.closest("cq-context-wrapper.active");
						return wrapper;
				  })
				: stx;
			this.positionCrosshair(activeChart);
		}
	}

	/**
	 * Gets all connected charts.
	 *
	 * @alias connectedCharts
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @since 8.4.0
	 */
	connectedCharts() {
		const isMultiChart = this.context.topNode.getCharts;
		const charts = isMultiChart ? this.context.topNode.getCharts() : [this.stx];

		return charts;
	}

	/**
	 * Places crosshair at last data segment in the chart that contains the Close value
	 *
	 * @alias positionCrosshair
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @since 8.4.0
	 */
	positionCrosshair(stx) {
		if (!stx) return;
		const { dataSegment } = stx.chart;
		if (
			stx.container.classList.contains("stx-crosshair-cursor-on") ||
			!dataSegment ||
			!dataSegment.length
		)
			return;

		const { index, Close } = findLastClose(dataSegment);

		if (index < 0) return;

		const x = stx.pixelFromBar(index);
		const y = stx.pixelFromPrice(Close);
		stx.mousemoveinner(x + stx.left, y + stx.top);

		function findLastClose(array) {
			let index = array.length;
			while (index-- && array[index]) {
				const { Close } = array[index];
				if (Close || Close === 0) return { index, Close };
			}
			return -1;
		}
	}

	/**
	 * Sets the currently selected option for the drop-down toggle component. The options are
	 * presented as a list of radio buttons in a drop-down menu associated with the component.
	 *
	 * Selects (or checks) the radio button of the selected option and clears (or unchecks) the
	 * radio buttons of other options.
	 *
	 * @param {HTMLElement} selected The menu option to set as the selected option.
	 *
	 * @alias setSelected
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @since 8.2.0
	 */
	setSelected(selected) {
		const { options } = this;
		this.selected = selected;
		options.forEach((option) => {
			option.classList[option === selected ? "add" : "remove"]("ciq-active");
		});
	}

	/**
	 * Subscribes to the `headsUp` channel. References the `crosshair` channel.
	 *
	 * Enables selection of the drop-down toggle options. Sets the initial selected option.
	 * Enables selection of the options using the keyboard. Sets default options on mobile devices
	 * (see `applyValues`). Sets the drop-down toggle tooltip (see `setTooltip`).
	 *
	 * Appends a `<cq-hu-dynamic>`, `<cq-hu-floating>`, or `<cq-hu-static>` element to the top
	 * node of the chart context if one is not already attached (see `initInfoComponents`).
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @alias setContext
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @private
	 * @since 8.2.0
	 */
	setContext(context) {
		this.tooltip = this.querySelector("cq-tooltip");
		this.toggleEl = this.querySelector("cq-toggle");
		this.optionsMenu = this.querySelector("cq-menu-dropdown");
		this.options = Array.from(this.optionsMenu.querySelectorAll("cq-item")); // ciao to NodeList

		let { config: { channels = {} } = {} } = context;
		if (!channels.headsUp) channels.headsUp = "layout.headsUp";
		if (!channels.crosshair) channels.crosshair = "layout.crosshair";
		this.channels = channels;

		this.channelSubscribe(channels.headsUp, () => this.applyValues(channels));
		const initialHUValues = this.channelRead(channels.headsUp) || {};
		const initialCrosshair = this.channelRead(channels.crosshair);
		let crosshairIsOptionAndOn = false;

		const selectItem = (event) => {
			this.setSelected(event.target);
			this.set(true);
			this.stx.changeOccurred("layout");
		};

		// set selection option based on layout
		this.options.forEach((option) => {
			const [, type] = option.getAttribute("cq-member").split("-");
			if (!type && initialCrosshair) crosshairIsOptionAndOn = true;
			if (initialHUValues[type]) this.setSelected(option);
			option.selectFC = function () {
				selectItem({ target: this }); // capture focused element from keyStroke in scroll.js
			};
		});

		this.toggleEl.isInfoToggle = true;
		this.toggleEl.currentValue = this.selected || crosshairIsOptionAndOn;
		if (!this.selected) this.setSelected(this.options[0]); // fallback/for crosshair only

		CIQ.UI.stxtap(this.optionsMenu, selectItem);

		if (CIQ.isMobile) this.querySelector("cq-menu").style.display = "none";
		this.initInfoComponents(context.topNode);
		this.applyValues(channels);
	}

	/**
	 * Sets a tooltip on the `cq-toggle` component contained in the drop-down toggle. The tooltip
	 * text is "Info Off" when the drop-down toggle is inactive; "Info On", when the drop-down
	 * toggle is active.
	 *
	 * **Note:** This function does not set a tooltip on the crosshairs drop-down toggle. The
	 * crosshairs drop-down toggle tooltip is set in the markup (see the example in the
	 * `cq-info-toggle-dropdown` description.)
	 *
	 * @param {string} [value] Unused.
	 *
	 * @alias setTooltip
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @private
	 * @since 8.2.0
	 */
	setTooltip(value) {
		const {
			context: { stx },
			tooltip
		} = this;

		if (
			!this.options.some(
				(option) => option.getAttribute("cq-member") === "crosshair"
			)
		) {
			const thisState = this.toggleEl.currentValue ? "On" : "Off";
			tooltip.innerText = stx.translateIf(`Info ${thisState}`);
		}
	}

	/**
	 * Appends a `<cq-hu-dynamic>`, `<cq-hu-floating>`, or `<cq-hu-static>` element to the top
	 * node of the chart context if one is not already present. The elements represent the
	 * heads-up dynamic callout, heads-up floating tooltip, and crosshairs static HUD,
	 * respectively.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @alias initInfoComponents
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @private
	 * @since 8.2.0
	 */
	initInfoComponents(container) {
		container.querySelectorAll(".ciq-chart-area").forEach((chartContainer) => {
			this.options.forEach((option) => {
				const [, type] = option.getAttribute("cq-member").split("-");
				if (type && !chartContainer.querySelector(`cq-hu-${type}`)) {
					const hu = document.createElement(`cq-hu-${type}`);
					chartContainer.append(hu);
				}
			});
		});
	}

	/**
	 * Sets the following functionality of the crosshairs and heads-up display drop-down toggles
	 * on mobile devices:
	 * - The crosshairs drop-down toggle turns the crosshairs and static HUD on and off in unison
	 * - The heads-up display drop-down toggle is not available
	 *
	 * Sets the heads-up drop-down toggle tooltip (see `setTooltip`).
	 *
	 * @param {object} channels The web component communication channels.
	 *
	 * @alias applyValues
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @private
	 * @since 8.2.0
	 */
	applyValues(channels) {
		const crosshair = this.channelRead(channels.crosshair);
		const headsUp = this.channelRead(channels.headsUp) || {};
		const { dynamic, floating, crosssection } = headsUp;
		const { channelWrite } = this;
		const charts = this.connectedCharts();

		if (CIQ.isMobile) {
			const staticHudContainer =
				this.context.topNode.querySelector("cq-hu-static");
			if (staticHudContainer) {
				staticHudContainer.style.display = floating ? "none" : "";
			}
			const dynamicHudContainer =
				this.context.topNode.querySelector("cq-hu-dynamic");
			if (dynamicHudContainer) {
				dynamicHudContainer.style.display = "none";
			}

			if (dynamic) {
				fanOutWrite(
					channels.headsUp,
					Object.assign({}, headsUp, { dynamic: false, floating: true })
				);
				this.applyValues(channels);
				return;
			}

			const defaultHud = this.querySelector(
				"cq-item[cq-member*='headsUp-']:not([cq-member*='-dynamic'])"
			);
			const showHeadsUp = Object.values(headsUp).includes(true);

			if (defaultHud && !showHeadsUp) {
				this.setSelected(defaultHud);
				if (crosshair) {
					const [, type] = defaultHud.getAttribute("cq-member").split("-");
					if (type) {
						const obj = {};
						obj[type] = true;
						fanOutWrite(channels.headsUp, Object.assign({}, headsUp, obj));
						this.applyValues(channels);
						return;
					}
				}
			}
		}

		let headsUpOption = null,
			crossHairOption = null;

		for (const option of this.options) {
			const [name, type] = option.getAttribute("cq-member").split("-");

			if (name === "headsUp" && headsUp[type]) {
				headsUpOption = option;
			} else if (name === "crosshair") {
				crossHairOption = option;
			}
		}

		if (headsUpOption) {
			this.setSelected(headsUpOption);
		} else if (crossHairOption) {
			this.setSelected(crossHairOption);
		}

		if (!crosshair && (headsUp.static || crosssection)) {
			fanOutWrite(channels.crosshair, true);
		}

		function fanOutWrite(channel, value) {
			charts.forEach((chartEngine) =>
				channelWrite(channel, value, chartEngine)
			);
		}

		// No longer adding the on/off state to Info toggle tooltip, the blue underline indicator already shows this.
		//this.setTooltip(headsUp);
	}

	/**
	 * Determines whether the drop-down toggle is active.
	 *
	 * @param {object} params Contains data related to the drop-down toggle.
	 * @param {object} params.obj Contains the status of the drop-down toggle.
	 * @param {boolean} params.obj.crosshair If true, the crosshairs are active.
	 * @param {object} params.obj.headsUp Contains the status of the on screen information
	 * 		displays for the heads-up display and the crosshairs.
	 * @param {boolean} params.obj.headsUp.dynamic If true, the dynamic heads-up display is active.
	 * @param {boolean} params.obj.headsUp.floating If true, the floating heads-up display is
	 * 		active.
	 * @param {boolean} params.obj.headsUp.static If true, the static information display for the
	 * 		crosshairs is active.
	 * @return {boolean} True if the drop-down toggle is active, false otherwise.
	 *
	 * @alias getCurrentValue
	 * @memberof WebComponents.cq-info-toggle-dropdown
	 * @private
	 * @since 8.2.0
	 */
	getCurrentValue(params) {
		const { options } = this;
		const { obj: layout } = params;

		for (let i = 0; i < options.length; i++) {
			const [member, type] = options[i].getAttribute("cq-member").split("-");

			if (
				(!type && layout[member]) ||
				(layout[member] && layout[member][type])
			) {
				return true;
			}
		}

		return false;
	}
}

CIQ.UI.addComponentDefinition("cq-info-toggle-dropdown", InfoToggleDropdown);
