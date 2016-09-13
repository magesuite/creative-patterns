(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csProductThumbnails', factory) :
    (global.csProductThumbnails = factory());
}(this, (function () { 'use strict';

var Thumbnail = (function () {
    function Thumbnail(settings) {
        this.selected = false;
        this.element = settings.element;
        this.selectedClass = settings.selectedClass;
        this.selected = this._detectIfSelected();
    }
    Thumbnail.prototype.select = function () {
        this.element.addClass(this.selectedClass);
        this.selected = true;
        this.element.trigger('thumbnail:select');
    };
    Thumbnail.prototype.unSelect = function () {
        this.element.removeClass(this.selectedClass);
        this.selected = false;
    };
    Thumbnail.prototype.isSelected = function () {
        return this.selected;
    };
    Thumbnail.prototype.getElement = function () {
        return this.element;
    };
    Thumbnail.prototype._detectIfSelected = function () {
        return this.element.hasClass(this.selectedClass) ? true : false;
    };
    return Thumbnail;
}());

var Thumbnails = (function () {
    function Thumbnails(settings) {
        this.thumbnails = settings.thumbnails;
    }
    Thumbnails.prototype.init = function () {
        this._events();
    };
    Thumbnails.prototype._resetSelected = function () {
        $.each(this.thumbnails, function (i, elem) {
            elem.unSelect();
        });
    };
    Thumbnails.prototype._events = function () {
        var _this = this;
        var _loop_1 = function(i) {
            var thumbnail = this_1.thumbnails[i];
            var $thumbnail = $(thumbnail.getElement());
            $thumbnail.on('click', function () {
                if (!thumbnail.isSelected()) {
                    _this._resetSelected();
                    thumbnail.select();
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.thumbnails.length; i++) {
            _loop_1(i);
        }
    };
    return Thumbnails;
}());

// Demo
var thumbnailsArray = [];
$('.cs-product-thumbnails__item').each(function () {
    thumbnailsArray.push(new Thumbnail({
        element: $(this),
        selectedClass: 'cs-product-thumbnails__item--is-selected',
    }));
});
var thumbnailsComponent = new Thumbnails({ thumbnails: thumbnailsArray });
thumbnailsComponent.init();

return thumbnailsComponent;

})));
//# sourceMappingURL=cs-product-thumbnails.js.map
