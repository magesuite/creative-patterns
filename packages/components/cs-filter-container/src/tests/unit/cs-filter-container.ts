import $ from '../../../node_modules/jquery/dist/jquery.js';

import {FilterContainer, IFilterContainer, IFilterContainerSettings} from '../../class.cs-filter-container';

describe('Filter container component', function (): void {

    let componentHTML: string = `<div class=" cs-filter-container">
<div class="cs-filter-container__top-bar">
<span class="cs-filter-container__label">Farbe</span>
<div class="cs-filter-container__toggle">
</div>
</div>
<div class="cs-filter-container__filter-wrapper cs-filter-container__filter-wrapper--is-visible ">
<ul class="cs-filter-container__filter ">
</ul></div>
</div>`;

    let filterContainer: IFilterContainer = null;

    beforeEach(function (): void {
        $('body').append(componentHTML);

        let settings: IFilterContainerSettings = {
            component: $('.cs-filter-container'),
            expandedIcon: $('.cs-filter-container__icon--expanded'),
            collapsedIcon: $('.cs-filter-container__icon--collapsed'),
            visibleIconClass: 'cs-filter-container__icon--is-visible',
            filterWrapper: $('.cs-filter-container__filter-wrapper'),
            visibleFilterWrapperClass: 'cs-filter-container__filter-wrapper--is-visible',
            toggleSelector: $('.cs-filter-container__top-bar'),
        };

        filterContainer = new FilterContainer(settings);
    });

    it('has expand() method', function (): void {
        expect(typeof filterContainer.expand).toBe('function');
    });

    it('has collapse() method', function (): void {
        expect(typeof filterContainer.collapse).toBe('function');

    });

    it('has init() method', function (): void {
        expect(typeof filterContainer.init).toBe('function');

    });

    it('has isExpanded() method', function (): void {
        expect(typeof filterContainer.isExpanded).toBe('function');

    });

    it('isExpanded method returns true/false', function (): void {
        expect(filterContainer.isExpanded()).toMatch(/true|false/);
    });

    it('isExpanded method should be true after expand() method', function (): void {
        filterContainer.expand();
        expect(filterContainer.isExpanded()).toBeTruthy();
    });

    it('isExpanded method should be false after collapse() method', function (): void {
        filterContainer.collapse();
        expect(filterContainer.isExpanded()).toBeFalsy();
    });

    it('Filter container should be hidden after collapse() method', function (): void {
        let $container: JQuery = $('.cs-filter-container__filter-wrapper');

        filterContainer.collapse();
        expect($container.is(':hidden'));
    });

    it('Filter container should be visible after expand() method', function (): void {
        let $container: JQuery = $('.cs-filter-container__filter-wrapper');

        filterContainer.expand();
        expect($container.is(':visible'));
    });
});
