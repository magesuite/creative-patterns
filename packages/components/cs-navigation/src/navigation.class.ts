interface INavigation {
    close():void,
    show(index:number):void,
    init():void
}

interface INavigationSettings {
    toggles: Array<Object>,
    flyouts: Array<Object>
}

export class Navigation implements INavigation{
    private _toggles: Array<Object>;
    private _flyouts: Array<Object>;

    constructor(settings: INavigationSettings) {
        this._toggles = settings.toggles;
        this._flyouts = settings.flyouts;

        this.init();
    }

    /**
     * Conntects toggles with flyouts via data attribute in template
     * @private
     */
    _bindItems () {
        let toggles = this._toggles;
        let flyouts = this._flyouts;
        $.each(toggles, (i, toggle)=> {
            let toggleGroup = toggle.getNavGroup();
            $.each(flyouts, function (i, flyout) {
                let flyoutGroup = flyout.getNavGroup();

                if (toggleGroup === flyoutGroup) {
                    toggle.bindFlyout(flyout);

                    return;
                }
            })
        });
    }

    /**
     * Bind events between toggles and flyouts
     * @private
     */
    private _events(){
        $.each(this._toggles, (index, elem) => {
            let toggle = elem;
            let $element = toggle.getElement();

            $element.on('click', (e) => {
                this._onClick(e, toggle);
            });
        })
    }

    /**
     * Click action
     * @private
     */
    _onClick(e, toggle) {
        console.log('clicked');

        toggle.getFlyout().show();

        this.close();

    }

    /**
     * Close any open flyout
     */
    public close() {

    }

    /**
     * Show flyout with provided index
     * @param index
     */
    public show(index) {

    }

    public init () {
        this._bindItems();
        this._events();
    }
}
