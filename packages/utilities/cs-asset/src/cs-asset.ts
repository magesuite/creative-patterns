/**
 * Small utility function that lets you specify custom paths to asset directory
 * by setting "data-cs-asset-dir" attribute for body tag.
 */
/**
 * Path to asset directory.
 * @type {string}
 */
let assetDir: string = null;
/**
 * Returns path to given asset prepended with asset directory path.
 * @param  {string} assetPath Path to the asset relative to assets directory e.g. "dist/" folder.
 * @param  {boolean} recheck  Tells if function should recheck for data attribute.
 * @return {string}           Formated path to given asset.
 */
export default function( assetPath: string, recheck: boolean = false ): string {
    if ( assetDir === null || recheck ) {
        assetDir = document.querySelector( 'body' ).getAttribute( 'data-cs-asset-dir' );
        if ( !assetDir ) {
            assetDir = '';
        }
    }

    return assetDir + assetPath;
};

export { assetDir };
