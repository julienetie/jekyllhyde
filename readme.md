# jekyllhyde

Just a clean way to gracefully degrade from modern browsers to IE11 support. (This means without bloating modern browser code).

It takes your source code > compiles loosely for modern browsers > compiles for IE11 like browsers > feature detects to determine if the browser is modern or IE11 like. jekyllhyde compiles using [Buble](https://buble.surge.sh/guide/) 


This is a boilerplate consisting of:

- jekyllhyde.js
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


jekyllhyde feature detects the browser to see if it supports features that are widely supported 
in modern evergreen browsers. To determine this jekyllhyde uses: 

- window.WeakMap
- window.Proxy
- window.Reflect
- window.Promise
- window.Symbol
- window.Object.assign

The script options are defined in jekyllhyde.js and may require some basic DOM manipulation.
The script is loaded asynchronously. currently jekyllhyde only supports one script. 

### Options
- Define cache invalidation hash 
- append to the body or head
- Define an insertBeforeReference to determine where the script should sit
- Specify the names of the scripts


As this is a browser targeting boilerplate there is no explicit support for node environments.
There is no reliable support for browser versions below IE11.
