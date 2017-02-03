import { query, attribute } from '../src';

describe('data', () => {

    it('can retrieve an attribute from an element', () => {
        document.body.innerHTML = `
            <div id="el"></div>
        `;

        const el = query('#el');

        expect(attribute('id', el)).toBe('el');
    });

    it('returns a fallback whent it cant retrieve an attribute from an element', () => {
        document.body.innerHTML = `
            <div id="el"></div>
        `;

        const el = query('#el');

        expect(attribute('class', el, 'nope')).toBe('nope');
    });
});