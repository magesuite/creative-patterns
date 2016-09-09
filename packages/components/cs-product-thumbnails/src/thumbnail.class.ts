//JQuery needed

interface IThumbnailSettings {
    element: JQuery;
    selectedClass: string;
}

interface IThumbnail {
    select(): void;
    unSelect(): void;
    isSelected(): boolean;
}

class Thumbnail implements IThumbnail {
    private selected: boolean = false;
    private element: JQuery;
    private selectedClass: string;

    constructor( settings: IThumbnailSettings ) {
        this.element = settings.element;
        this.selectedClass = settings.selectedClass;

        this.selected = this._detectIfSelected();
    }

    private _detectIfSelected() {
        return this.element.hasClass(this.selectedClass) ? true : false;
    }

    public select() {
        this.element.addClass( this.selectedClass );
        this.selected = true;

        this.element.trigger( 'thumbnail:select' );
    }

    public unSelect() {
        this.element.removeClass( this.selectedClass );
        this.selected = false;
    }

    public isSelected() {
        return this.selected;
    }
}

export default Thumbnail;
