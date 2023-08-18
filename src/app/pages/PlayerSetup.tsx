import * as React from 'react';
import { CounterContext } from '../app';
import { createDefaultCounterContexts } from '../util/setup';
import './PlayerSetup.css';
import { HSL2String } from '../util/color';

export interface PlayerSetupProps {
    startNewSession: (counters: CounterContext[]) => void
}

export function PlayerSetup({ startNewSession }: PlayerSetupProps) {
    const [custom, setCustom] = React.useState(false);
    const [playerCount, setPlayerCount] = React.useState(0);
    const [counterContexts, setCounterContexts] = React.useState<CounterContext[]>([]);

    const handleCustom: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setCustom(!custom);
    }

    const handleSubmit: React.MouseEventHandler = (e) => {
        e.preventDefault();
        startNewSession(createDefaultCounterContexts(playerCount))
    }

    const updatePlayerCount = (newPlayerCount: number) => {
        let newCtxs: CounterContext[] = [];
        const defaultCtxs: CounterContext[] = createDefaultCounterContexts(newPlayerCount);
        newCtxs = defaultCtxs.map((ctx, i) => ({
            color: ctx.color,
            name: counterContexts[i]?.name || ctx.name,
            start: counterContexts[i]?.start || ctx.start
        }));

        setCounterContexts(newCtxs);
        setPlayerCount(newPlayerCount);
    }

    return <main id='player-setup'>
        <h1>Players:</h1>

        <form className='setup'>
            <div className="players">
                {[1, 2, 3, 4].map((playerCount) =>
                    <React.Fragment key={playerCount}>
                        <input
                            id={`setup-${playerCount}-players`}
                            type="radio" name='playerCount'
                        />
                        <label
                            className='player-count'
                            htmlFor={`setup-${playerCount}-players`}
                            onClick={() => updatePlayerCount(playerCount)}
                        >{playerCount}</label>
                    </React.Fragment>
                )}
            </div>

            <div className={custom ? 'custom' : 'custom hidden'}>
                {Array(playerCount).fill(0).map((_, player) =>
                    <div className='player' key={`custom-${player}`}>

                        <span className="color" style={{ backgroundColor: HSL2String(counterContexts[player].color) }}></span>

                        <label htmlFor={`player-${player + 1}-name`}>name:</label>
                        <input type="text" name="" id={`player-${player + 1}-name`} placeholder={`player ${player + 1}`} />


                        <label htmlFor={`player-${player + 1}-score`}>score:</label>
                        <input type='number' step='1' id={`player-${player + 1}-score`} />
                    </div>
                )}
            </div>

            <div className="footer">
                <button disabled={playerCount < 1} onClick={handleCustom}>Edit</button>
                <button disabled={playerCount < 1} onClick={handleSubmit} type="submit">Start</button>
            </div>
        </form>
    </main>
}