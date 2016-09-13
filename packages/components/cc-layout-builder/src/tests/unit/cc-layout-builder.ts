import Vue from '../../../node_modules/vue/dist/vue';

import { IComponentInformation, layoutBuilder } from '../../cc-layout-builder';

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
        Vue.config.devtools = false;
        document.body.insertAdjacentHTML('afterbegin', '<app></app>');
        // Create a spy that we will use to check if callbacks was called.
        spy = {
            eventCallback: (): undefined => undefined,
            addCallback: (): undefined => undefined,
            editCallback: (): undefined => undefined,
        };
        spyOn( spy, 'eventCallback' );
        spyOn( spy, 'addCallback' );
        spyOn( spy, 'editCallback' );

        // Prepare Vue instance with a template.
        vm = new Vue( {
            template: `<div>
                <cc-layout-builder
                    v-ref:component
                    components-configuration='${JSON.stringify( initialConfig )}',
                    :add-component="addCallback",
                    :edit-component="editCallback"
                >
                </cc-layout-builder>
            </div>`,
            components: {
                'cc-layout-builder': layoutBuilder,
            },
            events: {
                'cc-layout-builder__update': spy.eventCallback,
            },
            methods: {
                propCallback: spy.propCallback,
                editCallback: spy.editCallback,
                addCallback: spy.addCallback,
            },
        } ).$mount( 'app' );
        // Get reference to component we want to test.
        ref = vm.$refs.component;
    } );

    it( 'returns initial configuration when not changed.', function(): void {
        expect( ref.getComponentInformation() ).toEqual( initialConfig );
    } );

    it( 'returns changed configuration when component is added.', function(): void {
        const newComponent: IComponentInformation = {
            name: 'foo',
            id: 'bar',
            settings: null,
        };
        ref.addComponentInformation( 0, newComponent );
        expect( ref.getComponentInformation() ).not.toEqual( initialConfig );
    } );

    it( 'returns changed configuration when component is replaced.', function(): void {
        const newComponent: IComponentInformation = {
            name: 'foo',
            id: 'bar',
            settings: null,
        };
        ref.setComponentInformation( 0, JSON.parse( JSON.stringify( newComponent ) ) );
        expect( ref.getComponentInformation() ).toEqual( [ newComponent ] );
    } );

    it( 'adds new component to collection.', function(): void {
        const newComponent: IComponentInformation = {
            name: 'foo',
            id: 'bar',
            settings: null,
        };
        ref.addComponentInformation( 0, newComponent );
        expect( ref.getComponentInformation().length ).toEqual( 2 );
    } );

    it( 'replaces component in collection.', function(): void {
        const newComponent: IComponentInformation = {
            name: 'foo',
            id: 'bar',
            settings: null,
        };
        ref.setComponentInformation( 0, newComponent );
        expect( ref.getComponentInformation().length ).toEqual( 1 );
    } );

    it( 'invokes add component callback.', function(): void {
        ref.createNewComponent( 0 );
        expect( spy.addCallback ).toHaveBeenCalled();
    } );

    it( 'invokes edit component callback.', function(): void {
        ref.editComponentSettings( 0 );
        expect( spy.editCallback ).toHaveBeenCalled();
    } );

    it( 'triggers update event on init.', function(): void {
        expect( spy.eventCallback ).toHaveBeenCalled();
    } );
} );
