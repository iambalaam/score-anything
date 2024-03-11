import * as React from 'react';
import { PlayerSetup } from './pages/PlayerSetup';
import { HSL } from './util/color';
import { Session, SessionState } from './pages/Session';
import { History } from './pages/History';
import './index.css';
import { useLocalStorage } from './util/storage';
import { Main } from './pages/Main';
import { SessionSelect } from './pages/SessionSelect';
import { Controls, Settings } from './components/Controls';
import { Toggle } from './components/Toggle';
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
}

export interface AppState {
    sessions: SessionState[];
    settings: Settings;
}

const initialSessionState: SessionState[] = [];
const initialSettingsState: Settings = {
    theme: 'light',
    'screen-wake-lock': 'unlocked'
};
const initialAppState = { sessions: initialSessionState, settings: initialSettingsState };

export function App() {
    const [appState, setAppState] = useLocalStorage<AppState>('data', initialAppState);

    const [currentSession, setCurrentSession] = React.useState<number>(-1);
    const [page, setPage] = React.useState<Page>('main');

    const startNewSession = (session: SessionState) => {
        setAppState({
            sessions: [...appState.sessions, session],
            settings: appState.settings
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
                ...initialAppState,
                ...prevState,
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

    const updateSettings = (settings: Partial<Settings>) => {
        setAppState((prevState) => {
            const newSettings = { ...initialSettingsState, ...prevState.settings, ...settings };
            return { ...initialAppState, ...prevState, settings: newSettings };
        });
    };

    let body: JSX.Element;
    switch (page) {
        case 'main':
            body = (
                <>
                    <Controls
                        settings={appState.settings}
                        setSettings={updateSettings}
                        setPage={setPage}
                    />
                    <Main setPage={setPage} hasPreviousGames={appState.sessions.length > 0} />
                </>
            );
            break;
        case 'player-setup':
            body = (
                <>
                    <Controls
                        settings={appState.settings}
                        setSettings={updateSettings}
                        setPage={setPage}
                    />
                    <PlayerSetup startNewSession={startNewSession} />
                </>
            );
            break;
        case 'session-select':
            body = (
                <>
                    <Controls
                        settings={appState.settings}
                        setSettings={updateSettings}
                        setPage={setPage}
                    />
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
                        settings={appState.settings}
                        setSettings={updateSettings}
                        setPage={setPage}
                        nav={
                            <Toggle
                                value={true}
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
                                onToggle={() => setPage('history')}
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
                    />
                </>
            );
            break;
        case 'history':
            body = (
                <>
                    <Controls
                        settings={appState.settings}
                        setSettings={updateSettings}
                        setPage={setPage}
                        nav={
                            <Toggle
                                value={false}
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
                                onToggle={() => setPage('counter')}
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
                    />
                </>
            );
            break;
        default:
            body = <h1>?</h1>;
    }

    return body;
}
