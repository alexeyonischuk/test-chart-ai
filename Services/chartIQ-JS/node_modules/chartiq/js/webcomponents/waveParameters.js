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
 * <h4>&lt;cq-wave-parameters&gt;</h4>
 *
 * The wave parameters web component is used to supplement the [cq-drawing-settings]{@link WebComponents.DrawingSettings} component.
 * It displays additional settings options specific to the Elliott Wave drawing tool.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute  | description |
 * | :--------- | :---------- |
 * | corrective | Sequence of labels representing the corrective wave. |
 * | decoration | Vertex labeling style. |
 * | impulse    | Sequence of labels representing the impulse wave. |
 * | show-lines | Whether the lines are drawn between vertices. |
 * | template   | Wave pattern.  Changing this may change other attributes automatically. |
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
 * | effect | "select" |
 * | action | "click" |
 * | name | _property_ |
 * | value | _value_ |
 *
 * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Markup for Wave Parameters</caption>
 *		<cq-wave-parameters role="group" aria-label="Wave Parameters"></cq-wave-parameters>
 *
 * @alias WebComponents.WaveParameters
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class WaveParameters extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["corrective", "decoration", "impulse", "show-lines", "template"];
	}

	static templates() {
		return {
			"Grand Supercycle": {
				impulse: ["I", "II", "III", "IV", "V"],
				corrective: ["a", "b", "c"],
				decoration: "enclosed"
			},
			Supercycle: {
				impulse: ["I", "II", "III", "IV", "V"],
				corrective: ["a", "b", "c"],
				decoration: "parentheses"
			},
			Cycle: {
				impulse: ["I", "II", "III", "IV", "V"],
				corrective: ["a", "b", "c"],
				decoration: "none"
			},
			Primary: {
				impulse: ["1", "2", "3", "4", "5"],
				corrective: ["A", "B", "C"],
				decoration: "enclosed"
			},
			Intermediate: {
				impulse: ["1", "2", "3", "4", "5"],
				corrective: ["A", "B", "C"],
				decoration: "parentheses"
			},
			Minor: {
				impulse: ["1", "2", "3", "4", "5"],
				corrective: ["A", "B", "C"],
				decoration: "none"
			},
			Minute: {
				impulse: ["i", "ii", "iii", "iv", "v"],
				corrective: ["a", "b", "c"],
				decoration: "enclosed"
			},
			Minuette: {
				impulse: ["i", "ii", "iii", "iv", "v"],
				corrective: ["a", "b", "c"],
				decoration: "parentheses"
			},
			"Sub-Minuette": {
				impulse: ["i", "ii", "iii", "iv", "v"],
				corrective: ["a", "b", "c"],
				decoration: "none"
			}
		};
	}

	constructor() {
		super();
		this.templates = WaveParameters.templates();
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		this.template = "Grand Supercycle";
		if (this.children.length === 0) this.addDefaultMarkup();
		this.templateHeader = this.qsa(".ciq-active-template", this, true)[0];
		this.impulseHeader = this.qsa(".ciq-active-impulse", this, true)[0];
		this.correctiveHeader = this.qsa(".ciq-active-corrective", this, true)[0];
		this.decorators = {
			none: this.qsa(".ciq-btn:nth-of-type(1n)", this, true)[0],
			parentheses: this.qsa(".ciq-btn:nth-of-type(2n)", this, true)[0],
			enclosed: this.qsa(".ciq-btn:nth-of-type(3n)", this, true)[0]
		};
		this.lineToggleCheckbox = this.qsa("span.ciq-checkbox", this, true)[0];
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, WaveParameters);
		this.constructor = WaveParameters;
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		const action = this.activator ? "click" : null;
		delete this.activator;

		this[name] = newValue;
		if (!this.stx) return;
		let vector = this.stx.currentVectorParameters;
		let waveParameters = vector.waveParameters || {};
		let parameters;
		switch (name) {
			case "template":
				let newTemplate = this.templates[newValue];
				if (newTemplate) {
					parameters = {
						decoration: newTemplate.decoration
					};
				}
				this.update(null, "template", newValue);
				break;
			case "impulse":
			case "corrective":
				parameters = { [name]: newValue && newValue.split(",") };
				this.update(null, name, newValue);
				break;
			case "decoration":
				parameters = { decoration: newValue };
				this.update(null, "decoration", newValue);
				break;
			case "show-lines":
				parameters = { showLines: newValue };
				this.update(null, "showLines", newValue);
				break;
			default:
				break;
		}
		vector.waveParameters = Object.assign(waveParameters, parameters);

		if (!this.context || (name === "template" && this.customizingTemplate))
			return;

		this.emitCustomEvent({
			action,
			effect: "select",
			detail: { name, value: newValue === undefined ? null : newValue }
		});
	}

	/**
	 * Initializes the parameters.  Called from {@link Webcomponents.DrawingSettings#sync}.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	activate() {
		const { stx } = this;
		if (!stx) return;
		this.cvp = stx.currentVectorParameters;
		if (!this.cvp.waveParameters) this.template = "Grand Supercycle";
		this.update(null, "template", this.template);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	setContext(context) {
		this.stx = context.stx;
	}

	/**
	 * Toggle whether to show lines on wave drawing, or just vertices.
	 *
	 * @param {Object} [activator] Pass `null` when calling programmatically.
	 * @param {HTMLElement} [activator.node] Element that triggered this function.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	toggleLines(activator) {
		this.activator = activator;
		let checkbox = this.lineToggleCheckbox;
		let active = this["show-lines"];
		this["show-lines"] = !active;
		if (active) checkbox.classList.remove("ciq-active");
		else checkbox.classList.add("ciq-active");
		checkbox.setAttribute("aria-checked", (!active).toString());
	}

	/**
	 * Updates the wave parameters settings.
	 *
	 * @param {Object} [activator] Pass `null` when calling programmatically.
	 * @param {HTMLElement} [activator.node] Element that triggered this function.
	 * @param {string} field The field to update
	 * @param {number} value Value of the field to update.
	 *
	 * @tsmember WebComponents.WaveParameters
	 */
	update(activator, field, value) {
		let isTemplate = field === "template";
		if (!isTemplate) {
			this.activator = activator;
			if (field === "decoration") {
				for (let d in this.decorators) {
					this.decorators[d].classList[d === value ? "add" : "remove"](
						"ciq-active"
					);
					this.decorators[d].setAttribute(
						"aria-checked",
						(d === value).toString()
					);
				}
				this.decoration = value;
			} else if (field === "impulse" || field === "corrective") {
				let u = value ? value.split(",") : value;
				this[field] = value;
				this[field + "Header"].setAttribute("text", u ? u.join(" ") : "- - -");
			}
			if (field === "showLines") {
				this["show-lines"] = value;
				this.lineToggleCheckbox.classList[value === "true" ? "add" : "remove"](
					"ciq-active"
				);
				this.lineToggleCheckbox.setAttribute("aria-checked", value);
			} else if (!this.customizingTemplate) {
				this.template = "Custom";
				this.templateHeader.setAttribute("text", this.template);
			}
		} else {
			let newTemplate = this.templates[value];
			if (newTemplate) {
				this.customizingTemplate = true;
				this.impulse = newTemplate.impulse.join(",");
				this.impulseHeader.setAttribute("text", newTemplate.impulse.join(" "));

				this.corrective = newTemplate.corrective.join(",");
				this.correctiveHeader.setAttribute(
					"text",
					newTemplate.corrective.join(" ")
				);

				for (let d in this.decorators) {
					this.decorators[d].classList.remove("ciq-active");
					this.decorators[d].setAttribute("aria-checked", "false");
				}
				let decorator = newTemplate.decoration || "none";
				this.decorators[decorator].classList.add("ciq-active");
				this.decorators[decorator].setAttribute("aria-checked", "true");
				this.decoration = decorator;

				this["show-lines"] = true;
				this.lineToggleCheckbox.classList.add("ciq-active");
				this.lineToggleCheckbox.setAttribute("aria-checked", "true");

				this.cvp.waveParameters = CIQ.clone(newTemplate);
				this.cvp.waveParameters.showLines = true;

				this.activator = activator;
				this.customizingTemplate = false;
				this.template = value;
				this.templateHeader.setAttribute("text", value);
			} else {
				this.cvp.waveParameters = {
					corrective: this.corrective && this.corrective.split(","),
					impulse: this.impulse && this.impulse.split(","),
					decoration: this.decoration,
					showLines: this["show-lines"]
				};
			}
		}
	}
}
/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.WaveParameters
 */
WaveParameters.markup = `
		<div class="ciq-wave-template" cq-section>
			<div class="ciq-heading">WAVE TEMPLATE</div>
			<cq-menu class="ciq-select ciq-active-template" reader="WAVE TEMPLATE" config="wavetemplate" text="WAVE TEMPLATE"></cq-menu>
		</div>
		<div class="ciq-wave-impulse" cq-section>
			<div class="ciq-heading">IMPULSE</div>
			<cq-menu class="ciq-select ciq-active-impulse" reader="IMPULSE" config="waveimpulse" text="IMPULSE"></cq-menu>
		</div>
		<div class="ciq-wave-corrective" cq-section>
			<div class="ciq-heading">CORRECTIVE</div>
			<cq-menu class="ciq-select ciq-active-corrective" reader="CORRECTIVE" config="wavecorrective" text="CORRECTIVE"></cq-menu>
		</div>
		<div role="radiogroup" aria-label="Vertex Options" cq-section>
			<span role="radio" class="ciq-icon-btn ciq-btn" decoration="none" stxtap="update('decoration','none')" cq-section>
				<cq-tooltip>None</cq-tooltip>
			</span>
			<span role="radio" class="ciq-icon-btn ciq-btn" decoration="parentheses" stxtap="update('decoration','parentheses')" cq-section>
				<cq-tooltip>Parentheses</cq-tooltip>
			</span>
			<span role="radio" class="ciq-icon-btn ciq-btn" decoration="enclosed" stxtap="update('decoration','enclosed')" cq-section>
				<cq-tooltip>Enclosed</cq-tooltip>
			</span>
		</div>
		<div class="ciq-heading ciq-show-lines" cq-section>
			<span role="checkbox" stxtap="toggleLines()" class="ciq-checkbox ciq-active" aria-checked="true">
				<div class="ciq-heading">Show Lines:</div>
				<span></span>
			</span>
		</div>
	`;

CIQ.UI.addComponentDefinition("cq-wave-parameters", WaveParameters);
