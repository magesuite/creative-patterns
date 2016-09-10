//JQuery needed

interface ITwoWaySwitch {
    init(): void,
    setActive($element: JQuery): void
}

interface ITwoWaySwitchSettings {
    $element: JQuery,
    $items: JQuery,
    activeClass: string,
    onChange?(): void,
    onFirst?(): void,
    onSecond?(): void
}

class TwoWaySwitch implements ITwoWaySwitch {
    private settings: ITwoWaySwitchSettings;
    private _whichActive: number = null;
    private _$activeItem: JQuery = null;
    private _activeItemNo: number = null;

    constructor(settings: ITwoWaySwitchSettings) {
        this.settings = settings;
    }

    _getItemsState() {
        this._$activeItem = this.settings.$items.each((index, element)=> {
            let $element = $(element);
            $element.data('switchIndex', index);

            if ($element.hasClass(this.settings.activeClass)) {
                this._activeItemNo = index;
                return $element;
            }
        });


    }

    _events() {
        this.settings.$items.each((index, element)=> {
            let $element = $(element);
            let elementNo = $element.data('switchIndex');

            $element.on('click', (e) => {
                e.preventDefault();

                if (this._isItemActive($element)) {
                    return 'Item already active';
                }

                this._resetActive();
                this.setActive($element);

                //Callbacks
                this.settings.onChange ? this.settings.onChange() : 'or no callback .(ツ)_/¯ ';

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

    _isItemActive($element: JQuery) {
        return $element.data('switchIndex') === this._activeItemNo;
    }

    _resetActive() {
        this.settings.$items.removeClass(this.settings.activeClass);
        this._whichActive = null;
        this.settings.$items.data('isActive', false);
    }

    setActive($element: JQuery) {
        $element.data('isActive', true);
        $element.addClass(this.settings.activeClass);
        this._activeItemNo = $element.data('switchIndex');
    }

    init() {
        this._getItemsState();
        this._events();
    }

}

export {TwoWaySwitch};
export {ITwoWaySwitch};