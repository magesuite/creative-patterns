/* eslint-env node */
import sourcemaps from 'gulp-sourcemaps';
import notifier from 'node-notifier';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import merge from 'merge-stream';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import cleanCSS from 'gulp-clean-css';

import { getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/build/styles';

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
                'packages:build:styles',
                browserSync.reload,
            ]
        );
    }

    const tasks = packages.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );

        return this.gulp.src( packageSettings.src )
            .pipe( gulpif( !environment.production, sourcemaps.init() ) )
            .pipe( sass( packageSettings.sass )
                .on( 'error', sass.logError )
                .on( 'error', ( error ) => {
                    notifier.notify( {
                        'title': 'Sass error in file:',
                        'message': error.relativePath,
                    } );
                    // Throw error only when not during watch mode.
                    if ( !environment.watch ) {
                        throw error;
                    }
                } )
            )
            .pipe( postcss( packageSettings.postcss, { grid: false } ) )
            .pipe( gulpif( environment.production, cleanCSS( settings.cleancss ) ) )
            .pipe( gulpif( !environment.production, sourcemaps.write( '.' ) ) )
            .pipe( this.gulp.dest( packageSettings.dest ) );
    } );

    return merge( tasks );
};
