import * as React from 'react';
import { useEffect } from 'react';
import { PlayerSetup } from './pages/PlayerSetup';
import { HSL } from './util/color';
import { Session, SessionState } from './pages/Session';
import { History } from './pages/History';
import './index.css';
import { useLocalStorage } from './util/storage';
import { Main } from './pages/Main';
import { SessionSelect } from './pages/SessionSelect';
import { Nav } from './components/Nav';
import { ErrorHandler } from './components/ErrorHandler';
import { Settings } from './components/Settings';

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
    'screen-wake-lock': 'unlocked',
    'screen-orientation-lock': 'unlocked'
};
const initialAppState = { sessions: initialSessionState, settings: initialSettingsState };

export function App() {
    const [appState, setAppState] = useLocalStorage<AppState>('data', initialAppState);

    const [currentSession, setCurrentSession] = React.useState<number>(-1);
    const [page, setPage] = React.useState<Page>('main');
    const [showSettings, setShowSettings] = React.useState(false);
    const openCloseSettings = () => setShowSettings((open) => !open);

    // Settings updates
    const { settings } = appState;
    useEffect(() => {
        window.document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings.theme]);
    useEffect(() => {
        let lockPromise: Promise<any> | undefined;
        if (settings['screen-wake-lock'] && 'wakeLock' in window.navigator) {
            lockPromise = (window.navigator.wakeLock as any).request('screen');
        }
        return () => {
            if (lockPromise) {
                lockPromise.then((lock) => lock.release());
            }
        };
    }, [settings['screen-wake-lock']]);
    useEffect(() => {
        const { orientation } = screen;
        if (settings['screen-orientation-lock'] === 'locked') {
            try {
                //@ts-ignore
                orientation.lock(orientation.type).catch(() => {});
            } catch (_) {
                // Do nothing
            }
        }
        return () => {
            try {
                orientation.unlock();
            } catch (_) {
                // Do nothing
            }
        };
    }, [settings['screen-orientation-lock']]);

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
            body = <Main setPage={setPage} hasPreviousGames={appState.sessions.length > 0} />;
            break;
        case 'player-setup':
            body = <PlayerSetup startNewSession={startNewSession} />;
            break;
        case 'session-select':
            body = (
                <SessionSelect
                    appState={appState}
                    deleteSession={deleteSession}
                    setCurrentSession={setCurrentSession}
                    setPage={setPage}
                />
            );
            break;
        case 'counter':
            body = (
                <Session
                    data={appState.sessions[currentSession]}
                    setData={updateSession}
                    setPage={setPage}
                />
            );
            break;
        case 'history':
            body = (
                <History
                    data={appState.sessions[currentSession]}
                    setData={updateSession}
                    setPage={setPage}
                />
            );
            break;
        default:
            body = <h1>?</h1>;
    }

    return (
        <ErrorHandler>
            <Nav
                showSettings={showSettings}
                openCloseSettings={openCloseSettings}
                setPage={setPage}
            />
            {showSettings ? (
                <Settings settings={appState.settings} setSettings={updateSettings} />
            ) : (
                body
            )}
        </ErrorHandler>
    );
}
