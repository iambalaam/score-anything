import * as React from 'react';

export const HapticValue: React.FC<{ value: React.ReactNode }> = ({ value, }) => {
    const prev = React.useRef<React.ReactNode>(undefined);
    if (value !== prev.current) {
        prev.current = value;
        window.navigator?.vibrate(30);
    }

    return <>{value}</>;
}