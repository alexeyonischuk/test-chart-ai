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
import "../../js/standard/theme.js";
import "../../js/webcomponents/dialog.js";
import "../../js/webcomponents/close.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents/swatch.js";
import "../../js/webcomponents/themePiece.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */







const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.ThemeHelper) {
	console.error(
		"themeDialog component requires first activating theme feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-theme-dialog&gt;</h4>
	 *
	 * Enables creation of custom chart themes.
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * See {@link WebComponents.Themes} for more details on menu management for this component.
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted from the component when it saves a theme.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "save" |
	 * | action | "click" |
	 * | name | _theme name_ |
	 * | theme | _theme data_ |
	 *
	 * @alias WebComponents.ThemeDialog
	 * @extends CIQ.UI.DialogContentTag
	 * @class
	 * @protected
	 * @since
	 * - 9.1.0 Added emitter.
	 */
	class ThemeDialog extends CIQ.UI.DialogContentTag {
		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, ThemeDialog);
			this.constructor = ThemeDialog;
		}

		/**
		 * Applies changes to all charts on the screen.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		applyChanges() {
			const isMultiChart = this.context.topNode.getCharts;
			const charts = isMultiChart
				? this.context.topNode.getCharts()
				: [this.context.stx];

			charts.forEach((stx) => {
				if (!stx) return;
				this.helper.update(stx);
				stx.changeOccurred("theme");
			});
		}

		/**
		 * Closes the theme dialog box.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		close() {
			this.helper.settings = this.revert;
			this.applyChanges();
			super.close();
		}

		/**
		 * Opens the theme dialog box.
		 *
		 * @param {object} params Dialog box parameters.
		 * @param {CIQ.UI.Context} params.context The chart user interface context.
		 * @param {object} [params.initiatingMenu] The menu that contains the user interface
		 * 		control that opened the theme dialog box.
		 * @param {string} [params.themeName] Hint text for the name of the custom theme. Used in
		 * 		the theme name input field of the theme dialog box.
		 *
		 * @since 6.2.0 `basecolor` of mountain chart can be configured with "mb" piece.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		open(params) {
			this.addDefaultMarkup();
			let { themeName, initiatingMenu } = params;

			this.initiatingMenu = initiatingMenu;
			this.context = params.context;
			this.helper = new CIQ.ThemeHelper({ stx: this.context.stx });
			this.revert = CIQ.clone(this.helper.settings);

			const configurePiece = (name, obj, field, type) => {
				const piece = this.querySelector(`cq-theme-piece[cq-piece="${name}"]`);
				if (!piece) return;
				piece.piece = { obj, field };
				if (type == "color") {
					piece.querySelector("cq-swatch").setColor(obj[field], false);
				}
			};
			const { settings } = this.helper;
			const candleBarSettings = settings.chartTypes["Candle/Bar"];
			configurePiece("cu", candleBarSettings.up, "color", "color");
			configurePiece("cd", candleBarSettings.down, "color", "color");
			configurePiece("wu", candleBarSettings.up, "wick", "color");
			configurePiece("wd", candleBarSettings.down, "wick", "color");
			configurePiece("bu", candleBarSettings.up, "border", "color");
			configurePiece("bd", candleBarSettings.down, "border", "color");
			configurePiece("lc", settings.chartTypes.Line, "color", "color");
			configurePiece("mb", settings.chartTypes.Mountain, "basecolor", "color");
			configurePiece("mc", settings.chartTypes.Mountain, "color", "color");
			configurePiece("bg", settings.chart.Background, "color", "color");
			configurePiece("gl", settings.chart["Grid Lines"], "color", "color");
			configurePiece("dd", settings.chart["Grid Dividers"], "color", "color");
			configurePiece("at", settings.chart["Axis Text"], "color", "color");

			if (!themeName) themeName = "My Theme";
			const input = this.querySelector("cq-action input");
			if (input) input.value = themeName;
			super.open(params);
		}

		/**
		 * Saves the custom theme and closes the theme dialog box.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		save() {
			const input = this.querySelector("cq-action input");
			const theme = {
				settings: CIQ.clone(this.helper.settings),
				name: input && input.value,
				builtIn: null
			};
			CIQ.UI.contextsForEach(function () {
				this.stx.updateListeners("theme");
			}, this);
			this.context.topNode.CIQ.UI.Components.filter(
				(n) => n.matches("cq-themes") && n.ownerDocument === this.ownerDocument
			).forEach((t) => {
				theme.builtIn = t.currentLoadedBuiltIn;
				t.addCustom(theme, this.initiatingMenu);
			});
			if (theme.name) {
				this.emitCustomEvent({
					effect: "save",
					detail: {
						name: theme.name,
						theme: theme.settings
					}
				});
			}
			super.close();
		}

		/**
		 * Sets a theme property, such as candle color, and applies the new property to all charts
		 * on the screen.
		 *
		 * @param {object} obj Contains the properties of a theme element.
		 * @param {string} field The property for which the new value is set.
		 * @param {string} value The new value for the theme property.
		 *
		 * @tsmember WebComponents.ThemeDialog
		 */
		setValue(obj, field, value) {
			obj[field] = value;
			this.applyChanges();
		}
	}

	/**
	 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.ThemeDialog
	 */
	ThemeDialog.markup = `
		<cq-scroll cq-no-maximize>
			<cq-section>
				<cq-placeholder>Candle Color
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="cu"><cq-swatch overrides="Hollow"></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="cd"><cq-swatch overrides="Hollow"></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Candle Wick
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="wu"><cq-swatch></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="wd"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Candle Border
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="bu"><cq-swatch overrides="No Border"></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="bd"><cq-swatch overrides="No Border"></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-separator></cq-separator>
				<cq-placeholder>Line/Bar Chart
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="lc"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-separator></cq-separator>
				<cq-placeholder>Mountain Base
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="mb"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Mountain Peak
				<cq-theme-piece-container>
					<cq-theme-piece cq-piece="mc"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-theme-piece-container>
				</cq-placeholder>
			</cq-section>
			<cq-section>
				<cq-placeholder>Background
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="bg"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Grid Lines
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="gl"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Date Dividers
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="dd"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
				<cq-placeholder>Axis Text
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="at"><cq-swatch></cq-swatch></cq-theme-piece>
					</cq-theme-piece-container>
				</cq-placeholder>
			</cq-section>
			<cq-action>
				<div style="text-align:center;margin-top:10px;">
					<label for="cq-theme-dialog-input-name"><div>Enter name of theme:</div>
						<br>
						<input id="cq-theme-dialog-input-name" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" maxlength="40" placeholder="Name"><br>
						<br>
					</label>
					<button class="ciq-btn" stxtap="save()">Save</button>
				</div>
			</cq-action>
		</cq-scroll>
	`;
	CIQ.UI.addComponentDefinition("cq-theme-dialog", ThemeDialog);
}

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-theme-piece&gt;</h4>
 *
 * Manages an item in the theme.  The item can be a color or a flag.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted from the component when a theme piece is chosen.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "change" |
 * | action | "click" |
 * | name | _theme piece name_ |
 * | value | _theme piece value_ |
 *
 * @alias WebComponents.ThemePiece
 * @extends CIQ.UI.BaseComponent
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class ThemePiece extends CIQ.UI.BaseComponent {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ThemePiece);
	}

	/**
	 * Sets a flag in the theme for this piece.
	 * @param {boolean} result Value of flag
	 *
	 * @tsmember WebComponents.ThemePiece
	 */
	setBoolean(result) {
		CIQ.UI.containerExecute(
			this,
			"setValue",
			this.piece.obj,
			this.piece.field,
			result
		);
		this.emitCustomEvent({
			effect: "change",
			detail: { name: this.getAttribute("cq-piece"), value: result }
		});
	}

	/**
	 * Sets the color in the theme for this piece.
	 * @param {string} color CSS color, or "Hollow" or "No Border".
	 *
	 * @tsmember WebComponents.ThemePiece
	 */
	setColor(color) {
		if (color == "Hollow" || color == "No Border") {
			color = "transparent";
			this.querySelector("cq-swatch").setColor("transparent", false);
		}
		CIQ.UI.containerExecute(
			this,
			"setValue",
			this.piece.obj,
			this.piece.field,
			color
		);
		this.emitCustomEvent({
			effect: "change",
			detail: { name: this.getAttribute("cq-piece"), value: color }
		});
	}
}

CIQ.UI.addComponentDefinition("cq-theme-piece", ThemePiece);
