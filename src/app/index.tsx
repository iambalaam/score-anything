import * as React from "react";
import { createRoot } from "react-dom/client";
import { Dial } from "./components/Dial";
import "./index.css";

export function App() {
	return (
		<Dial />
	);
}

const domRoot = document.getElementById("root")
if (domRoot) {
	const reactRoot = createRoot(domRoot);
	reactRoot.render(<App />);
}
