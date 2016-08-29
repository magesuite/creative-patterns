/*eslint-env node */

import typescript from 'gulp-typescript';
import merge from 'merge-stream';
import browserSync from 'browser-sync';

import { getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/build/e2e';

const packages = getPackages();
let firstRun = true;

module.exports = function() {
    if ( firstRun && environment.watch === true ) {
        firstRun = false;
        this.gulp.watch(
            [
                settings.watch,
            ],
            [
                'packages:build:e2e',
                browserSync.reload,
            ]
        );
    }

    const tasks = packages.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );

        return this.gulp.src( packageSettings.src )
            .pipe( typescript( packageSettings.typescript ) )
            .pipe( this.gulp.dest( packageSettings.dest ) );
    } );

    return merge( tasks );
};

