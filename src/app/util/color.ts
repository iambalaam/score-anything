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