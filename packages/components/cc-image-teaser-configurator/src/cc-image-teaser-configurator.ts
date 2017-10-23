import ccComponentConfigurator from '../../cc-component-configurator/src/cc-component-configurator';

import actionButton from '../../action-button/src/action-button';

import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

interface TeaserItem {
    image: string;
    decodedImage: string;
    headline: string;
    paragraph: string;
    ctaLabel: string;
    ctaTarget: string;
};

// Pattern for teaser Item
const teaserItemPrototype: any = {
    image: '',
    decodedImage: '',
    displayVariant: '1',
    colorScheme: 'light',
    headline: '',
    paragraph: '',
    ctaLabel: 'More',
    href: '',
    sizeInfo: '',
    aspectRatio: '',
};

/**
 * Image teaser configurator component.
 * This component is responsible for displaying image teaser's configuration form
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccImageTeaserConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccComponentConfigurator,
    ],
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
    },
    template: `<form class="cc-image-teaser-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <section class="cc-image-teaser-configurator__section">
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-it-width" class="cs-input__label">Teaser width:</label>
                <select name="cfg-it-width-select" class="cs-input__select" id="cfg-it-width" v-model="configuration.teaserWidth" @change="onChange">
                    <option value="full-width" selected>Full browser width</option>
                    <option value="limited-width">Breaking point width (1280px)</option>
                </select>
            </div>
            <div class="cs-input cs-input--type-inline">
                <label for="cfg-it-images-per-slide" class="cs-input__label">Images per slide:</label>
                <select name="cfg-it-images-per-slide" class="cs-input__select" id="cfg-it-images-per-slide" v-model="configuration.itemsPerSlide" @change="onChange">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
        </section>

        <section class="cc-image-teaser-configurator__section">
            <div class="cc-image-teaser-configurator__teaser">
                <template v-for="item in configuration.items">
                    <div class="cc-image-teaser-configurator__teaser-item" id="cc-image-teaser-item-{{ $index }}">
                        <div class="cc-image-teaser-configurator__toolbar">
                            <span class="cc-image-teaser-configurator__teaser-item-title">Banner {{ $index+1 }}/{{ configuration.items.length }}</span>
                            <a href="#" class="cc-image-teaser-configurator__upload-link" href="#">Upload image</a>
                        </div>
                        <div class="cc-image-teaser-configurator__image-holder-outer">
                            <div class="cc-image-teaser-configurator__image-holder-inner">
                                <input type="hidden" value="" class="cc-image-teaser-configurator__image-url" v-model="configuration.items[$index].image" @change="onChange">
                            </div>
                        </div>
                        <div class="cs-input cs-input--type-required">
                            <label for="cfg-it-teaser{{ $index+1 }}-headline" class="cs-input__label">Headline:</label>
                            <input type="text" v-model="configuration.items[$index].headline" id="cfg-it-teaser{{ $index+1 }}-headline" class="cs-input__input" @change="onChange">
                        </div>
                        <div class="cs-input cs-input--type-required">
                            <label for="cfg-it-teaser{{ $index+1 }}-paragraph" class="cs-input__label">Paragraph:</label>
                            <textarea type="text" v-model="configuration.items[$index].paragraph" id="cfg-it-teaser{{ $index+1 }}-paragraph" class="cs-input__textarea cs-input__textarea--look-thin" @change="onChange" placeholder="(max 200 characters)" maxlength="200"></textarea>
                        </div>
                        <div class="cs-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-cta-label" class="cs-input__label">CTA label:</label>
                            <input type="text" v-model="configuration.items[$index].ctaLabel" id="cfg-it-teaser{{ $index+1 }}-cta-label" class="cs-input__input" @change="onChange">
                        </div>
                        <div class="cs-input">
                            <label for="cfg-it-teaser{{ $index+1 }}-cta-target" class="cs-input__label">CTA target link:</label>
                            <input type="text" v-model="item.ctaTarget" id="cfg-it-teaser{{ $index+1 }}-cta-target" class="cs-input__input" @change="onChange">
                        </div>
                    </div>
                </template>
            </div>
        </section>

        <section class="cc-image-teaser-configurator__section cc-image-teaser-configurator__section--type-actions">
            <button type="submit">Save</button>
        </section>
    </form>`,
    data(): any {
        return {
            scenarioOptions: {
                // Teaser width scenario elements.
                teaserWidth: {
                    'c': {
                        name: 'Container width',
                        iconId: 'tw_content-width',
                        disabled: false,
                        teasersLimit: true,
                    },
                    'w': {
                        name: 'Window width',
                        iconId: 'tw_window-width',
                        disabled: false,
                        teasersLimit: true,
                    },
                    'c-s': {
                        name: 'Content width Slider',
                        iconId: 'tw_content-slider',
                        disabled: false,
                        teasersLimit: false,
                    },
                    'w-s': {
                        name: 'Window width Slider',
                        iconId: 'tw_window-slider',
                        disabled: false,
                        teasersLimit: false,
                    },
                },
                // Desktop layout scenario elements.
                desktopLayout: {
                    '1': {
                        name: '1 in row',
                        iconId: 'dl_1',
                        disabled: false,
                        teasersNum: 1,
                    },
                    '2': {
                        name: '2 in row',
                        iconId: 'dl_2',
                        disabled: false,
                        teasersNum: 2,
                    },
                    '3': {
                        name: '3 in row',
                        iconId: 'dl_3',
                        disabled: false,
                        teasersNum: 3,
                    },
                    '4': {
                        name: '4 in row',
                        iconId: 'dl_4',
                        disabled: false,
                        teasersNum: 4,
                    },
                    '6': {
                        name: '6 in row',
                        iconId: 'dl_6',
                        disabled: false,
                        teasersNum: 6,
                    },
                    '8': {
                        name: '8 in row',
                        iconId: 'dl_8',
                        disabled: false,
                        teasersNum: 8,
                    },
                },
                // Text positioning scenario elements.
                textPositioning: {
                    'over': {
                        name: 'Text over image',
                        iconId: 'tl_over',
                        disabled: false,
                        textPosition: true,
                    },
                    'under': {
                        name: 'Text below image',
                        iconId: 'tl_under',
                        disabled: false,
                        textPosition: false,
                    },
                },

                // Mobile layout scenario elements.
                mobileLayout: {
                    'large': {
                        name: 'Large teaser',
                        iconId: 'ml_col',
                        disabled: false,
                    },
                    'slider': {
                        name: 'Slider',
                        iconId: 'ml_slider',
                        disabled: false,
                    },
                    'row': {
                        name: 'Teasers in row',
                        iconId: 'ml_2-2',
                        disabled: false,
                    },
                    'col': {
                        name: 'Teasers in column',
                        iconId: 'ml_col',
                        disabled: false,
                    },
                    '1-2': {
                        name: 'Big, two small',
                        iconId: 'ml_1-2',
                        disabled: false,
                    },
                    '2-2': {
                        name: '2 in row, 2 rows',
                        iconId: 'ml_2-2',
                        disabled: false,
                    },
                    '1-2-1': {
                        name: 'Big, two small, big',
                        iconId: 'ml_1-2',
                        disabled: false,
                    },
                    '2-2-2': {
                        name: '2 in row, 3 rows',
                        iconId: 'ml_2-2',
                        disabled: false,
                    },
                },
            },
            availableScenarios: [
                ['c', '1', 'over', ['large']],

                ['c', '2', 'over', ['col', 'row', 'slider']],
                ['c', '2', 'under', ['col']],

                ['c', '3', 'over', ['col', 'slider', '1-2']],
                ['c', '3', 'under', ['col']],

                ['c', '4', 'over', ['2-2', 'slider', '1-2-1']],
                ['c', '4', 'under', ['col']],

                ['c', '6', 'over', ['2-2-2', 'slider']],
                ['c', '6', 'under', ['2-2-2', 'slider']],
                ['c', '8', 'under', ['slider']],

                ['w', '1', 'over', ['large']],

                ['w', '2', 'over', ['col', 'row', 'slider']],
                ['w', '2', 'under', ['col']],

                ['w', '3', 'over', ['col', 'slider', '1-2']],
                ['w', '3', 'under', ['col']],

                ['w', '4', 'over', ['2-2', 'slider', '1-2-1']],
                ['w', '4', 'under', ['col']],

                ['w-s', '2', 'over', ['slider']],
                ['w-s', '2', 'under', ['slider']],

                ['w-s', '3', 'over', ['slider']],
                ['w-s', '3', 'under', ['slider']],

                ['w-s', '4', 'over', ['slider']],
                ['w-s', '4', 'under', ['slider']],

                ['c-s', '1', 'over', ['slider']],

                ['c-s', '2', 'over', ['slider']],
                ['c-s', '2', 'under', ['slider']],

                ['c-s', '3', 'over', ['slider']],
                ['c-s', '3', 'under', ['slider']],

                ['c-s', '4', 'over', ['slider']],
                ['c-s', '4', 'under', ['slider']],

                ['c-s', '6', 'under', ['slider']],

                ['c-s', '8', 'under', ['slider']],
            ],
        };
    },
    props: {
        /**
         * Image teaser configuration
         */
        configuration: {
            type: Object,
            default(): Object {
                return {
                    items: [ JSON.parse( JSON.stringify( teaserItemPrototype ) ) ],
                    ignoredItems: [],
                    currentScenario: {
                        teaserWidth: {},
                        desktopLayout: {},
                        textPositioning: {},
                        mobileLayout: {},
                    },
                };
            },
        },
    },
    created(): void {
        if ( this.configuration.ignoredItems === undefined ) {
            this.configuration.ignoredItems = [];
        }
    },
    methods: {
        _collectPossibleOptions( filteredScenarios: Array<Array<any>> ): any {
            const teaserWidthIndex: number = 0;
            const desktopLayoutIndex: number = 1;
            const textPositionIndex: number = 2;
            const mobileLayoutsIndex: number = 3;
            let possibleOptions: any = {
                teaserWidth: {},
                desktopLayout: {},
                textPositioning: {},
                mobileLayout: {},
            };

            filteredScenarios.forEach( ( filteredScenario: Array<any> ) => {
                possibleOptions.teaserWidth[ filteredScenario[ teaserWidthIndex ] ] = true;
                possibleOptions.desktopLayout[ filteredScenario[ desktopLayoutIndex ] ] = true;
                possibleOptions.textPositioning[ filteredScenario[ textPositionIndex ] ] = true;
                filteredScenario[ mobileLayoutsIndex ].forEach( ( mobileLayout: string ) => {
                    possibleOptions.mobileLayout[ mobileLayout ] = true;
                } );
            } );

            Object.keys( possibleOptions ).forEach( ( scenarioElement: string ): void => {
                possibleOptions[ scenarioElement ] = Object.keys( possibleOptions[ scenarioElement ] );
            });

            return possibleOptions;
        },

        _findPossibleOptions( teaserWidth: string, desktopLayout: string, textPosition: string, mobileLayout: string ): void {
            const teaserWidthIndex: number = 0;
            const desktopLayoutIndex: number = 1;
            const textPositionIndex: number = 2;
            const mobileLayoutsIndex: number = 3;
            // Make a copy of available scenarios to prevent reference copying.
            let filteredScenarios: Array<Array<string>> = JSON.parse( JSON.stringify( this.availableScenarios ) );

            if ( teaserWidth ) {
                filteredScenarios = filteredScenarios.filter( ( availableScenario: any ) => {
                    return availableScenario[ teaserWidthIndex ] === teaserWidth;
                } );
            }

            if ( desktopLayout ) {
                filteredScenarios = filteredScenarios.filter( ( availableScenario: any ) => {
                    return availableScenario[ desktopLayoutIndex ] === desktopLayout;
                } );
            }

            if ( textPosition ) {
                filteredScenarios = filteredScenarios.filter( ( availableScenario: any ) => {
                    return !textPosition || availableScenario[ textPositionIndex ] === textPosition;
                } );
            }

            if ( mobileLayout ) {
                filteredScenarios = filteredScenarios.filter( ( availableScenario: any ) => {
                    return availableScenario[ mobileLayoutsIndex ].indexOf( mobileLayout ) !== -1;
                } );
                filteredScenarios = filteredScenarios.map( ( availableScenario: any ) => {
                    availableScenario[ mobileLayoutsIndex ] = [ mobileLayout ];
                    return availableScenario;
                } );
            }

            return this._collectPossibleOptions( filteredScenarios );
        },

        toggleOption( optionCategory: string, optionId: string ): void {
            if ( this.configuration.currentScenario[ optionCategory ].id ) {
                this.configuration.currentScenario[ optionCategory ] = {};
            } else {
                this.configuration.currentScenario[ optionCategory ] = this.scenarioOptions[ optionCategory ][ optionId ];
                this.configuration.currentScenario[ optionCategory ].id = optionId;
            }

            this.togglePossibleOptions();
            this.adjustVisibleItems();
        },

        adjustVisibleItems(): void {
            const items: Array<TeaserItem> = this.configuration.items;
            const itemsNumber: number = this.configuration.currentScenario.desktopLayout.teasersNum;
            const itemsLimit: boolean = this.configuration.currentScenario.teaserWidth.teasersLimit;

            if ( itemsLimit && items.length > itemsNumber ) {
                const removedItems: Array<any> = items.splice( itemsNumber, items.length - itemsNumber );
                this.configuration.ignoredItems = removedItems.concat( this.configuration.ignoredItems );
            } else if ( items.length < itemsNumber ) {
                items.concat( this.configuration.ignoredItems.splice( 0, itemsNumber - items.length ) );

                for ( let addedItems: number = 0; addedItems < itemsNumber - items.length; addedItems++ ) {
                    items.push( JSON.parse( JSON.stringify( teaserItemPrototype ) ) );
                }
            }
        },

        togglePossibleOptions(): void {
            const currentScenario: any = this.configuration.currentScenario;
            const possibleOptions: any = this._findPossibleOptions(
                currentScenario.teaserWidth.id,
                currentScenario.desktopLayout.id,
                currentScenario.textPositioning.id,
                currentScenario.mobileLayout.id,
            );

            Object.keys( this.scenarioOptions ).forEach( ( optionCategory: string ) => {
                Object.keys( this.scenarioOptions[ optionCategory ] ).forEach( ( scenarioOptionId: string ) => {
                    this.scenarioOptions[ optionCategory ][ scenarioOptionId ].disabled = possibleOptions[ optionCategory ].indexOf( scenarioOptionId ) === -1;
                } );
            } );
        },

        canAddTeaser(): boolean {
            const items: Array<TeaserItem> = this.configuration.items;
            const itemsLimit: number = this.configuration.currentScenario.teaserWidth.teasersLimit;

            return ( !itemsLimit || items.length < itemsLimit );
        },
    },
};

export default ccImageTeaserConfigurator;
