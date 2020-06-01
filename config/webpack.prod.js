const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const merge = require("webpack-merge");
const baseWebpack = require("./webpack.base");

const Visualizer = require("webpack-visualizer-plugin");
const mode = "production";
module.exports = merge(baseWebpack, {
  mode,
  devtool: false,
  optimization: {
    removeAvailableModules: true,
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: true,
                  }),
                ],
              }),
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                modifyVars: {
                  "font-size-base": "16px",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash].css",
    }),
    new Visualizer(),
  ],
});

 vendors~app.ff6680d73fb26ccaefe1.js
 vendors~app.ff6680d73fb26ccaefe1.js
 vendors~app.d7622a382827e30f4a36.js
