# Webpack example folder

This folder contains examples that are provided as a starting point for developers wishing to use webpack.

The included examples produce an advanced chart template if the Technical Analysis (TA) package is included in the bundle. Otherwise, it produces a basic template with no custom add-ons.

Developers whose bundle does not include the TA package can copy the differences between the basic template and their package's template into the webpack example to create a webpack template suitable for their package.

The following ready-to-use examples are provided:

- **webpack.config.js**
  Loads sample-template-advanced in webpack.
- **webpack.config.minimal.js**
  Loads helloworld in webpack.
- **webpack.config.mobile.js**
  Loads sample-template-native-sdk in webpack.
- **webpack.config.term.js**
  Loads sample-template-term-structure in webpack. (requires term structure plugin)
