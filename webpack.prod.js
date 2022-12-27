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
    splitChunks: {
      cacheGroups: {
        muiX: {
          name: "mui-x",
          test: /[\\/]node_modules[\\/]@mui\/x-/,
          chunks: "all",
        },
        mui: {
          name: "mui",
          test: /[\\/]node_modules[\\/]@mui\/(?!x-)/,
          chunks: "all",
        },
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/]react/,
          chunks: "all",
        },
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/](?!react|@mui|date-fns)/,
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.CI ? "disabled" : "static",
    }),
  ],
});
