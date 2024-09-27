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
 * <h4>&lt;cq-toggle&gt;</h4>
 *
 * When tapped/clicked, this component will toggle through different states.  Each state represents a value of an object's member;
 * for example, the object could be the chart's layout or preferences, while the member could be a property of these objects.
 * If the `member` attribute of the toggle is set, the toggle state is bound to that member, meaning, if the underlying member value
 * is changed, the toggle will change state to reflect that.
 *
 * Use [registerCallback]{@link WebComponents.Toggle#registerCallback} to receive a callback
 * every time the toggle changes. When a callback is registered, any automatic class changes are
 * bypassed.
 *
 * To bind the component's configuration, set its `config` attribute to an object in the {@link CIQ.UI.Context}.config.toggles object.
 * Using a configuration allows easy customization of callback functions.  See example below.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute      | description |
 * | :------------- | :---------- |
 * | action         | If set to "class" (the default), will set/unset the "active" class on the component when executing callbacks. |
 * | config         | Key pointing to a configuration file entry which specifies the callback functions. |
 * | help-id        | A key to the correct help text in CIQ.Help.Content. |
 * | icon           | Class name for image to use for the toggle. |
 * | member         | Object member to observe. If not provided, then callbacks are used exclusively. |
 * | multichart-distribute | Option for multichart context. Distributes object member change to all charts. |
 * | reader         | Accessibility text when focused by a screen reader. |
 * | stxtap         | Custom click handling which overrides the default toggling functionality. |
 * | toggles        | A comma-separated list of values which are toggled through with each click. The list can include "null". Stringified booleans and "null" are converted to their primitive values. All other values are passed to the Number constructor. If the result is a number (not NaN), the number is used. Otherwise the value is left as a string. |
 * | toggle-classes | A comma-separated list of classes associated with the toggle setting. If a setting requires multiple classes, they need to be separated with spaces. |
 * | tooltip        | Text for the tooltip which appears when hovering over the component. |
 * | value          | The current state of the toggle. |
 *
 * In addition, the following attributes are also supported:
 * | attribute     | description |
 * | :------------ | :---------- |
 * | active-class  | A class name to add to a binary state toggle if it is in an active state. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "toggle" |
 * | action | "click" |
 * | value | _value_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Toggle bound to layout.crosshair:</caption>
 * <cq-toggle member="layout.crosshair" reader="Crosshair" tooltip="Crosshair (Alt + \)" icon="crosshair"></cq-toggle>
 * @example <caption>Registering a callback function directly:</caption>
 * document.querySelector("cq-toggle").registerCallback(function(value){
 *    console.log("current value is " + value);
 *    if(value != false) this.classList.add("active");
 * });
 * @example <caption>Registering a callback function via the config:</caption>
 * // set the toggle component's config attribute to "example"
 * stxx.uiContext.config.toggles.example.callbacks = [function (value) {
 *    console.log("current value is " + value);
 *    if(value != false) this.classList.add("active");
 * }];
 *
 * @alias WebComponents.Toggle
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 2015
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Toggle extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return [
			"action",
			"config",
			"help-id",
			"icon",
			"member",
			"multichart-distribute",
			"reader",
			"stxtap",
			"toggles",
			"toggle-classes",
			"tooltip",
			"value"
		];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
		this.defaultParams = {
			action: "class",
			activeClass: "active",
			member: null,
			toggles: "",
			classes: {},
			callbacks: []
		};
		Object.assign(this, this.defaultParams);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();
		if (this.isShadowComponent && this.children.length) {
			while (this.children.length) {
				this.root.appendChild(this.firstChild);
			}
		}
		this.markup = this.trimInnerHTMLWhitespace();
		this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);

		const activeClass = this.getAttribute("active-class");
		if (activeClass) this.activeClass = activeClass;

		this.reset();
		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Toggle);
		this.constructor = Toggle;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.disconnectObservable();
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Toggle
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		if (name === "value") {
			this.set(this.splitAndNormalize(newValue)[0]);
			this.postProcess();
			return;
		}
		if (name === "stxtap") CIQ.UI.BaseComponent.buildReverseBindings(this.root);
		else if (this.usingMarkup) {
			this.reset();
		} else {
			// do nothing when using predefined content
		}
	}

	/**
	 * Sets up an observable if there is a `member` supplied in the attributes.  Will remove any existing observable.
	 * The observable information is stored in the component instance's `observeInfo` property.
	 * If there is no member supplied in the attributes, you can still have the component observe
	 * an object's member manually by using the {@link CIQ.UI.observeProperty} function, but you should also
	 * set the `observeInfo` property so a proper cleanup can be performed when the component is disconnected.
	 *
	 * @example
	 * CIQ.UI.observeProperty("headsUp", stxx.layout, listenerFunction);
	 * this.observeInfo = { member: "headsUp", obj: stxx.layout, listener: listenerFunction };
	 *
	 * @tsmember WebComponents.Toggle
	 */
	connectObservable() {
		const { member, obj, listener } = this;
		if (member) {
			this.disconnectObservable();
			this.listener = () => {
				this.updateFromBinding();
			};
			CIQ.UI.observeProperty(member, obj, listener);
			this.observeInfo = { member, obj, listener };
		}
	}

	/**
	 * Removes any observable set up by {@link WebComponents.Toggle#connectObservable}.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	disconnectObservable() {
		if (!this.observeInfo) return;
		const { member, obj, listener } = this.observeInfo;
		CIQ.UI.unobserveProperty(member, obj, listener);
	}

	/**
	 * Initializes the handler when the toggle is clicked.  Called once when the context becomes available.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	begin() {
		this.connectObservable();
		if (this.tapInitialized) return;
		this.lastTap = {};
		this.tapInitialized = true;
		// Use only the stxtap attribute action if assigned as running the stxtap function will remove attributed binding
		if (this.getAttribute("stxtap")) return;
		CIQ.UI.stxtap(this, (e) => {
			e.stopPropagation();
			const tapTime = Date.now();
			if (
				this.lastTap.target !== e.target &&
				tapTime - this.lastTap.tapTime < 200
			)
				return; // prevent "double click" caused by pressing Enter
			this.lastTap = { tapTime, target: e.target };
			this.clicked = true;
			const isInDialog = CIQ.climbUpDomTree(e.target, "cq-dialog", true)[0];
			const isInMenu = CIQ.climbUpDomTree(e.target, "cq-menu", true)[0];
			this.uiManager.closeMenu(
				null,
				"cq-color-picker" +
					(isInDialog ? "" : ",cq-dialog") +
					(isInMenu ? "" : ",cq-menu")
			); // close all menus, dialogs or color pickers, unless we're the child of one (cascading)
			let toggles = this.toggles || this.defaultParams.toggles;
			if (toggles) {
				toggles = this.splitAndNormalize(toggles);
				// Cycle through each field in the array with each tap
				let i;
				for (i = 0; i < toggles.length; i++) {
					const toggle = toggles[i];
					if (this.value == toggle) {
						if (i < toggles.length - 1) this.set(toggles[i + 1]);
						else this.set(toggles[0]);
						break;
					}
				}
				if (i == toggles.length) {
					// default to first item in toggle
					this.set(toggles[0]);
				}
			} else {
				this.set(!this.value);
			}
			delete this.clicked;
		});
	}

	/**
	 * sets the layout or preferences in storage when the toggle is toggled.
	 * @private
	 *
	 * @tsmember WebComponents.Toggle
	 */
	postProcess() {
		if (!this.context) return;

		this.emitCustomEvent({
			action: this.clicked ? "click" : null,
			effect: "toggle",
			detail: { value: this.value }
		});

		const { stx } = this.context;
		stx.draw();
		const { obj } = this;
		if (obj === stx.layout) stx.changeOccurred("layout");
		if (obj === stx.preferences) stx.changeOccurred("preferences");
	}

	/**
	 * Formats the default markup, replacing any variables with the actual values provided by the attributes.
	 *
	 * @return {string} The prepared markup
	 *
	 * @tsmember WebComponents.Toggle
	 */
	getMarkup() {
		let markup = this.markup || this.constructor.markup;
		const names = markup.match(/\{\{(.{1,20}?)\}\}/g);
		if (names)
			names.forEach((name) => {
				const key = name.substring(2, name.length - 2);
				if (["help_class", "tooltip_class"].includes(key)) return;
				const attr = this[key];
				if (attr == null) {
					if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "hidden");
					else if (key === "icon") markup = markup.replace(name, "hidden");
					else if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "hidden");
					else markup = markup.replace(name, "");
				} else {
					markup = markup.replace(name, attr || "");
					if (key === "tooltip")
						markup = markup.replace("{{tooltip_class}}", "");
					else if (key === "help-id")
						markup = markup.replace(/\{\{help_class\}\}/g, "");
				}
			});
		return markup;
	}

	/**
	 * Adds a callback function to the toggle.
	 *
	 * @param {function} fc The callback function to add to the toggle. The function accepts the
	 * 		current value of the toggle as a parameter. The value of `this` within the callback
	 * 		function is the toggle component.
	 * @param {boolean} immediate A flag that indicates whether to immediately call the callback
	 * 		function after it has been registered with the toggle.
	 *
	 * @since 2015
	 *
	 * @tsmember WebComponents.Toggle
	 */
	registerCallback(fc, immediate) {
		if (immediate !== false) immediate = true;
		this.callbacks.push(fc);
		if (immediate) fc.call(this, this.value);
	}

	/**
	 * Formats the attribute values.
	 * By default, anything in the toggle attribute will be a string, which can cause issues when observing a member because "true"!==true.
	 * This function will set "true", "false", and "null" to be their native alternatives instead of strings.
	 * It also checks to see if it can cast the number and if it is not NaN it changes it to be a number.
	 * Be aware this will change an empty string to 0 but you shouldn't be setting an empty string!
	 *
	 * @param {any} input Input string, possibly comma-delimited
	 * @return {any[]} Formatted results, in an array and in their assumed type
	 *
	 * @tsmember WebComponents.Toggle
	 */
	splitAndNormalize(input) {
		if (typeof input === "string") {
			input = input.split(",");
			input.forEach((piece, i) => {
				if (piece === "null") piece = null;
				else if (piece === "true" || piece === "false")
					piece = piece === "true";
				else if (!isNaN(Number(piece))) piece = Number(piece);
				input[i] = piece;
			});
		} else {
			input = [input];
		}
		return input;
	}

	/**
	 * Called when an attribute changes, will regenerate the toggle component,
	 * updating whatever needs to be updated as a result of the attribute change.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	reset() {
		const { children } = this.root;
		if (!children.length || this.usingMarkup) {
			this.usingMarkup = true;
			if (children.length) {
				[...children].forEach((child) => {
					if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
				});
			}
			const div = document.createElement("div");
			this.addDefaultMarkup(div, this.getMarkup());
		}
		if (!this.value && this.value !== 0) this.value = false; // if it were set to true before, leave it
		const cfgAttr = this.config;
		if (cfgAttr) {
			const helper = CIQ.UI.BaseComponent.getHelper(this, "ToggleConfig");
			if (helper && helper[cfgAttr] && helper[cfgAttr].callbacks) {
				this.callbacks = [];
				helper[cfgAttr].callbacks.forEach(function (cb) {
					if (typeof cb === "object") {
						this.registerCallback(cb.fn, cb.immediate);
					} else this.registerCallback(cb);
				}, this);
			}
		}
		if (this.context) {
			this.obj = this.context.stx.layout;
			const { contextConfig } = this;
			let member = this.originalMember || this.member;
			if (
				contextConfig &&
				contextConfig.channels &&
				contextConfig.channels[member]
			) {
				member = contextConfig.channels[member];
			}
			if (member && member.indexOf(".") !== -1) {
				const m = member.split(".");
				this.obj = this.context.stx[m[0]];
				if (typeof this.obj === "undefined") {
					this.context.stx[m[0]] = this.obj = {};
					this.originalMember = member;
				}
				member = m[1];
			}
			if (member) this.objectsMember = member;
			let toggles = this.toggles || this.defaultParams.toggles;
			if (toggles) {
				toggles = this.splitAndNormalize(toggles);
			}
			// associate class with toggle setting
			const toggleClasses = this["toggle-classes"] || "";

			// extract an array of class settings from comma or comma-space separated class list
			const toggleClassArr = toggleClasses.split(/, |,/);

			// find classes to be cleared when new setting is applied,
			// taking in account that a setting can have more than one space separated class assigned
			this.removeClasses = toggleClasses.split(/, | |,/).filter((el) => el);

			// associate each setting with applicable class(es)
			this.classes = (toggles || []).reduce(function (
				classLookup,
				setting,
				index
			) {
				classLookup[setting] = toggleClassArr[index].split(/ /);
				return classLookup;
			}, {});

			// set default value if object[member] is undefined
			if (member && this.obj[member] === undefined) {
				const defaultValue =
					toggles && toggles.length ? toggles[toggles.length - 1] : false;
				this.obj[member] = defaultValue;
			}
		}
		this.connectObservable();
		this.setAriaPressed();
	}

	/**
	 * Called when the toggle is activated through a click or change of the `value` attribute,
	 * will update whatever needs to be updated in the component as a result of the activation.  This comprises
	 * the class and aria settings.
	 *
	 * @param {any} value New value of toggle
	 *
	 * @tsmember WebComponents.Toggle
	 */
	set(value) {
		if (this.setting) return;
		this.setting = true;
		if (this.member) {
			const { context, objectsMember: member, obj } = this,
				{ stx, topNode } = context || {};
			if (
				context &&
				topNode.getCharts &&
				this.hasAttribute("multichart-distribute")
			) {
				let charts = topNode.getCharts();
				let objType = null;
				if (obj === stx.layout) objType = "layout";
				if (obj === stx.preferences) objType = "preferences";
				if (objType) {
					charts.forEach((chart) => {
						chart[objType][member] = value;
						if (chart !== stx) chart.changeOccurred(objType);
					});
				}
			}
			if (obj) obj[member] = value;
			this.value = value;
		} else {
			if (this.callbacks) this.callbacks.forEach((cb) => cb.call(this, value));
			this.value = value;
		}
		this.updateClass();
		this.setAriaPressed();
		delete this.setting;
	}

	/**
	 * Sets the aria-pressed attribute based on the component's class.
	 * A class value of either active, on or off will set the aria value.
	 * A truthy value for the component's current value will also set the aria value.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	setAriaPressed() {
		const ariaElem = this.root.querySelector("[aria-pressed]");
		if (ariaElem) {
			ariaElem.ariaPressed = this.toggles
				? !!this.matches(".active, .on, .true")
				: !!this.value;
		}
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	setContext(context) {
		const { config } = context;
		this.contextConfig = config;
		this.reset(config);

		this.begin();
	}

	/**
	 * Called for a registered component when the context is changed in a multichart environment.
	 *
	 * @param {CIQ.UI.Context} newContext The chart user interface context.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	changeContext(newContext) {
		this.context = newContext;
		this.setContext(newContext);
	}

	/**
	 * Updates the toggle's class based on the current toggle value.
	 * Used when toggle has more than binary values.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	updateClass() {
		const { removeClasses, classes } = this;
		if (!removeClasses || this.value === undefined) {
			return;
		}

		this.classList.remove(...removeClasses);
		let currentClasses = classes[this.value];
		if (currentClasses && currentClasses[0])
			this.classList.add(...currentClasses);
	}

	/**
	 * Updates the toggle's appearance when the member to which it is bound has changed value.  For example, if the toggle
	 * controls the crosshair, if the crosshair value in the layout changes, this function will be called to keep in sync
	 * with the layout value.
	 *
	 * @tsmember WebComponents.Toggle
	 */
	updateFromBinding() {
		this.value = this.obj[this.objectsMember];

		if (!this.callbacks.length) {
			if (this.action == "class") {
				if (this.value) {
					this.classList.add(this.activeClass);
				} else {
					this.classList.remove(this.activeClass);
				}
			}
		} else {
			this.callbacks.forEach((cb) => cb.call(this, this.value));
		}
		this.updateClass();
		this.setAriaPressed();

		if (this.member == "crosshair" && this.value === false)
			this.context.stx.doDisplayCrosshairs();
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * This markup contains placeholder values which the component replaces with values from its attributes.
 * Variables are represented in double curly-braces, for example: `{{text}}`.
 * The following variables are defined:
 * | variable      | source |
 * | :------------ | :----- |
 * | reader        | from attribute value |
 * | icon          | from attribute value |
 * | help-id       | from attribute value |
 * | tooltip       | from attribute value |
 * | tooltip_class | "hidden" if `tooltip` attribute not specified |
 * | help_class    | "hidden" if `help-id` attribute not specified |
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Toggle
 */
Toggle.markup = `
		<cq-help class="{{help_class}}" help-id="{{help-id}}"aria-hidden="true"></cq-help>
		<span class="icon {{icon}}">
			<div cq-tooltip class="{{tooltip_class}}" aria-hidden="true">{{tooltip}}</div>
		</span>
		<span class="ciq-screen-reader">
			<button type="button" aria-pressed="false" tabindex="-1">{{reader}}</button>
			<em	class="help-instr {{help_class}}">(Help available, press question mark key)</em>
		</span>
	`;

CIQ.UI.addComponentDefinition("cq-toggle", Toggle);
