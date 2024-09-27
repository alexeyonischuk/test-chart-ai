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


import { CIQ as _CIQ } from "../../../js/chartiq.js";
import "../../../js/standard/studies.js";


let __js_advanced_studies_volumeProfile_ = (_exports) => {

/* global _CIQ, _timezoneJS, _SplinePlotter */


const CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

if (!CIQ.Studies) {
	console.error(
		"volumeProfile feature requires first activating studies feature."
	);
} else {
	/**
	 * Creates a volume profile underlay for the chart. The underlay is always 25% of the width of the chart.
	 * The color is determined by the 'sd.outputs["Bars Color"]' parameter and opacity and border colors can be controlled with the class stx_volume_profile
	 * NOTE: Volume Profile will only display on the chart panel sharing the yAxis.
	 */

	CIQ.Studies.displayVolumeProfile = function (stx, sd, quotes) {
		if (!stx || !stx.chart.dataSet) return;
		const cssSelector = "stx_volume_profile";
		const fontStyle = "stx-float-date";
		const context = sd.getContext(stx);
		const { chart } = stx;
		const { panel } = chart;
		const { yAxis } = panel;
		const { flipped } = yAxis;
		let { highValue, lowValue } = chart;

		// for backwards compatibility check sd.parameters first
		let {
			displayBorder = sd.inputs["Display Border"],
			displayVolume = sd.inputs["Display Volume"],
			widthPercentage = sd.inputs["Width Percentage"],
			numberBars: priceBuckets = sd.inputs["Price Buckets"]
		} = sd.parameters;

		// set defaults
		if (displayBorder !== false) displayBorder = true;
		if (displayVolume !== true) displayVolume = false;
		if (!widthPercentage || widthPercentage < 0) widthPercentage = 0.25;
		if (!priceBuckets || priceBuckets < 0) priceBuckets = 30;
		priceBuckets = Math.ceil(priceBuckets);

		const interval = (highValue - lowValue) / priceBuckets;
		if (interval === 0) return;
		const priceVolArray = [];

		if (flipped) [highValue, lowValue] = [lowValue, highValue];
		const direction = flipped ? -1 : 1;

		for (
			let rangeStart = lowValue, i = 0;
			i <= priceBuckets;
			rangeStart += interval * direction, i++
		) {
			priceVolArray.push([rangeStart, 0]);
		}

		let maxVolume = 0;

		for (let i = 0; i < quotes.length; i++) {
			const quote = quotes[i];
			if (quote === null) continue;

			const { Volume } = quote;
			if (!Volume) continue;
			const { High, Low } = quote.transform || quote;
			const rangesWithVol = [];
			let rangeBottom = priceVolArray[0][0];
			let rangeTop = null;

			for (let j = 1; j < priceVolArray.length; j++) {
				rangeTop = priceVolArray[j][0];

				const lowFallsInRange = Low >= rangeBottom && Low <= rangeTop;
				const highFallsInRange = High >= rangeBottom && High <= rangeTop;
				const barEnvelopesRange = Low < rangeBottom && High > rangeTop;

				if (lowFallsInRange || highFallsInRange || barEnvelopesRange) {
					rangesWithVol.push(j);
				}

				rangeBottom = rangeTop;
			}

			if (rangesWithVol.length) {
				const perRangeVol = Volume / rangesWithVol.length;
				for (let j = 0; j < rangesWithVol.length; j++) {
					let newVol = (priceVolArray[rangesWithVol[j]][1] += perRangeVol);
					if (newVol > maxVolume) maxVolume = newVol;
				}
			}
		}

		if (maxVolume === 0) {
			stx.displayErrorAsWatermark(
				"chart",
				stx.translateIf("Not enough data to render the Volume Profile")
			);
			return;
		}

		stx.setStyle(
			cssSelector,
			"color",
			CIQ.Studies.determineColor(sd.outputs["Bars Color"])
		);

		const txtHeight = stx.getCanvasFontSize(fontStyle);
		const borderColor = stx.canvasStyle(cssSelector).borderTopColor;
		const bordersOn = displayBorder && !CIQ.isTransparent(borderColor);

		stx.canvasFont(fontStyle, context);
		drawBars();
		if (bordersOn) drawBars(true);
		context.globalAlpha = 1;

		function drawBars(borders) {
			stx.canvasColor(cssSelector);
			context.beginPath();

			const align = (val) => Math.round(val);
			const pixelFor = (val) => align(stx.pixelFromTransformedValue(val));

			const maxBarHeight = align(chart.width * widthPercentage); // pixels for highest bar
			const barBottom = align(chart.right) - 2.5;
			let prevBarTop = barBottom;
			let [rangeBottom] = priceVolArray[0]; // first entry contains no volume by design

			for (let i = 1; i < priceVolArray.length; i++) {
				const [rangeTop, rangeVolume] = priceVolArray[i];

				if (rangeVolume) {
					const barHeight = (rangeVolume * maxBarHeight) / maxVolume;
					const barTop = align(barBottom - barHeight) + (borders ? -0.5 : 0);
					const rangeTopRaw = pixelFor(rangeTop) + (borders ? 0.5 : 1);
					const rangeBottomRaw = pixelFor(rangeBottom) + (borders ? 0.5 : 0);
					const rangeTopPixel = Math.max(rangeTopRaw, yAxis.top);
					const rangeBottomPixel = Math.min(rangeBottomRaw, yAxis.bottom);
					const barIsInFrame =
						rangeTopPixel <= yAxis.bottom && rangeBottomPixel >= yAxis.top;

					if (barIsInFrame) {
						context.moveTo(barBottom, rangeBottomPixel);
						context.lineTo(barBottom, rangeTopPixel);
						context.lineTo(barTop, rangeTopPixel);
						context.lineTo(barTop, rangeBottomPixel);
						if (borders) {
							if (i == 1 || prevBarTop > barTop) {
								// draw down to the top of the previous bar, so that we don't overlap strokes
								context.lineTo(prevBarTop, rangeBottomPixel);
							}
						} else {
							context.lineTo(barBottom, rangeBottomPixel);
							if (displayVolume) {
								const txt = CIQ.condenseInt(rangeVolume);
								const rangeHeight = rangeBottomPixel - rangeTopPixel;
								if (txtHeight <= rangeHeight - 2) {
									let width;
									try {
										({ width } = context.measureText(txt));
									} catch (e) {
										width = 0;
									} // Firefox doesn't like this in hidden iframe
									context.textBaseline = "top";
									const prevColor = context.fillStyle;
									context.fillStyle = borderColor;
									context.fillText(
										txt,
										barTop - width - 3,
										rangeTopPixel + (rangeHeight / 2 - txtHeight / 2)
									);
									context.fillStyle = prevColor;
								}
							}
						}
					}

					prevBarTop = barTop;
				} else {
					prevBarTop = barBottom; // missing bar, reset to baseline
				}

				rangeBottom = rangeTop;
			}

			if (!sd.highlight && stx.highlightedDraggable) context.globalAlpha *= 0.3;
			if (!borders) context.fill();
			context.strokeStyle = borderColor;
			if (borders) context.stroke();
			context.closePath();
		}
	};

	CIQ.Studies.studyLibrary = CIQ.extend(CIQ.Studies.studyLibrary, {
		"vol profile": {
			name: "Volume Profile",
			underlay: true,
			seriesFN: CIQ.Studies.displayVolumeProfile,
			calculateFN: null,
			inputs: {
				"Display Border": true,
				"Display Volume": false,
				"Price Buckets": 30,
				"Width Percentage": 0.25
			},
			outputs: { "Bars Color": "#b64a96" },
			customRemoval: true,
			attributes: {
				yaxisDisplayValue: { hidden: true },
				panelName: { hidden: true },
				flippedEnabled: { hidden: true }
			}
		}
	});
}

};
__js_advanced_studies_volumeProfile_(typeof window !== "undefined" ? window : global);
