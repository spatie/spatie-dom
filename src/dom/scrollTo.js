export function scrollTo(offsetOrElement) {
    const offset = getOffset(offsetOrElement);

    if (offset === null) {
        return;
    }


}

function getOffset(offsetOrElement) {
    if (Number.isInteger(offsetOrElement)) {
        return offsetOrElement;
    }

    if (offsetOrElement instanceof Element) {
        const elementRect = offsetOrElement.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();

        return elementRect.top - bodyRect.top;
    }

    return document.querySelector(offsetOrElement);
}
