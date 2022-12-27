const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const mode = "development";

module.exports = merge(common(mode), {
  mode,
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  cache: {
    type: "filesystem",
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
