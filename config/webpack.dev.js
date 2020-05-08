const path = require("path");
const { getThemeVariables } = require("antd/dist/theme");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/frontend/Index.tsx",
    userList: "./src/frontend/pages/UserList.tsx",
    userDetail: "./src/frontend/pages/UserDetail.tsx",
    notFound404: "./src/frontend/pages/404.tsx",
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
    new HtmlWebpackPlugin({
      template: "./src/frontend/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    writeToDisk: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
};
