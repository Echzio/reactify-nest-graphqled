const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const serverPath = path.join(process.cwd(), "./dist/server.js");

const isServerExists = fs.existsSync(serverPath);

if (!isServerExists) {
  fs.mkdirSync(path.join("./dist"), { recursive: true });
  fs.writeFileSync(serverPath, "");
}

const watcher = spawn("node", [
  "--watch",
  "--watch-preserve-output",
  serverPath,
]);

const webpack = spawn(
  "yarn",
  ["webpack", "--watch", "--mode=development", "--env=server"],
  { shell: true }
);

const loggers = [
  ["stdout", "data"],
  ["stderr", "data"],
  ["", "exit"],
];

loggers.forEach(([hook, message]) => {
  [watcher, webpack].forEach((child) => {
    (hook ? child[hook] : child).on(message, (data) => {
      if ("toString" in data) {
        console.log(data.toString());
      } else {
        console.log(data);
      }
    });
  });
});
