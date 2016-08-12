/* eslint-env node */
/* eslint no-sync: 0 */
import fs from 'fs';
import { rollup } from 'rollup';
import notifier from 'node-notifier';
import util from 'gulp-util';

import settings from '../../config/build/scripts';

/**
 * Task for compiling components' TS files.
 * @return {Promise} Promise used to properly time task execution completition
 */
module.exports = function() {
    // Check if JS entry file exists.
    try {
        fs.accessSync( settings.rollup.entry, fs.F_OK );
        // Entry file exists.
        return rollup( settings.rollup ).then( ( bundle ) =>
            bundle.write( settings.bundle )
        ).catch( ( error ) => {
            notifier.notify( {
                'title': 'JS Error',
                'message': error.message
            } );

            return Promise.reject( error );
        } );
    } catch ( e ) {
        util.log( 'No scripts entry file found. Assuming component has no JavaScript.' );
    }
};
