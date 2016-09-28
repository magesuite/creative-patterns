import {TwoWaySwitch} from './class.cs-2-way-switch';

let buttons: TwoWaySwitch = new TwoWaySwitch({
    $element: $('.cs-2-way-switch'),
    $items: $('.cs-2-way-switch__item'),
    activeClass: 'cs-2-way-switch__item--is-active',
    onFirst (): void {
        $('body').append('<strong>first</strong> button callback<br><br>');
    },
    onSecond (): void {
        $('body').append('<strong>second</strong> button callback<br><br>');
    },
    onChange (): void {
        $('body').append('<strong>any</strong> button changed callback<br><br>');
    },
});

buttons.init();
