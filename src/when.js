export function whenReady(callback) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        callback();
        return;
    }

    document.addEventListener('DOMContentLoaded', function handler() {
        callback();
        document.removeEventListener('DOMContentLoaded', handler);
    }); 
}

export function whenLoaded(callback) {
    if (document.readyState === 'complete') {
        callback();
        return;
    }

    window.addEventListener('load', function handler() {
        callback();
        document.removeEventListener('load', handler);
    }); 
}