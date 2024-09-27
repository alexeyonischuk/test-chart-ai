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

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

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
				decoration: null
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
				decoration: null
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
				decoration: null
			}
		};
	}

	handlePropertyChange(name, oldAttr, newAttr) {
		if (oldAttr === newAttr) return;
		this[name] = newAttr;
		if (!this.stx) return;
		let vector = this.stx.currentVectorParameters;
		let waveParameters = vector.waveParameters || {};
		let parameters;
		switch (name) {
			case "template":
				let newTemplate = this.templates[newAttr];
				if (newTemplate) {
					parameters = {
						decoration: newTemplate.decoration
					};
				}
				break;
			case "impulse":
				let impulse = newAttr && JSON.parse(newAttr);
				parameters = { impulse: impulse };
				break;
			case "corrective":
				let corrective = newAttr && JSON.parse(newAttr);
				parameters = { corrective: corrective };
				break;
			case "decoration":
				parameters = { decoration: newAttr };
				break;
			case "show-lines":
				parameters = { showLines: newAttr };
				break;
			default:
				break;
		}
		vector.waveParameters = Object.assign(waveParameters, parameters);
	}

	constructor() {
		super();
		this.templates = WaveParameters.templates();
	}

	connectedCallback() {
		if (this.attached) return;
		this.template = "Grand Supercycle";
		var tmpl = this.ownerDocument.querySelector(
			'template[cq-wave-parameters], template[cq-wave-parameters="true"]'
		);
		CIQ.UI.makeFromTemplate(tmpl, this);
		this.templateHeader = this.querySelector(".ciq-active-template");
		this.impulseHeader = this.querySelector(".ciq-active-impulse");
		this.correctiveHeader = this.querySelector(".ciq-active-corrective");
		this.decorators = {
			blank: this.querySelector(".ciq-btn:nth-of-type(1n)"),
			parentheses: this.querySelector(".ciq-btn:nth-of-type(2n)"),
			enclosed: this.querySelector(".ciq-btn:nth-of-type(3n)")
		};
		this.lineToggleCheckbox = this.querySelector("span.ciq-checkbox");
		super.connectedCallback();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, WaveParameters);
	}

	activate() {
		const { stx } = this;
		if (!stx) return;
		this.cvp = stx.currentVectorParameters;
		if (!this.cvp.waveParameters) this.template = "Grand Supercycle";
		this.update(null, "template", this.template);
	}

	setContext() {
		this.stx = this.context.stx;
	}

	toggleLines() {
		let checkbox = this.lineToggleCheckbox;
		let active = this["show-lines"];
		this["show-lines"] = !active;
		if (active) checkbox.classList.remove("ciq-active");
		else checkbox.classList.add("ciq-active");
	}

	update(node, field, update) {
		let isTemplate = field === "template";

		if (!isTemplate) {
			if (field === "decoration") {
				for (let d in this.decorators) {
					this.decorators[d].classList.remove("ciq-active");
				}
				node.node.classList.add("ciq-active");
				this.decoration = node.node.getAttribute("decoration");
			} else if (field === "impulse" || field === "corrective") {
				let u = update ? update.split(",") : update;
				this[field] = u;
				this[field + "Header"].innerHTML = u ? u.join(" ") : "- - -";
			}
			this.templateHeader.innerHTML = this.template = "Custom";
		} else {
			this.template = update;
			this.templateHeader.innerHTML = update;
			let newTemplate = this.templates[this.template];
			if (newTemplate) {
				this.impulse = JSON.stringify(newTemplate.impulse);
				this.impulseHeader.innerHTML = newTemplate.impulse.join(" ");

				this.corrective = JSON.stringify(newTemplate.corrective);
				this.correctiveHeader.innerHTML = newTemplate.corrective.join(" ");

				for (let d in this.decorators) {
					this.decorators[d].classList.remove("ciq-active");
				}
				let decorator = newTemplate.decoration || "blank";
				this.decorators[decorator].classList.add("ciq-active");
				this.decoration = decorator;

				this["show-lines"] = true;
				this.lineToggleCheckbox.classList.add("ciq-active");

				this.cvp.waveParameters = CIQ.clone(newTemplate);
				this.cvp.waveParameters.showLines = true;
			} else
				this.cvp.waveParameters = {
					corrective: this.corrective,
					impulse: this.impulse,
					decoration: this.decoration,
					showLines: this["show-lines"]
				};
		}
	}
}
CIQ.UI.addComponentDefinition("cq-wave-parameters", WaveParameters);
