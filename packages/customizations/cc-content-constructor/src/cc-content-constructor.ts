/* tslint:disable:no-console */

import { IComponentInformation, layoutBuilder } from '../../../components/cc-layout-builder/src/cc-layout-builder';

/**
 * CC Content Constructor component.
 * Dummy example on how to implement custom Content Constructor logic.
 */
const m2cContentConstructor: vuejs.ComponentOption = {
    template: `<div class="cc-content-constructor">
        <cc-layout-builder
            v-ref:layout-builder
            :assets-src="assetsSrc"
            :add-component="pickRandomComponent"
            :edit-component="editRandomComponent"
            :components-configuration="configuration">
        </cc-layout-builder>
    </div>`,
    components: {
        'cc-layout-builder': layoutBuilder,
    },
    props: {
        configuration: {
            type: String,
            default: '',
        },
        assetsSrc: {
            type: String,
            default: '',
        },
    },
    methods: {
        /**
         * Callback that will be invoked when user clicks plus button.
         * This method should open magento modal with component picker.
         * @param  {IComponentInformation} addComponentInformation Callback that let's us add component asynchronously.
         */
        pickRandomComponent( addComponentInformation: ( componentInfo: IComponentInformation ) => void ): void {
            this._addComponentInformation = addComponentInformation;
            console.log( 'Getting component picker.' );
            const componentTypes: string[] = [
                'headline',
                'static-block',
                'hero',
            ];
            const componentType: string = componentTypes[ Math.floor( Math.random() * componentTypes.length ) ];
            if ( window.confirm( `Randomly picked "${componentType}" component, ok?` ) ) {
                this.getRandomConfigurator( componentType );
            }
        },
        getRandomConfigurator( componentType: string ): void {
            console.log( `Getting configurator for ${componentType} component.` );
            const componentConfiguration: any = {
                type: componentType,
                id: 'component' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 ),
                data: {},
            };
            if ( window.confirm( `Do you want to add component with below configuration?
                ${JSON.stringify(componentConfiguration, null, 2)}` ) ) {
                this._addComponentInformation( componentConfiguration );
            }
        },
        /**
         * Callback that will be invoked when user clicks edit button.
         * This method should open magento modal with component editor.
         * @param  {IComponentInformation} setComponentInformation Callback that let's us add component asynchronously.
         */
        editRandomComponent(
            currentInfo: IComponentInformation,
            setComponentInformation: ( componentInfo: IComponentInformation ) => void,
        ): void {
            const componentConfiguration: any = {
                type: currentInfo.type,
                id: 'component' + Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 ),
                data: currentInfo.data,
            };
            if ( window.confirm( `Do you want to edit component with below configuration?
                ${JSON.stringify(componentConfiguration, null, 2)}` ) ) {
                setComponentInformation( componentConfiguration );
            }
        },
    },
};

export default m2cContentConstructor;
