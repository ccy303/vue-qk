const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const handler = (percentage, message, ...args) => {
	console.info(`${(percentage * 100).toFixed(2)}%`, message, ...args);
};
module.exports = {
	mode: "production",
	entry: {
		app: "./src/index.js",
	},
	output: {
		path: path.join(__dirname, "../dist"), // 出口目录，dist文件
		publicPath: "/",
		filename: "js/[name].[chunkhash].js",
		chunkFilename: "js/[name].chunk.[chunkhash].js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				oneOf: [
					{
						test: /\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									modules: {
										// localIdentName: "[local]-[hash:base64:10]",
										// getLocalIdent: (context, localIdentName, localName) => {
										// 	const path = context._module.context;
										// 	if (
										// 		/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(
										// 			path
										// 		)
										// 	) {
										// 		return;
										// 	} else {
										// 		return localName;
										// 	}
										// },
									},
								},
							},
							"postcss-loader",
						],
					},
					{
						test: /\.less$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									modules: {
										// localIdentName: "[local]-[hash:base64:10]",
										// getLocalIdent: (context, localIdentName, localName) => {
										// 	const path = context._module.context;
										// 	if (
										// 		/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(
										// 			path
										// 		)
										// 	) {
										// 		return;
										// 	} else {
										// 		return localName;
										// 	}
										// },
									},
								},
							},
							"postcss-loader",
							{
								loader: "less-loader", // compiles Less to CSS
								options: {
									lessOptions: {
										modifyVars: {},
										javascriptEnabled: true,
									},
								},
							},
							{
								loader: "style-resources-loader",
								options: {
									patterns: path.resolve(__dirname, "../src/styles/common.less"),
								},
							},
						],
					},
					{
						test: /\.(png|svg|jpg|jpeg|gif)$/i,
						type: "asset",
						generator: {
							filename: "assets/images/[hash][ext][query]",
						},
					},
					{
						test: /\.(docx|doc|pdf)$/i,
						type: "asset",
						generator: {
							filename: "assets/file/[name][ext]",
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".json", ".css", ".vue"],
		alias: {
			"@src": path.resolve(__dirname, "../src"),
		},
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		new webpack.ProgressPlugin(handler),
		new HtmlWebpackPlugin({
			template: "./public/template.html",
			filename: "index.html",
			favicon: "./favicon.ico",
			title: '标题',
		}),
		new CleanWebpackPlugin({ verbose: true }),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash].css",
			chunkFilename: "css/[name].[contenthash].css",
		}),
		new VueLoaderPlugin(),
	],
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				parallel: true,
                extractComments: false
			}),
			// new CompressionPlugin()
		],
		splitChunks: {
			chunks: "all",
		},
	},
};
