import {TwoWaySwitch} from './class.cs-2-way-switch';

let buttons = new TwoWaySwitch({
    $element: $('.cs-2-way-switch'),
    $items: $('.cs-2-way-switch__item'),
    activeClass: 'cs-2-way-switch__item--is-active',
    onFirst: function () {
        $('body').append('<strong>first</strong> button callback<br><br>');
    },
    onSecond: function () {
        $('body').append('<strong>second</strong> button callback<br><br>');
    },
    onChange: function () {
        $('body').append('<strong>any</strong> button changed callback<br><br>');
    }
});

buttons.init();