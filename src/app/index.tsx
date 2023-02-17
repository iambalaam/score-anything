import * as React from "react";
import { createRoot } from "react-dom/client";
import { Dial } from "./components/Dial";
import "./index.css";

export function App() {
	return (
		<Dial />
	);
}

const REACT_ROOT = createRoot(document.getElementById("root")!);
REACT_ROOT.render(<App />);
