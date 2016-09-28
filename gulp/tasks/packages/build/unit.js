/* eslint-env node */
/* eslint no-sync: 0 */
import { rollup } from 'rollup';
import notifier from 'node-notifier';

import util from 'gulp-util';
import path from 'path';
import browserSync from 'browser-sync';

import { filterPackagesWithJs, filterSinglePackage, getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/build/unit';

let packages = getPackages();
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

    // Filter the packages to handle only the ones with existing entry files.
    const packagesWithJS = filterPackagesWithJs( packages, settings );

    // If someone specified a certain package than handle only this one.
    const wantedPackageDir = util.env.p || util.env.package;
    if ( wantedPackageDir ) {
        packages = filterSinglePackage( packages, wantedPackageDir );
        if ( packages.length === 0 ) {
            throw new Error( `Cannot find package "${wantedPackageDir}" to test!` );
        }
    }


    /**
     * Prepare tasks for scripts compilation.
     * @type {[Promise]} Array of tasks' promises.
     */
    const tasks = packagesWithJS.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        const packageName = path.basename( packageDir );
        if ( util.env.verbose ) {
            util.log( 'Compiling', util.colors.cyan( packageName ), 'unit tests...' );
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
