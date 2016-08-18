/*eslint-env node */

import svgSprite from 'gulp-svg-sprite';

import settings from '../../../config/build/sprites/svg';

/**
 * Generates sprites from all of the svg images from given path.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        .pipe( svgSprite( settings.svgSprite ) )
        .pipe( this.gulp.dest( settings.dest ) );
};
