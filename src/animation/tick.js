import { isNumeric } from '../util';
import { easeInOutQuad } from './easing.js';

export function tick(options, callback = null) {
    if (isNumeric(options)) {
        options = { duration: options };
    }

    const ticker = createTicker(options);

    if (callback) {
        return ticker(callback);
    } else {
        return ticker;
    }
};

function createTicker({ duration, easing = easeInOutQuad } = {}) {
    return function (callback) {
        const time = createTime(duration);

        const tick = now => {
            time.elapsed = now - time.start;
            const progress = Math.min(time.elapsed / time.duration, 1);

            callback(easing(progress));

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    }
}

function createTime(duration) {
    return {
        start: performance.now(),
        elapsed: 0,
        duration,
    }
}
