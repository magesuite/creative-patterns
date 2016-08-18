import Vue from 'vue';
import component from '../../cc-component-adder';

describe( 'Component controller object.', function(): void {
    const methods: any = component.methods;
    const props: any = component.props;

    it( 'has a create component method.', function(): void {
        expect( typeof methods.onCreateComponent ).toBe( 'function' );
    } );

    it( 'has a class property.', function(): void {
        expect( props.class ).toEqual( jasmine.anything() );
    } );

    it( 'has a create component property.', function(): void {
        expect( props.createComponent ).toEqual( jasmine.anything() );
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
                <cc-component-adder v-ref:component :create-component="propCallback">
                    <div class="cc-component-controller__button" slot="cc-component-controller__button-create"></div>
                </cc-component-adder>
            </div>`,
            components: {
                'cc-component-adder': component
            },
            methods: {
                propCallback: spy.propCallback
            }
        } ).$mount();

        // Get reference to component we want to test.
        ref = vm.$refs.component;
    } );

    it( 'triggers create component event.', function(): void {
        vm.$on( 'cc-component-adder__create-component', spy.eventCallback );
        ref.onCreateComponent();

        expect( spy.callback ).toHaveBeenCalled();
    } );

    it( 'triggers create component callback.', function(): void {
        ref.onCreateComponent();

        expect( spy.propCallback ).toHaveBeenCalled();
    } );
} );
