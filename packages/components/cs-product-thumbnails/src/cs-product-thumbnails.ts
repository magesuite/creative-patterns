import Thumbnail from './thumbnail.class';
import Thumbnails from './thumbnails.class';

//Demo

let thumbnailsArray = [];

$('.cs-product-thumbnails__item').each(function () {
    thumbnailsArray.push(new Thumbnail({
        element: $(this),
        selectedClass: 'cs-product-thumbnails__item--is-selected'
    }));
});

let thumbnailsComponent = new Thumbnails({thumbnails: thumbnailsArray});

thumbnailsComponent.init();

/**
 TODO: Add events or callback?
 If events - on single Thumbnail or parent component?
 Use jQuery events, native js or something else?
 **/