import actionButton from '../../action-button/src/action-button';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
const layoutBuilder: vuejs.ComponentOption = {
    template: `<section class="cc-layout-builder | {{ class }}">
        <cc-component-adder>
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent">
                <svg class="action-button__icon action-button__icon--size_300">
                    <use xlink:href="/images/sprites.svg#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>
        <template v-for="addedComponent in addedComponents">
            <div class="cc-layout-builder__component">
                <cc-component-actions></cc-component-actions>
                <cc-component-placeholder>{{ addedComponent.name }}</cc-component-placeholder>
            </div>
            <cc-component-adder v-if="addedComponents.length">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent">
                    <svg class="action-button__icon action-button__icon--size_300">
                        <use xlink:href="/images/sprites.svg#icon_plus"></use>
                    </svg>
                </button>
            </cc-component-adder>
        </template>
    </section>`,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: String,
            default: '',
            coerce: ( value: String ): String => value.replace( 'cc-layout-builder', '' )
        }
    },
    data: function(): any {
        return {
            addedComponents: []
        };
    },
    methods: {
        createNewComponent: function ( index: number ): void {
            console.log( index );
            this.addedComponents.splice( index, 0, {
                name: Date.now(),
                settings: {}
            });
        }
    }
};

export default layoutBuilder;
