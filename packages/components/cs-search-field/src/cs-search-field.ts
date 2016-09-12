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

    public init(): void {
        this._callDependencies();
    }

    private _callDependencies(): void {
        for (let i: number = 0; i < this._dependencies.length; i++) {
            let dependency: ISearchFieldDependency = this._dependencies[i];

            dependency.init();
        }
    }

}

export default SearchField;
