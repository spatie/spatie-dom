export function attribute(name, element, fallback) {
    return element.getAttribute(name) || fallback;
}