import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

import actionButton from '../../action-button/src/action-button';
import componentActions from '../../cc-component-actions/src/cc-component-actions';

import $ from 'jquery';
import $t from 'mage/translate';

/**
 * CMS Pages Teaser configurator component.
 * This component is responsible for displaying CMS pages teaser configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccCmsPagesTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    template: `<form class="cc-cms-pages-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-cmspt-tags" class="cs-input__label">CMS Tags:</label>
            <input type="text" name="cfg-cmspt-tags" class="cs-input__input" id="cfg-cmspt-tags" v-model="configuration.tags" @change="onChange">
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-cmspt-desktop-scenario" class="cs-input__label">Desktop Layout:</label>
            <select name="cfg-cmspt-desktop-scenario" class="cs-input__select" id="cfg-cmspt-desktop-scenario" v-model="configuration.currentScenario.desktopLayout" @change="onChange">
                <option value="2">2 teasers in a row</option>
                <option value="4">4 teasers in a row</option>
            </select>
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-cmspt-limit" class="cs-input__label">Limit:</label>
            <select name="cfg-cmspt-limit" class="cs-input__select" id="cfg-cmspt-limit" v-model="configuration.limit" @change="onChange" number>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="1000">All teasers</option>
            </select>
        </div>
        <div class="cs-input cs-input--type-inline">
            <label for="cfg-cmspt-mobile-scenario" class="cs-input__label">Mobile Layout:</label>
            <select name="cfg-cmspt-mobile-scenario" class="cs-input__select" id="cfg-cmspt-mobile-scenario" v-model="configuration.currentScenario.mobileLayout" @change="onChange">
                <option value="2">Display as Carousel</option>
                <option value="3">Display as Grid</option>
            </select>
        </div>

        <button type="submit">Save</button>
    </form>`,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-actions': componentActions,
    },
    data(): any {
        return {
            scenarioOptions: {
                // Desktop layout scenario elements.
                desktopLayout: {
                    '2': {
                        name: '2 in row',
                        iconId: 'dl_2',
                        teasersNum: 2,
                    },
                    '4': {
                        name: '4 in row',
                        iconId: 'dl_4',
                        teasersNum: 4,
                    },
                },
                // Mobile layout scenario elements.
                mobileLayout: {
                    'slider': {
                        name: 'Slider',
                        iconId: 'ml_slider',
                    },
                    'grid': {
                        name: 'Grid',
                        iconId: 'ml_2-2',
                    },
                },
            },
        };
    },
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    tags: '',
                    currentScenario: {
                        desktopLayout: {},
                        mobileLayout: {},
                    },
                    limit: '1000',
                };
            },
        },
    },
    methods: {
        /*
         * Set the proper option after variant click
         */
        toggleOption( optionCategory: string, optionId: string ): void {
            this.configuration.currentScenario[ optionCategory ] = this.scenarioOptions[ optionCategory ][ optionId ];
            this.configuration.currentScenario[ optionCategory ].id = optionId;
        },
    }
}

export default ccCmsPagesTeaserConfigurator;
