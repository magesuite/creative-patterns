(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csFilterContainer', factory) :
    (global.csFilterContainer = factory());
}(this, (function () { 'use strict';

var FilterContainer = (function () {
    function FilterContainer(settings) {
        this.settings = null;
        this._isExpanded = true;
        this.settings = settings;
    }
    FilterContainer.prototype.expand = function () {
        this._hideIcon(this.settings.collapsedIcon);
        this._showIcon(this.settings.expandedIcon);
        this._expandFilter();
        this._isExpanded = true;
    };
    FilterContainer.prototype.collapse = function () {
        this._hideIcon(this.settings.expandedIcon);
        this._showIcon(this.settings.collapsedIcon);
        this._collapseFilter();
        this._isExpanded = false;
    };
    FilterContainer.prototype.init = function () {
        this._isExpanded = this._checkIfExpanded();
        this._events();
    };
    FilterContainer.prototype.isExpanded = function () {
        return this._isExpanded;
    };
    FilterContainer.prototype._checkIfExpanded = function () {
        var expandedIconVisible = this.settings.expandedIcon.hasClass(this.settings.visibleIconClass);
        var filterVisible = this.settings.filterWrapper.hasClass(this.settings.visibleFilterWrapperClass);
        return (expandedIconVisible && filterVisible) ? true : false;
    };
    FilterContainer.prototype._events = function () {
        var _this = this;
        this.settings.toggleSelector.on('click', function () {
            _this._handleClick();
        });
    };
    FilterContainer.prototype._handleClick = function () {
        if (this._isExpanded) {
            this.collapse();
        }
        else {
            this.expand();
        }
    };
    FilterContainer.prototype._hideIcon = function ($icon) {
        $icon.removeClass(this.settings.visibleIconClass);
    };
    FilterContainer.prototype._showIcon = function ($icon) {
        $icon.addClass(this.settings.visibleIconClass);
    };
    FilterContainer.prototype._expandFilter = function () {
        this.settings.filterWrapper.addClass(this.settings.visibleFilterWrapperClass);
    };
    FilterContainer.prototype._collapseFilter = function () {
        this.settings.filterWrapper.removeClass(this.settings.visibleFilterWrapperClass);
    };
    return FilterContainer;
}());

var settings = {
    component: $('.cs-filter-container'),
    expandedIcon: $('.cs-filter-container__icon--expanded'),
    collapsedIcon: $('.cs-filter-container__icon--collapsed'),
    visibleIconClass: 'cs-filter-container__icon--is-visible',
    filterWrapper: $('.cs-filter-container__filter-wrapper'),
    visibleFilterWrapperClass: 'cs-filter-container__filter-wrapper--is-visible',
    toggleSelector: $('.cs-filter-container__top-bar'),
};
var filterContainer = new FilterContainer(settings);
filterContainer.init();

return filterContainer;

})));
//# sourceMappingURL=cs-filter-container.js.map
