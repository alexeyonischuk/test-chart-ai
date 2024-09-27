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


import { CIQ } from "../../js/components.js";
import "./studyfavorites.js";

const cssReady = new Promise((resolve) => {
	if (import.meta.webpack) {
		// webpack 5
		import(/* webpackMode: "eager" */ "./studybrowser.css").then(resolve);
	} else if (typeof define === "function" && define.amd) {
		define(["./studybrowser.css"], resolve);
	} else if (typeof window !== "undefined") {
		// no webpack
		CIQ.loadStylesheet(
			new URL("./studybrowser.css", import.meta.url).href,
			resolve
		);
	} else resolve();
}).then((m) => CIQ.addInternalStylesheet(m, "studybrowser")); // a framework, such as Angular, may require style addition

/**
 *  @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-study-browser&gt;</h4>
 *
 * Study Browser component provides user interface for categorized and filterable list of studies,
 * as well as list of favorites and active studies
 *
 * _**Attributes**_
 *
 * This component observes the following attributes and will change behavior if these attributes are modified:
 * | attribute | description |
 * | :-------- | :---------- |
 * | filter | Reflect and update selection in the left hand panel |
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
 * | effect | "filter"|
 * | action | "click" |
 * | category | _Filter name_ |
 *
 * @alias WebComponents.StudyBrowser
 * @extends CIQ.UI.ContextTag
 * @class
 * @protected
 *
 * @since
 * - 8.8.0
 * - 9.1.0 Observes attributes. Added emitter.
 */
class StudyBrowser extends CIQ.UI.ContextTag {
	static get observedAttributes() {
		return ["filter"];
	}

	constructor() {
		super();
		this.interactiveStudies = {
			"Anchored VWAP": true
		};
	}

	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, StudyBrowser);
		this.constructor = StudyBrowser;
	}

	setContext() {
		if (this.init) return;
		this.addDefaultMarkup();

		this.getStudies();
		this.setupInfoPanel();

		// decorate the containing menu show to detect open action
		const parentMenu = this.closest("cq-menu");
		this.parentMenu = parentMenu;
		if (parentMenu && parentMenu.show) {
			const { show } = parentMenu;
			parentMenu.show = (...args) => {
				show.apply(parentMenu, args);
				if (this.isConnected) this.open();
				else parentMenu.show = show;
			};
		}

		if (parentMenu && parentMenu.hide) {
			const { hide } = parentMenu;
			parentMenu.hide = (...args) => {
				hide.apply(parentMenu, args);
				if (this.isConnected) this.hide();
				else parentMenu.hide = hide;
			};
		}

		this.responsiveSetup();
		this.init = true;
		this.filterCategory("Study Library");
	}

	changeContext(newContext) {
		this.context = newContext;

		if (!this.innerHTML) {
			setTimeout(() => {
				this.changeContext(newContext);
			});
			return;
		}

		this.querySelector("cq-study-legend").context = newContext;
		this.querySelector("cq-studies").context = newContext;
		this.setupActiveStudyCountListener();
	}

	open() {
		this.filterCategory(this.currentFilter, true);
		this.context.topNode.classList.add("ciq-sb-active");
		const focusEl = this.querySelector(".ciq-sb-studies");
		focusEl.tabIndex = -1;
		focusEl.focus();
	}

	hide() {
		this.context.topNode.classList.remove("ciq-sb-active");
		if (this.parentMenu) {
			if (this.parentMenu.tabIndex === undefined) this.parentMenu.tabIndex = -1;
			this.parentMenu.focus();
		}
	}

	getStudies() {
		const { stx } = this.context;

		this.categories = CIQ.Studies.Categories;
		const categoryContainer = this.querySelector(
			".ciq-sb-categories cq-scroll"
		);
		const subCategories = Object.keys(this.categories);
		if (CIQ.Scripting) {
			subCategories.push("ScriptIQ");
		}

		categoryContainer.insertAdjacentHTML(
			"beforeend",
			`<cq-separator></cq-separator>
					<cq-heading role="heading">Categories</cq-heading>`
		);

		subCategories
			.sort()
			.filter((cat) => cat !== "Popular")
			.forEach((cat) => {
				categoryContainer.insertAdjacentHTML(
					"beforeend",
					`<cq-item cq-no-close cq-filter="${cat}" role="menuitemcheckbox" aria-checked="false">${cat}</cq-item>`
				);
			});

		this.makeTap(this.querySelector(".ciq-sb-categories"), (e) => {
			const { target } = e;
			const filter = target.getAttribute("cq-filter");
			if (filter) {
				this.filterCategory(filter);
				e.stopPropagation();
			}
		});

		const favoriteContainer = this.querySelector("div[ciq-favorite-studies]");
		CIQ.safeClickTouch(
			favoriteContainer,
			(e) => {
				const { target } = e;
				const isFavorite = target.classList.contains("fav-marker");
				const el = target.closest("cq-item");
				if (!el) return;
				const name = el.getAttribute("ciq-name");

				if (!isFavorite && this.interactiveStudies[name]) {
					CIQ.UI.getUIManager(this).closeTopMenu();
				}
				if (isFavorite) {
					CIQ.Studies.Favorites.remove(name);
					this.updateFavoriteList();
				} else {
					const { type, inputs, outputs, parameters } =
						CIQ.Studies.Favorites.getList().find(
							({ name: sName }) => sName === name
						);
					CIQ.Studies.addStudy(
						this.context.stx,
						type,
						inputs
							? { ...inputs, display: undefined, id: undefined }
							: undefined,
						outputs,
						parameters
					);
				}
			},
			{ absorbDownEvent: false }
		);

		this.studyCountEl = this.querySelector(".ciq-active-study-count");
		this.setupActiveStudyCountListener();

		CIQ.Studies.Favorites.retrieveList(stx, (list) => {});
	}

	setupActiveStudyCountListener() {
		if (!this.layoutListener) {
			this.layoutListener = (stx) => {
				if (!this.studyCountEl) return;
				CIQ.makeTranslatableElement(
					this.studyCountEl,
					stx,
					Object.values(stx.layout.studies || {}).filter(
						({ signalData }) => !signalData
					).length
				);
			};
		}

		if (this.layoutListenerSetup) {
			const { stx, listener } = this.layoutListenerSetup;
			stx.removeEventListener(listener);
		}

		const { stx } = this.context;
		const listener = stx.addEventListener("layout", this.layoutListener);
		this.layoutListener(stx);
		this.layoutListenerSetup = {
			stx,
			listener
		};
	}

	filterCategory(filterName, force) {
		if (!force && (this.currentFilter === filterName || !this.init)) return;

		this.hideStudyInfo();
		this.currentFilter = filterName;
		const studies = this.categories[filterName];
		const allStudies = filterName === "Study Library";
		const filters = this.querySelectorAll(".ciq-sb-categories cq-item");
		filters.forEach((item) => {
			const action =
				item.getAttribute("cq-filter") === filterName
					? "setAttribute"
					: "removeAttribute";
			item[action]("cq-active-category", "");
			item.setAttribute("aria-checked", action === "setAttribute");
		});

		if (studies || allStudies) {
			this.querySelectorAll("cq-studies cq-item span").forEach((study) => {
				const name =
					study.getAttribute("cq-translate-original") || study.textContent;
				study.parentElement.style.display =
					allStudies || studies.includes(name) ? "" : "none";
			});
			const filter = this.querySelector("cq-heading input");
			if (!allStudies) {
				filter.value = "";
				filter.dispatchEvent(new Event("input"));
			}
			this.querySelector(
				"cq-heading[filter-for], cq-heading[cq-filter]"
			).style.display = allStudies ? "" : "none";
			this.selectType("all");
			this.querySelector("cq-studies").updateOrder();
		} else if (filterName === "Active Studies") {
			this.selectType("active");
		} else if (filterName === "ScriptIQ") {
			this.selectType("scriptiq");
		} else {
			this.selectType("favorites");
			this.updateFavoriteList();
		}

		this.setAttribute("filter", filterName);
		this.emitCustomEvent({
			effect: "filter",
			detail: { category: filterName }
		});
	}

	attributeChangedCallback(name, oldVal, newVal) {
		this.filterCategory(newVal);
	}

	selectType(type) {
		if (type === undefined) type = this.getAttribute("ciq-study-type") || "all";
		const types = this.querySelector(".ciq-sb-studies").children;
		["all", "active", "favorites", "scriptiq"].forEach((name, i) => {
			const selected = type === name;
			types[i].style.display = selected ? "" : "none";
			if (selected && types[i].querySelector("cq-scroll").refresh) {
				types[i].querySelector("cq-scroll").refresh();
			}
		});
		this.setAttribute("ciq-study-type", type);
	}

	updateFavoriteList() {
		const { stx } = this.context;
		const container = this.querySelector("div[ciq-favorite-studies]");
		const sortFn = function ({ name: a }, { name: b }) {
			// return a.localeCompare(b);
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		};
		CIQ.Studies.Favorites.retrieveList(this.context.stx, (favoriteList) => {
			const items = [...favoriteList].sort(sortFn).map((item) => {
				const { studyName, name } = item;
				const translatedName =
					(studyName &&
						name.replace(/[^(]*/, stx.translateIf(studyName) + " ")) ||
					stx.translateIf(name);
				return `
					<cq-item class="ciq-favorite" ciq-name="${item.name}" role="menuitem" aria-label="${translatedName}">
						<cq-label role="button" aria-label="Add study">${translatedName}</cq-label>
						<div class="fav-marker" role="button" aria-label="Remove study from favorites"></div>
					</cq-item>`;
			});
			container.innerHTML = items.join("\n");
		});
	}

	setupInfoPanel() {
		const studiesContainer = this.querySelector("cq-studies");
		studiesContainer.showStudyInfo = this.showStudyInfo.bind(this);

		this.makeTap(this.querySelector(".ciq-info-panel"), (e) => {
			const addingStudy = e.target.matches(".ciq-btn");
			if (!(addingStudy && this.interactiveStudies[this.infoPanelStudy.name])) {
				e.stopPropagation();
			}
		});

		this.makeTap(this.querySelector(".ciq-info-panel-back-btn"), (e) => {
			this.hideStudyInfo();
		});

		this.makeTap(this.querySelector(".ciq-info-panel .fav-marker"), (e) => {
			const el = e.target;
			el.classList.toggle("ciq-favorite");
			if (el.classList.contains("ciq-favorite")) {
				CIQ.Studies.Favorites.add(this.infoPanelStudy.name);
			} else {
				CIQ.Studies.Favorites.remove(this.infoPanelStudy.name);
			}
			this.updateFavoriteList();
			this.querySelector("cq-studies").updateOrder();
		});

		this.makeTap(
			this.querySelector(".ciq-info-panel-controls .ciq-btn"),
			(e) => {
				this.addStudy(this.infoPanelStudy.type);
				this.hideStudyInfo();
			}
		);
	}

	showStudyInfo(studyType) {
		const panel = this.querySelector(".ciq-info-panel");
		panel.classList[studyType ? "add" : "remove"]("ciq-info-panel-active");
		panel.setAttribute("aria-hidden", !studyType);
		this.querySelector("[ciq-sb-panel-all]").setAttribute(
			"aria-hidden",
			!!studyType
		);

		if (!studyType) return;

		const [, { name: studyName }] =
			Object.entries(CIQ.Studies.studyLibrary).find(([key, { name }]) => {
				return key === studyType;
			}) || [];
		this.infoPanelStudy = { type: studyType, name: studyName };

		const isFavorite = CIQ.Studies.Favorites.includes(studyName);
		const { description, link } = (CIQ.Studies.Info || {})[studyName] || {};

		const titleEl = this.querySelector(".ciq-info-panel-title");
		const favEl = this.querySelector(".ciq-info-panel .fav-marker");
		const descriptionEl = this.querySelector(".ciq-info-panel-description");
		const linkEl = this.querySelector(".ciq-info-panel a");

		titleEl.textContent = studyName;
		favEl.classList.toggle("ciq-favorite", !!isFavorite);
		descriptionEl.innerHTML =
			"<p>" + (description || "").replace(/\n|\r/g, "</p><p>") + "</p>";
		linkEl.style.display = link ? "" : "none";
		linkEl.href = link;

		const backButton = this.qs(".ciq-info-panel-back-btn");
		if (backButton) {
			backButton.tabIndex = -1;
			backButton.focus();
		}
	}

	hideStudyInfo() {
		this.showStudyInfo(false);
	}

	addStudy(type) {
		const { stx } = this.context;

		CIQ.Studies.addStudy(stx, type);
	}

	deprecatedTemplate() {
		return `<template cq-study-legend="">
			<cq-item>
				<cq-label></cq-label>
				<div class="ciq-icon ciq-close"></div>
			</cq-item>
		</template>`;
	}

	responsiveSetup() {
		const {
			config: { channels },
			stx
		} = this.context;
		const contextEl = this.closest("cq-context");

		const dropDownEl = contextEl.querySelector(
			"cq-menu[config='studybrowser'] cq-dropdown li, cq-menu.ciq-study-browser cq-menu-dropdown"
		);

		if (dropDownEl.tagName === "CQ-MENU-DROPDOWN") {
			const template = this.querySelector("template[cq-study-legend]");
			template.insertAdjacentHTML("afterEnd", this.deprecatedTemplate());
			template.remove();
			const heading = this.querySelector("cq-heading.dropdown");
			heading.insertAdjacentHTML(
				"afterEnd",
				`<cq-heading cq-search-icon cq-filter="Search Studies" cq-filter-min="15"></cq-heading>`
			);
			heading.remove();
			const studies = this.querySelector("cq-studies");
			if (studies.hasAttribute("favorites"))
				studies.setAttribute("ciq-favorites", "");
		}

		if (contextEl.querySelector(".ciq-multi-chart-container-wrapper")) {
			this.multiChartContainer = contextEl;

			CIQ.UI.addResizeListener(contextEl, () => {
				Object.assign(
					dropDownEl.style,
					contextEl.clientWidth < 600
						? { right: "-88px", width: contextEl.clientWidth + "px" }
						: { right: 0, width: "" }
				);
			});

			return;
		}
		const chartAreaEl = contextEl.querySelector(
			".ciq-multi-chart-container-wrapper, .ciq-chart-area"
		);
		/*
		const relocateStudyBrowser = (size) => {
			if (!/break-sm|break-md|break-lg/.test(size)) return;
			const containerEl = size === "break-sm" ? chartAreaEl : dropDownEl;
			if (!containerEl.contains(this)) {
				const all = this.querySelectorAll("*");
				all.forEach((el) => {
					if (el.disconnectedCallback) el.doNotDisconnect = true;
				});
				containerEl.append(this);
				all.forEach((el) => {
					if (el.doNotDisconnect) delete el.doNotDisconnect;
				});
			}
		};

		CIQ.UI.BaseComponent.prototype.channelSubscribe(
			channels.breakpoint,
			relocateStudyBrowser,
			stx
		);
*/
	}

	disconnectedCallback() {
		if (this.doNotDisconnect) return;
		if (this.multiChartContainer) {
			CIQ.UI.removeResizeListener(this.multiChartContainer);
		}
		super.disconnectedCallback();
	}
}

StudyBrowser.markup = `
		<div class="ciq-sb-container" role="dialog" aria-label="Study Browser">
			<div class="ciq-sb-categories" role="group" aria-label="Selectable study categories"> 
				<cq-scroll cq-max-height="500">
					<cq-heading role="heading">Studies</cq-heading>
					<cq-item cq-no-close cq-filter="Active Studies" role="menuitemcheckbox" aria-checked="false">
						<div class="ciq-active-studies"></div>Active Studies<div class="ciq-active-study-count">0</div></cq-item>
					<cq-item cq-no-close class="ciq-favorite" cq-filter="Favorites" role="menuitemcheckbox"  aria-checked="false">
						<div class="ciq-favorite-studies"></div>Favorites</cq-item>
					<cq-item cq-no-close cq-filter="Popular" role="menuitemcheckbox" aria-checked="false">
						<div class="ciq-popular-studies"></div>Most Popular</cq-item>
					<cq-item cq-no-close cq-filter="Study Library" role="menuitemcheckbox" aria-checked="false">
						<div class="ciq-study-library"></div>Study Library</cq-item>
				</cq-scroll>
			</div>
			<div class="ciq-sb-studies" role="group" aria-label="Selectable studies">
				<div ciq-sb-panel-all>
					<cq-heading class="dropdown" icon="ciq-lookup-icon" filter-label="Search Studies" filter-for="studylist" filter-min="15"></cq-heading>
					<cq-scroll cq-max-height="450">
						<cq-studies filter-name="studylist" ciq-favorites favorites>
						<template>
							<cq-item role="group" tabindex="0">
							<span role="button"></span>
							<div class="fav-marker" role="button" aria-label="Favorite"></div>
							<div class="ciq-info-btn" role="button" aria-label="Info"></div>
							</cq-item>
						</template>
						</cq-studies>
					</cq-scroll>
				</div>
				<div ciq-sb-panel-active>
					<cq-scroll cq-max-height="500">
						<cq-study-legend button-remove="true">
							<cq-section-dynamic>
								<cq-study-legend-content>
									<template cq-study-legend="">
										<cq-item>
											<span label></span>
											<div class="close ciq-icon ciq-close"></div>
											<span class="ciq-switch"></span>
										</cq-item>
									</template>
								</cq-study-legend-content>
							</cq-section-dynamic>
							<cq-placeholder>
								<div stxtap="Layout.clearStudies()" class="ciq-btn sm" keyboard-selectable="true" role="button">Clear All</div>
							</cq-placeholder>
						</cq-study-legend>
						</cq-scroll>
				</div>
				<div ciq-sb-panel-favorite>
					<cq-scroll cq-max-height="500">
						<div ciq-favorite-studies cq-no-close=""></div>
					</cq-scroll>
				</div>
				<div ciq-sb-panel-scriptiq>
					<cq-scroll cq-max-height="500">
						<cq-item><cq-clickable selector="cq-scriptiq-editor" method="open">New Script</cq-clickable></cq-item>
						<cq-scriptiq-menu></cq-scriptiq-menu>
					</cq-scroll>
				</div>
				<div class="ciq-info-panel" aria-hidden="true" role="dialog" aria-label="Study info panel">
					<cq-scroll cq-max-height="500">
						<div class="ciq-info-panel-back-btn" role="button" aria-label="Close"></div>
						<div class="ciq-info-panel-title" role="heading"></div>
						<div class="fav-marker" title="Click to add to favorites" role="button"></div>
						<div class="ciq-info-panel-description"></div>
						<div class="ciq-info-panel-controls">
							<div class="ciq-btn sm" role="button">ADD STUDY</div>
							<a href="" target="studyInfo" role="button"><div class="ciq-info-btn"></div> Learn more about this study</a>
						</div>
					</cq-scroll>
				</div>
			</div>
		</div>
	`;
CIQ.UI.addComponentDefinition("cq-study-browser", StudyBrowser);
