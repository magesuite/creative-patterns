import $ from 'jquery';

import actionButton from '../../action-button/src/action-button';

import ccComponentBrandCarouselPreview from '../../cc-component-brand-carousel-preview/src/cc-component-brand-carousel-preview';
import ccComponentButtonPreview from '../../cc-component-button-preview/src/cc-component-button-preview';
import ccComponentHeadlinePreview from '../../cc-component-headline-preview/src/cc-component-headline-preview';
import ccComponentImageTeaserPreview from '../../cc-component-image-teaser-preview/src/cc-component-image-teaser-preview';
import ccComponentHeroCarouselPreview from '../../cc-component-hero-carousel-preview/src/cc-component-hero-carousel-preview';
import ccComponentProductCarouselPreview from '../../cc-component-product-carousel-preview/src/cc-component-product-carousel-preview';
import ccComponentStaticCmsBlockPreview from '../../cc-component-static-cms-block-preview/src/cc-component-static-cms-block-preview';

import componentActions from '../../cc-component-actions/src/cc-component-actions';
import componentAdder from '../../cc-component-adder/src/cc-component-adder';
import componentPlaceholder from '../../cc-component-placeholder/src/cc-component-placeholder';

import template from './cc-layout-builder.tpl';

/**
 * Single component information interface.
 */
interface IComponentInformation {
    name: string;
    id: string;
    type: string;
    data?: any;
}

/**
 * Layout builder component.
 * This component is responsible for displaying and handling user interactions of
 * entire Content Constructor
 * @type {vuejs.ComponentOption} Vue component object.
 */
const layoutBuilder: vuejs.ComponentOption = {
    template: template,
    /**
     * Get dependencies
     */
    components: {
        'action-button': actionButton,
        'cc-component-adder': componentAdder,
        'cc-component-actions': componentActions,
        'cc-component-placeholder': componentPlaceholder,
        'cc-component-brand-carousel-preview': ccComponentBrandCarouselPreview,
        'cc-component-button-preview': ccComponentButtonPreview,
        'cc-component-headline-preview': ccComponentHeadlinePreview,
        'cc-component-image-teaser-preview': ccComponentImageTeaserPreview,
        'cc-component-hero-carousel-preview': ccComponentHeroCarouselPreview,
        'cc-component-product-carousel-preview': ccComponentProductCarouselPreview,
        'cc-component-static-cms-block-preview': ccComponentStaticCmsBlockPreview,
    },
    props: {
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
        assetsSrc: {
            type: String,
            default: '',
        },
        /**
         * Initial component configuration encoded as JSON string.
         */
        componentsConfiguration: {
            type: String,
            default: '',
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should take IComponentInformation and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         */
        editComponent: {
            type: Function,
            default: ( componentInfo: IComponentInformation ): IComponentInformation => componentInfo,
        },
        /**
         * Callback invoked when edit component button is clicked.
         * This function should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         */
        addComponent: {
            type: Function,
            default: (): IComponentInformation => undefined,
        },
    },
    data(): any {
        return {
            components: [],
        };
    },
    ready(): void {
        // Set initial components configuration if provided.
        this.components = this.componentsConfiguration ? JSON.parse( this.componentsConfiguration ) : [];
        this.$dispatch( 'cc-layout-builder__update' );
    },
    methods: {
        /**
         * Returns components information currently stored within layout builder.
         * @return {IComponentInformation[]} Components information array.
         */
        getComponentInformation(): IComponentInformation[] {
            return JSON.parse(
                JSON.stringify( this.components ),
            );
        },
        /**
         * Sets provided component information on current index in components array.
         * If component exists on given index then this compoennt will be inserted before it.
         * @param {number}                index         Component index in components array.
         * @param {IComponentInformation} componentInfo Component information.
         */
        addComponentInformation( index: number, componentInfo: IComponentInformation ): void {
            if ( componentInfo ) {
                this.components.splice( index, 0, componentInfo );
                this.$dispatch( 'cc-layout-builder__update' );
            }
        },
        /**
         * Sets provided component information on current index in components array.
         * If component exists on given index then it will be overwritten.
         * @param {number}                index         Component index in components array.
         * @param {IComponentInformation} componentInfo Component information.
         */
        setComponentInformation( index: number, componentInfo: IComponentInformation ): void {
            if ( componentInfo ) {
                this.components.$set( index, componentInfo );
                this.$dispatch( 'cc-layout-builder__update' );
            }
        },
        /**
         * Creates new component and adds it to a specified index.
         * This function calls callback specified by "add-component" property that
         * should return IComponentInformation.
         * If callback returns falsy value then component isn't added.
         * @param {number} index New component's index in components array.
         */
        createNewComponent( index: number ): void {
            /**
             * To allow both sync and async set of new component data we call
             * provided handler with callback function.
             * If handler doesn't return component information then it can still
             * set it using given callback.
             */
            const componentInfo: IComponentInformation = this.addComponent(
                ( asyncComponentInfo: IComponentInformation ): void => {
                    this.addComponentInformation( index, asyncComponentInfo );
                },
            );
            this.addComponentInformation( index, componentInfo );
        },
        /**
         * Initializes edit mode of component.
         * This function invokes callback given by "edit-component" callback that
         * should take current IComponentInformation as param and return changed version of it.
         * If callback returns falsy value then component isn't changed.
         * @param {string} index: Component's index in array.
         */
        editComponentSettings( index: number ): void {
            // Create a static, non-reactive copy of component data.
            let componentInfo: IComponentInformation = JSON.parse(
                JSON.stringify( this.components[ index ] ),
            );
            /**
             * To allow both sync and async set of new component data we call
             * provided handler with current component data and callback function.
             * If handler doesn't return component information then it can still
             * set it using given callback.
             */
            componentInfo = this.editComponent(
                componentInfo,
                ( asyncComponentInfo: IComponentInformation ): void => {
                    this.setComponentInformation( index, asyncComponentInfo );
                },
            );
            this.setComponentInformation( index, componentInfo );
        },
        /**
         * Moves component under given index up by swaping it with previous element.
         * @param {number} index Component's index in array.
         */
        moveComponentUp( index: number ): void {
            if ( index > 0 ) {
                let previousComponent: IComponentInformation = this.components[ index - 1 ];
                const $thisComponent: any = $( `#${ this.components[ index ].id }` );
                const $prevComponent: any = $( `#${ this.components[ index - 1 ].id }` );

                $thisComponent.addClass( 'm2c-layout-builder__component--animating' ).css( 'transform', `translateY( ${ -Math.abs( $prevComponent.outerHeight( true ) ) }px )` );
                $prevComponent.addClass( 'm2c-layout-builder__component--animating' ).css( 'transform', `translateY( ${ $thisComponent.outerHeight( true ) }px )` );

                setTimeout( (): void => {
                    this.components.$set( index - 1, this.components[ index ] );
                    this.components.$set( index, previousComponent );
                    this.$dispatch( 'cc-layout-builder__update' );
                    $thisComponent.removeClass( 'm2c-layout-builder__component--animating' ).css( 'transform', '' );
                    $prevComponent.removeClass( 'm2c-layout-builder__component--animating' ).css( 'transform', '' );
                }, 400 );
            }
        },
        /**
         * Moves component under given index down by swaping it with next element.
         * @param {number} index Component's index in array.
         */
        moveComponentDown( index: number ): void {
            if ( index < this.components.length - 1 ) {
                let previousComponent: IComponentInformation = this.components[ index + 1 ];
                const $thisComponent: any = $( `#${ this.components[ index ].id }` );
                const $nextComponent: any = $( `#${ this.components[ index + 1 ].id }` );

                $thisComponent.addClass( 'm2c-layout-builder__component--animating' ).css( 'transform', `translateY( ${ $nextComponent.outerHeight( true ) }px )` );
                $nextComponent.addClass( 'm2c-layout-builder__component--animating' ).css( 'transform', `translateY( ${ -Math.abs( $thisComponent.outerHeight( true ) ) }px )` );

                setTimeout( (): void => {
                    this.components.$set( index + 1, this.components[ index ] );
                    this.components.$set(  index, previousComponent );
                    this.$dispatch( 'cc-layout-builder__update' );
                    $thisComponent.removeClass( 'm2c-layout-builder__component--animating' ).css( 'transform', '' );
                    $nextComponent.removeClass( 'm2c-layout-builder__component--animating' ).css( 'transform', '' );
                }, 400 );
            }
        },
        /**
         * Removes component and adder that is right after component from the DOM
         * @param {number} index Component's index in array.
         */
        deleteComponent( index: number ): void {
            if ( window.confirm( 'Are you sure you want to delete this item?' ) ) {
                this.components.splice( index, 1 );
                this.$dispatch( 'cc-layout-builder__update' );
            }
        },
        /**
         * Tells if component with given index is the first component.
         * @param  {number}  index Index of the component.
         * @return {boolean}       If component is first in array.
         */
        isFirstComponent( index: number ): boolean {
            return index === 0;
        },
        /**
         * Tells if component with given index is the last component.
         * @param  {number}  index Index of the component.
         * @return {boolean}       If component is last in array.
         */
        isLastComponent( index: number ): boolean {
            return index === this.components.length - 1;
        },

        transformComponentTypeToText( componentType: string ): string {
            return componentType.replace( '-', ' ' );
        },

        isPossibleToEdit( componentType: string ): boolean {
            return componentType === 'brand-carousel';
        },
    },
};

export default layoutBuilder;
export { layoutBuilder, IComponentInformation };
