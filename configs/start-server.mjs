import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const serverPath = join(process.cwd(), "./dist/server.js");

const isServerExists = existsSync(serverPath);

if (!isServerExists) {
  mkdirSync(join("./dist"), { recursive: true });
  writeFileSync(serverPath, "");
}

const watcher = spawn("node", [
  "--watch",
  "--watch-preserve-output",
  serverPath,
]);

const webpack = spawn("yarn", ["prepare:server"], { shell: true });

const loggers = [
  ["stdout", "data"],
  ["stderr", "data"],
  ["", "exit"],
];

loggers.forEach(([hook, message]) => {
  [watcher, webpack].forEach((child) => {
    (hook ? child[hook] : child).on(message, (data) => {
      try {
        console.log(data.toString());
      } catch {
        console.log(data);
      }
    });
  });
});
