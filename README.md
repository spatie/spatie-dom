# spatie-dom

[![Latest Version on NPM](https://img.shields.io/npm/v/spatie-dom.svg?style=flat-square)](https://npmjs.com/package/spatie-dom)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/spatie-dom/master.svg?style=flat-square)](https://travis-ci.org/spatie/spatie-dom)

A small DOM querying and manipulation library.

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## Support us

Learn how to create a package like this one, by watching our premium video course:

[![Laravel Package training](https://spatie.be/github/package-training.jpg)](https://laravelpackage.training)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Install

You can install the package via yarn:

```bash
yarn add spatie-dom
```

## Usage

### Querying the DOM

The DOM can be queried with `query` and `queryAll`, which are wrappers around [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll).

Querying an element in `document`:

```html
<div id="app"></div>
```

```js
const app = query('#app'); // Returns a `HTMLElement`
```

Querying a collection of elements:

> `queryAll` returns a plain array instead of the usual `NodeList` collection

```html
<div id="main">
    <article></article>
    <article></article>
</div>
```

```js
const articles = queryAll('#main > article'); // Returns an array `Array<HTMLElement>`
```

`query` and `queryAll` also accept a scope as their second argument (by default, the scope is `document`).

```html
<div id="main">
    <h1>Header</h1>
</div>
```

```js
const main = query('#main'); // Returns a `HTMLElement`
const header = query('h1', main); // Also returns a `HTMLElement`
```

### Retrieving 'props'

Props are DOM attributes that exist to be consumed by scripts. Props behave just like attributes, except they get parsed as JSON if prefixed by a `:`.

> This syntax is heavily based on what Vue uses for component props

```html
<div
    id="component"
    my-prop="foo"
    :config='{ "url": "bar" }'
></div>
```

```js
import { query, prop, props } from  'spatie-dom';

const el = query('#component');

prop(el, 'myProp'); // 'foo'
prop(el, 'config'); // { url: 'bar' }

props(el); // { myProp: 'foo', config: { url: 'bar' }}
```

### Firing events based on the DOM state

The `whenReady` function calls a function:
- immediately if the DOM is loaded;
- otherwise after the `document` `DOMContentLoaded` event

```js
import { whenReady } from  'spatie-dom';

whenReady(() => console.log('Ready!'));
```

The `whenLoaded` function calls a function:
- immediately if the DOM and all subresources (scripts, images,...) are loaded;
- otherwise after the `window` `load` event

```js
import { whenLoaded } from  'spatie-dom';

whenLoaded(() => console.log('Loaded!'));
```

### Reading the DOM

There are several functions to read data from the dom.

With `attribute`, you can retrieve an attribute, and with `data`, you can retrieve a data attribute.

```html
<div id="element" data-foo="bar"></div>
```

```js
import { attribute, data, query };

const el = query('#element');

// Retrieve an attribute
attribute('id', el); // 'element'

// Retrieve an attribute with a fallback value
attribute('class', el, 'active'); // 'active'

// Retrieve a data attribute
data('foo', el); // 'bar'

// Retrieve a data attribute with a fallback value
data('baz', el, 'qux'); // 'qux'
```

## Full API

### Attribute

```ts
function attribute(name: string, el: HTMLElement, fallback: string = ''): string
```

### Data

```ts
function data(name: string, el: HTMLElement, fallback: string = ''): string
```

### On

```ts
function on(event: string, subject: HTMLElement, handler: Function): string
```

### Props

```ts
function prop(el: HTMLElement, name: string, fallback: any = null): any;

function props(el: HTMLElement): Object;
```

### Query

```ts
function query(selector: string): HTMLElement | null;
function query(selector: string, scope: HTMLElement | Document): HTMLElement | null;

function queryAll(selector: string): Array<HTMLElement>;
function queryAll(selector: string, scope: HTMLElement | Document): Array<HTMLElement>;
```

### When

```ts
function whenReady(callback: Function): void

function whenLoaded(callback: Function): void
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Sebastian De Deyne](https://github.com/sebastiandedeyne) instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
