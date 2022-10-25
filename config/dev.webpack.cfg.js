const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const handler = (percentage, message, ...args) => {
	console.info(`${(percentage * 100).toFixed(2)}%`, message, ...args);
};
module.exports = {
	mode: "development",
	target: ["web", "es5"],
	entry: {
		app: ["./src/index.js"],
	},
	output: {
		path: path.join(__dirname, "../dist"), // 出口目录，dist文件
		publicPath: "/",
		filename: "js/[name].js",
		chunkFilename: "js/[name].chunk.js",
	},
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ["babel-loader"],
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
							"style-loader",
							{
								loader: "css-loader",
								options: {
									modules: {
										localIdentName: "[local]-[hash:base64:10]",
										getLocalIdent: (context, localIdentName, localName) => {
											const path = context._module.context;
											if (
												/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(
													path
												)
											) {
												return;
											} else {
												return localName;
											}
										},
									},
								},
							},
							"postcss-loader",
						],
					},
					{
						test: /\.less$/,
						use: [
							"style-loader",
							{
								loader: "css-loader",
								options: {
									modules: {
										localIdentName: "[local]-[hash:base64:10]",
										getLocalIdent: (context, localIdentName, localName) => {
											const path = context._module.context;
											if (
												/^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(
													path
												)
											) {
												return;
											} else {
												return localName;
											}
										},
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
	plugins: [
		new webpack.ProgressPlugin(handler),
		new HtmlWebpackPlugin({
			template: "./public/template.html",
			filename: "index.html",
			favicon: "./favicon.ico",
			title: "标题",
		}),
		new CleanWebpackPlugin({ verbose: true }),
		new ESLintPlugin({}),
		new VueLoaderPlugin(),
	],
	resolve: {
		// 自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
		extensions: [".js", ".json", ".css", ".vue"],
		alias: {
			"@src": path.resolve(__dirname, "../src"),
		},
	},
	devServer: {
		port: 22325, // 端口
		host: "localhost",
		hot: true,
		open: true,
		devMiddleware: {
			writeToDisk: true,
		},
		client: {
			progress: true,
		},
		proxy: {
			"/client": {
				target: "http://eac.yry.dev.linkfin.caih.local",
				// target: "http://eac.yry.sit.linkfin.caih.local",
				// target: "http://127.0.0.1:4523/m1/1341514-0-default",
				// pathRewrite: { "^/api": "" },
				changeOrigin: true,
			},
		},
	},
};
