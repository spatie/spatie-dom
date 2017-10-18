import { Viewport } from '../../src';

describe('Viewport.isAtStart', () => {
    it('is true when the scroll position is at 0', () => {
        expect(
            (Viewport.withState({ window: { scrollTop: 0 } })).isAtStart
        ).toBe(true);
    });

    it('is false when the scroll position is at larger than 0 but smaller than the document height', () => {
        expect(
            (Viewport.withState({ window: { height: 500, scrollTop: 10 }, document: { height: 1000 } })).isAtStart
        ).toBe(false);
    });

    it('is not at the start when the scroll position is at larger than the document height', () => {
        expect(
            (Viewport.withState({ window: { height: 500, scrollTop: 2000 }, document: { height: 1000 } })).isAtStart
        ).toBe(false);
    });
});

describe('Viewport.isAtEnd', () => {
    it('is true when the scroll position is larger than the document height and viewport height combined', () => {
        expect(
            (Viewport.withState({ window: { height: 500, scrollTop: 500 }, document: { height: 1000 } })).isAtEnd
        ).toBe(true);
    });

    it('is false when the scroll position is smaller than the document height and viewport height combined', () => {
        expect(
            (Viewport.withState({ window: { height: 500, scrollTop: 100 }, document: { height: 1000 } })).isAtEnd
        ).toBe(false);
    });

    it('is true when window is larger than the document', () => {
        expect(
            (Viewport.withState({ window: { height: 1000, scrollTop: 0 }, document: { height: 500 } })).isAtEnd
        ).toBe(true);
    });
});
