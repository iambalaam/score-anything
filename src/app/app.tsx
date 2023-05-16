import * as React from "react";
import { Dial } from "./components/Dial";
import "./index.css";
import { PlayerSetup } from "./pages/PlayerSetup";
import { Color } from "./util/color";

export interface CounterContext {
	color: Color,
	total: number
}

const colors = {
	backgroundColor: 'white',
	trackColor: '#eee'
}

export type AppState = 'player-setup' | 'counter' | 'history';

export function App() {
	const [appState, setAppState] = React.useState<AppState>('player-setup');
	const [counterContexts, setCounterContexts] = React.useState<CounterContext[]>([]);

	const startGame = (ctxs: CounterContext[]) => {
		setCounterContexts(ctxs);
		setAppState('counter');
	}

	const setCounterContext = (index: number, total: number) => {
		setCounterContexts((prevState) => {
			const copy = [...prevState];
			copy[index] = { ...copy[index], total };
			return copy;
		});
	}

	// maybe this should be routing
	switch (appState) {
		case 'player-setup':
			return <PlayerSetup startGame={startGame}/>
		case 'history':
		case 'counter':
			return (
				<Dial
					setCounter={setCounterContext}
					counters={counterContexts}
					{...colors}
			/>)
	}
}