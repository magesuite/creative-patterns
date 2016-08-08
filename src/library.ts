import packagesList from './components/packages-list/packages-list';
import packagesSearch from './components/packages-search/packages-search';


const patternLibrary: vuejs.VueStatic = Vue.extend( {
    template: `
        <div class="cs-pattern-library">
            <slot></slot>
        </div>
    `,
    events: {
        'cs-package-search-query': function ( query: string ): void {
            this.$broadcast( 'cs-packages-list-filter', query );
        }
    }
} );

Vue.component( 'cs-packages-list', packagesList );
Vue.component( 'cs-packages-search', packagesSearch );
Vue.component( 'cs-pattern-library', patternLibrary );

new Vue( {
  el: 'body'
} );
