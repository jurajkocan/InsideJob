const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getThemeVariables } = require("antd/dist/theme");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

// const Visualizer = require("webpack-visualizer-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  optimization: {
    minimize: true,
  },
  entry: {
    app: "./src/frontend/Index.tsx",
    userList: "./src/frontend/pages/UserList.tsx",
    userDetail: "./src/frontend/pages/UserDetail.tsx",
    notFound404: "./src/frontend/pages/404.tsx",
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
    new MomentLocalesPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/frontend/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash].css",
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    // new Visualizer(),
  ],
  devServer: {
    writeToDisk: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};
