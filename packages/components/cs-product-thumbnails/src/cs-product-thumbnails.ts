import {IThumbnail, Thumbnail} from './thumbnail.class';
import {IThumbnails, Thumbnails} from './thumbnails.class';

// Demo

let thumbnailsArray: IThumbnail[] = [];

$('.cs-product-thumbnails__item').each(function (): void {
    thumbnailsArray.push(new Thumbnail({
        element: $(this),
        selectedClass: 'cs-product-thumbnails__item--is-selected',
    }));
});

let thumbnailsComponent: IThumbnails = new Thumbnails({thumbnails: thumbnailsArray});

thumbnailsComponent.init();

/*
 TODO: Add events or callback?
 If events - on single Thumbnail or parent component?
 Use jQuery events, native js or something else?
 */

export default thumbnailsComponent;
