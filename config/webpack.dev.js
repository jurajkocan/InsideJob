const path = require("path");
const webpack = require("webpack");
const { getThemeVariables } = require("antd/dist/theme");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const lessToJs = require("less-vars-to-js");
const fs = require("fs");

const mode = "development";
module.exports = {
  mode,
  entry: {
    app: "./src/frontend/Index.tsx",
  },
  devtool: "source-map",
  target: "web",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
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
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                modifyVars: {
                  ...getThemeVariables({
                    dark: true,
                    compact: true,
                  }),
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
    new HtmlWebpackPlugin({
      template: "./src/frontend/index.html",
    }),
    new CleanWebpackPlugin(),
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
      // indexFileName: 'index.html',
      generateOnce: true,
    }),
  ],
  devServer: {
    writeToDisk: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};
