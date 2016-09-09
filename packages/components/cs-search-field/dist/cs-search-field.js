(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.csSearchField = global.csSearchField || {})));
}(this, (function (exports) { 'use strict';

var SearchField = (function () {
    function SearchField(settings) {
        this._dependencies = settings.dependencies;
    }
    SearchField.prototype._callDependencies = function () {
        for (var i = 0; i < this._dependencies.length; i++) {
            var dependency = this._dependencies[i];
            dependency.init();
        }
    };
    SearchField.prototype.init = function () {
        this._callDependencies();
    };
    return SearchField;
}());

exports['default'] = SearchField;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cs-search-field.js.map
