import { Viewport } from '../../src';

describe('Viewport.size', () => {
    it('retrieves the size of the viewport', () => {
        expect(
            (Viewport.withState({ window: { width: 960, height: 500 } })).size
        ).toEqual({ width: 960, height: 500 });
    });

    it('starts with 0 with and 0 height', () => {
        expect(
            (new Viewport()).size
        ).toEqual({ width: 0, height: 0 });
    });
});
