import { tick } from './tick';
import { isNumeric } from '../util';

export function scrollTo(offsetOrElement, duration = 400) {
    const offset = getOffset(offsetOrElement);

    if (offset === null) {
        return;
    }

    const { scrollX, scrollY } = window;

    tick(duration, progress => {
        window.scrollTo(scrollX, scrollY + (offset - scrollY) * progress);
    });
}

function getOffset(offsetOrElement) {
    if (isNumeric(offsetOrElement)) {
        return offsetOrElement;
    }

    if (! (offsetOrElement instanceof Element)) {
        offsetOrElement = document.querySelector(offsetOrElement);
    }

    if (offsetOrElement === null) {
        return null;
    }

    const elementRect = offsetOrElement.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    return elementRect.top - bodyRect.top;
}
