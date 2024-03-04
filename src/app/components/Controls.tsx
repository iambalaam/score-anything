import * as React from 'react';
import { useEffect } from 'react';
import './Controls.css';

import HomeRounded from '@mui/icons-material/HomeRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import Unlocked from '@mui/icons-material/LockOpenOutlined';
import Locked from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import { Page } from '../app';
import { Toggle } from './Toggle';

export interface Settings {
    theme: 'dark' | 'light';
    'screen-wake-lock': 'locked' | 'unlocked';
}

export interface ControlProps {
    settings: Settings;
    setSettings: (s: Partial<Settings>) => void;
    setPage: (page: Page) => void;
    nav?: React.ReactNode;
    actions?: React.ReactNode;
}

export function Controls({ settings, setSettings, setPage, nav, actions }: ControlProps) {
    useEffect(() => {
        window.document.documentElement.setAttribute('data-theme', settings.theme);
    }, [settings.theme]);

    useEffect(() => {
        // ts-loader can't find WakeLockSentinel
        let lockPromise: Promise<any> | undefined;
        if (settings['screen-wake-lock'] && 'wakeLock' in window.navigator) {
            lockPromise = (window.navigator.wakeLock as any).request('screen');
        }

        return () => {
            if (lockPromise) {
                lockPromise.then((lock) => lock.release());
            }
        };
    }, [settings['screen-wake-lock']]);

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
                        value={settings.theme === 'light'}
                        on={
                            <IconButton>
                                <LightModeRounded />
                            </IconButton>
                        }
                        off={
                            <IconButton>
                                <DarkModeRounded />
                            </IconButton>
                        }
                        onToggle={(onOff) => {
                            setSettings({ theme: onOff ? 'light' : 'dark' });
                        }}
                    />
                    <Toggle
                        value={settings['screen-wake-lock'] === 'unlocked'}
                        on={
                            <IconButton>
                                <Unlocked />
                            </IconButton>
                        }
                        off={
                            <IconButton>
                                <Locked />
                            </IconButton>
                        }
                        onToggle={(onOff) =>
                            setSettings({ 'screen-wake-lock': onOff ? 'unlocked' : 'locked' })
                        }
                    />
                </div>
            </div>
            <div>{actions}</div>
        </div>
    );
}
