import Vue from '../../../node_modules/vue/dist/vue';

import { IComponentInformation, layoutBuilder } from '../../cc-layout-builder';

describe( 'Component controller object.', function(): void {
    const methods: any = layoutBuilder.methods;
    const props: any = layoutBuilder.props;

    it( 'supports a class property.', function(): void {
        expect( props.class ).toEqual( jasmine.anything() );
    } );

    it( 'supports an edit component property.', function(): void {
        expect( props.editComponent ).toEqual( jasmine.anything() );
    } );

    it( 'supports an add component property.', function(): void {
        expect( props.addComponent ).toEqual( jasmine.anything() );
    } );

    it( 'supports an initial component configuration property.', function(): void {
        expect( props.componentsConfiguration ).toEqual( jasmine.anything() );
    } );

});

describe( 'Component controller Vue component', function(): void {
    let vm: any;
    let spy: any;
    let ref: any;
    const initialConfig: IComponentInformation[] = [
        {
            name: 'foo',
            id: 'bar',
            settings: null,
        },
    ];

    beforeEach( function(): void {
        // Create a spy that we will use to check if callbacks was called.
        spy = {
            eventCallback: (): undefined => undefined,
            propCallback: (): undefined => undefined,
        };
        spyOn( spy, 'eventCallback' );
        spyOn( spy, 'propCallback' );

        // Prepare Vue instance with a template.
        vm = new Vue( {
            template: `<div>
                <cc-layout-builder
                    v-ref:component
                    component-configuration="${JSON.stringify( initialConfig )}"
                >
                </cc-layout-builder>
            </div>`,
            components: {
                'cc-layout-builder': layoutBuilder,
            },
        } ).$mount();

        // Get reference to component we want to test.
        ref = vm.$refs.component;
    } );

    it( 'returns initial configuration when not changed.', function(): void {
        expect( ref.getComponentInformation() ).toEqual( initialConfig );
    } );

    it( 'triggers update event on init.', function(): void {
        vm.$on( 'cc-layout-builder__update', spy.eventCallback );
        expect( spy.eventCallback ).toHaveBeenCalled();
    } );
} );
