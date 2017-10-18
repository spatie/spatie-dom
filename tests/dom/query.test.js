import { query, queryAll } from '../../src';

describe('query', () => {

    it('can find an element in the document', () => {
        document.body.innerHTML = `
            <div id="app"></div>
        `;

        const element = query('#app');

        expect(element.id).toBe('app');
    });

    it('returns null if nothing was found', () => {
        document.body.innerHTML = `
            <div id="app"></div>
        `;

        const element = query('#my-app');

        expect(element).toBeNull();
    });

    it('returns the first result if multiple occurrences were found', () => {
        document.body.innerHTML = `
            <div id="app1"></div>
            <div id="app2"></div>
        `;

        const element = query('div');

        expect(element.id).toBe('app1');
    });
});

describe('queryAll', () => {

    it('can find multiple elements in the document', () => {
        document.body.innerHTML = `
            <div class="section"></div>
            <div class="section"></div>
        `;

        const elements = queryAll('.section');

        expect(elements.length).toBe(2);
        expect(elements[0].className).toBe('section');
        expect(elements[1].className).toBe('section');
    });

    it('returns an empty array if nothing was found', () => {
        document.body.innerHTML = `
            <div id="app"></div>
        `;

        const elements = queryAll('.section');

        expect(elements.length).toBe(0);
    });
});
