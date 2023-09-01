import * as React from 'react';
import './Main.css';
import { Page } from '../app';

export interface MainProps {
    setPage: (page: Page) => void;
}

export function Main({ setPage }: MainProps) {
    return (
        <main id="main">
            <button onClick={() => setPage('player-setup')}>New Game</button>
            <button onClick={() => setPage('session-select')}>Previous Games</button>
        </main>
    );
}
