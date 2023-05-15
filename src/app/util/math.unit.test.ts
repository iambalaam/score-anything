import { getDegreesFromCenter, clamp } from "./math";

describe('getDegreesFromCenter()', () => {
    // All tests written in a 100x100 box

    it('returns 0 degrees vertically up', () => {
        expect(getDegreesFromCenter(50, 0, 50, 50)).toBeCloseTo(0);
    });

    it('returns 180 degrees vertically down', () => {
        expect(getDegreesFromCenter(50, 100, 50, 50)).toBeCloseTo(180);
    });
});

describe('clamp()', () => {
    it('returns an unclamped value', () => {
        expect(clamp(-100, 100, 17)).toBe(17);
    });

    it(`doesn't exceed the maximum`, () => {
        expect(clamp(0, 10, 15)).toBe(10);
    });

    it(`doesn't go below the minimum`, () => {
        expect(clamp(0, 360, -90)).toBe(0);
    });

    it(`respects ±0`, () => {
        expect(Object.is(clamp(-10, 10, -0), -0)).toBeTruthy();
        expect(Object.is(clamp(-10, 10, -0), +0)).toBeFalsy();
        expect(Object.is(clamp(-10, 10, +0), +0)).toBeTruthy();
        expect(Object.is(clamp(-10, 10, +0), -0)).toBeFalsy();
    });
})