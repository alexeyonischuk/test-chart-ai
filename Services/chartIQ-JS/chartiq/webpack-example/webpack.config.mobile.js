/*
 * This configuration is meant as an illustration of how to load sample-template-native-sdk in webpack.
 * We've already split the file into index.html and sample-template-native-sdk-webpack.js.
 */
/* eslint-env node */
import path from "node:path";
import url from "node:url";
import webpack from "webpack";
import * as BundleAnalyzerPlugin from "webpack-bundle-analyzer"; // awesome tool for inspecting your bundle
import CssPlugin from "mini-css-extract-plugin"; // used for packaging css into bundles
import HtmlWebpackPlugin from "html-webpack-plugin"; // used to load html
import HtmlWebpackPartialsPlugin from "html-webpack-partials-plugin"; // used to load html partials
import TerserPlugin from "terser-webpack-plugin"; // used to control what comments get removed
const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const defaultDir = path.join(dirname, "../");
const env = process.env.NODE_ENV || "production";
export default {
	entry: {
		core: "./src/sample-template-native-sdk-webpack.js"
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
				test: /\.(s)?css$/,
				type: "javascript/auto",
				use: [
					{
						loader: CssPlugin.loader,
						options: { esModule: false, publicPath: "css/" }
					},
					"css-loader",
					"sass-loader"
				]
			},
			{
				/**
				 * Tests any file for woff or woff2 extension (fonts).
				 * This loader allows you to include these file types within your bundle.
				 * It is used for packaging imported fonts in stylesheets when referenced with url() in setting a CSS property value (both CSS and SCSS).
				 * Read more: https://webpack.js.org/guides/asset-modules
				 */
				test: /\.(woff2?)$/,
				type: "asset/inline"
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
				resource: /(?![\\/]images[\\/])/,
				type: "asset/resource",
				generator: {
					filename: "css/img/[name][ext]",
					publicPath: "../"
				}
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
				resource: /[\\/]images[\\/]/,
				type: "asset/resource",
				generator: {
					filename: "img/[name][ext]",
					publicPath: "./"
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
		],
		/**
		 * SplitChunks used to achieve bundle splitting for more efficient loading.
		 * Here we are creating four additional chunks instead of one massive chunk
		 * You may find that you need to prioritize loading certain features and lazy load others,
		 * creating multiple bundles allows for this flexibility.
		 *
		 * Bundle splitting is an optional feature that you can use with Webpack.
		 * If you prefer one large bundle, you can remove this section of the config and webpack will produce one large JS file.
		 *
		 * This is just an example of what you can do with Webpack's bundle splitting,
		 * for more information please refer to Webpack's documentation.
		 * https://webpack.js.org/guides/code-splitting/#root
		 */
		splitChunks: {
			chunks: "all",
			maxInitialRequests: Infinity,
			minSize: 100,
			name: false,
			cacheGroups: {
				components: {
					name: "components",
					priority: 10,
					test: /[\\/]js[\\/]component(s.*|UI)[.]js/
				},
				addons: {
					name: "addOns",
					priority: 20,
					test: /[\\/](plugins[\\/].+[.](js(on)?|html)|js[\\/]addOns[.]js)/
				},
				thirdparty: {
					name: "thirdparty",
					priority: 30,
					test: /[\\/]node_modules|[\\/]thirdparty[\\/]/
				},
				examples: {
					name: "examples",
					priority: 40,
					test: /[\\/]examples[\\/].+[.]js/
				},
				mobile: {
					name: "mobile",
					priority: 50,
					test: /[\\/]mobile[\\/].+[.]js/
				},
				styles: {
					name: "styles",
					priority: 60,
					type: "css/mini-extract"
				}
			}
		}
	},
	output: {
		chunkFilename: "js/chartiq-[name].js",
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
		new HtmlWebpackPlugin({
			template: path.resolve(dirname, "index.html")
		}),
		/**
		 * Replaces a tag in your HTML with a another HTML file allowing you do use partials for building a larger more complex output.
		 * Partials allow you to reuse whole HTML files, similar to using a Template element in your page.
		 * We use partials to include the HTML for creating an advanced chart all from a single tag defined in the HTMLWebpackPlugin.
		 * Read more about the HTTML Webpack Partials Plugin:
		 * https://github.com/jantimon/html-webpack-plugin
		 */
		new HtmlWebpackPartialsPlugin({
			path: path.join(
				defaultDir,
				"mobile",
				"partials",
				"sample-template-native-sdk-context.html"
			),
			location: "cq-context"
		}),
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
