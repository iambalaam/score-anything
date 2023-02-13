import { HSL } from '../util/color';
import { conicGradient } from './Dial';

const BLUE = new HSL(208, 64, 57);

describe('conicGradient()', () => {
    it('is a valid css class', () => {
        const gradient = conicGradient(90, BLUE, 'transparent');
        expect(gradient.startsWith('conic-gradient(')).toBeTruthy();
        expect(gradient.endsWith(')')).toBeTruthy();
    })

    it('handles the given color', () => {
        expect(conicGradient(90, BLUE, 'transparent'))
            .toBe('conic-gradient(transparent 0deg, hsl(214.80239476332432deg, 64%, 43.395210473351376%) 0deg, hsl(208deg, 64%, 57%) 90deg, transparent 90deg)');
    })
});