This folder contains sample web pages that demonstrate the use of the charting library.

>## Please note that depending on your package, not all these sample templates will be fully functional for you.  If you require the additional components necessary for one of these templates, please contact your account manager.

The following ready-to-use files are provided:

- **sample-template-basic.html**:
  A basic implementation with a chart and some UI controls.

- **sample-template-active-trader.html**:
  A basic implementation with all the tools needed to successfully trade from the chart.

- **sample-template-institutional.html**:
  A basic implementation with a chart, some UI controls, time span event markers, and a projected volume study.

- **sample-template-term-structure.html**:
  A basic implementation with a chart that displays term structure data.

- **sample-template-options.html**:
  A basic implementation with a chart, some UI controls, and an option sentiment study.

- **sample-template-advanced.html**:
  A feature-rich implementation with most of the advanced charting capabilities enabled.

- **sample-template-instant-chart.html**:
  An implementation showcasing how to load an entire advanced chart in a single web component.

- **sample-template-multichart.html**:
  An implementation of multiple charts using a single set of UI controls.

- **sample-template-scatterplot.html**:
  An implementation of a scatterplot chart and special UI controls for cross-sectional data analysis.

To use one of the above template files, copy it to the root directory of the library package.

There are also two subfolders in this folder:

- **partials**

   Contains the following files:
   - _sample-template-advanced-context.html_ -- The HTML portion of the _sample-template-advanced.html_ file
   - _sample-template-advanced-multi-context.html_ -- The HTML portion of the _sample-template-multichart.html_ file
   - _sample-template-cross-section-context.html_ -- The HTML portion of the _sample-template-term-structure.html_ file

   These files are useful for constructing your own application page using a bundling tool such as Webpack (see the Webpack example provided in this package).

   You won't need them if you are creating your page from the sample pages included in the **templates** folder.
