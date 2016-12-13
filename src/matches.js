export function matches(element, selector) {
    if (element.matches) {
        return element.matches(selector);
    }

    if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    }

    throw new Error('`Element.matches` is not supported in this browser');
}