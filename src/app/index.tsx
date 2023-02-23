import * as React from "react";
import { createRoot } from "react-dom/client";
import { Dial } from "./components/Dial";
import "./index.css";
import { HSL } from "./util/color";

const colors = {
	backgroundColor: 'white',
	trackColor: '#eee'
}

export function App() {
	const [counters, setCounters] = React.useState(new Array(4).fill(0).map((_, i) => {
		const angle = i * 90;
		return { total: 0, color: new HSL(angle, 60, 60) };
	}));
	const setCounterValue = (index: number, total: number) => {
		setCounters((prevState) => {
			const copy = [...prevState];
			copy[index] = { ...copy[index], total };
			return copy;
		});
	}

	return (
		<Dial
			counters={counters}
			setCounter={setCounterValue}
			{...colors}
		/>
	);
}

const domRoot = document.getElementById("root")
if (domRoot) {
	const reactRoot = createRoot(domRoot);
	reactRoot.render(<App />);
}
