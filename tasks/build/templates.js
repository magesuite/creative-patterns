/*eslint-env node */

import settings from '../../config/build/templates';

/**
 * Compiles template files.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        .pipe( this.gulp.dest( settings.dest ) );
};
