export function hasTag(el, tag) {
    return el.tagName.toLowerCase() === tag.toLowerCase();
}

export function matches(el, selector) {
    if (el.matches) {
        return el.matches(selector);
    }

    if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
    }

    throw new Error('`Element.matches` is not supported in this browser');
}
