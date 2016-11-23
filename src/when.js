export function whenReady(callback) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        callback();
        return;
    }

    const callbackHandler = () => {
        callback();
        document.removeEventListener('DOMContentLoaded', callbackHandler);
    };

    document.addEventListener('DOMContentLoaded', callbackHandler); 
}