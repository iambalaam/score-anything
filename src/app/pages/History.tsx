import * as React from 'react';
import { SessionProps } from './Session';
import './History.css';

export function History({ data, setPage }: SessionProps) {
    const gridTemplateColumns = Array(data.history[0].length).fill('1fr').join(' ');

    return (
        <main id='history'>
            <div className="controls">
                <button className='home' onClick={() => setPage('player-setup')}>🏠</button>
                <button className='history' onClick={() => setPage('history')}>📚</button>
                <button className='undo' onClick={() => setPage('counter')}>↺</button>
            </div>
            <div id="grid" style={{ gridTemplateColumns }}>
                {
                    data.history.map((entry) =>
                        entry.map((score, i) =>
                            <span className='score' style={{ color: data.counters[i].color.toString() }} key={i}>{score}</span>
                        )
                    )}
            </div>
        </main>)
}