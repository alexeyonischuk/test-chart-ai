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


import { CIQ as _CIQ } from "../componentUI.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */

const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-message-toaster&gt;</h4>
 *
 * Displays pop-up messages, also known as toasts.
 *
 * Listens for a chart engine event of type "notification" and displays the notification as a
 * pop-up message over the chart.
 *
 * To trigger the notification event, call {@link CIQ.ChartEngine#dispatch} with the
 * "notification" type and the required notification listener data (see
 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}), for example:
 * ```
 * stxx.dispatch("notification", { message: "A toast!" });
 * ```
 *
 * Toasts are displayed immediately unless another toast is already on screen. Concurrent toasts
 * are displayed sequentially, not simultaneously.
 *
 * When a toast is created, it's added to a display queue. The toast at the front of the queue is
 * dequeued and displayed when no other toasts are on screen. Toasts can be prioritized (that is,
 * reordered in the queue) by setting the `priority` parameter of the
 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener} argument.
 *
 * _**Attributes**_:
 *
 * | Name | Description | Valid Values |
 * | ---- | ----------- | ------------ |
 * | `default-display-time` | Amount of time, in seconds, toasts are displayed before being automatically dismissed (removed from the display). | Integer numbers >= 0. A value of 0 causes toasts to remain on screen &mdash; blocking the toast display queue &mdash; until selected by the user. |
 * | `default-position` | Vertical on-screen position of toasts relative to the chart. (Toasts are centered horizontally.) | "top" or "bottom" |
 * | `default-transition` | Animation used to display and dismiss toasts. | "fade", "slide", "pop" or "drop" | The default is no transition.
 *
 * **Note:** All attributes can be overridden by the argument provided to
 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a toast message is dismissed due to either:
 * - click (user interaction)
 * - alert (internal removal request)
 * - timeout (expiration)
 *
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction", "alert", "timeout" |
 * | effect | "remove" |
 * | action | "click", null |
 * | displayTime | _time before automatically dismissing_ |
 * | message | _toast message_ |
 * | priority | _toast priority_ |
 * | type | _toast style_ |
 *
 * A custom event will be emitted by the component when a toast message is displayed, or removed from the message queue.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "alert" |
 * | effect | "display", "recall" |
 * | action | null |
 * | displayTime | _time before automatically dismissing_ |
 * | message | _toast message_ |
 * | priority | _toast priority_ |
 * | type | _toast style_ |
 *
 * @example
 * <cq-message-toaster
 *     default-display-time="10"
 *     default-transition="slide"
 *     default-position="top"
 * </cq-message-toaster>
 *
 * @alias WebComponents.MessageToaster
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 8.2.0 Added
 * - 9.1.0 Observes attributes. Added emitter.
 */
class MessageToaster extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["default-display-time", "default-transition", "default-position"];
	}

	constructor() {
		super();
	}

	/**
	 * Initializes the message toaster web component.
	 *
	 * @private
	 * @since 8.2.0
	 * @tsmember WebComponents.MessageToaster
	 */
	connectedCallback() {
		super.connectedCallback();

		this.messageQueue = [];
		this.displayTimer = null;
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, MessageToaster);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.MessageToaster
	 */
	setContext(context) {
		// Listen for notification events from the chartEngine
		context.stx.addEventListener("notification", (params) => {
			this.newMessage(params);
		});

		this.addInjection("append", "resizeChart", () => this.handleResize());
	}

	/**
	 * Updates the position settings of all toasts (all DOM elements with class
	 * `cq-toast-message`), including those not currently displayed, when the chart is resized.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	handleResize() {
		for (let idx = 0; idx < this.messageQueue.length; idx++) {
			if (this.messageQueue[idx].isDisplayed)
				this.positionElement(this.messageQueue[idx]);
		}
	}

	/**
	 * Sets the display position of the toast identified by `messageElement` within the bounds of
	 * the chart canvas. Centers the toast horizontally and positions it vertically based on the
	 * toast's <a href="WebComponents.MessageToaster.html#createMessageElement">
	 * <code class="codeLink">position</code></a> setting.
	 *
	 * @param {HTMLElement} messageElement The toast DOM element to position.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	positionElement(messageElement) {
		const canvasBounds = this.context.stx.chart.canvas.getBoundingClientRect();
		const contextBounds = this.context.topNode.getBoundingClientRect();
		const bottomAlign = messageElement.classList.contains("align-bottom");

		let offsetTop = canvasBounds.top - contextBounds.top;
		let offsetLeft = canvasBounds.left - contextBounds.left;

		Object.assign(messageElement.style, {
			top: bottomAlign
				? offsetTop + canvasBounds.height + "px"
				: offsetTop + "px",
			left: offsetLeft + canvasBounds.width * 0.5 + "px"
		});
	}

	/**
	 * Creates a new toast DOM element. Toast elements have the `cq-toast-message` class attribute.
	 *
	 * @param {object} notification Data object from a "notification" event. See
	 * 		[notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
	 * 		<p>**Note:** This parameter does not accommodate the string type specified in
	 * 		[notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
	 * @param {string} notification.message Text to display in the toast notification. Strings
	 * 		longer than 160 characters are truncated.
	 * @param {string} [notification.position="top"] Position of the toast on the chart: "top" or
	 * 		"bottom". Overrides the `default-position` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.type="info"] Toast style: "info", "error", "warning", or
	 * 		"confirmation". Overrides the `default-transition` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.transition] Type of animation used to display and dismiss the
	 * 		toast: "fade", "slide", "pop" or "drop". The default is no transition.
	 * @param {number} [notification.displayTime=10] Number of seconds to display the toast before
	 * 		automatically dismissing it. A value of 0 causes the toast to remain on
	 * 		screen&nbsp;&mdash;&nbsp;preventing other toasts from
	 * 		displaying&nbsp;&mdash;&nbsp;until the toast is selected by the user. Overrides the
	 * 		`default-display-time` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {number} [notification.priority=0] Priority of the toast relative to others in the
	 * 		display queue. Higher priority toasts are displayed before toasts with lower priority.
	 * 		For example, a toast with priority&nbsp;=&nbsp;4 is displayed before a toast with
	 * 		priority&nbsp;=&nbsp;1. Toasts with the same priority are displayed in the order
	 * 		they were created; that is, in the order they entered the display queue.
	 * @param {Function} [notification.callback] Function to call when the toast is selected
	 * 		(dismissed) by the user. If the toast is dismissed automatically (see `displayTime`),
	 * 		this function is not called.
	 * @return {HTMLElement} A toast DOM element.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	createMessageElement(notification) {
		if (!notification.message) return;

		let {
			message,
			position,
			type,
			transition,
			displayTime,
			priority,
			callback
		} = notification;

		let defaultDisplayTime = +this.getAttribute("default-display-time"); // Time in seconds
		if (isNaN(defaultDisplayTime)) defaultDisplayTime = 10;
		const defaultMessagePosition =
			this.getAttribute("default-position") || "top";
		const defaultMessageTransition =
			this.getAttribute("default-transition") || ""; // Default is no transition
		// A value of 0 will prevent the message from removing automatically.
		if (displayTime !== 0) displayTime = displayTime || defaultDisplayTime;
		position = position || defaultMessagePosition;
		transition = transition || defaultMessageTransition;
		priority = priority || 0;
		type = type || "info";

		// Truncate a string longer than 160 characters
		if (message.length > 160) {
			message = message.slice(0, 160) + "...";
		}

		let messageElement = document.createElement("div");
		messageElement.innerHTML = `
			<div class="cq-message-container">
				<div class="cq-message-icon"></div>
				<div class="cq-message-text"></div>
			</div>`;
		let textElement = messageElement.querySelector(".cq-message-text");
		CIQ.makeTranslatableElement(textElement, this.context.stx, message);
		messageElement.classList.add("cq-toast-message");
		messageElement.classList.add("type-" + type);
		messageElement.setAttribute("aria-label", "Toast Message");
		messageElement.setAttribute("role", "alert");
		if (transition)
			messageElement.classList.add("animate", "transition-" + transition);
		if (position == "bottom") messageElement.classList.add("align-bottom");
		messageElement.displayTime = displayTime;
		messageElement.priority = priority;
		messageElement.message = message;
		messageElement.type = type;

		CIQ.safeClickTouch(
			messageElement,
			function (messageElement, callback, event) {
				event.stopPropagation();
				if (callback) callback();
				this.removeMessageNode(messageElement, "click");
			}.bind(this, messageElement, callback)
		);

		this.positionElement(messageElement);

		return messageElement;
	}

	/**
	 * Displays the next toast in the display queue and sets a timer based on the toast
	 * <a href="WebComponents.MessageToaster.html#newMessage"><code class="codeLink">
	 * displayTime</code></a> property to automatically dismiss the toast.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	displayNextMessage() {
		if (!this.messageQueue.length) return;

		let messageNodes = this.context.topNode.querySelector(".cq-toast-message");
		if (!messageNodes) {
			let nextMessage = this.messageQueue[0];
			// Toast Message nodes are added to the body to ensure they appear over all other UI elements (e.g. Dialogs)
			this.context.topNode.appendChild(nextMessage);
			nextMessage.isDisplayed = true;
			this.emitCustomEvent({
				emitter: this,
				action: null,
				cause: "alert",
				effect: "display",
				detail: (({ displayTime, priority, message, type }) => ({
					displayTime,
					priority,
					message,
					type
				}))(nextMessage)
			});
			if (nextMessage.displayTime !== 0) {
				this.displayTimer = window.setTimeout(
					this.removeMessageNode.bind(this, nextMessage, "timeout"),
					nextMessage.displayTime * 1000
				);
			}
		}
	}

	/**
	 * Removes the toast specified by `messageNode` from the display queue and displays the next
	 * message in the queue.
	 *
	 * @param {HTMLElement} messageNode The toast to remove from the display queue.
	 * @param {string} [reason] The reason for the removal. Ex: "click" or "timeout".
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	removeMessageNode(messageNode, reason) {
		if (messageNode.classList.contains("hide")) return;

		messageNode.classList.add("hide");
		let delayTime = messageNode.classList.contains("animate") ? 500 : 0;

		window.setTimeout(() => {
			// Remove the node from the dom
			messageNode.remove();
			this.emitCustomEvent({
				emitter: this,
				action: reason === "click" ? "click" : null,
				cause: reason === "click" ? "useraction" : reason || "alert",
				effect: "remove",
				detail: (({ displayTime, priority, message, type }) => ({
					displayTime,
					priority,
					message,
					type
				}))(messageNode)
			});
			// Remove the node from the queue
			this.messageQueue.splice(this.messageQueue.indexOf(messageNode), 1);
			if (this.displayTimer)
				this.displayTimer = window.clearTimeout(this.displayTimer);
			this.displayNextMessage();
		}, delayTime);
	}

	/**
	 * Removes the toast specified by `messageNode` from the DOM but not from the display queue.
	 *
	 * Use this function to interrupt a toast and display one of higher priority. The interrupted
	 * toast is re-displayed by the next call to
	 * [displayNextMessage](WebComponents.MessageToaster.html#displayNextMessage).
	 *
	 * @param {HTMLElement} messageNode The toast to recall.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since 8.2.0
	 */
	recallMessageNode(messageNode) {
		if (messageNode.isDisplayed) {
			if (this.displayTimer)
				this.displayTimer = window.clearTimeout(this.displayTimer);
			messageNode.isDisplayed = false;
			this.context.topNode.removeChild(messageNode);
			this.emitCustomEvent({
				emitter: this,
				action: null,
				cause: "alert",
				effect: "recall",
				detail: (({ displayTime, priority, message, type }) => ({
					displayTime,
					priority,
					message,
					type
				}))(messageNode)
			});
		}
	}

	/**
	 * Creates a new toast and adds it to a queue that determines the display sequence of
	 * concurrent toasts.
	 *
	 * This function is the "notification" event listener. See
	 * [notificationEventListener]{@link CIQ.ChartEngine~notificationEventListener}.
	 *
	 * @param {object|string} notification Either an object containing data relevant to the
	 * 		notification event or a string that identifies a property of the `systemMessages`
	 * 		property of the chart configuration object. The property contained in `systemMessages`
	 * 		is an object literal that specifies data relevant to the notification event (see
	 * 		<a href="tutorial-Chart%20Configuration.html#systemmessages" target="_blank">
	 * 		<code class="codeLink">systemMessages</code></a> in the
	 * 		<a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
	 * 		tutorial).
	 * @param {string} notification.message Text to display in the toast notification. Strings
	 * 		longer than 160 characters are truncated.
	 * @param {string} [notification.position="top"] Position of the toast on the chart: "top" or
	 * 		"bottom". Overrides the `default-position` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.type="info"] Toast style: "info", "error", "warning", or
	 * 		"confirmation". Overrides the `default-transition` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {string} [notification.transition] Type of animation used to display and dismiss the
	 * 		toast: "fade", "slide", "pop" or "drop". The default is no transition.
	 * @param {number} [notification.displayTime=10] Number of seconds to display the toast before
	 * 		automatically dismissing it. A value of 0 causes the toast to remain on
	 * 		screen&nbsp;&mdash;&nbsp;preventing other toasts from
	 * 		displaying&nbsp;&mdash;&nbsp;until the toast is selected by the user. Overrides the
	 * 		`default-display-time` attribute of the
	 * 		[`<cq-message-toaster>`]{@link WebComponents.MessageToaster} element.
	 * @param {number} [notification.priority=0] Priority of the toast relative to others in the
	 * 		display queue. Higher priority toasts are displayed before toasts with lower priority.
	 * 		For example, a toast with priority&nbsp;=&nbsp;4 is displayed before a toast with
	 * 		priority&nbsp;=&nbsp;1. Toasts with the same priority are displayed in the order
	 * 		they were created; that is, in the order they entered the display queue.
	 * @param {Function} [notification.callback] Function to call when the toast is selected
	 * 		(dismissed) by the user. If the toast is dismissed automatically (see `displayTime`),
	 * 		this function is not called.
	 *
	 * @tsmember WebComponents.MessageToaster
	 *
	 * @since
	 * - 8.2.0
	 * - 8.4.0 Calling this method with a message that is already displayed or in the queue
	 * 		will return without doing anything.
	 */
	newMessage(notification) {
		if (typeof notification === "string" && this.context.config) {
			if (this.context.config.systemMessages)
				notification = this.context.config.systemMessages[notification];
		}
		if (!notification || typeof notification !== "object") return;
		if (notification.remove) {
			for (const queueItem of this.messageQueue) {
				if (queueItem.message === notification.message) {
					this.dismissMessage(notification.message);
				}
			}
			return;
		}
		let newMessage = this.createMessageElement(notification);
		if (newMessage) {
			// Determine if the message priority places it ahead of other messages in the queue
			const index = this.messageQueue.findIndex(
				(m) => m.priority < newMessage.priority
			);
			if (index >= 0) {
				// Recall the message if it's already displayed
				if (this.messageQueue[index].isDisplayed)
					this.recallMessageNode(this.messageQueue[index]);
				// Inject the new priority message before the first non-priority message
				this.messageQueue.splice(index, 0, newMessage);
			} else {
				this.messageQueue.push(newMessage);
			}
			this.displayNextMessage();
		}
	}

	/**
	 * Dismisses a message by removing it from the queue (including if it is already displayed).
	 *
	 * @param {string} message The message to dismiss.
	 *
	 * @tsmember WebComponents.MessageToaster
	 * @since 8.4.0
	 */
	dismissMessage(message) {
		for (const notification of this.messageQueue) {
			if (notification.message === message) {
				this.removeMessageNode(notification);
			}
		}
	}
}

CIQ.UI.addComponentDefinition("cq-message-toaster", MessageToaster);
