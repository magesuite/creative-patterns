import {ValidationMessage} from './class.cs-validation-message';

let validationTypes: Map = new Map();
validationTypes.set('positive', 'cs-validation-message--type_positive');
validationTypes.set('warning', 'cs-validation-message--type_warning');
validationTypes.set('negative', 'cs-validation-message--type_negative');

let valMessage: ValidationMessage = new ValidationMessage($('.cs-validation-message'), {
    types: validationTypes,
});

$('#setPositive').click(function (): void {
    valMessage.setType('positive');
});

$('#setNegative').click(function (): void {
    valMessage.setType('negative');
});

$('#setWarning').click(function (): void {
    valMessage.setType('warning');
});

$('#getText').click(function (): void {
    alert(valMessage.getMessage());
});

$('#getType').click(function (): void {
    alert(valMessage.getType());
});

$('#setText').click(function (): void {
    valMessage.setMessage('another text message');
});
