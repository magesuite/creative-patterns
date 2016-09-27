(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('csAsset', ['exports'], factory) :
    (factory((global.csAsset = global.csAsset || {})));
}(this, (function (exports) { 'use strict';

/**
 * Small utility function that lets you specify custom paths to asset directory
 * by setting "data-cs-asset-dir" attribute for body tag.
 */
/**
 * Path to asset directory.
 * @type {string}
 */
exports.assetDir = null;
/**
 * Returns path to given asset prepended with asset directory path.
 * @param  {string} assetPath Path to the asset relative to assets directory e.g. "dist/" folder.
 * @param  {boolean} recheck  Tells if function should recheck for data attribute.
 * @return {string}           Formated path to given asset.
 */
var csAsset = function (assetPath, recheck) {
    if (recheck === void 0) { recheck = false; }
    if (exports.assetDir === null || recheck) {
        exports.assetDir = document.querySelector('body').getAttribute('data-cs-asset-dir');
        if (!exports.assetDir) {
            exports.assetDir = '';
        }
    }
    return exports.assetDir + assetPath;
}

exports['default'] = csAsset;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-asset.js.map
