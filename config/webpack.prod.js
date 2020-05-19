const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
// const Visualizer = require("webpack-visualizer-plugin");
const mode = "production";
module.exports = {
  mode,
  devtool: false,
  optimization: {
    minimize: true,
  },
  entry: {
    app: "./src/frontend/Index.tsx",
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/",
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["node_modules", "src"],
    alias: {
      src: path.resolve(__dirname, "../src/"),
      config: path.resolve(__dirname, "../config/"),
      assets: path.resolve(__dirname, "../assets/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        // modules in es6+, need to transpile for ie support
        exclude: /node_modules(?!(\/|\\)(query-string|split-on-first|strict-uri-encode))/,
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
      {
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
    }),
    new MomentLocalesPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/frontend/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash].css",
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new AntDesignThemePlugin({
      varFile: path.join(__dirname, "../src/style/variables.less"),
      mainLessFile: path.join(__dirname, "../src/style/index.less"),
      antDir: path.join(__dirname, "../node_modules/antd"),
      stylesDir: path.join(__dirname, "../src/style"),
      themeVariables: Object.keys(
        lessToJs(
          fs.readFileSync(
            path.join(
              __dirname,
              "../node_modules/antd/lib/style/themes/default.less"
            ),
            "utf8"
          )
        )
      ),
      generateOnce: true,
    }),
    // new Visualizer(),
  ],
};
