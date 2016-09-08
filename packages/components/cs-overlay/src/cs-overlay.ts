//jQuery needed


//demo

import Overlay from './class.cs-overlay';

const overlay = new Overlay({
    $element: $('.cs-overlay'),
    visibleClass: 'cs-overlay--is-visible',
    onShow: function () {
        $('p').css('webkitFilter', 'blur(5px)')
    },
    onHide: function () {
        $('p').css('webkitFilter', 'none');
    }

});

$('#show').on('click', function () {
    overlay.show();
});

$('.cs-overlay').on('click', function () {
    overlay.hide();
});

export {overlay};