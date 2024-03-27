import * as React from 'react';
import { CounterContext, History, Page, PageProps } from '../app';
import { Dial } from '../components/Dial';
import { IconButton } from '@mui/material';
import Undo from '@mui/icons-material/UndoRounded';
import SessionIcon from '@mui/icons-material/DataUsageRounded';
import HistoryIcon from '@mui/icons-material/HistoryRounded';
import { Toggle } from '../components/Toggle';

export interface SessionState {
    name: string;
    counters: CounterContext[];
    history: History;
}

export interface SessionProps extends PageProps {
    data: SessionState;
    undo: () => void;
    addToHistory: (index: number, total: number) => void;
    setPage: (page: Page) => void;
}

export function Session({ data, undo, addToHistory, setPage }: SessionProps) {
    return (
        <main id="session">
            <div className="controls">
                <IconButton onClick={undo}>
                    <Undo />
                </IconButton>
                <Toggle
                    value={true}
                    on={
                        <IconButton>
                            <SessionIcon />
                        </IconButton>
                    }
                    off={
                        <IconButton>
                            <HistoryIcon />
                        </IconButton>
                    }
                    onToggle={() => setPage('history')}
                />
            </div>
            <Dial
                totals={data.history[data.history.length - 1]}
                counterCtxs={data.counters}
                addToHistory={addToHistory}
            />
        </main>
    );
}
