import $ from 'jquery';
import $t from 'mage/translate';
import confirm from 'Magento_Ui/js/modal/confirm';

import ccProductFinderConfigurator from '../../../components/cc-product-finder-configurator/src/cc-product-finder-configurator';

const IStep: any = {
    "id": "",
    "title": "",
    "description": "",
    "options": [
        {
            "label": "",
            "image": "",
            "attributes": [
                {
                    "code": "",
                    "values": ["",""]
                },
            ],
            "category_id": "",
            "next_step": ""
        },
        {
            "label": "",
            "image": "",
            "attributes": [
                {
                    "code": "",
                    "range": ["",""]
                },
            ],
            "category_id": "",
            "next_step": ""
        },
    ],
};

/**
 * Product Finder configurator component.
 * This component is responsible for configuring Product Finder component to be displayed as CC component. It finds products based on couple of customer answers
 * @type {vuejs.ComponentOption} Vue component object.
 */
const m2cProductFinderConfigurator: vuejs.ComponentOption = {
    mixins: [
        ccProductFinderConfigurator,
    ],
    template: `<div class="m2c-product-finder-configurator {{ classes }} | {{ mix }}" {{ attributes }}>
        <section class="m2c-product-finder-configurator__section m2c-product-finder-configurator__section--styled">
            <h3 class="m2c-product-finder-configurator__subtitle">{{ 'Default settings' | translate }}:</h3>
            <div class="m2c-product-finder-configurator__global-options">
                <div class="m2-input | m2c-product-finder-configurator__global-option">
                    <label for="cfg-pf-layout-m" class="m2-input__label | m2c-product-finder-configurator__section-option-label">{{ 'Mobile layout' | translate }}:</label>
                    <select name="cfg-pf-layout-m" class="m2-input__select" id="cfg-pf-layout-m" v-model="configuration.optionsPerRow.mobile" @change="onChange">
                        <option value="1">{{ '1 option per row' | translate }}</option>
                        <option value="2">{{ '2 options per row' | translate }}</option>
                        <option value="3">{{ '3 options per row' | translate }}</option>
                    </select>
                </div>
                <div class="m2-input | m2c-product-finder-configurator__global-option">
                    <label for="cfg-pf-layout-t" class="m2-input__label | m2c-product-finder-configurator__section-option-label">{{ 'Tablet layout' | translate }}:</label>
                    <select name="cfg-pf-layout-t" class="m2-input__select" id="cfg-pf-layout-t" v-model="configuration.optionsPerRow.tablet" @change="onChange">
                        <option value="2">{{ '2 options per row' | translate }}</option>
                        <option value="3">{{ '3 options per row' | translate }}</option>
                        <option value="4">{{ '4 options per row' | translate }}</option>
                    </select>
                </div>
                <div class="m2-input | m2c-product-finder-configurator__global-option">
                    <label for="cfg-pf-layout-d" class="m2-input__label | m2c-product-finder-configurator__section-option-label">{{ 'Desktop layout' | translate }}:</label>
                    <select name="cfg-pf-layout-d" class="m2-input__select" id="cfg-pf-layout-d" v-model="configuration.optionsPerRow.desktop" @change="onChange">
                        <option value="3">{{ '3 options per row' | translate }}</option>
                        <option value="4">{{ '4 options per row' | translate }}</option>
                        <option value="5">{{ '5 options per row' | translate }}</option>
                        <option value="6">{{ '6 options per row' | translate }}</option>
                    </select>
                </div>
            </div>
        </section>

        <section class="m2c-product-finder-configurator__section">
            <cc-component-adder class="cc-component-adder cc-component-adder--static" v-show="!configuration.steps.length">
                <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | cc-component-adder__button | m2c-product-finder-configurator__item-action-button" @click="createStep(0)">
                    <svg class="action-button__icon action-button__icon--size_100 | cc-component-adder__button-icon">
                        <use v-bind="{ 'xlink:href': '#icon_plus' }"></use>
                    </svg>
                </button>
            </cc-component-adder>

            <template v-for="step in configuration.steps">
                <div class="m2c-product-finder-configurator__step" id="m2c-product-finder-step-{{ $index }}">
                    <cc-component-adder class="cc-component-adder cc-component-adder--first">
                        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | m2c-product-finder-configurator__item-action-button" @click="createStep($index)">
                            <svg class="action-button__icon action-button__icon--size_300">
                                <use xlink:href="#icon_plus"></use>
                            </svg>
                        </button>
                    </cc-component-adder>

                    <div class="m2c-product-finder-configurator__step-content">
                        <div :class="[ componentConfigurationErrors[$index] ? 'm2c-product-finder-configurator__preview m2c-product-finder-configurator__preview--error' : 'm2c-product-finder-configurator__preview' ]">
                            <div class="m2c-product-finder-configurator__error" v-if="componentConfigurationErrors[$index]">
                                {{ componentConfigurationErrors[$index] }}
                            </div>

                            <template v-if="!componentConfigurationErrors[$index]">
                                <cc-product-finder-preview :configuration="configuration" :step-index="$index" :is-configurator-preview="true" :image-endpoint="imageEndpoint"></cc-product-finder-preview>
                            </template>

                            <div class="m2c-product-finder-configurator__step-actions">
                                <cc-component-actions>
                                    <template slot="cc-component-actions__buttons">
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--up | m2c-product-finder-configurator__item-action-button" @click="moveStepUp($index)" :class="[ isFirstStep($index) ? 'action-button--look_disabled' : '' ]" :disabled="isFirstStep($index)">
                                            <svg class="action-button__icon action-button__icon--size_100">
                                                <use xlink:href="#icon_arrow-up"></use>
                                            </svg>
                                        </button>
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--down | m2c-product-finder-configurator__item-action-button" @click="moveStepDown( $index )" :class="[ isLastStep($index) ? 'action-button--look_disabled' : '' ]" :disabled="isLastStep($index)">
                                            <svg class="action-button__icon action-button__icon--size_100">
                                                <use xlink:href="#icon_arrow-down"></use>
                                            </svg>
                                        </button>
                                        <button is="action-button" class="action-button action-button--look_default action-button--type_icon-only | cc-component-actions__button cc-component-actions__button--delete | m2c-product-finder-configurator__item-action-button" @click="deleteStep($index)">
                                            <svg class="action-button__icon">
                                                <use xlink:href="#icon_trash-can"></use>
                                            </svg>
                                        </button>
                                    </template>
                                </cc-component-actions>
                            </div>
                        </div>

                        <div class="m2-input | m2c-product-finder-configurator__source">
                            <div class="buttons-set">
                                <button type="button" class="scalable action-add-image plugin" @click="getImageUploader($index)">{{ 'Insert Image' | translate }}...</button>
                            </div>
                            <textarea class="m2-input__textarea | m2c-product-finder-configurator__editor" id="cfg-pf-step{{ $index }}-sourcefield" @keydown="saveCaretPosition($event)" @click="saveCaretPosition($event)" v-model="step | prettify $index"></textarea>
                            <input type="hidden" class="m2c-product-finder-configurator__imgholder" data-step-index="{{$index}}" id="pf-imgholder-{{$index}}" />
                        </div>
                    </div>

                    <cc-component-adder class="cc-component-adder cc-component-adder--last" v-if="configuration.steps.length">
                        <button is="action-button" class="action-button action-button--look_important action-button--type_icon-only | m2c-product-finder-configurator__item-action-button" @click="createStep( $index + 1 )">
                            <svg class="action-button__icon action-button__icon--size_300">
                                <use xlink:href="#icon_plus"></use>
                            </svg>
                        </button>
                    </cc-component-adder>
                </div>
            </template>
        </section>
    </div>`,
    events: {
        /**
         * Listen on save event from Content Configurator component.
         */
        'cc-component-configurator__save'(): void {
            this.configuration.isError = false;

            for (let entry of this.componentConfigurationErrors) {
                if (entry.length) {
                    this.configuration.isError = true;
                }
            }

            this.onSave();
        },
    },
    props: {
        configuration: {
            type: Object,
            default(): Object {
                return {
                    optionsPerRow: {
                        mobile: 1,
                        tablet: 3,
                        desktop: 6,
                    },
                    steps: [ JSON.parse(JSON.stringify(IStep)) ],
                    isError: false,
                };
            },
        },
        /* Obtain base-url for the image uploader */
        uploaderBaseUrl: {
            type: String,
            default: '',
        },
        /* Obtain image endpoint to place permanent url for uploaded images */
        imageEndpoint: {
            type: String,
            default: '',
        },
    },
    data(): Object {
        return {
            componentConfigurationErrors: this.prepareComponentErrorsArray(),
            caretPosition: 1,
        };
    },
    filters: {
        /** 
          * Two-way filter for step content displaing in textarea and keeping in configuration.
         */
        prettify: {
            /** Displays stringified JSON in textarea if not step is not stringified yet. 
             *  If step is already stringified because it couldn't be saved, just return back what came in.
             * @param stepContent {string} - content of textarea
             * @param stepIndex {number} - index of a single step
             * @return {String} - Stringified JSON of given step
             */
            read(stepContent: string, stepIndex: number): string {
                if (this.componentConfigurationErrors[stepIndex].length) {
                    return stepContent;
                }

                return JSON.stringify(stepContent, null, 2);
            },
            /** Tests if step content provided in textarea can be JSON.parsed.
             *  If yes - saves in component's configuration and removes step error if there was any.
             *  If not - obtains error message and passes it to setError method. Returns what came in.
             * @param newStepContent {string} - current content of textarea
             * @param oldStepContent {string} - content of textarea in state it was before change was made
             * @param stepIndex {number} - index of a single step
             * @return {JSON, String} - if string can be parsed to JSON, returns JSON, otherwise String  
             */
            write(newStepContent: string, oldStepContent: string, stepIndex: number): any {
                let result: any;

                try {
                    result = JSON.parse(newStepContent);
                } catch (err) {
                    if (err.hasOwnProperty('message')) {
                        this.setError(stepIndex, err.message);
                    } else {
                        this.setError(stepIndex, JSON.stringify(err));
                    }
                };

                if (result) {
                    this.clearError(stepIndex);
                    return result;
                }

                return newStepContent;
            },
        },
        /** Translates given string
         * @param txt {string} - original, english string to be translated
         * @return {string} - translated string
         */
        translate(txt: string): string {
            return $.mage.__(txt);
        },
    },
    methods: {
        /** Pushes error message to the componentConfigurationErrors Array on given index
         * @param stepIndex {number} - index of a single step
         */
        setError(stepIndex: number, err: any): void {
            this.componentConfigurationErrors.$set(stepIndex, err);
        },
        /** Clears error message from the given index of componentConfigurationErrors Array
         * @param stepIndex {number} - index of a single step
         */
        clearError(stepIndex: number): void {
            this.componentConfigurationErrors.$set(stepIndex, '');
        },
        /** Creates new step on given position
         * @param stepIndex {number} - index of a new step to be created in
         */
        createStep(stepIndex: number): void {
            this.configuration.steps.splice(stepIndex, 0, JSON.parse(JSON.stringify(IStep)));
            this.componentConfigurationErrors.splice(stepIndex, 0, '');
        },
        /** Removes given step after "Delete" button is clicked
         * @param stepIndex {number} - index of step to remove
         */
        deleteStep(stepIndex: number): void {
            const component: any = this;

            confirm({
                content: $.mage.__('Are you sure you want to delete this step?'),
                actions: {
                    confirm(): void {
                        component.configuration.steps.splice(stepIndex, 1);
                        component.componentConfigurationErrors.splice(stepIndex, 1);
                    }
                },
            });
        },
        /** Prepares errors array for every step on each component render.
         *  It's not saved in configuration so must be called on every open
         * @return {Array} - array with as many empty entires as steps provided
         */
        prepareComponentErrorsArray(): Array<any> {
            let errorsArray: Array<any> = [];

            for (let step of this.configuration.steps) {
                errorsArray.push('');
            }

            return errorsArray;
        },
        /** Opens Magento's built-in image uploader/chooser modal
         * @param stepIndex {number} - index of a step for which image is inserted
         */
        getImageUploader(stepIndex: number): void {
            MediabrowserUtility.openDialog(`${this.uploaderBaseUrl}target_element_id/pf-imgholder-${stepIndex}`,
                'auto',
                'auto',
                $.mage.__('Insert File...'),
                {
                    closed: true,
                },
            );
        },
        /* Listener for image uploader
         * Since Magento does not provide any callback after image has been chosen
         * we have to watch for target where decoded url is placed
         */
        imageUploadListener(): void {
            const component: any = this;
            let isAlreadyCalled: boolean = false;

            // jQuery has to be used, for some reason native addEventListener doesn't catch change of input's value
            $(document).on('change', '.m2c-product-finder-configurator__imgholder', (event: Event): void => {
                if ( !isAlreadyCalled ) {
                    isAlreadyCalled = true;
                    component.setImageUrl(event);
                    setTimeout( (): void => {
                        isAlreadyCalled = false;
                    }, 100 );
                }
            } );
        },
        /** Action after image was uploaded
         * URL is encoded.
         * - strips it and decode Base64 to get {{ media url="..."}} format which will go to the step.image and will be used to display image on front end.
         * - escapes all double-quotes inside this new url format
         * - puts newly created string into proper place (where cursor was last time)
         * - trigger change event so that vue knows step content has changed
         * @param event {Event} - event passed from upload action
         */
        setImageUrl(event: Event): void {
            const input: any = event.target;
            const encodedImage: any = input.value.match( '___directive\/([a-zA-Z0-9]*)' )[1];
            const imageUrl: string = window.atob(encodedImage);
            const stepEl: HTMLInputElement = input.previousElementSibling;
            const stepText: string = stepEl.value;
            const finalImageUrl: string = imageUrl.replace(/\"/g,'\\"');

            stepEl.value = stepText.substr(0, this.caretPosition) + finalImageUrl + stepText.substr(this.caretPosition);
            $(stepEl).trigger('change');
        },

        /** Saves caret position in step's textarea on every click and keydown
         * @param event {Event} - click/keyup event
         */
        saveCaretPosition(event: Event): void {
            const el = <HTMLInputElement>event.target;
            this.caretPosition = el.selectionStart || 0;
        },
        /**
         * Moves step under given index up by swaping it with previous element.
         * @param {number} stepIndex step's index in array.
         */
        moveStepUp(stepIndex: number): void {
            if (stepIndex > 0) {
                const $thisItem: any = $(`#m2c-product-finder-step-${ stepIndex }`);
                const $prevItem: any = $(`#m2c-product-finder-step-${ stepIndex - 1 }`);

                $thisItem.addClass('m2c-product-finder-configurator__step--animating' ).css('transform', `translateY(${ -Math.abs($prevItem.outerHeight(true)) }px)`);
                $prevItem.addClass('m2c-product-finder-configurator__step--animating').css('transform', `translateY(${ $thisItem.outerHeight(true) }px)`);

                setTimeout((): void => {
                    this.configuration.steps.splice(stepIndex - 1, 0, this.configuration.steps.splice(stepIndex, 1)[0]);
                    $thisItem.removeClass('m2c-product-finder-configurator__step--animating').css('transform', '');
                    $prevItem.removeClass('m2c-product-finder-configurator__step--animating').css('transform', '');
                }, 400);
            }
        },
        /**
         * Moves step under given index down by swaping it with next element.
         * @param {number} stepIndex step's index in array.
         */
        moveStepDown(stepIndex: number): void {
            if (stepIndex < this.configuration.steps.length - 1) {
                const $thisItem: any = $(`#m2c-product-finder-step-${ stepIndex }`);
                const $nextItem: any = $(`#m2c-product-finder-step-${ stepIndex + 1 }`);

                $thisItem.addClass('m2c-product-finder-configurator__step--animating').css('transform', `translateY(${ $nextItem.outerHeight(true) }px)`);
                $nextItem.addClass('m2c-product-finder-configurator__step--animating').css('transform', `translateY(${ -Math.abs($thisItem.outerHeight(true)) }px )`);

                setTimeout((): void => {
                    this.configuration.steps.splice(stepIndex + 1, 0, this.configuration.steps.splice(stepIndex, 1)[0]);
                    $thisItem.removeClass('m2c-product-finder-configurator__step--animating').css('transform', '');
                    $nextItem.removeClass('m2c-product-finder-configurator__step--animating').css('transform', '');
                }, 400);
            }
        },
        /**
         * Tells if step with given index is the first step.
         * @param  {number}  stepIndex Index of the step.
         * @return {boolean} If step is first in array.
         */
        isFirstStep(stepIndex: number): boolean {
            return stepIndex === 0;
        },
        /**
         * Tells if step with given index is the last step.
         * @param  {number}  stepIndex Index of the step.
         * @return {boolean} If step is last in array.
         */
        isLastStep(stepIndex: number): boolean {
            return stepIndex === this.configuration.steps.length - 1;
        },
    },
    ready(): void {
        this.imageUploadListener();
    },
};

export default m2cProductFinderConfigurator;
