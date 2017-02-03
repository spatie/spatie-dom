export function on(event, subject, handler) {
    subject.addEventListener(event, handler);
}