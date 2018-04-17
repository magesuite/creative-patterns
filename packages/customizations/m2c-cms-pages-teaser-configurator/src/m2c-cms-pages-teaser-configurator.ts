import $ from 'jquery';
import $t from 'mage/translate';

import ccCategoryPicker from '../../../components/cc-category-picker/src/cc-category-picker';
import ccCmsPagesTeaserConfigurator from '../../../components/cc-cms-pages-teaser-configurator/src/cc-cms-pages-teaser-configurator';

/**
 * M2C CMS Pages teaser component for admin panel.
 * This component is responsible for managing image teasers including image upload and widget chooser
 */
const m2cCmsPagesTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccCmsPagesTeaserConfigurator,
    ],
    template: `<div class="m2c-cms-pages-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }}>
        <section class="m2c-cms-pages-teaser-configurator__section">
            <h3 class="m2c-cms-pages-teaser-configurator__subtitle">${ $t('Data source') }</h3>
            <div class="m2c-cms-pages-teaser-configurator__scenario-options m2c-cms-pages-teaser-configurator__scenario-options--inputs">
                <div class="m2-input m2-input--type-inline | m2c-cms-pages-teaser-configurator__section-option">
                    <label class="m2-input__label | m2c-cms-pages-teaser-configurator__section-option-label">${$t( 'CMS Tags' )}:</label>
                    <input type="hidden" v-model="configuration.tags" @change="onChange" id="cp-cms-pages-teaser">
                </div>
                
                <div class="m2-input m2-input--type-inline | m2c-cms-pages-teaser-configurator__section-option">
                    <label for="cfg-cmspt-limit" class="m2-input__label | m2c-cms-pages-teaser-configurator__section-option-label">${$t( 'Teasers limit' )}:</label>
                    <select name="cfg-cmspt-limit" class="m2-input__select" id="cfg-cmspt-limit" v-model="configuration.limit" @change="onChange">
                        <option value="4">${$t( '4 teasers' )}</option>
                        <option value="8">${$t( '8 teasers' )}</option>
                        <option value="16">${$t( '16 teasers' )}</option>
                        <option value="1000">${$t( 'All available teasers (no limit)' )}</option>
                    </select>
                </div>
        </section>

        <section class="m2c-cms-pages-teaser-configurator__section">
            <h3 class="m2c-cms-pages-teaser-configurator__subtitle">Desktop Layout</h3>
            <div class="m2c-cms-pages-teaser-configurator__scenario-options">
                <div class="m2c-cms-pages-teaser-configurator__scenario-options-list">
                    <li
                        :class="{
                            'm2c-cms-pages-teaser-configurator__option--selected': configuration.currentScenario.desktopLayout.id == optionId,
                        }"
                        class="m2c-cms-pages-teaser-configurator__option"
                        v-for="(optionId, option) in scenarioOptions.desktopLayout"
                        @click="toggleOption('desktopLayout', optionId)">
                        <div class="m2c-cms-pages-teaser-configurator__option-wrapper">
                            <svg class="m2c-cms-pages-teaser-configurator__option-icon">
                                <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                            </svg>
                        </div>
                        <p class="m2c-cms-pages-teaser-configurator__option-name">
                            ${$t( '{{ option.name }}' )}
                        </p>
                    </li>
                </div>
            </div>
        </section>
        
        <section class="m2c-cms-pages-teaser-configurator__section">
            <h3 class="m2c-cms-pages-teaser-configurator__subtitle">Mobile Layout</h3>
            <div class="m2c-cms-pages-teaser-configurator__scenario-options">
                <ul class="m2c-cms-pages-teaser-configurator__scenario-options-list">
                    <li
                        :class="{
                            'm2c-cms-pages-teaser-configurator__option--selected': configuration.currentScenario.mobileLayout.id == optionId,
                        }"
                        class="m2c-cms-pages-teaser-configurator__option"
                        v-for="(optionId, option) in scenarioOptions.mobileLayout"
                        @click="toggleOption('mobileLayout', optionId)">
                        <div class="m2c-cms-pages-teaser-configurator__option-wrapper">
                            <svg class="m2c-cms-pages-teaser-configurator__option-icon">
                                <use v-bind="{ 'xlink:href': '#' + option.iconId }"></use>
                            </svg>
                        </div>
                        <p class="m2c-cms-pages-teaser-configurator__option-name">
                            ${$t( '{{ option.name }}' )}
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    </div>`,
    props: {
        /**
         * Image teaser configuration
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    tags: '',
                    limit: '1000',
                    currentScenario: {
                        desktopLayout: {},
                        mobileLayout: {},
                    },
                };
            },
        },
        /* Obtain stringified JSON with CMS tags data */
        cmsTags: {
            type: String,
            default: '',
        },
    },
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            this.onSave();
        },
    },
    ready(): void {
        if (this.cmsTags !== '') {
            this.categoryPicker = new ccCategoryPicker($('#cp-cms-pages-teaser'), JSON.parse(this.cmsTags), {
                multiple: true,
                minSearchQueryLength: 1,
                placeholders: {
                    select: $t( 'Select tags...' ),
                    doneButton: $t( 'Done' ),
                    search: $t( 'Type tag-name to search...' ),
                    empty: $t( 'There are no tags matching your selection' ),
                    removeCrumb: $t( 'Remove this tag' ),
                },
                classes: {
                    baseMix: 'cc-category-picker--min',
                },
            });
        }
    }
};

export default m2cCmsPagesTeaserConfigurator;
