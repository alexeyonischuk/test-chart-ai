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
import "../../js/webcomponents/floatingWindow.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-help&gt;</h4>
 *
 * When long-pressed, this component can display help text. The text is displayed in a floating window popup over the chart.
 * The text which is discplayed is configured in the CIQ.Help namespace.
 * Sample help configuration is provided in the sample file in your library package, in /examples/help/helpContent.js.
 *
 * The long-press time is set in the [stxx.longHoldTime]{@link https://documentation.chartiq.com/CIQ.ChartEngine.html#callbacks%5B%60longhold%60%5D} function.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | help-id   | A key to the correct help text in CIQ.Help.Content. |
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when it is long-pressed enough for the help text to show.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "help" |
 * | action | "longpress" |
 * | helpId | _key_ |
 * | helpData | _text_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @example <caption>Help component within a toggle:</caption>
 * <cq-toggle class="ciq-CH active" config="crosshair" icon="crosshair">
 * 		<cq-help class="hidden" help-id="crosshair_help"></cq-help>
 * 		<span class="icon crosshair"></span>
 *	</cq-toggle>
 *
 * @alias WebComponents.Help
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 9.1.0 Observes attributes. Added emitter.
 */
class Help extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["help-id"];
	}

	constructor() {
		super();
		CIQ.UI.makeShadow(this);
	}

	connectedCallback() {
		if (!this.isConnected || this.attached) return;
		super.connectedCallback();

		["mousedown", "pointerdown", "touchstart"].forEach((eventName) =>
			this.addEventListener(eventName, this.mouseTouchDown, { passive: false })
		);
		["mouseup", "pointerup", "touchend", "touchmove", "click"].forEach(
			(eventName) =>
				this.addEventListener(eventName, this.mouseTouchUp, { passive: false })
		);
		this.setupShadow();
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, Help);
		this.constructor = Help;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		this.removeClaim(this);
		super.disconnectedCallback();
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Help
	 */
	setContext(context) {
		this.addDefaultMarkup();
		let { stx } = context;
		if (CIQ.Help) CIQ.UI.activatePluginUI(stx, "help");
		this.ensureMessagingAvailable(stx);
		this.addClaim(this);
	}

	/**
	 * Handler for beginning a long-press.
	 *
	 * @param {Event} evt The mousedown event
	 *
	 * @tsmember WebComponents.Help
	 */
	mouseTouchDown(evt) {
		this.stopPropagation = false;
		if (
			!CIQ.Help ||
			!CIQ.Help.Content ||
			!CIQ.Help.Content[this["help-id"]] ||
			this.pressTimer ||
			(evt.button && evt.button >= 2)
		)
			return;
		this.pressTimer = setTimeout(() => {
			this.pressTimer = null;
			// Allow the press highlight animation to complete before removing
			setTimeout(() => this.classList.remove("pressing"), 1000);
			this.press();
		}, this.context.stx.longHoldTime);
		this.classList.add("pressing");
	}

	/**
	 * Handler for ending a long-press.  If the threshold time is reached (`pressing` class remains set), the help display is triggered.
	 *
	 * @param {Event} evt The mousedown event
	 *
	 * @tsmember WebComponents.Help
	 */
	mouseTouchUp(evt) {
		if (this.stopPropagation) evt.stopPropagation();
		if (
			!CIQ.Help ||
			!CIQ.Help.Content ||
			!CIQ.Help.Content[this["help-id"]] ||
			(evt.button && evt.button >= 2)
		)
			return;
		if (evt.type === "click") {
			if (!evt.detail && !this.classList.contains("pressing")) this.press();
			this.classList.remove("pressing");
		}
		if (!this.pressTimer) return;
		clearTimeout(this.pressTimer);
		this.pressTimer = null;
	}

	/**
	 * Handler for keyboard interaction.
	 *
	 * Question mark `?` key will trigger the help for the active component, if available.
	 *
	 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
	 * @param {string} key Key that was stroked
	 * @param {Event} e The event object
	 * @return {boolean} true if keystroke was processed
	 *
	 * @tsmember WebComponents.Help
	 */
	keyStroke(hub, key, e) {
		if (key !== "?") return false;
		const myId = this["help-id"];
		let elemWithHelp = this.qsa("[help-id]", CIQ.getActiveElement(), true);
		if (elemWithHelp.length === 1) elemWithHelp = elemWithHelp[0];
		else elemWithHelp = null;
		if (!elemWithHelp)
			elemWithHelp = CIQ.climbUpDomTree(
				CIQ.getActiveElement(),
				"[help-id]",
				true
			)[0];
		if (!elemWithHelp && hub.tabActiveElement)
			elemWithHelp = this.qsa(
				"[help-id]",
				hub.tabActiveElement.element,
				true
			)[0];
		if (!elemWithHelp || myId !== elemWithHelp.getAttribute("help-id"))
			return false;
		this.press();
		return true;
	}

	/**
	 * Ensures that an instance of the [cq-floating-window]{@link WebComponents.FloatingWindow}
	 * web component is available to handle event messaging and create the shortcuts legend floating
	 * window.
	 *
	 * This function is called when the component's context is set (on load).
	 *
	 * @param {CIQ.ChartEngine} stx The chart engine that provides the UI context, which contains the
	 * [cq-floating-window]{@link WebComponents.FloatingWindow} web component.
	 *
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.Help
	 */
	ensureMessagingAvailable(stx) {
		setTimeout(() => {
			const contextContainer = stx.uiContext.topNode;
			if (!contextContainer.querySelector("cq-floating-window")) {
				contextContainer.append(document.createElement("cq-floating-window"));
			}
		});
	}

	/**
	 * Adds class `help-available` if a property matching this element's help-id attribute
	 * can be found in CIQ.Help.Content object. This class can be used to indicate that help
	 * is available for the element.  For example, a small dot can be shown.
	 *
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.Help
	 */
	verifyHelpContent() {
		if (!CIQ.Help || !CIQ.Help.Content) return;
		let helpData = CIQ.Help.Content[this["help-id"]];
		if (helpData) {
			this.classList.add("help-available");
		} else {
			this.classList.remove("help-available");
		}
	}

	/**
	 * Called from mouseTouchUp, this method will send the help text to the floating window for display.
	 *
	 * @since 8.4.0
	 *
	 * @tsmember WebComponents.Help
	 */
	press() {
		if (!CIQ.Help || !CIQ.Help.Content) return;
		let { stx } = this.context;
		let helpId = this["help-id"] || "default";
		let helpData = CIQ.Help.Content[helpId] || CIQ.Help.Content["default"];
		this.emitCustomEvent({
			action: "longpress",
			effect: "help",
			detail: {
				params: Object.assign({ helpId }, helpData)
			}
		});
		if (!helpData) return;

		stx.dispatch("floatingWindow", {
			type: "documentation",
			title: helpData.title,
			content: helpData.content,
			targetElement: this.parentElement || this.getRootNode().host,
			actionButtons: [],
			container: stx.chart.panel.subholder,
			onClose: () => true,
			width: 500,
			status: true,
			tag: "help"
		});

		this.stopPropagation = true;
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 * This markup contains a dot which can be displayed when help is available.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Help
 */
Help.markup = `
		<div class="ciq-help-widget"></div>
		<div class="press-indicator" aria-hidden="true">
			<!-- 1x1 transparent image to maintain aspect ratio when sizing by height -->
			<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-help", Help);
