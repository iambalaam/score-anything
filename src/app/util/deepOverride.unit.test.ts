import { deepOverride } from './deepOverride';

describe('deepOverride()', () => {
    // Pure function
    it('returns new object', () => {
        const initial = {};
        const override = {};
        const merged = deepOverride(initial, override);
        expect(merged).not.toBe(initial);
        expect(merged).not.toBe(override);
    });
    it('leaves initial objects untouched', () => {
        const initial = { a: 1, nested: {} };
        const initialString = JSON.stringify(initial);
        const override = { a: 2, nested: { deeply: true } };
        const overrideString = JSON.stringify(override);
        deepOverride(initial, override);

        expect(JSON.stringify(initial)).toEqual(initialString);
        expect(JSON.stringify(override)).toEqual(overrideString);
    });

    // Literals
    it('takes a default', () => {
        expect(deepOverride('default', undefined)).toBe('default');
    });
    it('takes an override', () => {
        expect(deepOverride('default', 'override')).toBe('override');
    });

    // Single objects
    it('maps over a single layer', () => {
        expect(deepOverride({ value: 1 }, { value: 2 })).toEqual({ value: 2 });
    });
    it('merges objects', () => {
        expect(deepOverride({ a: 1 }, { b: 2 }, true)).toEqual({ a: 1, b: 2 });
    });

    // Different shapes
    it('favours overrides', () => {
        expect(deepOverride(1, { obj: true })).toEqual({ obj: true });
        expect(deepOverride({ obj: true }, 1)).toEqual(1);
    });
    it('allows deep defaults', () => {
        expect(deepOverride({ deep: { value: true } }, {}, true)).toEqual({
            deep: { value: true }
        });
    });

    // Deep objects
    it('can delete data', () => {
        const initialDeep = [1, 2, 3, 4];
        const overrideDeep = [1, 2, 3];
        expect(deepOverride(initialDeep, overrideDeep)).toEqual([1, 2, 3]);
    });
    it('can keep & merge data', () => {
        const initialDeep = { initial: { nested: 'value' } };
        const overrideDeep = { override: { nested: 'value' } };
        expect(deepOverride(initialDeep, overrideDeep, true)).toEqual({
            initial: { nested: 'value' },
            override: { nested: 'value' }
        });
    });
});
