import * as React from 'react';
import { AppState, Page } from '../app';
import { SessionState } from './Session';
import { HSL2String } from '../util/color';
import './SessionSelect.css';

interface SessionViewProps extends SessionState {
    selectSession: () => void;
    deleteSession: () => void;
}

function SessionView({ name, counters, history, selectSession, deleteSession }: SessionViewProps) {
    const handleDelete: React.MouseEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteSession();
    };

    const handleSelect: React.MouseEventHandler = (e) => {
        e.preventDefault();
        selectSession();
    };

    const totals = history[history.length - 1];
    const max = Math.max(...totals, 0);
    const min = Math.min(...totals, 0);
    const spread = max - min;
    return (
        <div className="session" onClick={handleSelect}>
            <span className="delete" onClick={handleDelete}>
                X
            </span>
            <div className="name">{name}</div>
            <div className="plot">
                <div className="positive" style={{ height: `${(100 * max) / spread}%` }}>
                    {totals.map((total, i) => {
                        return (
                            <span
                                className="bar"
                                style={{
                                    height: `${100 * Math.max(total / max, 0)}%`,
                                    backgroundColor: HSL2String(counters[i].color)
                                }}
                            ></span>
                        );
                    })}
                </div>
                <div className="zero"></div>
                <div className="negative" style={{ height: `${(100 * -min) / spread}%` }}>
                    {totals.map((total, i) => {
                        return (
                            <span
                                className="bar"
                                style={{
                                    height: `${100 * Math.max(total / min, 0)}%`,
                                    backgroundColor: HSL2String(counters[i].color)
                                }}
                            ></span>
                        );
                    })}
                </div>
                <span className="zero" />
            </div>
            <div className="scores">
                {totals.map((total, i) => (
                    <span
                        className="score"
                        key={i}
                        style={{ color: HSL2String(counters[i].color) }}
                    >
                        {total}
                    </span>
                ))}
            </div>
        </div>
    );
}

export interface SessionSelectProps {
    appState: AppState;
    setCurrentSession: (session: number) => void;
    setPage: (page: Page) => void;
    deleteSession: (i: number) => void;
}

export function SessionSelect({
    appState,
    setCurrentSession,
    setPage,
    deleteSession
}: SessionSelectProps) {
    return (
        <main id="session-select">
            <div className="sessions">
                {appState.sessions.map((session, i) => (
                    <SessionView
                        {...session}
                        key={i}
                        selectSession={() => {
                            setCurrentSession(i);
                            setPage('counter');
                        }}
                        deleteSession={() => deleteSession(i)}
                    />
                ))}
            </div>
        </main>
    );
}
