(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csAsset', factory) :
    (global.csAsset = factory());
}(this, (function () { 'use strict';

var assetDir = null;
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
