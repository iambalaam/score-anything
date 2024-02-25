import * as React from 'react';
import { PlayerSetup } from './pages/PlayerSetup';
import { HSL } from './util/color';
import { Session, SessionState } from './pages/Session';
import { History } from './pages/History';
import './index.css';
import { useLocalStorage } from './util/storage';
import { Main } from './pages/Main';
import { SessionSelect } from './pages/SessionSelect';
import { Controls, Toggle } from './components/Controls';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import DataUsageRoundedIcon from '@mui/icons-material/DataUsageRounded';
import UndoRounded from '@mui/icons-material/UndoRounded';
import IconButton from '@mui/material/IconButton';

export type History = number[][];
export interface CounterContext {
    color: HSL;
    name?: string;
    start: number;
}
export interface ColorContext {
    backgroundColor: HSL;
    trackColor: HSL;
}

export type Page = 'main' | 'session-select' | 'player-setup' | 'counter' | 'history';

export interface PageProps {
    setPage: (page: Page) => void;
    setControls: (controls: JSX.Element) => void;
}

export interface AppState {
    sessions: SessionState[];
}

export function App() {
    const [appState, setAppState] = useLocalStorage<AppState>('data', {
        sessions: []
    });

    const [currentSession, setCurrentSession] = React.useState<number>(-1);
    const [page, setPage] = React.useState<Page>('main');
    const [controls, setConrols] = React.useState<JSX.Element>();

    const startNewSession = (session: SessionState) => {
        setAppState({
            sessions: [...appState.sessions, session]
        });
        setCurrentSession(appState.sessions.length);
        setPage('counter');
    };

    const deleteSession = (index: number) => {
        const copy = [...appState.sessions];
        copy.splice(index, 1);
        setAppState({
            ...appState,
            sessions: copy
        });
        if (copy.length === 0) {
            setPage('main');
        }
    };

    const updateSession = (data: SessionState) => {
        setAppState((prevState) => {
            const copy = [...prevState.sessions];
            copy[currentSession] = data;

            return {
                sessions: copy
            };
        });
    };

    const undo = () => {
        const data = appState.sessions[currentSession];
        if (data.history.length < 2) return;

        const copy = [...data.history];
        copy.pop();

        updateSession({
            ...data,
            history: copy
        });
    };

    let body: JSX.Element;
    switch (page) {
        case 'main':
            body = (
                <>
                    <Controls setPage={setPage} />
                    <Main setPage={setPage} hasPreviousGames={appState.sessions.length > 0} />
                </>
            );
            break;
        case 'player-setup':
            body = (
                <>
                    <Controls setPage={setPage} />
                    <PlayerSetup startNewSession={startNewSession} />
                </>
            );
            break;
        case 'session-select':
            body = (
                <>
                    <Controls setPage={setPage} />
                    <SessionSelect
                        appState={appState}
                        deleteSession={deleteSession}
                        setCurrentSession={setCurrentSession}
                        setPage={setPage}
                    />
                </>
            );
            break;
        case 'counter':
            body = (
                <>
                    <Controls
                        setPage={setPage}
                        nav={
                            <Toggle
                                on={
                                    <IconButton>
                                        <DataUsageRoundedIcon />
                                    </IconButton>
                                }
                                off={
                                    <IconButton>
                                        <HistoryRoundedIcon />
                                    </IconButton>
                                }
                                onToggle={(on) => setPage(on ? 'history' : 'counter')}
                            />
                        }
                        actions={
                            <IconButton onClick={undo}>
                                <UndoRounded />
                            </IconButton>
                        }
                    />
                    <Session
                        data={appState.sessions[currentSession]}
                        setData={updateSession}
                        setPage={setPage}
                        setControls={setConrols}
                    />
                </>
            );
            break;
        case 'history':
            body = (
                <>
                    <Controls
                        setPage={setPage}
                        nav={
                            <Toggle
                                on={
                                    <IconButton>
                                        <DataUsageRoundedIcon />
                                    </IconButton>
                                }
                                off={
                                    <IconButton>
                                        <HistoryRoundedIcon />
                                    </IconButton>
                                }
                                onToggle={(on) => setPage(on ? 'history' : 'counter')}
                            />
                        }
                        actions={
                            <IconButton onClick={undo}>
                                <UndoRounded />
                            </IconButton>
                        }
                    />
                    <History
                        data={appState.sessions[currentSession]}
                        setData={updateSession}
                        setPage={setPage}
                        setControls={setConrols}
                    />
                </>
            );
            break;
        default:
            body = <h1>?</h1>;
    }

    return body;
}
