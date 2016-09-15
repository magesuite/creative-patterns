import asset from '../../cs-asset';

describe( 'Asset helper function', function(): void {
    it( 'returns unchanged path for missing attribute.', function(): void {
        const assetPath: string = 'test/test.txt';
        expect( asset( assetPath, true ) ).toEqual( assetPath );
    } );
    it( 'returns unchanged path for empty attribute.', function(): void {
        document.querySelector( 'body' ).setAttribute( 'data-cs-asset-dir', '' );
        const assetPath: string = 'test/test.txt';
        expect( asset( assetPath, true ) ).toEqual( assetPath );
    } );
    it( 'returns prepended path when attribute is given.', function(): void {
        document.querySelector( 'body' ).setAttribute( 'data-cs-asset-dir', 'assets/' );
        const assetPath: string = 'test/test.txt';
        expect( asset( assetPath, true ) ).toEqual( 'assets/' + assetPath );
    } );
} );
