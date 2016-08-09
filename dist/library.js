(function () {
    'use strict';

    const packagesList = Vue.extend({
        template: `
        <section calss="cs-packages-list">
            <div class="cs-packages-list__cards" v-show="matchingPackages.length">
                <a class="cs-packages-list__card | cs-component-card" href="#" v-for="singlePackage in matchingPackages">
                    <h2 class="cs-component-card__name">{{ singlePackage.name }}</h2>
                    <p class="cs-component-card__author">{{ singlePackage.author }}</p>
                    <div class="cs-component-card__description">{{ singlePackage.description }}</div>
                    <p class="cs-component-card__version">{{ singlePackage.version }}</p>
                </a>
            </div>
            <h2 class="cs-packages-list__no-packages" v-else>No packages matching the query :-(</h2>
        </section>
    `,
        data: function () {
            return {
                packages: [],
                matchingPackages: []
            };
        },
        methods: {
            filter: function (query) {
                if (!query.length) {
                    this.matchingPackages = this.packages;
                }
                const filteredPackages = [];
                query = query.toLowerCase();
                this.packages.forEach((singlePackage) => {
                    if (singlePackage.name.toLowerCase().indexOf(query) !== -1
                        || singlePackage.description.toLowerCase().indexOf(query) !== -1) {
                        filteredPackages.push(singlePackage);
                    }
                });
                this.matchingPackages = filteredPackages;
            }
        },
        events: {
            'cs-packages-list-filter': function (query) {
                this.filter(query);
            }
        },
        ready: function () {
            $.getJSON('library.json')
                .then((data) => {
                this.matchingPackages = this.packages = data.packages;
            });
        }
    });

    const packagesSearch = Vue.extend({
        template: `
        <form class="cs-packages-search">
            <input class="cs-packages-search__input" type="search" placeholder="Search packages..." v-model="query" @input="search">
        </form>
    `,
        props: {
            min: {
                type: Number,
                default: 0
            }
        },
        data: function () {
            return {
                query: ''
            };
        },
        methods: {
            search: function (event) {
                if (this.query.length >= this.min) {
                    this.$dispatch('cs-package-search-query', this.query);
                }
            }
        }
    });

    const patternLibrary = Vue.extend({
        template: `
        <div class="cs-pattern-library">
            <slot></slot>
        </div>
    `,
        events: {
            'cs-package-search-query': function (query) {
                this.$broadcast('cs-packages-list-filter', query);
            }
        }
    });
    Vue.component('cs-packages-list', packagesList);
    Vue.component('cs-packages-search', packagesSearch);
    Vue.component('cs-pattern-library', patternLibrary);
    new Vue({
        el: 'body'
    });

}());
//# sourceMappingURL=library.js.map
