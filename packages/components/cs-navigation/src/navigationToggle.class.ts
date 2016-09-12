import {ISubcategoriesFlyout} from './subcategoriesFlyout.class';

interface INavigationToggle {
    makeActive(): void;
    makeInactive(): void;
    isActive(): boolean;
    getNavGroup(): string;
    bindFlyout(flyout: ISubcategoriesFlyout): void;
    getElement(): JQuery;
    getFlyout(): ISubcategoriesFlyout;
}

interface INavigationToggleSettings {
    classes: {
        active: string
    };
    hasFlyout: boolean;
    element: JQuery;
}

/**
 * Wraps single, first level category/link in navigation bar and handles its state
 */
class NavigationToggle implements INavigationToggle {
    private classes: {
        active: string
    };
    private _element: JQuery;
    private _isActive: boolean = false;
    private _hasFlyout: boolean = false;
    private _dataNavGroupAttribute: string = '';
    private _navGroup: string = '';
    private _flyout: ISubcategoriesFlyout;

    constructor(settings: INavigationToggleSettings) {
        this.classes = {};
        this.classes.active = settings.classes.active;

        this._element = settings.element;

        this._dataNavGroupAttribute = 'data-nav-group';

        if (settings.hasFlyout) {
            this._hasFlyout = settings.hasFlyout;
        }

        this._setNavGroup();

    }

    public makeActive(): void {
        this._element.addClass(this.classes.active);
        this._isActive = true;
    };

    public makeInactive(): void {
        this._element.removeClass(this.classes.active);
        this._isActive = false;
    };

    public isActive(): boolean {
        return this._isActive;
    }

    public getNavGroup(): string {
        return this._navGroup;
    }

    public bindFlyout(flyout: ISubcategoriesFlyout): void {
        this._flyout = flyout;
    }

    public getElement(): JQuery {
        return this._element;
    }

    public getFlyout(): ISubcategoriesFlyout {
        return this._flyout;
    }

    private _setNavGroup(): void {
        this._navGroup = this._element.attr(this._dataNavGroupAttribute);
    }
}

export {NavigationToggle};
export {INavigationToggle};
