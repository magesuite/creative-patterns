(function (exports) {
    'use strict';

    //jQuery needed
    var Overlay = (function () {
        function Overlay(settings) {
            this._visible = false;
            this.classes = {};
            this.allowBlurBackground = true;
            this.$element = settings.$element;
            this.classes = settings.classes;
        }
        Overlay.prototype._blurBackground = function () {
        };
        Overlay.prototype.hide = function () {
            this.$element.removeClass(this.classes.visible);
            this._visible = false;
            this.$element.trigger('overlay:hidden');
        };
        Overlay.prototype.show = function () {
            this.$element.addClass(this.classes.visible);
            this._visible = true;
            this.$element.trigger('overlay:shown');
            if (this.allowBlurBackground) {
                this._blurBackground();
            }
        };
        Overlay.prototype.isVisible = function () {
            return this._visible;
        };
        return Overlay;
    }());
    var overlay = new Overlay({
        $element: $('.cs-overlay'),
        classes: {
            visible: 'cs-overlay--is-visible'
        },
        allowBlurBackground: true
    });

    exports.Overlay = Overlay;
    exports.overlay = overlay;

}((this.csOverlay = this.csOverlay || {})));
//# sourceMappingURL=cs-overlay.js.map