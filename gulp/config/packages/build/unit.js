import path from 'path';

import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import multiEntry from 'rollup-plugin-multi-entry';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-html';
import replace from 'rollup-plugin-replace';

import { camelCase } from '../../../utils';

/**
 * Returns configuration for scripts unit tests building.
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
     * Generates additional configuration for unit tests building based on package's dir.
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
                entry: path.join( packageDir, 'src/tests/unit/**/*.ts' ),
                cache: cache,
                plugins: [
                    multiEntry(),
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
                    nodeResolve( {
                        // use "jsnext:main" if possible
                        // – see https://github.com/rollup/rollup/wiki/jsnext:main
                        jsnext: true, // Default: false

                        // if there's something your bundle requires that you DON'T
                        // want to include, add it to 'skip'. Local and relative imports
                        // can be skipped by giving the full filepath. E.g.,
                        // `path.resolve('src/relative-dependency.js')`
                        skip: [
                            'jQuery',
                        ],
                    } ),
                    replace( {
                        'process.env.NODE_ENV': JSON.stringify( 'production' ),
                    } ),
                    commonjs(),
                    html( {
                        // Required to be specified
                        include: '**/*.{html,tpl}',
                        htmlMinifierOptions: {
                            collapseWhitespace: true,
                            conservativeCollapse: true,
                        },
                    } ),
                ],
            },
            bundle: {
                /**
                 * JavaScript bundle destination directory.
                 */
                dest: path.join( packageDir, 'dist/tests/unit', packageName + '.js' ),
                format: 'iife',
                moduleName: packageNameCamelCase,
                globals: {
                    'jQuery': 'jQuery',
                    '$': 'jQuery',
                    'Swiper': 'Swiper',
                    'Vue': 'Vue',
                },
                exports: 'named',
                sourceMap: true,
            },
        };
    },
};
