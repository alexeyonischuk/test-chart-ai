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
 * > <br>**One cq-ui-manager tag is allowed for the entire page, even when multiple charts are instantiated.**
 * >
 * > `cq-context` is a special tag that groups a set of components to a particular chart. Any component that is nested within a `cq-context` will look to that context
 * in order to find its chart. For instance, menu items within a `cq-context` will interact with the chart engine that is attached to the context.
 *
 * **Performance considerations:** These web components include dynamically updating modules that will react to every data change and redraw certain elements.
 * Although visually pleasing, they can sometimes cause performance issues on slow devices or when multiple charts are displayed.
 * See {@link CIQ.UI.animatePrice} for setting options.
 *
 * See {@link CIQ.UI.ContextTag}, which provides a model and base functionality for many components
 *
 * See the following tutorial for further details on how to work with and customize the included web components: {@tutorial Web Component Interface}.
 *
 * @namespace
 * @name WebComponents
 */
