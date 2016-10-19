import $ from '../../../node_modules/jquery/dist/jquery.js';
import {IValidationMessageSettings, ValidationMessage} from '../../class.cs-validation-message';

describe('validation-message component', function (): void {

    let validationMessageComponent: ValidationMessage = null;
    let settings: IValidationMessageSettings = null;
    const validationMsgHtml: string = '<div class="cs-validation-message">text</div>';
    const validationMsgSelector: string = '.cs-validation-message';

    beforeEach(function (): void {
        $('body').append(validationMsgHtml);
        validationMessageComponent = new ValidationMessage($(validationMsgSelector));
    });

    afterEach(function (): void {
        $('.cs-validation-message').remove();
    });

    // Check if methods exist

    it('has getMessage() method', () => {
        expect(typeof validationMessageComponent.getMessage).toBe('function');
    });
    it('has setMessage() method', () => {
        expect(typeof validationMessageComponent.setMessage).toBe('function');

    });

    it('has getType() method', () => {
        expect(typeof validationMessageComponent.getType).toBe('function');

    });

    it('has setType() method', () => {
        expect(typeof validationMessageComponent.setType).toBe('function');

    });

    // Check if methods returns proper types

    it('method getMessage() returns string', () => {
        expect(typeof validationMessageComponent.getMessage()).toBe('string');
    });

    it('method getType() returns string', () => {
        let types: Map = new Map();
        types.set('positive', 'className');

        settings = {
            types: types,
        };

        const $element: JQuery = $(validationMsgSelector);
        $element.addClass('className');

        validationMessageComponent = new ValidationMessage($element, {types: types});

        expect(typeof validationMessageComponent.getType()).toBe('string');
    });

    // Behaviour

    it('method setMessage() sets proper text to component', () => {
        let message: string = 'ass';
        validationMessageComponent.setMessage(message);
        expect($(validationMsgSelector).text()).toEqual(message);
    });

    it('method getMessage() retrieve proper text message', () => {
        let message: string = 'ass';
        validationMessageComponent.setMessage(message);
        expect(validationMessageComponent.getMessage()).toEqual(message);
    });

    it('method setType adds proper class to element', () => {
        let types: Map = new Map();
        types.set('positive', 'className');

        settings = {
            types: types,
        };

        const $element: JQuery = $(validationMsgSelector);

        validationMessageComponent = new ValidationMessage($element, {types: types});

        validationMessageComponent.setType('positive');
        expect($element.hasClass('className')).toBeTruthy();
    });

    it('method getType returns proper type property', () => {
        let types: Map = new Map();
        types.set('positive', 'className');

        settings = {
            types: types,
        };

        const $element: JQuery = $(validationMsgSelector);

        validationMessageComponent = new ValidationMessage($element, {types: types});

        validationMessageComponent.setType('positive');
        expect(validationMessageComponent.getType()).toEqual('positive');
    });

});
