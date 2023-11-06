import { App } from "./app";

import { createRoot } from "react-dom/client";

const targetNode = document.getElementById("app");

if (!targetNode) throw new Error("no targetNode");

const root = createRoot(targetNode);

root.render(<App />);
