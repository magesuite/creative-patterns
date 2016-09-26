(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csResponsiveBanner', factory) :
    (global.csResponsiveBanner = factory());
}(this, (function () { 'use strict';

var ResponsiveBanner = (function () {
    function ResponsiveBanner($element, settings) {
        this._settings = {
            $image: null,
        };
        this._currentSize = null;
        this._$element = $element;
        this._settings.$image = this._$element.find('img');
        this._settings = Object.assign(this._settings, settings);
        this._sizesArray = new Map();
    }
    ResponsiveBanner.prototype.addNewSource = function (name, size) {
        this._sizesArray.set(name, size);
    };
    ResponsiveBanner.prototype.setSize = function (name) {
        this._currentSize = name;
        var source = this._sizesArray.get(name).sourceUrl;
        this._replaceSrc(source);
    };
    ResponsiveBanner.prototype.getCurrentSize = function () {
        return this._currentSize;
    };
    ResponsiveBanner.prototype._replaceSrc = function (src) {
        this._settings.$image.attr('src', src);
    };
    return ResponsiveBanner;
}());

// Demo usage
var $banner = $('.cs-responsive-banner');
var banner = new ResponsiveBanner($banner);
var tabletSrc = $banner.attr('data-src-tablet');
var desktopSrc = $banner.attr('data-src-desktop');
var mobileSrc = $banner.attr('data-src-mobile');
banner.addNewSource('desktop', {
    sourceUrl: desktopSrc,
});
banner.addNewSource('tablet', {
    sourceUrl: tabletSrc,
});
banner.addNewSource('mobile', {
    sourceUrl: mobileSrc,
});
function setSize(width) {
    if (width > 1024) {
        banner.setSize('desktop');
    }
    else if (width >= 768) {
        banner.setSize('tablet');
    }
    else {
        banner.setSize('mobile');
    }
}
$(window).on('resize', function () {
    var width = $(window).width();
    setSize(width);
});
setSize($(window).width());

return banner;

})));
//# sourceMappingURL=cs-responsive-banner.js.map
