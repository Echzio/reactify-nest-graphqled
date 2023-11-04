const webpackConfigServer = require("./configs/webpack/webpack.config.server.js");

module.exports = (_, { mode, env } = {}) => {
  if (env.server) {
    return webpackConfigServer(mode);
  }

  return {};
};
