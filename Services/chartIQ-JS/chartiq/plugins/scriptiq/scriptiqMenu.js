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


import { CIQ } from "../../js/componentUI.js";

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-scriptiq-menu&gt;</h4>
 *
 * Displays the names of all stored ScriptIQ scripts along with controls used to manage the scripts.
 *
 * **Only available with the ScriptIQ module.**
 *
 * To enable the ScriptIQ plug-in in *sample-template-advanced.html*, search for "scriptiq" and uncomment the necessary sections.
 * The template can also be used as a reference to create your own UI for ScriptIQ.
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when the menu options are clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "add", "edit", "remove", "delete" |
 * | action | "click" |
 * | name | _script name_ |
 *
 * @alias WebComponents.ScriptIQMenu
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 6.1.0
 * - 9.1.0 Added emitters.
 */
class ScriptIQMenu extends CIQ.UI.ContextTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ScriptIQMenu);
		this.constructor = ScriptIQMenu;
	}

	/**
	 * Initializes the component.
	 *
	 * @param {Object} params Optional parameters to control behavior of the menu.
	 * @param {Boolean} [params.template] DOM element to attach the menu items.
	 *
	 * @since 6.1.0
	 */
	initialize(params) {
		this.addDefaultMarkup();
		this.params = params || {};
		if (!this.params.template) this.params.template = "template";
		this.params.template = this.querySelector(this.params.template);
		this.renderMenu();

		const { stx } = this.context;
		this.listener = () => this.renderMenu();

		this.context.topNode.addEventListener("renderMenu", this.listener, false);
		CIQ.UI.observeProperty("language", stx.preferences, this.listener);
	}

	/**
	 * Creates the menu.
	 *
	 * @since 6.1.0
	 */
	renderMenu() {
		const { stx } = this.context;
		const alphabetizedCustom = [];
		let sd;

		const tapFn = (studyName) => {
			return () => {
				CIQ.Studies.addStudy(
					stx,
					studyName,
					null,
					null,
					null,
					null,
					CIQ.Studies.studyLibrary[studyName]
				);
				this.emitCustomEvent({
					effect: "add",
					detail: {
						name: studyName
					}
				});
			};
		};

		// open and populate the scripting text input
		const editScript = (scriptName) => {
			return (e) => {
				const { source } = CIQ.Studies.studyScriptLibrary[scriptName];
				e.stopPropagation();
				this.uiManager.closeMenu();

				this.dispatchEvent(
					new Event("openScriptUi", {
						bubbles: true,
						cancelable: true
					})
				);
				this.context.getAdvertised("ScriptIQEditor").open({ source });
				this.emitCustomEvent({
					effect: "edit",
					detail: {
						name: scriptName
					}
				});
			};
		};

		// delete the script entry from the menu
		const deleteScript = (sd) => {
			return (e) => {
				e.stopPropagation();
				const scriptEdit = this.context.getAdvertised("ScriptIQEditor");
				const { nameValueStore } = scriptEdit;
				const { name } = sd;

				// delete or modify ScriptIQ entry in storage
				const deleteOrModify = (scripts, deleteFromStorage) => {
					if (deleteFromStorage) {
						delete scripts[name];
					} else {
						// study on the chart, make sure it isn't listed in the ScriptIQ menu
						const scriptObj = scripts[name];
						scriptObj.siqList = false;
						scripts[name] = scriptObj;
					}
					this.emitCustomEvent({
						effect: deleteFromStorage ? "delete" : "remove",
						detail: { name }
					});

					return scripts;
				};

				// two paths for ScriptIQ storage deletion
				// 1. ScriptIQ is displayed on the chart: ScriptIQ entry is modified in storage and the study menu item is deleted
				// 2. ScriptIQ isn't displayed on the chart: ScriptIQ entry is deleted from storage forever
				nameValueStore.get(scriptEdit.constants.storageKey, (err, scripts) => {
					if (!err) {
						if (!scripts) scripts = {};
						let deleteFromStorage = true;
						const { studies } = stx.layout;
						if (studies) {
							for (let s in studies) {
								// Check to see if study is currently displayed on the chart
								const study = studies[s];
								if ((study ? study.type : "") !== name) continue;
								deleteFromStorage = false;
								break;
							}
						}

						scripts = deleteOrModify(scripts, deleteFromStorage);
						nameValueStore.set(scriptEdit.constants.storageKey, scripts);
					}
				});

				delete CIQ.Studies.studyScriptLibrary[name];
				this.renderMenu();
			};
		};

		for (let field in CIQ.Studies.studyScriptLibrary) {
			sd = CIQ.Studies.studyScriptLibrary[field];
			if (!sd.siqList) continue;
			if (!sd.name) sd.name = field; // Make sure there's always a name
			alphabetizedCustom.push(field);
		}

		// sort A-Z
		alphabetizedCustom.sort(function (lhs, rhs) {
			const lsd = CIQ.Studies.studyScriptLibrary[lhs];
			const rsd = CIQ.Studies.studyScriptLibrary[rhs];
			return lsd.name.localeCompare(rsd.name, stx.locale || "en", {
				sensitivity: "base",
				caseFirst: "upper"
			});
		});

		// remove all current custom scripts so menu display is properly sorted
		const contentNode = this.querySelector(".scriptiq-content");
		if (contentNode) {
			while (contentNode.firstChild)
				contentNode.removeChild(contentNode.firstChild);
		}

		alphabetizedCustom.forEach((name) => {
			const menuItem = CIQ.UI.makeFromTemplate(this.params.template)[0];
			sd = CIQ.Studies.studyScriptLibrary[name];
			CIQ.makeTranslatableElement(
				menuItem.querySelector("[label]"),
				stx,
				sd.name
			);
			this.makeTap(menuItem, tapFn(name));
			const edit = menuItem.querySelector(".ciq-edit");
			edit.setAttribute("keyboard-selectable-child", "");
			this.makeTap(edit, editScript(sd.name));
			const scriptToDelete = menuItem.querySelector(".ciq-close");
			scriptToDelete.setAttribute("keyboard-selectable-child", "");
			this.makeTap(scriptToDelete, deleteScript(sd));
			this.querySelector(".scriptiq-content").appendChild(menuItem);
		});
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 */
	setContext(context) {
		this.initialize();
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 */
ScriptIQMenu.markup = `
		<div class="scriptiq-content">
			<template>
				<div class="item" role="group" keyboard-selectable>
					<span label></span>
					<div class="icon close ciq-icon ciq-close" keyboard-selectable-child>
						<div class="ciq-screen-reader" role="button">Remove this script</div>
					</div>
					<span class="icon options ciq-edit" keyboard-selectable-child>
						<div class="ciq-screen-reader" role="button">Edit this script</div>
					</span>
				</div>
			</template>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-scriptiq-menu", ScriptIQMenu);
