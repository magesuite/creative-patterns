/*eslint-env node */
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';

import settings from '../../config/build/images';

/**
 * Loads images from given path, minifies them with imagemin and
 * copies to given path.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        //.pipe( imagemin( settings.imagemin ) )
        .pipe( this.gulp.dest( settings.dest ) );
};
