import * as React from 'react';

import HomeRounded from '@mui/icons-material/HomeRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import IconButton from '@mui/material/IconButton';

import './Nav.css';
import { Page } from '../app';

export interface NavProps {
    showSettings: boolean;
    openCloseSettings: () => void;
    setPage: (page: Page) => void;
}

export function Nav({ setPage, openCloseSettings, showSettings }: NavProps) {
    return (
        <nav>
            <IconButton className="home" onClick={() => setPage('main')}>
                <HomeRounded />
            </IconButton>
            <IconButton
                className={showSettings ? 'show settings' : 'hide settings'}
                onClick={openCloseSettings}
            >
                <SettingsRounded />
            </IconButton>
        </nav>
    );
}
