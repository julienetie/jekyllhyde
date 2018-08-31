/** 
 * Feature detect for browsers "like" IE11.
 * 
 */
const options = {
    hash: null, // 12345
    hashMarker: null, // "_hash_"
    scripts: {
        standard: 'dist/example.js', // Change this if the standard library is to be renamed. 
        ie11Like: 'dist/example.ie11.like.js' // Change this if the IE11-Like library is to be renamed. 
    },
    position: 'body', // body | head.
    insertBeforeReference: null // i.e. document.head.children[2] | null.
};


const createScript = (options, type) => {
    const script = document.createElement('script');

    if (options.hashMarker === null) {
        script.src = options.scripts[type];
    } else {
        const src = options.scripts[type].replace(options.hashMarker, options.hash);
        script.src = src;
    }

    if (options.insertBeforeReference === null) {
        document[options.position].appendChild(script);
    } else {
        const documentSeciton = document[options.position];
        document[options.position].insertBefore(script, options.insertBeforeReference);
    }
};

// Loop though to check common supported features that are supported by all modern browsers except IE11 and below.
// This will also load the script for browsers similar to IE11
const features = [
    window.WeakMap,
    window.Proxy,
    window.Reflect,
    window.Promise,
    window.Symbol,
    window.Object.assign
];

const isIE11Like = features.some(feature => typeof feature !== 'function');

// Change the source for the aforementioned script name to support the IE11-like version. 
const type = isIE11Like ? 'ie11Like' : 'standard';
createScript(options, type);