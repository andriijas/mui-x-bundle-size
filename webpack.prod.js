const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const mode = "production";

module.exports = merge(common(mode), {
  mode,
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.CI ? "disabled" : "static",
    }),
  ],
});
