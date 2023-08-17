import * as React from 'react';
import { AppState, Page } from '../app';
import { SessionState } from './Session';
import './SessionSelect.css';
import { HSL2String } from '../util/color';


function SessionView({ counters, history, onClick }: SessionState & { onClick: () => void }) {
    const totals = history[history.length - 1];
    return <span className='session' onClick={onClick}>
        {totals.map((total, i) => <span className='score' key={i} style={{ color: HSL2String(counters[i].color) }}>{total}</span>)}
    </span>
}

export interface SessionSelectProps {
    appState: AppState,
    setCurrentSession: (session: number) => void,
    setPage: (page: Page) => void
}

export function SessionSelect({ appState, setCurrentSession, setPage }: SessionSelectProps) {
    return <main id='session=select'>
        <div className="sessions">
            {appState.sessions.map((session, i) =>
                <SessionView
                    {...session}
                    key={i}
                    onClick={() => {
                        setCurrentSession(i);
                        setPage('counter');
                    }}
                />
            )}
        </div>
    </main>
}