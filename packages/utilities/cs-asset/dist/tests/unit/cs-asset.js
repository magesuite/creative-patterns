(function (exports) {
'use strict';

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
 * @param  {boolean} recheck  Tells if function should recheck for data attribute.
 * @return {string}           Formated path to given asset.
 */
function asset (assetPath, recheck) {
    if (recheck === void 0) { recheck = false; }
    if (assetDir === null || recheck) {
        assetDir = document.querySelector('body').getAttribute('data-cs-asset-dir');
        if (!assetDir) {
            assetDir = '';
        }
    }
    return assetDir + assetPath;
}
;

describe('Asset helper function', function () {
    it('returns unchanged path for missing attribute.', function () {
        var assetPath = 'test/test.txt';
        expect(asset(assetPath, true)).toEqual(assetPath);
    });
    it('returns unchanged path for empty attribute.', function () {
        document.querySelector('body').setAttribute('data-cs-asset-dir', '');
        var assetPath = 'test/test.txt';
        expect(asset(assetPath, true)).toEqual(assetPath);
    });
    it('returns prepended path when attribute is given.', function () {
        document.querySelector('body').setAttribute('data-cs-asset-dir', 'assets/');
        var assetPath = 'test/test.txt';
        expect(asset(assetPath, true)).toEqual('assets/' + assetPath);
    });
});

}((this.csAsset = this.csAsset || {})));
//# sourceMappingURL=cs-asset.js.map
