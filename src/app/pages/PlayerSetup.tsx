import * as React from 'react';
import { CounterContext } from '../app';
import { createDefaultCounterContexts } from '../util/setup';
import './PlayerSetup.css';
import { SessionState } from './Session';
import { HSL, HSL2String } from '../util/color';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/AddCircleRounded';
import Remove from '@mui/icons-material/RemoveCircleRounded';

export interface PlayerSetupProps {
    startNewSession: (session: SessionState) => void;
}

export function PlayerSetup({ startNewSession }: PlayerSetupProps) {
    const [playerCount, setPlayerCount] = React.useState(2);
    const [sessionState, setSessionState] = React.useState<SessionState>({
        counters: createDefaultCounterContexts(playerCount),
        history: [],
        name: ''
    });

    const handleSubmit: React.MouseEventHandler = (e) => {
        e.preventDefault();
        startNewSession({
            ...sessionState,
            name: getGameName(),
            history: [
                Array(sessionState.counters.length)
                    .fill(0)
                    .map((_, i) => sessionState.counters[i].start)
            ]
        });
    };

    const getGameName = () => sessionState.name || sessionState.counters.length + ' player game';
    const handleGameNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        const name = e.target.value;
        setSessionState({
            ...sessionState,
            name
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
            counters: newCtxs
        });
        setPlayerCount(newPlayerCount);
    };

    const addPlayer = () => {
        if (playerCount < 8) {
            updatePlayerCount(playerCount + 1);
        }
    };
    const removePlayer = () => {
        if (playerCount > 1) {
            updatePlayerCount(playerCount - 1);
        }
    };

    const setPlayerColor = (playerIndex: number, color: HSL) => {
        const newCtxs = [...sessionState.counters];
        const newPlayerCtx = newCtxs[playerIndex];
        newPlayerCtx.color = color;
        newCtxs[playerIndex] = newPlayerCtx;
        setSessionState({
            ...sessionState,
            counters: newCtxs
        });
    };

    const setPlayerName = (playerIndex: number, name: string) => {
        const newCtxs = [...sessionState.counters];
        const newPlayerCtx = newCtxs[playerIndex];
        newPlayerCtx.name = name;
        newCtxs[playerIndex] = newPlayerCtx;
        setSessionState({
            ...sessionState,
            counters: newCtxs
        });
    };

    const handlePlayerName = (playerIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setPlayerName(playerIndex, name);
    };

    const start = () =>
        startNewSession({
            ...sessionState,
            name: getGameName(),
            history: [
                Array(sessionState.counters.length)
                    .fill(0)
                    .map((_, i) => sessionState.counters[i].start)
            ]
        });

    return (
        <main id="player-setup">
            <input
                className="name"
                type="text"
                value={getGameName()}
                onChange={handleGameNameChange}
            />

            <div className="players">
                {sessionState.counters.map((player, index) => (
                    <div className="player">
                        <span
                            className="color"
                            style={{ color: HSL2String(player.color) }}
                            onClick={() => {
                                /* Set color */
                            }}
                        />
                        <input
                            type="text"
                            className="name"
                            value={player.name || `player ${index + 1}`}
                            onChange={handlePlayerName(index)}
                            style={{ borderColor: HSL2String(player.color) }}
                        />
                    </div>
                ))}

                <div className="count">
                    <button className="remove" onClick={removePlayer}>
                        <Remove />
                    </button>
                    <button className="add" onClick={addPlayer}>
                        <Add />
                    </button>
                </div>
            </div>

            <Button variant="contained" onClick={start}>
                Start
            </Button>
        </main>
    );
}
