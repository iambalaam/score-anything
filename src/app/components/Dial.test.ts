import { clamp, conicGradient } from './Dial';

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

describe('conicGradient()', () => {
    it('is a valid css class', () => {
        const gradient = conicGradient(90, 'indianred', 'transparent');
        expect(gradient.startsWith('conic-gradient(')).toBeTruthy();
        expect(gradient.endsWith(')')).toBeTruthy();
    })

    it('handles the given color', () => {
        expect(conicGradient(90, 'indianred', 'transparent'))
            .toBe('conic-gradient(transparent 0deg, indianred 0deg, indianred 90deg, transparent 90deg)');
    })
});