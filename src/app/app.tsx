import * as React from "react";
import { PlayerSetup } from "./pages/PlayerSetup";
import { Color } from "./util/color";
import { Session, SessionState } from "./pages/Session";
import { History } from "./pages/History";
import "./index.css";

export type History = number[][]
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

export type Page = 'player-setup' | 'counter' | 'history';

export interface AppState {
	sessions: SessionState[]
}

export function App() {
	// todo: initialise from localstorage
	const [appState, setAppState] = React.useState<AppState>({ sessions: [] });
	const [currentSession, setCurrentSession] = React.useState<number>(-1);

	const [page, setPage] = React.useState<Page>('player-setup');

	const startNewSession = (ctxs: CounterContext[]) => {
		setAppState({
			sessions: [
				...appState.sessions,
				{ counters: ctxs, history: [Array(ctxs.length).fill(0)] }
			]
		});
		setCurrentSession(appState.sessions.length);
		setPage('counter');
	}

	const updateSession = (data: SessionState) => {
		setAppState((prevState) => {
			const copy = [...prevState.sessions];
			copy[currentSession] = data;

			return {
				sessions: copy
			}
		});
	}

	let body: JSX.Element;
	switch (page) {
		case 'player-setup':
			body = <PlayerSetup startNewSession={startNewSession} />;
			break;
		case 'history':
			body = <History
				data={appState.sessions[currentSession]}
				setData={updateSession}
				setPage={setPage}
			/>
			break;
		case 'counter':
			body = <Session
				data={appState.sessions[currentSession]}
				setData={updateSession}
				setPage={setPage}
			/>;
			break;
	}

	return <ColorContext.Provider value={initialColors}>
		{body}
	</ColorContext.Provider>
}