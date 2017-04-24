/**
 * Single component information interface.
 */
interface IComponentInformation {
    blockId: string;
    title: string;
}

/**
 * Paragraph preview component.
 * This component is responsible for displaying preview of Paragraph component in Layout Builder (admin panel)
 * @type {vuejs.ComponentOption} Vue component object.
 */
const ccComponentParagraphPreview: vuejs.ComponentOption = {
    template: `<div class="cc-component-paragraph-preview">
        <div class="cc-component-paragraph-preview__content">
            <svg class="cc-component-paragraph-preview__bg">
                <use xlink:href="#icon_component-paragraph-preview"></use>
            </svg>
            <h2 class="cc-component-paragraph-preview__title">{{ configuration.title }}</h2>
        </div>
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
    }
};

export default ccComponentParagraphPreview;
