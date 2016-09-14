
let assetDir: string = null;

export default function( assetPath: string ): string {
    if ( assetDir === null ) {
        assetDir = document.querySelector( 'body' ).getAttribute( 'data-cs-asset-dir' );
        if ( !assetDir ) {
            assetDir = '';
        }
    }

    return assetDir + assetPath;
};
