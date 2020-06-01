const path = require("path");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const lessToJs = require("less-vars-to-js");
const fs = require("fs");

module.exports = {
  entry: {
    app: "./src/frontend/Index.tsx",
  },
  target: "web",
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
        test: /\.(jpg|png|svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/frontend/index.html",
    }),
    new MomentLocalesPlugin(),
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
      generateOnce: true,
    }),
  ],
};
