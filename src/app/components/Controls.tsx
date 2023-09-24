import * as React from 'react';
import './Controls.css';

import HomeRounded from '@mui/icons-material/HomeRounded';
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
    onToggle: (offOn: boolean) => void;
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
    return (
        <div className="controls">
            <nav>
                <IconButton onClick={() => setPage('main')}>
                    <HomeRounded />
                </IconButton>
                {nav}
            </nav>
            <div>{actions}</div>
        </div>
    );
}
