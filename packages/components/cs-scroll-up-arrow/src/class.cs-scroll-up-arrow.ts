interface IScrollUpArrow {
    show(): void;
    hide(): void;
    isVisible(): boolean;
    init(): void;
}

interface IScrollUpArrowSettings {
    scrollTo: number;
    scrollingSpeed: number;
    classes?: {
        visible: string
    };
    onClickCallback?(): void;
    onFinishCallback?(): void;
}

/**
 * Logic containing scrolling to the part of the page by clicking on the component
 */
class ScrollUpArrow implements IScrollUpArrow {
    private $element: JQuery;
    private settings: IScrollUpArrowSettings;
    private _visible: boolean = false;
    private onClickCallback: Function = null;
    private onFinishCallback: Function = null;

    constructor($element: JQuery, settings: IScrollUpArrowSettings) {
        this.$element = $element;
        this.settings = settings;
        this.onClickCallback = settings.onClickCallback;
        this.onFinishCallback = settings.onFinishCallback;
    }

    public show(): void {
        this.$element.addClass(this.settings.classes.visible);
        this._visible = true;
    }

    public hide(): void {
        this.$element.removeClass(this.settings.classes.visible);
        this._visible = false;
    }

    public isVisible(): boolean {
        return this._visible;
    }

    public init(): void {
        this._events();
    }

    private _onClick(): void {
        $('body, html').animate({
            scrollTop: this.settings.scrollTo,
        }, this.settings.scrollingSpeed, () => {
            if (this.onFinishCallback) {
                this.onFinishCallback();
            }
        });
    }

    private _events(): void {
        this.$element.on('click', (e: Event) => {
            e.preventDefault();

            this._onClick();
            if (this.onClickCallback) {
                this.onClickCallback();
            }
        });
    }
}

export {ScrollUpArrow};
export {IScrollUpArrow};
