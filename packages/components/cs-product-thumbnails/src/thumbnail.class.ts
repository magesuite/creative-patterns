interface IThumbnailSettings {
    element: JQuery;
    selectedClass: string;
}

interface IThumbnail {
    select(): void;
    unSelect(): void;
    isSelected(): boolean;
    getElement(): JQuery;
}

class Thumbnail implements IThumbnail {
    private selected: boolean = false;
    private element: JQuery;
    private selectedClass: string;

    constructor(settings: IThumbnailSettings) {
        this.element = settings.element;
        this.selectedClass = settings.selectedClass;

        this.selected = this._detectIfSelected();
    }

    public select(): void {
        this.element.addClass(this.selectedClass);
        this.selected = true;

        this.element.trigger('thumbnail:select');
    }

    public unSelect(): void {
        this.element.removeClass(this.selectedClass);
        this.selected = false;
    }

    public isSelected(): boolean {
        return this.selected;
    }

    public getElement(): JQuery {
        return this.element;
    }

    private _detectIfSelected(): boolean {
        return this.element.hasClass(this.selectedClass) ? true : false;
    }
}

export {Thumbnail};
export {IThumbnail};
