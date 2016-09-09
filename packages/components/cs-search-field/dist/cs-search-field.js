(function (exports) {
'use strict';

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

}((this.csSearchField = this.csSearchField || {})));
//# sourceMappingURL=cs-search-field.js.map
