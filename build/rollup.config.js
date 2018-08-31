import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

/*
 This config takes the ES6 source and compiles only what 
 is necessary for modern browser support.
*/
export default {
    input: "src/example.js",
    plugins: [
        nodeResolve({
            jsnext: true,
            browser: true
        }),
        commonjs(),
        buble({
            target: { chrome: 51, firefox: 48, safari: 9, edge: 14 }
        }),
    ],
    output: {
        name: "example",
        file: "dist/wavefront.js",
        format: 'iife'
    }
}