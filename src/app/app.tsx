import * as React from "react";
import { PlayerSetup } from "./pages/PlayerSetup";
import { HSL } from "./util/color";
import { Session, SessionState } from "./pages/Session";
import { History } from "./pages/History";
import "./index.css";
import { useLocalStorage } from "./util/storage";
import { Main } from "./pages/Main";
import { SessionSelect } from "./pages/SessionSelect";

export type History = number[][]
export interface CounterContext {
	color: HSL,
	name?: string
	start: number
}
export interface ColorContext {
	backgroundColor: HSL;
	trackColor: HSL,
}
export const initialColors: ColorContext = {
	backgroundColor: { h: 0, s: 0, l: 100 },
	trackColor: { h: 0, s: 0, l: 90 }
}
export const ColorContext = React.createContext<ColorContext>(initialColors);

export type Page = 'main' | 'session-select' | 'player-setup' | 'counter' | 'history';

export interface AppState {
	sessions: SessionState[]
}

export function App() {
	const [appState, setAppState] = useLocalStorage<AppState>('data', { sessions: [] });

	const [currentSession, setCurrentSession] = React.useState<number>(-1);
	const [page, setPage] = React.useState<Page>('main');

	const startNewSession = (session: SessionState) => {
		setAppState({
			sessions: [
				...appState.sessions,
				session
			]
		});
		setCurrentSession(appState.sessions.length);
		setPage('counter');
	}

	const deleteSession = (index: number) => {
		console.log(appState);
		const copy = [...appState.sessions];
		copy.splice(index, 1);
		console.log(copy);
		setAppState({
			...appState,
			sessions: copy
		});
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
		case 'main':
			body = <Main
				setPage={setPage}
			/>;
			break;
		case 'player-setup':
			body = <PlayerSetup startNewSession={startNewSession} />;
			break;
		case 'session-select':
			body = <SessionSelect
				appState={appState}
				deleteSession={deleteSession}
				setCurrentSession={setCurrentSession}
				setPage={setPage}
			/>;
			break;
		case 'counter':
			body = <Session
				data={appState.sessions[currentSession]}
				setData={updateSession}
				setPage={setPage}
			/>;
			break;
		case 'history':
			body = <History
				data={appState.sessions[currentSession]}
				setData={updateSession}
				setPage={setPage}
			/>;
			break;
		default:
			body = <h1>?</h1>;
	}

	return <ColorContext.Provider value={initialColors}>
		{body}
	</ColorContext.Provider>
}