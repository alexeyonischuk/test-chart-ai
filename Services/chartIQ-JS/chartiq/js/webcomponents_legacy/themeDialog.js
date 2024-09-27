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
import "../../js/webcomponents_legacy/dialog.js";
import "../../js/webcomponents_legacy/close.js";
import "../../js/webcomponents/scroll.js";
import "../../js/webcomponents_legacy/swatch.js";
import "../../js/webcomponents_legacy/themePiece.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */







var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.ThemeHelper) {
	console.error(
		"themeDialog component requires first activating theme feature."
	);
} else {
	/**
	 * Theme dialog web component `<cq-theme-dialog>`.
	 *
	 * Enables creation of custom chart themes.
	 *
	 * @namespace WebComponents.cq-theme-dialog
	 *
	 * @example
	 * <cq-dialog>
	 *     <cq-theme-dialog>
	 *         <h4 class="title">Create Custom Theme</h4>
	 *         <cq-close></cq-close>
	 *         <cq-scroll cq-no-maximize>
	 *             <cq-section>...</cq-section>
	 *             <cq-action>...</cq-action>
	 *         </cq-scroll>
	 *     </cq-theme-dialog>
	 * </cq-dialog>
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
		 * @memberof WebComponents.cq-theme-dialog
		 * @private
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
		 * @alias close
		 * @memberof WebComponents.cq-theme-dialog
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
		 * @param {object} [params.initiatingMenu The menu that contains the user interface
		 * 		control that opened the theme dialog box.
		 * @param {string} [params.themeName] Hint text for the name of the custom theme. Used in
		 * 		the theme name input field of the theme dialog box.
		 *
		 * @alias open
		 * @memberof WebComponents.cq-theme-dialog
		 * @since 6.2.0 `basecolor` of mountain chart can be configured with "mb" piece.
		 */
		open(params) {
			this.addDefaultMarkup();
			super.open(params);
			var themeName = params.themeName;

			this.initiatingMenu = params.initiatingMenu;
			this.context = params.context;
			this.helper = new CIQ.ThemeHelper({ stx: this.context.stx });
			this.revert = CIQ.clone(this.helper.settings);

			var self = this;
			function configurePiece(name, obj, field, type) {
				var cu = self.node.find('cq-theme-piece[cq-piece="' + name + '"]');
				if (!cu.length) return;
				cu[0].piece = { obj: obj, field: field };
				if (type == "color") {
					cu.find("cq-swatch")[0].setColor(obj[field], false);
				}
			}
			var settings = this.helper.settings;
			configurePiece(
				"cu",
				settings.chartTypes["Candle/Bar"].up,
				"color",
				"color"
			);
			configurePiece(
				"cd",
				settings.chartTypes["Candle/Bar"].down,
				"color",
				"color"
			);
			configurePiece(
				"wu",
				settings.chartTypes["Candle/Bar"].up,
				"wick",
				"color"
			);
			configurePiece(
				"wd",
				settings.chartTypes["Candle/Bar"].down,
				"wick",
				"color"
			);
			configurePiece(
				"bu",
				settings.chartTypes["Candle/Bar"].up,
				"border",
				"color"
			);
			configurePiece(
				"bd",
				settings.chartTypes["Candle/Bar"].down,
				"border",
				"color"
			);
			configurePiece("lc", settings.chartTypes.Line, "color", "color");
			configurePiece("mb", settings.chartTypes.Mountain, "basecolor", "color");
			configurePiece("mc", settings.chartTypes.Mountain, "color", "color");
			configurePiece("bg", settings.chart.Background, "color", "color");
			configurePiece("gl", settings.chart["Grid Lines"], "color", "color");
			configurePiece("dd", settings.chart["Grid Dividers"], "color", "color");
			configurePiece("at", settings.chart["Axis Text"], "color", "color");

			if (!themeName) themeName = "My Theme";
			this.node.find("cq-action input").val(themeName);
		}

		/**
		 * Saves the custom theme and closes the theme dialog box.
		 *
		 * @alias save
		 * @memberof WebComponents.cq-theme-dialog
		 */
		save() {
			const theme = {
				settings: CIQ.clone(this.helper.settings),
				name: this.node.find("cq-action input").val(),
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
		 * @alias setValue
		 * @memberof WebComponents.cq-theme-dialog
		 */
		setValue(obj, field, value) {
			obj[field] = value;
			this.applyChanges();
		}
	}

	ThemeDialog.markup = `
		<h4 class="title">Create Custom Theme</h4>
		<cq-close></cq-close>
		<cq-scroll cq-no-maximize>
			<cq-section>
				<cq-placeholder>Candle Color
					<cq-theme-piece-container>
						<cq-theme-piece cq-piece="cu"><cq-swatch cq-overrides="Hollow"></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="cd"><cq-swatch cq-overrides="Hollow"></cq-swatch></cq-theme-piece>
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
						<cq-theme-piece cq-piece="bu"><cq-swatch cq-overrides="No Border"></cq-swatch></cq-theme-piece>
						<cq-theme-piece cq-piece="bd"><cq-swatch cq-overrides="No Border"></cq-swatch></cq-theme-piece>
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
				<input><div stxtap="save()" class="ciq-btn">Save</div>
			</cq-action>
		</cq-scroll>
	`;
	CIQ.UI.addComponentDefinition("cq-theme-dialog", ThemeDialog);
}
