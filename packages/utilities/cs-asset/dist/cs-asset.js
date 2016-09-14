(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csAsset', factory) :
    (global.csAsset = factory());
}(this, (function () { 'use strict';

/**
 * Small utility function that lets you specify custom paths to asset directory
 * by setting "data-cs-asset-dir" attribute for body tag.
 */
/**
 * Path to asset directory.
 * @type {string}
 */
var assetDir = null;
/**
 * Returns path to given asset prepended with asset directory path.
 * @param  {string} assetPath Path to the asset relative to assets directory e.g. "dist/" folder.
 * @return {string}           Formated path to given asset.
 */
function csAsset (assetPath) {
    if (assetDir === null) {
        assetDir = document.querySelector('body').getAttribute('data-cs-asset-dir');
        if (!assetDir) {
            assetDir = '';
        }
    }
    return assetDir + assetPath;
}
;

return csAsset;

})));
//# sourceMappingURL=cs-asset.js.map
