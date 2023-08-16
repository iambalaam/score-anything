import * as React from "react";
import { PlayerSetup } from "./pages/PlayerSetup";
import { Color } from "./util/color";
import { Session } from "./pages/Session";
import "./index.css";

export type History = number[][]
export interface SessionState {
	counters: CounterContext[]
	history: History
}

export interface CounterContext {
	color: Color,
	name?: string
}
export interface ColorContext {
	backgroundColor: Color;
	trackColor: Color,
}
export const initialColors: ColorContext = {
	backgroundColor: '#fff',
	trackColor: '#eee'
}
export const ColorContext = React.createContext<ColorContext>(initialColors);

export type AppState = 'player-setup' | 'counter' | 'history';

export function App() {
	const [appState, setAppState] = React.useState<AppState>('player-setup');
	const [counterContexts, setCounterContexts] = React.useState<CounterContext[]>([]);
	const [history, setHistory] = React.useState<History>([]);

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
	let body: JSX.Element;
	switch (appState) {
		case 'player-setup':
			body = <PlayerSetup startGame={startGame} />;
			break;
		case 'history':
		case 'counter':
			body = <Session
				history={history}
				addToHistory={addToHistory}
				initialStates={counterContexts}
				counterCtxs={counterContexts}
			/>;
			break;
	}

	return <ColorContext.Provider value={initialColors}>
		{body}
	</ColorContext.Provider>
}