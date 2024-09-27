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
 * <h4>&lt;cq-studies&gt;</h4>
 *
 * This component builds a list of studies.  Clicking on a study in the list will activate it on the chart.
 * The list can be configured to not display certain studies, open the study dialog first, or allow editing as soon as the study is added.
 * Additionally, the component allows users to set favorite studies. Favorites are displayed at the top of the list.
 * The study list is alphabetized based on the language in which it is displayed.
 * Usually this component is nested within a menu or dropdown component, in order to manage the scrolling of the list.
 *
 * The results of this component can be filtered.  See {@link WebComponents.Heading} for details.
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | favorites | If present, favorited studies will be promoted to the top of the list. |
 *
 * Note: The favorites feature requires importing the Study Browser plugin.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when a study is selected.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "select" |
 * | action | "click" |
 * | value | _study name_ |
 *
 * A custom `toggle` event will be emitted from the component when a study is favorited/unfavorited.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect | "toggle" |
 * | action | "click" |
 * | favorite | _true/false_ |
 * | value | _study name_ |
 *
 * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
 * The default markup provided has accessibility features.
 *
 * @alias WebComponents.Studies
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 * @since
 * - 5.2.0
 * - 8.8.0 Added `cq-favorites` flag.
 * - 9.1.0 Observes attributes. Added emitter.. Changed `cq-favorites` flag to `favorites`.
 *
 */
class Studies extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["favorites"];
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
		CIQ.UI.flattenInheritance(this, Studies);
		this.constructor = Studies;
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.context) {
			CIQ.UI.unobserveProperty(
				"studyLibraryHash",
				this.context.stx.chart,
				this.listener
			);
			this.context.stx.removeEventListener("preferences", this.listener);
		}
		super.disconnectedCallback();
	}

	/**
	 * Processes attribute changes.  This is called whenever an observed attribute has changed.
	 *
	 * @param {string} name Attribute name
	 * @param {string} oldValue Original attribute value
	 * @param {string} newValue new Attribute value
	 *
	 * @tsmember WebComponents.Studies
	 */
	handlePropertyChange(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this[name] = newValue;
		this.updateOrder();
	}

	/**
	 * Initializes and displays the list of available studies.
	 *
	 * @param {object} [params] Parameters to control initialization of the studies list.
	 * @param {object} [params.excludedStudies] A map of study names that should be excluded from
	 * 		the studies list, for example: <code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>.
	 * @param {object|boolean} [params.alwaysDisplayDialog=false] If set to boolean true (not
	 * 		truthy), the study edit dialog box is automatically opened for any of the available
	 * 		studies after the study has been added to the chart. If set to boolean false, the
	 * 		study edit dialog box is not opened for any of the available studies after the study
	 * 		has been added to the chart.
	 * 		<p>If set to an object containing a map of study names and boolean values (for example,
	 * 		<code>{&nbsp;"ma":&nbsp;true,&nbsp;"AVWAP":&nbsp;true&nbsp;}</code>), the study edit
	 * 		dialog box is opened after the study has been added to the chart for studies in the
	 * 		map that have a boolean value of true but not for those that have a value of false or
	 * 		for any studies not included in the map.
	 * @param {object|boolean} [params.dialogBeforeAddingStudy=false] If set to boolean true (not
	 * 		truthy), the study edit dialog box is automatically opened for any of the available
	 * 		studies before the study is added to the chart. If set to boolean false, the study
	 * 		edit dialog box is not opened for any of the available studies before the study is
	 * 		added to the chart.
	 * 		<p>If set to an object containing a map of study names and boolean values (for example,
	 * 		<code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>), the study edit dialog box is opened
	 * 		before the study is added to the chart for studies in the map that have a boolean value
	 * 		of true but not for those that have a value of false or for any studies not included
	 * 		in the map.
	 *
	 * @since 5.2.0 The `CIQ.UI.StudyMenu` helper has been deprecated. Please call
	 * 		`document.querySelector("cq-studies").initialize()` now.
	 *
	 * @example
	 * let params = {
	 *     excludedStudies: { "macd": true },  // Exclude studies from the list of available studies.
	 *     alwaysDisplayDialog: { "ma": true },  // Show the study preferences dialog after adding studies.
	 *     dialogBeforeAddingStudy: { "rsi": true }  // Show the study preferences dialog before adding studies.
	 * };
	 * document.querySelectorAll("cq-studies").forEach(function(i) {
	 *     i.initialize(params);
	 * });
	 *
	 * @tsmember WebComponents.Studies
	 */
	initialize(params) {
		this.params = params || {};
		this.alwaysDisplayDialog = this.params.alwaysDisplayDialog || false;
		this.excludedStudies = this.params.excludedStudies || [];
		this.renderMenu(this.context.stx);
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.Studies
	 */
	setContext(context) {
		const { config, stx } = context;
		this.addDefaultMarkup();
		if (config) {
			this.initialize(Object.assign({}, config.menuStudiesConfig));
		}
		const listener = () => this.renderMenu(stx);
		CIQ.UI.observeProperty("studyLibraryHash", this.context.chart, listener);
		stx.addEventListener("preferences", listener);
	}

	/**
	 * Creates a Study menu.
	 *
	 * You have the option of creating a hardcoded HTML menu and just using {@link CIQ.Studies}
	 * for processing `stxtap` attributes, or you can call this method to automatically generate
	 * the menu.
	 *
	 * @param  {CIQ.ChartEngine} stx The chart object
	 *
	 * @tsmember WebComponents.Studies
	 *
	 * @since 8.8.0 Added `stx` parameter.
	 */
	renderMenu(stx) {
		if (!CIQ.Studies) return;
		let alphabetized = [];
		let sd;

		for (let field in CIQ.Studies.studyLibrary) {
			sd = CIQ.Studies.studyLibrary[field];
			if (
				!sd ||
				this.excludedStudies[field] ||
				this.excludedStudies[sd.name] ||
				sd.siqList !== undefined
			)
				continue; // siqList = ScriptIQ entry
			if (!sd.name) sd.name = field; // Make sure there's always a name
			alphabetized.push([field, stx.translateIf(sd.name)]);
		}
		alphabetized.sort(function (lhs, rhs) {
			return lhs[1].localeCompare(rhs[1], stx.locale || "en", {
				sensitivity: "base",
				caseFirst: "upper"
			});
		});
		const tapFn = (studyName) => {
			return (e) => {
				const doc = this.document || document;
				if (e.ciqStamp && e.ciqStamp <= doc.lastTap) {
					e.stopPropagation();
					return;
				}
				const isInfoButton = e.target.classList.contains("ciq-info-btn");

				if (isInfoButton) {
					if (this.showStudyInfo) {
						this.showStudyInfo(studyName);
					}
					e.stopPropagation();
					return;
				}
				pickStudy(e, studyName);
				this.dispatchEvent(new Event("resize", { composed: true }));
			};
		};

		const { root } = this;
		let item;
		while ((item = root.querySelector(".item, cq-item"))) {
			item.remove();
		}

		const addFavorites =
			CIQ.Studies.Favorites && this.hasAttribute("favorites");

		alphabetized.forEach((study) => {
			const menuItem = CIQ.UI.makeFromTemplate(
				root.querySelector("template")
			)[0];
			sd = CIQ.Studies.studyLibrary[study[0]];

			const spanEl = menuItem.querySelector("span");
			spanEl.id = spanEl.id + sd.name.replace(/ /g, "");
			CIQ.makeTranslatableElement(spanEl || menuItem, stx, sd.name);
			menuItem.type = study[0];
			const favElement = menuItem.querySelector(".fav-marker");
			if (favElement) {
				if (addFavorites) {
					this.makeTap(favElement, getFavoriteHandler.call(this, sd, stx));
					menuItem.setAttribute("aria-labelledby", spanEl.id);
				} else {
					favElement.remove();
				}
			}

			this.makeTap(menuItem, tapFn(study[0]));
			const infoBtn = menuItem.querySelector(".ciq-info-btn");
			if (infoBtn && (!CIQ.Studies.Info || !CIQ.Studies.Info[sd.name])) {
				infoBtn.style.display = "none";
			}

			root.appendChild(menuItem);
		});
		if (addFavorites) {
			this.updateOrder();
		}

		const studyDialog = (params, addWhenDone) => {
			const { context } = this;

			if (context.config) {
				this.channelWrite(
					context.config.channels.dialog,
					{
						type: "study",
						params: Object.assign({}, params, { context, addWhenDone })
					},
					context.stx
				);
			} else {
				// legacy use when config is not available
				params.context = this.context;
				const dialog = this.ownerDocument.querySelector("cq-study-dialog");
				dialog.addWhenDone = addWhenDone;
				dialog.open(params);
			}
		};

		const pickStudy = (e, studyName) => {
			const {
				alwaysDisplayDialog = {},
				context: { stx }
			} = this;

			function handleSpecialCase(flag, params, addWhenDone) {
				if (flag === true) {
					studyDialog(params, addWhenDone);
					return true;
				} else if (typeof flag === "object") {
					for (let i in flag) {
						if (i == studyName && flag[i]) {
							studyDialog(params, addWhenDone);
							return true;
						}
					}
				}
			}

			this.emitCustomEvent({
				effect: "select",
				detail: { value: studyName }
			});

			if (
				handleSpecialCase(
					this.params.dialogBeforeAddingStudy,
					{ stx, name: studyName },
					true
				)
			) {
				return;
			}

			const studyParams = alwaysDisplayDialog[studyName]
				? { interactiveAdd: false } // interactiveAdd and dialog are not compatible
				: null;
			const sd = CIQ.Studies.addStudy(stx, studyName, null, null, studyParams);

			if (
				!e.target.classList.contains("ciq-favorite") &&
				!e.target.parentElement.classList.contains("ciq-favorite")
			)
				this.uiManager.closeMenu();
			if (
				!sd.parameters.interactiveAdd &&
				!handleSpecialCase(alwaysDisplayDialog, { sd, stx })
			)
				e.stopPropagation();
		};

		function getFavoriteHandler(sd, stx) {
			return (e) => {
				e.stopPropagation();
				const item = e.target.parentElement;
				const isFavorite = item.classList.contains("ciq-favorite");

				item.classList.add(isFavorite ? "ciq-move-down" : "ciq-move-up");

				this.emitCustomEvent({
					effect: "toggle",
					detail: { favorite: isFavorite, value: sd.name }
				});

				setTimeout(() => {
					item.classList[isFavorite ? "remove" : "add"]("ciq-favorite");
					if (CIQ.Studies.Favorites)
						CIQ.Studies.Favorites[isFavorite ? "remove" : "add"](sd.name);
					this.updateOrder();
				}, 200);
			};
		}
	}

	/**
	 * Reorders the study menu.  Order is alphabetical.  The menu is reordered when the language is changed.
	 * If there are favorites, and the Study Browser is imported, the favorited studies are sorted alphabetically
	 * on the top of the list.
	 *
	 * @tsmember WebComponents.Studies
	 */
	updateOrder() {
		if (!this.context) return;
		const { stx } = this.context;
		if (!CIQ.Studies.Favorites) return;
		CIQ.Studies.Favorites.retrieveList(stx, (favoriteList) => {
			const addFavorites = this.hasAttribute("favorites");
			const list = Array.from(this.root.querySelectorAll(".item, cq-item"));
			const favorites = favoriteList
				.filter(({ isCustomized }) => !isCustomized)
				.reduce((acc, { type }) => ({ ...acc, [type]: true }), {});

			const sortFunction = (
				{ textContent: textA, type: typeA },
				{ textContent: textB, type: typeB }
			) => {
				if (addFavorites) {
					if (favorites[typeA] && !favorites[typeB]) return -1;
					if (!favorites[typeA] && favorites[typeB]) return 1;
				}
				return textA.localeCompare(textB, stx.locale || "en", {
					sensitivity: "base",
					caseFirst: "upper"
				});
			};

			list.sort(sortFunction).forEach((item) => {
				item.classList[favorites[item.type] ? "add" : "remove"]("ciq-favorite");
				item.classList.remove("ciq-move-up");
				item.classList.remove("ciq-move-down");
				this.root.append(item);
			});
		});
	}
}

/**
 * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
 *
 * @static
 * @type {String}
 *
 * @tsmember WebComponents.Studies
 */
Studies.markup = `
		<template>
			<li class="item" role="group" tabindex="0" keyboard-selectable>
				<div class="fav-marker" role="menuitemcheckbox" keyboard-selectable-child>
					<div class="ciq-screen-reader">Toggle favorite</div>
				</div>
				<span id="study_" role=menuitem label></span>
			</li>
		</template>
	`;
CIQ.UI.addComponentDefinition("cq-studies", Studies);
