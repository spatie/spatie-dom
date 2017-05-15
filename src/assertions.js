export function matches(el, selector) {
    if (el.matches) {
        return el.matches(selector);
    }

    if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
    }

    throw new Error('`Element.matches` is not supported in this browser');
}

export function hasTag(el, tag) {
    return el.tagName.toLowerCase() === tag.toLowerCase();
}

export function isInput(el) {
    return hasTag(el, 'input');
}

export function isTextInput(el) {
    return isInput(el) && el.getAttribute('type').toLowerCase() === 'text';
}

export function isCheckbox(el) {
    return isInput(el) && el.getAttribute('type').toLowerCase() === 'checkbox';
}

export function isRadio(el) {
    return isInput(el) && el.getAttribute('type').toLowerCase() === 'radio';
}

export function isTextarea(el) {
    return hasTag(el, 'textarea');
}
