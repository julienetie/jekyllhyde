import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
/*
 This config takes the ES6 source and compiles to be 
 compatible with IE11.  
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
            target: { ie: 11 }
        }),
    ],
    output: {
        name: 'example',
        file: 'dist/example.ie11.like.js',
        format: 'iife'
    }
}