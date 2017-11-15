# spatie-dom

[![Latest Version on NPM](https://img.shields.io/npm/v/spatie-dom.svg?style=flat-square)](https://npmjs.com/package/spatie-dom)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/spatie-dom/master.svg?style=flat-square)](https://travis-ci.org/spatie/spatie-dom)

A lightweight library with various DOM-related utilities for querying, animations, and event handling.

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## Installation

You can install the package via yarn (or npm):

```bash
yarn add @spatie/dom
```

That's it, no extra setup required to get started!

## Usage

Helpers can be imported from the package one by one.

```js
import { query, queryAll, tick } from '@spatie/dom';
```

Here's a quick overview of all the helpers, next we'll provide some detailed examples for every helper by category:

| Helper                      | Description |
| --------------------------- | ----------- |
| [`$`](#query)               | Alias for [`query`](#query) |
| [`$$`](#queryall)           | Alias for [`queryAll`](#queryall) |
| [`prop`](#prop)             | Read an attribute from a DOM node, optionally casting it to a JavaScript primitive |
| [`props`](#props)           | Read all attributes from a DOM node, optionally casting them to JavaScript primitives |
| [`query`](#query)           | Query the document or a another element for the first occurence of a selector |
| [`queryAll`](#queryall)     | Query the document or another element for all occurences of a selector in an array |
| [`scrollTo`](#scrollto)     | Scroll to a pixel offset, selector or element |
| [`tick`](#tick)             | A helper to make smooth animations with `requestAnimationFrame` |
| [`whenLoaded`](#whenloaded) | Execute code when the document is loaded |
| [`whenReady`](#whenready)   | Execute code when the document is ready |

### Query helpers

The DOM can be queried with `query` and `queryAll`, which are wrappers around [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). There are shorthand methods available too, respectively `$` and `$$`.

#### `query`

After passing a selector, `query` will look for a matching element in the document. Under the hood, `document.querySelector` is used.

```html
<div id="app"></div>
```

```js
import { query } from '@spatie/dom';

const app = query('#app'); // Returns a `HTMLElement`
```

You can scope the search to a parent element by passing it as a second parameter.

```html
<div id="page">
    <header id="header"></header>
</div>
```

```js
import { query } from '@spatie/dom';

const page = query('#page');
const header = query('#header', page);
```

`$` is an alias for `query`.

```js
import { $ } from '@spatie/dom';

const app = $('#app');
```

#### `queryAll`

After passing a selector, `queryAll` will look for all matching elements in the document. Under the hood, `document.querySelectorAll` is used. However, `queryAll` returns a plain array instead of the usual `NodeList` collection.

```html
<article class="article"></article>
<article class="article"></article>
```

```js
import { queryAll } from '@spatie/dom';

const articles = queryAll('.article'); // Returns an array `Array<HTMLElement>`
```

You can scope the search to a parent element by passing it as a second parameter.

```html
<div id="page">
    <article class="article"></article>
    <article class="article"></article>
</div>
```

```js
import { query, queryAll } from '@spatie/dom';

const page = query('#page');
const articles = queryAll('.article', page);
```

`$$` is an alias for `queryAll`.

```js
import { $$ } from '@spatie/dom';

const articles = $$('.article');
```

### Animation helpers

#### `tick`

`tick` helps you write animations with `requestAnimationFrame`.

The most basic example is passing a duration and callback to `tick`. The callback will be executed on every animation frame, and receives the total duration's progress (between 0 and 1) as it's first and only argument.

In this example, let's animate a ball from to the right of it's container.

```js
import { query, tick } from '@spatie/dom';

const ball = query('#ball');

tick(1000, progress => {
    ball.style.transform = `translateX(${progress * 100}%)`;
});
```

The callback will be executed on every frame, slowly translating the ball to the left as the progress of the duration grows. If you're browser is running at 60fps, the callback will be executed 60 times, since we've set our duration to 1 second.

If you prefer a more explicit notation, or want to pass extra options, use an object as the first argument.

`tick` can apply a custom easing function to determine the current progress. By default, progress grows linearly.

```js
import { query, tick, easeOut } from '@spatie/dom';

const ball = query('#ball');

tick({ duration: 500, easing: easeOut }, progress => {
    ball.style.transform = `translateX(${progress * 100}%)`;
});
```

If you want to do something after an animation's finished, you can chain a `then` call, as the `tick` function returns a promise.

```js
import { query, tick } from '@spatie/dom';

const ball = query('#ball');

tick(1000, progress => {
    ball.style.transform = `translateX(${progress * 100}%)`;
}).then(() => {
    // Move the ball back after the animation.
    ball.style.transform = null;    
});
```

*The `tick` function is inspired by Benjamin De Cock's [Gain Motion Superpowers with requestAnimationFrame](https://medium.com/@bdc/gain-motion-superpowers-with-requestanimationframe-ecc6d5b0d9a4) article.*

#### `scrollTo`

Vertically scroll to an offset, element or selector on the page.

```js
import { query, scrollTo } from '@spatie/dom';

// Scroll to 400px in the document
scrollTo(400);

// Scroll to the first element that matches '#footer'
scrollTo('#footer');

// Scroll to a DOM node
const article = query('#article');
scrollTo(article);
```

By default, the scroll animation takes 400ms. If you want a custom duration, you can pass a second argument.

```js
import { scrollTo } from '@spatie/dom';

// Scroll to the first element that matches '#footer' over 1000ms
scrollTo('#footer', 1000);
```

### Prop helpers

Props are DOM attributes that exist to be consumed by scripts. Props are read just like attributes, except they get parsed as JSON if prefixed by a `:`. 

This syntax is heavily based on what Vue uses for component props.

#### `prop`

Retrieves a single prop from an element.

```html
<div id="component" my-prop="foo" :config='{ "url": "bar" }'></div>
```

```js
import { query, prop } from  '@spatie/dom';

const component = query('#component');

prop(component, 'myProp'); // 'foo'
prop(component, 'config'); // { url: 'bar' }
```

#### `props`

Retrieves all attributes as props from an element.

```html
<div id="component" my-prop="foo" :config='{ "url": "bar" }'></div>
```

```js
import { query, props } from  '@spatie/dom';

const component = query('#component');

props(component); // { myProp: 'foo', config: { url: 'bar' }}
```

### Event helpers

#### `whenReady`

The `whenReady` function calls a function:

- immediately if the DOM is loaded;
- otherwise after the `document` `DOMContentLoaded` event

```js
import { whenReady } from  '@spatie/dom';

whenReady(() => console.log('Ready!'));
```

#### `whenLoaded`

The `whenLoaded` function calls a function:

- immediately if the DOM and all subresources (scripts, images,...) are loaded;
- otherwise after the `window` `load` event

```js
import { whenLoaded } from  '@spatie/dom';

whenLoaded(() => console.log('Loaded!'));
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

```bash
yarn run test
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
