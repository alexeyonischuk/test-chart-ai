/* global __TREE_SHAKE__ */
/* This section enables the deprecated web components, for use with old templates pre 9.0 version of the library.
 */
import { CIQ } from "chartiq/js/chartiq";
import * as Components from "chartiq/js/components-legacy";
/* Uncomment to see all available feature names in console */
//console.log(Object.keys(Components));
// __TREE_SHAKE_ is a global defined by the DefinePlugin in webpack.config.js.
// It must be defined to accomplish tree-shaking.  If it is not defined, all
// features will automatically be activated and there will be no tree-shaking.
// If tree-shaking is not desired, the DefinePlugin should be removed and then this
//  block can be removed as well.
if (typeof __TREE_SHAKE__ !== "undefined" && __TREE_SHAKE__) {
	/* comment out any feature you do not want in your bundle */
	CIQ.activateImports(
		Components.abstractMarker,
		Components.advertisement,
		Components.aggregationDialog,
		Components.attribution,
		Components.chartcontrolGroup,
		Components.chartLegend,
		Components.chartTitle,
		Components.clickable,
		Components.close,
		Components.comparison,
		Components.comparisonLookup,
		Components.cvpController,
		Components.dataDialog,
		Components.dialog,
		Components.drawingContext,
		Components.fibSettingsDialog,
		Components.heading,
		Components.help,
		Components.infoToggle,
		Components.infoToggleDropdown,
		Components.languageDialog,
		Components.lookup,
		Components.lookupDialog,
		Components.measurementLineSettingsDialog,
		Components.menu,
		Components.menuContainer,
		Components.messageToaster,
		Components.palette,
		Components.shareButton,
		Components.shareDialog,
		Components.showRange,
		Components.sideNav,
		Components.sidePanel,
		Components.studies,
		Components.studyContext,
		Components.studyDialog,
		Components.studyInput,
		Components.studyLegend,
		Components.studyMenuManager,
		Components.studyOutput,
		Components.studyParameter,
		Components.swatch,
		Components.themeDialog,
		Components.themePiece,
		Components.themes,
		Components.timezoneDialog,
		Components.toggle,
		Components.toolbar,
		Components.viewDialog,
		Components.views,
		Components.volumeProfileSettingsDialog,
		Components.waveParameters,
		Components.colorPicker,
		Components.drawingPalette,
		Components.drawingSettings,
		null
	);
}
