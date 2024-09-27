/* Place styles up here so they can be overridden by plugin and page styles if need be */
import "chartiq/css/normalize.css";
import "chartiq/css/page-defaults.css";
import "chartiq/css/stx-chart.css";
import "chartiq/css/chartiq.css";
import "chartiq/css/webcomponents.css";
import { CIQ } from "chartiq/js/chartiq";
import getLicenseKey from "chartiq/key.js";
getLicenseKey(CIQ);
import "./importActivation.js"; /* activates modules when using license-generated bundles such as standard.js */
import "./importActivationAdvanced.js"; /* activates advanced modules */

/* Uncomment to enable the deprecated functions.  Update your calls to functions in here to employ current usage. */
//import "chartiq/js/deprecated";

/* Uncomment to enable these plugins */
//import "chartiq/examples/feeds/L2_simulator"; /* for use with activetrader sample */
//import "chartiq/plugins/activetrader/cryptoiq";
//import "chartiq/plugins/analystviews/components";
//import "chartiq/plugins/scriptiq/scriptiq";
import "chartiq/plugins/signaliq/signaliqDialog";
import "chartiq/plugins/signaliq/signaliq-marker";
import "chartiq/plugins/signaliq/signaliq-paintbar";
import "chartiq/plugins/studybrowser";
//import "chartiq/plugins/technicalinsights/components";
//import "chartiq/plugins/tfc/tfc-loader";
//import "chartiq/plugins/tfc/tfc-demo"; /* if using demo account class */
//import "chartiq/plugins/timespanevent/timespanevent";
//import "chartiq/plugins/timespanevent/examples/timeSpanEventSample"; /* if using sample */
//import "chartiq/plugins/visualearnings/visualearnings";
/* end plugins */

import getDefaultConfig from "chartiq/js/defaultConfiguration";
//import "chartiq/examples/help/helpContent";
import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm";
import EmojiPopover from "chartiq/js/thirdparty/emoji-popover.es";
import quotefeed from "chartiq/examples/feeds/quoteFeedSimulator";
import "chartiq/examples/feeds/symbolLookupChartIQ";
import "chartiq/examples/markets/marketDefinitionsSample";
import "chartiq/examples/markets/marketSymbologySample";
import "chartiq/examples/markets/timezones";
import marker from "chartiq/examples/markers/markersSample";

import "chartiq/examples/markers/tradeAnalyticsSample";
import "chartiq/examples/markers/videoSample";
import "chartiq/examples/translations/translationSample";

/* Add to use the option chain simulator for option-based functionality (such as optionVolumeByStrike study).
 	Then use optionfeed instead of quotefeed in the object parameter for getDefaultConfig. */
// import optionfeed from "chartiq/examples/feeds/optionChainSimulator";
/* Remove if not using the forecasting simulator (required for the forecasting sample). */
import forecastfeed from "chartiq/examples/feeds/quoteFeedForecastSimulator";

/* Create and customize default configuration */
const resources = {
	markerFeed: marker.MarkersSample,
	scrollStyle: PerfectScrollbar,
	emojiPicker: EmojiPopover,
	quoteFeed: quotefeed,
	forecastQuoteFeed: forecastfeed
};
const config = getDefaultConfig(resources);
// Load the chart
let stxx = config.createChart();
// Simulate L2 data
// In your implementation, you must instead load L2 data
// using https://documentation.chartiq.com/CIQ.ChartEngine.html#updateCurrentMarketData
//CIQ.simulateL2({ stx: stxx, onInterval: 1300, onTrade: true });
/**
 * The following is only for the library use with classic script tags.
 * It invokes ciqAvailable hook function defined in index.html file providing the library resources
 */
window.addEventListener("load", () => {
	if (window.ciqAvailable) {
		window.ciqAvailable({
			CIQ,
			...resources
		});
	}
});
