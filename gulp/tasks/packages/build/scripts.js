/* eslint-env node */
/* eslint no-sync: 0 */
import { rollup } from 'rollup';
import notifier from 'node-notifier';
import glob from 'glob';
import util from 'gulp-util';
import path from 'path';
import browserSync from 'browser-sync';

import { getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/build/scripts';

const packages = getPackages();
let firstRun = true;

/**
 * Returns task function for compiling components' TS files.
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
                'packages:build:scripts',
                browserSync.reload,
            ]
        );
    }

    /**
     * Filter the packages to handle only the ones with existing entry files.
     * @type [String] Paths to packages with entry files.
     */
    const packagesWithJS = packages.filter( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        return glob.sync( packageSettings.rollup.entry ).length > 0;
    } );

    const tasks = packagesWithJS.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        const packageName = path.basename( packageDir );
        if ( util.env.verbose ) {
            util.log( 'Compiling', util.colors.cyan( packageName ), 'scripts...' );
        }

        return rollup( packageSettings.rollup ).then( ( bundle ) =>
            bundle.write( packageSettings.bundle )
        ).catch( ( error ) => {
            notifier.notify( {
                'title': 'JS Error',
                'message': error.message,
            } );

            return Promise.reject( error );
        } );
    } );

    return Promise.all( tasks );
};
