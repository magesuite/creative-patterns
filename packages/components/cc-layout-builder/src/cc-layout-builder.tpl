<section class="cc-layout-builder | {{ class }}">
    <cc-component-adder>
        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent( 0 )">
            <svg class="action-button__icon action-button__icon--size_300">
                <use xlink:href="/images/sprites.svg#icon_plus"></use>
            </svg>
        </button>
    </cc-component-adder>
    <template v-for="addedComponent in addedComponents">
        <div class="cc-layout-builder__component" id="{{ addedComponent.id }}">
            <div class="cc-layout-builder__component-actions">
                <cc-component-actions>
                    <template slot="cc-component-actions__top">
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button" @click="moveComponentUp( $index )">
                            <svg class="action-button__icon action-button__icon--size_100">
                                <use xlink:href="/images/sprites.svg#icon_arrow-up"></use>
                            </svg>
                        </button>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button" @click="moveComponentDown( $index )">
                            <svg class="action-button__icon action-button__icon--size_100">
                                <use xlink:href="/images/sprites.svg#icon_arrow-down"></use>
                            </svg>
                        </button>
                    </template>
                    <template slot="cc-component-actions__bottom">
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button" @click="editComponentSettings( addedComponent.id )">
                            <svg class="action-button__icon">
                                <use xlink:href="/images/sprites.svg#icon_settings"></use>
                            </svg>
                        </button>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button" @click="deleteComponent( addedComponent.id )">
                            <svg class="action-button__icon">
                                <use xlink:href="/images/sprites.svg#icon_trash-can"></use>
                            </svg>
                        </button>
                    </template>
                </cc-component-actions>
            </div>
            <div class="cc-layout-builder__component-wrapper">
                <cc-component-placeholder>{{ addedComponent.id }}</cc-component-placeholder>
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
</section>
