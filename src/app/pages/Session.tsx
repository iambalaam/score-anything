import * as React from 'react';

import './Session.css';
import { CounterContext, History, Page } from '../app';
import { Dial } from '../components/Dial';

export interface SessionState {
    name: string;
    counters: CounterContext[];
    history: History;
}

export interface SessionProps {
    data: SessionState;
    setData: (data: SessionState) => void;
    setPage: (page: Page) => void;
}

export function Session({ data, setData, setPage }: SessionProps) {
    const addToHistory = (index: number, total: number) => {
        // at this point the history has already been changed
        const copy: History = [...data.history];
        const lastEntry = copy[copy.length - 1];
        const nextEntry = [...lastEntry];
        nextEntry[index] = total;
        copy.push(nextEntry);

        setData({
            ...data,
            history: copy
        });
    };

    const undo = () => {
        if (data.history.length < 2) return;

        const copy = [...data.history];
        copy.pop();

        setData({
            ...data,
            history: copy
        });
    };

    return (
        <main id="session">
            <div className="controls">
                <button className="home" onClick={() => setPage('main')}>
                    🏠
                </button>
                <button className="history" onClick={() => setPage('history')}>
                    📚
                </button>
                <button className="undo" onClick={undo}>
                    ↺
                </button>
            </div>
            <Dial
                totals={data.history[data.history.length - 1]}
                counterCtxs={data.counters}
                addToHistory={addToHistory}
            />
        </main>
    );
}
