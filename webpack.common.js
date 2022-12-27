const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

module.exports = (mode = "production") => ({
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "[name].[chunkhash].js",
    assetModuleFilename: "assets/[name][ext]",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              ...(mode === "development" && {
                plugins: [require.resolve("react-refresh/babel")],
              }),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
});
