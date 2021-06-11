// connect path, an OS agnostic filepath utility
const path = require("path");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.js", // this is the default js entry point
  },
  output: {
    // describes path to output file main.js
    path: path.resolve(__dirname, "dist"), // creates path to dist/ directory
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"], // ensure the Webpack glue code is ES5 compatible too
  mode: "development", // setup for dev mode follows
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"), // convert relative path to absolute
    compress: true, // this will speed up file loading in development mode
    port: 8080, // will open your site at localhost:8080
    open: true, // site will open automatically in the browser
  },
  module: {
    rules: [
      // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },
    ],
  },
};
