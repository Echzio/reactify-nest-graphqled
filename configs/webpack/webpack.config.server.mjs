import { resolve as _resolve } from "node:path";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin";

export default (mode, resolvePaths) => {
  const isDevelop = mode === "development";

  return {
    mode,
    target: "node20.0",
    entry: "./src/server/index.ts",
    devtool: "inline-source-map",
    output: {
      path: _resolve(process.cwd(), "dist"),
      filename: "server.js",
    },
    resolve: resolvePaths,
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
