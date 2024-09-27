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
import "../../js/standard/studies.js";
import "../../js/webcomponents/clickable.js";
import "../../js/webcomponents/heading.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */




const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"studyLegend component requires first activating studies feature."
	);
} else {
	/**
	 * @classdesc
	 *
	 * This is a custom HtmlElement (Web Component).  The tag name is the following:
	 *
	 * <h4>&lt;cq-study-legend&gt;</h4>
	 *
	 * This component displays a menu of studies displayed on the chart.  It has several modes of operation:
	 * - It can be embedded in a menu dropdown to display active studies
	 * - It can be placed as a marker to display all plots (including comparisons) on a panel
	 * - Permutations of the above
	 *
	 * The legend may facilitate the following operations on the plot, depending on the attribute configuration:
	 * - Remove the plot
	 * - Disable the plot
	 * - Change the color of the plot
	 * - Edit study parameters
	 * - View comparison prices
	 *
	 * _**Keyboard control**_
	 *
	 * When selected with tab key navigation and activated with Return/Enter, this component has
	 * the following internal controls:
	 * - Up/Down arrow &mdash; Move selection between legend entries
	 * - Left/Right arrow &mdash; Select a control within a selected entry, such as
	 * the Remove button. Child elements must have the attribute `keyboard-selectable-child` set to
	 * be selectable with these keys.
	 *
	 * _**Attributes**_
	 *
	 * This component observes the following attributes and will change behavior if these attributes are modified:
	 * | attribute        | description |
	 * | :--------------- | :---------- |
	 * | button-clear-all | Set to a handler to show the Clear All button. Handler will be called when button is pressed. |
	 * | button-edit      | Set to enable the edit icon, otherwise, clicking on the plot name will open edit. |
	 * | button-remove    | Set to enable the remove icon. |
	 * | clone-to-panel   | Set to place this legend on every panel. |
	 * | content-keys     | Optional selector for which nodes have content, to indicate if legend is populated.  Default is `"[label],[description]"`. |
	 * | filter           | Comma delimited list of types of plots to display. Valid values, which may be combined, are: `panel`, `overlay`, `signal`, `custom-removal` |
	 * | heading          | Set to a value to display when legend is embedded in a dropdown menu. |
	 * | marker-label     | Set to the name to display on the legend which appears on the chart, e.g. "Plots". |
	 * | series           | Set to `true` to include comparisons in the legend. |
	 *
	 * The filter values are further defined as follows:
	 * - `custom-removal`: show studies needing custom removal.
	 * - `overlay`: only show overlays.
	 * - `panel`: only show studies in this panel.
	 * - `signal`: only show signalling studies.
	 *
	 * In addition, the following attributes are also supported:
	 * | attribute    | description |
	 * | :----------- | :---------- |
	 * | chart-legend | READ ONLY, set internally by component - indicates that legend is on a chart panel, as opposed to embedded in a menu. |
	 * | cq-marker    | Set to true to allow legend to be properly positioned on a chart panel. |
	 *
	 * _**Emitters**_
	 *
	 * A custom event will be emitted by the component when a legend item is toggled, removed, or edited.
	 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
	 * The details of the event contain the following:
	 * | property | value |
	 * | :------- | :---- |
	 * | emitter | this component |
	 * | cause | "useraction" |
	 * | effect | "toggle", remove", "edit" |
	 * | action | "click" |
	 * | name | _plot name_ |
	 * | value | _enabledstate -or- study inputs, outputs, and parameters_ |
	 *
	 * Note:
	 * -  `detail.value` not available on remove effect
	 *
	 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
	 * The default markup provided has accessibility features.
	 *
	 * @example <caption>Legend on the chart, placed on each panel:</caption>
	 * <cq-study-legend marker-label="Plots" clone-to-panel filter="panel" button-remove="true" series="true" cq-marker></cq-study-legend>
	 * @example <caption>Legend for signals:</caption>
	 * <cq-study-legend marker-label="Signals" filter="signal" cq-marker></cq-study-legend>
	 *
	 * @alias WebComponents.StudyLegend
	 * @extends CIQ.UI.ModalTag
	 * @class
	 * @protected
	 * @since
	 * - 8.3.0 Enabled internal keyboard navigation and selection.
	 * - 8.6.0 added `cq-signal-studies-only` flag.
	 * - 9.1.0 Observes attributes. Added emitter.
	 */
	class StudyLegend extends CIQ.UI.ModalTag {
		static get observedAttributes() {
			return [
				"button-clear-all",
				"button-edit",
				"button-remove",
				"clone-to-panel",
				"content-keys",
				"filter", // "panel, overlay, signal, custom-removal"
				"heading",
				"marker-label",
				"series"
			];
		}

		constructor() {
			super();
			CIQ.UI.makeShadow(this);
		}

		connectedCallback() {
			if (!this.isConnected || this.attached) return;
			super.connectedCallback();

			this.addClaim(this);

			// Update the keyboard navigation. New study legend components can be added at runtime.
			if (this.context && this.context.config && this.context.config.channels) {
				this.channelWrite(
					this.context.config.channels.keyboardNavigation ||
						"channel.keyboardNavigation",
					{ action: "registerElements" }
				);
			}
			if (this.isShadowComponent && this.children.length) {
				while (this.children.length) {
					this.root.appendChild(this.firstChild);
				}
			}
			this.markup = this.trimInnerHTMLWhitespace();
			this.usingMarkup = !!this.markup.match(/\{\{(.{1,20}?)\}\}/g);
			this.setMarkup();
			this.setupShadow();
		}

		adoptedCallback() {
			super.adoptedCallback();
			CIQ.UI.flattenInheritance(this, StudyLegend);
			this.constructor = StudyLegend;
		}

		disconnectedCallback() {
			if (this.doNotDisconnect) return;
			if (this.context) {
				// Update the keyboard navigation. Need to remove this element from the index now that it's detached
				if (this.context.config && this.context.config.channels) {
					this.channelWrite(
						this.context.config.channels.keyboardNavigation ||
							"channel.keyboardNavigation",
						{ action: "registerElements" }
					);
				}
			}
			window.removeEventListener("resize", this.resizeListener);
			this.setActiveState(false);
			this.removeClaim(this);
			super.disconnectedCallback();
		}

		/**
		 * Processes attribute changes.  This is called whenever an observed attribute has changed.
		 *
		 * @param {string} name Attribute name
		 * @param {string} oldValue Original attribute value
		 * @param {string} newValue new Attribute value
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		handlePropertyChange(name, oldValue, newValue) {
			if (oldValue === newValue) return;
			this[name] = newValue;
			if (["content-keys", "heading", "button-clear-all"].includes(name)) {
				if (this.usingMarkup) {
					this.setMarkup();
				} else {
					// do nothing when using predefined content
				}
			}
			this.renderLegend();
		}

		/**
		 * Called when component is initialized, from {@link WebComponents.StudyLegend#setContext}.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		begin() {
			if (this.init) return;

			if (this.hasAttribute("cq-marker")) {
				this.setAttribute("chart-legend", "");
				CIQ.UI.stxtap(this, function (e) {
					if (e.target.isConnected && !e.target.closest("[section-dynamic]"))
						this.setActiveState();
				});
			}

			this.init = true;
		}

		/**
		 * Sets the `ciq-active` class on the component, and modalizes the legend for keyboard navigation.
		 *
		 * @param {boolean} newState `true` to show the legend, `false` to hide.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setActiveState(newState) {
			const isActive = this.classList.contains("ciq-active");
			// If newState is undefined, toggle the active state
			newState = typeof newState === "undefined" ? !isActive : newState;
			const keystrokeHub = this.ownerDocument.body.keystrokeHub;
			if (newState) {
				this.classList.add("ciq-active");
				// Treat the legend like a modal so keyboard navigation is returned after using colorPicker
				if (keystrokeHub && this.keyboardNavigation)
					keystrokeHub.addActiveModal(this);
			} else {
				this.classList.remove("ciq-active");
				if (keystrokeHub) keystrokeHub.removeActiveModal(this);
			}
		}

		/**
		 * Handler for keyboard interaction.
		 *
		 * @param {CIQ.UI.KeystrokeHub} hub The hub that processed the key
		 * @param {string} key Key that was stroked
		 * @param {Event} e The event object
		 * @return {boolean} true if keystroke was processed
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		keyStroke(hub, key, e) {
			if (!this.keyboardNavigation) return false;
			const items = this.qsa(
				"[keyboard-selectable]:not(.item-hidden), cq-comparison-item",
				this,
				true
			);

			if (key == " " || key == "Spacebar" || key == "Enter") {
				const focused = this.findFocused(items);
				if (!focused || !focused.length) return;
				const childItemsSelected = focused[0].querySelector(
					"[keyboard-selectable-child][cq-focused]"
				);
				if (childItemsSelected) {
					this.storeFocused(focused, childItemsSelected);
					this.clickItem(childItemsSelected, e);
				} else {
					// If no child item is seleted, but there is a swatch, go ahead and click it.
					const selectabelSwatch = focused[0].querySelector("cq-swatch");
					if (selectabelSwatch) this.clickItem(selectabelSwatch, e);
					else this.clickItem(focused[0], e);
				}
			} else if (key == "ArrowDown" || key == "Down") {
				this.focusNextItem(items);
			} else if (key == "ArrowUp" || key == "Up") {
				this.focusNextItem(items, true);
			} else if (key == "ArrowRight" || key == "Right") {
				const focused = this.findFocused(items);
				if (!focused || !focused.length) return;
				const childItems = focused[0].querySelectorAll(
					"[keyboard-selectable-child]"
				);
				if (childItems.length) this.focusNextItem(childItems);
			} else if (key == "ArrowLeft" || key == "Left") {
				const focused = this.findFocused(items)[0];
				if (!focused) return;
				const childItems = focused.querySelectorAll(
					"[keyboard-selectable-child]"
				);
				// If the end of the child items has been reached select the parent item instead
				if (childItems.length && !this.focusNextItem(childItems, true)) {
					this.removeFocused(childItems);
					this.focusItem(focused);
				}
			} else if (key === "Tab" || key === "Esc" || key === "Escape") {
				this.removeFocused(items);
				this.setActiveState(false);
				const keystrokeHub = this.ownerDocument.body.keystrokeHub;
				if (keystrokeHub) {
					keystrokeHub.highlightPosition({
						element: this,
						position: this.getBoundingClientRect()
					});
				}
			} else return false;

			return true;
		}

		/**
		 * Records last focused element.
		 *
		 * @param {HTMLElement} focused Element that had keyboard focus
		 * @param {HTMLElement} childItemsSelected Child element that was selected
		 * @private
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		storeFocused(focused, childItemsSelected) {
			let el = focused[0].querySelector("cq-label") || focused[0];
			const isSwitch = childItemsSelected.classList.contains("ciq-switch");
			if (!isSwitch) {
				el =
					(focused[0].previousElementSibling.matches("template") &&
						focused[0].previousElementSibling) ||
					focused[0].nextElementSibling;
				if (el && el.querySelector("cq-label"))
					el = el.querySelector("cq-label");
			}
			if (el) {
				this.clickedItem = {
					name: el.textContent.trim(),
					isSwitch,
					ms: +new Date()
				};
			}
		}

		/**
		 * If a color-picker is opened within this component, this will make sure the component stays active.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		launchColorPicker() {
			this.setActiveState(true);
		}

		/**
		 * Renders the legend based on the current studies in the CIQ.ChartEngine object, taking attribute settings into account.
		 * If the `series` attribute is set to `true`, comparisons will also be included in the legend.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		renderLegend() {
			if (this.currentlyDisabling) return;

			let { filter } = this;
			if (!filter) filter = "";
			filter = filter.split(",");

			if (!this.context) return;
			const { stx } = this.context;

			const template = this.root.querySelector("template[cq-study-legend]");
			while (template.nextSibling) template.nextSibling.remove();

			if (this.series === "true" && !this.root.querySelector("cq-comparison")) {
				const comparison = document.createElement("cq-comparison");
				comparison.setAttribute("chart-legend", "");
				template.insertAdjacentElement("beforebegin", comparison);
			} else if (this.series !== "true") {
				const comparison = this.root.querySelector("cq-comparison");
				if (comparison) comparison.remove();
			}

			const getSwatch = (sd) => {
				const colors = Object.values(sd.outputs);
				if (!stx.defaultColor) stx.getDefaultColor();
				const els = colors
					.slice(0, 3)
					.map((item) => {
						const color = item.color || item;
						const bgColor = CIQ.getBackgroundColor(this.parentNode);
						const border = CIQ.chooseForegroundColor(bgColor);
						const hslb = CIQ.hsl(bgColor);
						const isAuto = color === "auto";
						let fillColor = isAuto ? stx.defaultColor : color;
						const hslf = CIQ.hsl(fillColor);
						const brdr =
							(isAuto && colors.length === 1) ||
							Math.abs(hslb[2] - hslf[2]) < 0.2
								? `solid ${border} 1px`
								: "";
						const bg =
							isAuto && colors.length === 1
								? `linear-gradient(to right bottom, ${fillColor}, ${fillColor} 49%, ${bgColor} 50%, ${bgColor})`
								: isAuto
								? fillColor
								: color;
						return `<span style="border: ${brdr}; background: ${bg};"></span>`;
					})
					.join("");

				return els;
			};

			const removeStudy = (sd) => {
				return (e) => {
					e.stopPropagation();
					this.emitCustomEvent({
						effect: "remove",
						detail: { name: (sd.signalData || sd).name }
					});
					// Need to run this in the nextTick because the study legend can be removed by this click
					// causing the underlying chart to receive the mousedown (on IE win7)
					setTimeout(() => {
						if (!sd.permanent) CIQ.Studies.removeStudy(stx, sd);
						if (this.hasAttribute("cq-marker")) stx.modalEnd();
						this.renderLegend();
					}, 0);
				};
			};
			const editStudy = (sd) => {
				return (e) => {
					const {
						inputs,
						outputs,
						parameters,
						permanent,
						editFunction,
						signalData
					} = sd;
					this.emitCustomEvent({
						effect: "edit",
						detail: {
							name: (signalData || sd).name,
							value: { inputs, outputs, parameters }
						}
					});
					if (permanent || !editFunction) {
						stx.dispatch("notification", "studynoteditable");
						return;
					}
					setTimeout(() =>
						this.context
							.getAdvertised("StudyEdit")
							.editPanel({ stx, sd, inputs, outputs, parameters })
					);
				};
			};
			const handleToggle = (sd, stx) => {
				return (e) => {
					e.stopPropagation();
					this.currentlyDisabling = true;
					sd.toggleDisabledState(stx);
					let { target, currentTarget } = e;
					target.ariaPressed = !sd.disabled;

					// element inside the legend has been clicked: switch, label, span, etc.
					if (
						target !== currentTarget ||
						target.classList.contains("ciq-switch")
					)
						target = target.parentElement;
					target.classList[sd.disabled ? "remove" : "add"]("ciq-active");

					this.emitCustomEvent({
						effect: "toggle",
						detail: { name: sd.name, value: !sd.disabled }
					});
					this.currentlyDisabling = false;
				};
			};

			const panel = filter.includes("panel");
			const overlay = filter.includes("overlay");
			const customRemoval = filter.includes("custom-removal");
			const signal = filter.includes("signal");
			const markerLabel = this["marker-label"];
			const holder = this.closest(".stx-holder");
			const panelName = holder ? holder.panel.name : null;
			let isNativeMobile = false;

			const context = CIQ.UI.closestContextContainer(this);
			if (context && context.hasAttribute("ciq-native-mobile"))
				isNativeMobile = true;

			if (CIQ.Studies) {
				for (let id in stx.layout.studies) {
					const sd = stx.layout.studies[id];
					if (sd.customLegend) continue;
					if (customRemoval && !sd.study.customRemoval) continue;
					if (panel && sd.panel != panelName) continue;
					if (overlay && !sd.overlay && !sd.underlay) continue;
					if (
						(!holder || panelName === "chart") &&
						CIQ.xor(signal, sd.signalData)
					)
						continue;
					const template = this.root.querySelector("template[cq-study-legend]");
					const newChild = CIQ.UI.makeFromTemplate(template)[0];
					template.parentNode.appendChild(newChild);
					const label = newChild.querySelector("[label]");
					CIQ.makeTranslatableElement(label, stx, sd.inputs.display);
					if (!markerLabel) label.setAttribute("role", "menuitem");
					newChild.setAttribute("title", label.innerText);

					if (holder) newChild.appendChild(label);

					const { disabled, signalData } = sd;
					const swatch = newChild.querySelector(".swatch");
					if (swatch) {
						if (!holder || signalData) swatch.classList.add("hidden");
						else swatch.innerHTML = getSwatch(sd);
					}

					const toggle = newChild.querySelector(".ciq-switch");
					const labelid = CIQ.uniqueID() + "_toggle_label";
					toggle.setAttribute("aria-labelledBy", labelid);
					toggle.ariaPressed = !disabled;
					if (!disabled) newChild.classList.add("ciq-active");

					CIQ.UI.stxtap(toggle, handleToggle(sd, stx));
					const labelForToggle = newChild.querySelector("[id][hidden]");
					if (labelForToggle) labelForToggle.id = labelid;
					toggle.classList.remove("hidden");

					// restore focus
					if (
						this.clickedItem &&
						+new Date() - this.clickedItem.ms < 100 &&
						this.clickedItem.name.replace(/\u200C/g, "") ===
							sd.inputs.display.replace(/\u200C/g, "")
					) {
						this.focusItem(newChild);
						if (this.clickedItem.isSwitch) {
							this.focusItem(toggle);
						}
					}

					const close = newChild.querySelector(".close");
					if (close) {
						if (!this["button-remove"] || this["button-remove"] === "false") {
							close.classList.add("hidden");
						} else if (sd.permanent) {
							close.style.visibility = "hidden";
						} else {
							CIQ.UI.stxtap(close, removeStudy(sd));
						}
					}
					let edit = newChild.querySelector(".options");
					if (
						sd.permanent ||
						!sd.editFunction ||
						this["button-edit"] !== "true"
					) {
						if (edit) edit.classList.add("hidden");
						edit = newChild;
						label.setAttribute("role", "button");
					}
					// If there isn't an edit button, put the edit function on the parent so it responds to a keyboard navigation click
					CIQ.UI.stxtap(
						edit || newChild,
						isNativeMobile ? handleToggle(sd, stx) : editStudy(sd)
					);

					// Fixes an issue on mobile where the close study option has an unpredictable target area
					// if we don't assign a tap event to the surrounding elements
					if (CIQ.isMobile) {
						CIQ.UI.stxtap(newChild.querySelector(".swatch"), () => {});
						CIQ.UI.stxtap(newChild.querySelector("[label]"), () => {});
					}
				}

				this.setPanelLegendWidth();
			}
			//Only want to display the marker label if at least one study has been
			//rendered in the legend. If no studies are rendered, only the template tag
			//will be in there.
			if (typeof markerLabel != "undefined") {
				if (!this.root.querySelector(".marker-label")) {
					const label = document.createElement("span");
					label.className = "marker-label";
					CIQ.makeTranslatableElement(label, stx, markerLabel);

					const styles = this.root.querySelectorAll("link, style");
					this.root.insertBefore(
						label,
						styles.length
							? styles[styles.length - 1].nextSibling
							: this.root.firstChild
					);
				}
			}
			stx.translateUI(this);
			this.displayLegendTitle();
		}

		/**
		 * Legend title specified in the `marker-label` attribute will be displayed only if there are plots within the legend.
		 * It will also be translated into the selected language here.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		displayLegendTitle() {
			const notInTemplate = (el) => {
				while (el) {
					if (el.nodeName.toLowerCase() === "template") return false;
					el = el.parentElement;
				}
				return true;
			};
			const hasKeys = () => {
				// checks if key is not template as in frameworks such as React or Angular
				// templates may be rendered as regular node allowing to inner content queries
				return [
					...this.qsa(
						this["content-keys"] || "[label], [description]",
						this,
						true
					)
				].some(notInTemplate);
			};
			if (hasKeys()) {
				this.style.display = "";
				this.style.width = "";
			} else {
				this.style.display = "none";
				this.style.width = "0px";
			}

			if (this.context.stx.translateUI)
				this.context.stx.translateUI(this.node[0]);
		}

		/**
		 * Called for a registered component when the context is constructed.
		 * Sets the context property of the component.
		 *
		 * @param {CIQ.UI.Context} context The chart user interface context.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setContext(context) {
			if (!this.parentElement) return;
			const cloneToPanels = this["clone-to-panel"] !== undefined;
			if (cloneToPanels) {
				CIQ.UI.closestContextContainer(this).classList.add("stx-panel-legend");
				this.spawnPanelLegend();
				const cb = () => {
					if (this["clone-to-panel"] === undefined)
						context.stx.unappend("stackPanel", cb);
					else this.spawnPanelLegend();
				};
				context.stx.append("stackPanel", cb);
			}
			this.begin();
			this.changeContext(context);
		}

		/**
		 * Called for a registered component when the context is changed in a multichart environment.
		 *
		 * @param {CIQ.UI.Context} newContext The chart user interface context.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		changeContext(newContext) {
			if (!this.init) {
				// context change in multichart is executed prior setContext
				this.context = newContext;
				this.setContext(newContext);
				return;
			}
			this.eventListeners.forEach((listener) => {
				this.context.stx.removeEventListener(listener);
			});
			this.eventListeners = [
				newContext.stx.addEventListener("layout", this.renderLegend.bind(this)),
				newContext.stx.addEventListener("theme", this.renderLegend.bind(this))
			];
			this.resizeListener = this.setPanelLegendWidth.bind(this);
			window.addEventListener("resize", this.resizeListener);

			this.context = newContext;
			this.renderLegend();
		}

		/**
		 * Sets the legend width to synchronize with the placement of the panel controls.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setPanelLegendWidth() {
			if (!this.parentElement) return; // can happen if resizing whilst disconnected
			if (!this.parentElement.matches(".fixed-wrapper")) return;
			if (!CIQ.trulyVisible(this)) return;

			const panelControl = CIQ.climbUpDomTree(
					this,
					"div.stx-panel-control",
					true
				)[0],
				allButtons = panelControl.querySelectorAll(".stx-btn-panel");

			for (let button of allButtons) {
				button.style.marginLeft = "";
			}

			const firstBtn =
					panelControl.querySelector(".stx-btn-panel.stx-show") || null,
				firstBtnOffset = firstBtn ? firstBtn.offsetLeft : null,
				lastBtn = panelControl.lastChild || null,
				lastBtnOffset = lastBtn
					? lastBtn.offsetLeft + lastBtn.offsetWidth
					: null;

			const breakpointValue = this.channelRead("channel.breakpoint");
			if (breakpointValue === "break-sm") {
				firstBtn.style.marginLeft = "";
			} else {
				firstBtn.style.marginLeft =
					"-" + (lastBtnOffset - firstBtnOffset + 20) + "px";
			}
		}

		/**
		 * Creates a copy of this component on all panels, if the `clone-to-panels` attribute is set.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		spawnPanelLegend() {
			const { stx } = this.context;
			function tap(legend) {
				return function (e) {
					const clickedOn = e.currentTarget;
					if (clickedOn === this || clickedOn.matches("[label]"))
						legend.setActiveState();
				};
			}
			for (let p in stx.panels) {
				if (p == stx.chart.panel.name) continue;
				const legendHolder =
					stx.panels[p].subholder.querySelector(".stx-panel-legend");
				if (legendHolder) {
					let panelLegend = legendHolder.querySelector(this.nodeName);
					if (!panelLegend) {
						if (this.ownerDocument !== document) {
							const templ = document.createElement("template");
							templ.innerHTML = this.outerHTML;
							document.body.append(templ);
							panelLegend = CIQ.UI.makeFromTemplate(templ)[0];
							templ.remove();
						} else {
							panelLegend = this.cloneNode(true);
							panelLegend.innerHTML = this.root.innerHTML;
						}
						panelLegend.removeAttribute("clone-to-panel");
						panelLegend.removeAttribute("cq-marker");
						panelLegend.setAttribute("chart-legend", "");
						this.makeTap(panelLegend, tap(panelLegend));
						const mLabel = panelLegend.querySelector(".marker-label");
						if (mLabel) mLabel.remove();
						const fixedWrapper = document.createElement("div");
						fixedWrapper.className = "fixed-wrapper";
						fixedWrapper.appendChild(panelLegend);
						legendHolder.appendChild(fixedWrapper);
						panelLegend.begin();
					}
				}
			}
		}

		/**
		 * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
		 *
		 * @tsmember WebComponents.StudyLegend
		 */
		setMarkup() {
			const { children } = this.root;
			if (!children.length || this.usingMarkup) {
				this.usingMarkup = true;
				if (children.length) {
					[...children].forEach((child) => {
						if (!["LINK", "STYLE"].includes(child.tagName)) child.remove();
					});
				}
				let markup = this.markup || this.constructor.markup;
				const { filter } = this;
				const rMode = new RegExp("{{mode}}", "g");
				markup = markup
					.replace("{{heading}}", this.heading || "")
					.replace("{{heading_class}}", this.heading ? "" : "hidden")
					.replace("{{heading_style}}", this.heading ? "" : "margin: 0;")
					.replace("{{button_action}}", this["button-clear-all"] || "")
					.replace("{{button_class}}", this["button-clear-all"] ? "" : "hidden")
					.replace(
						rMode,
						(filter || "").split(",").includes("signal") ? "signal" : "study"
					);
				this.addDefaultMarkup(null, markup);
				const heading = this.root.querySelector("cq-heading");
				if (heading && this.matches(".template-item *"))
					heading.classList.add("dropdown");
			}
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
	 * | mode          | "signal" or "study", based on `filter` attribute |
	 * | heading       | from attribute value |
	 * | heading_class | "hidden" if `heading` attribute not specified |
	 * | heading_style | "margin: 0;" if `heading` attribute not specified |
	 * | button_class  | "hidden" if `button-clear-all` attribute not specified |
	 * | button_action | from `button-clear-all` attribute value |
	 *
	 * @static
	 * @type {String}
	 *
	 * @tsmember WebComponents.StudyLegend
	 */
	StudyLegend.markup = `
		<div section-dynamic>
			<h4 class="{{heading_class}}" style="{{heading_style}}">
				<cq-heading text="{{heading}}"></cq-heading>
			</h4>
			<div>
				<template cq-study-legend>
					<div class="item" role="group" keyboard-selectable>
						<span label></span>
						<span class="icon options" keyboard-selectable-child>
							<div class="ciq-screen-reader" role="button">Edit this {{mode}}</div>
						</span>
						<div class="icon close ciq-icon ciq-close" keyboard-selectable-child>
							<div class="ciq-screen-reader" role="button">Remove this {{mode}}</div>
						</div>
						<span class="ciq-switch hidden" role="button" keyboard-selectable-child aria-labelledby="xyz"></span>
						<span id="xyz" hidden>Toggle this plot</span>
						<div class="swatch"></div>
					</div>
				</template>
			</div>
			<cq-clickable cq-no-close role="button" class="clickable-item item ciq-btn sm {{button_class}}" stxtap="{{button_action}}" keyboard-selectable>
				<span>Clear All</span>
			</cq-clickable>
		</div>
	`;

	CIQ.UI.addComponentDefinition("cq-study-legend", StudyLegend);
}
