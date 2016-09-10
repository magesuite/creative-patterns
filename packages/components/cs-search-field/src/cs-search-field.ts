interface ISearchField {
    init(): void;
}

interface ISearchFieldSettings {
    dependencies: ISearchFieldDependency[];
}

interface ISearchFieldDependency {
    init(): void;
}

class SearchField implements ISearchField {
    private _dependencies: ISearchFieldDependency[];

    constructor(settings: ISearchFieldSettings) {
        this._dependencies = settings.dependencies;
    }

    _callDependencies() {
        for (let i = 0; i < this._dependencies.length; i++) {
            let dependency = this._dependencies[i];

            dependency.init();
        }
    }

    init() {
        this._callDependencies();
    }
}

export default SearchField;