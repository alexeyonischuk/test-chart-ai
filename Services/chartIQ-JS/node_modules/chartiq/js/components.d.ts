import { CIQ } from '../js/componentUI.js'
export { CIQ }

/**
 * WebComponent module
 */
declare module '../js/components.js' {
  /**
   * The following is a set of web components used in our sample templates to illustrate how the API can be leveraged to build a full featured UI to control the chart.
   *
   * Feel free to use them as provided or modify the web components to meet your needs. You can find all of the source code for these components in `js/components.js`
   * and `js/componentUI.js`.
   *
   * This implementation assumes the chart is attached to a quote feed for interactive data loading. If you will not be using a quote feed, you will need to adjust
   * these components accordingly.
   *
   * >Two special tags are required to run the framework:
   * >
   * >`cq-ui-manager` is a component that manages all menus and dialogs on the page. It does so by attaching itself to the HTML body element, monitoring touch and mouse events,
   * and then instantiating menus and dialogs. For instance, when a user taps on the screen, they expect that any open menus will be closed. This is one of the responsibilities
   * that `cq-ui-manager` assumes.
   * > **One cq-ui-manager tag is allowed for the entire page, even when multiple charts are instantiated.**
   * >
   * > `cq-context` is a special tag that groups a set of components to a particular chart. Any component that is nested within a `cq-context` will look to that context
   * in order to find its chart. For instance, menu items within a `cq-context` will interact with the chart engine that is attached to the context.
   *
   * **Performance considerations:** These web components include dynamically updating modules that will react to every data change and redraw certain elements.
   * Although visually pleasing, they can sometimes cause performance issues on slow devices or when multiple charts are displayed.
   * See CIQ.UI.animatePrice for setting options.
   *
   * See CIQ.UI.ContextTag, which provides a model and base functionality for many components
   *
   * See the following tutorial for further details on how to work with and customize the included web components: {@tutorial Web Component Interface}.
   *
   */
  export namespace WebComponents {
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-abstract-marker&gt;</h4>
     *
     * An encapsulation of a complex marker which can contain HTML, video, images, CSS, and
     * animations.
     *
     * The component can be extended with additional markup types specified as values of the `cq-type` attribute.
     *
     * For demonstration purposes, this component ships with a built-in "helicopter" marker.
     * To add additional abstract markers (or to overwrite the built-in), assign the markup to a property in the context configuration (see example).
     *
     * @example <caption>Configure abstract marker:</caption>
     * stxx.uiContext.config.abstractMarkers.myCustomMarker = "<div style='color: red;'>CUSTOM MARKER!!!</div>";
     *
     * @example <caption>Use of component for abstract marker:</caption>
     * <cq-abstract-marker cq-type="myCustomMarker"></cq-abstract-marker>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since 7.5.0
     */
    class AbstractMarker extends CIQ.UI.ContextTag {
      /**
       * Initializes the component.
       *
       * @since 7.5.0
       *
       */
      public init(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-advertisement&gt;</h4>
     *
     * Displays an advertisement banner as a "marker" (inside the chart, use CSS to position absolutely against the chart panel).
     * The advertisement should contain content that can be enabled by calling CIQ.UI.Advertisement#show based on your
     * business logic.
     *
     * The advertisement will automatically adjust the height to accommodate the content (assuming overflow-y: auto).
     *
     * _**Attributes**_
     *
     * This component supports the following attributes:
     * | attribute | description |
     * | :-------- | :---------- |
     * | name      | Name of advertisement.  If omitted, uses "default" |
     *
     * @example
     *	<cq-advertisement name="dollartrades" style="height: 106px;">
     *	    <cq-close class="ciq-tight"></cq-close>
     *		<div class="sample ciq-show" content>
     *			<div cq-desktop="">
     *				<div>$1 Trades</div>
     *				<div>Use code <strong>Sample</strong></div>
     *				<a target="_blank" href="https://yourURL?codeSample&desktop">Click to learn more</a>
     *			</div>
     *			<div cq-phone="">
     *				<div>$1 Trades</div>
     *				<a target="_blank" href="https://yourURL?codeSample&mobile">Click to learn more</a>
     *			</div>
     *		</div>
     *	</cq-advertisement>
     *
     * @extends CIQ.UI.ModalTag
     * @protected
     */
    class Advertisement extends CIQ.UI.ModalTag {
      /**
       * Hides the advertisement and suppresses it for 24 hours by storing it in local storage.
       * If the selector itself changes however then the ad will reappear.
       *
       */
      public close(): void
      /**
       * Creates a marker out of this component.
       *
       */
      public makeMarker(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Creates a local nameValueStore using a custom namespace passed in as a parameter.
       *
       * @param nameValueStore The nameValueStore namespace to use.
       *
       */
      public setNameValueStore(nameValueStore: Object): void
      /**
       * Sets the sleep time for this amount of time before re-displaying.
       *
       * @param  units    Units
       * @param  unitType Unit type. Value values "minute","hour","day","week".
       *
       */
      public setSleepAmount(units: Number, unitType: String): void
      /**
       * Show the advertisement. This should be a div inside of the web component.
       *
       * @param [selector] A selector. If none specified then the node with attribute `content` will be selected.
       * @param [ignoreSleep=false] If true then ignore sleep.
       *
       */
      public show(selector?: String, ignoreSleep?: Boolean): void
      /**
       * Call this to force the advertisement to monitor the nameValueStore for updates. It will do this by
       * polling. This is useful when running in multiple windows, so that if the advertisement is closed in one
       * window then it will automatically close in the other windows.
       *
       * @param [ms=1000] Number of milliseconds to poll.
       *
       */
      public watchForRemoteClose(ms?: Number): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-aggregation-dialog&gt;</h4>
     *
     * Provides content for aggregation chart settings dialog.  Most aggregation types require a parameter to control box reversal amount and/or box size.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it saves a view.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "change" |
     * | action | "input" |
     * | aggregationType | _type of chart aggregation_ |
     * | box | _box size_ |
     * | reversal | _reversal size_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class AggregationDialog extends CIQ.UI.DialogContentTag {
      /**
       * Opens the aggregation dialog.
       *
       * @param params
       * @param [params.context] A context to set. See
       * 		[setContext]CIQ.UI.DialogContentTag#setContext.
       * @param params.aggregationType Aggregation Type, e.g., "kagi", "renko", etc.
       *
       */
      public open(params: {aggregationType: string, context?: CIQ.UI.Context}): void
      /**
       * Called after an stxtap event is fired.
       * Emits the event for the action performed.
       *
       * @param params New values of the inputs
       * @param [params.aggregationType] Aggregation type
       * @param [params.box] Box size
       * @param [params.reversal] Reversal size
       *
       */
      public postProcess(
        params: {
          aggregationType?: string,
          box?: string,
          reversal?: string
        }
      ): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-attribution&gt;</h4>
     *
     * This will put a node inside a panel to attribute the data.
     * Both the main chart panel (for quotes) and a study panel can use an attribution.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.ModalTag
     * @protected
     * @since 2016-07-16
     */
    class Attribution extends CIQ.UI.ModalTag {
      /**
       * Creates a marker and returns it within a DOM node.
       *
       * @param stx Chart engine instance.
       * @param panel Name of panel to place marker in.
       * @return DOM node with marker in it.
       *
       */
      public insert(stx: CIQ.ChartEngine, panel: String): HTMLElement
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Displays an attribution on the chart. Attributions are messages about the chart data
       * source.
       *
       * Called automatically whenever the data set is modified, but may also be called on
       * demand.
       *
       * @param [stx] The chart engine for which the attribution is displayed.
       * 		Defaults to the chart engine contained in the context.
       *
       * @since 8.3.0
       *
       */
      public displayAttribution(stx?: CIQ.ChartEngine): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-chart-instructions&gt;</h4>
     *
     * This element contains hidden text that can be read aloud by a screen reader to announce chart features or instructions.
     * By default the text is not visible to a user but is listed in the accessbility tree.
     *
     * If you would like to provide custom instructions, pass in your own text in a `<p>` tag.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since 8.7.0
     */
    class ChartInstructions extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Filtered hotKey configurations from defaultConfiguration based on ariaLabel property.
       * This will create new entries for the hotkeys and add
       * their instructions to the text content already provided.
       *
       * @param configurations Hotkey configs from the config.hotKeyConfig hotkeys
       *
       */
      public setHotKeyCommands(configurations: object[]): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-chart-title&gt;</h4>
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute         | description |
     * | :---------------- | :---------- |
     * | display-exchange  | Display the exchange available in the chart symbol object |
     * | cq-previous-close | Updates the previousClose property, see the description below |
     * | cq-browser-tab    | Enables browser tab updates with instrument symbol and latest price |
     * | cq-activate-symbol-search-on-click | Enables click on the chart title to open symbol search dialog |
     *
     * In addition, the following attribute is also supported:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
     *
     * Note, if the `cq-marker` attribute is added to the element, and it is placed within the
     * chartArea, the element will sit above the chart bars.
     *
     * `<cq-symbol></cq-symbol>` will display `chart.symbol`.
     * `<cq-symbol-description></cq-symbol-description>` will display the `chart.symbolDisplay`. See CIQ.ChartEngine.Chart#symbolDisplay for details on how to set this value.
     *
     * Set attribute `cq-browser-tab` to true to get the stock symbol and latest price to update in the browser tab.
     *
     * Set member `previousClose` to the prior day's closing price in order to calculate and display change.
     * If `previousClose` is not set, then `iqPrevClose` from the `dataSet` will be the default.
     * Remember data is loaded asynchronously.
     * Be sure to reset this value once your initial data has been loaded by using the CIQ.ChartEngine.loadChart callback function.
     * @example <caption>Reset closing price</caption>
     * stx.loadChart(symbol, parameters, function(){
     *      document.querySelector("cq-chart-title").previousClose = yesterdays-closing-price;
     * }
     *
     * The `cq-animate` attribute in the `cq-current-price` element can be used to change the price color to red or green based on the previous value.
     * Setting the attribute to "fade" will introduce a transition effect on the price which, while attractive, uses considerable CPU when there are rapid updates.
     * @example <caption>cq-animate attribute</caption>
     * <cq-chart-title>
     * 	<cq-symbol></cq-symbol>
     * 	<cq-chart-price>
     * 		<cq-current-price cq-animate></cq-current-price>
     * 		<cq-change>
     * 			<div class="ico"></div> <cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
     * 		</cq-change>
     * 	</cq-chart-price>
     * </cq-chart-title>
     *
     * @example <caption>More descriptive display</caption>
     * //You can set a more descriptive name by using http://documentation.chartiq.com/CIQ.ChartEngine.Chart.html#symbolDisplay
     * // and then enabling that on the tile.
     *
     * //In your HTML file look for:
     * <cq-symbol></cq-symbol>
     * //and replace it with :
     * <cq-symbol-description></cq-symbol-description>
     *
     * //In your quote feed add the following line:
     * params.stx.chart.symbolDisplay=response.fullName;
     *
     * //Like so:
     * quotefeed.fetchInitialData=function (symbol, suggestedStartDate, suggestedEndDate, params, cb) {
     *  const queryUrl = this.url; // using filter:true for after hours
     *
     *  CIQ.postAjax(queryUrl, null, function(status, response){
     *   // process the HTTP response from the datafeed
     *   if(status==200){ // if successful response from datafeed
     *    params.stx.chart.symbolDisplay=response.fullName; // specify response name
     *    const newQuotes = quotefeed.formatChartData(response);
     *    cb({quotes:newQuotes, moreAvailable:true, attribution:{source:"simulator", exchange:"RANDOM"}}); // return the fetched data; init moreAvailable to enable pagination
     *   } else { // else error response from datafeed
     *    cb({error:(response?response:status)});	// specify error in callback
     *   }
     *  });
     * };
     *
     * @extends CIQ.UI.ModalTag
     * @protected
     * @since
     * - 06-15-16
     * - 4.0.0 Browser tab now updates with stock symbol and latest price using `cq-browser-tab` attribute.
     * - 6.3.0 Negative close values are "N/A" change percentage.
     * - 6.3.0 Child tag `<cq-todays-change-pct>` is now optional.
     * - 8.8.0 Add `cq-activate-symbol-search-on-click` attribute.
     * - 9.1.0 Observes attributes.
     */
    class ChartTitle extends CIQ.UI.ModalTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Begins the Title helper. This observes the chart and updates the title elements as necessary.
       *
       */
      public begin(): void
      /**
       * Initializes after context set, optionally calls `begin()`.
       * @param [params]
       * @param [params.autoStart] Set to true to call `begin` function.
       *
       */
      public initialize(params?: {autoStart?: boolean}): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Updates the values in the component.
       *
       * @param force Update even when no price change
       *
       */
      public update(force: boolean): void
      /**
       * Creates a clickable area for the symbol so tapping on the symbol will open a lookup component.
       * Whether a clickable symbol is created depends on the value of `cq-activate-symbol-search-on-click` attribute.
       *
       */
      public handleSymbolSearchChange(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-clickable&gt;</h4>
     *
     * When tapped/clicked, this component can run a method on another component. Set the
     * `selector` attribute to a selector for the other component. Set `method` attribute to the method
     * on that other component that should be executed. The parameter provided to the method is an object that contains
     * the context (if available) for this clickable component ("context") and a reference to the
     * component ("caller").
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute | description |
     * | :-------- | :---------- |
     * | method | A function within another web component to call. |
     * | selector | A css selector to another web component. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "click" |
     * | action | "click" |
     *
     * @example <caption>Component with method and selector.
     *          When clicked, the following equivalent code is run from within the component:
     *          <pre>document.querySelector("cq-sample-dialog").open({context: this.context, caller: this});</pre></caption>
     * <cq-clickable selector="cq-sample-dialog" method="open">Settings</cq-clickable>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 3.0.9
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Clickable extends CIQ.UI.ContextTag {
      /**
       * Runs a method on the clickable component.
       *
       */
      public runMethod(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-close&gt;</h4>
     *
     * Closes its containing (parent or up) component by calling its close() method when clicked.
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "close" |
     * | action | "click" |
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class Close extends CIQ.UI.BaseComponent {
      /**
       * Handler for clicking the component.
       *
       */
      public tap(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-comparison&gt;</h4>
     *
     * This component presents a legend of comparison series found on the panel.  The legend will by default allow the user to
     * toggle the visibility of the series, remove the series, change the series color, and observe the series's price.
     * From the markup, the developer can configure these options as well as whether to display the current price or the crosshair price.
     *
     * Usually the comparison legend is automatically created by the [cq-study-legend]WebComponents.StudyLegend component.
     * Therefore, you do not have to create this component on your template manually.
     *
     * A comparison series "chooser" can also be created using this tag.  See below example.
     *
     * _**Attributes**_
     *
     * This component supports the following attributes:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | chart-legend | A flag to indicate that the component should take the form of a legend. |
     * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when a series is removed, its properties modified, or its visibility toggled.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "remove", "modify", "toggle" |
     * | action | "click" |
     * | name | _series key_ |
     * | field | _field_ |
     * | value | _value_ |
     *
     * Note:
     * -  `field` and `value` not available on remove effect
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Comparison series "Chooser" markup.  Note the absence of the "chart-legend" attribute.</caption>
     *	<cq-comparison cq-marker>
     *		<cq-menu class="comparison" cq-focus="input">
     *			<div add-label class="ciq-no-share">
     *
     *				Compare ...
     *			</div>
     *			<div add-comparison>
     *				<cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
     *				<cq-swatch cq-no-close overrides="auto" role="presentation">
     *					<div class="ciq-screen-reader" role="button">Select color</div>
     *				</cq-swatch>
     *				<div role="button" class="stx-btn add" keyboard-selectable>
     *					Add
     *				</div>
     *			</div>
     *		</cq-menu>
     *	</cq-comparison>
     *
     * @extends CIQ.UI.ModalTag
     * @protected
     * @since
     * - 7.3.0 Added the ability to set series color using `cq-swatch`.
     * - 9.1.0 Added markup for UI, and emitters.
     */
    class Comparison extends CIQ.UI.ModalTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Initializes all the children UI elements that make up `<cq-comparison>`.
       *
       */
      public configureUI(): void
      /**
       * Handler for keyboard interaction.
       *
       * Left and Right arrows will move between symbol lookup, color picker and "Add" button.
       * The attribute cq-focused will be added to the currently focused tag. This can then be
       * queried later, such as when a user hits enter.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       * @since 9.1.0
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * Triggers the comparison lookup component and passes keyboard control into the internal
       * [cq-lookup]WebComponents.Lookup element.
       *
       * Called when keyboard navigation activates this element by pressing Return/Enter.
       *
       * @since 8.3.0
       */
      public onKeyboardSelection(): void
      /**
       * Picks a color to display the new comparison as.
       * Loops through preset colors and picks the next one on the list.
       * If all colors are taken, then the last color will be repeated.
       *
       */
      public pickSwatchColor(): void
      /**
       * Finds the crosshair price value and puts into the legend.
       *
       */
      public position(): void
      /**
       * Handles removing a series from the comparison.
       *
       * @param symbol Name of series as a string.
       * @param series Object containing info on series.
       *
       */
      public removeSeries(symbol: string, series: object): void
      /**
       * The legend gets re-rendered whenever we createDataSet() (wherein the series may have changed).
       * We re-render the entire thing each time, but we use a virtual DOM to determine whether
       * to actually change anything on the screen (so as to avoid unnecessary flickering)
       *
       */
      public renderLegend(): void
      /**
       * Changes the color of a series; triggered if using [cq-swatch]WebComponents.Swatch to show the series color.
       *
       * @param color New color.
       * @param swatch Swatch from which the color setting is made.
       *
       * @since 7.3.0
       */
      public setColor(color: string, swatch: object): void
      /**
       * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
       *
       */
      public setMarkup(): void
      /**
       * Adds an injection to the ChartEngine that tracks the price of Comparisons.
       *
       * @param updatePrices whether to update price on each quote update
       *
       */
      public startPriceTracker(updatePrices: boolean): void
      /**
       * Adds an injection to the ChartEngine to track the crosshair price of the Comparison.
       *
       */
      public startTickPriceTracker(): void
      /**
       * Fires whenever a new security is added as a comparison. Handles all the necessary events
       * to update the chart with the new comparison.
       *
       * @param obj Contains information about the security.
       * @param obj.symbol The symbol that identifies the security.
       *
       * @since 8.2.0 Removed the `context` parameter. The context is now accessed from the base
       * 		component class.
       *
       */
      public selectItem(obj: {symbol: string}): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Loops thru `stxx.chart.series` to update the current price of all comparisons.
       *
       */
      public updatePrices(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-cvp-controller&gt;</h4>
     *
     * The CVP Controller web component is used to supplement the [cq-drawing-settings]WebComponents.DrawingSettings component.
     * It displays additional settings options specific to the Average Line and Regression Line drawing tool.
     *
     * The additional information is to activate a line at +/- X standard deviations away from the center line.
     * There is a line color and line style selection available as well.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute | description |
     * | :-------- | :---------- |
     * | enable    | True if this instance is active. |
     * | color     | Current line color in hex format, or "auto" to select color from theme. |
     * | width     | Line width in pixels. |
     * | pattern   | Line pattern: "solid", "dotted" or "dashed". |
     *
     * In addition, the following attributes are also supported:
     * | attribute     | description |
     * | :------------ | :---------- |
     * | cq-cvp-header | A numerical index relating to the number of standard deviations to this instance applies. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | name | _property_ |
     * | value | _value_ |
     *
     * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Markup for CVP Controller</caption>
     *	<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class CVPController extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Emits a change event.
       *
       * @param eventName Event type
       * @param value key/value pairs to pass in event detail.  Represents what changed and the value it changed to.
       *
       */
      public emit(eventName: string, value: Object): void
      /**
       * Gets the current drawing color and updates display in palette.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       *
       */
      public getColor(activator: {node: HTMLElement}): void
      /**
       * Enables colorPicker and provides callback to `setColor`, depending on `mode` value.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       *
       */
      public pickColor(activator: {node: HTMLElement}): void
      /**
       * Sets the default line color.
       *
       * @param color A Valid css color value.
       *
       */
      public setColor(color: string): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Set drawing line style.
       *
       * @param [activator]
       * @param [activator.node] Element that triggered this function.
       * @param [width="1"] Line width
       * @param [pattern="dotted"] Line pattern
       *
       */
      public setStyle(
        activator?: {
          node?: HTMLElement
        },
        width?: string,
        pattern?: string
      ): void
      /**
       * Update the component state with configuration. May be a drawing instance or
       * currentVectorParameters.
       *
       * @param config drawing instance or currentVectorParameters
       *
       */
      public sync(config: Object): void
      /**
       * Toggle active state of component instance.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param [forceValue=null] If set, will force the toggle to that value.
       *
       */
      public toggleActive(activator: {node: HTMLElement}, forceValue?: boolean): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-data-dialog&gt;</h4>
     *
     * Dialog form that allows users to upload CSV files to be loaded into the chart.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it imports data.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "import" |
     * | action | "click" |
     * | file | _file data_ |
     *
     * A custom event will be emitted from the component when it validates data.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "validate" |
     * | action | "click" |
     * | messageTitle | _validation message title_ |
     * | messageText | _validation message text_ |
     * | valid | _validation status_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class DataDialog extends CIQ.UI.DialogContentTag {
      /**
       * Aborts the import of a file.
       * If that is the only file loaded then the form will reset to its default state.
       * @param e Submit event
       *
       */
      public abortImport(e: Event): void
      /**
       * Closes dialog and resets it to the default state.
       *
       */
      public close(): void
      /**
       * Gets FormData from fields and appends that data to the CIQ.CSVReader.
       *
       */
      public getFormData(): void
      /**
       * Hides the dialog without clearing data.
       *
       */
      public hide(): void
      /**
       * Imports the data if the dialog is in a valid state.
       * Closes dialog after successfully importing data.
       * @param e Submit event. Default is prevented.
       *
       */
      public importData(e: Event): void
      /**
       * Parses files uploaded by the user.
       *
       */
      public loadData(): Promise<void>
      /**
       * Constructs and displays form for loaded files.
       *
       */
      public showData(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Custom validate method for the determining whether the data is ready to be submitted for import.
       * **NOTE** this validate method is for the form, not for validating files set on input
       * @return valid status
       *
       */
      public validate(): boolean
      /**
       * Validation function for File Input.
       * **NOTE** Not the same as the validation for the form
       * @return Funtion that runs on file input change event
       *
       */
      public validateFileInput(): Function
      /**
       * Displays or clears warning messages based on the validity of the form.
       *
       * @param title Title text of warning to display.
       * @param text Body text of warning to display.
       * @param valid Should be valid property from validiity
       *
       */
      public warn(title: string, text: string, valid: boolean): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-dialog&gt;</h4>
     *
     * Manages general dialog interaction such as display, hide, location, size, tap interaction, etc.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute       | description |
     * | :-------------- | :---------- |
     * | cq-title        | Display text in dialog heading. |
     * | cq-description  | Optional description of dialog. |
     * | cq-close-button | Set to "false" to hide the close (X) button in uppper right corner. Note: Users can still close the dialog by clicking outside of it or pressing the Esc key. |
     *
     * Initial attribute values can be configured in the context configuration.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is opened or closed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | effect | "hide", "show" |
     * | title | heading of dialog |
     * | type | tag name of dialog being wrapped |
     *
     * @example <caption>A dialog container</caption>
     *	<cq-dialog cq-timezone-dialog>
     *		<cq-timezone-dialog>
     *		 ...
     *		</cq-timezone-dialog>
     *	</cq-dialog>
     *
     * @example <caption>Configuring the attributes</caption>
     *	stxx.uiContext.config.dialogs.timezone = {
     *		tag: "cq-timezone-dialog",
     *		attributes: {
     *			"cq-title": "Choose Timezone",
     *			description: "To set your timezone use the location button below, or scroll through the following list..."
     *		}
     *	];
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Dialog extends CIQ.UI.BaseComponent {
      /**
       * Forces a title change, even if the title is the same as before.
       * Use this method to change the title of the dialog rather than just changing the cq-title attribute;
       *
       * @param title New title
       *
       */
      public setTitle(title: string): void
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Finds the first element in `items` that has a `cq-focused` attribute or a name attribute
       * that matches the value of `activeElementName`. If found, that element is focused.
       *
       */
      public refreshFocus(): void
      /**
       * Returns an array of dialog elements that are keyboard selectable.
       *
       * @return An array of DOM elements
       *
       */
      public getKeyboardSelectableItems(): NodeList
      /**
       * Handle the keystroke event to keyboard navigate the dialog.
       * Tab and Enter are supported.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * Hides the highlight on select because the study dialog contents re-render quite often, throwing off the highlight position (e.g. When a dropdown selection is made).
       * Called when dialog becomes keyboard navigable
       *
       */
      public onKeyboardSelection(): void
      /**
       * If we're using keyboard navigation, returns the highlight to the tab selected element.
       * Called when dialog is no longer keyboard navigable.
       *
       */
      public onKeyboardDeselection(): void
      /**
       * Click a keyboard selectable element.
       *
       * @param item Element to click.
       * @param e The keystroke event.
       * @param originationElement The keyboard active element which initiated the click.
       *
       */
      public clickItem(item: HTMLElement, e: Event, originationElement: HTMLElement): void
      /**
       * Handle escape key press.
       *
       * @param hub The hub that processed the key.
       * @return returns false if nothing was done.
       *
       */
      public processEsc(hub: CIQ.UI.KeystrokeHub): boolean
      /**
       * Close the active menu.
       *
       * @return returns true if a menu was closed.
       *
       */
      public closeActiveMenu(): boolean
      /**
       * Creates a new attribute to be activated when the dialog is open. Use this to style the dialog.
       * This is automatically set by any component that is derived from DialogContentTag.
       *
       * @param attribute The attribute to add or remove
       * @since  4.1.0
       * @example
       * <style> cq-dialog[cq-study-context]{ padding:0; } </style>
       * <cq-dialog cq-study-context></cq-dialog>
       *
       */
      public addActiveAttribute(attribute: string): void
      /**
       * Close the dialog and make it inactive.  Calls the `onClose()` function if it is defined on this component.
       * @param [propagate] True if child elements should also call onClose functions
       *
       */
      public close(propagate?: boolean): void
      /**
       * Hide the dialog.
       *
       */
      public hide(): void
      /**
       * Open the dialog.
       *
       * @param params Dialog parameters
       * @param params.caller The HTML element that triggered this dialog to open
       *
       */
      public open(params: {caller: HTMLElement}): void
      /**
       * Handles dialog resizing. Resizes child `cq-scroll` elements. Centers the dialog.
       *
       */
      public resize(): void
      /**
       * Show the dialog. Use X,Y *screen location* (pageX, pageY from an event) for where to display context menus. If the context menu cannot fit on the screen then it will be adjusted leftward and upward
       * by enough pixels so that it shows.
       * @param [params] Parameters
       * @param  [params.bypassOverlay=false] If true will not display the scrim overlay
       * @param [params.x] X location of top left corner. Use for context menus, otherwise dialog will be centered.
       * @param [params.y] Y location of top left corner. Use for context menus, otherwise dialog will be centered.
       *
       */
      public show(params?: {bypassOverlay?: Boolean, x?: Number, y?: Number}): void
      /**
       * Set context menu position to mouse location.
       *
       */
      public stxContextMenu(): void
      /**
       * Tap event handler for dialog.
       * Prevents touch and mouse events from propagating outside of the dialog.
       *
       * @param e tap event
       *
       */
      public tap(e: Event): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-drawing-context&gt;</h4>
     *
     * This component appears when a drawing is right-clicked.  A menu of actions are displayed relevant to that drawing.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when an action is clicked from the displayed menu.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect |  "editsettings", "edittext", "clone", remove", "layertop", "layerbottom", "layerup", "layerdown", or other custom action |
     * | action | "click" |
     * | item | _object on which the action occurs, usually a study descriptor_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 6.2.0
     * - 9.1.0 Added emitter.
     */
    class DrawingContext extends CIQ.UI.DialogContentTag {
      /**
       * Open the context menu as a dialog.
       *
       * @param params
       * @param params.x used to position the dialog
       * @param params.y used to position the dialog
       * @param params.drawing sets the `drawing` instance property
       * @param params.context passed to the components setContext method
       * @since 6.2.0
       *
       */
      public open(
        params: {
          x: number,
          y: number,
          drawing: CIQ.Drawing,
          context: CIQ.UI.Context
        }
      ): void
      /**
       * Called after an stxtap event is fired.
       * Emits the event for the action performed.
       *
       * @param effect What action was performed as a result of the stxtap event.
       *
       */
      public postProcess(effect: string): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-dropdown&gt;</h4>
     *
     * This component is a container of menu options which can be scrolled though and selected.  The component is typically revealed
     * after a cq-menu component is opened.  This component is usually nested within a `cq-menu` tag.
     * The items that are listed in the dropdown are specified in a configuration.  See example below.
     * To bind the component's configuration, set its `config` attribute to an object in the CIQ.UI.Context.config.menus object.
     *
     * This component automatically allows for scrolling through its elements, when the size of the list exceeds the dropdown's dimensions.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute   | description |
     * | :---------- | :---------- |
     * | maximize    | Set to true to have the dropdown extend in height to the height of the chart container even when there are not enough items in the dropdown to fill it. |
     * | noresize    | Set to true to prevent resizing of dropdown. Otherwise, sizing is based on number of elements in the dropdown. |
     * | config      | Key pointing to a component configuration entry which specifies the content items. |
     *
     * If no markup is specified in this component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
     * to be used.  In order to use the default markup, the selections in the menu must be configured in the context configuration file and specified
     * by key in the `config` attribute.  See example.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when an item in the component is toggled, selected, or edited.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect |  "toggle", "select", "edit" |
     * | action | "click" |
     * | menu | _menu element which owns this component_ |
     * | params | _properties set in configuration object for the item specified by the action_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Configuration**_
     *
     * Configuration is accomplished by setting up an object within the context configuration's menus object.  Each menu dropdown is assigned a unique name which is
     * itself an object property of the menus object.  This property name is used as the value of the `config` attribute of the owning menu component.
     * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
     * Each array element is an object which represents one item in the dropdown.  Let's call one of these array elements, `item`.
     * Each `item` has several properties which describe the nature of the dropdown item to display.  The following table of properties describes what they mean.
     *
     * | property    | description |
     * | :---------- | :---------- |
     * | type        | Describes what type of item to display.  Valid values are described in the table below. |
     * | label       | Text to display. |
     * | className   | Optional class name to apply to item. |
     * | active      | Set to true to manually set the active state on the item.  Note the active state is usually set with a bound value. |
     * | tap         | Name of helper function to execute when item is clicked. |
     * | setget      | Same as tap except used to bind values when `type` is `radio`, `switch`, or `checkbox`. |
     * | bind        | Name of helper function to execute when binding has changed.  This is not a common option. |
     * | options     | Name of helper function to execute when clicking the options icon, which only appears when this property is set. |
     * | iconCls     | Optional class name of an icon to display on the item. |
     * | value       | Array of arguments to pass to `tap`, `stxget`, or `bind` functions; or, name of component when `type="component"`. |
     * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
     * | attributes  | Object containing attributes for a `type="component"` item. |
     * | selector    | Used to specify the selector for `type="clickable"`. |
     * | method      | Used to specify the method for `type="clickable"`. |
     * | menuPersist | Normally menus close when selecting any item type besides `checkbox` or `switch`.  Setting this property to "true" will keep the menu from closing after selection. |
     * | filterFor   | A label to specify the element to filter.  The element to filter must also have its `filter-name` attribute set to this value.  If `filter-for` is omitted, will filter this element's next sibling. |
     * | filterMin   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
     * | helpId      | A key to the correct help text in CIQ.Help.Content. |
     *
     * Valid `type`s are described here:
     * | type      | description |
     * | :-------- | :---------- |
     * | item      | Standard text which when clicked will execute `tap` or `setget` action via a helper. |
     * | switch    | Same as item except value is bound and displayed with a slider switch. |
     * | checkbox  | Same as item except value is bound and displayed with a checkbox. |
     * | radio     | Same as item except value is bound and displayed with a radio. |
     * | clickable | Embeds a `cq-clickable` which executes an action, usually opening a dialog. |
     * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
     * | template  | Embeds markup specified with a `name` attribute equal to this component's `value` attribute. The markup to be embedded needs to be found in the document within a unique template which has the attribute `cq-dropdown-templates`. |
     * | component | Embeds a component specified by `value` with attributes specified by `attributes`.  |
     * | separator | Unclickable horizontal line, used to separate two menu sections. |
     *
     * @example <caption>Dropdown tag:</caption>
     * <cq-dropdown config="example"></cq-dropdown>
     * @example <caption>Sample configuration for the above dropdown tag:</caption>
     * stxx.uiContext.config.menus.example = {
     * 		content: [
     *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
     *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
     * 		]
     * };
     * @example <caption>Template example:</caption>
     * <!--
     * Given a configuration item as follows:
     * { type: "template", value: "my_template" }
     * -->
     * <template cq-dropdown-templates>
     * 		<div name="my_template">
     * 			Custom Dropdown Item
     * 		</div>
     * </template>
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 This new component supersedes `cq-menu-dropdown` component.
     */
    class Dropdown extends CIQ.UI.BaseComponent {
      /**
       * Sets up the binding for the dropdown item.
       *
       * @param elem Dropdown item to bind.
       * @param evtType Type of event to emit when the item is clicked.
       *
       */
      public bind(elem: HTMLElement, evtType: string): void
      /**
       * Remove keyboard navigation when item is clicked and its owning menu is hidden.
       *
       */
      public disablekeyboardNavigation(): void
      /**
       * Forces config attribute to change, even if the value of the config attribute didn't change.
       * This is useful if the underlying object representing the configuration did change.
       *
       */
      public fireConfigChange(): void
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Handler for keyboard interaction.
       * Arrow keys move around the dropdown, while `Space` or `Enter` will select.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * Builds a dropdown item when the `type="component"`.  Called by WebComponents.Dropdown#populate.
       *
       * @param name Component name.
       * @param [attributes] attribute settings for the component.
       *
       */
      public makeComponent(name: string, attributes?: object): void
      /**
       * If using keyboard navigation, return the highlight to the tab selected element.
       *
       */
      public onKeyboardDeselection(): void
      /**
       * Creates the dropdown items by parsing the configuration object and using the default markup to create each item.
       *
       */
      public populate(): void
      /**
       * Resizes a dropdown when the screen is resized, or even if the configuraton is reloaded to add or remove items.
       *
       */
      public resize(): void
      /**
       * Sets the active dropdown item to a certain location.  The dropdown will scroll if necessary.
       *
       * @param item Element to scroll to.
       *
       */
      public scrollToElement(item: HTMLElement): void
      /**
       * Gets the scroll implementation set in the UI configuration.  This is used to scroll the dropdown, if found.
       *
       * @return The scrolling implementation
       *
       */
      public scrollImplementation(): void
      /**
       * Sets the focus on a specific item in the dropdown.
       *
       * @param selector Element to focus.
       *
       */
      public setFocus(selector: HTMLElement): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-fib-settings-dialog&gt;</h4>
     *
     * Additional dialog for setting fibonacci tool settings, specifically what levels will be shown for the fibonacci drawings.
     *
     * A custom event will be emitted from the component when any of its fields are changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | type | _fibonacci drawing type_ |
     * | levels | _comma-delimited list of displayed levels_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 3.0.9
     * - 9.1.0 Added emitter.
     */
    class FibSettingsDialog extends CIQ.UI.DialogContentTag {
      /**
       * Adds a custom fib level
       *
       * @since 5.2.0
       */
      public add(): void
      /**
       * Fires a "change" event and closes the dialog.
       *
       * @since 6.2.0
       */
      public close(): void
      /**
       * Opens the dialog.
       *
       * @param  params Parameters
       * @param params.caller The HTML element that triggered this dialog to open
       *
       */
      public open(params: {caller: HTMLElement}): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-floating-window&gt;</h4>
     *
     * This component manages a "floating window" containing content.
     * A floating window can be moved around the screen within the boundaries of the context container.
     * It can also be resized on each edge and corner.  Finally, it can be collapsed and expanded via its title bar.
     *
     * Note that the actually window contents are not found within the DOM of this component; rather, this component has a
     * "windowImplementation" which points to the actual DOM element containing the window.
     * The implementation is of the class WebComponents.FloatingWindow.DocWindow.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 8.2.0
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class FloatingWindow extends CIQ.UI.ContextTag {
      /**
       * Initializes the context of the floating window component. Dynamically adds a listener for
       * the "floatingWindow" event based on the `type` parameter of the event (see
       * [floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener).
       *
       * @param context The chart user interface context.
       *
       * @since 8.2.0
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * The listener for "floatingWindow" events where the `type` parameter of the event is
       * "shortcut" (see
       * [floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener).
       *
       * Creates and positions a floating window for keyboard shortcuts.  This is a scrollable, informational window.
       *
       * @param params Listener parameters.
       * @param params.content The contents of the floating window, typically an HTML
       * 		string.
       * @param [params.container] The DOM element that visually contains the floating
       * 		window. The window is positioned on screen relative to the element (see
       * 		WebComponents.FloatingWindow.DocWindow#positionRelativeTo). Defaults to
       * 		`document.body`.
       * @param [params.title] Text that appears in the title bar of the floating window.
       * @param [params.width] The width of the floating window in pixels.
       * @param [params.status] The state of the floating window: true, to open the
       * 		window; false, to close it. If the parameter is not provided, the floating window is
       * 		toggled (opened if closed, closed if open).
       * @param [params.tag] A label that identifies the floating window type; for example,
       * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
       * 		legend. See the `tag` parameter of
       * 		[floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener.
       * @param [params.onClose] A callback to execute when the floating window is
       * 		closed.
       *
       * @since 8.2.0
       */
      public onShortcut(
        params: {
          content: string,
          container?: HTMLElement,
          title?: string,
          width?: number,
          status?: boolean,
          tag?: string,
          onClose?: Function
        }
      ): void
      /**
       * The listener for "floatingWindow" events where the `type` parameter of the event is
       * "documentation" (see
       * [floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener).
       *
       * Creates and positions a floating window for feature help documentation.  There is a buton in the window to activate the feature.
       *
       * @param params Listener parameters.
       * @param params.content The contents of the floating window, typically an HTML
       * 		string.
       * @param [params.container] The DOM element that visually contains the floating
       * 		window. The window is positioned on screen relative to the element (see
       * 		WebComponents.FloatingWindow.DocWindow#positionRelativeTo). Defaults to
       * 		`document.body`.
       * @param [params.title] Text that appears in the title bar of the floating window.
       * @param [params.width] The width of the floating window in pixels.
       * @param [params.targetElement] Element to set focus on when window is closed.
       * @param [params.actionButtons] Properties of the buttons which enable the feature.
       * @param [params.actionButtons.label] Text for the button.
       * @param [params.actionButtons.action] What happens when button is pressed.
       *        If "close", will close the window; if a function, will call that function.
       * @param [params.tag] A label that identifies the floating window type; for example,
       * 		"shortcut", which indicates that the floating window contains the keyboard shortcuts
       * 		legend. See the `tag` parameter of
       * 		[floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener.
       * @param [params.onClose] A callback to execute when the floating window is
       * 		closed.
       *
       * @since 8.2.0
       */
      public onDocumentation(
        params: {
          content: string,
          container?: HTMLElement,
          title?: string,
          width?: number,
          targetElement?: HTMLElement,
          actionButtons?: {
            label?: string,
            action?: string|Function
          },
          tag?: string,
          onClose?: Function
        }
      ): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-grid-size-picker&gt;</h4>
     *
     * Creates a `<cq-grid-size-picker>` web component.
     *
     * This component supports the following attributes:
     * | attribute | description |
     * | :-------- | :---------- |
     * | maxrows   | Maximum number of rows allowed |
     * | maxcols   | Maximum number of columns allowed |
     * | resize    | Set to fixed will always have picker table at fixed max size |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when a template or new size is picked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter  | this component |
     * | cause    | "useraction" |
     * | effect   | "update-grid" |
     * | action   | "click" |
     * | columns  | number of columns |
     * | rows     | number of rows |
     * | template | selected template |
     *
     * @example
     *		<cq-grid-size-picker maxrows="5" maxcols="5"></cq-grid-size-picker>
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since 7.2.0
     * @since 9.3.0 Added new emitter
     */
    class GridSizePicker extends CIQ.UI.BaseComponent {
      /**
       * Generates grid size picker table
       *
       * @param columns Table column count
       * @param rows Table row count
       *
       */
      public generateTable(columns: number, rows: number): void
      /**
       * Highlights provided number of rows and columns
       *
       * @param columns Columns to highlight
       * @param rows Rows to highlight
       *
       */
      public highlightTable(columns: number, rows: number): void
      /**
       * Applies highlight on the idenified template
       *
       * @param gridTemplate Template to highlight
       *
       */
      public highlightTemplate(gridTemplate: string|undefined): void
      /**
       * Removes unused rows and columns in the grid size picker table
       *
       * @param columns Columns to keep
       * @param rows Rows to keep
       *
       */
      public cleanTable(columns: number, rows: number): void
      /**
       * Returns the component content as a string to render it
       *
       * @returns Component content
       */
      public render(): string
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-heading&gt;</h4>
     *
     * In addition to representing the inner text of this component as an &lt;h4&gt; level header, this component also
     * allows one to filter what is displayed in a list of elements beneath another element in the DOM.  The filtering
     * is triggered by typing into to a search input.
     *
     * Note a MutationObserver is attached to the filterable element so if its contents change, this component will be
     * aware and render accordingly (see `filter-min` below).
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | filter-for   | A label to specify the element to filter.  The element to filter must also have its _filter-name_ attribute set to this value.  If _filter-for_ is omitted, will filter this element's next sibling. |
     * | filter-label | Text to put in the placeholder of the search input.  If omitted, will use "Search". |
     * | filter-min   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
     * | icon         | Optional icon class name to put on left of filter. |
     * | text         | Heading text.  Appears whether or not filtering is enabled. |
     *
     * Note that the `filter-for` attribute is disregarded if the component's `itemContainer` property is set.  This property should be set to a valid container selector if used.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component whenever the search input is changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "search" |
     * | action | "input" |
     * | value | _search string_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Study search filter</caption>
     * <cq-heading class="dropdown" filter-min="15" filter-for="studylist" text="Studies"></cq-heading>
     * <cq-studies filter-name="studylist">...</cq-studies>
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Heading extends CIQ.UI.BaseComponent {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Creates the component's markup.
       *
       */
      public build(): void
      /**
       * Formats the default markup, replacing any variables with the actual values provided by the attributes.
       *
       * @return The prepared markup
       *
       */
      public getMarkup(): string
      /**
       * Initializes the component's filter.
       *
       */
      public makeFilter(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-hu-dynamic&gt;</h4>
     *
     * This web component displays the dynamic heads up display.  This is a display of the market information at the point where the cursor lay.
     * The dynamic heads-up marker follows the mouse cursor.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since 7.5.0
     */
    class HeadsUpDynamic extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * Creates an instance of CIQ.UI.HeadsUp. Subscribes to the `headsUp` channel
       * which provides messages to start and stop the marker.
       *
       * @param context The chart user interface context.
       *
       * @since 7.5.0
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-hu-static&gt;</h4>
     *
     * This web component displays the static heads up display.  This is a display of the market information at the point where the cursor lay.
     * The static heads-up marker does not follow the mouse cursor; rather, it shows in a static location on the chart as a marker.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since 7.5.0
     */
    class HeadsUpStatic extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * Creates an instance of CIQ.UI.HeadsUp. Subscribes to the `headsUp` channel
       * which provides messages to start and stop the marker.
       *
       * @param context The chart user interface context.
       *
       * @since 7.5.0
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-help&gt;</h4>
     *
     * When long-pressed, this component can display help text. The text is displayed in a floating window popup over the chart.
     * The text which is discplayed is configured in the CIQ.Help namespace.
     * Sample help configuration is provided in the sample file in your library package, in /examples/help/helpContent.js.
     *
     * The long-press time is set in the [stxx.longHoldTime]https://documentation.chartiq.com/CIQ.ChartEngine.html#callbacks%5B%60longhold%60%5D function.
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
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
     *
     *	</cq-toggle>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Help extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Handler for beginning a long-press.
       *
       * @param evt The mousedown event
       *
       */
      public mouseTouchDown(evt: Event): void
      /**
       * Handler for ending a long-press.  If the threshold time is reached (`pressing` class remains set), the help display is triggered.
       *
       * @param evt The mousedown event
       *
       */
      public mouseTouchUp(evt: Event): void
      /**
       * Handler for keyboard interaction.
       *
       * Question mark `?` key will trigger the help for the active component, if available.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * Ensures that an instance of the [cq-floating-window]WebComponents.FloatingWindow
       * web component is available to handle event messaging and create the shortcuts legend floating
       * window.
       *
       * This function is called when the component's context is set (on load).
       *
       * @param stx The chart engine that provides the UI context, which contains the
       * [cq-floating-window]WebComponents.FloatingWindow web component.
       *
       * @since 8.4.0
       *
       */
      public ensureMessagingAvailable(stx: CIQ.ChartEngine): void
      /**
       * Adds class `help-available` if a property matching this element's help-id attribute
       * can be found in CIQ.Help.Content object. This class can be used to indicate that help
       * is available for the element.  For example, a small dot can be shown.
       *
       * @since 8.4.0
       *
       */
      public verifyHelpContent(): void
      /**
       * Called from mouseTouchUp, this method will send the help text to the floating window for display.
       *
       * @since 8.4.0
       *
       */
      public press(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-language-dialog&gt;</h4>
     *
     * Creates a dialog that the user can use to change the language.
     *
     * The actual language choices are obtained from CIQ.I18N.languages. Choosing a different language causes the entire
     * UI to be translated through use of the CIQ.I18N.setLanguage method.
     *
     * The `setHtmlLang` configuration property is used to control whether this component should change the page's default language,
     * To disable this functionality, set this attribute to false.  This can be done as illustrated in the example below,
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when a language is selected.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "change" |
     * | action | "click" |
     * | language | _language code_ |
     *
     * @example
     * <cq-dialog>
     *    <cq-language-dialog>
     *    </cq-language-dialog>
     * </cq-dialog>
     *
     * @example <caption>Adjust context config to not set &lt;html&gt; `lang` attribute</caption>
     * stxx.uiContext.config.setHtmlLang = false;
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 4.0.0 New component added.
     * - 4.1.0 Now it calls CIQ.I18N.localize instead of CIQ.I18N.setLocale.
     * - 9.1.0 Added emitter.
     * - 9.2.0 Added `cq-set-htmllang` attribute.
     */
    class LanguageDialog extends CIQ.UI.DialogContentTag {
      /**
       * Closes dialog box.
       *
       * @since 4.0.0
       */
      public close(): void
      /**
       * Opens the language dialog.
       *
       * @param [params] Contains the chart context.
       * @param [params.context] A context to set for the dialog. See
       * 		CIQ.UI.DialogContentTag#setContext.
       *
       * @since 4.0.0
       */
      public open(params?: {context?: CIQ.UI.Context}): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-loader&gt;</h4>
     *
     * CSS loading icon.
     * The component may be shown or hidden either by calling its `show()` or `hide()` methods; or by adding or removing the `stx-show` class.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     */
    class Loader extends CIQ.UI.ContextTag {
      /**
       * Shows the loading icon.
       *
       * @param [applyClass=false] Applies the ciq-loading-data class to the chart container, which by default dims the chart.
       *
       * @since 9.4.0 added applyClass parameter
       *
       */
      public show(applyClass?: boolean): void
      /**
       * Hides the loading icon.
       *
       */
      public hide(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-lookup&gt;</h4>
     *
     * This component presents a search input for the user to enter either a ticker symbol or a part
     * of the symbol's description.  Results of the search are presented in a dropdown for the user to choose.
     *
     * A CIQ.ChartEngine.Driver.Lookup must be connected to this web component. The lookup
     * driver searches financial exchanges for symbols that match the text entered in the
     * component's input field.
     *
     * The symbol lookup can be toggled using the Ctrl+Alt+S keystroke combination (see the
     * `symbolLookup` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
     *
     * A default lookup driver is specified in the chart configuration object (see the
     * <a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
     * tutorial).
     *
     * You can provide a different driver in the following ways:
     * - Assign the driver to the
     *   <a href="tutorial-Chart%20Configuration.html#lookupdriver" target="_blank">
     *   <code class="codeLink">lookupDriver</code></a> property of the chart configuration
     *   object
     * - Connect the driver to this component using
     *   [setDriver]WebComponents.Lookup#setDriver
     * - Add the driver to the UI context with CIQ.UI.Context#setLookupDriver
     *
     * **Note:** If the lookup component is unable to access a lookup driver, the component's
     * input field is active, but the component does not produce results.
     *
     * _**Keyboard control**_
     *
     * When selected with tab key navigation and activated with Return/Enter, this component has
     * the following internal controls:
     * - Up/Down arrow — Move selection between search input, filters, and search results
     * - Left/Right arrow — Switch between search result filters
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute            | description |
     * | :------------------- | :---------- |
     * | cq-keystroke-default | Enables the component to respond to keystrokes when the lookup input field does not have focus. <p style="margin-bottom: 0">**Warning:** This feature may conflict with keyboard shortcuts set in other components. |
     * | cq-uppercase         | Forces text to uppercase. |
     * | cq-exchanges         | Comma-delimited list of financial exchanges searched by the lookup driver. Overrides the `exchanges` parameter of CIQ.ChartEngine.Driver.Lookup. |
     *
     * In addition, the following attributes are also supported:
     * | attribute            | description |
     * | :------------------- | :---------- |
     * | cq-keystroke-claim   | Enables processing of keyboard input. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when a search is performed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "search" |
     * | action | "input" |
     * | value | _search string_ |
     * | filter | _filter_ |
     * | exchanges | _exchange list_ |
     *
     * A custom event will be emitted by the component when a result is selected.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | data | _symbol or symbolObject_ |
     *
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Customization**_
     *
     * - To hide the lookup results window, modify the CSS as follows:
     * ```css
     * .stxMenuActive cq-lookup-results { opacity: 0 }
     * ```
     *
     * - To preload default results (rather than an empty result pane) on initial load, set an
     * `onChartReady` handler in the chart configuration object (see the
     * <a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
     * tutorial); for example:
     *
     * ```
     * config.onChartReady = (stx) => {
     *     const defaultResults = [
     *         {
     *             "display": ["KW", "Kennedy - Wilson Holdings Inc", "NYSE"],
     *             "data": {
     *                 "symbol": "KW",
     *                 "name": "Kennedy - Wilson Holdings Inc",
     *                 "exchDisp ": "NYSE"
     *             }
     *         },
     *         {
     *             "display": ["RWR", "SPDR Series Trust - SPDR DJ Wilshire REIT ETF", "NYSEArca"],
     *             "data": {
     *                 "symbol": "RWR",
     *                 "name": "SPDR Series Trust - SPDR DJ Wilshire REIT ETF",
     *                 "exchDisp": "NYSEArca"
     *             }
     *         }
     *     ];
     *
     *     const UISymbolLookup = document.querySelector(".ciq-search cq-lookup");
     *     UISymbolLookup.results(defaultResults);
     * }
     * ````
     *
     * - The placeholder is programmatically set based on the width of the chart.
     * On larger screens "Enter Symbol" is used, but on smaller screens only "Symbol" is used.
     * As such, it is not sufficient to set a placeholder value on the HTML, as it will be overwritten by the Web Component logic.
     * The following script will update the placeholder according to breakpoint values set in placeholderMapping.
     * It should be placed inside the [onWebComponentsReady]{@tutorial Chart Configuration} callback provided in the
     * `defaultConfiguration` object to ensure it is executed once all Web Components have been properly initialized.
     * The approach here is to add a second breakpoint channel listener for the lookup component that overwrites the value set by default in the library.
     *
     * ```
     * function setLookupPlaceholders(placeholderMapping = {
     *     "break-lg": "Change symbol",
     *     "break-md": "+ symbol",
     *     "break-sm": ""
     *  }) {
     *   Array.from(uiContext.topNode.querySelectorAll('cq-lookup'))
     *   .forEach(el => {
     *         const { channels = {} } = el.context.config;
     *         el.channelSubscribe(
     *            channels.breakpoint || "channel.breakpoint",
     *            (breakPoint) => {
     *                     const symbolValue = placeholderMapping[breakpoint] || "Change symbol";
     *
     *                     const symbolInput = el.querySelector("input");
     *                     symbolInput.setAttribute("placeholder", symbolValue);
     *          );
     *        });
     *     });
     * }
     * setLookupPlaceholders();
     * ```
     *
     * @example <caption>Markup for lookup component</caption>
     * <cq-menu class="search ciq-lookup-icon" cq-focus="input" icon="ciq">
     * 		<cq-lookup cq-keystroke-claim cq-uppercase cq-exchanges="XNYS,XNAS,forex"></cq-lookup>
     * </cq-menu>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 4.0.0 Added optional `cq-uppercase` attribute.
     * - 7.4.0 Added optional `cq-exchanges` attribute.
     * - 8.3.0 Enabled internal keyboard navigation and selection.
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Lookup extends CIQ.UI.ContextTag {
      /**
       * Performs the search of symbols based on the parameters input.
       *
       * With the decoupling of the uiHelper to the Lookup.Driver you must be sure to include both an argument for maxResults and the closure to handle the results.
       * maxResults must either be a number or a string to result in default value of 100.
       *
       * @param value String to search for.
       * @param filter Name of exchange to limit results to.  The valid names are implementation-specific.
       *
       * @since 3.0.0
       */
      public acceptText(value: string, filter: string): void
      /**
       * Closes the results list dropdown and passes the chosen symbol to be loaded onto the chart.
       *
       * @param params
       * @param params.node The element within the results list containing the chosen result.
       *
       */
      public chooseResult(params: {node: HTMLElement}): void
      /**
       * Closes the results list dropdown.
       *
       */
      public close(): void
      /**
       * Takes whatever was input in the search box and uses it as the symbol to load the chart.
       *
       */
      public forceInput(): void
      /**
       * Creates the markup of the component, and sets up event handlers.
       *
       */
      public initialize(): void
      /**
       * Returns active state of the search input box.
       *
       * @return True if active
       *
       */
      public isActive(): boolean
      /**
       * Handler for keyboard interaction.
       *
       * Note that this captures keystrokes on the body. If the input box is focused then we need to allow the input box itself
       * to handle the strokes but we still want to capture them in order to display the lookup results. We first check
       * activeElement to see if the input is focused. If so then we bypass logic that manipulates the input.value. In order make
       * sure that the lookup menu is responding to an up-to-date input.value therefore we have to put all of those pieces of code
       * in setTimeout(0)
       *
       * Note that when comparisons are enabled, there are two Lookup components on the screen. Each keypress will therefore pass
       * through this function twice, once for each Lookup component. Only the active component will process the keystroke.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @param keystroke Contains status of function keys
       * @return true if keystroke was processed
       *
       */
      public keyStroke(
        hub: CIQ.UI.KeystrokeHub,
        key: string,
        e: Event,
        keystroke: CIQ.UI.Keystroke
      ): boolean
      /**
       * Opens the results list dropdown.
       *
       */
      public open(): void
      /**
       * Handler for when losing keyboard focus.
       *
       */
      public onKeyboardDeselection(): void
      /**
       * Handler for when gaining keyboard focus.
       *
       */
      public onKeyboardSelection(): void
      /**
       * Clear out the input and results list.
       *
       */
      public reset(): void
      /**
       * Displays an array of results returned by the CIQ.ChartEngine.Driver.Lookup.
       *
       * Each element in the array should be in the following format (see
       * CIQ.ChartEngine.Driver.Lookup#acceptText):
       * ```
       * {
       *     display: ["symbol ID", "symbol description", "exchange"],
       *     data: {
       *         symbol: "symbol ID",
       *         name: "symbol description",
       *         exchDis: "exchange"
       *     }
       * }
       * ```
       *
       * The lookup component by default displays three columns as represented by the array. The
       * data object can be a format required by your quote feed, or it can be a simple string
       * if you just need to support a stock symbol.
       *
       * @param arr The array of results.
       *
       */
      public results(arr: any[]): void
      /**
       * Accepts a new symbol or symbol object.
       *
       * @param data Contains a symbol or symbol object in a form accepted by
       * 		CIQ.ChartEngine#loadChart.
       * @param fn Function to execute when the callback set by
       * 		[setCallback]WebComponents.Lookup#setCallback finishes.
       *
       * @since 8.2.0 Removed the `params` parameter. Added the `fn` parameter.
       *
       */
      public selectItem(data: object, fn: Function): void
      /**
       * Sets a callback function to be called when the user selects a symbol.
       *
       * @param cb The callback function; for example, an implementation of
       * 		CIQ.UI.Context#changeSymbol.
       *
       */
      public setCallback(cb: Function): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Called for a registered component when the context is changed in a multichart environment.
       *
       * @param newContext The chart user interface context.
       *
       */
      public changeContext(newContext: CIQ.UI.Context): void
      /**
       * Connects a CIQ.ChartEngine.Driver.Lookup to the web component.
       *
       * The lookup driver searches financial exchanges for symbols that match the text entered
       * in the component's input field.
       *
       * @param driver The lookup driver to connect to the web
       * 		component.
       *
       */
      public setDriver(driver: CIQ.ChartEngine.Driver.Lookup): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-lookup-dialog&gt;</h4>
     *
     * This dialog allows the search and selection of securities to load on the chart.
     * It supports both primary and secondary series (comparison) selection.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | filter       | Security type filter for search results. |
     *
     * In addition, the following attributes are also supported:
     * | attribute        | description |
     * | :--------------- | :---------- |
     * | comparison       | INdicates that the dialog is for secondary series (comparisons). |
     * | cq-maintain-case | Set to something falsey to force capitalization of symbol. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component whenever the search input is changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "search" |
     * | action | "input" |
     * | value | _search string_ |
     *
     * A custom event will be emitted by the component whenever the search string is activated (the symbol is loaded).
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | symbol | _symbol_ |
     * | name | _symbol description_ |
     * | exchDisp | _symbol exchange_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 8.8.0
     * - 9.1.0 Added emitter.
     */
    class LookupDialog extends CIQ.UI.DialogContentTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Handles accepted text by the input and sends text to Lookup Driver.
       * Passes results to WebComponents.LookupDialog#results.
       *
       * @param value Input text
       *
       */
      public acceptText(value: string): void
      /**
       * Opens the dialog tag and displays it over the chart. Works with the dialog channel.
       * @param params Dialog box parameters.
       * @param params.context The chart user interface context.
       * @param [params.caller] caller element that triggered the opening.
       *
       * @since 9.0.0 respect caller element cq-maintain-case for symbols added from input box.
       */
      public open(params: {context: CIQ.UI.Context, caller?: HTMLElement}): void
      /**
       * Closes the dialog and resets the input.
       *
       */
      public close(): void
      /**
       * Hides the dialog.  This performs UI cleanup of the color picker.
       *
       */
      public hide(): void
      /**
       * Initializes the component the first time it has been opened.
       * Sets all the default markup and adds listeners.
       *
       */
      public initialize(): void
      /**
       * Resets the dialog back to its default state with no search results
       *
       */
      public reset(): void
      /**
       * Processes the results returned from the CIQ.ChartEngine.Driver.Lookup
       * @param resultsArr
       *
       */
      public results(resultsArr: object[]): void
      /**
       * Function that triggers when an item is selected from either the input or results list.
       *
       * @param value Either the value of the item selected or a symbolObject containing the symbol.
       *
       * @since 8.8.0 `value` param accepts a string or symbolObject.
       */
      public selectItem(value: string|object): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Sets a selected filter as the active filter that is applied to WebComponents.LookupDialog#acceptText
       *
       * @param e Emitted pointer event
       *
       */
      public setFilter(e: PointerEvent): void
      /**
       * Connects a CIQ.ChartEngine.Driver.Lookup to the web component.
       *
       * The lookup driver searches financial exchanges for symbols that match the text entered
       * in the component's input field.
       *
       * @param driver The lookup driver to connect to the web
       * 		component.
       *
       */
      public setDriver(driver: CIQ.ChartEngine.Driver.Lookup): void
      /**
       * Handle the keystroke event to keyboard navigate the dialog.
       * Arrow keys and Enter are supported.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-measurementline-settings-dialog&gt;</h4>
     *
     * Additional dialog for setting measurement line settings, specifically what is to appear in the callout for the measurement line drawing tool.
     *
     * A custom event will be emitted from the component when any of its fields are changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | field | _name of field toggled_ |
     * | value | _true or false_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 8.9.0
     * - 9.1.0 Added emitter.
     */
    class MeasurementlineSettingsDialog extends CIQ.UI.DialogContentTag {
      /**
       * Ensures that when the dialog is opened the input field is populated with the correct value.
       * Also installs a listener to report changes to the value so the drawing can get updated.
       *
       * @param params parameters
       * @param params.caller The HTML element that triggered this dialog to open
       * @since 8.9.0
       *
       */
      public open(params: {caller: HTMLElement}): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-menu&gt;</h4>
     *
     * When tapped/clicked, this component will reveal or hide a dropdown menu.
     * The component is represented by either text, an icon, both, or either depending on the browser dimensions.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute   | description |
     * | :---------- | :---------- |
     * | binding       | Helper function to call which will register a listener when the menu is opened/closed.  Usually used to reflect the current menu selection as text or an icon. |
     * | config        | Key pointing to a configuration file entry which specifies the menu options. |
     * | help-id       | A key to the correct help text in CIQ.Help.Content. |
     * | icon          | Class name for image to use for the menu. |
     * | reader        | Accessibility text when focused by a screen reader. If omitted, will use value of `text` attribute. |
     * | responsive    | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
     * | state         | The current state of the menu. |
     * | text          | Displayed label for this menu. |
     * | tooltip       | Text for the tooltip which appears when hovering over the component. |
     * | lift-dropdown | Lifts dropdown to the top level of the css stacking context. |
     *
     * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
     *
     * In addition, the following attributes are also supported:
     * | attribute   | description |
     * | :---------- | :---------- |
     * | cq-focus    | A selector to an element within the menu for which to provide focus. |
     * | cq-no-close | Set to true to force the menu to stay open when clicking on something in it (deprecated). |
     *
     * If no markup is specified in the menu component, a default markup will be provided.
     * In order to use the default markup, the selections in the menu's dropdown must be configured in the chart configuration file and specified
     * by key in the `config` attribute.  See example.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is opened or closed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "open", "close" |
     * | action | "click" |
     *
     * `cause` and `action` are set only when the menu is opened or closed as a direct result of clicking on the component.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Menu with binding:</caption>
     * <cq-menu class="nav-dropdown ciq-period" config="period" binding="Layout.periodicity" text="Periodicity"></cq-menu>
     * @example <caption>Menu with responsive icon:</caption>
     * <cq-menu class="nav-dropdown ciq-markers alignright" config="markers" text="Events" icon="events" responsive tooltip="Events"></cq-menu>
     * @example <caption>Sample configuration of a menu:</caption>
     * // set the menu component's config attribute to "example"
     * // This is documented further in the cq-dropdown component
     * stxx.uiContext.config.menus.example = {
     * 		content: [
     *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
     *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
     * 		]
     * };
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Menu extends CIQ.UI.BaseComponent {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Closes the menu.  This call will be passed to the UI Manager to close any parent menus.
       *
       */
      public close(): void
      /**
       * Returns the menu to its collapsed state.  This will restore any lifts as well.
       * This is called indirectly by WebComponents.Menu#close.
       *
       */
      public hide(): void
      /**
       * Repositions any menus which are nested within another menu or dialog so that they do not get cut off by their container's
       * boundaries.  Lifts are menu dropdowns which have an attribute `cq-lift`.
       *
       */
      public lift(): void
      /**
       * Computes the positioning for lifted menu dropdowns.
       *
       */
      public adjustLiftPosition(): void
      /**
       * Callback handler for when the keyboard navigation is removed from the element.
       * This implementation closes the menu.
       *
       */
      public onKeyboardDeselection(): void
      /**
       * Opens the menu.  This call will be passed to the UI Manager to handle any overhead associated with menu opening.
       *
       * @param params Menu configuration parameters
       * @param params.e The event triggering the menu open.
       *
       */
      public open(params: {e: Event}): void
      /**
       * Sets the content.
       *
       * @param content Menu content.
       * @param [lift] Set to true to lift the menu dropdown.
       *
       */
      public setContent(content: object[], lift?: boolean): void
      /**
       * Sets the aria-pressed attribute.
       *
       * @param [on] Set to true to set the aria attribute.
       *
       */
      public setAriaPressed(on?: boolean): void
      /**
       * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
       *
       */
      public setMarkup(): void
      /**
       * Expands the menu.
       * This is called indirectly by WebComponents.Menu#open.
       *
       */
      public show(): void
      /**
       * Handler for the stxtap event which is fired in non-capture mode.  This means it fires after WebComponents.Menu@captureTap.
       * Will alternate between opening and closing the menu.
       *
       * @param e Event
       *
       */
      public tap(e: Event): void
      /**
       * Restores any menus that were lifted using WebComponents.Menu#lift.
       * This is usually done automatically when the menu is closed.
       *
       */
      public unlift(): void
    }
    /**
     *
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
     * To trigger the notification event, call CIQ.ChartEngine#dispatch with the
     * "notification" type and the required notification listener data (see
     * [notificationEventListener]CIQ.ChartEngine~notificationEventListener), for example:
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
     * [notificationEventListener]CIQ.ChartEngine~notificationEventListener argument.
     *
     * _**Attributes**_:
     *
     * | Name | Description | Valid Values |
     * | ---- | ----------- | ------------ |
     * | `default-display-time` | Amount of time, in seconds, toasts are displayed before being automatically dismissed (removed from the display). | Integer numbers >= 0. A value of 0 causes toasts to remain on screen — blocking the toast display queue — until selected by the user. |
     * | `default-position` | Vertical on-screen position of toasts relative to the chart. (Toasts are centered horizontally.) | "top" or "bottom" |
     * | `default-transition` | Animation used to display and dismiss toasts. | "fade", "slide", "pop" or "drop" | The default is no transition.
     *
     * **Note:** All attributes can be overridden by the argument provided to
     * [notificationEventListener]CIQ.ChartEngine~notificationEventListener.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when a toast message is dismissed due to either:
     * - click (user interaction)
     * - alert (internal removal request)
     * - timeout (expiration)
     *
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 8.2.0 Added
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class MessageToaster extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Updates the position settings of all toasts (all DOM elements with class
       * `cq-toast-message`), including those not currently displayed, when the chart is resized.
       *
       * @since 8.2.0
       */
      public handleResize(): void
      /**
       * Sets the display position of the toast identified by `messageElement` within the bounds of
       * the chart canvas. Centers the toast horizontally and positions it vertically based on the
       * toast's <a href="WebComponents.MessageToaster.html#createMessageElement">
       * <code class="codeLink">position</code></a> setting.
       *
       * @param messageElement The toast DOM element to position.
       *
       * @since 8.2.0
       */
      public positionElement(messageElement: HTMLElement): void
      /**
       * Creates a new toast DOM element. Toast elements have the `cq-toast-message` class attribute.
       *
       * @param notification Data object from a "notification" event. See
       * 		[notificationEventListener]CIQ.ChartEngine~notificationEventListener.
       * 		<p>**Note:** This parameter does not accommodate the string type specified in
       * 		[notificationEventListener]CIQ.ChartEngine~notificationEventListener.
       * @param notification.message Text to display in the toast notification. Strings
       * 		longer than 160 characters are truncated.
       * @param [notification.position="top"] Position of the toast on the chart: "top" or
       * 		"bottom". Overrides the `default-position` attribute of the
       * 		[`<cq-message-toaster>`]WebComponents.MessageToaster element.
       * @param [notification.type="info"] Toast style: "info", "error", "warning", or
       * 		"confirmation". Overrides the `default-transition` attribute of the
       * 		[`<cq-message-toaster>`]WebComponents.MessageToaster element.
       * @param [notification.transition] Type of animation used to display and dismiss the
       * 		toast: "fade", "slide", "pop" or "drop". The default is no transition.
       * @param [notification.displayTime=10] Number of seconds to display the toast before
       * 		automatically dismissing it. A value of 0 causes the toast to remain on
       * 		screen&nbsp;—&nbsp;preventing other toasts from
       * 		displaying&nbsp;—&nbsp;until the toast is selected by the user. Overrides the
       * 		`default-display-time` attribute of the
       * 		[`<cq-message-toaster>`]WebComponents.MessageToaster element.
       * @param [notification.priority=0] Priority of the toast relative to others in the
       * 		display queue. Higher priority toasts are displayed before toasts with lower priority.
       * 		For example, a toast with priority&nbsp;=&nbsp;4 is displayed before a toast with
       * 		priority&nbsp;=&nbsp;1. Toasts with the same priority are displayed in the order
       * 		they were created; that is, in the order they entered the display queue.
       * @param [notification.callback] Function to call when the toast is selected
       * 		(dismissed) by the user. If the toast is dismissed automatically (see `displayTime`),
       * 		this function is not called.
       * @return A toast DOM element.
       *
       * @since 8.2.0
       */
      public createMessageElement(
        notification: {
          message: string,
          position?: string,
          type?: string,
          transition?: string,
          displayTime?: number,
          priority?: number,
          callback?: Function
        }
      ): HTMLElement
      /**
       * Displays the next toast in the display queue and sets a timer based on the toast
       * <a href="WebComponents.MessageToaster.html#newMessage"><code class="codeLink">
       * displayTime</code></a> property to automatically dismiss the toast.
       *
       * @since 8.2.0
       */
      public displayNextMessage(): void
      /**
       * Removes the toast specified by `messageNode` from the display queue and displays the next
       * message in the queue.
       *
       * @param messageNode The toast to remove from the display queue.
       * @param [reason] The reason for the removal. Ex: "click" or "timeout".
       *
       * @since 8.2.0
       */
      public removeMessageNode(messageNode: HTMLElement, reason?: string): void
      /**
       * Removes the toast specified by `messageNode` from the DOM but not from the display queue.
       *
       * Use this function to interrupt a toast and display one of higher priority. The interrupted
       * toast is re-displayed by the next call to
       * [displayNextMessage](WebComponents.MessageToaster.html#displayNextMessage).
       *
       * @param messageNode The toast to recall.
       *
       * @since 8.2.0
       */
      public recallMessageNode(messageNode: HTMLElement): void
      /**
       * Creates a new toast and adds it to a queue that determines the display sequence of
       * concurrent toasts.
       *
       * This function is the "notification" event listener. See
       * [notificationEventListener]CIQ.ChartEngine~notificationEventListener.
       *
       * @param notification Either an object containing data relevant to the
       * 		notification event or a string that identifies a property of the `systemMessages`
       * 		property of the chart configuration object. The property contained in `systemMessages`
       * 		is an object literal that specifies data relevant to the notification event (see
       * 		<a href="tutorial-Chart%20Configuration.html#systemmessages" target="_blank">
       * 		<code class="codeLink">systemMessages</code></a> in the
       * 		<a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
       * 		tutorial).
       * @param notification.message Text to display in the toast notification. Strings
       * 		longer than 160 characters are truncated.
       * @param [notification.position="top"] Position of the toast on the chart: "top" or
       * 		"bottom". Overrides the `default-position` attribute of the
       * 		[`<cq-message-toaster>`]WebComponents.MessageToaster element.
       * @param [notification.type="info"] Toast style: "info", "error", "warning", or
       * 		"confirmation". Overrides the `default-transition` attribute of the
       * 		[`<cq-message-toaster>`]WebComponents.MessageToaster element.
       * @param [notification.transition] Type of animation used to display and dismiss the
       * 		toast: "fade", "slide", "pop" or "drop". The default is no transition.
       * @param [notification.displayTime=10] Number of seconds to display the toast before
       * 		automatically dismissing it. A value of 0 causes the toast to remain on
       * 		screen&nbsp;—&nbsp;preventing other toasts from
       * 		displaying&nbsp;—&nbsp;until the toast is selected by the user. Overrides the
       * 		`default-display-time` attribute of the
       * 		[`<cq-message-toaster>`]WebComponents.MessageToaster element.
       * @param [notification.priority=0] Priority of the toast relative to others in the
       * 		display queue. Higher priority toasts are displayed before toasts with lower priority.
       * 		For example, a toast with priority&nbsp;=&nbsp;4 is displayed before a toast with
       * 		priority&nbsp;=&nbsp;1. Toasts with the same priority are displayed in the order
       * 		they were created; that is, in the order they entered the display queue.
       * @param [notification.callback] Function to call when the toast is selected
       * 		(dismissed) by the user. If the toast is dismissed automatically (see `displayTime`),
       * 		this function is not called.
       *
       * @since
       * - 8.2.0
       * - 8.4.0 Calling this method with a message that is already displayed or in the queue
       * 		will return without doing anything.
       */
      public newMessage(
        notification: {
          message: string,
          position?: string,
          type?: string,
          transition?: string,
          displayTime?: number,
          priority?: number,
          callback?: Function
        }
      ): void
      /**
       * Dismisses a message by removing it from the queue (including if it is already displayed).
       *
       * @param message The message to dismiss.
       *
       * @since 8.4.0
       */
      public dismissMessage(message: string): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-palette&gt;</h4>
     *
     * Provides a palette to dock alongside the chart or float above it. Palette components must be
     * placed within a `<cq-palette-dock>` component.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute   | description |
     * | :---------- | :---------- |
     * | docked      | The docked state of the palette. Set to "false" to float palette over the chart. |
     * | orientation | Accepted values are "horizontal" and "vertical". Vertical palettes dock to the left of the chart. Horizontal palettes dock to the top. |
     *
     * In addition, the following attributes are also supported:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | min-height   | Minimum height, in pixels, to display if not enough content. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it is docked, detached.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "dock", "detach" |
     * | action | "click" |
     *
     * A custom event will be emitted from the component when it is moved while undocked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "reposition" |
     * | action | "drag" |
     * | x | _x coordinate_ |
     * | y | _y coordinate_ |
     *
     * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
     *
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 7.2.0
     * - 9.1.0 Observes attributes. Added emitter.
     *
     * @example
     * <cq-palette docked="true" orientation="horizontal" min-height="40">
     *    <div class="palette-container">
     *        <div class="drag-strip"></div>
     *            ...
     *        <div class="resize-strip"></div>
     *    </div>
     * </cq-palette>
     */
    class Palette extends CIQ.UI.BaseComponent {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Sets dragging property in dock for this palette for mouse and touch events.
       *
       * @param method Optional type of drag action, either "dragging" (default) or resizing
       * @param event Event that triggerd this function
       *
       */
      public handleDragResize(method: string, event: object): void
      /**
       * Overridden by child objects to respond to messaging sent from other palettes
       *
       * @param id Identifier for the message
       * @param message Optional data accompanying the message
       *
       */
      public handleMessage(id: string, message: object | string): void
      /**
       * Detach palette from dock, positioning it over the chart.
       *
       * @param xPos X coordinate of palette relative to palette dock.
       * @param yPos Y coordinate of palette relative to palette dock.
       * @param scale Palette height relative to its current height.
       *
       */
      public detach(xPos: number, yPos: number, scale: number): void
      /**
       * Fix palette position along edge of chart.
       *
       */
      public dock(): void
      /**
       * Get the current height of the palette.
       *
       * @return The element height in pixels.
       *
       */
      public getHeight(): number
      /**
       * Get the current width of the palette.
       *
       * @return The element width in pixels.
       *
       */
      public getWidth(): number
      /**
       * Get the offset position of the palette and call setTransformPosition
       * to clamp the palette position in the event of a chartContainer resize
       *
       */
      public checkPosition(): void
      /**
       * Set the palette transform position clamping palette within the chart area.
       * Calls `setTransform`.
       *
       * @param x X coordinate of palette relative to palette dock.
       * @param y Y coordinate of palette relative to palette dock.
       *
       */
      public setTransformPosition(x: number, y: number): void
      /**
       * Set the palette transform property explicitly.
       *
       * @param x X coordinate of palette relative to palette dock.
       * @param y Y coordinate of palette relative to palette dock.
       *
       */
      public setTransform(x: number, y: number): void
      /**
       * Set the palette height property based on location.
       *
       * @param yPosition Y coordinate of palette bottom
       *
       */
      public setHeightToPosition(yPosition: number): void
      /**
       * Set the palette height property relative to its current height property.
       * For example, a scale of 0.5 will set the palette height to one half of its
       * current height.
       *
       * @param scale Size multiplier.
       *
       */
      public setHeightByScale(scale: number): void
      /**
       * Set the palette height property explicitly.
       *
       * @param nextHeight Height in pixels.
       *
       */
      public setHeight(nextHeight: number): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-palette-dock&gt;</h4>
     *
     * This is a container for `<cq-palette>` components. Provides docking and dragging capabilities to child
     * palettes.
     *
     * The `<cq-palette-dock>` element does not wrap the chart. It must be a sibling of the chart
     * container.
     *
     * @example
     * <cq-palette-dock>
     *    <div class="palette-dock-container">
     *        ...
     *    </div>
     * </cq-palette-dock>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since 7.2.0
     */
    class PaletteDock extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Indicate a palette is presently in dragging mode
       * Extends overlay via css in dragging mode to capture mouse position
       *
       * @param palette Palette to start dragging
       * @param paletteMode "dragging"
       *
       */
      public startDrag(palette: HTMLElement, paletteMode: string): void
      /**
       * Stop the drag mode
       *
       * @param e Event representing end of operation (mouseup, touchend).
       *
       */
      public stopDrag(e: Event): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-redo&gt;</h4>
     *
     * This component will redo an undone drawing.  This works with complementary component [cq-undo]WebComponents.Undo.
     *
     * @example
     * <cq-undo-section>
     *     <cq-undo class="ciq-btn">Undo</cq-undo>
     *     <cq-redo class="ciq-btn">Redo</cq-redo>
     * </cq-undo-section>
     * @extends CIQ.UI.ContextTag
     * @protected
     */
    class Redo extends CIQ.UI.ContextTag {
      /**
       * Finds WebComponents.Undo and pairs with it to find the last undo and reverse it.
       * @param undo A cq-undo webcomponent
       * @example
       * document.querySelector("cq-redo").pairUp(document.querySelector("cq-undo"));
       *
       */
      public pairUp(undo: WebComponents.Undo): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-scroll&gt;</h4>
     *
     * This component creates a scrollable container, which resizes itself when the screen
     * is resized. If CIQ.UI.scrollbarStyling is initialized to a scrollbar implementation (such as
     * PerfectScrollbar), the scrollbar implementation replaces the native scrollbar.
     *
     * _**Attributes**_
     *
     * This component supports the following attributes:
     * | attribute      | description |
     * | :------------- | :---------- |
     * | cq-no-claim    | Do not apply any keystroke capturing |
     * | cq-no-maximize | Do not automatically maximize the height (but keep it showing on screen) |
     * | cq-no-resize   | Do not apply any sizing logic |
     * | cq-max-height  | Maximum height |
     *
     * _**Keyboard Control**_
     *
     * When selected with tab key navigation and activated with Return/Enter, this component has the
     * following internal controls:
     * | key              | action |
     * | :--------------- | :----- |
     * | Up/Down arrow    | Move selection between internal cq-item elements. |
     * | Left/Right arrow | Select a control within a selected element. |
     *
     * @example
     * <cq-lookup-results>
     *     <cq-lookup-filters cq-no-close>
     *         <cq-filter class="true">ALL</cq-filter>
     *         <cq-filter>STOCKS</cq-filter>
     *         <cq-filter>FX</cq-filter>
     *         <cq-filter>INDEXES</cq-filter>
     *         <cq-filter>FUNDS</cq-filter>
     *         <cq-filter>FUTURES</cq-filter>
     *     </cq-lookup-filters>
     *     <cq-scroll></cq-scroll>
     * </cq-lookup-results>
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 6.1.0 Added `cq-no-claim` attribute.
     * - 8.3.0 Enabled internal keyboard navigation and selection.
     */
    class Scroll extends CIQ.UI.BaseComponent {
      /**
       * Returns the focused element or null. An item is focused if it has
       * attribute cq-focused.
       *
       * @return The element or null
       *
       */
      public focused(): HTMLElement
      /**
       * Handler for keyboard interaction.
       *
       * Scroll components can handle up and down enter keystrokes.
       * They do not register for claims directly. Another section of code must
       * establish the claim on their behalf or proxy the keystroke.
       *
       * Up and Down arrows will iterate through the scrollable elements. The attribute
       * cq-focused will be added to the currently focused tag. This can then be
       * queried later, such as when a user hits enter.
       *
       * Left and Right arrows will iterate through the elements on the focused scrollable element,
       * such as Remove and Edit buttons. Child elements must have the attribute `keyboard-selectable-child`
       * set to "true" to be selectable with these keys.
       *
       * Space bar or Enter will call the selectFC callback on the element if it exists.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * Overrides [focusItem](CIQ.UI.BaseComponent.html#focusItem) in
       * [CIQ.UI.BaseComponent]CIQ.UI.BaseComponent.
       *
       * Scrolls to an item and gives the item focus.
       *
       * @param item The element to scroll to and focus. Must be a child of this component.
       *
       * @since 8.3.0
       */
      public focusItem(item: HTMLElement): void
      /**
       * If we're using keyboard navigation, returns the highlight to the tab selected element.
       *
       */
      public onKeyboardDeselection(): void
      /**
       * Resizes the componewnt when the screen is resized, or even if the configuraton is reloaded to add or remove items.
       *
       */
      public resize(): void
      /**
       * Scrolls to an element.
       *
       * @param item The element to scroll to. Must be a child of this component.
       *
       */
      public scrollToElement(item: HTMLElement): void
      /**
       * Scroll back to top
       *
       */
      public top(): void
      /**
       * Scroll back to top (calls `top()`).
       *
       */
      public scrollToTop(): void
      /**
       * Refreshes the scrollbar, if CIQ.UI.scrollbarStyling is enabled.
       *
       * @since 7.2.0
       *
       */
      public refresh(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-share-button&gt;</h4>
     *
     * Button that opens a dialog that can be used to share a chart.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute      | description |
     * | :------------- | :---------- |
     * | help-id        | A key to the correct help text in CIQ.Help.Content. |
     * | icon           | Class name for image to use. |
     * | reader         | Accessibility text when focused by a screen reader. |
     * | responsive     | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
     * | text           | Displayed label for this button. |
     * | tooltip        | Text for the tooltip which appears when hovering over the component. |
     *
     * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when button is pressed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "click" |
     * | action | "click" |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Button with responsive icon:</caption>
     * <cq-share-button class="bottom" text="Share" icon="share" responsive tooltip="Share"></cq-share-button>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.0.0 Added functionality to export layouts to social media services.
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class ShareButton extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Formats the default markup, replacing any variables with the actual values provided by the attributes.
       *
       * @return The prepared markup
       *
       */
      public getMarkup(): string
      /**
       * Called when an attribute changes, will regenerate the shareButton component,
       * updating whatever needs to be updated as a result of the attribute change.
       *
       */
      public reset(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Opens a customizable dialog that can share a chart.
       *
       */
      public tap(): void
      /**
       * Used to extract a shareID from the clipboard content.
       *
       */
      public getClipboard(): Promise<void>
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-share-dialog&gt;</h4>
     *
     * Dialog form that allows users share/post their charts to a remote service, such as social media or a file server.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when data is generated for sharing.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" or "auto" |
     * | effect | "share" or "id" |
     * | action | "click" or null |
     * | value | _link to image, or id_ |
     *
     * A custom event will be emitted from the component when data is copied to the clipboard.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "copy" |
     * | action | "click" |
     * | value | _contents of clipboard_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 9.0.0 Added functionality to export layouts to social media services.
     * - 9.1.0 Added emitter.
     */
    class ShareDialog extends CIQ.UI.DialogContentTag {
      /**
       * Opens the share dialog.
       *
       * @param params
       * @param [params.context] A context to set. See
       * 		[setContext]CIQ.UI.DialogContentTag#setContext.
       *
       */
      public open(params: {context?: CIQ.UI.Context}): void
      /**
       * Creates an image of the chart.
       *
       * @return
       * @async
       *
       */
      public createImage(): Promise<void>
      /**
       * Function for copying PNG image.
       * @param activator
       * @param activator.node The button which was tapped to execute this function
       *
       * @since 9.2.0
       */
      public copy_image(activator: {node: HTMLElement}): void
      /**
       * Function for copying chart layout.
       * @param activator
       * @param activator.node The button which was tapped to execute this function
       *
       * @since 9.2.0
       */
      public copy_layout(activator: {node: HTMLElement}): void
      /**
       * Copies the chart image or layout ID to the clipboard.
       *
       * @param type image|layout
       *
       */
      public copy(type: String): void
      /**
       * Loads a chart from a provided layout ID.
       *
       * @param response
       * @param response.e The event triggering the load.
       *
       */
      public loadChart(response: {e: Event}): void
      /**
       * Shows the appropriate "tab" in the dialog, whether for sharing a chart or an image.
       *
       * @param type "id" or "image".
       *
       */
      public activateTab(type: string): void
      /**
       * Shares the layout ID to a social media service.
       *
       * @param source Indicates a cause for the sharing.  Used in the emitter.
       * @async
       *
       */
      public shareChartID(source: string): Promise<void>
      /**
       * Open Microsoft Teams dialog area.
       *
       */
      public openTeamsDialog(): void
      /**
       * Close Microsoft Teams dialog area.
       *
       */
      public closeTeamsDialog(): void
      /**
       * Update Microsoft Teams posting link.
       *
       * @param e Input event
       *
       */
      public updateTeamsLink(e: Event): void
      /**
       * Update social media posting link.
       *
       * @param type "layout" or "image".
       * @param encodedMessage URI-encoded data to post.
       *
       */
      public updateSocialLinks(type: string, encodedMessage: string): void
      /**
       * Shares the image PNG to a social media service.
       *
       * @param source Indicates a cause for the sharing.  Used in the emitter.
       * @async
       *
       */
      public shareChartImage(source: string): Promise<void>
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-show-range&gt;</h4>
     *
     * This component is a container of options which allow selection of a chart's date range.  These ranges end at the present time, and begin at various
     * other times which can be programmed in the component's configuration (see example below).
     * To bind the component's configuration, set its `config` attribute to an object in the CIQ.UI.Context.config.groups object.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute   | description |
     * | :---------- | :---------- |
     * | config      | Key pointing to a component configuration entry which specifies the content items. |
     *
     * If no markup is specified in this component, a default markup will be provided.  In order to use the default markup, the selections in the menu
     * must be configured in the context configuration file and specified by key in the `config` attribute.  See example.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when that action is triggered on an item.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect |  "select" |
     * | action | "click" |
     * | multiplier | _multiplier_ |
     * | base | _base_ |
     * | periodicity | { inteval: _interval_, period: _period_, timeUnit: _timeUnit_ } |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Configuration**_
     *
     * Configuration is accomplished by setting up an object within the context configuration's groups object.  Each configuration is assigned a unique name which is
     * itself an object property of the groups object.  This property name is used as the value of the `config` attribute of this component.
     * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
     * Each array element is an object which represents one item in the group.  Let's call one of these array elements, `item`.
     * Each `item` has several properties which describe the nature of the range to display.  The following table of properties describes what they mean.
     *
     * | property    | description |
     * | :---------- | :---------- |
     * | type        | Describes what type of item to display.  Valid values are described in the table below. |
     * | label       | Text to display. |
     * | className   | Optional class name to apply to item. |
     * | tap         | Name of helper function to execute when item is clicked. |
     * | iconCls     | Optional class name of an icon to display on the item. |
     * | value       | Array of arguments to pass to `tap` function. |
     * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
     * | helpId      | A key to the correct help text in CIQ.Help.Content. |
     * | id          | DOM id for the item. |
     *
     * Valid `type`s are described here:
     * | type      | description |
     * | :-------- | :---------- |
     * | item      | Standard text which when clicked will execute `tap` action via a helper. |
     * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
     * | separator | Unclickable vertical line, used to separate two menu sections. |
     *
     * @example <caption>Show Range tag:</caption>
     * <cq-show-range config="example"></cq-show-range>
     * @example <caption>Sample configuration for the above tag:</caption>
     * stxx.uiContext.config.groups.example = {
     * 		content: [
     *			{ type: "item", label: "1D", tap: "set", value: [1, "today"] },
     *			{ type: "item", label: "1M", tap: "set", value: [1, month", 30, 8, "minute"] }
     * 		]
     * };
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class ShowRange extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Creates the group items by parsing the configuration object and using the default markup to create each item.
       *
       */
      public populate(): void
      /**
       * Proxies UI requests for span changes to the chart engine.
       *
       * Usage Examples:
       * - `set(5,'day',30,2,'minute')` means that you want to combine two 30-minute bars into a single candle.
       *   - So your quote feed must return one data object for every 30 minutes. A total of 2 data points per hour.
       * - `set(5,'day',2,30,'minute')` means that you want to combine thirty 2-minute bars into a single candle.
       *   - So your quote feed must return one data object for every 2 minutes. A total of 30 data points per hour.
       * - `set(5,'day', 1, 60,'minute')` means that you want to combine sixty 1-minute bars into a single candle.
       *   - So your quote feed must return one data object for every minute . A total of 60 data points per hour.
       * - `set(5,'day', 60, 1,'minute')` means that you want to have a single 60 minute bar per period.
       *   - So your quote feed must return one data object for every 60 minutes . A total of 1 data point per hour.
       *
       * @param activator Activation information
       * @param multiplier   The period that will be passed to CIQ.ChartEngine#setSpan
       * @param base The interval that will be passed to CIQ.ChartEngine#setSpan
       * @param [interval] Chart interval to use (leave empty for autodetect)
       * @param [period] Chart period to use (leave empty for autodetect)
       * @param [timeUnit] Chart timeUnit to use (leave empty for autodetect)
       *
       * @since 5.1.1 timeUnit added
       */
      public set(
        activator: Object,
        multiplier: Number,
        base: Number,
        interval?: Number,
        period?: Number,
        timeUnit?: Number
      ): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-side-nav&gt;</h4>
     *
     * Responds to the `breakpoint` and `sidenav` channels to control side navigation panel
     * availability.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since 7.5.0
     */
    class SideNav extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * Subscribes to the `sidenav`, `breakpoint`, and `tfc` channels. Sets the side navigation
       * availability based on the contents of the channels.
       *
       * @param context The chart user interface context.
       *
       * @since 7.5.0
       */
      public setContext(context: CIQ.UI.Context): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-side-panel&gt;</h4>
     *
     * This component is a container for one or more plugins that render to the "side" of the chart.
     * It controls its own visibility as well as the visibility of the plugins within it.
     *
     * Use component's open() and close() methods to show and hide.
     *
     * _**Attributes**_
     *
     * The following attributes are supported:
     * | attribute       | description |
     * | :-------------- | :---------- |
     * | cq-active       | Reflects the shown/hidden status of the component. Read only. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component whenever the component is opened or closed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "channel" |
     * | effect | "open", "close" |
     * | action | null |
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     */
    class SidePanel extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Closes the side panel and all of its child plugins.
       *
       */
      public close(): void
      /**
       * Use this method to get the width instead of querying the node directly because the side panel may be animated.
       *
       * @return The width
       *
       */
      public nonAnimatedWidth(): number
      /**
       * Opens the side panel to show more plugins.
       *
       * @param  params Parameters
       * @param params.selector The selector for which child to enable.
       * @param [params.className] The class name to add to turn on the panel.
       * @param [params.attribute] The attribute to add to turn on the panel.
       *
       */
      public open(
        params: {
          selector: string,
          className?: string,
          attribute?: string
        }
      ): void
      /**
       * Sets any callback to be executed when the side panel resizes.
       *
       * @param fc Callback function.
       *
       */
      public registerCallback(fc: Function): void
      /**
       * Resizes this component.
       * Any registered callbacks will execute after the width adjustment.
       *
       */
      public resizeMyself(): void
    }
    /**
     *
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
     * The results of this component can be filtered.  See WebComponents.Heading for details.
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
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 5.2.0
     * - 8.8.0 Added `cq-favorites` flag.
     * - 9.1.0 Observes attributes. Added emitter.. Changed `cq-favorites` flag to `favorites`.
     *
     */
    class Studies extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Initializes and displays the list of available studies.
       *
       * @param [params] Parameters to control initialization of the studies list.
       * @param [params.excludedStudies] A map of study names that should be excluded from
       * 		the studies list, for example: <code>{&nbsp;"macd":&nbsp;true&nbsp;}</code>.
       * @param [params.alwaysDisplayDialog=false] If set to boolean true (not
       * 		truthy), the study edit dialog box is automatically opened for any of the available
       * 		studies after the study has been added to the chart. If set to boolean false, the
       * 		study edit dialog box is not opened for any of the available studies after the study
       * 		has been added to the chart.
       * 		<p>If set to an object containing a map of study names and boolean values (for example,
       * 		<code>{&nbsp;"ma":&nbsp;true,&nbsp;"AVWAP":&nbsp;true&nbsp;}</code>), the study edit
       * 		dialog box is opened after the study has been added to the chart for studies in the
       * 		map that have a boolean value of true but not for those that have a value of false or
       * 		for any studies not included in the map.
       * @param [params.dialogBeforeAddingStudy=false] If set to boolean true (not
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
       */
      public initialize(
        params?: {
          excludedStudies?: object,
          alwaysDisplayDialog?: object|boolean,
          dialogBeforeAddingStudy?: object|boolean
        }
      ): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Creates a Study menu.
       *
       * You have the option of creating a hardcoded HTML menu and just using CIQ.Studies
       * for processing `stxtap` attributes, or you can call this method to automatically generate
       * the menu.
       *
       * @param  stx The chart object
       *
       * @since 8.8.0 Added `stx` parameter.
       */
      public renderMenu(stx: CIQ.ChartEngine): void
      /**
       * Reorders the study menu.  Order is alphabetical.  The menu is reordered when the language is changed.
       * If there are favorites, and the Study Browser is imported, the favorited studies are sorted alphabetically
       * on the top of the list.
       *
       */
      public updateOrder(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-study-context&gt;</h4>
     *
     * This component appears when a study is right-clicked.  A menu of actions are displayed relevant to that study.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when an action is clicked from the displayed menu.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect |  "edit", "remove", "favorite", or other custom action |
     * | action | "click" |
     * | item | _object on which the action occurs, usually a study descriptor_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 4.1.0 cq-study-context is now required (cq-dialog[cq-study-context] no longer works).
     * - 9.1.0 Added emitter.
     */
    class StudyContext extends CIQ.UI.DialogContentTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Called after an stxtap event is fired.
       * Emits the event for the action performed.
       *
       * @param effect What action was performed as a result of the stxtap event.
       * @param item Object being effected by the action.
       *
       */
      public postProcess(effect: string, item: Object): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-study-dialog&gt;</h4>
     *
     * Creates and manages study dialogs based on the corresponding study library entry (title,
     * inputs, outputs, parameters, etc.).
     *
     * Requires CIQ.UI.StudyEdit.
     *
     * _**Attributes**_
     *
     * The following attributes are supported (but not observed for changes):
     * | attribute      | description |
     * | :------------- | :---------- |
     * | cq-study-axis  | Displays UI for selecting the y-axis position (left, right, etc.), color and for inverting the y-axis *if not shared with the primary-axis*. |
     * | cq-study-panel | Displays UI for selecting the panel for the study (own, shared, etc.) and whether it is rendered as an underlay (under the primary chart) or an overlay (over the primary chart). Set this attribute to "alias" to have the panel names listed as "<Panel 1>", "<Panel 2>", etc.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it updates a study.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "update" |
     * | action | "change" |
     * | updates | _updated settings_ |
     *
     * `cause` and `action` are set only when the dialog is updated as a direct result of changing a form field.
     *
     * @example
     * <caption> Here is an example of how to create a study dialog. We add the
     * <code>cq-study-axis</code> and <code>cq-study-panel</code> attributes to enable form fields
     * used to control axis position, color, study panel, and underlay/overlay.
     * </caption>
     * <cq-dialog>
     *      <cq-study-dialog cq-study-axis cq-study-panel></cq-study-dialog>
     * </cq-dialog>
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 5.2.0 Optional Attributes `cq-study-axis` and `cq-study-panel` are now available.
     * - 6.3.0 `cq-study-axis` now also provides a check box allowing users to invert study y-axis
     * 		if not shared with the primary-axis.
     * - 9.1.0 Added emitter.
     */
    class StudyDialog extends CIQ.UI.DialogContentTag {
      /**
       * Closes the study dialog.  This will also update the study with any changes made in the dialog.
       *
       */
      public close(): void
      /**
       * Closes the menu that may be open on the study dialog.
       *
       * @param node The open menu node.
       *
       */
      public closeActiveMenu(node: HTMLElement): void
      /**
       * Forces a date string into yyyy-mm-dd format.
       *
       * @param date Date in an "almost" yyyy-mm-dd format.  Meaning, it may have dashes or slashes, or no separators, but the date components must be in the proper order.
       * @return Date in yyyy-mm-dd format.
       *
       */
      public formatDateInput(date: string): String
      /**
       * Forces a time string into HH:nn or HH:nn:ss format.  Seconds appear in the return value only if they were present in the input parameter.
       *
       * @param time Time in an "almost" correct format.  Meaning, it may have colons or not, but the time components must be in the proper order.
       * @return Time in HH:nn or HH:nn:ss format.
       *
       */
      public formatTimeInput(time: string): String
      /**
       * Hides the dialog.  This performs UI cleanup of the lifted menus.
       *
       */
      public hide(): void
      /**
       * Creates and returns a form menu (droopdown select box) using the inputs provided.
       *
       * @param name Menu name, ultimately used as a key for updates.
       * @param currentValue The current selection value.  This is what is displayed even when menu is closed.
       * @param fields Options for the menu.  These are key-value pairs representing the selection value as the key and the text as the value.
       * @param section Where the menu will be placed.  Possible values are "inputs" and "parameters".
       * @return a menu webcomponent.
       *
       */
      public makeMenu(
        name: string,
        currentValue: string,
        fields: Object,
        section: string
      ): WebComponents.Menu
      /**
       * Opens the study dialog, showing the proper fields based on the parameters provided.
       *
       * @param params
       * @param [params.axisSelect] If this key is present, axis selection options appear in the Parameters section of the dialog.
       * @param [params.panelSelect] If this key is present, panel selection options appear in the Parameters section of the dialog.
       * @param [params.addWhenDone] If set, and adding a new study, then study will only be added if "Done" key is pressed.
       * @param [params.caller] The HTML element that triggered this dialog to open
       * @param [params.context] A context to set. See
       * 		[setContext]CIQ.UI.DialogContentTag#setContext.
       *
       */
      public open(
        params: {
          axisSelect?: string,
          panelSelect?: string,
          addWhenDone?: string,
          caller?: HTMLElement,
          context?: CIQ.UI.Context
        }
      ): void
      /**
       * Creates/recreates the fields in the "inputs" section of the dialog.
       *
       * @param [empty] If true, clears all inputs fields first.
       *
       */
      public refreshInputs(empty?: boolean): void
      /**
       * Creates/recreates the fields in the "outputs" section of the dialog.
       *
       * @param [empty] If true, clears all outputs fields first.
       *
       */
      public refreshOutputs(empty?: boolean): void
      /**
       * Creates/recreates the fields in the "parameters" section of the dialog.
       *
       * @param params
       * @param [params.axisSelect] If this key is present, axis selection options appear in the Parameters section of the dialog.
       * @param [params.panelSelect] If this key is present, panel selection options appear in the Parameters section of the dialog.
       * @param [params.addWhenDone] If set, and adding a new study, then study will only be added if "Done" key is pressed.
       * @param [empty] If true, clears all parameters fields first.
       *
       */
      public refreshParameters(
        params: {
          axisSelect?: string,
          panelSelect?: string,
          addWhenDone?: string
        },
        empty?: boolean
      ): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Accepts new menu (select box) selections.
       *
       * @param activator The object representing the dropdown selection
       * @param activator.node The node of the dropdown
       * @param section Section within the dialog ("inputs", "outputs", "parameters")
       * @param name Text of selection
       * @param value Value of selection
       *
       * @since 5.2.0 Added `section` parameter.
       * @since 9.1.0 Added `name` and `value` parameters.
       */
      public setSelectOption(
        activator: {
          node: HTMLElement
        },
        section: string,
        name: string,
        value: string
      ): void
      /**
       * Performs the updates on the study itself.
       *
       * @param updates Changes made in the dialog form elements from the defaults, that will be saved in the study.
       * @param [updates.inputs] Changes made in the inputs section.
       * @param [updates.outputs] Changes made in the outputs section.
       * @param [updates.parameters] Changes made in the parameters section.
       * @param [wasChange=false] True if updating due to change in a field, False if performing a batch update.
       *
       */
      public updateStudy(
        updates: {
          inputs?: Object,
          outputs?: Object,
          parameters?: Object
        },
        wasChange?: boolean
      ): void
      /**
       * Selects template elements and attaches them as class properties only once
       *
       */
      public selectTemplates(): void
      /**
       * Updates the line style, width, and color for the study output.
       *
       * @param activator
       * @param activator.node The corresponding line style dropdown.
       * @param width The selected line width.
       * @param pattern The selected line pattern.
       *
       */
      public setLine(
        activator: {
          node: HTMLElement
        },
        width: number,
        pattern: string
      ): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-study-output&gt;</h4>
     *
     * Set the color of study outputs in the WebComponents.StudyDialog.
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     */
    class StudyOutput extends CIQ.UI.BaseComponent {
      /**
       * Sets the color swatch to the selected color.
       * The `color` argument must be only string-type for StudyParameter component.
       *
       * @param color Color value or object containing color key and value.
       *
       */
      public setColor(color: object|string): void
    }
    /**
     *
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
     * - Up/Down arrow — Move selection between legend entries
     * - Left/Right arrow — Select a control within a selected entry, such as
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
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
     * @extends CIQ.UI.ModalTag
     * @protected
     * @since
     * - 8.3.0 Enabled internal keyboard navigation and selection.
     * - 8.6.0 added `cq-signal-studies-only` flag.
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class StudyLegend extends CIQ.UI.ModalTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Called when component is initialized, from WebComponents.StudyLegend#setContext.
       *
       */
      public begin(): void
      /**
       * Sets the `ciq-active` class on the component, and modalizes the legend for keyboard navigation.
       *
       * @param newState `true` to show the legend, `false` to hide.
       *
       */
      public setActiveState(newState: boolean): void
      /**
       * Handler for keyboard interaction.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * If a color-picker is opened within this component, this will make sure the component stays active.
       *
       */
      public launchColorPicker(): void
      /**
       * Renders the legend based on the current studies in the CIQ.ChartEngine object, taking attribute settings into account.
       * If the `series` attribute is set to `true`, comparisons will also be included in the legend.
       *
       */
      public renderLegend(): void
      /**
       * Legend title specified in the `marker-label` attribute will be displayed only if there are plots within the legend.
       * It will also be translated into the selected language here.
       *
       */
      public displayLegendTitle(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Called for a registered component when the context is changed in a multichart environment.
       *
       * @param newContext The chart user interface context.
       *
       */
      public changeContext(newContext: CIQ.UI.Context): void
      /**
       * Sets the legend width to synchronize with the placement of the panel controls.
       *
       */
      public setPanelLegendWidth(): void
      /**
       * Creates a copy of this component on all panels, if the `clone-to-panels` attribute is set.
       *
       */
      public spawnPanelLegend(): void
      /**
       * Initializes the inner HTML of the component when the component is attached to the DOM without any existing inner HTML.
       *
       */
      public setMarkup(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-swatch&gt;</h4>
     *
     * An interactive color swatch. Relies on the existence of a CIQ.UI.ColorPicker component.
     * Interactivity can be disabled by adding cq-static attribute.
     *
     * When a color is selected, setColor(color) will get called for any parent component with that
     * method.
     * The swatch will display special states such as "auto" or "none" with distinct images.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute | description |
     * | :-------- | :---------- |
     * | color     | Active swatch color |
     * | overrides | A comma-delimited list of "colors" which should be supported by the color picker when the swatch is clicked. |
     * | static    | Set to "true" to disable interactivity. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it is clicked, and the color picker opened.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "open" |
     * | action | "click" |
     *
     * A custom event will be emitted from the component when the color is changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "setColor", undefined |
     * | effect | "change" |
     * | action | null |
     * | value | _color value_ |
     *
     * @example
     * <cq-swatch color="red" overrides="auto" static="false"></cq-swatch>
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Swatch extends CIQ.UI.BaseComponent {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Attempts to identify the default color for the associated chart. It does so by traversing
       * up the parent stack and looking for any component that has a context. Or you can set
       * the default color manually by setting member variable defaultColor.
       *
       * @return color value
       *
       */
      public getDefaultColor(): string
      /**
       * Sets the swatch to a color provided.
       *
       * @param color Color value acceptable for CSS.
       * @param percolate If true, will "percolate" up, calling `setColor` on the closest parent wiith that function.
       * @param isAuto True if "auto" color selected.
       *
       * @since 6.2.0 Colors strip out the opacity so they are the rgb representation
       *
       */
      public setColor(color: string, percolate: boolean, isAuto: boolean): void
      /**
       * Opens the color picker dialog.  This component calls this function when the swatch is tapped.
       *
       */
      public launchColorPicker(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-theme-dialog&gt;</h4>
     *
     * Enables creation of custom chart themes.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * See WebComponents.Themes for more details on menu management for this component.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it saves a theme.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "save" |
     * | action | "click" |
     * | name | _theme name_ |
     * | theme | _theme data_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class ThemeDialog extends CIQ.UI.DialogContentTag {
      /**
       * Applies changes to all charts on the screen.
       *
       */
      public applyChanges(): void
      /**
       * Closes the theme dialog box.
       *
       */
      public close(): void
      /**
       * Opens the theme dialog box.
       *
       * @param params Dialog box parameters.
       * @param params.context The chart user interface context.
       * @param [params.initiatingMenu] The menu that contains the user interface
       * 		control that opened the theme dialog box.
       * @param [params.themeName] Hint text for the name of the custom theme. Used in
       * 		the theme name input field of the theme dialog box.
       *
       * @since 6.2.0 `basecolor` of mountain chart can be configured with "mb" piece.
       *
       */
      public open(
        params: {
          context: CIQ.UI.Context,
          initiatingMenu?: object,
          themeName?: string
        }
      ): void
      /**
       * Saves the custom theme and closes the theme dialog box.
       *
       */
      public save(): void
      /**
       * Sets a theme property, such as candle color, and applies the new property to all charts
       * on the screen.
       *
       * @param obj Contains the properties of a theme element.
       * @param field The property for which the new value is set.
       * @param value The new value for the theme property.
       *
       */
      public setValue(obj: object, field: string, value: string): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-theme-piece&gt;</h4>
     *
     * Manages an item in the theme.  The item can be a color or a flag.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when a theme piece is chosen.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "change" |
     * | action | "click" |
     * | name | _theme piece name_ |
     * | value | _theme piece value_ |
     *
     * @extends CIQ.UI.BaseComponent
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class ThemePiece extends CIQ.UI.BaseComponent {
      /**
       * Sets a flag in the theme for this piece.
       * @param result Value of flag
       *
       */
      public setBoolean(result: boolean): void
      /**
       * Sets the color in the theme for this piece.
       * @param color CSS color, or "Hollow" or "No Border".
       *
       */
      public setColor(color: string): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-themes&gt;</h4>
     *
     * This web component displays available themes in a menu.  It also allows for custom themes to be removed.
     * The menu updates automatically with new themes that are created from the theme dialog.
     *
     * Built in themes are merely the names of classes that will be added to the top element of the UIContext when
     * selected.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute | description |
     * | :-------- | :---------- |
     * | theme     | Name of last theme selected. Note the current theme's attributes may be changed after setting the theme. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when a theme is selected or removed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select", "remove" |
     * | action | "click" |
     * | value | _theme name_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class Themes extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Adds a custom theme
       *
       * @param theme The theme descriptor
       * @param initiatingMenu The component which initially called ThemeDialog. This is used in order to save the new theme as the current theme.
       *
       */
      public addCustom(theme: object, initiatingMenu: WebComponents.Themes): void
      /**
       * Create the inner markup of the component.  The UI for the component will resmble a menu of choices,
       * beginning with the default themes and additionally any custom themes, with the ability to remove any custom theme.
       *
       */
      public configureMenu(): void
      /**
       * Initialize the web component
       * @param params Parameters
       * @param [params.builtInThemes] Object map of built-in theme names, display names
       * @param [params.defaultTheme] The default built-in theme to use
       * @param [params.nameValueStore] A CIQ.NameValueStore object for fetching and saving theme state
       * @param [params.id] id which can be used to disambiguate when multiple charts are on the screen
       *
       */
      public initialize(
        params: {
          builtInThemes?: Object,
          defaultTheme?: Object,
          nameValueStore?: Object,
          id?: string
        }
      ): void
      /**
       * Loads a built-in theme.
       *
       * @param className Name of built-in theme, for example, "ciq-night".  Built-in themes are just classes added to the component.
       *
       */
      public loadBuiltIn(className: string): void
      /**
       * Loads a custom theme.
       *
       * @param themeName Name of custom theme, which user used to save the theme when it was first created.
       *
       */
      public loadCustom(themeName: string): void
      /**
       * Loads a theme.
       *
       * @param themeName Name of theme to load.
       *
       */
      public loadTheme(themeName: string): void
      /**
       * Adds a theme class to the elements in the DOM which need it.
       *
       * @param name Name of theme to add.
       *
       */
      public addThemeClass(name: string): void
      /**
       * Removes a theme class from the elements in the DOM.
       *
       * @param name Name of theme to remove.
       *
       */
      public removeThemeClass(name: string): void
      /**
       * Adds a new custom theme to the component.
       *
       * @deprecated As of 9.1.0. Adding a new theme to this component is now achieved via WebComponents.Themes#addCustom.
       *
       */
      public newTheme(): void
      /**
       * Sets storage for the themes.
       *
       * @param [which] Type of theme to store.  Valid values are `current` or `custom`.  If left blank. both types will store.
       *
       */
      public persist(which?: string): void
      /**
       * Removes a custom theme from the component.
       *
       * @param themeName Name of theme to remove.
       *
       */
      public removeTheme(themeName: string): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-timezone-dialog&gt;</h4>
     *
     * Provides content for timezone settings dialog.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it changes the timezone, or removes the current setting.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "change", "remove" |
     * | action | "click" |
     * | zone | _timezone_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class TimezoneDialog extends CIQ.UI.DialogContentTag {
      /**
       * Opens the dialog and sets the timezone provided by the user.
       *
       * @param [params] Contains the chart context.
       * @param [params.context] A context to set for the dialog. See
       * 		CIQ.UI.DialogContentTag#setContext.
       *
       */
      public open(params?: {context?: CIQ.UI.Context}): void
      /**
       * Removes any user-selected time zone settings, and sets the time zone to the user's
       * current location.
       *
       */
      public removeTimezone(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-toggle&gt;</h4>
     *
     * When tapped/clicked, this component will toggle through different states.  Each state represents a value of an object's member;
     * for example, the object could be the chart's layout or preferences, while the member could be a property of these objects.
     * If the `member` attribute of the toggle is set, the toggle state is bound to that member, meaning, if the underlying member value
     * is changed, the toggle will change state to reflect that.
     *
     * Use [registerCallback]WebComponents.Toggle#registerCallback to receive a callback
     * every time the toggle changes. When a callback is registered, any automatic class changes are
     * bypassed.
     *
     * To bind the component's configuration, set its `config` attribute to an object in the CIQ.UI.Context.config.toggles object.
     * Using a configuration allows easy customization of callback functions.  See example below.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute      | description |
     * | :------------- | :---------- |
     * | action         | If set to "class" (the default), will set/unset the "active" class on the component when executing callbacks. |
     * | config         | Key pointing to a configuration file entry which specifies the callback functions. |
     * | help-id        | A key to the correct help text in CIQ.Help.Content. |
     * | icon           | Class name for image to use for the toggle. |
     * | member         | Object member to observe. If not provided, then callbacks are used exclusively. |
     * | multichart-distribute | Option for multichart context. Distributes object member change to all charts. |
     * | reader         | Accessibility text when focused by a screen reader. |
     * | stxtap         | Custom click handling which overrides the default toggling functionality. |
     * | toggles        | A comma-separated list of values which are toggled through with each click. The list can include "null". Stringified booleans and "null" are converted to their primitive values. All other values are passed to the Number constructor. If the result is a number (not NaN), the number is used. Otherwise the value is left as a string. |
     * | toggle-classes | A comma-separated list of classes associated with the toggle setting. If a setting requires multiple classes, they need to be separated with spaces. |
     * | tooltip        | Text for the tooltip which appears when hovering over the component. |
     * | value          | The current state of the toggle. |
     *
     * In addition, the following attributes are also supported:
     * | attribute     | description |
     * | :------------ | :---------- |
     * | active-class  | A class name to add to a binary state toggle if it is in an active state. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "toggle" |
     * | action | "click" |
     * | value | _value_ |
     *
     * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Toggle bound to layout.crosshair:</caption>
     * <cq-toggle member="layout.crosshair" reader="Crosshair" tooltip="Crosshair (Alt + \)" icon="crosshair"></cq-toggle>
     * @example <caption>Registering a callback function directly:</caption>
     * document.querySelector("cq-toggle").registerCallback(function(value){
     *    console.log("current value is " + value);
     *    if(value != false) this.classList.add("active");
     * });
     * @example <caption>Registering a callback function via the config:</caption>
     * // set the toggle component's config attribute to "example"
     * stxx.uiContext.config.toggles.example.callbacks = [function (value) {
     *    console.log("current value is " + value);
     *    if(value != false) this.classList.add("active");
     * }];
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 2015
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class Toggle extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Sets up an observable if there is a `member` supplied in the attributes.  Will remove any existing observable.
       * The observable information is stored in the component instance's `observeInfo` property.
       * If there is no member supplied in the attributes, you can still have the component observe
       * an object's member manually by using the CIQ.UI.observeProperty function, but you should also
       * set the `observeInfo` property so a proper cleanup can be performed when the component is disconnected.
       *
       * @example
       * CIQ.UI.observeProperty("headsUp", stxx.layout, listenerFunction);
       * this.observeInfo = { member: "headsUp", obj: stxx.layout, listener: listenerFunction };
       *
       */
      public connectObservable(): void
      /**
       * Removes any observable set up by WebComponents.Toggle#connectObservable.
       *
       */
      public disconnectObservable(): void
      /**
       * Initializes the handler when the toggle is clicked.  Called once when the context becomes available.
       *
       */
      public begin(): void
      /**
       * Formats the default markup, replacing any variables with the actual values provided by the attributes.
       *
       * @return The prepared markup
       *
       */
      public getMarkup(): string
      /**
       * Adds a callback function to the toggle.
       *
       * @param fc The callback function to add to the toggle. The function accepts the
       * 		current value of the toggle as a parameter. The value of `this` within the callback
       * 		function is the toggle component.
       * @param immediate A flag that indicates whether to immediately call the callback
       * 		function after it has been registered with the toggle.
       *
       * @since 2015
       *
       */
      public registerCallback(fc: Function, immediate: boolean): void
      /**
       * Formats the attribute values.
       * By default, anything in the toggle attribute will be a string, which can cause issues when observing a member because "true"!==true.
       * This function will set "true", "false", and "null" to be their native alternatives instead of strings.
       * It also checks to see if it can cast the number and if it is not NaN it changes it to be a number.
       * Be aware this will change an empty string to 0 but you shouldn't be setting an empty string!
       *
       * @param input Input string, possibly comma-delimited
       * @return Formatted results, in an array and in their assumed type
       *
       */
      public splitAndNormalize(input: any): any[]
      /**
       * Called when an attribute changes, will regenerate the toggle component,
       * updating whatever needs to be updated as a result of the attribute change.
       *
       */
      public reset(): void
      /**
       * Called when the toggle is activated through a click or change of the `value` attribute,
       * will update whatever needs to be updated in the component as a result of the activation.  This comprises
       * the class and aria settings.
       *
       * @param value New value of toggle
       *
       */
      public set(value: any): void
      /**
       * Sets the aria-pressed attribute based on the component's class.
       * A class value of either active, on or off will set the aria value.
       * A truthy value for the component's current value will also set the aria value.
       *
       */
      public setAriaPressed(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Called for a registered component when the context is changed in a multichart environment.
       *
       * @param newContext The chart user interface context.
       *
       */
      public changeContext(newContext: CIQ.UI.Context): void
      /**
       * Updates the toggle's class based on the current toggle value.
       * Used when toggle has more than binary values.
       *
       */
      public updateClass(): void
      /**
       * Updates the toggle's appearance when the member to which it is bound has changed value.  For example, if the toggle
       * controls the crosshair, if the crosshair value in the layout changes, this function will be called to keep in sync
       * with the layout value.
       *
       */
      public updateFromBinding(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-undo&gt;</h4>
     *
     * This component will undo a drawing.  There is a complementary component [cq-redo]WebComponents.Redo which reverts the undo operation.
     *
     * @example
     * <cq-undo-section>
     *     <cq-undo class="ciq-btn">Undo</cq-undo>
     *     <cq-redo class="ciq-btn">Redo</cq-redo>
     * </cq-undo-section>
     * @extends CIQ.UI.ContextTag
     * @protected
     */
    class Undo extends CIQ.UI.ContextTag {
      /**
       * Clears the stack of all redo or undo operations for the context
       *
       * @param  context The context to clear
       *
       */
      public clear(context: CIQ.UI.Context): void
      /**
       * Handles the "undoStamp" event.
       *
       * @param context The chart user interface context.
       * @param type Must be "undoStamp"
       * @param data
       * @param data.before Array of drawing objects which should exist after the undo operation.
       *
       */
      public handleEvent(
        context: CIQ.UI.Context,
        type: string,
        data: {
          before: CIQ.Drawing[]
        }
      ): void
      /**
       * Handler for keyboard interaction.
       * "Ctrl-z" undoes, "Ctrl-y" redoes.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @param keystroke Contains status of function keys
       * @return true if keystroke was processed
       *
       */
      public keyStroke(
        hub: CIQ.UI.KeystrokeHub,
        key: string,
        e: Event,
        keystroke: CIQ.UI.Keystroke
      ): boolean
      /**
       * Reverts latest undone drawing.
       *
       */
      public redo(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Reverts last drawing made.
       *
       */
      public undo(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-view-dialog&gt;</h4>
     *
     * Provides content for view save dialog.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * See WebComponents.Views for more details on menu management for this component.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when it saves a view.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "save" |
     * | action | "click" |
     * | name | _view name_ |
     * | view | _view data_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class ViewDialog extends CIQ.UI.DialogContentTag {
      /**
       * Opens the aggregation dialog.
       *
       * @param params
       * @param [params.context] A context to set. See
       * 		[setContext]CIQ.UI.DialogContentTag#setContext.
       *
       */
      public open(params: {context?: CIQ.UI.Context}): void
      /**
       * Saves the new view. This updates all cq-view menus on the screen and persists the view in the nameValueStore.
       *
       */
      public save(): void
      /**
       * Updates chart context to that of the active chart.
       *
       */
      public updateContext(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-views&gt;</h4>
     *
     * This web component displays available views in a menu.  It also allows for custom views to be removed.
     * The menu updates automatically with new views that are created from the views dialog.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when a view is selected or removed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select", "remove" |
     * | action | "click" |
     * | value | _layout_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class Views extends CIQ.UI.ContextTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Initializes the views menu.
       *
       * @param [config] Parameters used to initialize the menu.
       * @param [config.viewObj = { views: [] }] Contains the menu items; that is, an array
       * 		of objects that contain the specifications for saved views of the chart.
       * @param [config.nameValueStore] The class or constructor function that saves and
       * 		retrieves the chart views by means of a name/value store. See the custom storage
       * 		class example below. Defaults to the `nameValueStore` property of the chart
       * 		configuration if available (see the {@tutorial Chart Configuration} tutorial);
       * 		otherwise, defaults to CIQ.NameValueStore.
       * @param [config.renderCB = null] A callback function executed on the menu after the
       * 		menu has been rendered. Takes the menu as an argument.
       * @param [config.cb] A callback function called when the saved views have been
       * 		retrieved from the name/value store. No arguments are passed to the callback function.
       *
       * @since
       * - 3.0.7 Added the `params.cb` parameter.
       * - 4.1.0 The `ViewMenu` helper has been deprecated. Call
       * 		`document.querySelector("cq-views").initialize()` instead.
       *
       * @example <caption>Create a custom name/value store for the <code>cq-views</code> web component.</caption>
       * // Set the custom name/value store as the storage location for the web component.
       * document.querySelector("cq-views").initialize({ nameValueStore: MyNameValueStore });
       *
       * // Create the custom name/value store.
       * const MyNameValueStore = function() { };
       *
       * // Create custom storage functions using the same signatures and callback requirements as those in CIQ.NameValueStore.
       * // For the cq-views web component, the data that is saved and retrieved is the array represented by params.viewObj.views.
       *
       * MyNameValueStore.prototype.set = function(name, value, cb) {
       *     // Add code here to send the view object (value) to your repository and store it under the provided key (name).
       *     if (cb) cb(error);
       * };
       *
       * MyNameValueStore.prototype.get = function(name, cb) {
       *     // Add code here to get the view object for the provided key (name) from your repository and pass it to the callback.
       *     cb(error, viewObj);
       * };
       *
       * MyNameValueStore.prototype.remove = function(name, cb) {
       *     // Add code here to remove the view object associated with the provided key (name) from your repository.
       *     if (cb) cb(error);
       * };
       *
       * @example <caption>Reload the drop-down menu with the latest stored data.
       * (Useful if you are sharing the data with other applications that may also be modifying the
       * data in real time.)</caption>
       * let self = CIQ.UI.BaseComponent.prototype.qsa("cq-views", null, true)[0];
       * self.params.nameValueStore.get("stx-views", function(err, obj) {
       *     if (!err && obj) self.params.viewObj.views = obj;
       *     else self.params.viewObj = { views: [] };
       *     if (self.params.cb) self.params.cb.call(self);
       *     self.renderMenu();
       * // alternatively, if existing storage configuration is sufficient, to perform the same function:
       * self.initialize();
       * });
       *
       */
      public initialize(
        config?: {
          viewObj?: object,
          nameValueStore?: object,
          renderCB?: object,
          cb?: object
        }
      ): void
      /**
       * Creates the menu.
       *
       */
      public renderMenu(): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-volumeprofile-settings-dialog&gt;</h4>
     *
     * Additional dialog for setting volume profile settings, specifically what is to appear in the callout for the volume profile drawing tool.
     *
     * A custom event will be emitted from the component when any of its fields are changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | field | _name of field toggled_ |
     * | value | _true or false_ |
     *
     * @extends CIQ.UI.DialogContentTag
     * @protected
     * @since
     * - 8.4.0
     * - 9.1.0 Added emitter.
     */
    class VolumeprofileSettingsDialog extends CIQ.UI.DialogContentTag {
      /**
       * Ensures that when the dialog is opened the input field is populated with the correct value.
       * Also installs a listener to report changes to the value so the drawing can get updated.
       *
       * @param params parameters
       * @param params.caller The HTML element that triggered this dialog to open
       * @since 8.4.0
       *
       */
      public open(params: {caller: HTMLElement}): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-wave-parameters&gt;</h4>
     *
     * The wave parameters web component is used to supplement the [cq-drawing-settings]WebComponents.DrawingSettings component.
     * It displays additional settings options specific to the Elliott Wave drawing tool.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute  | description |
     * | :--------- | :---------- |
     * | corrective | Sequence of labels representing the corrective wave. |
     * | decoration | Vertex labeling style. |
     * | impulse    | Sequence of labels representing the impulse wave. |
     * | show-lines | Whether the lines are drawn between vertices. |
     * | template   | Wave pattern.  Changing this may change other attributes automatically. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | name | _property_ |
     * | value | _value_ |
     *
     * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example <caption>Markup for Wave Parameters</caption>
     *		<cq-wave-parameters role="group" aria-label="Wave Parameters"></cq-wave-parameters>
     *
     * @extends CIQ.UI.ContextTag
     * @protected
     * @since
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class WaveParameters extends CIQ.UI.ContextTag {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Initializes the parameters.  Called from Webcomponents.DrawingSettings#sync.
       *
       */
      public activate(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Toggle whether to show lines on wave drawing, or just vertices.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       *
       */
      public toggleLines(activator?: {node?: HTMLElement}): void
      /**
       * Updates the wave parameters settings.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       * @param field The field to update
       * @param value Value of the field to update.
       *
       */
      public update(
        activator: {node?:HTMLElement} | undefined,
        field: string,
        value: number
      ): void
    }
    /**
     *
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
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
     * @extends CIQ.UI.DialogContentTag
     * @since 9.3.0
     */
    class YAxisContext extends CIQ.UI.DialogContentTag {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Called after an stxtap event is fired.
       * Emits the event for the action performed.
       *
       * @param effect What action was performed as a result of the stxtap event.
       * @param item Object being effected by the action.
       *
       */
      public postProcess(effect: string, item: Object): void
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-color-picker&gt;</h4>
     *
     * The color picker is a dialog which allows the user to choose a color to apply to the item which presented the color picker.
     * The item is usually a "swatch" WebComponents.Swatch which is embedded in elsewhere, like in a study dialog or drawing palette.
     * In addition to colors, there can be configured "overrides", which are buttons under the color picker allowing the user to choose something
     * other than a specific color, for example, "None" or "Auto".
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | cq-active    | Set if the element is visible |
     * | cq-colors    | Contains a comma-separated list of CSS colors to use |
     *
     * In addition, there are two ways to set the colors.  These are given in the examples below.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when a color is selected.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | value | _color value_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     * This component is automatically created if it doesn't exist in the DOM already.
     *
     * @example <caption>Set colors for instance: `setColors()` can be passed a two dimensional array of colors</caption>
     * const myColorPicker = document.querySelector("cq-color-picker");
     * myColorPicker.setColors([["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]]);
     *
     * @example <caption>Set colors for Component class: `ColorPicker.defaultColors` can be set to a two dimensional array of colors</caption>
     * // Note: do this before creating the ChartEngine
     * const pickerClassDef = CIQ.UI.components("cq-color-picker")[0].classDefinition;
     * pickerClassDef.defaultColors=[["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]];
     *
     * @extends WebComponents.Dialog
     * @protected
     * @since
     * - 9.1.0 Added emitter.
     */
    class ColorPicker extends WebComponents.Dialog {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Sets the class members up with the proper colors and overrides.
       *
       */
      public build(): void
      /**
       * Displays the color picker in proximity to the node passed in
       * @param activator The object representing what caused picker to display
       * @param [activator.node] The node near where to display the color picker
       * @param [activator.overrides] Array of overrides. For each of these, a button will be created that if pressed
       * will pass that override back instead of the color
       *
       */
      public display(activator: {node?: HTMLElement, overrides?: string[]}): void
      /**
       * Repositions the color picker so it fits on the screen.
       *
       */
      public reposition(): void
      /**
       * Generates the HTML for the component.
       *
       */
      public initialize(): void
      /**
       * Handler for keyboard interaction.
       * Arrow keys move around the picker, while `Enter` will select.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: Event): boolean
      /**
       * Switches the focus to the next row of colors.
       *
       * @param items List of items in the picker (rows and overrides)
       * @param [options]
       * @param [options.reverse] If true, reverses order for focus
       * @return true if next item is focusable
       *
       */
      public focusNextRow(items: NodeList, options?: {reverse?: boolean}): boolean
      /**
       * After color is chosen from the picker, this function will pass it back to the element which caused the picker to display.
       *
       * @param color Color to pass back.
       *
       */
      public pickColor(color: string): void
      /**
       * Sets the colors to a newly provided two dimensional array of colors.
       *
       * @param colorMap Object that holds an array of various color arrays.
       *
       */
      public setColors(colorMap: object): void
    }
    /**
     *
     *
     *  This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     *  <h4>&lt;cq-drawing-palette&gt;</h4>
     *
     * This component is used to facilitate drawing and annotating on the chart. It displays a palette
     * for control and management of drawing tools.
     *
     * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
     *
     * This works in conjunction with the [cq-drawing-settings]WebComponents.DrawingSettings component
     * and replaces the cq-toolbar component, providing additional functionality
     * and an improved user experience.
     *
     * Drawing tools support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool
     * `cq-item` element. Combinations take the form Alt+key (upper- or lowercase); for example, Alt+a or
     * Alt+A — in either case, the key combination works whether the key is shifted or not. Users can also
     * add the modifier Ctrl to the keystroke combination. For example, both Alt+R and Ctrl+Alt+R activate the
     * Rectangle tool. The added Ctrl modifier helps provide a unique keystroke combination in the event the Alt+key
     * combination is assigned to a function in the web browser or to an application on the user's system.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute   | description |
     * | :---------- | :---------- |
     * | view        | Palette display style: "grid" or "list". |
     * | active-tool | Current active drawing tool. |
     * | docked      | The docked state of the palette. Set to "false" to float palette over the chart. |
     *
     * In addition, the following attributes are also supported:
     * | attribute            | description |
     * | :------------------- | :---------- |
     * | cq-keystroke-claim   | Enables processing of keyboard input. |
     *
     * If no markup is specified in the menu component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
     * to be used.
     * The default markup utilizes the drawing tools and grouping options set in the default configuration, which is customizable through the component's `context.config` property.
     *
     * _**Emitters**_
     *
     * A custom event will be emitted from the component when its view mode is changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | effect | "toggle" |
     * | view | _mode_ |
     *
     * A custom event will be emitted from the component when the active tool is changed.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | effect | "select" |
     * | toolName | _tool name_ |
     * | activator | _button element pressed_ |
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example
     *	<cq-drawing-palette
     *		class="palette-drawing grid palette-hide"
     *		docked="true"
     *		orientation="vertical"
     *		min-height="300"
     *		cq-drawing-edit="none"
     *		cq-keystroke-claim
     *		view="grid"
     *		active-tool="notool"
     *	></cq-drawing-settings>
     *
     * @extends WebComponents.Palette
     * @protected
     * @since
     * - 7.1.0
     * - 7.2.0 The drawing settings section has been moved into its own component, [cq-drawing-settings]WebComponents.DrawingSettings.
     * - 7.4.0 Drawing tools now support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool button.
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class DrawingPalette extends WebComponents.Palette {
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Enable keyboard shortcuts for tools that have a shortcut defined in the chart config.
       * Add keyboard shortcut text to tooltip.
       *
       * @param context Chart context
       *
       */
      public setupKeyboardActivation(context: object): void
      /**
       * Handler for keyboard interaction.
       *
       * Key combinations defined in the context config will activate select tools.
       *
       * @param hub The hub that processed the key
       * @param key Key that was stroked
       * @param e The event object
       * @return true if keystroke was processed
       *
       * @example <caption>Configuration of a shortcut in context (Alt-w will activate Annotation tool):</caption>
       * stxx.uiContext.config.drawingTools = [
       *	{ type: "dt", tool: "annotation", group: "text", label: "Annotation", shortcut: "w" },
       *  ...
       * ];
       *
       */
      public keyStroke(hub: CIQ.UI.KeystrokeHub, key: string, e: object): boolean
      /**
       * Handler for responding to messaging sent from other palettes `sendMessage` function.
       *
       * @param id Identifier for the message
       * @param message Optional data accompanying the message
       *
       */
      public handleMessage(id: string, message: object | string): void
      /**
       * Retrieve list of tools from local storage.
       *
       */
      public loadToolSettings(): void
      /**
       * Save tool settings to local storage
       *
       */
      public storeToolSettings(): void
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Pair undo and redo buttons
       *
       */
      public pairUndoRedo(): void
      /**
       * Change palette view mode
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       * @param modeName Palette view mode. Either "list" or "grid".
       *
       */
      public changeView(
        activator: {node?:HTMLElement} | undefined,
        modeName: string
      ): void
      /**
       * Create palette context menu for adding/removing favorite tool assignment in grid view.
       *
       * @return The context menu element.
       *
       */
      public createContextMenu(): HTMLElement
      /**
       * Register callback function
       *
       * @param fc Callback function
       *
       */
      public registerCallback(fc: Function): void
      /**
       * Resets the tool scrollbar. Use if the container size or contents have changes.
       *
       * @return Returns false when scroller element is not found.
       *
       */
      public resetScroller(): boolean
      /**
       * Set the active tool.
       *
       * @param toolName Name of drawing tool to activate.
       *
       */
      public setActiveTool(toolName: string): void
      /**
       * Set tool button as active.
       *
       * @param activeNode Tool button element.
       *
       */
      public setActiveButton(activeNode: HTMLElement): void
      /**
       * Set palette view mode
       *
       * @param mode Palette view mode. Either "list" or "grid".
       *
       */
      public setMode(mode: string): void
      /**
       * Set palette palette tool button even/odd class for styling in grid view mode.
       *
       */
      public setEvenOdd(): void
      /**
       * Add the favorite badge to relevant tools. Add a favorite toggle star to each tool for use in list view and mobile layout.
       *
       * @param propagateSettings Effect the settings on all charts in a multichart environment.  Defaults to `true`.
       *
       */
      public setFavorites(propagateSettings: boolean): void
      /**
       * Sort buttons in order defined by the config, grouping those marked favorite first.
       *
       */
      public sortToolButtons(): void
      /**
       * Handle tool favorite button click
       *
       * @param event Button click event.
       *
       */
      public handleFavoriteClick(event: Event): void
      /**
       * Add the tool to the list of favorites
       *
       * @param toolName Name of drawing tool
       *
       */
      public addFavorite(toolName: string): void
      /**
       * Display the tool context menu.
       *
       * @param toolName Name of drawing tool.
       * @param top Top coordinate of context menu position relative to chart context.
       * @param left Left coordinate of context menu position relative to chart context.
       *
       */
      public showToolContextMenu(toolName: string, top: number, left: number): void
      /**
       * Toggle favorite state of drawing tool.
       *
       * @param toolName Name of drawing tool.
       *
       */
      public toggleFavorite(toolName: string): void
      /**
       * Change displayed tool group.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       * @param groupName Name of tool group to display.
       *
       */
      public setToolGroup(
        activator: {node?:HTMLElement} | undefined,
        groupName: string
      ): void
      /**
       * Binding function for the Tool Groups filter.
       *
       * @param node Node that owns the binding; usually, the filter menu.
       *
       */
      public bindToolGroups(node: HTMLElement): void
      /**
       * Used in break-sm context to show/hide the palette for mobile layout
       *
       */
      public togglePalette(): void
      /**
       * Used in break-sm context to hide the palette for mobile layout
       *
       */
      public hidePalette(): void
      /**
       * Used in break-sm context to show the palette for mobile layout
       *
       */
      public showPalette(): void
      /**
       * Activate drawing tool. Called by `tool` function.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       * @param toolName Name of drawing tool to activate.
       *
       * @return Returns palette tool button element for the specified tool.
       *
       */
      public activateTool(
        activator: {node?:HTMLElement} | undefined,
        toolName: string
      ): HTMLElement
      /**
       * Activate No Tool. Disables any active drawing tools.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       *
       */
      public noTool(activator?: {node?: HTMLElement}): void
      /**
       * Activate drawing tool. Sends `changeTool` message to other palettes.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       * @param toolName Name of drawing tool to activate.
       *
       */
      public tool(
        activator: {node?:HTMLElement} | undefined,
        toolName: string
      ): void
      /**
       * Sends `clearDrawings` message to other palettes.
       *
       */
      public clearDrawings(): void
      /**
       * Restore drawing settings default configuration.
       *
       * @param [activator] Pass `null` when calling programmatically.
       * @param [activator.node] Element that triggered this function.
       * @param all Set to `true` to restore default for all drawing objects. Otherwise only the active drawing object's defaults are restored.
       *
       */
      public restoreDefaultConfig(
        activator: {node?:HTMLElement} | undefined,
        all: boolean
      ): void
      /**
       * Injects tool button markup, set in the chart config, into component markup.
       *
       * @param config Chart configuration object
       * @returns Modified markup.
       *
       */
      public getMarkup(config: object): string
    }
    /**
     *
     *
     * This is a custom HtmlElement (Web Component).  The tag name is the following:
     *
     * <h4>&lt;cq-drawing-settings&gt;</h4>
     *
     * Drawing Settings palette web component used to draw and annotate on the chart. Displays a palette
     * along the top of the chart for managing tool settings.
     *
     * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
     *
     * This works in conjunction with the [cq-drawing-palette]WebComponents.DrawingPalette component
     * and replaces the cq-toolbar component, providing additional functionality
     * and an improved user experience.
     *
     * _**Attributes**_
     *
     * This component observes the following attributes and will change behavior if these attributes are modified:
     * | attribute    | description |
     * | :----------- | :---------- |
     * | docked       | The docked state of the palette. Set to "false" to float palette over the chart. |
     * | hide         | The hidden state of the palette. Set to "false" to show palette. |
     * | active-tool  | Current active drawing tool. |
     * | axis-label   | "true" to enable axis label. |
     * | line-color   | Current line color in hex format, or "auto" to select color from theme. |
     * | fill-color   | Current fill color in hex format, or "auto" to select color from theme. |
     * | font-family  | Current font name. Note: specified font must be available in the end-user's system. |
     * | font-size    | Current font size in valid css units. |
     * | font-italic  | "true" to enable font italics style. |
     * | font-bold    | "true" to enable font bold style. |
     * | line-width   | Line width in pixels. |
     * | line-pattern | Line pattern: "solid", "dotted" or "dashed". |
     * | show-callout | "true" to enable display of callout. |
     * | span-panels  | "true" to enable span panels. |
     *
     * _**Emitters**_
     *
     * A custom event will be emitted by the component when it is clicked.
     * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
     * The details of the event contain the following:
     * | property | value |
     * | :------- | :---- |
     * | emitter | this component |
     * | cause | "useraction" |
     * | effect | "select" |
     * | action | "click" |
     * | name | _property_ |
     * | value | _value_ |
     *
     * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
     *
     * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
     * The default markup provided has accessibility features.
     *
     * @example
     *	<cq-drawing-settings
     *		class="palette-settings"
     *		docked="true"
     *		hide="true"
     *		orientation="horizontal"
     *		min-height="40"
     *		cq-drawing-edit="none"
     *		line-pattern="solid"
     *		font-size="12px"
     *		font-family="Helvetica, sans-serif"
     *		fill-color="#7DA6F5"
     *		line-color="auto"
     *		active-tool="notool"
     *	></cq-drawing-settings>
     *
     * @extends WebComponents.Palette
     * @protected
     * @since
     * - 7.2.0
     * - 9.1.0 Observes attributes. Added emitter.
     */
    class DrawingSettings extends WebComponents.Palette {
      /**
       * Called for a registered component when the context is constructed.
       * Sets the context property of the component.
       *
       * @param context The chart user interface context.
       *
       */
      public setContext(context: CIQ.UI.Context): void
      /**
       * Processes attribute changes.  This is called whenever an observed attribute has changed.
       *
       * @param name Attribute name
       * @param oldValue Original attribute value
       * @param newValue new Attribute value
       *
       */
      public handlePropertyChange(name: string, oldValue: string, newValue: string): void
      /**
       * Overloaded from palette class.
       * Handler for responding to messaging sent from other palettes `sendMessage` function.
       *
       * @param id Identifier for the message
       * @param message Optional data accompanying the message
       *
       */
      public handleMessage(id: string, message: object | string): void
      /**
       * Enable crosshairs.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       *
       */
      public crosshairs(activator: {node: HTMLElement}): void
      /**
       * Enable settings UI for specified drawing tool. Sends `changeToolSettings` message to other palettes.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param toolName Name of drawing tool.
       *
       */
      public tool(activator: {node: HTMLElement}, toolName: string): void
      /**
       * Enable settings UI for specified drawing tool. Called by `tool` function.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param toolName Name of drawing tool.
       *
       */
      public toolSettings(activator: {node: HTMLElement}, toolName: string): void
      /**
       * Array of element selectors for drawing setting UI elements used by the specified tool.
       *
       * @param drawingParameters Drawing parameters object.
       * @param toolName Name of drawing tool.
       * @returns Array of drawing setting element selectors
       *
       */
      public defaultElements(drawingParameters: object, toolName: string): void
      /**
       * Sets active state of drawing settings Save Config button
       *
       * @param [on=true] Set to `true` to set active.
       *
       */
      public dirty(on?: boolean): void
      /**
       * Emits a change event.
       *
       */
      public emit(): void
      /**
       * Gets the current drawing color and updates display in palette.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param mode Type of color: `fill` or `line`.
       *
       */
      public getColor(activator: {node: HTMLElement}, mode: string): void
      /**
       * Enables colorPicker and provides callback to `setColor`, depending on `mode` value.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param mode Type of color: `fill` or `line`.
       *
       */
      public pickColor(activator: {node: HTMLElement}, mode: string): void
      /**
       * Sets the default line or fill color, depending on `mode` value.
       *
       * @param color A Valid css color value.
       * @param mode Type of color: `fill` or `line`.
       *
       */
      public setColor(color: string, mode: string): void
      /**
       * Restore drawing settings default configuration.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param all Set to `true` to restore default for all drawing objects. Otherwise only the active drawing object's defaults are restored.
       *
       */
      public restoreDefaultConfig(activator: {node: HTMLElement}, all: boolean): void
      /**
       * Save current drawing settings as default configuration.
       *
       */
      public saveConfig(): void
      /**
       * Set drawing settings for fibonacci drawing tools.
       *
       * @param width Line width
       * @param pattern Line pattern
       *
       */
      public setFibs(width: number, pattern: string): void
      /**
       * Sets the default font family.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param fontFamily A Valid css font-family value.
       *
       */
      public setFontFamily(activator: {node: HTMLElement}, fontFamily: string): void
      /**
       * Sets the default font size.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param fontSize A Valid css font-size value.
       *
       */
      public setFontSize(activator: {node: HTMLElement}, fontSize: string): void
      /**
       * Set drawing line style.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param width Line width
       * @param pattern Line pattern
       *
       */
      public setLine(
        activator: {
          node: HTMLElement
        },
        width: number,
        pattern: string
      ): void
      /**
       * Set text of palette active tool label element.
       *
       * @param activeToolLabel Name of drawing tool.
       *
       */
      public setActiveToolLabel(activeToolLabel: string): void
      /**
       * Synchronizes the drawing toolbar with stx.currentVectorParameters. Poor man's data binding.
       *
       * @param [cvp=stx.currentVectorParameters] A new drawing object, otherwise defaults to the current one
       *
       */
      public sync(cvp?: object): void
      /**
       * Toggle checked state of checkbox element and update associated drawing setting.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param id Drawing setting property name
       * @param [forceValue=null] If set, will force the toggle to that value.
       *
       */
      public toggleCheckbox(
        activator: {
          node: HTMLElement
        },
        id: string,
        forceValue?: boolean
      ): void
      /**
       * Toggle active state of font "bold" and "italic" styles and update drawing settings.
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       * @param fontStyle Style to toggle, "bold" or "italic".
       *
       */
      public toggleFontStyle(activator: {node: HTMLElement}, fontStyle: string): void
      /**
       * Set drawing tool font style
       *
       * @param fontStyle Style to set, "bold" or "italic".
       * @param state Active state, set to "true" to enable.
       *
       */
      public setFontStyle(fontStyle: string, state: boolean): void
      /**
       * Toggle grabbing magnet state
       *
       * @param activator
       * @param activator.node Element that triggered this function.
       *
       */
      public toggleMagnet(activator: {node: HTMLElement}): void
      /**
       * Sends `toggleDrawingPalette` message to other palettes.
       *
       */
      public togglePalette(): void
    }
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-floating-window&gt;</h4>
   *
   * This component manages a "floating window" containing content.
   * A floating window can be moved around the screen within the boundaries of the context container.
   * It can also be resized on each edge and corner.  Finally, it can be collapsed and expanded via its title bar.
   *
   * Note that the actually window contents are not found within the DOM of this component; rather, this component has a
   * "windowImplementation" which points to the actual DOM element containing the window.
   * The implementation is of the class WebComponents.FloatingWindow.DocWindow.
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 8.2.0
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.FloatingWindow {
    /**
     * The window implementation of the [cq-floating-window]WebComponents.FloatingWindow
     * web component.
     *
     * @protected
     * @since 8.2.0
     */
    class DocWindow {
      /**
       * Stores the function parameters as properties of the floating window object.
       *
       * @param params Parameters to store as properties.
       * @param [params.title] Text that appears in the title bar of the floating window.
       * @param [params.content] The contents of the floating window, typically an HTML
       * 		string.
       * @param [params.container] The DOM element that visually contains the floating
       * 		window. The window is positioned on screen relative to the container element (see
       * 		[positionRelativeTo]WebComponents.FloatingWindow.DocWindow#positionRelativeTo).
       * @param [params.minWidth] The minimum width of the floating window.
       * @param [params.minHeight] The minimum height of the floating window.
       * @param [params.onClose] A callback function to execute when the floating windows
       * 		closes.
       *
       * @since 8.2.0
       */
      public setProps(
        params: {
          title?: string,
          content?: string,
          container?: HTMLElement,
          minWidth?: number,
          minHeight?: number,
          onClose?: Function
        }
      ): void
      /**
       * Adds event listeners to the floating window.
       *
       * The listeners enable the window to be moved, resized, collapsed/expanded, and closed.
       *
       * @since 8.2.0
       */
      public bindEvents(): void
      /**
       * Updates properties of the floating window.
       *
       * @param params Floating window properties.
       * @param [params.x] The horizontal position of the floating window in pixels.
       * @param [params.y] The vertical position of the floating window in pixels.
       * @param [params.width] The width of the floating window in pixels.
       * @param [params.height] The height of the floating window in pixels.
       *
       * @since 8.2.0
       */
      public update(
        params: {
          x?: number,
          y?: number,
          width?: number,
          height?: number
        }
      ): void
      /**
       * Positions the floating window relative to the
       * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DOMRect" target="_blank">
       * DOMRect</a> of a DOM element.
       *
       * @param params Positioning parameters.
       * @param [params.container] The DOM element relative to which the floating
       * 		window is positioned. Defaults to the `container` parameter of the
       * 		[floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener or,
       * 		if the `container` parameter is not available, `document.body`.
       * @param [params.location="center"] The location of the floating window within the
       * 		container element's bounding rectangle. If the value is "center" (the default), the
       * 		floating window is centered horizontally and vertically within the container
       * 		rectangle. Otherwise, the window is positioned in the upper left corner of the
       * 		rectangle.
       *
       * @since 8.2.0
       */
      public positionRelativeTo(params: {container?: HTMLElement, location?: string}): void
      /**
       * Repositions the floating window (if necessary) when the display is resized to keep the
       * window within the document view.
       *
       * @since 8.2.0
       */
      public ensureVisible(): void
      /**
       * Helper function that constrains the floating window to the document view when the window
       * is dragged horizontally.
       *
       * Clamps the horizontal position of the floating window between 0 (so the window cannot be
       * dragged off the left side of the view) and the width of the document view minus the width
       * of the floating window (so the window cannot be dragged off the right side of the view).
       *
       * @param value The position of the mouse relative to the left edge of the floating
       * 		window.
       * @return The value for the clamped horizontal position of the floating window:
       * - `value` if `value` is greater than 0 and less than the width of the document view minus
       * the width of the floating window
       * - 0 if `value` is less than 0
       * - The width of the document view minus the width of the floating window if `value` is
       * greater than the width of the document view minus the width of the floating window
       *
       * @since 8.2.0
       */
      public clampX(value: number): number
      /**
       * Helper function that constrains the floating window to the document view when the window
       * is dragged vertically.
       *
       * Clamps the vertical position of the floating window between 0 (so the window cannot be
       * dragged off the top of the view) and the height of the document view minus the height of
       * the floating window title bar and a margin (so the window title bar cannot be dragged off
       * the bottom of the view).
       *
       * @param n The position of the mouse relative to the top edge of the floating window.
       * @return The value for the clamped vertical position of the floating window:
       * - `n` if `n` is greater than 0 and less than the height of the document view minus the
       * height of the floating window title bar and margin
       * - 0 if `n` is less than 0
       * - The height of the document view minus the height of the floating window title bar and
       * margin if `n` is greater than the height of the document view minus the height of the
       * floating window title bar and margin
       *
       * @since 8.2.0
       */
      public clampY(n: number): number
      /**
       * The event listener for mouse move events that occur when a floating window is being dragged
       * or resized.
       *
       * Moves or resizes the floating window.
       *
       * @param e The
       * 		<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">
       * 		mouse event</a> object.
       *
       * @since 8.2.0
       */
      public onMouseMove(e: MouseEvent): void
      /**
       * The event listener for mouse down events that occur on the floating window's title bar.
       *
       * The mouse down event starts a click-and-drag action on the floating window.
       *
       * @param e The
       * 		<a href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent" target="_blank">
       * 		mouse event</a> object.
       *
       * @since 8.2.0
       */
      public onStartDrag(e: MouseEvent): void
      /**
       * The event listener for mouse up events that occur on a floating window.
       *
       * Stops a dragging or resizing action of the floating window.
       *
       * @since 8.2.0
       */
      public onMouseUp(): void
      /**
       * Opens and closes the floating window.
       *
       * @param [value] If true, the floating window is opened. If false, the
       * 		floating window is closed. If undefined, the floating window is toggled; that is,
       * 		opened if it is currently closed, closed if it is currently open.
       *
       * @since 8.2.0
       */
      public toggle(value?: boolean): void
      /**
       * Toggles the display state — expanded or collapsed — of the floating window.
       *
       * In the expanded state, the full floating window is displayed; in the collapsed state, only
       * the floating window title bar appears.
       *
       * @since 8.2.0
       */
      public toggleCollapse(): void
    }
    /**
     * A reference to the class that implements the floating window.
     *
     * @since 8.2.0
     *
     */
    let windowImplementation: WebComponents.FloatingWindow.DocWindow
  }

  export namespace CIQ.UI {
    interface DialogContentTag {
      /**
       * Configure CSS layering to enable the color picker to float above the dialog.
       *
       * @param [val=true] Setting "val" to false will restore the original style values of the element.
       *
       * @since 9.3.0
       */
      enableMultichartColorPickerFloat(val?: boolean): void
    }
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-abstract-marker&gt;</h4>
   *
   * An encapsulation of a complex marker which can contain HTML, video, images, CSS, and
   * animations.
   *
   * The component can be extended with additional markup types specified as values of the `cq-type` attribute.
   *
   * For demonstration purposes, this component ships with a built-in "helicopter" marker.
   * To add additional abstract markers (or to overwrite the built-in), assign the markup to a property in the context configuration (see example).
   *
   * @example <caption>Configure abstract marker:</caption>
   * stxx.uiContext.config.abstractMarkers.myCustomMarker = "<div style='color: red;'>CUSTOM MARKER!!!</div>";
   *
   * @example <caption>Use of component for abstract marker:</caption>
   * <cq-abstract-marker cq-type="myCustomMarker"></cq-abstract-marker>
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since 7.5.0
   */
  export namespace WebComponents.AbstractMarker {
    /**
     * Contains the abstract markers' markup.
     *
     * Override or augment the following properties of the `abstracts` object.
     * Note this is not done directly, but rather via the context configuration.
     *
     * @example <caption>Built-in helicopter marker markup:</caption>
     *	{
     *	 	helicopter:
     *			<div class="sample">
     *				<div stage>
     *					<div helicopter>
     *						<div propeller style="height: 160px;">
     *							<div spinner style="-webkit-transform-origin: 40px 0 0; transform-origin: 40px 0 0;">
     *								<div style="-webkit-transform: rotateY(0deg) translateX(40px); transform: rotateY(0deg) translateX(40px);"></div>
     *								<div style="-webkit-transform: rotateY(-90deg) translateX(40px); transform: rotateY(-90deg) translateX(40px);"></div>
     *								<div style="-webkit-transform: rotateY(-180deg) translateX(40px); transform: rotateY(-180deg) translateX(40px);"></div>
     *								<div style="-webkit-transform: rotateY(-270deg) translateX(40px); transform: rotateY(-270deg) translateX(40px);"></div>
     *							</div>
     *						</div>
     *						<div heli-body></div>
     *					</div>
     *				</div>
     *				<div class="text">This is an example of a complex marker which can contain html, video, images, css, and animations.</div>
     *			</div>
     *  }`
     *
     * @example <caption>Use of cq-type attribute to access helicopter marker:</caption>
     * <cq-abstract-marker cq-type="helicopter"></cq-abstract-marker>
     *
     * @example <caption>Augment from context configuration:</caption>
     * stxx.uiContext.config.abstractMarkers = {
     * 		helicopter: "<div>...</div>",
     *      another: "<div>...</div>",
     * 		...
     * };
     *
     * @since 9.1.0
     */
    let abstracts: {
      helicopter: string
    }
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * This markup contains placeholder values which the component replaces with values from its attributes.
     * Variables are represented in double curly-braces, for example: `{{text}}`.
     * The following variables are defined:
     * | variable      | source |
     * | :------------ | :----- |
     * | dom           | from config, default to built-in |
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-aggregation-dialog&gt;</h4>
   *
   * Provides content for aggregation chart settings dialog.  Most aggregation types require a parameter to control box reversal amount and/or box size.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it saves a view.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "change" |
   * | action | "input" |
   * | aggregationType | _type of chart aggregation_ |
   * | box | _box size_ |
   * | reversal | _reversal size_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.AggregationDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-attribution&gt;</h4>
   *
   * This will put a node inside a panel to attribute the data.
   * Both the main chart panel (for quotes) and a study panel can use an attribution.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.ModalTag
   * @protected
   * @since 2016-07-16
   */
  export namespace WebComponents.Attribution {
    /**
     * Contains the attribution messages.
     *
     * Override or augment the following properties of the `messages` object.
     * Note this is not done directly, but rather via the context configuration:
     * - `sources` — An object that contains properties whose values populate
     *   `<span attrib-source>`.
     * - `exchanges` — An object that contains properties whose values populate
     *   `<span attrib-quote-type>`.
     *
     * For quotes, the source should match the quote source. For studies, the source should
     * match the study type. If there is no matching source property, the associated
     * component has no text.
     *
     * @example <caption>Default object.</caption>
     * stxx.uiContext.config.attributions = {
     *	sources: {
     *		simulator: "Simulated data.",
     *		demo: "Demo data.",
     *		xignite: '<a target="_blank" href="https://www.xignite.com">Market Data</a> by Xignite.',
     *		fis_mm: '<a target="_blank" href="https://www.fisglobal.com/">Market Data</a> by FIS MarketMap.',
     *		Twiggs: 'Twiggs MF Formula courtesy <a target="_blank" href="https://www.incrediblecharts.com/indicators/twiggs_money_flow.php">IncredibleCharts</a>.'
     *	},
     *	exchanges: {
     *		RANDOM: "Data is randomized.",
     *		"REAL-TIME": "Data is real-time.",
     *		DELAYED: "Data delayed 15 min.",
     *		RATES: "Yield data latest from source, bid/ask simulated.",
     *		BATS: "BATS BZX real-time.",
     *		EOD: "End of day data."
     *	}
     * }
     *
     * @example <caption>Set the attribution object on your quote feed for the above override.</caption>
     * cb({
     * quotes:[--array of quote elements here--],
     * attribution: { source: "CUSTOMSOURCE", exchange: "CUSTOMEX" }
     * });
     *
     */
    let messages: {
      sources: {},
      exchanges: {}
    }
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-chart-instructions&gt;</h4>
   *
   * This element contains hidden text that can be read aloud by a screen reader to announce chart features or instructions.
   * By default the text is not visible to a user but is listed in the accessbility tree.
   *
   * If you would like to provide custom instructions, pass in your own text in a `<p>` tag.
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since 8.7.0
   */
  export namespace WebComponents.ChartInstructions {
    /**
     * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-chart-title&gt;</h4>
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute         | description |
   * | :---------------- | :---------- |
   * | display-exchange  | Display the exchange available in the chart symbol object |
   * | cq-previous-close | Updates the previousClose property, see the description below |
   * | cq-browser-tab    | Enables browser tab updates with instrument symbol and latest price |
   * | cq-activate-symbol-search-on-click | Enables click on the chart title to open symbol search dialog |
   *
   * In addition, the following attribute is also supported:
   * | attribute    | description |
   * | :----------- | :---------- |
   * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
   *
   * Note, if the `cq-marker` attribute is added to the element, and it is placed within the
   * chartArea, the element will sit above the chart bars.
   *
   * `<cq-symbol></cq-symbol>` will display `chart.symbol`.
   * `<cq-symbol-description></cq-symbol-description>` will display the `chart.symbolDisplay`. See CIQ.ChartEngine.Chart#symbolDisplay for details on how to set this value.
   *
   * Set attribute `cq-browser-tab` to true to get the stock symbol and latest price to update in the browser tab.
   *
   * Set member `previousClose` to the prior day's closing price in order to calculate and display change.
   * If `previousClose` is not set, then `iqPrevClose` from the `dataSet` will be the default.
   * Remember data is loaded asynchronously.
   * Be sure to reset this value once your initial data has been loaded by using the CIQ.ChartEngine.loadChart callback function.
   * @example <caption>Reset closing price</caption>
   * stx.loadChart(symbol, parameters, function(){
   *      document.querySelector("cq-chart-title").previousClose = yesterdays-closing-price;
   * }
   *
   * The `cq-animate` attribute in the `cq-current-price` element can be used to change the price color to red or green based on the previous value.
   * Setting the attribute to "fade" will introduce a transition effect on the price which, while attractive, uses considerable CPU when there are rapid updates.
   * @example <caption>cq-animate attribute</caption>
   * <cq-chart-title>
   * 	<cq-symbol></cq-symbol>
   * 	<cq-chart-price>
   * 		<cq-current-price cq-animate></cq-current-price>
   * 		<cq-change>
   * 			<div class="ico"></div> <cq-todays-change></cq-todays-change> (<cq-todays-change-pct></cq-todays-change-pct>)
   * 		</cq-change>
   * 	</cq-chart-price>
   * </cq-chart-title>
   *
   * @example <caption>More descriptive display</caption>
   * //You can set a more descriptive name by using http://documentation.chartiq.com/CIQ.ChartEngine.Chart.html#symbolDisplay
   * // and then enabling that on the tile.
   *
   * //In your HTML file look for:
   * <cq-symbol></cq-symbol>
   * //and replace it with :
   * <cq-symbol-description></cq-symbol-description>
   *
   * //In your quote feed add the following line:
   * params.stx.chart.symbolDisplay=response.fullName;
   *
   * //Like so:
   * quotefeed.fetchInitialData=function (symbol, suggestedStartDate, suggestedEndDate, params, cb) {
   *  const queryUrl = this.url; // using filter:true for after hours
   *
   *  CIQ.postAjax(queryUrl, null, function(status, response){
   *   // process the HTTP response from the datafeed
   *   if(status==200){ // if successful response from datafeed
   *    params.stx.chart.symbolDisplay=response.fullName; // specify response name
   *    const newQuotes = quotefeed.formatChartData(response);
   *    cb({quotes:newQuotes, moreAvailable:true, attribution:{source:"simulator", exchange:"RANDOM"}}); // return the fetched data; init moreAvailable to enable pagination
   *   } else { // else error response from datafeed
   *    cb({error:(response?response:status)});	// specify error in callback
   *   }
   *  });
   * };
   *
   * @extends CIQ.UI.ModalTag
   * @protected
   * @since
   * - 06-15-16
   * - 4.0.0 Browser tab now updates with stock symbol and latest price using `cq-browser-tab` attribute.
   * - 6.3.0 Negative close values are "N/A" change percentage.
   * - 6.3.0 Child tag `<cq-todays-change-pct>` is now optional.
   * - 8.8.0 Add `cq-activate-symbol-search-on-click` attribute.
   * - 9.1.0 Observes attributes.
   */
  export namespace WebComponents.ChartTitle {
    /**
     * Keep this value up to date in order to calculate change from yesterday's close.
     */
    let previousClose: number
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-comparison&gt;</h4>
   *
   * This component presents a legend of comparison series found on the panel.  The legend will by default allow the user to
   * toggle the visibility of the series, remove the series, change the series color, and observe the series's price.
   * From the markup, the developer can configure these options as well as whether to display the current price or the crosshair price.
   *
   * Usually the comparison legend is automatically created by the [cq-study-legend]WebComponents.StudyLegend component.
   * Therefore, you do not have to create this component on your template manually.
   *
   * A comparison series "chooser" can also be created using this tag.  See below example.
   *
   * _**Attributes**_
   *
   * This component supports the following attributes:
   * | attribute    | description |
   * | :----------- | :---------- |
   * | chart-legend | A flag to indicate that the component should take the form of a legend. |
   * | cq-marker    | Set to true to allow component to be properly positioned on a chart panel. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when a series is removed, its properties modified, or its visibility toggled.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "remove", "modify", "toggle" |
   * | action | "click" |
   * | name | _series key_ |
   * | field | _field_ |
   * | value | _value_ |
   *
   * Note:
   * -  `field` and `value` not available on remove effect
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Comparison series "Chooser" markup.  Note the absence of the "chart-legend" attribute.</caption>
   *	<cq-comparison cq-marker>
   *		<cq-menu class="comparison" cq-focus="input">
   *			<div add-label class="ciq-no-share">
   *
   *				Compare ...
   *			</div>
   *			<div add-comparison>
   *				<cq-lookup cq-keystroke-claim cq-uppercase></cq-lookup>
   *				<cq-swatch cq-no-close overrides="auto" role="presentation">
   *					<div class="ciq-screen-reader" role="button">Select color</div>
   *				</cq-swatch>
   *				<div role="button" class="stx-btn add" keyboard-selectable>
   *					Add
   *				</div>
   *			</div>
   *		</cq-menu>
   *	</cq-comparison>
   *
   * @extends CIQ.UI.ModalTag
   * @protected
   * @since
   * - 7.3.0 Added the ability to set series color using `cq-swatch`.
   * - 9.1.0 Added markup for UI, and emitters.
   */
  export namespace WebComponents.Comparison {
    /**
     * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-cvp-controller&gt;</h4>
   *
   * The CVP Controller web component is used to supplement the [cq-drawing-settings]WebComponents.DrawingSettings component.
   * It displays additional settings options specific to the Average Line and Regression Line drawing tool.
   *
   * The additional information is to activate a line at +/- X standard deviations away from the center line.
   * There is a line color and line style selection available as well.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute | description |
   * | :-------- | :---------- |
   * | enable    | True if this instance is active. |
   * | color     | Current line color in hex format, or "auto" to select color from theme. |
   * | width     | Line width in pixels. |
   * | pattern   | Line pattern: "solid", "dotted" or "dashed". |
   *
   * In addition, the following attributes are also supported:
   * | attribute     | description |
   * | :------------ | :---------- |
   * | cq-cvp-header | A numerical index relating to the number of standard deviations to this instance applies. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when it is clicked.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | name | _property_ |
   * | value | _value_ |
   *
   * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Markup for CVP Controller</caption>
   *	<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.CVPController {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-data-dialog&gt;</h4>
   *
   * Dialog form that allows users to upload CSV files to be loaded into the chart.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it imports data.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "import" |
   * | action | "click" |
   * | file | _file data_ |
   *
   * A custom event will be emitted from the component when it validates data.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "validate" |
   * | action | "click" |
   * | messageTitle | _validation message title_ |
   * | messageText | _validation message text_ |
   * | valid | _validation status_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.DataDialog {
    /**
     * Valid MIME types that the DataDialog will recognize.
     * By default the file input only accepts the extensions listed here.
     *
     * For more information about extension and MIME types see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
     * @static
     */
    let mimeTypes: string[]
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-drawing-context&gt;</h4>
   *
   * This component appears when a drawing is right-clicked.  A menu of actions are displayed relevant to that drawing.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when an action is clicked from the displayed menu.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect |  "editsettings", "edittext", "clone", remove", "layertop", "layerbottom", "layerup", "layerdown", or other custom action |
   * | action | "click" |
   * | item | _object on which the action occurs, usually a study descriptor_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 6.2.0
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.DrawingContext {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-dropdown&gt;</h4>
   *
   * This component is a container of menu options which can be scrolled though and selected.  The component is typically revealed
   * after a cq-menu component is opened.  This component is usually nested within a `cq-menu` tag.
   * The items that are listed in the dropdown are specified in a configuration.  See example below.
   * To bind the component's configuration, set its `config` attribute to an object in the CIQ.UI.Context.config.menus object.
   *
   * This component automatically allows for scrolling through its elements, when the size of the list exceeds the dropdown's dimensions.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute   | description |
   * | :---------- | :---------- |
   * | maximize    | Set to true to have the dropdown extend in height to the height of the chart container even when there are not enough items in the dropdown to fill it. |
   * | noresize    | Set to true to prevent resizing of dropdown. Otherwise, sizing is based on number of elements in the dropdown. |
   * | config      | Key pointing to a component configuration entry which specifies the content items. |
   *
   * If no markup is specified in this component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
   * to be used.  In order to use the default markup, the selections in the menu must be configured in the context configuration file and specified
   * by key in the `config` attribute.  See example.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when an item in the component is toggled, selected, or edited.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect |  "toggle", "select", "edit" |
   * | action | "click" |
   * | menu | _menu element which owns this component_ |
   * | params | _properties set in configuration object for the item specified by the action_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Configuration**_
   *
   * Configuration is accomplished by setting up an object within the context configuration's menus object.  Each menu dropdown is assigned a unique name which is
   * itself an object property of the menus object.  This property name is used as the value of the `config` attribute of the owning menu component.
   * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
   * Each array element is an object which represents one item in the dropdown.  Let's call one of these array elements, `item`.
   * Each `item` has several properties which describe the nature of the dropdown item to display.  The following table of properties describes what they mean.
   *
   * | property    | description |
   * | :---------- | :---------- |
   * | type        | Describes what type of item to display.  Valid values are described in the table below. |
   * | label       | Text to display. |
   * | className   | Optional class name to apply to item. |
   * | active      | Set to true to manually set the active state on the item.  Note the active state is usually set with a bound value. |
   * | tap         | Name of helper function to execute when item is clicked. |
   * | setget      | Same as tap except used to bind values when `type` is `radio`, `switch`, or `checkbox`. |
   * | bind        | Name of helper function to execute when binding has changed.  This is not a common option. |
   * | options     | Name of helper function to execute when clicking the options icon, which only appears when this property is set. |
   * | iconCls     | Optional class name of an icon to display on the item. |
   * | value       | Array of arguments to pass to `tap`, `stxget`, or `bind` functions; or, name of component when `type="component"`. |
   * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
   * | attributes  | Object containing attributes for a `type="component"` item. |
   * | selector    | Used to specify the selector for `type="clickable"`. |
   * | method      | Used to specify the method for `type="clickable"`. |
   * | menuPersist | Normally menus close when selecting any item type besides `checkbox` or `switch`.  Setting this property to "true" will keep the menu from closing after selection. |
   * | filterFor   | A label to specify the element to filter.  The element to filter must also have its `filter-name` attribute set to this value.  If `filter-for` is omitted, will filter this element's next sibling. |
   * | filterMin   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
   * | helpId      | A key to the correct help text in CIQ.Help.Content. |
   *
   * Valid `type`s are described here:
   * | type      | description |
   * | :-------- | :---------- |
   * | item      | Standard text which when clicked will execute `tap` or `setget` action via a helper. |
   * | switch    | Same as item except value is bound and displayed with a slider switch. |
   * | checkbox  | Same as item except value is bound and displayed with a checkbox. |
   * | radio     | Same as item except value is bound and displayed with a radio. |
   * | clickable | Embeds a `cq-clickable` which executes an action, usually opening a dialog. |
   * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
   * | template  | Embeds markup specified with a `name` attribute equal to this component's `value` attribute. The markup to be embedded needs to be found in the document within a unique template which has the attribute `cq-dropdown-templates`. |
   * | component | Embeds a component specified by `value` with attributes specified by `attributes`.  |
   * | separator | Unclickable horizontal line, used to separate two menu sections. |
   *
   * @example <caption>Dropdown tag:</caption>
   * <cq-dropdown config="example"></cq-dropdown>
   * @example <caption>Sample configuration for the above dropdown tag:</caption>
   * stxx.uiContext.config.menus.example = {
   * 		content: [
   *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
   *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
   * 		]
   * };
   * @example <caption>Template example:</caption>
   * <!--
   * Given a configuration item as follows:
   * { type: "template", value: "my_template" }
   * -->
   * <template cq-dropdown-templates>
   * 		<div name="my_template">
   * 			Custom Dropdown Item
   * 		</div>
   * </template>
   *
   * @extends CIQ.UI.BaseComponent
   * @protected
   * @since
   * - 9.1.0 This new component supersedes `cq-menu-dropdown` component.
   */
  export namespace WebComponents.Dropdown {
    /**
     * Default markup generator for an item's innerHTML.  This function is called for each item in the dropdown.
     * Based on the parameters passed in, the appropriate markup is generated.
     * This function is called by WebComponents.Dropdown#populate.
     *
     * @param params
     * @param params.type Type of item, e.g. `item`, `heading`, `switch`, etc.
     * @param [params.active] Active state of item (applied as `.ciq-active` class)
     * @param [params.className] Class name of item
     * @param [params.options] Helper function to execute when the options icon is clicked
     * @param [params.feature] Name of add-on which when loaded, this item will become visible
     * @param [params.helpId] Name associated with help for this item
     * @param [params.iconCls] Class for the icon in the item
     * @param [params.label] Text for the item
     * @param [params.bind] Helper function for binding
     * @param [params.tap] Helper function for tapping
     * @param [params.setget] Helper function for tapping and binding
     * @param [params.selector] For `clickable` type, target selector
     * @param [params.method] For `clickable` type, target method name on the above selector
     * @param [params.value] Parameter(s) to pass to the `bind`, `tap`, or `setget` functions.
     * 					If these aren't supplied, value will be stored in a `data` attribute.
     * 					The value is always available in the `data-value` attribute.
     * @param [params.content] For `template` type, the HTML corresponding to the template's name
     * @param [params.filterMin] For `heading` type, the minimum number of records to allow filtering
     * @param [params.filterLabel] For `heading` type, the placeholder text that appears in the filter search input
     * @param [params.filterFor] For `heading` type, the element to filter should have its `filter-name` attribute set to this parameter's value.
     *
     * @return Markup for a single dropdown item.
     * @static
     *
     */
    function itemTemplate(
      params: {
        type: String,
        active?: Boolean,
        className?: String,
        options?: String,
        feature?: String,
        helpId?: String,
        iconCls?: String,
        label?: String,
        bind?: String,
        tap?: String,
        setget?: String,
        selector?: String,
        method?: String,
        value?: any[]|String,
        content?: String,
        filterMin?: Number,
        filterLabel?: String,
        filterFor?: String
      }
    ): String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-fib-settings-dialog&gt;</h4>
   *
   * Additional dialog for setting fibonacci tool settings, specifically what levels will be shown for the fibonacci drawings.
   *
   * A custom event will be emitted from the component when any of its fields are changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | type | _fibonacci drawing type_ |
   * | levels | _comma-delimited list of displayed levels_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 3.0.9
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.FibSettingsDialog {
    /**
     * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   * The window implementation of the [cq-floating-window]WebComponents.FloatingWindow
   * web component.
   *
   * @protected
   * @since 8.2.0
   */
  export namespace WebComponents.FloatingWindow.DocWindow {
    /**
     * Default markup for the component's innerHTML.
     *
     * @static
     * @since 8.2.0
     */
    let markup: string
    /**
     * Gets a floating window instance.
     *
     * If the `tag` parameter is provided, the function checks whether the document already contains
     * a floating window with that tag. If so, the function parameters are stored as properties of the
     * floating window object (see
     * [setProps]WebComponents.FloatingWindow.DocWindow#setProps), and a reference to the
     * floating window is returned. Otherwise, the function returns a new floating window created with
     * the provided parameters.
     *
     * **Note:** Tags can be used to manage floating windows in multi-chart documents. For more
     * information, see the `tag` parameter of
     * [floatingWindowEventListener]CIQ.ChartEngine~floatingWindowEventListener.
     *
     * @param params Floating window parameters.
     * @param params.content The contents of the floating window, typically an HTML string.
     * @param [params.container] The DOM element that visually contains the floating
     * 		window. The floating window is positioned on screen relative to the container element (see
     * 		[positionRelativeTo]WebComponents.FloatingWindow.DocWindow#positionRelativeTo).
     * @param [params.title] Text that appears in the title bar of the floating window.
     * @param [params.tag] A label that identifies the floating window type; for example,
     * 		"shortcut", which indicates that the floating window contains the chart keyboard shortcuts
     * 		legend.
     * @param [params.minWidth] The minimum width of the floating window.
     * @param [params.minHeight] The minimum height of the floating window.
     * @param [params.onClose] A callback function to execute when the floating window
     * 		closes.
     * @return A [DocWindow]WebComponents.FloatingWindow.DocWindow instance.
     *
     * @static
     * @since 8.2.0
     */
    function get(
      params: {
        content: string,
        container?: HTMLElement,
        title?: string,
        tag?: string,
        minWidth?: number,
        minHeight?: number,
        onClose?: Function
      }
    ): object
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-grid-size-picker&gt;</h4>
   *
   * Creates a `<cq-grid-size-picker>` web component.
   *
   * This component supports the following attributes:
   * | attribute | description |
   * | :-------- | :---------- |
   * | maxrows   | Maximum number of rows allowed |
   * | maxcols   | Maximum number of columns allowed |
   * | resize    | Set to fixed will always have picker table at fixed max size |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when a template or new size is picked.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter  | this component |
   * | cause    | "useraction" |
   * | effect   | "update-grid" |
   * | action   | "click" |
   * | columns  | number of columns |
   * | rows     | number of rows |
   * | template | selected template |
   *
   * @example
   *		<cq-grid-size-picker maxrows="5" maxcols="5"></cq-grid-size-picker>
   *
   * @extends CIQ.UI.BaseComponent
   * @protected
   * @since 7.2.0
   * @since 9.3.0 Added new emitter
   */
  export namespace WebComponents.GridSizePicker {
    /**
     * Grid template mapping to sceen reader content
     *
     * @static
     * @since 9.3.0
     */
    let srMapping: string
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-heading&gt;</h4>
   *
   * In addition to representing the inner text of this component as an &lt;h4&gt; level header, this component also
   * allows one to filter what is displayed in a list of elements beneath another element in the DOM.  The filtering
   * is triggered by typing into to a search input.
   *
   * Note a MutationObserver is attached to the filterable element so if its contents change, this component will be
   * aware and render accordingly (see `filter-min` below).
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute    | description |
   * | :----------- | :---------- |
   * | filter-for   | A label to specify the element to filter.  The element to filter must also have its _filter-name_ attribute set to this value.  If _filter-for_ is omitted, will filter this element's next sibling. |
   * | filter-label | Text to put in the placeholder of the search input.  If omitted, will use "Search". |
   * | filter-min   | The number of filterable records below which the filter input will not appear.  If omitted, filter input will never appear. |
   * | icon         | Optional icon class name to put on left of filter. |
   * | text         | Heading text.  Appears whether or not filtering is enabled. |
   *
   * Note that the `filter-for` attribute is disregarded if the component's `itemContainer` property is set.  This property should be set to a valid container selector if used.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component whenever the search input is changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "search" |
   * | action | "input" |
   * | value | _search string_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Study search filter</caption>
   * <cq-heading class="dropdown" filter-min="15" filter-for="studylist" text="Studies"></cq-heading>
   * <cq-studies filter-name="studylist">...</cq-studies>
   *
   * @extends CIQ.UI.BaseComponent
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.Heading {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * This markup contains placeholder values which the component replaces with values from its attributes.
     * Variables are represented in double curly-braces, for example: `{{text}}`.
     * The following variables are defined:
     * | variable     | source |
     * | :----------- | :----- |
     * | text         | from attribute value |
     * | icon         | from attribute value |
     * | filter-label | from attribute value |
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-hu-dynamic&gt;</h4>
   *
   * This web component displays the dynamic heads up display.  This is a display of the market information at the point where the cursor lay.
   * The dynamic heads-up marker follows the mouse cursor.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since 7.5.0
   */
  export namespace WebComponents.HeadsUpDynamic {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-hu-static&gt;</h4>
   *
   * This web component displays the static heads up display.  This is a display of the market information at the point where the cursor lay.
   * The static heads-up marker does not follow the mouse cursor; rather, it shows in a static location on the chart as a marker.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since 7.5.0
   */
  export namespace WebComponents.HeadsUpStatic {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-help&gt;</h4>
   *
   * When long-pressed, this component can display help text. The text is displayed in a floating window popup over the chart.
   * The text which is discplayed is configured in the CIQ.Help namespace.
   * Sample help configuration is provided in the sample file in your library package, in /examples/help/helpContent.js.
   *
   * The long-press time is set in the [stxx.longHoldTime]https://documentation.chartiq.com/CIQ.ChartEngine.html#callbacks%5B%60longhold%60%5D function.
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
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
   *
   *	</cq-toggle>
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.Help {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     * This markup contains a dot which can be displayed when help is available.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-language-dialog&gt;</h4>
   *
   * Creates a dialog that the user can use to change the language.
   *
   * The actual language choices are obtained from CIQ.I18N.languages. Choosing a different language causes the entire
   * UI to be translated through use of the CIQ.I18N.setLanguage method.
   *
   * The `setHtmlLang` configuration property is used to control whether this component should change the page's default language,
   * To disable this functionality, set this attribute to false.  This can be done as illustrated in the example below,
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when a language is selected.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "change" |
   * | action | "click" |
   * | language | _language code_ |
   *
   * @example
   * <cq-dialog>
   *    <cq-language-dialog>
   *    </cq-language-dialog>
   * </cq-dialog>
   *
   * @example <caption>Adjust context config to not set &lt;html&gt; `lang` attribute</caption>
   * stxx.uiContext.config.setHtmlLang = false;
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 4.0.0 New component added.
   * - 4.1.0 Now it calls CIQ.I18N.localize instead of CIQ.I18N.setLocale.
   * - 9.1.0 Added emitter.
   * - 9.2.0 Added `cq-set-htmllang` attribute.
   */
  export namespace WebComponents.LanguageDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-lookup&gt;</h4>
   *
   * This component presents a search input for the user to enter either a ticker symbol or a part
   * of the symbol's description.  Results of the search are presented in a dropdown for the user to choose.
   *
   * A CIQ.ChartEngine.Driver.Lookup must be connected to this web component. The lookup
   * driver searches financial exchanges for symbols that match the text entered in the
   * component's input field.
   *
   * The symbol lookup can be toggled using the Ctrl+Alt+S keystroke combination (see the
   * `symbolLookup` action in `hotkeyConfig.hotkeys` in *js/defaultConfiguration.js*).
   *
   * A default lookup driver is specified in the chart configuration object (see the
   * <a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
   * tutorial).
   *
   * You can provide a different driver in the following ways:
   * - Assign the driver to the
   *   <a href="tutorial-Chart%20Configuration.html#lookupdriver" target="_blank">
   *   <code class="codeLink">lookupDriver</code></a> property of the chart configuration
   *   object
   * - Connect the driver to this component using
   *   [setDriver]WebComponents.Lookup#setDriver
   * - Add the driver to the UI context with CIQ.UI.Context#setLookupDriver
   *
   * **Note:** If the lookup component is unable to access a lookup driver, the component's
   * input field is active, but the component does not produce results.
   *
   * _**Keyboard control**_
   *
   * When selected with tab key navigation and activated with Return/Enter, this component has
   * the following internal controls:
   * - Up/Down arrow — Move selection between search input, filters, and search results
   * - Left/Right arrow — Switch between search result filters
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute            | description |
   * | :------------------- | :---------- |
   * | cq-keystroke-default | Enables the component to respond to keystrokes when the lookup input field does not have focus. <p style="margin-bottom: 0">**Warning:** This feature may conflict with keyboard shortcuts set in other components. |
   * | cq-uppercase         | Forces text to uppercase. |
   * | cq-exchanges         | Comma-delimited list of financial exchanges searched by the lookup driver. Overrides the `exchanges` parameter of CIQ.ChartEngine.Driver.Lookup. |
   *
   * In addition, the following attributes are also supported:
   * | attribute            | description |
   * | :------------------- | :---------- |
   * | cq-keystroke-claim   | Enables processing of keyboard input. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when a search is performed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "search" |
   * | action | "input" |
   * | value | _search string_ |
   * | filter | _filter_ |
   * | exchanges | _exchange list_ |
   *
   * A custom event will be emitted by the component when a result is selected.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | data | _symbol or symbolObject_ |
   *
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Customization**_
   *
   * - To hide the lookup results window, modify the CSS as follows:
   * ```css
   * .stxMenuActive cq-lookup-results { opacity: 0 }
   * ```
   *
   * - To preload default results (rather than an empty result pane) on initial load, set an
   * `onChartReady` handler in the chart configuration object (see the
   * <a href="tutorial-Chart%20Configuration.html" target="_blank">Chart Configuration</a>
   * tutorial); for example:
   *
   * ```
   * config.onChartReady = (stx) => {
   *     const defaultResults = [
   *         {
   *             "display": ["KW", "Kennedy - Wilson Holdings Inc", "NYSE"],
   *             "data": {
   *                 "symbol": "KW",
   *                 "name": "Kennedy - Wilson Holdings Inc",
   *                 "exchDisp ": "NYSE"
   *             }
   *         },
   *         {
   *             "display": ["RWR", "SPDR Series Trust - SPDR DJ Wilshire REIT ETF", "NYSEArca"],
   *             "data": {
   *                 "symbol": "RWR",
   *                 "name": "SPDR Series Trust - SPDR DJ Wilshire REIT ETF",
   *                 "exchDisp": "NYSEArca"
   *             }
   *         }
   *     ];
   *
   *     const UISymbolLookup = document.querySelector(".ciq-search cq-lookup");
   *     UISymbolLookup.results(defaultResults);
   * }
   * ````
   *
   * - The placeholder is programmatically set based on the width of the chart.
   * On larger screens "Enter Symbol" is used, but on smaller screens only "Symbol" is used.
   * As such, it is not sufficient to set a placeholder value on the HTML, as it will be overwritten by the Web Component logic.
   * The following script will update the placeholder according to breakpoint values set in placeholderMapping.
   * It should be placed inside the [onWebComponentsReady]{@tutorial Chart Configuration} callback provided in the
   * `defaultConfiguration` object to ensure it is executed once all Web Components have been properly initialized.
   * The approach here is to add a second breakpoint channel listener for the lookup component that overwrites the value set by default in the library.
   *
   * ```
   * function setLookupPlaceholders(placeholderMapping = {
   *     "break-lg": "Change symbol",
   *     "break-md": "+ symbol",
   *     "break-sm": ""
   *  }) {
   *   Array.from(uiContext.topNode.querySelectorAll('cq-lookup'))
   *   .forEach(el => {
   *         const { channels = {} } = el.context.config;
   *         el.channelSubscribe(
   *            channels.breakpoint || "channel.breakpoint",
   *            (breakPoint) => {
   *                     const symbolValue = placeholderMapping[breakpoint] || "Change symbol";
   *
   *                     const symbolInput = el.querySelector("input");
   *                     symbolInput.setAttribute("placeholder", symbolValue);
   *          );
   *        });
   *     });
   * }
   * setLookupPlaceholders();
   * ```
   *
   * @example <caption>Markup for lookup component</caption>
   * <cq-menu class="search ciq-lookup-icon" cq-focus="input" icon="ciq">
   * 		<cq-lookup cq-keystroke-claim cq-uppercase cq-exchanges="XNYS,XNAS,forex"></cq-lookup>
   * </cq-menu>
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 4.0.0 Added optional `cq-uppercase` attribute.
   * - 7.4.0 Added optional `cq-exchanges` attribute.
   * - 8.3.0 Enabled internal keyboard navigation and selection.
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.Lookup {
    /**
     * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-lookup-dialog&gt;</h4>
   *
   * This dialog allows the search and selection of securities to load on the chart.
   * It supports both primary and secondary series (comparison) selection.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute    | description |
   * | :----------- | :---------- |
   * | filter       | Security type filter for search results. |
   *
   * In addition, the following attributes are also supported:
   * | attribute        | description |
   * | :--------------- | :---------- |
   * | comparison       | INdicates that the dialog is for secondary series (comparisons). |
   * | cq-maintain-case | Set to something falsey to force capitalization of symbol. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component whenever the search input is changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "search" |
   * | action | "input" |
   * | value | _search string_ |
   *
   * A custom event will be emitted by the component whenever the search string is activated (the symbol is loaded).
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | symbol | _symbol_ |
   * | name | _symbol description_ |
   * | exchDisp | _symbol exchange_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 8.8.0
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.LookupDialog {
    /**
     * Defines order of subsections within the component.
     *
     * @static
     */
    let verticalStructure: String[]
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-measurementline-settings-dialog&gt;</h4>
   *
   * Additional dialog for setting measurement line settings, specifically what is to appear in the callout for the measurement line drawing tool.
   *
   * A custom event will be emitted from the component when any of its fields are changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | field | _name of field toggled_ |
   * | value | _true or false_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 8.9.0
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.MeasurementlineSettingsDialog {
    /**
     * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-menu&gt;</h4>
   *
   * When tapped/clicked, this component will reveal or hide a dropdown menu.
   * The component is represented by either text, an icon, both, or either depending on the browser dimensions.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute   | description |
   * | :---------- | :---------- |
   * | binding       | Helper function to call which will register a listener when the menu is opened/closed.  Usually used to reflect the current menu selection as text or an icon. |
   * | config        | Key pointing to a configuration file entry which specifies the menu options. |
   * | help-id       | A key to the correct help text in CIQ.Help.Content. |
   * | icon          | Class name for image to use for the menu. |
   * | reader        | Accessibility text when focused by a screen reader. If omitted, will use value of `text` attribute. |
   * | responsive    | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
   * | state         | The current state of the menu. |
   * | text          | Displayed label for this menu. |
   * | tooltip       | Text for the tooltip which appears when hovering over the component. |
   * | lift-dropdown | Lifts dropdown to the top level of the css stacking context. |
   *
   * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
   *
   * In addition, the following attributes are also supported:
   * | attribute   | description |
   * | :---------- | :---------- |
   * | cq-focus    | A selector to an element within the menu for which to provide focus. |
   * | cq-no-close | Set to true to force the menu to stay open when clicking on something in it (deprecated). |
   *
   * If no markup is specified in the menu component, a default markup will be provided.
   * In order to use the default markup, the selections in the menu's dropdown must be configured in the chart configuration file and specified
   * by key in the `config` attribute.  See example.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when it is opened or closed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "open", "close" |
   * | action | "click" |
   *
   * `cause` and `action` are set only when the menu is opened or closed as a direct result of clicking on the component.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Menu with binding:</caption>
   * <cq-menu class="nav-dropdown ciq-period" config="period" binding="Layout.periodicity" text="Periodicity"></cq-menu>
   * @example <caption>Menu with responsive icon:</caption>
   * <cq-menu class="nav-dropdown ciq-markers alignright" config="markers" text="Events" icon="events" responsive tooltip="Events"></cq-menu>
   * @example <caption>Sample configuration of a menu:</caption>
   * // set the menu component's config attribute to "example"
   * // This is documented further in the cq-dropdown component
   * stxx.uiContext.config.menus.example = {
   * 		content: [
   *			{ type: "radio", label: "Show Dynamic Callout", setget: "Layout.HeadsUp", value: "dynamic" },
   *			{ type: "radio", label: "Show Tooltip", setget: "Layout.HeadsUp", feature: "tooltip", value: "floating" }
   * 		]
   * };
   *
   * @extends CIQ.UI.BaseComponent
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.Menu {
    /**
     * READ ONLY. The value of the `cq-focus` attribute.
     *
     * @since 7.5.0
     */
    const focusElement : String
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * This markup contains placeholder values which the component replaces with values from its attributes.
     * Variables are represented in double curly-braces, for example: `{{text}}`.
     * The following variables are defined:
     * | variable      | source |
     * | :------------ | :----- |
     * | binding       | from attribute value |
     * | config        | from attribute value |
     * | reader        | from attribute value |
     * | icon          | from attribute value |
     * | text          | from attribute value |
     * | responsive    | from attribute value |
     * | help-id       | from attribute value |
     * | tooltip       | from attribute value |
     * | tooltip_class | "hidden" if `tooltip` attribute not specified |
     * | help_class    | "hidden" if `help-id` attribute not specified |
     * | label_class   | "hidden" if `text` attribute not specified |
     * | lift-dropdown | replaces the attribute value with a setting to lift the dropdown to the top level of the css stacking context |
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-share-button&gt;</h4>
   *
   * Button that opens a dialog that can be used to share a chart.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute      | description |
   * | :------------- | :---------- |
   * | help-id        | A key to the correct help text in CIQ.Help.Content. |
   * | icon           | Class name for image to use. |
   * | reader         | Accessibility text when focused by a screen reader. |
   * | responsive     | Set this attribute if the text displayed on this component should change to an icon when the viewport's dimensions are reduced. |
   * | text           | Displayed label for this button. |
   * | tooltip        | Text for the tooltip which appears when hovering over the component. |
   *
   * Do not include the `icon` or `text` attributes if you don't want any icon or text, respectively.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when button is pressed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "click" |
   * | action | "click" |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Button with responsive icon:</caption>
   * <cq-share-button class="bottom" text="Share" icon="share" responsive tooltip="Share"></cq-share-button>
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.0.0 Added functionality to export layouts to social media services.
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.ShareButton {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * This markup contains placeholder values which the component replaces with values from its attributes.
     * Variables are represented in double curly-braces, for example: `{{text}}`.
     * The following variables are defined:
     * | variable      | source |
     * | :------------ | :----- |
     * | reader        | from attribute value |
     * | icon          | from attribute value |
     * | text          | from attribute value |
     * | help-id       | from attribute value |
     * | responsive    | from attribute value |
     * | tooltip       | from attribute value |
     * | tooltip_class | "hidden" if `tooltip` attribute not specified |
     * | help_class    | "hidden" if `help-id` attribute not specified |
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-share-dialog&gt;</h4>
   *
   * Dialog form that allows users share/post their charts to a remote service, such as social media or a file server.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when data is generated for sharing.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" or "auto" |
   * | effect | "share" or "id" |
   * | action | "click" or null |
   * | value | _link to image, or id_ |
   *
   * A custom event will be emitted from the component when data is copied to the clipboard.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "copy" |
   * | action | "click" |
   * | value | _contents of clipboard_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 9.0.0 Added functionality to export layouts to social media services.
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.ShareDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-show-range&gt;</h4>
   *
   * This component is a container of options which allow selection of a chart's date range.  These ranges end at the present time, and begin at various
   * other times which can be programmed in the component's configuration (see example below).
   * To bind the component's configuration, set its `config` attribute to an object in the CIQ.UI.Context.config.groups object.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute   | description |
   * | :---------- | :---------- |
   * | config      | Key pointing to a component configuration entry which specifies the content items. |
   *
   * If no markup is specified in this component, a default markup will be provided.  In order to use the default markup, the selections in the menu
   * must be configured in the context configuration file and specified by key in the `config` attribute.  See example.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when that action is triggered on an item.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect |  "select" |
   * | action | "click" |
   * | multiplier | _multiplier_ |
   * | base | _base_ |
   * | periodicity | { inteval: _interval_, period: _period_, timeUnit: _timeUnit_ } |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Configuration**_
   *
   * Configuration is accomplished by setting up an object within the context configuration's groups object.  Each configuration is assigned a unique name which is
   * itself an object property of the groups object.  This property name is used as the value of the `config` attribute of this component.
   * Let's call the object containing the configuration `items`.  `items` will contain a property called `content` whose value is an array.
   * Each array element is an object which represents one item in the group.  Let's call one of these array elements, `item`.
   * Each `item` has several properties which describe the nature of the range to display.  The following table of properties describes what they mean.
   *
   * | property    | description |
   * | :---------- | :---------- |
   * | type        | Describes what type of item to display.  Valid values are described in the table below. |
   * | label       | Text to display. |
   * | className   | Optional class name to apply to item. |
   * | tap         | Name of helper function to execute when item is clicked. |
   * | iconCls     | Optional class name of an icon to display on the item. |
   * | value       | Array of arguments to pass to `tap` function. |
   * | feature     | Name of add-on to which this option belongs.  If the add-on is not loaded, the option will not appear. |
   * | helpId      | A key to the correct help text in CIQ.Help.Content. |
   * | id          | DOM id for the item. |
   *
   * Valid `type`s are described here:
   * | type      | description |
   * | :-------- | :---------- |
   * | item      | Standard text which when clicked will execute `tap` action via a helper. |
   * | heading   | Unclickable text displayed in `<h4>` tag.  May be configured to allow filtering of another element's items. |
   * | separator | Unclickable vertical line, used to separate two menu sections. |
   *
   * @example <caption>Show Range tag:</caption>
   * <cq-show-range config="example"></cq-show-range>
   * @example <caption>Sample configuration for the above tag:</caption>
   * stxx.uiContext.config.groups.example = {
   * 		content: [
   *			{ type: "item", label: "1D", tap: "set", value: [1, "today"] },
   *			{ type: "item", label: "1M", tap: "set", value: [1, month", 30, 8, "minute"] }
   * 		]
   * };
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.ShowRange {
    /**
     * Default markup generator for an item's innerHTML.  This function is called for each item in the dropdown.
     * Based on the parameters passed in, the appropriate markup is generated.
     * This function is called by WebComponents.ShowRange#populate.
     *
     * @param params
     * @param params.type Type of item, e.g. `item`, `heading`, `separator`.
     * @param [params.className] Class name of item
     * @param [params.feature] Name of add-on which when loaded, this item will become visible
     * @param [params.helpId] Name associated with help for this item
     * @param [params.iconCls] Class for the icon in the item
     * @param [params.label] Text for the item
     * @param [params.tap] Helper function for tapping
     * @param [params.value] Parameter(s) to pass to the `tap`, function.
     * 					If these aren't supplied, value will be stored in a `data` attribute.
     * 					The value is always available in the `data-value` attribute.
     * @param [params.id] DOM id atribute for the item.
     *
     * @return Markup for a single item.
     *
     * @static
     */
    function itemTemplate(
      params: {
        type: String,
        className?: String,
        feature?: String,
        helpId?: String,
        iconCls?: String,
        label?: String,
        tap?: String,
        value?: any[]|String,
        id?: String
      }
    ): String
  }

  /**
   *
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
   * The results of this component can be filtered.  See WebComponents.Heading for details.
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
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 5.2.0
   * - 8.8.0 Added `cq-favorites` flag.
   * - 9.1.0 Observes attributes. Added emitter.. Changed `cq-favorites` flag to `favorites`.
   *
   */
  export namespace WebComponents.Studies {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-study-context&gt;</h4>
   *
   * This component appears when a study is right-clicked.  A menu of actions are displayed relevant to that study.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when an action is clicked from the displayed menu.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect |  "edit", "remove", "favorite", or other custom action |
   * | action | "click" |
   * | item | _object on which the action occurs, usually a study descriptor_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 4.1.0 cq-study-context is now required (cq-dialog[cq-study-context] no longer works).
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.StudyContext {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-study-dialog&gt;</h4>
   *
   * Creates and manages study dialogs based on the corresponding study library entry (title,
   * inputs, outputs, parameters, etc.).
   *
   * Requires CIQ.UI.StudyEdit.
   *
   * _**Attributes**_
   *
   * The following attributes are supported (but not observed for changes):
   * | attribute      | description |
   * | :------------- | :---------- |
   * | cq-study-axis  | Displays UI for selecting the y-axis position (left, right, etc.), color and for inverting the y-axis *if not shared with the primary-axis*. |
   * | cq-study-panel | Displays UI for selecting the panel for the study (own, shared, etc.) and whether it is rendered as an underlay (under the primary chart) or an overlay (over the primary chart). Set this attribute to "alias" to have the panel names listed as "<Panel 1>", "<Panel 2>", etc.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it updates a study.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "update" |
   * | action | "change" |
   * | updates | _updated settings_ |
   *
   * `cause` and `action` are set only when the dialog is updated as a direct result of changing a form field.
   *
   * @example
   * <caption> Here is an example of how to create a study dialog. We add the
   * <code>cq-study-axis</code> and <code>cq-study-panel</code> attributes to enable form fields
   * used to control axis position, color, study panel, and underlay/overlay.
   * </caption>
   * <cq-dialog>
   *      <cq-study-dialog cq-study-axis cq-study-panel></cq-study-dialog>
   * </cq-dialog>
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 5.2.0 Optional Attributes `cq-study-axis` and `cq-study-panel` are now available.
   * - 6.3.0 `cq-study-axis` now also provides a check box allowing users to invert study y-axis
   * 		if not shared with the primary-axis.
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.StudyDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
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
   * - Up/Down arrow — Move selection between legend entries
   * - Left/Right arrow — Select a control within a selected entry, such as
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
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
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
   * @extends CIQ.UI.ModalTag
   * @protected
   * @since
   * - 8.3.0 Enabled internal keyboard navigation and selection.
   * - 8.6.0 added `cq-signal-studies-only` flag.
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.StudyLegend {
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
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-swatch&gt;</h4>
   *
   * An interactive color swatch. Relies on the existence of a CIQ.UI.ColorPicker component.
   * Interactivity can be disabled by adding cq-static attribute.
   *
   * When a color is selected, setColor(color) will get called for any parent component with that
   * method.
   * The swatch will display special states such as "auto" or "none" with distinct images.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute | description |
   * | :-------- | :---------- |
   * | color     | Active swatch color |
   * | overrides | A comma-delimited list of "colors" which should be supported by the color picker when the swatch is clicked. |
   * | static    | Set to "true" to disable interactivity. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it is clicked, and the color picker opened.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "open" |
   * | action | "click" |
   *
   * A custom event will be emitted from the component when the color is changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "setColor", undefined |
   * | effect | "change" |
   * | action | null |
   * | value | _color value_ |
   *
   * @example
   * <cq-swatch color="red" overrides="auto" static="false"></cq-swatch>
   *
   * @extends CIQ.UI.BaseComponent
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.Swatch {
    /**
     * Optionally set the default color for the swatch.
     */
    let defaultColor: string
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-theme-dialog&gt;</h4>
   *
   * Enables creation of custom chart themes.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * See WebComponents.Themes for more details on menu management for this component.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it saves a theme.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "save" |
   * | action | "click" |
   * | name | _theme name_ |
   * | theme | _theme data_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.ThemeDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-themes&gt;</h4>
   *
   * This web component displays available themes in a menu.  It also allows for custom themes to be removed.
   * The menu updates automatically with new themes that are created from the theme dialog.
   *
   * Built in themes are merely the names of classes that will be added to the top element of the UIContext when
   * selected.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute | description |
   * | :-------- | :---------- |
   * | theme     | Name of last theme selected. Note the current theme's attributes may be changed after setting the theme. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when a theme is selected or removed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select", "remove" |
   * | action | "click" |
   * | value | _theme name_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.Themes {
    /**
     * READ ONLY. All context containers on the multichart.
     *
     */
    const contextContainers : HTMLElement[]
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-timezone-dialog&gt;</h4>
   *
   * Provides content for timezone settings dialog.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it changes the timezone, or removes the current setting.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "change", "remove" |
   * | action | "click" |
   * | zone | _timezone_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.TimezoneDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-toggle&gt;</h4>
   *
   * When tapped/clicked, this component will toggle through different states.  Each state represents a value of an object's member;
   * for example, the object could be the chart's layout or preferences, while the member could be a property of these objects.
   * If the `member` attribute of the toggle is set, the toggle state is bound to that member, meaning, if the underlying member value
   * is changed, the toggle will change state to reflect that.
   *
   * Use [registerCallback]WebComponents.Toggle#registerCallback to receive a callback
   * every time the toggle changes. When a callback is registered, any automatic class changes are
   * bypassed.
   *
   * To bind the component's configuration, set its `config` attribute to an object in the CIQ.UI.Context.config.toggles object.
   * Using a configuration allows easy customization of callback functions.  See example below.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute      | description |
   * | :------------- | :---------- |
   * | action         | If set to "class" (the default), will set/unset the "active" class on the component when executing callbacks. |
   * | config         | Key pointing to a configuration file entry which specifies the callback functions. |
   * | help-id        | A key to the correct help text in CIQ.Help.Content. |
   * | icon           | Class name for image to use for the toggle. |
   * | member         | Object member to observe. If not provided, then callbacks are used exclusively. |
   * | multichart-distribute | Option for multichart context. Distributes object member change to all charts. |
   * | reader         | Accessibility text when focused by a screen reader. |
   * | stxtap         | Custom click handling which overrides the default toggling functionality. |
   * | toggles        | A comma-separated list of values which are toggled through with each click. The list can include "null". Stringified booleans and "null" are converted to their primitive values. All other values are passed to the Number constructor. If the result is a number (not NaN), the number is used. Otherwise the value is left as a string. |
   * | toggle-classes | A comma-separated list of classes associated with the toggle setting. If a setting requires multiple classes, they need to be separated with spaces. |
   * | tooltip        | Text for the tooltip which appears when hovering over the component. |
   * | value          | The current state of the toggle. |
   *
   * In addition, the following attributes are also supported:
   * | attribute     | description |
   * | :------------ | :---------- |
   * | active-class  | A class name to add to a binary state toggle if it is in an active state. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when it is clicked.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "toggle" |
   * | action | "click" |
   * | value | _value_ |
   *
   * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Toggle bound to layout.crosshair:</caption>
   * <cq-toggle member="layout.crosshair" reader="Crosshair" tooltip="Crosshair (Alt + \)" icon="crosshair"></cq-toggle>
   * @example <caption>Registering a callback function directly:</caption>
   * document.querySelector("cq-toggle").registerCallback(function(value){
   *    console.log("current value is " + value);
   *    if(value != false) this.classList.add("active");
   * });
   * @example <caption>Registering a callback function via the config:</caption>
   * // set the toggle component's config attribute to "example"
   * stxx.uiContext.config.toggles.example.callbacks = [function (value) {
   *    console.log("current value is " + value);
   *    if(value != false) this.classList.add("active");
   * }];
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 2015
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.Toggle {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * This markup contains placeholder values which the component replaces with values from its attributes.
     * Variables are represented in double curly-braces, for example: `{{text}}`.
     * The following variables are defined:
     * | variable      | source |
     * | :------------ | :----- |
     * | reader        | from attribute value |
     * | icon          | from attribute value |
     * | help-id       | from attribute value |
     * | tooltip       | from attribute value |
     * | tooltip_class | "hidden" if `tooltip` attribute not specified |
     * | help_class    | "hidden" if `help-id` attribute not specified |
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-view-dialog&gt;</h4>
   *
   * Provides content for view save dialog.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * See WebComponents.Views for more details on menu management for this component.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when it saves a view.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "save" |
   * | action | "click" |
   * | name | _view name_ |
   * | view | _view data_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.ViewDialog {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-views&gt;</h4>
   *
   * This web component displays available views in a menu.  It also allows for custom views to be removed.
   * The menu updates automatically with new views that are created from the views dialog.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when a view is selected or removed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select", "remove" |
   * | action | "click" |
   * | value | _layout_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.Views {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-volumeprofile-settings-dialog&gt;</h4>
   *
   * Additional dialog for setting volume profile settings, specifically what is to appear in the callout for the volume profile drawing tool.
   *
   * A custom event will be emitted from the component when any of its fields are changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | field | _name of field toggled_ |
   * | value | _true or false_ |
   *
   * @extends CIQ.UI.DialogContentTag
   * @protected
   * @since
   * - 8.4.0
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.VolumeprofileSettingsDialog {
    /**
     * Default markup for the comparison legend's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-wave-parameters&gt;</h4>
   *
   * The wave parameters web component is used to supplement the [cq-drawing-settings]WebComponents.DrawingSettings component.
   * It displays additional settings options specific to the Elliott Wave drawing tool.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute  | description |
   * | :--------- | :---------- |
   * | corrective | Sequence of labels representing the corrective wave. |
   * | decoration | Vertex labeling style. |
   * | impulse    | Sequence of labels representing the impulse wave. |
   * | show-lines | Whether the lines are drawn between vertices. |
   * | template   | Wave pattern.  Changing this may change other attributes automatically. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when it is clicked.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | name | _property_ |
   * | value | _value_ |
   *
   * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example <caption>Markup for Wave Parameters</caption>
   *		<cq-wave-parameters role="group" aria-label="Wave Parameters"></cq-wave-parameters>
   *
   * @extends CIQ.UI.ContextTag
   * @protected
   * @since
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.WaveParameters {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-color-picker&gt;</h4>
   *
   * The color picker is a dialog which allows the user to choose a color to apply to the item which presented the color picker.
   * The item is usually a "swatch" WebComponents.Swatch which is embedded in elsewhere, like in a study dialog or drawing palette.
   * In addition to colors, there can be configured "overrides", which are buttons under the color picker allowing the user to choose something
   * other than a specific color, for example, "None" or "Auto".
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute    | description |
   * | :----------- | :---------- |
   * | cq-active    | Set if the element is visible |
   * | cq-colors    | Contains a comma-separated list of CSS colors to use |
   *
   * In addition, there are two ways to set the colors.  These are given in the examples below.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when a color is selected.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | value | _color value_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   * This component is automatically created if it doesn't exist in the DOM already.
   *
   * @example <caption>Set colors for instance: `setColors()` can be passed a two dimensional array of colors</caption>
   * const myColorPicker = document.querySelector("cq-color-picker");
   * myColorPicker.setColors([["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]]);
   *
   * @example <caption>Set colors for Component class: `ColorPicker.defaultColors` can be set to a two dimensional array of colors</caption>
   * // Note: do this before creating the ChartEngine
   * const pickerClassDef = CIQ.UI.components("cq-color-picker")[0].classDefinition;
   * pickerClassDef.defaultColors=[["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7", "#a0a0a5", "#898989", "#707070", "#626262", "#555555", "#464646", "#363636", "#262626", "#1d1d1d", "#000000"]];
   *
   * @extends WebComponents.Dialog
   * @protected
   * @since
   * - 9.1.0 Added emitter.
   */
  export namespace WebComponents.ColorPicker {
    /**
     * Default array of colors for the component.
     *
     * @static
     * @example
     * ColorPicker.defaultColors = [
     *	["#ffffff", "#e1e1e1", "#cccccc", "#b7b7b7"],
     *	["#f4977c", "#f7ac84", "#fbc58d", "#fff69e"]
     * ];
     *
     */
    let defaultColors: String[][]
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   *  This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   *  <h4>&lt;cq-drawing-palette&gt;</h4>
   *
   * This component is used to facilitate drawing and annotating on the chart. It displays a palette
   * for control and management of drawing tools.
   *
   * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
   *
   * This works in conjunction with the [cq-drawing-settings]WebComponents.DrawingSettings component
   * and replaces the cq-toolbar component, providing additional functionality
   * and an improved user experience.
   *
   * Drawing tools support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool
   * `cq-item` element. Combinations take the form Alt+key (upper- or lowercase); for example, Alt+a or
   * Alt+A — in either case, the key combination works whether the key is shifted or not. Users can also
   * add the modifier Ctrl to the keystroke combination. For example, both Alt+R and Ctrl+Alt+R activate the
   * Rectangle tool. The added Ctrl modifier helps provide a unique keystroke combination in the event the Alt+key
   * combination is assigned to a function in the web browser or to an application on the user's system.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute   | description |
   * | :---------- | :---------- |
   * | view        | Palette display style: "grid" or "list". |
   * | active-tool | Current active drawing tool. |
   * | docked      | The docked state of the palette. Set to "false" to float palette over the chart. |
   *
   * In addition, the following attributes are also supported:
   * | attribute            | description |
   * | :------------------- | :---------- |
   * | cq-keystroke-claim   | Enables processing of keyboard input. |
   *
   * If no markup is specified in the menu component, a default markup will be provided.  It is **strongly suggested** to allow the default markup
   * to be used.
   * The default markup utilizes the drawing tools and grouping options set in the default configuration, which is customizable through the component's `context.config` property.
   *
   * _**Emitters**_
   *
   * A custom event will be emitted from the component when its view mode is changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | effect | "toggle" |
   * | view | _mode_ |
   *
   * A custom event will be emitted from the component when the active tool is changed.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | effect | "select" |
   * | toolName | _tool name_ |
   * | activator | _button element pressed_ |
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example
   *	<cq-drawing-palette
   *		class="palette-drawing grid palette-hide"
   *		docked="true"
   *		orientation="vertical"
   *		min-height="300"
   *		cq-drawing-edit="none"
   *		cq-keystroke-claim
   *		view="grid"
   *		active-tool="notool"
   *	></cq-drawing-settings>
   *
   * @extends WebComponents.Palette
   * @protected
   * @since
   * - 7.1.0
   * - 7.2.0 The drawing settings section has been moved into its own component, [cq-drawing-settings]WebComponents.DrawingSettings.
   * - 7.4.0 Drawing tools now support keystroke combinations by setting a `cq-tool-shortcut` attribute in the tool button.
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.DrawingPalette {
    /**
     * Default markup for the innerHTML of a cq-item tag. Used by DrawingPalette.markup.
     *
     * @param label text to be displayed or read.
     * @param [icon] icon class.
     * @param [helpId] value of the help-id attribute.
     * @return HTML markup for the tag's interior.
     *
     * @static
     *
     */
    function itemInterior(label: string, icon?: string, helpId?: string): string
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * This markup contains placeholder values which the component replaces with values from its attributes.
     * Variables are represented in double curly-braces, for example: `{{text}}`.
     * The following variables are defined:
     * | variable  | source |
     * | :-------- | :----- |
     * | tools     | from context configuration object |
     *
     * @static
     */
    let markup: String
  }

  /**
   *
   *
   * This is a custom HtmlElement (Web Component).  The tag name is the following:
   *
   * <h4>&lt;cq-drawing-settings&gt;</h4>
   *
   * Drawing Settings palette web component used to draw and annotate on the chart. Displays a palette
   * along the top of the chart for managing tool settings.
   *
   * Inherits from `<cq-palette>`. Palette components must be placed within a `<cq-palette-dock>` component.
   *
   * This works in conjunction with the [cq-drawing-palette]WebComponents.DrawingPalette component
   * and replaces the cq-toolbar component, providing additional functionality
   * and an improved user experience.
   *
   * _**Attributes**_
   *
   * This component observes the following attributes and will change behavior if these attributes are modified:
   * | attribute    | description |
   * | :----------- | :---------- |
   * | docked       | The docked state of the palette. Set to "false" to float palette over the chart. |
   * | hide         | The hidden state of the palette. Set to "false" to show palette. |
   * | active-tool  | Current active drawing tool. |
   * | axis-label   | "true" to enable axis label. |
   * | line-color   | Current line color in hex format, or "auto" to select color from theme. |
   * | fill-color   | Current fill color in hex format, or "auto" to select color from theme. |
   * | font-family  | Current font name. Note: specified font must be available in the end-user's system. |
   * | font-size    | Current font size in valid css units. |
   * | font-italic  | "true" to enable font italics style. |
   * | font-bold    | "true" to enable font bold style. |
   * | line-width   | Line width in pixels. |
   * | line-pattern | Line pattern: "solid", "dotted" or "dashed". |
   * | show-callout | "true" to enable display of callout. |
   * | span-panels  | "true" to enable span panels. |
   *
   * _**Emitters**_
   *
   * A custom event will be emitted by the component when it is clicked.
   * See CIQ.UI.BaseComponent#emitCustomEvent for details on how to listen for this event.
   * The details of the event contain the following:
   * | property | value |
   * | :------- | :---- |
   * | emitter | this component |
   * | cause | "useraction" |
   * | effect | "select" |
   * | action | "click" |
   * | name | _property_ |
   * | value | _value_ |
   *
   * `cause` and `action` are set only when the value is changed as a direct result of clicking on the component.
   *
   * This component comes with a default markup which is used when the component tag contains no other markup when it is added to the DOM.
   * The default markup provided has accessibility features.
   *
   * @example
   *	<cq-drawing-settings
   *		class="palette-settings"
   *		docked="true"
   *		hide="true"
   *		orientation="horizontal"
   *		min-height="40"
   *		cq-drawing-edit="none"
   *		line-pattern="solid"
   *		font-size="12px"
   *		font-family="Helvetica, sans-serif"
   *		fill-color="#7DA6F5"
   *		line-color="auto"
   *		active-tool="notool"
   *	></cq-drawing-settings>
   *
   * @extends WebComponents.Palette
   * @protected
   * @since
   * - 7.2.0
   * - 9.1.0 Observes attributes. Added emitter.
   */
  export namespace WebComponents.DrawingSettings {
    /**
     * Default markup for the component's innerHTML, to be used when the component is added to the DOM without any innerHTML.
     *
     * @static
     */
    let markup: String
  }
}
export function abstractMarker(_export): void
export function advertisement(_export): void
export function aggregationDialog(_export): void
export function attribution(_export): void
export function chartInstructions(_export): void
export function chartTitle(_export): void
export function clickable(_export): void
export function close(_export): void
export function comparison(_export): void
export function cvpController(_export): void
export function dataDialog(_export): void
export function dialog(_export): void
export function doubleSlider(_export): void
export function drawingContext(_export): void
export function dropdown(_export): void
export function fibSettingsDialog(_export): void
export function floatingWindow(_export): void
export function gridSizePicker(_export): void
export function heading(_export): void
export function headsupDynamic(_export): void
export function headsupStatic(_export): void
export function help(_export): void
export function instantChart(_export): void
export function languageDialog(_export): void
export function loader(_export): void
export function lookup(_export): void
export function lookupDialog(_export): void
export function marker(_export): void
export function measurementLineSettingsDialog(_export): void
export function menu(_export): void
export function messageToaster(_export): void
export function palette(_export): void
export function paletteDock(_export): void
export function redo(_export): void
export function scroll(_export): void
export function shareButton(_export): void
export function shareDialog(_export): void
export function showRange(_export): void
export function sideNav(_export): void
export function sidePanel(_export): void
export function studies(_export): void
export function studyContext(_export): void
export function studyDialog(_export): void
export function studyLegend(_export): void
export function swatch(_export): void
export function themeDialog(_export): void
export function themes(_export): void
export function timezoneDialog(_export): void
export function toggle(_export): void
export function typedefs(_export): void
export function undo(_export): void
export function viewDialog(_export): void
export function views(_export): void
export function volumeProfileSettingsDialog(_export): void
export function waveParameters(_export): void
export function yAxisContext(_export): void
export function colorPicker(_export): void
export function drawingPalette(_export): void
export function drawingSettings(_export): void
export function menuDropdown(_export): void