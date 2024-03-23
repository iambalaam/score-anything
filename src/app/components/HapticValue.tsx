import * as React from 'react';

export const HapticValue: React.FC<{ value: React.ReactNode }> = ({ value }) => {
    const prev = React.useRef<React.ReactNode>(undefined);

    React.useEffect(() => {
        if (prev.current !== undefined) {
            try {
                window.navigator?.vibrate(30);
            } catch (_) {
                // Do nothing
            }
        }
        prev.current = value;
    }, [value]);

    return <>{value}</>;
};
