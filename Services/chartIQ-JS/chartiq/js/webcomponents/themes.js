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
 * <h4>&lt;cq-themes&gt;</h4>
 *
 * This web component displays available themes in a menu.  It also allows for custom themes to be removed.
 * The menu updates automatically with new themes that are created from the theme dialog.
 *
 * Built in themes are merely the names of classes that will be added to the top element of the UIContext when
 * selected.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | theme     | Name of last theme selected. Note the current theme's attributes may be changed after setting the theme. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a theme is selected or removed.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select", "remove" |
 * | action | "click" |
 * | value | _theme name_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.Themes
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Added emitter.
 */
class Themes extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["theme"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Themes);
		this.constructor = Themes;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Themes
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (name === "theme") {
			this.load(newValue);
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Themes
	 */
	setContext(context) {
		const { config } = context;
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
	 *
	 * @param {object} theme The theme descriptor
	 * @param {WebComponents.Themes} initiatingMenu The component which initially called ThemeDialog. This is used in order to save the new theme as the current theme.
	 *
	 * @tsmember WebComponents.Themes
	 */
	addCustom(theme, initiatingMenu) {
		this.params.customThemes[theme.name] = theme;
		this.currentThemeSettings = (theme && theme.settings) || theme;
		if (initiatingMenu === CIQ.climbUpDomTree(this, "cq-menu", true)[0])
			this.currentTheme = theme.name;
		this.configureMenu();
		this.persist();
	}

	/**
	 * Create the inner markup of the component.  The UI for the component will resmble a menu of choices,
	 * beginning with the default themes and additionally any custom themes, with the ability to remove any custom theme.
	 *
	 * @tsmember WebComponents.Themes
	 */
	configureMenu() {
		const load = (className) => {
			return (e) => {
				this.clicked = true;
				this.setAttribute("theme", className);
				delete this.clicked;
			};
		};
		[...this.builtInMenu.children].forEach(
			(child) => !child.matches("template") && child.remove()
		);
		[...this.customMenu.children].forEach(
			(child) => !child.matches("template") && child.remove()
		);
		let newMenuItem;
		const { builtInThemes, customThemes } = this.params;
		for (let className in builtInThemes) {
			newMenuItem = CIQ.UI.makeFromTemplate(this.builtInTemplate)[0];
			newMenuItem.innerText = builtInThemes[className];
			this.makeTap(newMenuItem, load(className));
			this.builtInMenu.appendChild(newMenuItem);
		}
		if (this.context.stx.translateUI)
			this.context.stx.translateUI(this.builtInMenu);

		if (this.customMenu && this.customTemplate) {
			const removeFn = (themeName) => {
				return (e) => {
					e.stopPropagation();
					this.emitCustomEvent({
						effect: "remove",
						detail: { value: themeName }
					});
					this.removeTheme(themeName);
				};
			};
			for (let themeName in customThemes) {
				newMenuItem = CIQ.UI.makeFromTemplate(this.customTemplate)[0];
				newMenuItem.querySelector("[label]").innerText = themeName;
				this.makeTap(newMenuItem, load(themeName));
				const close = newMenuItem.querySelector(".close");
				if (close) {
					close.setAttribute("keyboard-selectable-child", "");
					CIQ.UI.stxtap(close, removeFn(themeName));
				}
				this.customMenu.appendChild(newMenuItem);
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
	 *
	 * @tsmember WebComponents.Themes
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

		let { nameValueStore } = this.params;
		if (nameValueStore) {
			if (isConstructor(nameValueStore))
				nameValueStore = this.params.nameValueStore = new nameValueStore();
			// Retrieve any custom themes the user has created
			nameValueStore.get("CIQ.Themes.prototype.custom", (err, result) => {
				if (!err && result) {
					this.params.customThemes = result;
				}
				// Set the current theme to the last one selected by user
				nameValueStore.get(
					this.id + "CIQ.Themes.prototype.current",
					(err, result) => {
						if (!err && result && result.theme) {
							this.setAttribute("theme", result.theme);
						} else {
							this.setAttribute("theme", this.params.defaultTheme);
						}
						this.configureMenu();
					}
				);
			});
		} else {
			this.loadTheme(this.theme || this.params.defaultTheme);
		}
	}

	/**
	 * Loads a theme.
	 *
	 * @param {string} className Name of theme, for example, "ciq-night".
	 *
	 * @private
	 *
	 * @tsmember WebComponents.Themes
	 */
	load(className) {
		if (!this.context) return;
		this.loadTheme(className);
		this.emitCustomEvent({
			effect: "select",
			action: this.clicked ? "click" : null,
			detail: { value: className }
		});
		if (this.params.callback) {
			this.params.callback({ theme: this.currentTheme });
		}
		this.persist("current");
	}

	/**
	 * Loads a built-in theme.
	 *
	 * @param {string} className Name of built-in theme, for example, "ciq-night".  Built-in themes are just classes added to the component.
	 *
	 * @tsmember WebComponents.Themes
	 */
	loadBuiltIn(className) {
		if (this.currentLoadedBuiltIn) {
			this.removeThemeClass(this.currentLoadedBuiltIn);
		}
		this.addThemeClass(className);
		this.currentLoadedBuiltIn = this.currentTheme = className;
		this.reinitializeChart();
	}

	/**
	 * Loads a custom theme.
	 *
	 * @param {string} themeName Name of custom theme, which user used to save the theme when it was first created.
	 *
	 * @tsmember WebComponents.Themes
	 */
	loadCustom(themeName) {
		if (this.currentLoadedBuiltIn) {
			this.removeThemeClass(this.currentLoadedBuiltIn);
		}
		const theme = this.params.customThemes[themeName];
		if (theme.builtIn) this.addThemeClass(theme.builtIn);
		this.currentLoadedBuiltIn = theme.builtIn;
		this.currentTheme = theme.name;
		this.reinitializeChart(theme);
	}

	/**
	 * Loads a theme.
	 *
	 * @param {string} themeName Name of theme to load.
	 *
	 * @tsmember WebComponents.Themes
	 */
	loadTheme(themeName) {
		if (this.params.customThemes[themeName]) this.loadCustom(themeName);
		else if (this.params.builtInThemes[themeName]) this.loadBuiltIn(themeName);
		else this.loadBuiltIn(this.params.defaultTheme);
	}

	/**
	 * READ ONLY. All context containers on the multichart.
	 *
	 * @type {HTMLElement[]}
	 *
	 * @tsmember WebComponents.Themes
	 * @tsdeclaration
	 * const contextContainers : HTMLElement[]
	 */
	get contextContainers() {
		const topEl = this.context.topNode;
		return [topEl].concat([...topEl.querySelectorAll("cq-context")]);
	}

	/**
	 * Adds a theme class to the elements in the DOM which need it.
	 *
	 * @param {string} name Name of theme to add.
	 *
	 * @tsmember WebComponents.Themes
	 */
	addThemeClass(name) {
		const addClass = (container) => {
			container.currentTheme = name;
			container.classList.add(name);
			const { context } = container.CIQ.UI;
			const channel =
				(context.config.channels || {}).componentClass ||
				"channel.componentClass";
			this.channelWrite(channel, { [name]: "add" }, context.stx);
			//TODO see if we still need this
			//this.context.topNode.setCurrentThemeClass = (container, stx) => {
			//	stx.setThemeSettings(this.currentThemeSettings);
			//}
		};
		this.contextContainers.forEach(addClass);
		this.context.topNode.setCurrentThemeClass = addClass;
	}

	/**
	 * Removes a theme class from the elements in the DOM.
	 *
	 * @param {string} name Name of theme to remove.
	 *
	 * @tsmember WebComponents.Themes
	 */
	removeThemeClass(name) {
		const removeClass = (container) => {
			container.classList.remove(name);
			const { context } = container.CIQ.UI;
			const channel =
				(context.config.channels || {}).componentClass ||
				"channel.componentClass";
			this.channelWrite(channel, { [name]: "remove" }, context.stx);
		};
		this.contextContainers.forEach(removeClass);
		this.context.topNode.setCurrentThemeClass = null;
		this.context.topNode.currentTheme = null;
	}

	/**
	 * Adds a new custom theme to the component.
	 *
	 * @deprecated As of 9.1.0. Adding a new theme to this component is now achieved via {@link WebComponents.Themes#addCustom}.
	 *
	 * @tsmember WebComponents.Themes
	 */
	newTheme() {
		const { context } = this;
		if (context.config) {
			this.channelWrite(
				context.config.channels.dialog,
				{ type: "theme", params: { context, initiatingMenu: this } },
				context.stx
			);
		} else {
			this.ownerDocument
				.querySelector("cq-theme-dialog")
				.open({ context: this.context, initiatingMenu: this });
		}
	}

	/**
	 * Sets storage for the themes.
	 *
	 * @param {string} [which] Type of theme to store.  Valid values are `current` or `custom`.  If left blank. both types will store.
	 *
	 * @tsmember WebComponents.Themes
	 */
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

	/**
	 * Removes a custom theme from the component.
	 *
	 * @param {string} themeName Name of theme to remove.
	 *
	 * @tsmember WebComponents.Themes
	 */
	removeTheme(themeName) {
		let saved = false;
		this.context.topNode.CIQ.UI.Components.filter(
			(n) => n.matches("cq-themes") && n.ownerDocument === this.ownerDocument
		).forEach((t) => {
			delete t.params.customThemes[themeName];
			t.configureMenu();
			if (!saved) {
				t.persist();
				saved = true;
			}
		});
	}

	/**
	 * Copies the component's sub-elements into its properties.
	 *
	 * @private
	 *
	 * @tsmember WebComponents.Themes
	 */
	selectTemplates() {
		if (this.builtInMenu) return;
		this.builtInMenu = this.root.querySelector("div[themes-builtin]");
		this.builtInTemplate = this.builtInMenu.querySelector("template");
		this.customMenu = this.root.querySelector("div[themes-custom]");
		this.customTemplate = this.customMenu.querySelector("template");
	}

	/**
	 * Resets the chart's themes when a new theme is chosen.
	 *
	 * @private
	 * @param {object} theme
	 *
	 * @tsmember WebComponents.Themes
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

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Themes
 */
Themes.markup = `
		<div>
			<div themes-builtin>
				<template>
					<div class="item" role="menuitem" keyboard-selectable></div>
				</template>
			</div>
			<div themes-custom>
				<template>
					<div class="item" keyboard-selectable>
						<span label role="menuitem"></span>
						<div class="icon close ciq-icon ciq-close">
							<div class="ciq-screen-reader" role="button">Remove this theme</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-themes", Themes);
