(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('csSearchField', factory) :
    (global.csSearchField = factory());
}(this, (function () { 'use strict';

var SearchField = (function () {
    function SearchField(settings) {
        this._dependencies = settings.dependencies;
    }
    SearchField.prototype.init = function () {
        this._callDependencies();
    };
    SearchField.prototype._callDependencies = function () {
        for (var i = 0; i < this._dependencies.length; i++) {
            var dependency = this._dependencies[i];
            dependency.init();
        }
    };
    return SearchField;
}());

return SearchField;

})));
//# sourceMappingURL=cs-search-field.js.map
