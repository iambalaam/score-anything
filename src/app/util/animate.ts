export function animate(
    time: number,
    callback: (t01: number) => void,
    easing: (x: number) => number = (x) => x // linear
) {
    let lastTimestamp = 0;
    let cumMs = 0

    function loop(timestamp: DOMHighResTimeStamp) {
        if (lastTimestamp == 0) {
            lastTimestamp = timestamp;
            return requestAnimationFrame(loop);
        }

        const ms = timestamp - lastTimestamp;
        cumMs += ms;
        const t01 = Math.min(cumMs / time, 1);
        const tEval = easing(t01);

        callback(tEval);

        if (cumMs > time) return callback(1);
        lastTimestamp = timestamp;
        requestAnimationFrame(loop);
    }
    loop(0);
}