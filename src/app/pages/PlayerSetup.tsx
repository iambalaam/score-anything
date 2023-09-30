import * as React from 'react';
import { CounterContext } from '../app';
import { createDefaultCounterContexts } from '../util/setup';
import './PlayerSetup.css';
import { SessionState } from './Session';
import { ColorPicker } from '../components/ColorPicker';
import { HSL } from '../util/color';

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

    return (
        <main id="player-setup">
            <ColorPicker counterCtxs={sessionState.counters} setPlayerColor={setPlayerColor} />
        </main>
    );
}
