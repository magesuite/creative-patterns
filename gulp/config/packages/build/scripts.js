import path from 'path';
import typescript from 'rollup-plugin-typescript';
import html from 'rollup-plugin-html';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import util from 'gulp-util';

import { camelCase } from '../../../utils';

/**
 * Returns information for scripts building.
 */
export default {
    /**
     * Paths to watch for this task.
     */
    watch: [
        'packages/*/*/src/**/*.ts',
        'packages/*/*/src/**/*.{html,tpl}',
    ],
    /**
     * Generates additional configuration for scripts building based on package's dir.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Additional script building task configuration.
     */
    generate: function( packageDir ) {
        const packageName = path.basename( packageDir );
        const packageNameCamelCase = camelCase( packageName );
        // Bundle cache to speed up incremental builds during watch mode.
        let cache;

        return {
            /**
             * Rollup configuration.
             * @see https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-
             */
            rollup: {
                entry: path.join( packageDir, 'src', packageName + '.ts' ),
                cache: cache,
                plugins: [
                    /**
                     * Rollup typescript plugin configuration.
                     * @see https://github.com/rollup/rollup-plugin-typescript
                     */
                    typescript(
                        {
                            exclude: [
                                'node_modules/**',
                            ],
                        }
                    ),
                    commonjs(),
                    globals(),
                    html( {
                        // Required to be specified
                        include: '**/*.{html,tpl}',
                        // htmlMinifierOptions: {
                        //     collapseWhitespace: true,
                        //     conservativeCollapse: true,
                        // },
                    } ),
                ],
                onwarn: ( message ) => {
                    // Log rollup messages only if "--verbose" flag was used.
                    if ( util.env.verbose ) {
                        util.log( message );
                    }
                },
            },
            bundle: {
                /**
                 * JavaScript bundle destination directory.
                 */
                dest: path.join( packageDir, 'dist', packageName + '.js' ),
                format: 'umd',
                moduleName: packageNameCamelCase,
                amd: {
                    id: packageNameCamelCase,
                },
                globals: {
                    'jQuery': 'jQuery',
                    'jquery': 'jQuery',
                    '$': 'jQuery',
                    'Swiper': 'Swiper',
                    'Vue': 'Vue',
                },
                sourceMap: true,
            },
        };
    },
};
