import * as React from "react";
import { createRoot } from "react-dom/client";
import { Dial, DialProps } from "./components/Dial";
import "./index.css";
import { HSL } from "./util/color";

const initialProps = {
	counters: [
		{ color: new HSL(0, 53, 58), total: 0 },
		{ color: new HSL(219, 79, 66), total: 0 }
	],
	backgroundColor: 'white',
	trackColor: '#eee'
}

export function App() {
	const [counters, setCounterValues] = React.useState(initialProps.counters);
	const setCounter = (index: number, total: number) => {
		const copy = [...counters];
		copy[index] = { ...copy[index], total };
		setCounterValues(copy);
	}

	return (
		<Dial {...initialProps} setCounter={setCounter} />
	);
}

const domRoot = document.getElementById("root")
if (domRoot) {
	const reactRoot = createRoot(domRoot);
	reactRoot.render(<App />);
}
