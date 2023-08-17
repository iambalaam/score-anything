import * as React from 'react';

import './Session.css';
import { CounterContext, History } from '../app';
import { Dial } from '../components/Dial';

export interface SessionState {
	counters: CounterContext[]
	history: History
}

export interface SessionProps {
    data: SessionState,
    setData: (data: SessionState) => void
}

export function Session({ data, setData }: SessionProps) {

    const addToHistory = (index: number, total: number) => {
        // at this point the history has already been changed
        const copy: History = [...data.history]
        const lastEntry = copy[copy.length - 1];
        const nextEntry = [...lastEntry];	
        nextEntry[index] = total;
        copy.push(nextEntry);
        
        setData({
            counters: data.counters,
            history: copy
        });
    }
    
    const undo = () => {
        const copy = [...data.history];
        copy.pop();

        setData({
            counters: data.counters,
            history: copy
        })
    }


    return <main id='session'>
        <div className="controls">
            <button className='home'>🏠</button>
            <button className='undo' onClick={undo}>↺</button>
        </div>
        <Dial
            totals={data.history[data.history.length - 1]}
            counterCtxs={data.counters}
            addToHistory={addToHistory}
        />
    </main>
};