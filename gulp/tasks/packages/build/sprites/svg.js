/*eslint-env node */

import merge from 'merge-stream';
import browserSync from 'browser-sync';
import svgSprite from 'gulp-svg-sprite';
import util from 'gulp-util';
import path from 'path';

import { getPackages } from '../../../../utils';
import environment from '../../../../environment';
import settings from '../../../../config/packages/build/sprites/svg';

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
                'packages:build:sprites:svg',
                browserSync.reload,
            ]
        );
    }

    const tasks = packages.map( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        const packageName = path.basename( packageDir );

        return this.gulp.src( packageSettings.src )
            .pipe( svgSprite( packageSettings.svgSprite ) )
            .on( 'error', function( error ) {
                util.log( `SVG sprites error in "${packageName}", check your SVGs validity!` );
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

