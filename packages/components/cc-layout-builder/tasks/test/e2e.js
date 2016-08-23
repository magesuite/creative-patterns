/*eslint-env node */

import nightwatch from 'gulp-nightwatch';

import settings from '../../config/test/e2e';
import environment from '../../config/environment';

module.exports = function() {
    return this.gulp.src( '' )
    .pipe( nightwatch( settings.nightwatch ) )
        .on( 'error', function() {
            if ( !environment.jenkins ) {
                this.emit( 'end' );
            }
        } );
};
