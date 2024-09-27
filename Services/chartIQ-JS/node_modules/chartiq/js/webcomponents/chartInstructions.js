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
 * <h4>&lt;cq-chart-instructions&gt;</h4>
 *
 * This element contains hidden text that can be read aloud by a screen reader to announce chart features or instructions.
 * By default the text is not visible to a user but is listed in the accessbility tree.
 *
 * If you would like to provide custom instructions, pass in your own text in a `<p>` tag.
 *
 * @alias WebComponents.ChartInstructions
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since 8.7.0
 */
class ChartInstructions extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ChartInstructions);
		this.constructor = ChartInstructions;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.ChartInstructions
	 */
	setContext(context) {
		this.addDefaultMarkup();
		this.content = this.querySelector(".content");

		const { config: { hotkeyConfig = {} } = {} } = this.context;

		if (hotkeyConfig.hotkeys) {
			const keyConfigs = hotkeyConfig.hotkeys.filter((conf) => conf.ariaLabel);
			this.setHotKeyCommands(keyConfigs);
		}
	}

	/**
	 * Filtered hotKey configurations from defaultConfiguration based on ariaLabel property.
	 * This will create new entries for the hotkeys and add
	 * their instructions to the text content already provided.
	 *
	 * @param {object[]} configurations Hotkey configs from the config.hotKeyConfig hotkeys
	 *
	 * @tsmember WebComponents.ChartInstructions
	 */
	setHotKeyCommands(configurations) {
		const elements = configurations.map((configuration) => {
			const { commands, label, ariaLabel } = configuration;
			const combos = [];
			commands.forEach((command) =>
				combos.push(
					command
						.split("+")
						.map((key) => key.replace("Key", ""))
						.join(" + ")
				)
			);
			const formattedCombos =
				combos.length > 1 ? combos.join(" or ") : combos[0];
			return `${label}: ${ariaLabel}. Press (${formattedCombos}).`;
		});

		elements.forEach((element) => {
			const item = document.createElement("LI");
			item.innerText = element;
			this.content.append(item);
		});
	}
}

/**
 * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.ChartInstructions
 */
ChartInstructions.markup = `
<p role="region">Instructions for use with screen readers.</p>
<span role="article">
	<p>The following is a list of keyboard commands available to interact with the chart:</p>
	<ul class="content"></ul>
	<div>End of instructions.</div>
</span>
`;
CIQ.UI.addComponentDefinition("cq-chart-instructions", ChartInstructions);
