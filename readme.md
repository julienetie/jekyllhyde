# jekyllhyde


This is a boilerplate consisting of:

- 
jekyllhyde
.
js
 
- rollup.config.ie11.like.js
- rollup.config.js

Due to the shift in browser usage Internet Explorer's usage has decreased and is
becoming the minority of the market share. Internet Explorer 9 and 10 are no longer 
supported which means they may not be safe from vulnerabilities.

This boilerplate compiles source code into two separate builds:
- standard 
- IE11-like

The IE11-like build aims to support the IE11 browser and will compile as ES5 for 
unsupported ES6 features.

The standard build will compile to ES5 for minor differences between modern browsers,
but overwhelmingly will preserve native ES6 code.


jekyllhyde
 feature detects the browser to see if it supports features that are widely supported 
in modern evergreen browsers. To determine this 
jekyllhyde
 uses: 

- window.
WeakMap
,
- window.Proxy,
- window.Reflect,
- window.Promise,
- window.Symbol,
- window.Object.assign

As this is a browser targeted boilerplate there is no explicit support for node environments.
There is no reliable support for browser versions below IE11.