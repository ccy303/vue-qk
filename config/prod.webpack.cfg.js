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
const CopyPlugin = require("copy-webpack-plugin");

const handler = (percentage, message, ...args) => {
    console.info(`${(percentage * 100).toFixed(2)}%`, message, ...args);
};
module.exports = {
    mode: "production",
    target: ["web", "es5"],
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "../dist"), // 出口目录，dist文件
        publicPath: `${process.env.VUE_ROUTE_BASE_PATH || "/"}`,
        filename: "js/[name].[chunkhash].js",
        chunkFilename: "js/[name].chunk.[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.(m?)js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {}
                            },
                            {
                                loader: "css-loader",
                                options: {}
                            },
                            "postcss-loader"
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {}
                            },
                            {
                                loader: "css-loader",
                                options: {}
                            },
                            "postcss-loader",
                            {
                                loader: "less-loader", // compiles Less to CSS
                                options: {
                                    lessOptions: {
                                        modifyVars: {},
                                        javascriptEnabled: true
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: "asset",
                        generator: {
                            filename: "assets/images/[hash][ext][query]"
                        }
                    },
                    {
                        test: /\.(docx|doc|pdf)$/i,
                        type: "asset",
                        generator: {
                            filename: "assets/file/[name][ext]"
                        }
                    },
                    {
                        test: /\.(woff|ttf)$/i,
                        type: "asset",
                        generator: {
                            filename: "assets/font/[hash][ext][query]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".css", ".vue"],
        alias: {
            "@root": path.resolve(__dirname, "../"),
            "@src": path.resolve(__dirname, "../src"),
            vue$: "vue/dist/vue.esm.js",
            "element-ui": path.resolve(__dirname, "../public/element-ui/lib/index.js")
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.ProgressPlugin(handler),
        // new CopyPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            filename: "index.html",
            favicon: "./favicon.ico",
            title: "北部湾经济区金融服务平台"
        }),
        new CleanWebpackPlugin({ verbose: true }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[name].[contenthash].css"
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({})
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                extractComments: false
            })
            // new CompressionPlugin()
        ],
        splitChunks: {
            chunks: "all"
        }
    }
};
