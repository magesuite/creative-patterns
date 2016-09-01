interface INavigationToggle {
    makeActive(): void,
    makeInactive(): void,
    isActive(): boolean,
    getNavGroup(): string,
    bindFlyout(flyout: Object): void,
    getElement(): JQuery,
    getFlyout(): Object
}

/**
 * Wraps single, first level category/link in navigation bar and handles its state
 */
export class NavigationToggle implements INavigationToggle {
    private classes: {
        active: string
    };
    private _element: JQuery;
    private _isActive: boolean = false;
    private _hasFlyout: boolean = false;
    private _dataNavGroupAttribute: string = '';
    private _navGroup: string = '';
    private _flyout: Object;

    constructor(settings) {
        this.classes = {};
        this.classes.active = settings.classes.active;

        this._element = settings.element;

        this._dataNavGroupAttribute = 'data-nav-group';

        if(settings.hasFlyout){
            this._hasFlyout = settings.hasFlyout;
        }

        this._setNavGroup();

    }

    private events () {

    }

    private _setNavGroup () {
        this._navGroup = this._element.attr(this._dataNavGroupAttribute);
    }

    public makeActive ()  {
        this._element.addClass(this.classes.active);
        this._isActive = true;
    };

    public makeInactive ()  {
        this._element.removeClass(this.classes.active);
        this._isActive = false;
    };

    public isActive () {
        return this._isActive;
    }

    public getNavGroup () {
        return this._navGroup;
    }

    public bindFlyout (flyout: Object ) {
        this._flyout = flyout;
    }

    public getElement () {
        return this._element;
    }

    public getFlyout () {
        return this._flyout;
    }

}