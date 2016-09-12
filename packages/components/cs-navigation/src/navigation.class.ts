import {INavigationToggle} from './navigationToggle.class';
import {ISubcategoriesFlyout} from './subcategoriesFlyout.class';

interface INavigation {
    close(): void;
    show(index: number): void;
    init(): void;
}

interface INavigationSettings {
    toggles: INavigationToggle[];
    flyouts: ISubcategoriesFlyout[];
}

export class Navigation implements INavigation {
    private _toggles: INavigationToggle[];
    private _flyouts: ISubcategoriesFlyout[];

    constructor(settings: INavigationSettings) {
        this._toggles = settings.toggles;
        this._flyouts = settings.flyouts;

        this.init();
    }

    /**
     * Close any open flyout
     */
    public close(): void {
        return;
    }

    /**
     * Show flyout with provided index
     * @param index
     */
    public show(index: number): void {
        return;
    }

    public init(): void {
        this._bindItems();
        this._events();
    }

    /**
     * Click action
     * @private
     */
    protected _onClick(event: Event, toggle: INavigationToggle): void {
        event.preventDefault();
        toggle.getFlyout().show();

        this.close();

    }

    /**
     * Conntects toggles with flyouts via data attribute in template
     * @private
     */
    private _bindItems(): void {
        let toggles: Array<Object> = this._toggles;
        let flyouts: Array<Object> = this._flyouts;
        $.each(toggles, (i: number, toggle: any) => {
            let toggleGroup: string = toggle.getNavGroup();
            $.each(flyouts, function (index: number, flyout: ISubcategoriesFlyout): void {
                let flyoutGroup: string = flyout.getNavGroup();

                if (toggleGroup === flyoutGroup) {
                    toggle.bindFlyout(flyout);

                    return;
                }
            });
        });
    }

    /**
     * Bind events between toggles and flyouts
     * @private
     */
    private _events(): void {
        $.each(this._toggles, (index: number, elem: INavigationToggle) => {
            let toggle: INavigationToggle = elem;
            let $element: JQuery = toggle.getElement();

            $element.on('click', (event: Event) => {
                this._onClick(event, toggle);
            });
        });
    }
}
