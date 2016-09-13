/* eslint-env node */

import { Server } from 'karma';
import browserSync from 'browser-sync';

import settings from '../../../config/packages/test/unit';
import environment from '../../../environment';

let firstRun = true;

module.exports = function( callback ) {
    if ( firstRun && environment.watch === true ) {
        firstRun = false;
        this.gulp.watch(
            [
                settings.watch,
            ],
            [
                'packages:build:unit',
                browserSync.reload,
            ]
        );
    }

    // Don't break build when not on production environment.
    const done = environment.production ? callback : () => callback();

    new Server( settings.server, done ).start();
};
