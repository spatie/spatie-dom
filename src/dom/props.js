import { kebabCase, camelCase } from '../util';

export function prop(el, name, fallback = null) {
    const attributeName = kebabCase(name);

    if (el.hasAttribute(`:${attributeName}`)) {
        try {
            return JSON.parse(el.getAttribute(`:${attributeName}`));
        } catch (error) {
            throw new Error(`Error parsing JSON for prop ${attributeName}: ${error.message}`);
        }
    }

    if (! el.hasAttribute(attributeName)) {
        return fallback;
    }

    return el.getAttribute(attributeName);
}

export function props(el) {
    const props = {};

    for (let i = 0; i < el.attributes.length; i++) {
        const name = camelCase(el.attributes[i].name.replace(/^:/m, ''));
        props[name] = prop(el, name);
    }

    return props;
}
