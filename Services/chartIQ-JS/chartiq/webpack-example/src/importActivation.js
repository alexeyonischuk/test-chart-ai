/* global __TREE_SHAKE__ */
/* This section enables various features within the library. Anything not specified will be tree-shaken.
 * Note that imports always happen before code execution; hence, this example is organized for ease of
 * comprehension rather than by expected execution order.
 */
import { CIQ } from "chartiq/js/chartiq";
import * as Standard from "chartiq/js/standard";
import * as AddOns from "chartiq/js/addOns";
import * as Components from "chartiq/js/components";
/* Uncomment to see all available feature names in console */
//console.log(Object.keys(Standard));
//console.log(Object.keys(AddOns));
//console.log(Object.keys(Components));
// __TREE_SHAKE_ is a global defined by the DefinePlugin in webpack.config.js.
// It must be defined to accomplish tree-shaking.  If it is not defined, all
// features will automatically be activated and there will be no tree-shaking.
// If tree-shaking is not desired, the DefinePlugin should be removed and then this
//  block can be removed as well.
if (typeof __TREE_SHAKE__ !== "undefined" && __TREE_SHAKE__) {
	/* comment out any feature you do not want in your bundle */
	CIQ.activateImports(
		Standard.createEngine,
		Standard.customCharts,
		Standard.drawing,
		Standard.easeMachine,
		Standard.equations,
		Standard.events,
		Standard.i18n,
		Standard.interaction,
		Standard.markers,
		Standard.market,
		Standard.movement,
		Standard.nameValueStore,
		Standard.quoteFeed,
		Standard.series,
		Standard.share,
		Standard.span,
		Standard.storage,
		Standard.studies,
		Standard.symbolLookupBase,
		Standard.theme,
		Standard.timezone,
		Standard.touch,
		Standard.visualization,
		Standard.medianPrice,
		Standard.momentum,
		Standard.priceRelative,
		Standard.vwap,
		Standard.zigzag,
		AddOns.dataLoader,
		AddOns.extendedHours,
		AddOns.fullScreen,
		AddOns.inactivityTimer,
		AddOns.rangeSlider,
		AddOns.shortcuts,
		AddOns.tableView,
		AddOns.tooltip,
		Components.abstractMarker,
		Components.advertisement,
		Components.aggregationDialog,
		Components.attribution,
		Components.chartInstructions,
		Components.chartTitle,
		Components.clickable,
		Components.close,
		Components.comparison,
		Components.cvpController,
		Components.dataDialog,
		Components.dialog,
		Components.doubleSlider,
		Components.drawingContext,
		Components.dropdown,
		Components.fibSettingsDialog,
		Components.floatingWindow,
		Components.gridSizePicker,
		Components.heading,
		Components.headsupDynamic,
		Components.headsupStatic,
		Components.help,
		Components.instantChart,
		Components.languageDialog,
		Components.loader,
		Components.lookup,
		Components.lookupDialog,
		Components.marker,
		Components.measurementLineSettingsDialog,
		Components.menu,
		Components.messageToaster,
		Components.palette,
		Components.paletteDock,
		Components.redo,
		Components.scroll,
		Components.shareButton,
		Components.shareDialog,
		Components.showRange,
		Components.sideNav,
		Components.sidePanel,
		Components.studies,
		Components.studyContext,
		Components.studyDialog,
		Components.studyLegend,
		Components.swatch,
		Components.themeDialog,
		Components.themes,
		Components.timezoneDialog,
		Components.toggle,
		Components.undo,
		Components.viewDialog,
		Components.views,
		Components.volumeProfileSettingsDialog,
		Components.waveParameters,
		Components.colorPicker,
		Components.drawingPalette,
		Components.drawingSettings,
		Components.menuDropdown,
		Components.yAxisContext,
		null
	);
}
