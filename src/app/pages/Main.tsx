import * as React from 'react';
import './Main.css';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Page } from '../app';

export interface MainProps {
    hasPreviousGames: boolean;
    setPage: (page: Page) => void;
}

export function Main({ hasPreviousGames, setPage }: MainProps) {
    return (
        <main id="main">
            <Button
                endIcon={<CreateNewFolderIcon />}
                variant="contained"
                onClick={() => setPage('player-setup')}
            >
                <span className="text">New Game</span>
            </Button>
            <Button
                disabled={!hasPreviousGames}
                endIcon={<FolderOpenIcon />}
                variant="contained"
                onClick={() => setPage('session-select')}
            >
                <span className="text">Previous Games</span>
            </Button>
        </main>
    );
}
