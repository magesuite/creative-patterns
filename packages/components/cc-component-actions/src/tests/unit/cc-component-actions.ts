import Vue from '../../../node_modules/vue/dist/vue';

import component from '../../cc-component-actions';

describe( 'Component actions component', function(): void {
    it( 'is a valid Vue component.', function(): void {
        new Vue( {
            template: `<div>
                <cc-component-actions class="test"
                </cc-component-actions>
            </div>`,
            components: {
                'cc-component-actions': component,
            },
        } ).$mount();
    } );
});
