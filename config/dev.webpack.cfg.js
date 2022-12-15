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
        app: ["./src/index.js"]
    },
    output: {
        path: path.join(__dirname, "../dist"), // 出口目录，dist文件
        publicPath: "/",
        filename: "js/[name].js",
        chunkFilename: "js/[name].chunk.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(m)?js$/,
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
                            "style-loader",
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
                            "style-loader",
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
    plugins: [
        new webpack.ProgressPlugin(handler),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            filename: "index.html",
            favicon: "./favicon.ico",
            title: "",
            hash: true
        }),
        new CleanWebpackPlugin({ verbose: true }),
        new ESLintPlugin({}),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({})
    ],
    resolve: {
        // 自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: [".js", ".json", ".css", ".vue"],
        alias: {
            "@root": path.resolve(__dirname, "../"),
            "@src": path.resolve(__dirname, "../src"),
            vue$: "vue/dist/vue.esm.js",
            "element-ui": path.resolve(__dirname, "../public/element-ui/lib/index.js")
        },
        fallback: { crypto: false }
    },
    devServer: {
        port: 2325, // 端口
        host: "localhost",
        hot: true,
        // open: true,
        devMiddleware: {
            writeToDisk: true
        },
        client: {
            progress: true,
            logging: "none"
        },
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:4523/m1/1941353-0-default",
                // target: "http://baiji.sit.linkfin.caih.local/baiji",
                // target: "http://baiji.dev.linkfin.caih.local/baiji",
                // target: "http://127.0.0.1:4523/m1/1341514-0-default",
                pathRewrite: { "^/api": "" },
                changeOrigin: true
            }
        }
    }
};
