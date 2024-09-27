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


import { CIQ as _CIQ } from "../../../js/chartiq.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Displays a legend of keyboard shortcuts and the actions the shortcuts perform.
 *
 * Delegates display of the legend to the
 * [cq-floating-window]{@link WebComponents.FloatingWindow} web component by dispatching a
 * "floatingWindow" event (see
 * [floatingWindowEventListener]{@link CIQ.ChartEngine~floatingWindowEventListener}).
 *
 * Creates the legend from keyboard shortcut specifications contained in a configuration object;
 * for example, the default chart configuration object (see the {@tutorial Chart Configuration}
 * tutorial).
 *
 *  The keyboard shortcuts legend can be toggled using the Ctrl+Alt+K keystroke combination (see the
 * `shortcuts` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
 *
 * Requires *addOns.js*.
 *
 * @param {object} params The constructor parameters.
 * @param {CIQ.ChartEngine} params.stx The chart engine instance for which the keyboard shortcuts
 * 		legend is created.
 * @param {object} params.config A configuration object that includes specifications for hot keys
 * 		and drawing tool keyboard shortcuts. Typically, this object is the chart configuration
 * 		object. See the {@tutorial Chart Configuration} tutorial for the data format for keyboard
 * 		shortcuts.
 * @param {number} [params.width="580"] The width of the floating window that contains the
 * 		keyboard shortcuts legend.
 * @param {boolean} [params.windowForEachChart=true] A flag that indicates whether each chart
 * 		instance in a multi-chart document has its own keyboard shortcuts legend. If false, all
 * 		charts share the same legend.
 *
 * @constructor
 * @name CIQ.Shortcuts
 * @since 8.2.0
 *
 * @example
 * new CIQ.Shortcuts(
 *     stx: stxx,
 *     config: {
 *         drawingTools: [{ label: "line", shortcut: "l" }],
 *         hotkeyConfig: {
 *             hotkeys: [{ label: "Pan chart up", action: "up", commands: ["ArrowUp", "Up"] }]
 *         }
 *     }
 * );
 */
CIQ.Shortcuts =
	CIQ.Shortcuts ||
	function ({ stx, width = 580, windowForEachChart = true, config } = {}) {
		if (!stx) {
			console.warn("The Shortcuts addon requires an stx parameter");
			return;
		}
		/**
		 * The chart engine instance for which the keyboard shortcuts legend is created.
		 *
		 * @type {CIQ.ChartEngine}
		 * @memberof CIQ.Shortcuts#
		 * @alias stx
		 * @since 8.2.0
		 */
		this.stx = stx;
		/**
		 * Width of the floating window that contains the keyboard shortcuts legend.
		 *
		 * @type {number}
		 * @memberof CIQ.Shortcuts#
		 * @alias width
		 * @since 8.2.0
		 */
		this.width = width;
		/**
		 * In a multi-chart document, indicates whether each chart has its own keyboard shortcuts
		 * legend. If false, all charts share the same legend.
		 *
		 * @type {boolean}
		 * @memberof CIQ.Shortcuts#
		 * @alias windowForEachChart
		 * @since 8.2.0
		 */
		this.windowForEachChart = windowForEachChart;
		this.content = this.getShortcutContent(config);

		this.ensureMessagingAvailable(stx);
		this.enableUI(stx);
		this.cssRequired = true;

		stx.shortcuts = this;

		if (CIQ.UI) {
			CIQ.UI.KeystrokeHub.addHotKeyHandler(
				"shortcuts",
				({ stx, options }) => {
					stx.container.ownerDocument.body.keystrokeHub.context.advertised.Layout.showShortcuts();
				},
				stx
			);
		}
		const container = this.stx.container.closest("cq-context");
		const mo = new MutationObserver(
			() => (this.content = this.getShortcutContent(config))
		);
		mo.observe(container, { attributes: true });
		this.mo = mo;
	};

/**
 * Enables the keyboard shortcuts legend user interface.
 *
 * Adds a `showShortCuts` function to the {@link CIQ.UI.Layout} helper. The `showShortCuts`
 * function calls this class's [toggle]{@link CIQ.Shortcuts#toggle} function to show and hide the
 * keyboard shortcuts legend. Call `showShortCuts` in your application's user interface (see
 * example).
 *
 * This function is called when the add-on is instantiated.
 *
 * @param {CIQ.ChartEngine} stx The chart engine that provides the UI context for the keyboard
 * 		shortcuts legend.
 *
 * @memberof CIQ.Shortcuts#
 * @alias enableUI
 * @since 8.2.0
 *
 * @example <caption>Create a button that shows and hides the keyboard shortcuts legend.</caption>
 * <div class="ciq-footer full-screen-hide">
 *     <div class="shortcuts-ui ciq-shortcut-button"
 *          stxtap="Layout.showShortcuts()"
 *          title="Toggle shortcut legend">
 *     </div>
 * </div>
 */
CIQ.Shortcuts.prototype.enableUI = function (stx) {
	if (!(stx && CIQ.UI)) return;
	setTimeout(() => {
		const layout = stx.uiContext.getAdvertised("Layout");
		layout.showShortcuts = (activator, value) =>
			this.toggle(value, activator && activator.node);
	});
};

/**
 * Ensures that an instance of the [cq-floating-window]{@link WebComponents.FloatingWindow}
 * web component is available to handle event messaging and create the shortcuts legend floating
 * window.
 *
 * This function is called when the add-on is instantiated.
 *
 * @param {CIQ.ChartEngine} stx The chart engine that provides the UI context, which contains the
 * [cq-floating-window]{@link WebComponents.FloatingWindow} web component.
 *
 * @memberof CIQ.Shortcuts#
 * @alias ensureMessagingAvailable
 * @since 8.2.0
 */
CIQ.Shortcuts.prototype.ensureMessagingAvailable = function (stx) {
	setTimeout(() => {
		const contextContainer = stx.uiContext.topNode;
		const floatingWindow = Array.from(
			contextContainer.querySelectorAll("cq-floating-window")
		).find((el) => el.closest("cq-context") === contextContainer);

		if (!floatingWindow) {
			contextContainer.append(document.createElement("cq-floating-window"));
		}
	});
};

/**
 * Creates the contents of the keyboard shortcuts legend based on specifications contained in a
 * configuration object. The contents are displayed in a
 * [cq-floating-window]{@link WebComponents.FloatingWindow} web component.
 *
 * This function is called when the add-on is instantiated.
 *
 * @param {object} config A configuration object that includes specifications for drawing tool
 * 		keyboard shortcuts and hot keys. Typically, this object is the chart configuration object
 * 		(see the {@tutorial Chart Configuration} tutorial).
 * @return {string} The keyboard shortcuts legend as HTML.
 *
 * @memberof CIQ.Shortcuts#
 * @alias getShortcutContent
 * @since 8.2.0
 */
CIQ.Shortcuts.prototype.getShortcutContent = function (config) {
	const drawingToolShortcuts = (config.drawingTools || [])
		.filter((tool) => tool.shortcut)
		.map(
			({ label, shortcut }) =>
				`<div class="ciq-shortcut">
					<div>${label}</div>
					<div><span>Alt</span> + <span>${shortcut.toUpperCase()}</span></div>
				</div>`
		)
		.join("");

	// Alt + key combination produces unpredictable accent characters depending on keyboard mapping
	// default hotkeys include them for better coverage, avoid displaying them in legend
	const isAscii = (str) => str.charCodeAt(str.length - 1) < 127;
	const wrapKeys = (str) =>
		str === " + "
			? "<span>+</span>"
			: str
					.split("+")
					.map((el) => (el && el !== " " ? "<span>" + el + "</span>" : ""))
					.join(" + ");

	const commandsToString = (commands) => {
		return commands
			.map((command) => command.replace(/Arrow|Key|Digit|^ | $/g, ""))
			.map((command) => command.replace(/\+/, " + "))
			.reduce(
				(acc, command) =>
					!acc.includes(command) && isAscii(command)
						? acc.concat(command)
						: acc,
				[]
			)
			.map(wrapKeys)
			.join("<br>");
	};

	const container = this.stx.container.closest("cq-context");
	if (!container) {
		this.mo.disconnect();
		return;
	}
	const extensionAvailable = (name) =>
		container.hasAttribute(name.toLowerCase() + "-feature");
	const hotkeys = ((config.hotkeyConfig && config.hotkeyConfig.hotkeys) || [])
		.map(({ label, action, commands, extension }) => {
			if (extension && !extensionAvailable(extension)) {
				return "";
			}
			return `<div class="ciq-shortcut"><div>${
				label || action
			}</div><div>${commandsToString(commands)}</div></div>`;
		})
		.join("");

	return `
		<div class="ciq-shortcut-container">
			<div>
				<div><h4>Drawing tools shortcuts</h4></div>
				<div>${drawingToolShortcuts}</div>
			</div>
			<hr>
			<div>
				<div><h4>Hotkeys</h4></div>
				<div>${hotkeys}</div>
			</div>
		</div>
	`;
};

/**
 * Opens and closes the floating window that contains the keyboard shortcuts legend.
 *
 * @param {boolean} [value] If true, the window is opened. If false, the window is closed.
 * 		If not provided, the window state is toggled. That is, the window is opened if it is
 * 		currently closed; closed, if it is currently open.
 * @param {HTMLElement} [node] Optional node which triggered the toggle.
 *
 * @memberof CIQ.Shortcuts#
 * @alias toggle
 * @since 8.2.0
 * @since 9.1.0 Added `node` parameter.
 */
CIQ.Shortcuts.prototype.toggle = function (value, node) {
	this.stx.dispatch("floatingWindow", {
		type: "shortcut",
		title: "Shortcuts",
		content: this.content,
		container: this.stx.uiContext.topNode,
		onClose: () => {
			this.closed = true;
			if (node && node.set) node.set(false);
		},
		width: this.width,
		status: value,
		tag: this.windowForEachChart ? undefined : "shortcut"
	});
};
