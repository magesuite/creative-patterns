/*eslint-env node */
import postcss from 'gulp-postcss';

import settings from '../../config/lint/styles';

/**
 * Lints given files with lint SASS.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    return this.gulp.src( settings.src )
        .pipe( postcss(
            settings.postcss.processors,
            {
                syntax: settings.postcss.syntax
            }
        ) );
};
