import $ from 'jQuery';

interface ITwoWaySwitch {
    init(): void;
    setActive($element: JQuery): void;
}

interface ITwoWaySwitchSettings {
    $element: JQuery;
    $items: JQuery;
    activeClass: string;
    onChange?(): void;
    onFirst?(): void;
    onSecond?(): void;
}

class TwoWaySwitch implements ITwoWaySwitch {
    private settings: ITwoWaySwitchSettings;
    private _whichActive: number = null;
    private _$activeItem: JQuery = null;
    private _activeItemNo: number = null;

    constructor(settings: ITwoWaySwitchSettings) {
        this.settings = settings;
    }

    public setActive($element: JQuery): void {
        $element.data('isActive', true);
        $element.addClass(this.settings.activeClass);
        this._activeItemNo = $element.data('switchIndex');
    }

    public init(): void {
        this._getItemsState();
        this._events();
    }

    private _getItemsState(): void {
        this._$activeItem = this.settings.$items.each((index: number, element: HTMLElement) => {
            let $element: JQuery = $(element);
            $element.data('switchIndex', index);

            if ($element.hasClass(this.settings.activeClass)) {
                this._activeItemNo = index;
                return $element;
            }
        });

    }

    private _events(): void {
        this.settings.$items.each((index: number, element: HTMLElement) => {
            let $element: JQuery = $(element);
            let elementNo: number = $element.data('switchIndex');

            $element.on('click', (e: Event) => {
                e.preventDefault();

                if (this._isItemActive($element)) {
                    return 'Item already active';
                }

                this._resetActive();
                this.setActive($element);

                // Callbacks
                if (this.settings.onChange) {
                    this.settings.onChange();
                }
                if (elementNo === 0 && this.settings.onFirst) {
                    this.settings.onFirst();

                } else if (elementNo === 1 && this.settings.onSecond) {
                    this.settings.onSecond();

                } else if (elementNo > 1) {
                    throw new Error('Wrong index');
                }

            });

        });
    }

    private _isItemActive($element: JQuery): boolean {
        return $element.data('switchIndex') === this._activeItemNo;
    }

    private _resetActive(): void {
        this.settings.$items.removeClass(this.settings.activeClass);
        this._whichActive = null;
        this.settings.$items.data('isActive', false);
    }

}

export {TwoWaySwitch};
export {ITwoWaySwitch};
