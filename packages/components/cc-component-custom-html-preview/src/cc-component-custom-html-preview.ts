/**
 * Single component information interface.
 */
interface IComponentInformation {
    title: string;
    markup: string;
}

/**
 * Custom html preview component.
 * This component is responsible for displaying preview of custom-html component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentCustomHtmlPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-custom-html-preview">
        <h1 class="cc-component-custom-html-preview__title">{{ configuration.title }}</h1>
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

export default ccComponentCustomHtmlPreview;
