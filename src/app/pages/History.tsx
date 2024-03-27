import * as React from 'react';
import { SessionProps } from './Session';
import './History.css';
import { HSL2String } from '../util/color';
import { toAbsFloorSignedIntString } from '../util/math';
import { IconButton } from '@mui/material';
import Undo from '@mui/icons-material/UndoRounded';
import SessionIcon from '@mui/icons-material/DataUsageRounded';
import HistoryIcon from '@mui/icons-material/HistoryRounded';
import { Toggle } from '../components/Toggle';

export function History({ data, undo, setPage }: SessionProps) {
    const gridTemplateColumns = Array(data.history[0].length).fill('1fr').join(' ');

    return (
        <main id="history">
            <div className="controls">
                <IconButton onClick={undo}>
                    <Undo />
                </IconButton>
                <Toggle
                    value={false}
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
                    onToggle={() => setPage('counter')}
                />
            </div>
            <div id="grid" style={{ gridTemplateColumns }}>
                {[...data.history]
                    .map((entry, i) =>
                        entry.map((score, player) => {
                            if (i !== 0) {
                                const diff = toAbsFloorSignedIntString(
                                    data.history[i][player] - data.history[i - 1][player]
                                );
                                if (diff !== '0') {
                                    return (
                                        <span
                                            className="score"
                                            style={{
                                                color: HSL2String(data.counters[player].color)
                                            }}
                                            key={player}
                                            data-diff={diff}
                                        >
                                            {score}
                                        </span>
                                    );
                                }
                            }
                            return (
                                <span
                                    className="score"
                                    style={{
                                        color: HSL2String(data.counters[player].color)
                                    }}
                                    key={player}
                                >
                                    {score}
                                </span>
                            );
                        })
                    )
                    .reverse()}
            </div>
        </main>
    );
}
