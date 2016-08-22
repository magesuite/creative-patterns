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
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent( 0 )">
                <svg class="action-button__icon action-button__icon--size_300">
                    <use xlink:href="/images/sprites.svg#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>
        <template v-for="addedComponent in addedComponents">
            <div class="cc-layout-builder__component">
                <div class="cc-layout-builder__component-actions">
                    <cc-component-actions>
                        <template slot="cc-component-actions__top">
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button">
                                <svg class="action-button__icon action-button__icon--size_100">
                                    <use xlink:href="/images/sprites.svg#icon_arrow-up"></use>
                                </svg>
                            </button>
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button">
                                <svg class="action-button__icon action-button__icon--size_100">
                                    <use xlink:href="/images/sprites.svg#icon_arrow-down"></use>
                                </svg>
                            </button>
                        </template>
                        <template slot="cc-component-actions__bottom">
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button">
                                <svg class="action-button__icon">
                                    <use xlink:href="/images/sprites.svg#icon_settings"></use>
                                </svg>
                            </button>
                            <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button">
                                <svg class="action-button__icon">
                                    <use xlink:href="/images/sprites.svg#icon_trash-can"></use>
                                </svg>
                            </button>
                        </template>
                    </cc-component-actions>
                </div>
                <div class="cc-layout-builder__component-wrapper">
                    <cc-component-placeholder>{{ addedComponent.name }}</cc-component-placeholder>
                </div>
            </div>
            <cc-component-adder v-if="addedComponents.length">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent( $index + 1 )">
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
            this.addedComponents.splice( index, 0, {
                name: Date.now(),
                settings: {}
            } );
        }
    }
};

export default layoutBuilder;
