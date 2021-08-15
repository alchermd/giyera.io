const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: "./assets/index.js", // path to our input file
  output: {
    filename: "index-bundle.js", // output bundle file name
    path: path.resolve(__dirname, "./static"), // path to our Django static directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.mp3$/i,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react", // Workaround: allows defining of JSX without explicit React import
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser', // fix "process is not defined" error
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
