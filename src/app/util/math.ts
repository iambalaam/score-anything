const RAD_2_DEGS = 180 / Math.PI;
export function getDegreesFromCenter(x: number, y: number, centerX = window.innerWidth / 2, centerY = window.innerHeight / 2) {
    const dx = x - centerX;
    const dy = y - centerY;
    return 90 - Math.atan2(-dy, dx) * RAD_2_DEGS;
}

export function clamp(min: number, max: number, value: number) {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}