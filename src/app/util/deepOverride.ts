export const deepOverride = (initial: unknown, override: unknown, merge = false) => {
    // Empty
    if (initial === undefined) return override;
    if (override === undefined) return initial;
    if (override === null) return override;
    // Value types
    if (typeof override !== 'object') return override;
    // Objects
    const obj: {} = Array.isArray(override) ? [] : {};
    if (merge && typeof initial === 'object' && initial !== null) {
        Object.keys(initial).forEach((key) => {
            (obj as any)[key] = deepOverride((initial as any)[key], (override as any)[key], merge);
        });
    }
    if (typeof override === 'object') {
        Object.keys(override).forEach((key) => {
            (obj as any)[key] = deepOverride((initial as any)[key], (override as any)[key], merge);
        });
    }
    return obj;
};
