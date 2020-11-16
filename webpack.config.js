const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config();

//dev tool entries that will enable the webpack dev server and provide directory that it will serve the content from
module.exports = {
  mode: "production",
  devServer: {
    contentBase: "./dist",
  },
  //specifies the path to our path to our entry JS file where all of our imports will be specified and webpack will transpile and pile it all for us
  entry: {
    main: "./src/js/index.js",
  },
  // specify the name of our bundle and where to write it to using the path lib provided here
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // specify the babel loader for our JS files and style loader and css loader for CSS
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "ECRA-MAPS",
      template: "./src/index.html",
      apiKey: process.env.API_KEY,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};