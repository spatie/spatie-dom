import { hasTag, isInput, isTextInput, isCheckbox, isRadio, isTextarea, query } from '../src';

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

describe('isInput', () => {

    it('can determine whether an element is an input', () => {
        document.body.innerHTML = `
            <input id="input-1">
            <INPUT id="input-2">
            <div id="input-nope"></div>
        `;

        expect(isInput(query('#input-1'))).toBe(true);
        expect(isInput(query('#input-2'))).toBe(true);
        expect(isInput(query('#input-nope'))).toBe(false);
    });
});

describe('isTextInput', () => {

    it('can determine whether an element is a text input', () => {
        document.body.innerHTML = `
            <input id="input-1" type="text">
            <INPUT id="input-2" type="TEXT">
            <input id="input-nope-1" type="radio">
            <div id="input-nope-2"></div>
        `;

        expect(isTextInput(query('#input-1'))).toBe(true);
        expect(isTextInput(query('#input-2'))).toBe(true);
        expect(isTextInput(query('#input-nope-1'))).toBe(false);
        expect(isTextInput(query('#input-nope-2'))).toBe(false);
    });
});

describe('isCheckbox', () => {

    it('can determine whether an element is a checkbox input', () => {
        document.body.innerHTML = `
            <input id="input-1" type="checkbox">
            <INPUT id="input-2" type="CHECKBOX">
            <input id="input-nope-1" type="text">
            <div id="input-nope-2"></div>
        `;

        expect(isCheckbox(query('#input-1'))).toBe(true);
        expect(isCheckbox(query('#input-2'))).toBe(true);
        expect(isCheckbox(query('#input-nope-1'))).toBe(false);
        expect(isCheckbox(query('#input-nope-2'))).toBe(false);
    });
});

describe('isRadio', () => {

    it('can determine whether an element is a radio input', () => {
        document.body.innerHTML = `
            <input id="input-1" type="radio">
            <INPUT id="input-2" type="RADIO">
            <input id="input-nope-1" type="text">
            <div id="input-nope-2"></div>
        `;

        expect(isRadio(query('#input-1'))).toBe(true);
        expect(isRadio(query('#input-2'))).toBe(true);
        expect(isRadio(query('#input-nope-1'))).toBe(false);
        expect(isRadio(query('#input-nope-2'))).toBe(false);
    });
});

describe('isTextarea', () => {

    it('can determine whether an element is a text area', () => {
        document.body.innerHTML = `
            <textarea id="textarea-1"></textarea>
            <TEXTAREA id="textarea-2"></TEXTAREA>
            <div id="textarea-nope"></div>
        `;

        expect(isTextarea(query('#textarea-1'))).toBe(true);
        expect(isTextarea(query('#textarea-2'))).toBe(true);
        expect(isTextarea(query('#textarea-nope'))).toBe(false);
    });
});
