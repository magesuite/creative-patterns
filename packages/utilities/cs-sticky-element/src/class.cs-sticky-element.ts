import $ from 'jquery';

interface IStickyElement {
    init(): void;
    recalc(): void;
    detach(): void;

}

interface IStickyElementSettings {
    parent?: JQuery;
    inner_scrolling?: boolean;
    sticky_class?: string;
    offset_top?: number;
    spacer?: any;
    bottoming?: boolean;
    recalc_every?: number;
}

class StickyElement implements IStickyElement {
    private _settings: IStickyElementSettings = {};
    private _$element: JQuery = null;
    private _stickyKitInstance: Object = null;

    constructor($element: JQuery, settings?: IStickyElementSettings) {
        this._$element = $element;
        this._settings = settings;
    }

    public recalc(): void {
        $(document.body).trigger('sticky_kit:recalc');
    }

    public detach(): void {
        this._$element.trigger('sticky_kit:detach');
    }

    public init(): void {
        this._initStickyKit();
    }

    private _initStickyKit(): void {
        this._stickyKitInstance = this._$element.stick_in_parent(this._settings);
    }

}

export {IStickyElement, IStickyElementSettings, StickyElement};
