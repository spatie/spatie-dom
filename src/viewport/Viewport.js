export default class Viewport {
    listeners = [];

    window = {
        width: 0,
        height: 0,
        scrollX: 0,
    };

    document = {
        width: 0,
        height: 0,
    };

    get size() {
        return { width: this.window.width, height: this.window.height };
    }

    get isAtStart() {
        return this.window.scrollX === 0;
    }

    get isAtEnd() {
        return (this.window.scrollX + this.window.height) >= this.document.height;
    }

    on(event, handler) {
        this.listeners.push([event, handler]);

        return this;
    }

    emit(event, payload = {}) {
        this.listeners
            .filter(([e]) => e === event)
            .forEach(([event, handler]) => handler({ ...payload, viewport: this }));
    }

    setState(state) {
        const newState = {
            window: { ...this.window, ...state.window },
            document: { ...this.document, ...state.document },
        };

        if (
            this.window.width !== newState.window.width ||
            this.window.height !== newState.window.height
        ) {
            this.emit('resize');
        }

        if (this.window.width !== newState.window.width) {
            this.emit('resizex');
        }

        if (this.window.height !== newState.window.height) {
            this.emit('resizey');
        }

        this.window = { ...this.window, ...window };
        this.document = { ...this.document, ...document };
    }

    listen() {
        window.addEventListener('scroll', () => {
            this.setState({
                window: {
                    scrollX: window.scrollX,
                },
            });
        });

        window.addEventListener('resize', () => {
            this.setState({
                window: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
            });
        });

        return this;
    }

    static listen() {
        return (new Viewport()).listen();
    }

    static withState({ window, document }) {
        const viewport = new Viewport();

        viewport.window = { ...viewport.window, ...window };
        viewport.document = { ...viewport.document, ...document };

        return viewport;
    }
}
