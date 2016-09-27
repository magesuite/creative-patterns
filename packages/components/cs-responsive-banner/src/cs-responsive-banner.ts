import {IResponsiveBanner, ResponsiveBanner} from './class.cs-responsive-banner';

// Demo usage
const $banner: JQuery = $('.cs-responsive-banner');

const banner: IResponsiveBanner = new ResponsiveBanner($banner);

const tabletSrc: string = $banner.attr('data-src-tablet');
const desktopSrc: string = $banner.attr('data-src-desktop');
const mobileSrc: string = $banner.attr('data-src-mobile');

banner.addNewSource('desktop', {
    sourceUrl: desktopSrc,
});

banner.addNewSource('tablet', {
    sourceUrl: tabletSrc,
});

banner.addNewSource('mobile', {
    sourceUrl: mobileSrc,
});

function setSize(width: number): void {
    if (width > 1024) {
        banner.setSize('desktop');
    } else if (width >= 768) {
        banner.setSize('tablet');
    } else {
        banner.setSize('mobile');
    }
}

$(window).on('resize', function(): void {
    let width: number = $(window).width();

    setSize(width);
});

setSize($(window).width());

export default banner;
