const HtmlWebpackPlugin = require("html-webpack-plugin")
const appUpdate = require("unplugin-app-update/webpack")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                presets: ["@babel/preset-react"],
              },
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: false,
    liveReload: false,
    static: ["./src/public"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    appUpdate.default(),
  ],
}
