import ccStaticBlockConfigurator from '../../../components/cc-static-block-configurator/src/cc-static-block-configurator';

const m2cStaticBlockConfigurator: vuejs.ComponentOption = {
    template: `<form class="m2c-static-block-configurator {{ classes }} | {{ mix }}" {{ attributes }} @submit.prevent="onSave">
        <div class="m2-input m2-input--type-inline">
            <label for="cfg-static-block" class="m2-input__label">Static block:</label>
            <select name="select" class="m2-input__select" id="cfg-static-block" v-model="staticBlock" @change="onChange">
                <option value="1" selected>Foo</option>
                <option value="2">Bar</option>
            </select>
        </div>
    </form>`,
    mixins: [
        ccStaticBlockConfigurator,
    ],
};

export default m2cStaticBlockConfigurator;
