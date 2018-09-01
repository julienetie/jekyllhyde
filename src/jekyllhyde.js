/** 
 * Feature detect for browsers "like" IE11.
 * 
 */
(function() {
    const isArray = Array.isArray;
    const scripts = {
        /* 
            The ES6 features to detect:
            Common features in modern browsers which IE11 
            and smilar browsers lack support for.
        */
        features: [
            typeof window.WeakMap === 'function',
            typeof window.Proxy === 'function',
            typeof window.Reflect !== null,
            typeof window.Promise === 'function',
            typeof window.Symbol === 'function',
            typeof window.Object.assign === 'function',
        ],
        /*
            DOMContentLoaded: *
            Specify if the head or body is to be modified immediately or after DOMContentLoaded.
            This is relevant for body if jekyllhyde is included in the body and relevant for 
            head if jekyllhyde is included in the head.
            ?
        */
        DOMContentLoaded: {
            head: false,
            body: true
        },
        // Head scripts.
        head: [
            {
                /*
                     hash: 
                     A reference for cache invalidation. If you are generating 
                     the hash dynamically within the HTML use document.querySelector or similar 
                     to obtain the value. hash is null by default.
                     @param {number | string}
                 */
                hash: null,
                /*
                     hashMarker: 
                     The part of the src name to be replaced for cache invalidation.
                     hashMarker is null by default.
                     @param {number | string}
                 */
                hashMarker: null,
                /*
                     src: * 
                     Source paths to the default script and the IE11-like script verison.
                     @param {string}
                */
                src: {
                    default: 'mock-scripts/script.1.js', // Change this if the standard library is to be renamed. 
                    ie11Like: 'mock-scripts/script.5.js' // Change this if the IE11-Like library is to be renamed. 
                },

                /*
                    insertBeforeReference: 
                    The node to insert the script before. 
                    param {Object} Node
                */
                insertBeforeReference: null // i.e. document.head.children[2] | null.
            },
            {
                src: {
                    default: 'mock-scripts/script.2.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            },
            {
                src: {
                    default: 'mock-scripts/script.3.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            },
            {
                src: {
                    default: 'mock-scripts/script.4.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            }
        ],
        // Body scripts.
        body: [{
                src: {
                    default: 'mock-scripts/script.5.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            },
            {
                src: {
                    default: 'mock-scripts/script.6.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            },
            {
                src: {
                    default: 'mock-scripts/script.7.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            },
            {
                src: {
                    default: 'mock-scripts/script.8.js',
                    ie11Like: 'mock-scripts/script.5.js'
                }
            }
        ]
    }

    /** 
     * 
     *
     */
    const isIE11Like = scripts.features.some(function(value){return !value});
    console.log('isIE11Like', isIE11Like)
    /** 
     * 
     *
     */
    function createScripts(section, scripts) {
        function loadScript(i) {
            if (i < scripts[section].length) {

                console.log(i)
                const scriptConfig = scripts[section][i];
                // Create script.
                const script = document.createElement('script');

                // Call the next script once finished loading.
                script.onload = function() {
                    i++;
                    loadScript(i);
                }

                // Use IE11-Like fallback script by basic feature detection.
                const src = isIE11Like ? scriptConfig.src.ie11Like : scriptConfig.src.default;

                // Use cache invalidation hash if specified.
                const hasHashMarker = typeof scriptConfig.hashMarker === 'string' ||
                    typeof scriptConfig.hashMarker === 'number';


                // Set src.
                if (hasHashMarker) {
                    script.src = src.replace(scriptConfig.hashMarker, scriptConfig.hash);
                } else {
                    script.src = src;
                }

                // Insert script into document section.
                if (scriptConfig.insertBeforeReference instanceof Element) {
                    document[section].insertBefore(script, scriptConfig.insertBeforeReference);
                } else {
                    document[section].appendChild(script);
                }
            }
        }
        loadScript(0);
    }

    /**  
     * Sets up how scripts are loaded for the body and head.
     * @param {} scripts - script configuration. 
     */
    function initialize(scripts) {
        if (isArray(scripts.head) && scripts.head.length > 0) {
            if (scripts.DOMContentLoaded.head === true) {
                document.addEventListener("DOMContentLoaded", function() {
                    // Wait for HTML to load.
                    createScripts('head', scripts);
                });
            } else {
                // Load immediately
                createScripts('head', scripts);
            }
        }
        if (isArray(scripts.body) && scripts.body.length > 0) {
            if (scripts.DOMContentLoaded.body === true) {
                document.addEventListener("DOMContentLoaded", function() {
                    // Wait for HTML to load.
                    createScripts('body', scripts);
                });
            } else {
                // Load immediately.
                createScripts('body', scripts);
            }
        }
    }


    initialize(scripts);

})();