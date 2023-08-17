import * as React from 'react';
import { SessionProps } from './Session';
import './History.css';
import { HSL2String } from '../util/color';

export function History({ data, setPage }: SessionProps) {
    const gridTemplateColumns = Array(data.history[0].length).fill('1fr').join(' ');

    return (
        <main id='history'>
            <div className="controls">
                <button className='home' onClick={() => setPage('main')}>🏠</button>
                <button className='history' onClick={() => setPage('history')}>📚</button>
                <button className='undo' onClick={() => setPage('counter')}>↺</button>
            </div>
            <div id="grid" style={{ gridTemplateColumns }}>
                {
                    data.history.map((entry) =>
                        entry.map((score, i) =>
                            <span className='score' style={{ color: HSL2String(data.counters[i].color) }} key={i}>{score}</span>
                        )
                    )}
            </div>
        </main>)
}