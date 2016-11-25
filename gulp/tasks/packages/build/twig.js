/*eslint-env node */

import path from 'path';
import twig from 'gulp-twig';
import data from 'gulp-data';
import merge from 'merge-stream';
import browserSync from 'browser-sync';
import util from 'gulp-util';

import { getPackages } from '../../../utils';
import environment from '../../../environment';
import settings from '../../../config/packages/build/twig';

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
                'packages:build:twig',
                browserSync.reload,
            ]
        );
    }

    const tasks = packages.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        const packageName = path.basename( packageDir );

        return this.gulp.src( packageSettings.src )
            .pipe( data( ( file ) => {
                /*eslint global-require: 0, prefer-reflect: 0*/
                const template = path.dirname( file.path ) +
                    '/' + path.basename( file.path, 'twig' ) + 'data.json';
                delete require.cache[ template ];
                let data = {};
                try {
                    data = require( template );
                } catch ( error ) {
                    if ( error.code !== 'MODULE_NOT_FOUND' ) {
                        if ( environment.watch ) {
                            util.log( error.message );
                        } else {
                            throw error;
                        }
                    }
                }

                return data;
            } ) )
            .pipe( twig(
                packageSettings.twig
            ) )
            .on( 'error', function( error ) {
                util.log( `Twig templates error in "${packageName}", check your Twigs validity!` );
                if ( environment.watch ) {
                    util.log( error.message );
                    this.emit( 'end' );
                } else {
                    throw error;
                }
            } )
            .pipe( this.gulp.dest( packageSettings.dest ) );
    } );

    return merge( tasks );
};
