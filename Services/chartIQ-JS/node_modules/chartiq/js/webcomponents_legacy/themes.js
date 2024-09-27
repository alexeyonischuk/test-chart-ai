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
import "../../js/webcomponents_legacy/close.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Themes web component `<cq-themes>`.
 *
 * This web component has two functions. The first is displaying available themes in a menu.
 * The second is providing a theme dialog for entering a new theme.
 *
 * Built in themes are merely the names of classes that will be added to the top element of the UIContext when
 * selected.
 *
 * @namespace WebComponents.cq-themes
 *
 * @example
 * <cq-themes>
 *     <cq-themes-builtin cq-no-close>
 *         <template>
 *             <cq-item></cq-item>
 *         </template>
 *     </cq-themes-builtin>
 *     <cq-themes-custom cq-no-close>
 *         <template>
 *             <cq-theme-custom>
 *                 <cq-item>
 *                     <cq-label></cq-label>
 *                     <cq-close></cq-close>
 *                 </cq-item>
 *             </cq-theme-custom>
 *         </template>
 *     </cq-themes-custom>
 *     <cq-separator cq-partial></cq-separator>
 *     <cq-item stxtap="newTheme()"><cq-plus></cq-plus> New Theme </cq-item>
 * </cq-themes>
 */
class Themes extends CIQ.UI.ContextTag {
	connectedCallback() {
		if (this.attached) return;
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Themes);
		this.constructor = Themes;
	}

	setContext({ config }) {
		if (!config) return; // grid does not provide config
		const {
			chartId: id,
			themes: { builtInThemes, defaultTheme }
		} = config;
		const nameValueStore =
			config.themes.nameValueStore || config.nameValueStore;
		this.initialize({ builtInThemes, defaultTheme, nameValueStore, id });
	}

	/**
	 * Adds a custom theme
	 * @memberof WebComponents.cq-themes
	 * @param {object} theme The theme descriptor
	 * @param {Themes} initiatingMenu The menu which initially called ThemeDialog. This is used in order to save the new theme as the current theme.
	 */
	addCustom(theme, initiatingMenu) {
		this.params.customThemes[theme.name] = theme;
		this.currentThemeSettings = (theme && theme.settings) || theme;
		if (initiatingMenu === this) this.currentTheme = theme.name;
		this.configureMenu();
		this.persist();
	}

	configureMenu() {
		function loadBuiltIn(self, className) {
			return function (e) {
				self.loadBuiltIn(className);
				if (self.params.callback) {
					self.params.callback({ theme: self.currentTheme });
				}
				self.persist("current");
			};
		}
		function loadCustom(self, themeName) {
			return function (e) {
				self.loadCustom(themeName);
				if (self.params.callback) {
					self.params.callback({ theme: self.currentTheme });
				}
				self.persist("current");
			};
		}
		this.builtInMenu.children(":not(template)").remove();
		this.customMenu.children(":not(template)").remove();
		var display, newMenuItem;
		var builtInThemes = this.params.builtInThemes;
		for (var className in builtInThemes) {
			display = builtInThemes[className];
			newMenuItem = CIQ.UI.makeFromTemplate(this.builtInTemplate);
			newMenuItem.text(display);
			this.makeTap(newMenuItem[0], loadBuiltIn(this, className));
			this.builtInMenu.append(newMenuItem);
		}
		if (this.context.stx.translateUI)
			this.context.stx.translateUI(this.builtInMenu[0]);

		if (this.customMenu.length && this.customTemplate.length) {
			var customThemes = this.params.customThemes;
			for (var themeName in customThemes) {
				display = themeName;
				newMenuItem = CIQ.UI.makeFromTemplate(this.customTemplate);
				newMenuItem.find("cq-label").text(display);
				this.makeTap(
					newMenuItem.find("cq-item")[0],
					loadCustom(this, themeName)
				);
				newMenuItem[0].close = (function (self, themeName) {
					return function () {
						self.removeTheme(themeName);
					};
				})(this, themeName);
				this.customMenu.append(newMenuItem);
			}
		}
	}

	/**
	 * Initialize the web component
	 * @param {Object} params Parameters
	 * @param {Object} [params.builtInThemes] Object map of built-in theme names, display names
	 * @param {Object} [params.defaultTheme] The default built-in theme to use
	 * @param {Object} [params.nameValueStore] A {@link CIQ.NameValueStore} object for fetching and saving theme state
	 * @param {string} [params.id] id which can be used to disambiguate when multiple charts are on the screen
	 * @memberof WebComponents.cq-themes
	 */
	initialize(params) {
		if (this.initialized) return;
		this.initialized = true;

		this.addDefaultMarkup();
		this.selectTemplates(this);
		this.params = {};
		if (params) this.params = params;
		const isConstructor = (check) => typeof check === "function";
		CIQ.ensureDefaults(this.params, {
			customThemes: {},
			builtInThemes: {},
			nameValueStore: CIQ.NameValueStore && new CIQ.NameValueStore()
		});
		if (this.params.id) this.id = "themes_" + this.params.id;

		let self = this;
		let { nameValueStore } = this.params;
		if (nameValueStore) {
			if (isConstructor(nameValueStore))
				nameValueStore = this.params.nameValueStore = new nameValueStore();
			// Retrieve any custom themes the user has created
			nameValueStore.get("CIQ.Themes.prototype.custom", (err, result) => {
				if (!err && result) {
					self.params.customThemes = result;
				}
				// Set the current theme to the last one selected by user
				nameValueStore.get(
					self.id + "CIQ.Themes.prototype.current",
					(err, result) => {
						if (!err && result && result.theme) {
							self.loadTheme(result.theme);
						} else {
							self.loadTheme(self.params.defaultTheme);
						}
						self.configureMenu();
					}
				);
			});
		} else {
			this.loadTheme(self.params.defaultTheme);
		}
	}

	loadBuiltIn(className) {
		if (this.currentLoadedBuiltIn) {
			this.removeThemeClass(this.currentLoadedBuiltIn);
		}
		this.addThemeClass(className);
		this.currentLoadedBuiltIn = this.currentTheme = className;
		this.reinitializeChart();
	}

	loadCustom(themeName) {
		if (this.currentLoadedBuiltIn) {
			this.removeThemeClass(this.currentLoadedBuiltIn);
		}
		var theme = this.params.customThemes[themeName];
		if (theme.builtIn) this.addThemeClass(theme.builtIn);
		this.currentLoadedBuiltIn = theme.builtIn;
		this.currentTheme = theme.name;
		this.reinitializeChart(theme);
	}

	loadTheme(themeName) {
		if (this.params.customThemes[themeName]) this.loadCustom(themeName);
		else if (this.params.builtInThemes[themeName]) this.loadBuiltIn(themeName);
		else this.loadBuiltIn(this.params.defaultTheme);
	}

	get contextContainers() {
		const topEl = this.context.topNode;
		return [topEl].concat(Array.from(topEl.querySelectorAll("cq-context")));
	}

	addThemeClass(name) {
		this.contextContainers.forEach((container) =>
			container.classList.add(name)
		);
		this.context.topNode.setCurrentThemeClass = (container, stx) => {
			container.classList.add(name);
			stx.setThemeSettings(this.currentThemeSettings);
		};
	}

	removeThemeClass(name) {
		this.contextContainers.forEach((container) =>
			container.classList.remove(name)
		);
	}

	newTheme() {
		const { context } = this;
		if (context.config) {
			this.channelWrite(
				context.config.channels.dialog,
				{ type: "theme", params: { context, initiatingMenu: this } },
				context.stx
			);
		} else {
			document
				.querySelector("cq-theme-dialog")
				.open({ context: this.context, initiatingMenu: this });
		}
	}

	persist(which) {
		if (!this.params.nameValueStore) return;
		if (!which || which == "current")
			this.params.nameValueStore.set(this.id + "CIQ.Themes.prototype.current", {
				theme: this.currentTheme
			});
		if (!which || which == "custom")
			this.params.nameValueStore.set(
				"CIQ.Themes.prototype.custom",
				this.params.customThemes
			);
	}

	removeTheme(themeName) {
		var saved = false;
		this.ownerDocument.querySelectorAll("cq-themes").forEach(function (t) {
			delete t.params.customThemes[themeName];
			t.configureMenu();
			if (!saved) {
				t.persist();
				saved = true;
			}
		});
	}

	selectTemplates() {
		if (this.builtInMenu) return;
		this.builtInMenu = this.node.find("cq-themes-builtin");
		this.builtInTemplate = this.builtInMenu.find("template");
		this.customMenu = this.node.find("cq-themes-custom");
		this.customTemplate = this.customMenu.find("template");
	}

	/**
	 * @private
	 * @param {object} theme
	 * @memberOf WebComponents.cq-themes
	 */
	reinitializeChart(theme) {
		const isMultiChart = this.context.topNode.getCharts;
		const { styles } = this.context.topNode;

		if (styles) {
			Object.values(styles).forEach((style) => {
				for (let key in style) {
					delete style[key];
				}
			});
		} else {
			this.context.topNode.styles = {};
		}

		const charts = isMultiChart
			? this.context.topNode.getCharts()
			: [this.context.stx];

		this.currentThemeSettings = (theme && theme.settings) || theme;

		charts.forEach((stx) => {
			if (stx && stx.setThemeSettings) {
				stx.setThemeSettings(theme ? theme.settings : null);
			}
		});
	}
}

Themes.markup = `
		<cq-themes-builtin cq-no-close>
			<template>
				<cq-item></cq-item>
			</template>
		</cq-themes-builtin>
		<cq-themes-custom cq-no-close>
			<template>
				<cq-theme-custom>
					<cq-item>
						<cq-label></cq-label>
						<cq-close keyboard-selectable-child="true"></cq-close>
					</cq-item>
				</cq-theme-custom>
			</template>
		</cq-themes-custom>
		<cq-item stxtap="newTheme()"><cq-plus></cq-plus>New Theme</cq-item>
	`;
CIQ.UI.addComponentDefinition("cq-themes", Themes);
