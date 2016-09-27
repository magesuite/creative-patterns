interface IFilterContainer {
    expand(): void;
    collapse(): void;
    init(): void;
    isExpanded(): boolean;
}

interface IFilterContainerSettings {
    component: JQuery;
    collapsedIcon: JQuery;
    expandedIcon: JQuery;
    visibleIconClass: string;
    filterWrapper: JQuery;
    visibleFilterWrapperClass: string;
    toggleSelector: JQuery;
}

class FilterContainer implements IFilterContainer {
    private settings: IFilterContainerSettings = null;
    private _isExpanded: boolean = true;

    constructor(settings: IFilterContainerSettings) {
        this.settings = settings;
    }

    public expand(): void {
        this._hideIcon(this.settings.collapsedIcon);
        this._showIcon(this.settings.expandedIcon);
        this._expandFilter();
        this._isExpanded = true;
    }

    public collapse(): void {
        this._hideIcon(this.settings.expandedIcon);
        this._showIcon(this.settings.collapsedIcon);
        this._collapseFilter();
        this._isExpanded = false;
    }

    public init(): void {
        this._isExpanded = this._checkIfExpanded();
        this._events();
    }

    public isExpanded(): boolean {
        return this._isExpanded;
    }

    private _checkIfExpanded(): boolean {
        let expandedIconVisible: boolean = this.settings.expandedIcon.hasClass(this.settings.visibleIconClass);
        let filterVisible: boolean = this.settings.filterWrapper.hasClass(this.settings.visibleFilterWrapperClass);

        return (expandedIconVisible && filterVisible) ? true : false;
    }

    private _events(): void {
        this.settings.toggleSelector.on('click', () => {
            this._handleClick();
        });
    }

    private _handleClick(): void {
        if (this._isExpanded) {
            this.collapse();
        } else {
            this.expand();
        }
    }

    private _hideIcon($icon: JQuery): void {
        $icon.removeClass(this.settings.visibleIconClass);
    }

    private _showIcon($icon: JQuery): void {
        $icon.addClass(this.settings.visibleIconClass);
    }

    private _expandFilter(): void {
        this.settings.filterWrapper.addClass(this.settings.visibleFilterWrapperClass);
    }

    private _collapseFilter(): void {
        this.settings.filterWrapper.removeClass(this.settings.visibleFilterWrapperClass);
    }
}

export {IFilterContainer, IFilterContainerSettings, FilterContainer};
