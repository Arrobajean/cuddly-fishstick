const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    main: path.resolve(__dirname, "js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction
      ? "assets/js/[name].[contenthash].js"
      : "assets/js/[name].js",
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // We are not importing CSS in JS for this site, but keep loaders in case of future usage
          "style-loader",
          "css-loader",
        ],
        include: [path.resolve(__dirname, "css")],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
      inject: false,
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeAttributeQuotes: false,
          }
        : false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "about.html"),
      filename: "about.html",
      inject: false,
      minify: isProduction
        ? { collapseWhitespace: true, removeComments: true }
        : false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "gallery.html"),
      filename: "gallery.html",
      inject: false,
      minify: isProduction
        ? { collapseWhitespace: true, removeComments: true }
        : false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "contact.html"),
      filename: "contact.html",
      inject: false,
      minify: isProduction
        ? { collapseWhitespace: true, removeComments: true }
        : false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "css", to: "css", noErrorOnMissing: true },
        { from: "images", to: "images", noErrorOnMissing: true },
        { from: "js", to: "js", noErrorOnMissing: true },
        { from: "favicon.ico", to: "favicon.ico", noErrorOnMissing: true },
      ],
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 5173,
    open: false,
    hot: false,
    compress: true,
    historyApiFallback: false,
    client: {
      overlay: true,
    },
  },
  performance: {
    hints: false,
  },
  stats: "minimal",
};
