/*eslint-env node */

import nightwatch from 'gulp-nightwatch';

import environment from '../../config/environment';
import settings from '../../config/test/e2e';

module.exports = function() {
    return this.gulp.src( '' )
        .pipe( nightwatch( settings.nightwatch ) )
        .on( 'error', function() {
            // Break the build with ugly error on CI environment.
            if ( !environment.jenkins ) {
                this.emit( 'end' );
            }
        } );
};
