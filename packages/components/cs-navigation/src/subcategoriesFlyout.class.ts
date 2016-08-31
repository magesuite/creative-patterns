interface ISubcategoriesFlyoutClasses {
    visible: string
}

interface ISubcategoriesFlyoutSettings {
    element: JQuery,
    classes: ISubcategoriesFlyoutClasses
}

interface ISubcategoriesFlyout {
    _element: JQuery,
    show(): void,
    hide(): void,
    isVisible(): boolean,
    getNavGroup(): string
}

/**
 * Wraps flyout with subcategories, by default shown on hover of main category toggle
 */
export class SubcategoriesFlyout implements ISubcategoriesFlyout {
    private _element: JQuery;
    private classes: {
        visible: string
    };
    private _isVisible: boolean;
    private _dataNavGroupAttribute: string = '';
    private _navGroup: string = '';

    constructor(private settings: ISubcategoriesFlyoutSettings) {
        this._element = settings.element;
        this.classes = {};
        this.classes.visible = settings.classes.visible;

        this._dataNavGroupAttribute = 'data-nav-group';

        this._setNavGroup();
    }

    /**
     * Detects group which binds flyout with toggle. Its set in data attribute in template
     * @private
     */
    private _setNavGroup () {
        this._navGroup = this._element.attr(this._dataNavGroupAttribute);
    }

    public show() {
        this._element.addClass(this.classes.visible);
        this._isVisible = true;
    }

    public hide() {
        this._element.removeClass(this.classes.visible);
        this._isVisible = false;

    }

    public isVisible () {
        return this._isVisible;
    }

    public getNavGroup () {
        return this._navGroup;
    }
}
