export function query(scope, selector) {
    if (arguments.length === 1) {
        return query(document, arguments[0]);
    }

    return scope.querySelector(selector);
}

export function queryAll(scope, selector) {
    if (arguments.length === 1) {
        return queryAll(document, arguments[0]);
    }

    return [...scope.querySelectorAll(selector)];
}