import * as React from 'react';
import { CounterContext, History, Page, PageProps } from '../app';
import { Dial } from '../components/Dial';

export interface SessionState {
    name: string;
    counters: CounterContext[];
    history: History;
}

export interface SessionProps extends PageProps {
    data: SessionState;
    setData: (data: SessionState) => void;
}

export function Session({ data, setData, setPage, setControls }: SessionProps) {
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

    return (
        <main id="session">
            <Dial
                totals={data.history[data.history.length - 1]}
                counterCtxs={data.counters}
                addToHistory={addToHistory}
            />
        </main>
    );
}
