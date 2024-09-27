/*
 * This configuration is meant as an illustration of how to load helloworld in webpack.
 */
/* eslint-env node */
import path from "node:path";
import url from "node:url";
import webpack from "webpack";
import * as BundleAnalyzerPlugin from "webpack-bundle-analyzer"; // awesome tool for inspecting your bundle
import CssPlugin from "mini-css-extract-plugin"; // used for packaging css into bundles
import HtmlWebpackPlugin from "html-webpack-plugin"; // used to load html
import TerserPlugin from "terser-webpack-plugin"; // used to control what comments get removed
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const defaultDir = path.join(dirname, "../");
const env = process.env.NODE_ENV || "production";
export default {
	entry: {
		core: "./src/sample-template-webpack-minimal.js"
	},
	mode: env,
	module: {
		/**
		 * Webpack uses loaders to handle files types other than JavaScript
		 * This section is where we configure all of the loaders used to it easy to consume ChartIQ
		 * These loaders will grab any file that matches the test in the dependency graph created from an entry.
		 * Read more about loaders in webpack:
		 * https://webpack.js.org/concepts/#loaders
		 */
		rules: [
			{
				/**
				 * Tests any file in the bundle for .scss or .css extension using the scss-loader or secondarily the css-loader
				 * Use it for loading any styles in the dependency graph of your bundle.
				 * By default it will load SASS files and bundle them and check for CSS files.
				 * The options object sets a public path where you can find the output.
				 * Read more about sass-loader:
				 * https://webpack.js.org/loaders/sass-loader/
				 * Read more about css-loader:
				 * https://webpack.js.org/loaders/css-loader/
				 */
				test: /\.css$/,
				use: [
					{
						loader: CssPlugin.loader,
						options: { esModule: false, publicPath: "css/" }
					},
					"css-loader"
				]
			},
			{
				/**
				 * Tests any file for a variety of different image file extensions.
				 * This loader will create files for the images; they will not be in the bundle.
				 * It is used for packaging imported images and images in stylesheets when referenced with url() in setting a CSS property value (both CSS and SCSS).
				 * The options object sets a public path where you can find the output.
				 * Read more: https://webpack.js.org/guides/asset-modules/
				 */
				test: /\.(jpg|gif|png|svg|cur)$/,
				type: "asset/resource",
				generator: {
					filename: "css/img/[name][ext]",
					publicPath: "../"
				}
			}
		]
	},
	optimization: {
		/**
		 * Minimizer allows us to define minification parameters.
		 * The TerserPlugin configuration makes sure license comments remain in the bundle.
		 * The CssMinimizerPlugin minifies the css output.
		 */
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: /(^\**!)|@preserve|@license|@cc_on/i
					}
				},
				extractComments: false
			})
		]
	},
	output: {
		filename: "js/chartiq-[name].js"
	},
	plugins: [
		/**
		 * Uncomment below line to see the bundler analyzer output in the browser after build
		 */
		//new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
		/**
		 * Extracts all of our CSS and SCSS and emits them into one unified stylesheet output.
		 * Read more about the Extract CSS Chunks Plugin:
		 * https://webpack.js.org/plugins/mini-css-extract-plugin/
		 */
		new CssPlugin({
			experimentalUseImportModule: false,
			filename: "./css/chartiq-[name].css"
		}),
		/**
		 * Generates an HTML file for your bundle and inserts the output files into it with script tags.
		 * By using the HTML Plugin you can create a fresh copy of your HTML page on each build,
		 * this allows you to serve the entire output of /dist/ instead of needing to reference files from /dist/ in your index.html
		 * Read more about the HTML Plugin:
		 * https://webpack.js.org/plugins/html-webpack-plugin/
		 */
		new HtmlWebpackPlugin({ title: "" }),
		/**
		 * Removes code from final build.  Specifically, removes auto-initialize so features can be tree-shaken.
		 */
		new webpack.DefinePlugin({
			__TREE_SHAKE__: JSON.stringify(env === "production")
		})
	],
	resolve: {
		/**
		 * If you're not using ChartIQ in a tarball format readable by NPM then you'll need to inform Webpack where the files are located
		 * This alias tells webpack to make these files and folders available for anything any file that needs them in the dependency graph.
		 */
		alias: {
			chartiq: defaultDir
		}
	}
};
