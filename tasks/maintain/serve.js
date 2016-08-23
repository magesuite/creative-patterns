/*eslint-env node */
import browserSync from 'browser-sync';
import settings from '../../config/maintain/serve';

/**
 * Serves project files using provided BrowserSync config.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    settings.watches.forEach( ( watch ) => {
        this.gulp.watch(
            [
                watch.paths
            ],
            [
                watch.tasks,
                browserSync.reload
            ]
        );
    } );

    /*eslint no-sync: 0*/
    browserSync.init( settings.browserSync );
};
