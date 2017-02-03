import { query, data } from '../src';

describe('data', () => {

    it('can retrieve a data attribute from an element', () => {
        document.body.innerHTML = `
            <div id="el" data-id="1"></div>
        `;

        const el = query('#el');

        expect(data('id', el)).toBe('1');
    });

    it('returns a fallback whent it cant retrieve a data attribute from an element', () => {
        document.body.innerHTML = `
            <div id="el" data-id="1"></div>
        `;

        const el = query('#el');

        expect(data('name', el, 'Hello')).toBe('Hello');
    });
});