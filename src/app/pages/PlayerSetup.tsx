import * as React from 'react';
import { CounterContext } from '../app';
import { createDefaultCounterContexts } from '../util/setup';
import './PlayerSetup.css';

export interface PlayerSetupProps {
    startNewSession: (counters: CounterContext[]) => void
}

export function PlayerSetup({ startNewSession }: PlayerSetupProps) {

    const [customPlayerCount, setCustomPlayerCount] = React.useState<number>(6)

    return <main id='player-setup'>
        <h1>Players:</h1>
        <div className="player-count">
            {[1, 2, 3, 4].map((playerCount) =>
                <button
                    key={playerCount}
                    className="count"
                    onClick={() => startNewSession(createDefaultCounterContexts(playerCount))}
                >
                    {playerCount}
                </button>
            )}
            <span className="custom">
                <span className="text">Custom:</span>
                <input
                    type="range" min={1} max={10} value={customPlayerCount}
                    onChange={(e) => { setCustomPlayerCount(parseInt(e.target.value))}}
                    name="range" id="range" />
                <span className="value">{customPlayerCount}</span>
                <button
                    className='start count'
                    onClick={() => startNewSession(createDefaultCounterContexts(customPlayerCount))}
                >
                    Start
                </button>
            </span>
        </div>
    </main>
}