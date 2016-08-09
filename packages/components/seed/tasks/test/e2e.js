import nightwatch from 'gulp-nightwatch';

import settings from '../../config/test/e2e';

module.exports = function( callback ) {
    return this.gulp.src('')
        .pipe( nightwatch( {
            cliArgs: {
                env: 'default'
            }
        } ) );
};