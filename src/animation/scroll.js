import { tick } from './tick';
import { isNumeric } from '../util';

export function scrollTo(offsetOrElementOrSelector, duration = 400) {
    const offset = getOffset(offsetOrElementOrSelector);

    if (offset === null) {
        return;
    }

    const { scrollX, scrollY } = window;

    tick(duration, progress => {
        window.scrollTo(scrollX, scrollY + (offset - scrollY) * progress);
    });
}

function getOffset(offsetOrElementOrSelector) {
    if (isNumeric(offsetOrElementOrSelector)) {
        return offsetOrElementOrSelector;
    }

    const element = offsetOrElementOrSelector instanceof Element
        ? offsetOrElementOrSelector
        : document.querySelector(offsetOrElementOrSelector);

    if (element === null) {
        return null;
    }

    const elementRect = element.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    return elementRect.top - bodyRect.top;
}
