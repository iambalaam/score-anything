export const deepOverride = (initial: unknown, override: unknown) => {
    // Empty
    if (initial === undefined) return override;
    if (override === undefined) return initial;
    if (override === null) return override;
    // Value types
    if (typeof override !== 'object') return override;
    // Objects
    const obj: Record<string, unknown> = {};
    if (typeof initial === 'object' && initial !== null) {
        Object.keys(initial).forEach((key) => {
            obj[key] = deepOverride((initial as any)[key], (override as any)[key]);
        });
    }
    if (typeof override === 'object') {
        Object.keys(override).forEach((key) => {
            obj[key] = deepOverride((initial as any)[key], (override as any)[key]);
        });
    }
    return obj;
};
