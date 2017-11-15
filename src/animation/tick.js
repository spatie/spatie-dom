import { isNumeric } from '../util';
import { linear } from './easing.js';

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

function createTicker({ duration, easing = linear } = {}) {
    return function (callback) {
        return new Promise(resolve => {
            const time = createTime(duration);

            const tick = now => {
                time.elapsed = now - time.start;
                const progress = Math.min(time.elapsed / time.duration, 1);

                callback(easing(progress));

                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(tick);
        })
    }
}

function createTime(duration) {
    return {
        start: performance.now(),
        elapsed: 0,
        duration,
    }
}
