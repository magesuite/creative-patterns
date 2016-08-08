const packagesSearch: vuejs.VueStatic = Vue.extend( {
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
    data: function(): any {
        return {
            query: ''
        };
    },
    methods: {
        search: function( event: Event ): void {
            if ( this.query.length >= this.min ) {
                this.$dispatch( 'cs-package-search-query', this.query );
            }
        }
    }
} );

export default packagesSearch;
