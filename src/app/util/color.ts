import { clamp } from './math';

export type Color = string | HSL;

export interface HSL {
    h: number;
    s: number;
    l: number;
}

export function HSL2String(hsl: HSL): string {
    return `hsl(${hsl.h}deg, ${hsl.s}%, ${hsl.l}%)`;
}

const COLOR_SHIFT = 1;
const DARKER = 4;
export function darken(color: Color, angle = 30) {
    const shades = Math.log(Math.max(Math.abs(angle), 1));
    if (typeof color === 'object' && 'h' in color && 's' in color && 'l' in color) {
        return {
            h: color.h + COLOR_SHIFT * shades,
            s: color.s,
            l: color.l - DARKER * shades
        };
    }
    throw new Error(`Can't darken color ${color}`);
}

export function conicGradient(degrees: number, baseColor: HSL, backgroundColor: Color): string {
    const angle = clamp(-360, 360, degrees);
    if (angle > 0 || Object.is(+0, angle) /* we differentiate ±0 */) {
        // forwards
        return `conic-gradient(${backgroundColor} 0deg, ${HSL2String(
            darken(baseColor, angle)
        )} 0deg, ${HSL2String(baseColor)} ${angle}deg, ${backgroundColor} ${angle}deg)`;
    } else {
        // backwards
        const backAngle = angle + 360;
        return `conic-gradient(${backgroundColor} ${backAngle}deg, ${HSL2String(
            baseColor
        )} ${backAngle}deg, ${HSL2String(
            darken(baseColor, angle)
        )} 360deg, ${backgroundColor} 360deg)`;
    }
}
