import { query, prop, props } from '../../src';

describe('prop', () => {

    it('can retrieve a text prop from an element', () => {
        document.body.innerHTML = `
            <div id="el" my-prop="foo"></div>
        `;

        const myProp = prop(query('#el'), 'myProp');

        expect(myProp).toBe('foo');
    });

    it('can retrieve an evaluated json prop from an element', () => {
        document.body.innerHTML = `
            <div id="el" :my-prop='{ "foo": "bar" }'></div>
        `;

        const myProp = prop(query('#el'), 'myProp');

        expect(myProp).toEqual({ foo: 'bar' });
    });

    it('returns null if a prop is missing', () => {
        document.body.innerHTML = `
            <div id="el"></div>
        `;

        const myProp = prop(query('#el'), 'myProp');

        expect(myProp).toBeNull();
    });

    it('can return a default value if a prop is missing', () => {
        document.body.innerHTML = `
            <div id="el"></div>
        `;

        const myProp = prop(query('#el'), 'myProp', 'default');

        expect(myProp).toBe('default');
    });

    it('throws an error when something goes wrong parsing a JSON prop', () => {
        document.body.innerHTML = `
            <div id="el" :my-prop='{ "foo": "bar }'></div>
        `;

        expect(() => {
            prop(query('#el'), 'myProp');
        }).toThrowErrorMatchingSnapshot();
    });
});

describe('props', () => {

    it('can return an object containing all defined props on an element', () => {
        document.body.innerHTML = `
            <div id="el" prop-one="one" :prop-two="2"></div>
        `;

        const allProps = props(query('#el'));

        expect(allProps).toEqual({ id: 'el', propOne: 'one', propTwo: 2 });
    });
});
