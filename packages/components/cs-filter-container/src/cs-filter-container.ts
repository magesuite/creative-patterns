import {FilterContainer, IFilterContainer, IFilterContainerSettings} from './class.cs-filter-container';

let settings: IFilterContainerSettings = {
    component: $('.cs-filter-container'),
    expandedIcon: $('.cs-filter-container__icon--expanded'),
    collapsedIcon: $('.cs-filter-container__icon--collapsed'),
    visibleIconClass: 'cs-filter-container__icon--is-visible',
    filterWrapper: $('.cs-filter-container__filter-wrapper'),
    visibleFilterWrapperClass: 'cs-filter-container__filter-wrapper--is-visible',
    toggleSelector: $('.cs-filter-container__top-bar'),
};

let filterContainer: IFilterContainer = new FilterContainer(settings);

filterContainer.init();

export default filterContainer;
