import * as React from 'react';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import WakeUnlocked from '@mui/icons-material/LockOpenRounded';
import WakeLocked from '@mui/icons-material/LockRounded';
import RotateLocked from '@mui/icons-material/ScreenLockRotationRounded';
import RotateUnlocked from '@mui/icons-material/ScreenRotationRounded';

import { Toggle } from './Toggle';
import './Settings.css';

export interface Settings {
    theme: 'dark' | 'light';
    'screen-wake-lock': 'locked' | 'unlocked';
    'screen-orientation-lock': 'locked' | 'unlocked';
}
export interface SettingsProps {
    settings: Settings;
    setSettings: (s: Partial<Settings>) => void;
}
export function Settings({ settings, setSettings }: SettingsProps) {
    const isLight = settings.theme === 'light';
    const isWakeUnlocked = settings['screen-wake-lock'] === 'unlocked';
    const isOrientationUnlocked = settings['screen-orientation-lock'] === 'unlocked';

    return (
        <div id="settings">
            <div className="field">
                <span className="label">Theme</span>
                <Toggle
                    value={isLight}
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
                    onToggle={() => setSettings({ theme: isLight ? 'dark' : 'light' })}
                />
            </div>
            <div className="field">
                <span className="label">Wake Lock</span>
                <Toggle
                    value={isWakeUnlocked}
                    on={
                        <IconButton>
                            <WakeUnlocked />
                        </IconButton>
                    }
                    off={
                        <IconButton>
                            <WakeLocked />
                        </IconButton>
                    }
                    onToggle={() =>
                        setSettings({ 'screen-wake-lock': isWakeUnlocked ? 'locked' : 'unlocked' })
                    }
                />
            </div>
            <div className="field">
                <span className="label">Orientation Lock</span>
                <Toggle
                    value={isOrientationUnlocked}
                    on={
                        <IconButton>
                            <RotateUnlocked />
                        </IconButton>
                    }
                    off={
                        <IconButton>
                            <RotateLocked />
                        </IconButton>
                    }
                    onToggle={() =>
                        setSettings({
                            'screen-orientation-lock': isOrientationUnlocked ? 'locked' : 'unlocked'
                        })
                    }
                />
            </div>
        </div>
    );
}
