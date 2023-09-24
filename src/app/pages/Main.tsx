import * as React from 'react';
import './Main.css';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Page } from '../app';

export interface MainProps {
    setPage: (page: Page) => void;
}

export function Main({ setPage }: MainProps) {
    return (
        <main id="main">
            <Button
                startIcon={<CreateNewFolderIcon />}
                variant="contained"
                onClick={() => setPage('player-setup')}
            >
                New Game
            </Button>
            <Button
                startIcon={<FolderOpenIcon />}
                variant="contained"
                onClick={() => setPage('session-select')}
            >
                Previous Games
            </Button>
        </main>
    );
}
