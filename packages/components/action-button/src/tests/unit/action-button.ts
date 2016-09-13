import Vue from '../../../node_modules/vue/dist/vue';

import component from '../../action-button';

describe( 'Action button component', function(): void {
    let vm: any;
    let spy: any;
    let ref: any;
    beforeEach( function(): void {
        // Create a spy that we will use to check if callbacks was called.
        spy = {
            eventCallback: (): undefined => undefined,
        };
        spyOn( spy, 'eventCallback' );

        // Prepare Vue instance with a template.
        vm = new Vue( {
            template: `<div>
                <action-button v-ref:component>
                </action-button>
            </div>`,
            components: {
                'action-button': component,
            },
        } ).$mount();

        // Get reference to component we want to test.
        ref = vm.$refs.component;
    } );

    it( 'triggers click event.', function(): void {
        vm.$on( 'action-button__click', spy.eventCallback );
        ref._onClick();

        expect( spy.eventCallback ).toHaveBeenCalled();
    } );
} );
