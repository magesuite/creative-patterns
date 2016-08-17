import Vue from 'vue';
import component from '../../cc-component-controller';

describe( 'Component controller object.', function(): void {
    const methods: any = component.methods;
    const props: any = component.props;

    it( 'has a move up method.', function(): void {
        expect( typeof methods.onMoveUp ).toBe( 'function' );
    } );

    it( 'has a move down method.', function(): void {
        expect( typeof methods.onMoveDown ).toBe( 'function' );
    } );

    it( 'has an open settings method.', function(): void {
        expect( typeof methods.onOpenSettings ).toBe( 'function' );
    } );

    it( 'has a delete component method.', function(): void {
        expect( typeof methods.onDeleteComponent ).toBe( 'function' );
    } );

    it( 'has a class property.', function(): void {
        expect( props.class ).toEqual( jasmine.anything() );
    } );

    it( 'has a move up property.', function(): void {
        expect( props.moveUp ).toEqual( jasmine.anything() );
    } );

    it( 'has a move down property.', function(): void {
        expect( props.moveDown ).toEqual( jasmine.anything() );
    } );

    it( 'has an open settings property.', function(): void {
        expect( props.openSettings ).toEqual( jasmine.anything() );
    } );

    it( 'has a delete component property.', function(): void {
        expect( props.deleteComponent ).toEqual( jasmine.anything() );
    } );

});

describe( 'Component controller Vue component', function(): void {
    let vm: any, spy: any, ref: any;
    beforeEach( function(): void {
        // Create a spy that we will use to check if callbacks was called.
        spy = {
            propCallback: (): undefined => undefined,
            eventCallback: (): undefined => undefined
        };
        spyOn( spy, 'propCallback' );
        spyOn( spy, 'eventCallback' );

        // Prepare Vue instance with a template.
        vm = new Vue( {
            template: `<div>
                <cc-component-controller v-ref:component :move-up="propCallback" :move-down="propCallback"
                    :open-settings="propCallback" :delete-component="propCallback">
                    <div class="cc-component-controller__button" slot="cc-component-controller__button--up"></div>
                    <div class="cc-component-controller__button" slot="cc-component-controller__button--down"></div>
                    <div class="cc-component-controller__button" slot="cc-component-controller__button--settings"></div>
                    <div class="cc-component-controller__button" slot="cc-component-controller__button--delete"></div>
                </cc-component-controller>
            </div>`,
            components: {
                'cc-component-controller': component
            },
            methods: {
                propCallback: spy.propCallback
            }
        } ).$mount();
        // Get reference to component we want to test.
        ref = vm.$refs.component;
    } );


    it( 'triggers move up event.', function(): void {
        vm.$on( 'cc-component-controller__move-up', spy.eventCallback );
        ref.onMoveUp();

        expect( spy.eventCallback ).toHaveBeenCalled();
    } );

    it( 'triggers move up callback.', function(): void {
        ref.onMoveUp();

        expect( spy.propCallback ).toHaveBeenCalled();
    } );

    it( 'triggers move down event.', function(): void {
        vm.$on( 'cc-component-controller__move-down', spy.eventCallback );
        ref.onMoveDown();

        expect( spy.eventCallback ).toHaveBeenCalled();
    } );

    it( 'triggers move down callback.', function(): void {
        ref.onMoveDown();

        expect( spy.propCallback ).toHaveBeenCalled();
    } );

    it( 'triggers open settings event.', function(): void {
        vm.$on( 'cc-component-controller__open-settings', spy.eventCallback );
        ref.onOpenSettings();

        expect( spy.eventCallback ).toHaveBeenCalled();
    } );

    it( 'triggers open settings event.', function(): void {
        ref.onOpenSettings();

        expect( spy.propCallback ).toHaveBeenCalled();
    } );

    it( 'triggers delete component event.', function(): void {
        vm.$on( 'cc-component-controller__delete-component', spy.eventCallback );
        ref.onDeleteComponent();

        expect( spy.eventCallback ).toHaveBeenCalled();
    } );

    it( 'triggers delete component callback.', function(): void {
        ref.onDeleteComponent();

        expect( spy.propCallback ).toHaveBeenCalled();
    } );
});
