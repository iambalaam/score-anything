import * as React from 'react';
import './Toggle.css';

export interface ToggleProps {
    on: React.ReactNode;
    off: React.ReactNode;
    value: boolean;
    onToggle: () => void;
}
export function Toggle({ on, off, value, onToggle }: ToggleProps) {
    return (
        <span className={value ? 'toggle on' : 'toggle off'} onClick={onToggle}>
            {on}
            {off}
        </span>
    );
}
