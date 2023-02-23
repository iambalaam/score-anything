import { clamp } from "./math";

export type Color = string | HSL;

export class HSL {
    constructor(public h: number, public s: number, public l: number) { }

    toString(): string {
        return `hsl(${this.h}deg, ${this.s}%, ${this.l}%)`;
    }
}

const COLOR_SHIFT = 1;
const DARKER = 4;
export function darken(color: Color, angle = 30) {
    const shades = Math.log(Math.max(Math.abs(angle), 1));
    if (color instanceof HSL) {
        return new HSL(color.h + COLOR_SHIFT * shades, color.s, color.l - DARKER * shades);
    }
    throw new Error(`Can't darken color ${color}`);
}

export function conicGradient(degrees: number, baseColor: Color, backgroundColor: Color): string {
    const angle = clamp(-360, 360, degrees);
    if (angle > 0 || Object.is(+0, angle)/* we differentiate ±0 */) {
        // forwards
        return `conic-gradient(${backgroundColor} 0deg, ${darken(baseColor, angle)} 0deg, ${baseColor} ${angle}deg, ${backgroundColor} ${angle}deg)`;
    } else {
        // backwards
        const backAngle = angle + 360;
        return `conic-gradient(${backgroundColor} ${backAngle}deg, ${baseColor} ${backAngle}deg, ${darken(baseColor, angle)} 360deg, ${backgroundColor} 360deg)`;
    }
}