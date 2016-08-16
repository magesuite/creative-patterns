/*eslint-env node */
import path from 'path';
import twig from 'gulp-twig';
import data from 'gulp-data';

import settings from '../../config/build/templates';

/**
 * Compiles template files.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        .pipe( data( ( file ) => {
            /*eslint global-require: 0, prefer-reflect: 0*/
            const template = path.dirname( file.path ) +
                '/' + path.basename( file.path, 'twig' ) + 'data.json';
            delete require.cache[ template ];
            // Assigning this to variable seems to fix invisible changes issue.
            let data = {};
            try {
                data = require( template );
            } catch ( e ) {
                // Packaga doesn't have package.json file.
            }

            return data;
        } ) )
        .pipe( twig() )
        .pipe( this.gulp.dest( settings.dest ) );
};
