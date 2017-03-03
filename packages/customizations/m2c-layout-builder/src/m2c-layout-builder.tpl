<div class="m2c-layout-builder | {{ class }}">
    <div class="m2c-layout-builder__component m2c-layout-builder__component--static">
        <div class="m2c-layout-builder__component-wrapper">
            <div class="cc-component-placeholder__component cc-component-placeholder__component--decorated cc-component-placeholder__component--header">
                <svg class="cc-component-placeholder__component-icon">
                    <use xlink:href="#icon_component-cc-header"></use>
                </svg>
            </div>
        </div>

        <cc-component-adder class="cc-component-adder cc-component-adder--last">
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button" @click="createNewComponent( 0 )">
                <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                    <use xlink:href="#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>
    </div>

    <template v-for="component in components">
        <div class="m2c-layout-builder__component" id="{{ component.id }}">
            <cc-component-adder class="cc-component-adder cc-component-adder--first">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button" @click="createNewComponent( $index )">
                    <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                        <use xlink:href="#icon_plus"></use>
                    </svg>
                </button>
            </cc-component-adder>

            <div class="m2c-layout-builder__component-actions">
                <cc-component-actions>
                    <template slot="cc-component-actions__buttons">
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up" @click="moveComponentUp( $index )" :class="[ isFirstComponent( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isFirstComponent( $index )">
                            <svg class="action-button__icon action-button__icon--size_100">
                                <use xlink:href="#icon_arrow-up"></use>
                            </svg>
                        </button>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down" @click="moveComponentDown( $index )" :class="[ isLastComponent( $index ) ? 'action-button--look_disabled' : '' ]" :disabled="isLastComponent( $index )">
                            <svg class="action-button__icon action-button__icon--size_100">
                                <use xlink:href="#icon_arrow-down"></use>
                            </svg>
                        </button>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--settings" :class="[ isPossibleToEdit( component.type ) ? 'action-button--look_disabled' : '' ]" :disabled="isPossibleToEdit( component.type )" @click="editComponentSettings( $index )">
                            <svg class="action-button__icon">
                                <use xlink:href="#icon_edit"></use>
                            </svg>
                        </button>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete" @click="deleteComponent( $index )">
                            <svg class="action-button__icon">
                                <use xlink:href="#icon_trash-can"></use>
                            </svg>
                        </button>
                    </template>
                </cc-component-actions>
            </div>
            <div class="m2c-layout-builder__component-wrapper">
                <cc-component-placeholder>
                    <h3 class="cc-component-placeholder__headline" v-text="transformComponentTypeToText( component.type )"></h3>
                    <div class="cc-component-placeholder__component">

                        <component :is="'cc-component-' + component.type + '-preview'" :configuration="component.data" :index="$index" :assets-src="assetsSrc"></component>

                    </div>
                </cc-component-placeholder>
            </div>

            <cc-component-adder class="cc-component-adder cc-component-adder--last">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button" @click="createNewComponent( $index + 1 )">
                    <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                        <use xlink:href="#icon_plus"></use>
                    </svg>
                </button>
            </cc-component-adder>
        </div>
    </template>

    <div class="m2c-layout-builder__component m2c-layout-builder__component--static">
        <cc-component-adder class="cc-component-adder cc-component-adder--first">
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button" @click="createNewComponent( components.length + 1 )">
                <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                    <use xlink:href="#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>

        <div class="m2c-layout-builder__component-wrapper">
            <div class="cc-component-placeholder__component cc-component-placeholder__component--decorated cc-component-placeholder__component--footer">
                <svg class="cc-component-placeholder__component-icon">
                    <use xlink:href="#icon_component-cc-footer"></use>
                </svg>
            </div>
        </div>
    </div>
</div>
