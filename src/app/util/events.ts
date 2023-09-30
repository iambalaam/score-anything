export function getEventCoords(
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
): [number, number] {
    if ('clientX' in e) {
        return [e.clientX, e.clientY];
    } else {
        return [e.touches[0].clientX, e.touches[0].clientY];
    }
}
