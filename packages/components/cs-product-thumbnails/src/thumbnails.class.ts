import {IThumbnail} from './thumbnail.class';

interface IThumbnailsSettings {
    thumbnails: IThumbnail[];
}
interface IThumbnails {
    init(): void;
}

class Thumbnails implements IThumbnails {
    private thumbnails: IThumbnail[];

    constructor(settings: IThumbnailsSettings) {
        this.thumbnails = settings.thumbnails;
    }

    public init(): void {
        this._events();
    }

    private _resetSelected(): void {
        $.each(this.thumbnails, function (i: number, elem: IThumbnail): void {
            elem.unSelect();
        });
    }

    private _events(): void {
        for (let i: number = 0; i < this.thumbnails.length; i++) {
            let thumbnail: IThumbnail = this.thumbnails[i];
            let $thumbnail: JQuery = $(thumbnail.getElement());

            $thumbnail.on('click', () => {
                if (!thumbnail.isSelected()) {
                    this._resetSelected();
                    thumbnail.select();
                }

            });
        }
    }
}

export {IThumbnails, Thumbnails};
