/**
 * Single component information interface.
 */
interface IComponentInformation {
    identifier: string;
}

/**
 * CMS block preview component.
 * This component is responsible for displaying preview of CMS block component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentStaticCmsBlockPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-static-cms-block-preview">
        <h2 class="cc-component-static-cms-block-preview__block-id">CMS Block ID: {{ configuration.identifier }}</h2>
    </div>`,
    props: {
        /**
         * Single's component configuration 
         */
        configuration: {
            type: Object,
        },
        /**
         * Class property support to enable BEM mixes.
         */
        class: {
            type: [ String, Object, Array ],
            default: '',
        },
    },
};

export default ccComponentStaticCmsBlockPreview;
