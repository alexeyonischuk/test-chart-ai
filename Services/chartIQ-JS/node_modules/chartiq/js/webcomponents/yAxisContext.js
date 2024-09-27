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
import "../../js/webcomponents/dialog.js";


/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * @classdesc
 *
 * This is a custom HtmlElement (Web Component).  The tag name is the following:
 *
 * <h4>&lt;cq-yaxis-context&gt;</h4>
 *
 * This component appears when a yaxis is right-clicked.  A menu of actions are displayed relevant to that yaxis.
 *
 * _**Emitters**_
 *
 * A custom event will be emitted by the component when an action is clicked from the displayed menu.
 * See {@link CIQ.UI.BaseComponent#emitCustomEvent} for details on how to listen for this event.
 * The details of the event contain the following:
 * | property | value |
 * | :------- | :---- |
 * | emitter | this component |
 * | cause | "useraction" |
 * | effect |  "edit", "remove", "favorite", or other custom action |
 * | action | "click" |
 * | item | _object on which the action occurs, usually a yaxis descriptor_ |
 *
 * This component comes with a default markup that is utilized when the component tag is added to the DOM without any other markup.
 * The default markup provided includes accessibility features.
 *
 * @alias WebComponents.YAxisContext
 * @extends CIQ.UI.DialogContentTag
 * @since 9.3.0
 */
class YAxisContext extends CIQ.UI.DialogContentTag {
	adoptedCallback() {
		super.adoptedCallback();
		CIQ.UI.flattenInheritance(this, YAxisContext);
		this.constructor = YAxisContext;
	}

	/**
	 * Called for a registered component when the context is constructed.
	 * Sets the context property of the component.
	 *
	 * @param {CIQ.UI.Context} context The chart user interface context.
	 *
	 * @tsmember WebComponents.YAxisContext
	 */
	setContext(context) {
		const { stx } = context,
			{ currentYAxis } = stx,
			panel = findPanelByYAxis(stx, currentYAxis),
			// Give some tolerance in case there is few 1px wide y-axes on left such as Bollinger b
			isRHS = Math.abs(panel.right - currentYAxis.left) < 3,
			isLHS = panel.left === currentYAxis.left + currentYAxis.width,
			hasAdjacentLeftAxis = getAdjacentYAxis(currentYAxis, panel, "left"),
			hasAdjacentRightAxis = getAdjacentYAxis(currentYAxis, panel, "right"),
			studies = stx.currentYAxis.studies.filter((name) => {
				const study = stx.overlays[name];
				return !study.underlay;
			}),
			hasMerged = currentYAxis.renderers.length + studies.length >= 2;

		let menuItems = "";
		menuItems += hasAdjacentLeftAxis || isRHS ? this.menuItems.moveLeft : ``;
		menuItems += hasAdjacentRightAxis || isLHS ? this.menuItems.moveRight : ``;
		menuItems += hasAdjacentLeftAxis ? this.menuItems.mergeLeft : ``;
		menuItems += hasAdjacentRightAxis ? this.menuItems.mergeRight : ``;
		menuItems += hasMerged ? this.menuItems.unmerge : ``;

		this.innerHTML = menuItems;
		CIQ.UI.BaseComponent.buildReverseBindings(this);

		this.classList.add("ciq-context-menu");

		super.setContext(context);
	}

	/**
	 * Called after an stxtap event is fired.
	 * Emits the event for the action performed.
	 *
	 * @param {string} effect What action was performed as a result of the stxtap event.
	 * @param {Object} item Object being effected by the action.
	 *
	 * @tsmember WebComponents.YAxisContext
	 */
	postProcess(effect, item) {
		this.emitCustomEvent({
			effect,
			detail: { item }
		});
	}

	updateYAxis(menuEvent, type, direction) {
		if (type === "unmerge") {
			unmergeYAxis(this.context.stx);
		} else {
			moveYAxis(this.context.stx, type, direction);
		}

		this.close();
	}
}

YAxisContext.prototype.menuItems = {
	moveLeft: `<div stxtap="updateYAxis('move', 'left')" keyboard-selectable="true">Move Left</div>`,
	moveRight: `<div stxtap="updateYAxis('move', 'right')" keyboard-selectable="true">Move Right</div>`,
	mergeLeft: `<div stxtap="updateYAxis('merge', 'left')" keyboard-selectable="true">Merge Left</div>`,
	mergeRight: `<div stxtap="updateYAxis('merge', 'right')" keyboard-selectable="true">Merge Right</div>`,
	unmerge: `<div stxtap="updateYAxis('unmerge')" keyboard-selectable="true">Unmerge</div>`
};

function getAxisTargetPosition(type, direction, panel, targetYAxis) {
	if (!targetYAxis) {
		if (direction === "right") {
			return panel.right;
		}

		return panel.left;
	}

	if (type === "merge") {
		return targetYAxis.left + targetYAxis.width / 2;
	}

	if (direction === "right") {
		return targetYAxis.left + targetYAxis.width;
	}

	return targetYAxis.left;
}
function unmergeYAxis(stx, type, direction) {
	const { currentYAxis } = stx,
		panel = findPanelByYAxis(stx, currentYAxis),
		dragTarget = (draggable) => {
			panel.subholder.classList.add("dropzone");
			panel.subholder.classList.add(
				currentYAxis.left > panel.left ? "right" : "left"
			);

			stx.grabbingScreen = false;
			stx.highlightedDraggable = draggable;
			stx.grabStartPanel = panel;

			stx.dragPlotOrAxis(
				currentYAxis.left - 1,
				panel.bottom - panel.height / 2
			);
		};

	currentYAxis.renderers.forEach((seriesName) => {
		if (seriesName !== stx.mainSeriesRenderer.params.name) {
			dragTarget(stx.chart.seriesRenderers[seriesName]);
		}
	});

	currentYAxis.studies.forEach((studyName) => {
		dragTarget(stx.layout.studies[studyName]);
	});
}

function moveYAxis(stx, type, direction) {
	const { currentYAxis } = stx,
		panel = findPanelByYAxis(stx, currentYAxis),
		targetYAxis = getAdjacentYAxis(currentYAxis, panel, direction),
		yPosition = panel.top + (panel.bottom - panel.top) / 2,
		targetAxisPosition = getAxisTargetPosition(
			type,
			direction,
			panel,
			targetYAxis
		);

	currentYAxis.showMenuToggle(false);

	stx.mousemoveinner(stx.left + currentYAxis.left, stx.top + yPosition);

	stx.grabbingScreen = true;
	stx.highlightedDraggable = currentYAxis;
	stx.grabStartPanel = panel;

	stx.mousemoveinner(stx.left + targetAxisPosition, stx.top + yPosition);
	stx.mouseup({
		clientX: stx.left + targetAxisPosition,
		clientY: stx.top + yPosition
	});
}

function findPanelByYAxis(stx, sourceYAxis) {
	return Object.values(stx.panels).find((panel) =>
		panel.yaxisLHS
			.concat(panel.yaxisRHS)
			.some((targetYAxis) => stx.yaxisMatches(sourceYAxis, targetYAxis))
	);
}

function getAdjacentYAxis(sourceAxis, panel, direction) {
	const sourceAxisLeft = sourceAxis.left,
		sourceAxisRight = sourceAxis.left + sourceAxis.width,
		sourceAxisTop = sourceAxis.top;

	return panel.yaxisLHS
		.concat(panel.yaxisRHS)
		.filter((targetAxis) => targetAxis !== sourceAxis)
		.find((targetAxis) => {
			const targetAxisLeft = targetAxis.left,
				targetAxisRight = targetAxisLeft + targetAxis.width;

			if (sourceAxisTop !== targetAxis.top || targetAxis.width < 2) {
				return false;
			}

			if (direction === "left") {
				return sourceAxisLeft === targetAxisRight;
			}

			return sourceAxisRight === targetAxisLeft;
		});
}

CIQ.UI.addComponentDefinition("cq-yaxis-context", YAxisContext);
