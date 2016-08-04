/*eslint-env node */
import sourcemaps from 'gulp-sourcemaps';
import notifier from 'node-notifier';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';

import environment from '../../config/environment'
import settings from '../../config/build/styles'


/**
 * Compiles styles with SASS.
 * This function does following things:
 * - Generate sourcemaps,
 * - Compile with SASS,
 * - Autroprefix,
 * - Minify with cleanCSS.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        .pipe( sourcemaps.init() )
        /**
         * Prevent SASS from crashing watch on developement environment.
         */
        .pipe( sass( settings.sass )
            .on( 'error', sass.logError )
            .on( 'error', ( error ) => {
                throw new error;
                notifier.notify( {
                    'title': 'SASS Error',
                    'message': error.messageOriginal
                } );
            } )
        )

        .pipe( postcss( settings.postcss ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( this.gulp.dest( settings.dest ) );
};
