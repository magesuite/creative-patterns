//JQuery needed

interface IThumbnailsSettings {
    thumbnails: Object[];
}
interface IThumbnails {
    init(): void;
}

class Thumbnails implements IThumbnails {
    private thumbnails: Array;

    constructor(settings: IThumbnailsSettings) {
        this.thumbnails = settings.thumbnails;
    }

    private _resetSelected() {
        $.each( this.thumbnails, function ( i, elem ) {
            elem.unSelect();
        } );
    }

    private _events() {
        for (let i = 0; i < this.thumbnails.length; i++) {
            let thumbnail = this.thumbnails[i];
            let $thumbnail = $( thumbnail.element );

            $thumbnail.on( 'click', () => {
                if ( !thumbnail.isSelected() ) {
                    this._resetSelected();
                    thumbnail.select();
                }

            });
        }
    }

    public init() {
        this._events();
    }
}

export default Thumbnails;