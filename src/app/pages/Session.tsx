import * as React from 'react';
import { CounterContext, History, PageProps } from '../app';
import { Dial } from '../components/Dial';
import { IconButton } from '@mui/material';
import Undo from '@mui/icons-material/UndoRounded';

export interface SessionState {
    name: string;
    counters: CounterContext[];
    history: History;
}

export interface SessionProps extends PageProps {
    data: SessionState;
    undo: () => void;
    addToHistory: (index: number, total: number) => void;
}

export function Session({ data, undo, addToHistory }: SessionProps) {
    return (
        <main id="session">
            <div className="controls">
                <IconButton onClick={undo}>
                    <Undo />
                </IconButton>
            </div>
            <Dial
                totals={data.history[data.history.length - 1]}
                counterCtxs={data.counters}
                addToHistory={addToHistory}
            />
        </main>
    );
}
