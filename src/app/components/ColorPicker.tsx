import * as React from 'react';
import { animate } from '../util/animate';
import { calculateCounterOffsets } from '../util/setup';
import { getDegreesFromCenter } from '../util/math';

import { Counter } from './Counter';
import './Dial.css';
import './ColorPicker.css';
import { ColorContext, CounterContext } from '../app';
import { HSL, HSL2String } from '../util/color';
import { getEventCoords } from '../util/events';

const DRAGGING_CLASS = 'dragging';

interface EventHandlerRef {
    hasFocus: number;
    isDown: boolean;
    onDownAngle: number;
    onMoveAngle: number;
    onUpAngle: number;
    enabled: boolean;
}
const initialHandlerRef = {
    hasFocus: -1,
    isDown: false,
    enabled: true,
    onUpAngle: 0,
    onDownAngle: 0,
    onMoveAngle: 0
};

export interface ColorPickerProps {
    counterCtxs: CounterContext[];
    setPlayerColor: (index: number, color: HSL) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ counterCtxs, setPlayerColor }) => {
    const eventRef = React.useRef<EventHandlerRef>(initialHandlerRef);
    const [angle, setAngle] = React.useState(0);
    const [hasFocus, setFocus] = React.useState(-1);

    const offsets = calculateCounterOffsets(counterCtxs.length);

    const handleDown =
        (index: number) => (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
            if (e.cancelable) e.preventDefault();
            if (!eventRef.current.enabled) return;

            document.body.classList.add(DRAGGING_CLASS);
            const startAngle = getDegreesFromCenter(...getEventCoords(e));
            eventRef.current = {
                ...eventRef.current,
                enabled: true,
                isDown: true,
                hasFocus: index,
                onDownAngle: startAngle,
                onMoveAngle: startAngle,
                onUpAngle: startAngle
            };
            setFocus(index);
        };
    const handleUp = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        if (!eventRef.current.isDown) return;
        if (e.cancelable) e.preventDefault();

        document.body.classList.remove(DRAGGING_CLASS);
        eventRef.current.isDown = false;
        eventRef.current.enabled = false;

        const deltaAngle = eventRef.current.onUpAngle - eventRef.current.onDownAngle;
        animate(
            1000,
            (t01) => {
                const newAngle = deltaAngle * (1 - t01);
                setAngle(newAngle);

                if (t01 === 1) {
                    // end of animation
                    eventRef.current.enabled = true;
                    setAngle(0);
                    setFocus(-1);
                }
            },
            (x) => 1 - Math.pow(x - 1, 4)
        );
    };

    const handleMove = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        if (!eventRef.current.isDown) return;
        if (e.cancelable) e.preventDefault();

        let newOnMoveAngle = getDegreesFromCenter(...getEventCoords(e));

        while (Math.abs(eventRef.current.onDownAngle - newOnMoveAngle) > 180) {
            newOnMoveAngle += eventRef.current.onDownAngle > newOnMoveAngle ? 360 : -360;
        }

        eventRef.current.onMoveAngle = newOnMoveAngle;
        eventRef.current.onUpAngle = newOnMoveAngle;
        setAngle(newOnMoveAngle - eventRef.current.onDownAngle);
        setPlayerColor(hasFocus, { h: angle + offsets[hasFocus], s: 60, l: 60 });
    };

    function setupEventListeners() {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('touchend', handleUp);
    }
    function cleanupEventListeners() {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('mouseup', handleUp);
        window.removeEventListener('touchend', handleUp);
        document.body.classList.remove(DRAGGING_CLASS);
    }
    React.useEffect(() => {
        setupEventListeners();
        return cleanupEventListeners;
    }, [counterCtxs, hasFocus]);

    const currentColor = hasFocus !== -1 ? HSL2String(counterCtxs[hasFocus].color) : 'transparent';
    const dragging = hasFocus !== -1;
    const { backgroundColor, trackColor } = React.useContext(ColorContext);

    return (
        <div
            className={`color-picker dial ${dragging ? 'dragging' : ''}`}
            style={{ color: HSL2String(trackColor) }}
        >
            {counterCtxs.map((counter, i) =>
                hasFocus === i ? (
                    <Counter
                        key={HSL2String(counter.color)}
                        hasFocus={true}
                        onDown={handleDown(i)}
                        color={counter.color}
                        angle={angle}
                        offset={offsets[i]}
                        tail={false}
                    />
                ) : (
                    <Counter
                        key={HSL2String(counter.color)}
                        hasFocus={false}
                        onDown={handleDown(i)}
                        color={counter.color}
                        angle={0}
                        offset={offsets[i]}
                        tail={false}
                    />
                )
            )}

            <div
                className="dial--cover"
                style={{
                    color: currentColor,
                    backgroundColor: HSL2String(backgroundColor)
                }}
            />
        </div>
    );
};
