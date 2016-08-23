import component from '../../cc-layout-builder';

describe( 'Component controller object.', function(): void {
    const methods: any = component.methods;
    const props: any = component.props;

    it( 'has a create new component method.', function(): void {
        expect( typeof methods.createNewComponent ).toBe( 'function' );
    } );

    it( 'has a move component up method.', function(): void {
        expect( typeof methods.moveComponentUp ).toBe( 'function' );
    } );

    it( 'has a move component down method.', function(): void {
        expect( typeof methods.moveComponentDown ).toBe( 'function' );
    } );

    it( 'has a delete component method.', function(): void {
        expect( typeof methods.deleteComponent ).toBe( 'function' );
    } );

    it( 'has a class property.', function(): void {
        expect( props.class ).toEqual( jasmine.anything() );
    } );

    it( 'has an edit component property.', function(): void {
        expect( props.editComponent ).toEqual( jasmine.anything() );
    } );

    it( 'has an add component property.', function(): void {
        expect( props.addComponent ).toEqual( jasmine.anything() );
    } );
});
