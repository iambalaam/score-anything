import * as React from "react";
import { createRoot } from "react-dom/client";
import Dial from "./components/Dial";
import "./index.css";

export function App() {
	const [angle, setAngle] = React.useState(0);

	onwheel = (e) => {
		const y = e.deltaY;
		if (y > 0) {
			setAngle(angle + 2);
		} else {
			setAngle(angle - 2);
		}
	};

	return (
		<>
			<h1>Score Anything</h1>
			<Dial angle={angle} />
		</>
	);
}

const HTML_ROOT = document.createElement("div");
HTML_ROOT.id = "root";
document.body.appendChild(HTML_ROOT);

const REACT_ROOT = createRoot(document.getElementById("root")!);
REACT_ROOT.render(<App />);
