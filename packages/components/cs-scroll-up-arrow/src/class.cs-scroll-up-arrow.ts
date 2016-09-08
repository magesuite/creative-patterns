interface IScrollUpArrow {
    show(): void,
    hide(): void,
    isVisible(): boolean,
    init(): void
}


interface IScrollUpArrowSettings {
    scrollTo: number,
    scrollingSpeed: number,
    classes?: {
        visible: string
    }
}

/**
 * Logic containing scrolling to the part of the page by clicking on the component
 */
class ScrollUpArrow implements IScrollUpArrow {
    private $element: JQuery;
    private settings: IScrollUpArrowSettings;
    private _visible: boolean = false;

    constructor($element: JQuery, settings: IScrollUpArrowSettings) {
        this.$element = $element;
        this.settings = settings;
    }

    private _onClick() {
        $('body, html').animate({
            scrollTop: this.settings.scrollTo
        }, this.settings.scrollingSpeed, () => {
            this._onFinish();
        });
    }

    private _onFinish() {
    }

    private _events() {
        this.$element.on('click', (e) => {
            e.preventDefault();

            this._onClick();
        });
    }

    public show() {
        this.$element.addClass(this.settings.classes.visible);
        this._visible = true;
    }

    public hide() {
        this.$element.removeClass(this.settings.classes.visible);
        this._visible = false;
    }

    public isVisible () {
        return this._visible;
    }

    public init() {
        this._events();
    }
}

export {ScrollUpArrow};
export {IScrollUpArrow};