import webpackConfigServer from "./configs/webpack/webpack.config.server.mjs";
import webpackConfigClient from "./configs/webpack/webpack.config.client.mjs";
import { resolve as _resolve } from "node:path";

const resolvePaths = {
  extensions: ["*", ".ts", ".tsx", ".js"],
  extensionAlias: {
    ".js": [".js", ".ts"],
    ".cjs": [".cjs", ".cts"],
    ".mjs": [".mjs", ".mts"],
  },
  alias: {
    "@client": _resolve(process.cwd(), "src/client/"),
    "@server": _resolve(process.cwd(), "src/server/"),
  },
};

export default (_, { mode, env } = {}) => {
  if (env.server) {
    return webpackConfigServer(mode, resolvePaths);
  }

  return webpackConfigClient(mode, resolvePaths);
};
