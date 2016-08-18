/*eslint-env node */
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';

import environment from '../../config/environment';
import settings from '../../config/build/vendors';

/**
 * Generates sourcemaps, minifies given files and copies them to destination path.
 * @return {Promise} Promise used to properly time task execution completition
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        .pipe( gulpif( environment.production, uglify() ) )
        .pipe( this.gulp.dest( settings.dest ) );
};
