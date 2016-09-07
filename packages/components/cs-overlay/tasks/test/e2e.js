/*eslint-env node */

import nightwatch from 'gulp-nightwatch';

import settings from '../../config/test/e2e';

module.exports = function() {
    return this.gulp.src( '' )
        .pipe( nightwatch( settings.nightwatch ) );
};
