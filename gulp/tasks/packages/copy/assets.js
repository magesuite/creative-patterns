/* eslint-env node */
import browserSync from 'browser-sync';
import merge from 'merge-stream';

import { getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/copy/assets';

const packages = getPackages();
let firstRun = true;

/**
 * Returns task function for compiling components' Sass files.
 * This function does following things:
 * - Generate sourcemaps,
 * - Compile with SASS,
 * - Autroprefix,
 * - Minify with cleanCSS.
 *
 * @param {Gulp} gulp Gulp instance.
 * @param {object} environment Environment information object.
 * @param {string[]} packages Array of packages' paths.
 * @return {Promise} Promise used to properly time task execution completition.
 */
module.exports = function() {
    if ( firstRun && environment.watch === true ) {
        firstRun = false;
        this.gulp.watch(
            [
                settings.watch,
            ],
            [
                'packages:copy:assets',
                browserSync.reload,
            ]
        );
    }

    const tasks = packages.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );

        return this.gulp.src( packageSettings.src )
            .pipe( this.gulp.dest( packageSettings.dest ) );
    } );

    return merge( tasks );
};
