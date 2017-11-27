<div class="cc-layout-builder | {{ class }}">
    <div class="cc-layout-builder__filters">
        <template v-for="(filterKey, filter) in filters">
            <div class="cc-layout-builder__filter">
                <div class="cc-layout-builder__filter-content">
                    <svg class="cc-layout-builder__filter-icon">
                        <use xlink:href="{{ filter.icon }}"></use>
                    </svg>
                    <span class="cc-layout-builder__filter-title">
                        {{ filter.title}}:
                    </span>
                    <template v-for="(optionKey, option) in filter.options">
                        <div class="cc-layout-builder__filter-control">
                            <label :class="[ option.value ? 'cs-input__checkbox-label m2-input__checkbox-label--checked' : 'cs-input__checkbox-label' ]">
                                <input type="checkbox" v-model="option.value" class="cs-input__checkbox" @change="saveFiltersState()">
                                {{ option.label }}
                            </label>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>

    <cc-component-adder>
        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent( 0 )">
            <svg class="action-button__icon action-button__icon--size_300">
                <use xlink:href="#icon_plus"></use>
            </svg>
        </button>
    </cc-component-adder>
    <template v-for="component in components">
        <div class="cc-layout-builder__component">
            <div class="cc-layout-builder__component-actions">
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
                                <use xlink:href="#icon_settings"></use>
                            </svg>
                        </button>
                        <div class="cc-component-display-controller" v-if="isPossibleToControlDisplay( component.type )">
                            <svg class="cc-component-display-controller__icon">
                                <use xlink:href="#icon_eye"></use>
                            </svg>
                            <div class="cc-component-display-controller__control">
                                <label :class="[ component.data.componentVisibility.mobile ? 'cs-input__checkbox-label cs-input__checkbox-label--checked' : 'cs-input__checkbox-label' ]">
                                    <input type="checkbox" v-model="component.data.componentVisibility.mobile" class="cs-input__checkbox" @change="updateLayout()">
                                    Mobile
                                </label>
                            </div>
                            <div class="cc-component-display-controller__control">
                                <label :class="[ component.data.componentVisibility.desktop ? 'cs-input__checkbox-label m2-input__checkbox-label--checked' : 'cs-input__checkbox-label' ]">
                                    <input type="checkbox" v-model="component.data.componentVisibility.desktop" class="cs-input__checkbox" @change="updateLayout()">
                                    Desktop
                                </label>
                            </div>
                        </div>
                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete" @click="deleteComponent( $index )">
                            <svg class="action-button__icon">
                                <use xlink:href="#icon_trash-can"></use>
                            </svg>
                        </button>
                    </template>
                </cc-component-actions>
            </div>
            <div class="cc-layout-builder__component-wrapper">
                <cc-component-placeholder>
                    <h3 class="cc-component-placeholder__headline" v-text="transformComponentTypeToText( component.type )"></h3>
                    <div class="cc-component-placeholder__component">
                        <component :is="'cc-component-' + component.type + '-preview'" :configuration="component.data" :index="$index"></component>

                    </div>
                </cc-component-placeholder>
            </div>
        </div>
        <cc-component-adder v-if="components.length">
            <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only" @click="createNewComponent( $index + 1 )">
                <svg class="action-button__icon action-button__icon--size_300">
                    <use xlink:href="#icon_plus"></use>
                </svg>
            </button>
        </cc-component-adder>
    </template>
</div>
