/* eslint-env node */
/* eslint no-sync: 0 */
import { rollup } from 'rollup';
import notifier from 'node-notifier';
// import fs from 'fs';
import util from 'gulp-util';
import path from 'path';
import browserSync from 'browser-sync';

import { getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/build/unit';

const packages = getPackages();
let firstRun = true;

/**
 * Returns task function for compiling components' unit tests.
 * @param {Gulp} gulp Gulp instance.
 * @param {object} environment Environment information object.
 * @param {string[]} packages Path to packages' directories.
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
                'packages:build:unit',
                browserSync.reload,
            ]
        );
    }

    const tasks = packages.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        const packageName = path.basename( packageDir );
        if ( util.env.verbose ) {
            util.log( 'Compiling', util.colors.cyan( packageName ), 'unit tests...' );
        }
        // Check if JS entry file exists.
        try {
            // Entry file exists.
            return rollup( packageSettings.rollup ).then( ( bundle ) =>
                bundle.write( packageSettings.bundle )
            ).catch( ( error ) => {
                notifier.notify( {
                    'title': 'JS Error',
                    'message': error.message,
                } );

                return Promise.reject( error );
            } );
        } catch ( e ) {
            // util.log( 'No scripts entry file found. Assuming component has no JavaScript.' );
        }

        return Promise.resolve();
    } );

    return Promise.all( tasks );
};
