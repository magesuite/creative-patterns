// Possible to make some smart detection of visiblity? Or use jQuery? Or pass in settings or method?

export interface IToggler {
    show(): void;
    hide(): void;
    isVisible(): boolean;
    isHidden(): boolean;
    toggle(): void;
}

export interface ITogglerSettings {
    visibleClass?: string;
    hiddenClass?: string;
    onShow?: Function;
    onHide?: Function;
}

export class Toggler implements IToggler {
    private _element: JQuery | HTMLElement = null;
    private _settings: ITogglerSettings = null;
    private _isVisible: boolean = null;
    private _isElementJQuery: boolean = null;
    private _visibleByDefault: boolean = null;

    constructor(element: JQuery | HTMLElement, settings: ITogglerSettings) {
        this._element = element;
        this._settings = settings;

        this._detectElementType();
        this._detectDefaultState();
    }

    public show(): void {
        if (!this._isVisible || null) {
            if (this._visibleByDefault) {
                this._removeClass(this._settings.hiddenClass);
            } else {
                this._addClass(this._settings.visibleClass);
            }
        }
        this._isVisible = true;
        if (this._settings.onShow) {
            this._settings.onShow();
        }
    }

    public hide(): void {
        if (this._isVisible || null) {
            if (this._visibleByDefault) {
                this._addClass(this._settings.hiddenClass);
            } else {
                this._removeClass(this._settings.visibleClass);
            }
        }
        this._isVisible = false;
        if (this._settings.onHide) {
            this._settings.onHide();
        }
    }

    public isVisible(): boolean {
        return this._isVisible;
    }

    public isHidden(): boolean {
        return !this._isVisible;
    }

    public toggle(): void {

        this._isVisible ? this.hide() : this.show();

    }

    private _addClass(className: string): void {
        if (this._isElementJQuery) {
            this._element.addClass(className);
        } else {
            this._element.classList.add(className);
        }
    }

    private _removeClass(className: string): void {
        if (this._isElementJQuery) {
            this._element.removeClass(className);
        } else {
            this._element.classList.remove(className);
        }
    }

    /**
     * Check what class is provided, visible or hidden and then sue proper one for toggling
     * @private
     */
    private _detectDefaultState(): void {
        this._visibleByDefault = this._settings.visibleClass ? false : true;
    }

    private _detectElementType(): void {

        this._isElementJQuery = this._element.jquery ? true : false;

    }
}
