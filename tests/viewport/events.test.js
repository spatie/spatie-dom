import { Viewport } from '../../src';

describe('En event for', () => {
    it('resize is triggered when the width changed', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { width: 960, height: 1000 } });
        viewport.on('resize', () => { resized = true; });

        viewport.setState({ window: { width: 1000, height: 1000 } });

        expect(resized).toBe(true);
    });

    it('resize is triggered when the height changed', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { width: 960, height: 1000 } });
        viewport.on('resize', () => { resized = true; });

        viewport.setState({ window: { width: 960, height: 800 } });

        expect(resized).toBe(true);
    });

    it('resize isn\'t triggered when the width and height didn\'t change', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { width: 960, height: 1000 } });
        viewport.on('resize', () => { resized = true; });

        viewport.setState({ window: { width: 960, height: 1000 } });

        expect(resized).toBe(false);
    });

    it('resizex is triggered when the width changed', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { width: 960 } });
        viewport.on('resizex', () => { resized = true; });

        viewport.setState({ window: { width: 1000 } });

        expect(resized).toBe(true);
    });

    it('resizex isn\'t triggered when the width hasn\'t changed', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { width: 960 } });
        viewport.on('resizex', () => { resized = true; });

        viewport.setState({ window: { width: 960 } });

        expect(resized).toBe(false);
    });

    it('resizey is triggered when the height changed', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { height: 960 } });
        viewport.on('resizey', () => { resized = true; });

        viewport.setState({ window: { height: 1000 } });

        expect(resized).toBe(true);
    });

    it('resizey isn\'t triggered when the height hasn\'t changed', () => {
        let resized = false;

        const viewport = Viewport.withState({ window: { height: 960 } });
        viewport.on('resizey', () => { resized = true; });

        viewport.setState({ window: { height: 960 } });

        expect(resized).toBe(false);
    });
});
