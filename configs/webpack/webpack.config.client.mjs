const path = require("node:path");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");

module.exports = (mode, resolvePaths) => {
  const isDevelop = mode === "development";

  return {
    mode,
    target: "web",
    entry: "./src/client/index.ts",
    devtool: "inline-source-map",
    output: {
      path: path.resolve(process.cwd(), "dist/assets"),
    },
    resolve: resolvePaths,
    devServer: {
      client: {
        overlay: true,
        progress: true,
      },
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.([cm]?ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new ForkTsCheckerNotifierWebpackPlugin({
        title: "TypeScript",
        excludeWarnings: false,
      }),
    ],
    watchOptions: {
      ignored: "**/node_modules",
    },
  };
};
