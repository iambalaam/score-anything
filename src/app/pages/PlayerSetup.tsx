import * as React from 'react';
import { CounterContext } from '../app';
import { createDefaultCounterContexts } from '../util/setup';
import './PlayerSetup.css';
import { HSL2String } from '../util/color';
import { SessionState } from './Session';

export interface PlayerSetupProps {
    startNewSession: (session: SessionState) => void;
}

export function PlayerSetup({ startNewSession }: PlayerSetupProps) {
    const [custom, setCustom] = React.useState(false);
    const [playerCount, setPlayerCount] = React.useState(0);
    const [sessionState, setSessionState] = React.useState<SessionState>({
        counters: [],
        history: [],
        name: ''
    });

    const handleCustom: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setCustom(!custom);
    };

    const handleSubmit: React.MouseEventHandler = (e) => {
        e.preventDefault();
        startNewSession({
            ...sessionState,
            history: [
                Array(sessionState.counters.length)
                    .fill(0)
                    .map((_, i) => sessionState.counters[i].start)
            ]
        });
    };

    const handleGameNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        const name = e.target.value;
        setSessionState({
            ...sessionState,
            name
        });
    };

    const handleNameChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.value;
        const newCtxs = [...sessionState.counters];
        newCtxs[i] = { ...newCtxs[i], name };
        setSessionState({
            ...sessionState,
            counters: newCtxs
        });
    };

    const handleScoreChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const score = parseInt(e.target.value, 10);
        const newCtxs = [...sessionState.counters];
        newCtxs[i] = { ...newCtxs[i], start: score };
        setSessionState({
            ...sessionState,
            counters: newCtxs
        });
    };

    const updatePlayerCount = (newPlayerCount: number) => {
        let newCtxs: CounterContext[] = [];
        const defaultCtxs: CounterContext[] = createDefaultCounterContexts(newPlayerCount);
        newCtxs = defaultCtxs.map((ctx, i) => ({
            color: ctx.color,
            name: sessionState.counters[i]?.name || ctx.name,
            start: sessionState.counters[i]?.start || ctx.start
        }));

        setSessionState({
            ...sessionState,
            counters: newCtxs,
            name: `${newPlayerCount} player game`
        });
        setPlayerCount(newPlayerCount);
    };

    return (
        <main id="player-setup">
            <h1>Players:</h1>

            <form className="setup">
                <div className="players">
                    {[1, 2, 3, 4].map((playerCount) => (
                        <React.Fragment key={playerCount}>
                            <input
                                id={`setup-${playerCount}-players`}
                                type="radio"
                                name="playerCount"
                            />
                            <label
                                className="player-count"
                                htmlFor={`setup-${playerCount}-players`}
                                onClick={() => updatePlayerCount(playerCount)}
                            >
                                {playerCount}
                            </label>
                        </React.Fragment>
                    ))}
                </div>

                <div className={custom ? 'custom' : 'custom hidden'}>
                    <input
                        type="text"
                        id="game-name"
                        onChange={handleGameNameChange}
                        value={sessionState.name}
                    />

                    {Array(playerCount)
                        .fill(0)
                        .map((_, player) => {
                            const { color, start, name } = sessionState.counters[player];
                            return (
                                <div className="player" key={`custom-${player}`}>
                                    <span
                                        className="color"
                                        style={{
                                            backgroundColor: HSL2String(color)
                                        }}
                                    ></span>

                                    <label htmlFor={`player-${player + 1}-name`}>name:</label>
                                    <input
                                        type="text"
                                        name=""
                                        id={`player-${player + 1}-name`}
                                        placeholder={`player ${player + 1}`}
                                        value={name}
                                        onChange={handleNameChange(player)}
                                    />

                                    <label htmlFor={`player-${player + 1}-score`}>score:</label>
                                    <input
                                        type="number"
                                        step="1"
                                        id={`player-${player + 1}-score`}
                                        // Weird issue to remove leading zeros
                                        // TODO: fix for negative numbers
                                        value={start.toString().replace(/^0+{.*}/, '$1')}
                                        onChange={handleScoreChange(player)}
                                    />
                                </div>
                            );
                        })}
                </div>

                <div className="footer">
                    <button disabled={playerCount < 1} onClick={handleCustom}>
                        Edit
                    </button>
                    <button disabled={playerCount < 1} onClick={handleSubmit} type="submit">
                        Start
                    </button>
                </div>
            </form>
        </main>
    );
}
