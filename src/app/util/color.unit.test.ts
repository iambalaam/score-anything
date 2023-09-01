import { conicGradient, HSL } from './color';

const BLUE: HSL = { h: 208, s: 64, l: 57 };

describe('conicGradient()', () => {
    it('is a valid css class', () => {
        const gradient = conicGradient(90, BLUE, 'transparent');
        expect(gradient.startsWith('conic-gradient(')).toBeTruthy();
        expect(gradient.endsWith(')')).toBeTruthy();
    });

    it('handles the given color', () => {
        expect(conicGradient(90, BLUE, 'transparent')).toBe(
            'conic-gradient(transparent 0deg, hsl(212.49980967033025deg, 64%, 39.00076131867894%) 0deg, hsl(208deg, 64%, 57%) 90deg, transparent 90deg)'
        );
    });
});
