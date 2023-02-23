import * as React from 'react';
import { Color, conicGradient, darken } from '../util/color';

const COUNTER_BLUR_Z = 99;
const HANDLE_BLUR_Z = 100;
const COUNTER_FOCUS_Z = 101;
const HANDLE_FOCUS_Z = 102;
interface CounterProps {
    hasFocus: boolean;
    color: Color;
    angle: number;
    offset: number;
    onDown: (e: React.MouseEvent | React.TouchEvent) => void;
}
export const Counter: React.FC<CounterProps> = ({ hasFocus, color, angle, offset, onDown }) => {
    const center = "translate(-50%, -50%)";
    const toEdge = "translateY(-35vmin)";
    const startSemiCircle = angle > 0
        ? `linear-gradient(90deg, ${darken(color, angle)} 52%, transparent 52%)`
        : `linear-gradient(270deg, ${darken(color, angle)} 52%, transparent 52%)`;
    const extraAngle = angle > 360
        ? angle - 360
        : angle < -360
            ? angle + 360
            : 0;

    return (
        <>
            <div className="counter" style={{
                background: conicGradient(angle, color, 'transparent'),
                transform: `rotateZ(${offset + extraAngle}deg)`,
                zIndex: hasFocus ? COUNTER_FOCUS_Z : COUNTER_BLUR_Z
            }} />
            <div className="counter--start" style={{ background: startSemiCircle, transform: `${center} rotate(${offset}deg) ${toEdge}` }}></div>
            <div
                className={hasFocus ? 'counter--handle dragging' : 'counter--handle'}
                style={{
                    backgroundColor: color.toString(),
                    transform: `${center} rotate(${angle + offset}deg) ${toEdge}`,
                    zIndex: hasFocus ? HANDLE_FOCUS_Z : HANDLE_BLUR_Z
                }}
                onMouseDown={onDown}
                onTouchStart={onDown}
            />
        </>
    )
}