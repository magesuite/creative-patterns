<div class="m2c-layout-builder | {{ class }}">
    <div class="m2c-layout-builder__filters" v-if="filters">
        <template v-for="(filterKey, filter) in filters">
            <div class="m2c-layout-builder__filter">
                <div class="m2c-layout-builder__filter-content">
                    <svg class="m2c-layout-builder__filter-icon">
                        <use xlink:href="{{ filter.icon }}"></use>
                    </svg>
                    <span class="m2c-layout-builder__filter-title">
                        {{ getTranslatedText( filter.title ) }}:
                    </span>
                    <template v-for="(optionKey, option) in filter.options">
                        <div class="m2c-layout-builder__filter-control">
                            <label :class="[ option.value ? 'm2-input__checkbox-label m2-input__checkbox-label--checked' : 'm2-input__checkbox-label' ]">
                                <input type="checkbox" v-model="option.value" class="m2-input__checkbox" @change="saveFiltersState()">
                                {{ getTranslatedText( option.label ) }}
                            </label>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>

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
        <div v-bind:class="{ 'm2c-layout-builder__component': true, 'm2c-layout-builder__component--special': getIsSpecialComponent( component.type ), 'm2c-layout-builder__component--invisible': getIsComponentHiddenFE( component.data ), 'm2c-layout-builder__component--filtered-out': !getIsComponentVisibleDashboard( component.data ) }" id="{{ component.id }}">
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
                        <div class="cc-component-display-controller" v-if="isPossibleToControlDisplay( component.type )">
                            <svg class="cc-component-display-controller__icon">
                                <use xlink:href="#icon_eye"></use>
                            </svg>
                            <div class="cc-component-display-controller__control">
                                <label :class="[ component.data.componentVisibility.mobile ? 'm2-input__checkbox-label m2-input__checkbox-label--checked' : 'm2-input__checkbox-label' ]">
                                    <input type="checkbox" v-model="component.data.componentVisibility.mobile" class="m2-input__checkbox" @change="updateLayout()">
                                    {{ getTranslatedText('Mobile') }}
                                </label>
                            </div>
                            <div class="cc-component-display-controller__control">
                                <label :class="[ component.data.componentVisibility.desktop ? 'm2-input__checkbox-label m2-input__checkbox-label--checked' : 'm2-input__checkbox-label' ]">
                                    <input type="checkbox" v-model="component.data.componentVisibility.desktop" class="m2-input__checkbox" @change="updateLayout()">
                                    {{ getTranslatedText('Desktop') }}
                                </label>
                            </div>
                        </div>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete" :class="[ isPossibleToDelete( component.type ) ? 'action-button--look_disabled' : '' ]" :disabled="isPossibleToDelete( component.type )" @click="deleteComponent( $index )">
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
