const packagesList: vuejs.VueStatic = Vue.extend( {
    template: `
        <section calss="cs-packages-list">
            <a class="cs-packages-list__card | cs-component-card" href="#" v-for="singlePackage in matchingPackages">
                <h2 calss="cs-component-card__name">{{ singlePackage.name }}</h2>
                <p class="cs-component-card__author">{{ singlePackage.author }}</p>
                <div class="cs-component-card__description">{{ singlePackage.description }}</div>
                <p class="cs-component-card__version">version {{ singlePackage.version }}</p>
            </a>
        </section>
    `,
    data: function(): any {
        return {
            packages: [],
            matchingPackages: []
        };
    },
    methods: {
        filter: function( query: string ): void {
            if ( !query.length ) {
                this.matchingPackages = this.packages;
            }

            const filteredPackages: any[] = [];
            query = query.toLowerCase();
            this.packages.forEach( ( singlePackage: any ) => {
                if ( singlePackage.name.toLowerCase().indexOf( query ) !== -1
                    || singlePackage.description.toLowerCase().indexOf( query ) !== -1 ) {
                        filteredPackages.push( singlePackage );
                    }
            } );
            this.matchingPackages = filteredPackages;
        }
    },
    events: {
        'cs-packages-list-filter': function( query: string ): void {
            this.filter( query );
        }
    },
    ready: function(): void {
        $.getJSON( 'library.json' )
            .then( ( data: any ) => {
                this.matchingPackages = this.packages = data.packages;
            } );
    }
} );

export default packagesList;
