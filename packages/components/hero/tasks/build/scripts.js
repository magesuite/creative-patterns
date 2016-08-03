/*eslint-env node */
import { rollup } from 'rollup';
import notifier from 'node-notifier';

import settings from '../../config/build/scripts';

/**
 * Task for compiling components' TS files.
 * @return {Promise} Promise used to properly time task execution completition
 */
module.exports = function() {
    return rollup( settings.rollup ).then( function( bundle ) {
        return bundle.write( settings.bundle );
    } ).catch( ( error ) => {
        notifier.notify( {
            'title': 'JS Error',
            'message': error.message
        } );

        return Promise.reject( error );
    } );
};
