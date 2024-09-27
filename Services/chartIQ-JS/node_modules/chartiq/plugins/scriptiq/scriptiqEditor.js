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
import "./scriptiqApi.js";
import "./scriptiqMenu.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./scriptiqEditor.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./scriptiqEditor.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("./scriptiqEditor.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "scriptiqEditor")); // a framework, such as Angular, may require style addition

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-scriptiq-editor&gt;</h4>
 *
 * The ScriptIQ web component enables you to create ScriptIQ scripts.
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
 * A custom event will be emitted by the component when it is clicked.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "save" |
 * | action | "click" |
 * | name | _script name_ |
 * | content | _script text_ |
 *
 * @example <caption>Add ScriptIQ to study menu</caption>
 * stxx.uiContext.config.menus.studies.content.push(
 * 	{ type: "clickable", label: "New Script", iconCls: "plus", selector: "cq-scriptiq-editor", method: "open", feature: "scriptiq" },
 * );
 *
 * @alias WebComponents.ScriptIQEditor
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 6.1.0
 * - 9.1.0 Added emitter.
 */
class ScriptIQEditor extends CIQ.UI.ContextTag {
	constructor() {
		super();

		/**
		 * String constants for common use.
		 *
		 * @since 6.1.0
		 */
		this.constants = {
			storageKey: "chartiq_custom_indicators",
			deleteAction: "deleteEntry",
			saveAction: "saveEntry",
			getAction: "getEntry",
			resizeEvent: "scriptingResize",
			renderMenuEvent: "renderMenu"
		};
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, ScriptIQEditor);
		this.constructor = ScriptIQEditor;
	}

	/**
	 * Compiles the script, and if compilation is successful, adds the script to the study library. If compilation is unsuccessful, displays an error message.
	 *
	 * @param {object} [scriptObj] An object that contains the values to save to storage.
	 * @param {object} [scriptObj.script] The ScriptIQ source from storage.
	 * @param {object} [scriptObj.siqList] Boolean flag to determine whether the script needs to be listed on the custom study menu; defaults to true.
	 *
	 * @since 6.1.0
	 */
	addScript(scriptObj) {
		if (scriptObj && !scriptObj.script) scriptObj = null; // scriptObj doesn't have a valid script
		const scriptToAdd = scriptObj ? scriptObj.script : null;
		const listState = scriptObj ? scriptObj.siqList : true;
		const scriptText =
			scriptToAdd || this.querySelector(".scriptiq-textarea textarea").value; // if there is no ScriptIQ being passed along from storage then look at the scripting UI
		if (!scriptText || scriptText.length <= 0) return;
		const scriptStatus = this.querySelector(".scriptiq-status input");
		const stx = this.context ? this.context.stx : null;
		this.currentScripts = Object.keys(CIQ.Studies.studyScriptLibrary);

		if (!this.context) {
			this.context = CIQ.UI.getMyContext(this);
		}

		const renderScriptMenu = () => {
			const event = new Event(this.constants.renderMenuEvent, {
				bubbles: true,
				cancelable: true
			});
			this.dispatchEvent(event);
		};
		let layoutStudy;
		const displayStudy = (sd) => {
			renderScriptMenu();
			const { currentStudy } = this;
			if (!currentStudy[sd.name]) {
				// check to see if the study is in the chart layout already
				for (let name in stx.layout.studies) {
					layoutStudy = stx.layout.studies[name];
					if (layoutStudy.type === sd.name) {
						currentStudy[sd.name] = layoutStudy;
					}
				}
			}

			// same study, replace with new study descriptor
			if (
				currentStudy &&
				currentStudy[sd.name] &&
				sd.name === currentStudy[sd.name].type
			) {
				CIQ.Studies.removeStudy(stx, currentStudy[sd.name]);
			}
			currentStudy[sd.name] = CIQ.Studies.addStudy(
				stx,
				sd.name,
				null,
				null,
				null,
				null,
				sd
			);
		};

		const compiledScript =
			CIQ.Scripting.addCoffeeScriptStudyToLibrary(scriptText);

		if (compiledScript.error) {
			scriptStatus.value = compiledScript.error;
			return;
		}

		const { sd } = compiledScript;
		sd.siqList = !!listState; // for initial startup we need to know if the script needs to be listed in the menu
		if (scriptToAdd) {
			// if scriptToAdd isn't null then the script came from storage
			// apply newly compiled library entry to the layout's studies
			for (let name in stx.layout.studies) {
				layoutStudy = stx.layout.studies[name];
				if (layoutStudy.type === sd.name) {
					layoutStudy.study = layoutStudy.libraryEntry = sd;
					layoutStudy.outputMap = {};
					CIQ.Studies.prepareStudy(stx, sd, layoutStudy);
				}
			}
			renderScriptMenu();
			return;
		}

		// add the script from the scripting UI
		displayStudy(sd);

		const saveObj = {
			script: scriptText,
			siqList: true
		};
		this.nameValueStore.get(this.constants.storageKey, (err, scripts) => {
			if (!err) {
				if (!scripts) scripts = {};
				scripts[sd.name] = saveObj;
				this.nameValueStore.set(this.constants.storageKey, scripts);
			}
		});
		scriptStatus.value = sd.name + " indicator successfully added";
		this.emitCustomEvent({
			effect: "save",
			detail: {
				name: sd.name,
				content: scriptText
			}
		});
	}

	/**
	 * Clears the scripting input boxes.
	 *
	 * @since 6.1.0
	 */
	clear() {
		this.querySelector(".scriptiq-textarea textarea").value = "";
		this.querySelector(".scriptiq-status input").value = "";
	}

	/**
	 * Closes the scripting UI area.
	 *
	 * @since 6.1.0
	 */
	close() {
		this.removeAttribute("cq-active");
		const event = new Event(this.constants.resizeEvent, {
			bubbles: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		this.context.stx.resizeChart();
	}

	/**
	 * Initializes the component and loads the necessary libraries.
	 * When this is complete, an optional callback can be invoked. This is set up in the context configuration, as in the example below.
	 *
	 * @example
	 * stxx.uiContext.config.plugins.scriptIQ.postLoadCallback = () => {...};
	 *
	 * @since
	 * - 6.1.0
	 * - 9.1.0 Moved callback to configuration.
	 */
	initialize() {
		const { context } = this;
		this.currentStudy = {};

		let {
			config: { nameValueStore }
		} = context;
		if (!nameValueStore && CIQ.NameValueStore)
			nameValueStore = CIQ.NameValueStore;
		this.nameValueStore = new nameValueStore();

		// Listen for the event.
		this.addEventListener(
			this.constants.resizeEvent,
			() => this.resizeScriptingArea(),
			false
		);

		context.advertiseAs(this, "ScriptIQEditor");
		this.addDefaultMarkup();

		const handle = this.querySelector(".stx-ico-handle");
		context.stx.makeModal(handle);
		CIQ.safeDrag(handle, {
			down: (e) => this.startDrag(e),
			move: (e) => this.drag(e),
			up: (e) => this.endDrag(e)
		});

		this.preloadScriptIQ();
		CIQ.getFnFromNS(context, "config.plugins.scriptIQ.postLoadCallback")();
	}

	/**
	 * Opens the scripting UI area. Sets the `cq-active` attribute to true; for example, `<cq-scriptiq-editor cq-active="true">`.
	 *
	 * @param {object} [params] The object that contains the saved script which fills in the scripting input area.
	 * @param {string} [params.source] The ScriptIQ text.
	 *
	 * @since 6.1.0
	 */
	open(params) {
		this.setAttribute("aria-hidden", false);
		this.setAttribute("cq-active", "true");
		this.clear();
		const textArea = this.querySelector(".scriptiq-textarea textarea");
		if (params && params.source) {
			textArea.value = params.source;
			this.querySelector(".scriptiq-status input").value = "";
		}
		textArea.focus();

		const event = new Event(this.constants.resizeEvent, {
			bubbles: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		this.context.stx.resizeChart();
	}

	/**
	 * Loads saved scripts from previous sessions.
	 */
	preloadScriptIQ() {
		this.nameValueStore.get(this.constants.storageKey, (err, scripts) => {
			if (!err) {
				if (!scripts) scripts = {};
				if (Object.keys(scripts).length > 0) {
					for (let name in scripts) {
						this.addScript(scripts[name]);
					}
				}
			}
		});
		this.parentElement.setAttribute("loaded", "true");
	}

	/**
	 * Sets the height of the chart area after the scripting edit area has been resized.
	 */
	resizeScriptingArea() {
		const { topNode } = this.context || {};
		const chartArea = this.qs(".ciq-chart-area", topNode);
		const footerHeight = this.qs(".ciq-footer", topNode).clientHeight;
		let chartAreaHeight;
		if (this.hasAttribute("cq-active")) {
			const scriptingHeight = this.offsetHeight;
			chartAreaHeight =
				CIQ.pageHeight(topNode.ownerDocument.defaultView) -
				scriptingHeight -
				footerHeight * 2;
			chartArea.style.height = chartAreaHeight + "px";

			// adjust according to the ciq chart area value
			this.style.right = chartArea.style.right;
		} else {
			chartArea.style.height = "";
		}
	}

	//-------------------------------------------------------------------------------------------
	// The drag and drop functionality is to allow the user to resize the ScriptIQ editor
	//-------------------------------------------------------------------------------------------

	/**
	 * Starts the resizing operation when edit panel divider is dragged.
	 *
	 * @param {Event} e Drag event
	 */
	startDrag(e) {
		this.initialHeight = this.offsetHeight;
		this.ownerDocument.body.classList.add("resizing");

		//possibly vendor styles do not propagate?
		this.classList.add("resizing");
		const els = this.getElementsByTagName("*");
		for (let d = 0; d < els.length; d++) {
			els[d].classList.add("resizing");
		}

		//this.querySelector("div.panel-border").classList.add("active"); //top border
		this.context.stx.hideCrosshairs();
	}

	/**
	 * Performs resizing as edit panel divider is dragged.
	 *
	 * @param {Event} e Drag event
	 */
	drag(e) {
		this.querySelector(".stx-ico-handle").classList.add("stx-grab");
		const doResize = () => {
			this.style.height = this.height + "px";

			const event = new Event(this.constants.resizeEvent, {
				bubbles: true,
				cancelable: true
			});
			this.dispatchEvent(event);
			this.context.stx.resizeChart();

			this.busyResizing = false;
		};
		this.height = this.initialHeight - e.displacementY;
		if (this.busyResizing) return;
		this.busyResizing = true;
		setTimeout(doResize.bind(this), 10);
	}

	/**
	 * Ends the resizing operation when edit panel divider is dragged.
	 *
	 * @param {Event} e Drag event
	 */
	endDrag(e) {
		//this.stx.modalEnd();
		this.ownerDocument.body.classList.remove("resizing");
		this.querySelector(".stx-ico-handle").classList.remove("stx-grab");
		//possibly vendor styles do not propagate?
		this.classList.remove("resizing");
		const els = this.getElementsByTagName("*");
		for (let d = 0; d < els.length; d++) {
			els[d].classList.remove("resizing");
		}
		//this.querySelector("div.panel-border").classList.remove("active"); //top border
		this.context.stx.showCrosshairs();
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 */
ScriptIQEditor.markup = `
		<div class="stx-ico-handle"><span class=""></span></div>
		<div class="scriptiq-textarea"><textarea spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none" placeholder="Enter script" aria-label="Enter script"></textarea></div>
		<div class="scriptiq-toolbar">
			<div stxtap="addScript()" class="ciq-btn" role="button">Apply</div>
			<div stxtap="clear()" class="ciq-btn" role="button">Clear</div>
			<div class="stx-btn stx-ico" stxtap="close()" role="button" aria-label="Close"><span class="stx-ico-close">&nbsp;</span></div>
		</div>
		<div class="scriptiq-status"><input readonly placeholder="Script status" aria-live="polite"></input></div>
	`;
CIQ.UI.addComponentDefinition("cq-scriptiq-editor", ScriptIQEditor);
