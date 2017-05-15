import { hasTag, query } from '../src';

describe('hasTag', () => {

    it('can determine whether an element has a tag', () => {
        document.body.innerHTML = `
            <div id="el"></div>
        `;

        const el = query('#el');

        expect(hasTag(el, 'div')).toBe(true);
        expect(hasTag(el, 'DIV')).toBe(true);
        expect(hasTag(el, 'Div')).toBe(true);
        expect(hasTag(el, 'span')).toBe(false);
    });

    it('can determine whether an custom element has a tag', () => {
        document.body.innerHTML = `
            <my-element id="el"></my-element>
        `;

        const el = query('#el');

        expect(hasTag(el, 'my-element')).toBe(true);
    });
});
