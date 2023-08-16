import * as React from "react";
import { Dial } from "./components/Dial";
import "./index.css";
import { PlayerSetup } from "./pages/PlayerSetup";
import { Color } from "./util/color";

export type History = number[][]
export interface SessionState {
	counters: CounterContext[]
	history: History
}

export interface CounterContext {
	color: Color,
	name?: string
}

const colors = {
	backgroundColor: 'white',
	trackColor: '#eee'
}

export type AppState = 'player-setup' | 'counter' | 'history';

export function App() {
	const [appState, setAppState] = React.useState<AppState>('player-setup');
	const [counterContexts, setCounterContexts] = React.useState<CounterContext[]>([]);
	const [history, setHistory] = React.useState<History>([])

	const startGame = (ctxs: CounterContext[]) => {
		setCounterContexts(ctxs);
		setHistory([Array(ctxs.length).fill(0)]);
		setAppState('counter');
	}

	const addToHistory = (index: number, total: number) => {
		setHistory((prevHistory) => {
			const copy: History = JSON.parse(JSON.stringify(prevHistory));
			const lastEntry = copy[copy.length - 1];
			const nextEntry = [...lastEntry];
			nextEntry[index] = total;
			copy.push(nextEntry);

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
					addToHistory={addToHistory}
					counterCtxs={counterContexts}
					totals={ history[history.length-1]}
					{...colors}
				/>
			)
	}
}