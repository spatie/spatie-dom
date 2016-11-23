export function camelCase(string) {
    return string.replace(
        /(\-|_)([a-z])/g, 
        (result, delimeter, char) => char.toUpperCase()
    );
}

export function kebabCase(string) {
    return string.replace(
        /([A-Z])/g,
        char => '-' + char.toLowerCase()
    );
}