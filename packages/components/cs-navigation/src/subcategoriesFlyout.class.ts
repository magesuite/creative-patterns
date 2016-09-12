interface ISubcategoriesFlyoutClasses {
    visible: string;
}

interface ISubcategoriesFlyoutSettings {
    element: JQuery;
    classes: ISubcategoriesFlyoutClasses;
}

interface ISubcategoriesFlyout {
    show(): void;
    hide(): void;
    isVisible(): boolean;
    getNavGroup(): string;
}

/**
 * Wraps flyout with subcategories, by default shown on hover of main category toggle
 */
class SubcategoriesFlyout implements ISubcategoriesFlyout {
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

    public show(): void {
        this._element.addClass(this.classes.visible);
        this._isVisible = true;
    }

    public hide(): void {
        this._element.removeClass(this.classes.visible);
        this._isVisible = false;

    }

    public isVisible(): boolean {
        return this._isVisible;
    }

    public getNavGroup(): string {
        return this._navGroup;
    }
    /**
     * Detects group which binds flyout with toggle. Its set in data attribute in template
     * @private
     */
    private _setNavGroup(): void {
        this._navGroup = this._element.attr(this._dataNavGroupAttribute);
    }
}

export {SubcategoriesFlyout};
export {ISubcategoriesFlyout};