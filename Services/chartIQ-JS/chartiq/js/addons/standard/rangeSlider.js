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


/* global _CIQ, _timezoneJS, _SplinePlotter */

var CIQ = typeof _CIQ !== "undefined" ? _CIQ : _exports.CIQ;

/**
 * Add-on that adds a range slider to the chart.
 *
 * The range slider allows the `dataSegment` to be selectable as a portion of the data set.
 *
 * The range slider can be toggled using the Ctrl+Alt+R keystroke combination (see the
 * `rangeSlider` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
 *
 * Requires *addOns.js*.
 *
 * Also requires additional CSS. Add the following style sheet:
 * ```
 * <link rel="stylesheet" type="text/css" href="css/chartiq.css" media="screen" />
 * ```
 * or directly include this CSS:
 * ```
 * .stx_range_slider.shading {
 *     background-color: rgba(128, 128, 128, 0.3);
 *     border: solid 2px #0090b7;
 *     width: 5px;
 * }
 * ```
 * Once instantiated, the range slider can be displayed or hidden by setting the `rangeSlider`
 * parameter of the primary chart's [layout object]{@link CIQ.ChartEngine#layout} and then issuing
 * a layout change event to trigger the new status. When initialing loading the chart, enable the
 * range slider in a callback function to prevent out&#8209;of&#8209;sequence issues. See the
 * examples below.
 *
 * A range slider is simply another chart. So you configure it and customize it using the same
 * parameters as you would the primary chart. The only difference is that the slider object is a
 * sub&#8209;element of the primary chart, contained in the `slider.slider` object.
 *
 * For example, if you wanted to turn off the x-axis on the slider, assuming a chart instantiated
 * as `stxx`, you would execute:
 * ```
 * stxx.slider.slider.xaxisHeight = 0;
 * ```
 *
 * It is important to note that the range slider chart DOM element creates itself below the
 * primary chart container element, not inside the container. As such, all styling must be on a
 * parent `div` container rather than on the primary chart container itself to ensure styling is
 * shared between the chart and range slider containers.
 *
 * For example, do this:
 * ```
 * <div class="all-charts">
 *     <div style="grid-column: span 6; grid-row: span 2;">
 *         <div class="chartwrap"> <!-- Beginning of wrapper with desired styling. -->
 *             <div class="chartContainer1" style="width:100%;height:100%;position:relative"></div>
 *             <!-- The slider will be added here. -->
 *         </div> <!-- End of wrapper. -->
 *     </div>
 * </div>
 * ```
 *
 * not this:
 * ```
 * <div class="all-charts">
 *     <div class="chartwrap" style="grid-column: span 6; grid-row: span 2;">
 *         <div class="chartContainer1" style="width: 100%; height: 100%; position: relative"></div>
 *     </div>
 * </div>
 * ```
 *
 * Range slider example:
 * <iframe width="800" height="350" scrolling="no" seamless="seamless" align="top"
 *         style="float:top" src="https://jsfiddle.net/chartiq/dtug29yx/embedded/result,js,html/"
 *         allowfullscreen="allowfullscreen" frameborder="1">
 * </iframe>
 *
 * @param {object} params Configuration parameters.
 * @param {CIQ.ChartEngine} [params.stx] The chart object.
 * @param {number} [params.height="95px"] Height of the range slider panel. Must include a CSS
 * 		unit, such as "px".
 * @param {object} [params.yAxis] Y-axis parameters.
 * @param {number} [params.chartContainer] Handle to the main chart container. Defaults to
 * 		`stxx.container`.
 * @param {string} [params.menuContextClass] A CSS class name used to query the menu DOM element
 * 		that contains the UI control for the range slider add-on. In a multi-chart document, the
 * 		add-on is available only on charts that have a menu DOM element with the value for
 * 		`menuContextClass` as a class attribute.
 *
 * @constructor
 * @name CIQ.RangeSlider
 * @since
 * - 4.0.0
 * - 6.1.0 Added `params.yAxis`.
 * - 8.0.0 Added `params.menuContextClass`.
 *
 * @example
 * <caption>
 * 		Create a range slider and enable it by default using the <code>loadChart</code> callback.
 * </caption>
 * const stxx = new CIQ.ChartEngine({ container: document.querySelector(".chartContainer") });
 *
 * stxx.attachQuoteFeed(quoteFeedSimulator,{ refreshInterval: 1, bufferSize: 200 });
 *
 * // Instantiate a range slider.
 * new CIQ.RangeSlider({ stx: stxx });
 *
 * function displayChart(){
 *     stxx.loadChart("SPY", null, function() {
 *         // For smoother visualization, enable after the main chart has completed loading its data.
 *         stxx.layout.rangeSlider = true; // Show the slider.
 *         stxx.changeOccurred("layout"); // Signal the change to force a redraw.
 *     });
 * }
 *
 * @example
 * <caption>
 * 		Create a range slider and enable/disable it using commands to be triggered from a menu.
 * </caption>
 * const stxx = new CIQ.ChartEngine({ container: document.querySelector(".chartContainer") });
 *
 * // Instantiate a range slider.
 * new CIQ.RangeSlider({ stx: stxx });
 *
 * // To display the slider from a menu use:
 * stxx.layout.rangeSlider = true; // Show the slider.
 * stxx.changeOccurred("layout"); // Signal the change to force a redraw.
 *
 * // To hide the slider from a menu use:
 * stxx.layout.rangeSlider = false; // Hide the slider.
 * stxx.changeOccurred("layout"); // Signal the change to force a redraw.
 */
CIQ.RangeSlider =
	CIQ.RangeSlider ||
	function (params) {
		this.cssRequired = true;

		var stx = params.stx;
		stx.slider = this;
		var sliderHeight = params.height ? params.height : "95px";
		var chartContainer = params.chartContainer
			? params.chartContainer
			: params.stx.container;

		var ciqSlider = document.createElement("div");
		ciqSlider.className = "ciq-chart";
		var sliderContainer = document.createElement("div");
		sliderContainer.className = "chartContainer";
		ciqSlider.appendChild(sliderContainer);
		chartContainer.parentElement.parentElement.insertBefore(
			ciqSlider,
			chartContainer.parentElement.nextSibling
		);
		Object.assign(ciqSlider.style, {
			height: sliderHeight,
			paddingTop: "5px",
			display: "none"
		});
		sliderContainer.style.height = "100%";
		sliderContainer.dimensionlessCanvas = true;
		var self = (this.slider = new CIQ.ChartEngine({
			container: sliderContainer,
			preferences: { labels: false, whitespace: 0 }
		}));
		self.linkedChartEngine = stx;
		self.cleanupGaps = stx.cleanupGaps;
		self.setGapLines(stx.chart.gapLines);
		self.chart.customChart = stx.chart.customChart;
		self.xaxisHeight = 30;
		self.manageTouchAndMouse = false;
		self.minimumCandleWidth = 0;
		self.chart.yaxisMarginMultiplier = 1;
		var panel = self.chart.panel;
		var subholder = panel.subholder;
		var closeButton = panel.close;
		subholder.style.cursor = "ew-resize";
		subholder.classList.add("stx_range_slider");
		if (closeButton) {
			closeButton.style.display = "inline";
			CIQ.safeClickTouch(closeButton, function () {
				stx.layout.rangeSlider = false;
				stx.changeOccurred("layout");
			});
		}
		var yAxis = panel.yAxis;
		yAxis.drawCurrentPriceLabel = false;
		Object.defineProperty(yAxis, "position", {
			get: function () {
				return stx.slider.yAxisPosition || stx.chart.panel.yAxis.position;
			},
			set: function (position) {
				stx.slider.yAxisPosition = position;
			}
		});
		const { get: widthGetter, set: widthSetter } =
			Object.getOwnPropertyDescriptor(CIQ.ChartEngine.YAxis.prototype, "width");
		Object.defineProperty(yAxis, "width", {
			get: function () {
				return Math.max(widthGetter.call(yAxis), stx.chart.yAxis.width);
			},
			set: function (width) {
				widthSetter.call(yAxis, width);
			}
		});
		CIQ.extend(yAxis, params.yAxis);
		self.chart.baseline.userLevel = false;
		if (self.controls.home) self.controls.home.style.width = 0;
		self.initializeChart();
		const listener = (obj) => self.notifyBreakpoint(obj.value);
		if (CIQ.UI) {
			CIQ.UI.KeystrokeHub.addHotKeyHandler(
				"rangeSlider",
				({ stx }) => {
					stx.container.ownerDocument.body.keystrokeHub.context.advertised.Layout.setRangeSlider();
				},
				stx
			);
			CIQ.UI.observeProperty("breakpoint", stx.chart, listener);
		}

		/**
		 * Dynamically updates the styling of the range slider.
		 *
		 * This method can be used to update CSS styles if you are injecting stylesheets using
		 * JavaScript.
		 *
		 * @param {string} obj The CSS selector for which a style property is changed.
		 * @param {string} attribute The style property changed in the CSS selector rule-set.
		 * @param {string} value The value to apply to the CSS property.
		 *
		 * @alias updateStyles
		 * @memberof CIQ.RangeSlider.prototype
		 * @since 8.0.0
		 *
		 * @example
		 * // Set the shading of the range slider.
		 * stxx.slider.updateStyles(
		 *     'stx_range_slider shading',
		 *     'backgroundColor',
		 *     'rgba(200, 50, 50, 0.45)'
		 * );
		 *
		 * @example
		 * // Set the color of the bars of the range slider to red.
		 * stxx.slider.updateStyles(
		 *     'stx_range_slider shading',
		 *     'borderTopColor',
		 *     'rgba(255, 0, 0)'
		 * );
		 */
		this.updateStyles = function (obj, attribute, value) {
			stx.setStyle(obj, attribute, value);
			this.style = stx.canvasStyle("stx_range_slider shading");
		};

		this.display = function (on) {
			if (stx.layout.rangeSlider !== on) {
				// do this the way it was intended
				stx.layout.rangeSlider = on;
				stx.changeOccurred("layout");
				return;
			}
			ciqSlider.style.display = on ? "" : "none";
			stx.resizeChart();
			ciqSlider.ownerDocument.defaultView.dispatchEvent(new Event("resize"));
			if (!on) return;
			self.resizeChart();
			self.initializeChart();
			this.requestDraw(true);
		};
		this.setSymbol = function (symbol) {
			self.chart.panel.display = self.chart.symbol = symbol;
			self.chart.symbolObject = { symbol: symbol };
			self.chart.market = stx.chart.market;
			self.setMainSeriesRenderer();
			self.resizeChart();
			this.adjustRange(stx.chart);
			this.requestDraw(true);
		};
		this.acceptLayoutChange = function (layout) {
			var doDraw = false;
			if (self.layout.rangeSlider !== layout.rangeSlider) {
				stx.slider.display(layout.rangeSlider);
			}
			var relevantLayoutPropertiesForRedraw = [
				"chartType",
				"aggregationType",
				"periodicity",
				"interval",
				"timeUnit",
				"chartScale",
				"rangeSlider",
				"flipped",
				"extended",
				"marketSessions",
				"kagi",
				"rangebars",
				"renko",
				"priceLines",
				"pandf"
			];
			relevantLayoutPropertiesForRedraw.forEach(function (x) {
				if (!CIQ.equals(self.layout[x], layout[x])) {
					self.layout[x] = layout[x];
					doDraw = true;
				}
			});
			if (!CIQ.trulyVisible(ciqSlider)) return;
			if (doDraw) {
				self.setMainSeriesRenderer();
				this.requestDraw(true);
			}
		};
		this.adjustRange = function (chart) {
			if (!chart.dataSet) return;
			if (!chart.endPoints || !chart.endPoints.begin) return;
			var myChart = self.chart;
			if (!myChart.width) return;
			var scrollOffset = 0,
				ticksOffset = 0;
			if (stx.quoteDriver) {
				var behaviorParams = {
					symbol: chart.symbol,
					symbolObject: chart.symbolObject,
					interval: stx.layout.interval
				};
				if (
					(behaviorParams.interval == "month" ||
						behaviorParams.interval == "week") &&
					!stx.dontRoll
				) {
					behaviorParams.interval = "day";
				}
				var behavior = stx.quoteDriver.getQuoteFeed(behaviorParams).behavior;
				if (behavior && behavior.bufferSize) {
					if (chart.moreAvailable) scrollOffset = behavior.bufferSize;
					if (stx.isHistoricalMode()) ticksOffset = behavior.bufferSize;
				}
			}
			myChart.baseline.defaultLevel = chart.baseline.actualLevel;
			myChart.scroll =
				Math.max(
					0,
					chart.dataSet.length -
						stx.tickFromDate(chart.endPoints.begin) -
						scrollOffset
				) + 1;
			self.setMaxTicks(myChart.scroll - ticksOffset + 2);
		};
		this.copyData = function (chart) {
			if (!(chart.dataSet && chart.masterData)) return;
			var myChart = self.chart;
			myChart.masterData = self.masterData = chart.masterData.slice(0);
			myChart.dataSet = chart.dataSet.slice(0);
			myChart.state = chart.state;
			self.establishMarkerTicks();
			this.requestDraw();
		};
		this.calculateYAxisPosition = function () {
			var panel = self.chart.panel;
			var currentPosition = self.getYAxisCurrentPosition(panel.yAxis, panel);
			if (panel.yAxis.position && currentPosition != panel.yAxis.position)
				self.calculateYAxisPositions();
		};
		this.drawSlider = function () {
			if (!CIQ.trulyVisible(ciqSlider)) return;
			if (!stx.chart.dataSet || !stx.chart.dataSet.length) return;
			var style = this.style;
			if (!style)
				style = this.style = stx.canvasStyle("stx_range_slider shading");
			var chartPanel = stx.chart.panel,
				ctx = self.chart.context,
				segmentImage = self.chart.segmentImage || [],
				halfCandle = self.layout.candleWidth / 2;
			var left = (self.tickLeft = Math.max(
				stx.tickFromPixel(chartPanel.left + halfCandle),
				0
			));
			var right = (self.tickRight = Math.min(
				stx.tickFromPixel(chartPanel.right - halfCandle),
				stx.chart.dataSet.length - 1
			));
			var pLeft = (self.pixelLeft =
				self.pixelFromTick(left) -
				(segmentImage[left] ? segmentImage[left].candleWidth / 2 : halfCandle));
			var pRight = (self.pixelRight =
				self.pixelFromTick(right) +
				(segmentImage[right]
					? segmentImage[right].candleWidth / 2
					: halfCandle));
			var leftBoundary = subholder.offsetLeft,
				rightBoundary = leftBoundary + subholder.offsetWidth;
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = style.backgroundColor;
			ctx.fillRect(
				leftBoundary,
				subholder.offsetTop,
				pLeft - leftBoundary,
				subholder.offsetHeight
			);
			ctx.fillRect(
				rightBoundary,
				subholder.offsetTop,
				pRight - rightBoundary,
				subholder.offsetHeight
			);
			ctx.strokeStyle = style.borderTopColor;
			ctx.lineWidth = parseInt(style.borderWidth, 10);
			ctx.moveTo(pLeft, subholder.offsetTop);
			ctx.lineTo(pLeft, subholder.offsetTop + subholder.offsetHeight);
			ctx.moveTo(pRight, subholder.offsetTop);
			ctx.lineTo(pRight, subholder.offsetTop + subholder.offsetHeight);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = parseInt(style.width, 10);
			ctx.lineCap = "round";
			ctx.moveTo(pLeft, subholder.offsetTop + subholder.offsetHeight / 4);
			ctx.lineTo(pLeft, subholder.offsetTop + (3 * subholder.offsetHeight) / 4);
			ctx.moveTo(pRight, subholder.offsetTop + subholder.offsetHeight / 4);
			ctx.lineTo(
				pRight,
				subholder.offsetTop + (3 * subholder.offsetHeight) / 4
			);
			ctx.stroke();
			ctx.restore();
		};
		this.requestDraw = function (immediate) {
			const draw = () => {
				self.draw();
				this.drawSlider();
				if (this.drawRequested)
					this.drawRequested = clearTimeout(this.drawRequested);
			};
			if (immediate) draw();
			else if (!this.drawRequested) {
				this.drawRequested = setTimeout(draw, 100);
			}
		};
		stx.addEventListener("destroy", function (obj) {
			if (CIQ.UI)
				CIQ.UI.unobserveProperty("breakpoint", obj.stx.chart, listener);
			self.destroy();
		});
		stx.addEventListener("layout", function (obj) {
			obj.stx.slider.acceptLayoutChange(obj.stx.layout);
		});
		stx.addEventListener("preferences", function (obj) {
			const { language } = obj.stx.preferences;
			if (CIQ.I18N && self.preferences.language != language) {
				CIQ.I18N.setLocale(self, language);
			}
			self.preferences.language = language;
			this.slider.requestDraw(true);
		});
		stx.addEventListener("symbolChange", function (obj) {
			if (obj.action == "master") obj.stx.slider.setSymbol(obj.symbol);
		});
		stx.addEventListener("symbolImport", function (obj) {
			if (obj.action == "master") obj.stx.slider.setSymbol(obj.symbol);
			obj.stx.slider.acceptLayoutChange(obj.stx.layout);
		});
		stx.addEventListener("theme", function (obj) {
			self.clearPixelCache();

			const { multiChartContainer } = stx.uiContext.topNode;
			const { breakpoint } = stx.chart;

			if (multiChartContainer) {
				self.styles = multiChartContainer.styles[breakpoint] || {};
				multiChartContainer.styles[breakpoint] = self.styles;
			} else {
				self.styles = {};
			}

			self.container.style.backgroundColor = "";
			if (CIQ.ThemeHelper) {
				var helper = new CIQ.ThemeHelper({ stx: obj.stx });
				helper.params.stx = self;
				helper.update();
			}
		});
		stx.append("createDataSet", function (...args) {
			const [, , { animationEntry } = {}] = args || [];
			if (animationEntry) return;
			this.slider.adjustRange(this.chart);
			this.slider.copyData(this.chart);
		});
		stx.append("draw", function ({ animationEntry } = {}) {
			if (animationEntry || !CIQ.trulyVisible(ciqSlider)) return;
			if (!self.chart.dataSet) return;
			this.slider.calculateYAxisPosition();
			this.slider.adjustRange(this.chart);
			this.slider.requestDraw();
		});
		stx.prepend("resizeChart", function () {
			var ciqChart = chartContainer.parentElement;
			if (!ciqChart || !ciqChart.isConnected) {
				return true;
			}
			var chartArea = ciqChart.parentElement;
			var totalHeightOfContainers = CIQ.elementDimensions(chartArea).height;
			var chartContainers = chartArea.querySelectorAll(".chartContainer");
			Array.from(chartContainers).forEach(function (container) {
				if (container !== chartContainer && CIQ.trulyVisible(container)) {
					totalHeightOfContainers -= CIQ.elementDimensions(
						container.parentElement,
						{
							border: 1,
							padding: 1,
							margin: 1
						}
					).height;
				}
			});
			ciqChart.style.height = totalHeightOfContainers + "px";
			if (this.layout.rangeSlider) {
				ciqSlider.style.display = "";
				self.resizeChart();
				self.initializeChart();
				this.slider.requestDraw();
			} else {
				ciqSlider.style.display = "none";
			}
		});
		["mousedown", "touchstart", "pointerdown"].forEach(function (ev) {
			subholder.addEventListener(
				ev,
				function (e) {
					var start = self.backOutX(e.pageX);
					if (!start && start !== 0) return; // wrong event
					start -= e.target.offsetLeft;
					self.startDrag = start;
					self.startPixelLeft = self.pixelLeft;
					self.startPixelRight = self.pixelRight;
					var style = stx.slider.style;
					if (!style)
						style = stx.slider.style = stx.canvasStyle(
							"stx_range_slider shading"
						);
					var bw = parseInt(style.borderLeftWidth, 10);
					start += this.offsetLeft;
					if (start < self.pixelRight - bw) self.needsLeft = true;
					if (start > self.pixelLeft + bw) self.needsRight = true;
					if (CIQ.touchDevice) return;
					if (self.needsLeft && self.needsRight) {
						// change to grab only if drag started from viewport
						e.target.classList.add("stx-drag-chart");
					}
				},
				{ passive: false }
			);
		});
		["mouseup", "mouseover", "touchend", "pointerup"].forEach(function (ev) {
			subholder.addEventListener(ev, function (e) {
				const { which, type } = e;
				if (which === 1 && type !== "pointerup" && type !== "mouseup") return;
				e.target.classList.remove("stx-drag-chart");
				self.startDrag = null;
				self.needsLeft = false;
				self.needsRight = false;
			});
		});
		["mousemove", "touchmove", "pointermove"].forEach(function (ev) {
			subholder.addEventListener(
				ev,
				function (e) {
					if (!self.timeout) {
						// consolidate calls and execute on next tick
						// this prevents unnecessary calls that could otherwise build up based on mousemove
						self.timeout = setTimeout(() => {
							const done = () => (self.timeout = clearTimeout(self.timeout));

							const {
								startDrag,
								startPixelLeft,
								startPixelRight,
								needsLeft,
								needsRight
							} = self;
							let { tickLeft, tickRight } = self;

							if (!startDrag && startDrag !== 0) {
								if (
									self.backOutX(e.pageX) > self.pixelLeft + 2 &&
									self.backOutX(e.pageX) < self.pixelRight - 2
								) {
									self.chart.panel.subholder.style.cursor = "grab";
								} else {
									self.chart.panel.subholder.style.cursor = "ew-resize";
								}
								return done();
							}
							const { touches } = e;
							let movement =
								(touches && touches.length
									? self.backOutX(touches[0].pageX)
									: self.backOutX(e.pageX)) - e.target.offsetLeft;
							if (!movement && movement !== 0) return done(); // wrong event
							movement -= startDrag;

							if (needsLeft) {
								if (startPixelLeft + movement < self.chart.left)
									movement = self.chart.left - startPixelLeft;
								if (
									needsRight &&
									startPixelRight + movement >= self.chart.right
								) {
									movement = self.chart.right - startPixelRight;
									if (!self.isHome()) movement += self.layout.candleWidth / 2; // force a right scroll
								}
								tickLeft = self.tickFromPixel(startPixelLeft + movement);
								if (needsRight)
									tickRight = tickLeft + self.tickRight - self.tickLeft;
							} else if (needsRight) {
								tickRight = Math.min(
									self.tickFromPixel(startPixelRight + movement),
									stx.chart.dataSet.length - 1
								);
							} else return done();

							let newCandleWidth = stx.chart.width / (tickRight - tickLeft + 1);
							if (
								tickRight >= tickLeft &&
								((needsLeft && needsRight) ||
									newCandleWidth >= stx.minimumCandleWidth)
							) {
								self.tickLeft = tickLeft;
								self.tickRight = tickRight;
								stx.chart.scroll = stx.chart.dataSet.length - tickLeft;
								if (!needsLeft || !needsRight) {
									stx.setCandleWidth(newCandleWidth);
								}
								stx.micropixels = 0;
								stx.draw();
							}

							done();
						});
					}
				},
				{ passive: false }
			);
		});
		this.adjustRange(stx.chart);
		this.copyData(stx.chart);
		stx.draw();
	};
