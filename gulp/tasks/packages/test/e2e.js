/*eslint-env node */

import nightwatch from 'gulp-nightwatch';

import settings from '../../../config/packages/test/e2e';
import environment from '../../../environment';

module.exports = function() {
    return this.gulp.src( '' )
        .pipe( nightwatch( settings.nightwatch ) )
        .on( 'error', function() {
            if ( !environment.production ) {
                this.emit( 'end' );
            }
        } );
};
