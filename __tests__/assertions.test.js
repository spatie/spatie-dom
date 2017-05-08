import { hasTag, query } from '../src';

describe('hasTag', () => {

    it('can determine whether an element has a tag', () => {
        document.body.innerHTML = `
            <div id="el"></div>
        `;

        const el = query('#el');

        expect(hasTag('div', el)).toBe(true);
        expect(hasTag('DIV', el)).toBe(true);
        expect(hasTag('Div', el)).toBe(true);
        expect(hasTag('span', el)).toBe(false);
    });

    it('can determine whether an custom element has a tag', () => {
        document.body.innerHTML = `
            <my-element id="el"></my-element>
        `;

        const el = query('#el');

        expect(hasTag('my-element', el)).toBe(true);
    });
});
