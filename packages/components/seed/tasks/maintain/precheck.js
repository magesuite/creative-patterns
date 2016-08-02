import namespace from '../../config/namespace';

module.exports = function() {
    /**
     * Check namespace configuration.
     */
    if ( !namespace.name ) {
        throw new Error( 'Please, provide a name for your component in namespace.js file!' );
    }
    if ( !namespace.javascript ) {
        throw new Error( 'Please, provide a javascript variable name for your component in namespace.js file!' );
    }
};