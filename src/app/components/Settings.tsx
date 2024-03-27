import * as React from 'react';
import { IconButton } from '@mui/material';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import WakeUnlocked from '@mui/icons-material/LockOpenRounded';
import WakeLocked from '@mui/icons-material/LockRounded';
import RotateLocked from '@mui/icons-material/ScreenLockRotationRounded';
import RotateUnlocked from '@mui/icons-material/ScreenRotationRounded';
import Share from '@mui/icons-material/ShareRounded';
import Copy from '@mui/icons-material/ContentCopy';

import { Toggle } from './Toggle';
import './Settings.css';

const URL = 'https://iambalaam.github.io/score-anything';

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

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(URL);
        } catch (_) {
            // Do nothing
        }
    };

    const canShare = 'share' in navigator;
    const share = async () => {
        try {
            await navigator.share({
                title: 'Score Anything',
                url: URL
            });
        } catch (_) {
            // Do nothing
        }
    };

    return (
        <div id="settings">
            <fieldset className="preferences">
                <legend>Preferences</legend>
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
                            setSettings({
                                'screen-wake-lock': isWakeUnlocked ? 'locked' : 'unlocked'
                            })
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
                                'screen-orientation-lock': isOrientationUnlocked
                                    ? 'locked'
                                    : 'unlocked'
                            })
                        }
                    />
                </div>
            </fieldset>
            <fieldset className="social">
                <legend>Social</legend>
                <div className="field">
                    <span className="label">Share</span>
                    <span className="buttons">
                        <IconButton onClick={copy}>
                            <Copy />
                        </IconButton>
                        {canShare && (
                            <IconButton onClick={share}>
                                <Share />
                            </IconButton>
                        )}
                    </span>
                </div>
            </fieldset>
        </div>
    );
}
