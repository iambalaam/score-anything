import * as React from 'react';

import './Session.css';
import { CounterContext, History } from '../app';
import { Dial } from '../components/Dial';

export interface SessionProps {
    initialStates: CounterContext[],
    counterCtxs: CounterContext[],
    history: History,
    addToHistory: (index: number, total: number) => void
}

export function Session(p: SessionProps) {
    return <main id='session'>
        <div className="controls">
            <button className='home'>🏠</button>
            <button className='undo'>↺</button>
        </div>
        <Dial
            totals={p.history[p.history.length - 1]}
            counterCtxs={p.counterCtxs}
            addToHistory={p.addToHistory}
        />
    </main>
};