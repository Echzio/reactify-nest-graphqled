const path = require("node:path");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");

module.exports = (mode) => {
  const isDevelop = mode === "development";

  return {
    mode,
    target: "node20.0",
    entry: "./src/server/index.ts",
    devtool: "inline-source-map",
    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "server.js",
    },
    resolve: {
      extensions: ["*", ".ts", ".tsx", ".js"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
    module: {
      rules: [
        {
          test: /\.([cm]?ts|tsx)$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
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
