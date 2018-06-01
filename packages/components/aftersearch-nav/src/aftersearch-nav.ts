import $ from 'jquery';
import breakpoint from '../../../utilities/breakpoint/src/breakpoint';

export default class Aftersearch {
    protected _$element: JQuery;
    protected _$container: JQuery;
    protected _$buttonMoreLess: JQuery;
    protected _$showMoreButtonWrapper: JQuery;
    protected _$showMoreButton: JQuery;
    protected _$listOfFilters: JQuery;
    protected _$filtersOptions: JQuery;
    protected _allFiltersVisible: boolean;
    protected _windowWidth: number;
    protected _widthOfElement: number;

    public constructor() {
        this._$buttonMoreLess = $('.cs-aftersearch-nav__show-more-trigger');
        this._$showMoreButtonWrapper = $('.cs-aftersearch-nav__filter--more');
        this._$showMoreButton = $('.cs-aftersearch-nav__show-more-button');
        this._$listOfFilters = $('.cs-aftersearch-nav__filter');
        this._$filtersOptions = $('.cs-filter-horizontal');
        this._allFiltersVisible = false;
        this._windowWidth = $(window).width();
        this._widthOfElement = $(this._$listOfFilters[0]).outerWidth();
        this._attachEvents();
    }

    protected _attachEvents(): void {
        // height of collapsible elements
        if (this._windowWidth >= breakpoint.tablet) {
            $('.cs-aftersearch-nav__filter').on('click', function(
                i: number,
                e: any
            ) {
                const item: JQuery = $(this).find(
                    'div.cs-aftersearch-nav__filter-content'
                );
                if (!item.data('height')) {
                    item.attr('data-height', item.height());
                }
                const itemPosition: any =
                    $(this).offset().top -
                    $(window).scrollTop() +
                    $(this).height();

                const itemOffset: number = $(window).height() - itemPosition;

                // Set minimum height of filter contents to 170 (200 - 30)
                const heightInclMinimal: number = itemOffset > 200 ? itemOffset - 30 : 200;

                if (item.data('height') > itemOffset && heightInclMinimal < item.children().first().height()) {
                    item.height(heightInclMinimal);
                } else {
                    item.height(item.data('height'));
                }
            });
        }

        const noVisibleElements: any[] = [];
        let numberOfElements = 0;

        $.each(this._$listOfFilters, function(i: number, e: any): any {
            if ($(this).css('display') !== 'none') {
                numberOfElements++;
            } else {
                noVisibleElements.push($(this));
            }
        });

        $('.cs-grid-product').on('mouseenter mouseleave', function() {
            const openFilter = $('.cs-aftersearch-nav__filter-content.active');
            if (openFilter.length) {
                const $hoverProductRect = $(this)
                    .get(0)
                    .getBoundingClientRect();
                const $openFilterRect = openFilter
                    .get(0)
                    .getBoundingClientRect();
                const overlap = !(
                    $openFilterRect.right < $hoverProductRect.left ||
                    $openFilterRect.left > $hoverProductRect.right ||
                    $openFilterRect.bottom < $hoverProductRect.top ||
                    $openFilterRect.top > $hoverProductRect.bottom
                );
                if (overlap) {
                    $('#maincontent').css('z-index', 303);
                } else {
                    $('#maincontent').css('z-index', '');
                }
            } else {
                $('#maincontent').css('z-index', '');
            }
        });

        this._$buttonMoreLess.on('click', function() {
            const _$buttonMoreLess: JQuery = $(
                '.cs-aftersearch-nav__show-more-trigger'
            );
            const listOfElements: JQuery = $('.cs-aftersearch-nav__filter-row');
            const listOfFilters: JQuery = $('.cs-aftersearch-nav__filter');
            const openFilter: JQuery = $('.cs-aftersearch-nav__filter-title[aria-expanded="true"]');
            const _$filtersOptions: JQuery = $('.cs-filter-horizontal');
            const _$showMoreButton = $('.cs-aftersearch-nav__show-more-button');
            this._allFiltersVisible = !this._allFiltersVisible;

            if(openFilter.length) {
                openFilter.trigger('click');
            }

            if (this._allFiltersVisible) {
                $.each(noVisibleElements, function(i: number, e: any): any {
                    $(this).css('display', 'block');
                });

                // extreme filters in content
                $.each(listOfElements, function(i: number, e: any): any {
                    let offset: any = $(this).offset().left;
                    if (
                        $(window).width() -
                            offset -
                            2 * $(listOfFilters[0]).outerWidth() <
                        0
                    ) {
                        $(this)
                            .find('.cs-aftersearch-nav__filter-content')
                            .css('left', 'unset')
                            .css('right', '0.5rem');
                    }
                });

                _$buttonMoreLess.text(_$buttonMoreLess.data('hide-text'));
                _$showMoreButton.addClass('show');
            } else {
                $.each(noVisibleElements, function(i: number, e: any): any {
                    $(this).css('display', 'none');
                });
                _$buttonMoreLess.text(_$buttonMoreLess.data('show-text'));
                _$showMoreButton.removeClass('show');
            }
        });
    }
}
