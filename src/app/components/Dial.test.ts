import { conicGradient } from './Dial';

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