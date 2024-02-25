import * as React from 'react';
import { useState, useEffect } from 'react';
import './Controls.css';

import HomeRounded from '@mui/icons-material/HomeRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import IconButton from '@mui/material/IconButton';
import { Page } from '../app';

export interface ControlProps {
    setPage: (page: Page) => void;
    nav?: React.ReactNode;
    actions?: React.ReactNode;
}

export interface ToggleProps {
    off: React.ReactNode;
    on: React.ReactNode;
    onToggle: (onOff: boolean) => void;
    defaultOn?: boolean;
}
export function Toggle({ off, on, onToggle, defaultOn }: ToggleProps) {
    const [state, setState] = React.useState<boolean>(defaultOn || false);
    return (
        <span
            className={state ? 'toggle on' : 'toggle off'}
            onClick={() => {
                onToggle(!state);
                setState(!state);
            }}
        >
            {off}
            {on}
        </span>
    );
}

export function Controls({ setPage, nav, actions }: ControlProps) {
    const [isDarkMode, setDarkMode] = useState(false);
    useEffect(() => {
        window.document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div className="controls">
            <div className="top">
                <nav>
                    <IconButton onClick={() => setPage('main')}>
                        <HomeRounded />
                    </IconButton>
                    {nav}
                </nav>
                <div className="settings">
                    <Toggle
                        defaultOn={false}
                        off={
                            <IconButton>
                                <DarkModeRounded />
                            </IconButton>
                        }
                        on={
                            <IconButton>
                                <LightModeRounded />
                            </IconButton>
                        }
                        onToggle={setDarkMode}
                    />
                </div>
            </div>
            <div>{actions}</div>
        </div>
    );
}
