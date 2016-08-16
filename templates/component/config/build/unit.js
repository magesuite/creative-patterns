import path from '../paths';
import mainConfig from '../main';

import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import multiEntry from 'rollup-plugin-multi-entry';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

/**
 * Components JS compilation settings.
 */
export default {
    /**
     * Paths to watch for this task.
     */
    watch: [
        path.src + '**/*.ts'
    ],
    /**
     * Rollup configuration.
     * @see https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-
     */
    rollup: {
        entry: path.src + 'tests/unit/**/*.ts',
        plugins: [
            multiEntry(),
            /**
             * Rollup typescript plugin configuration.
             * @see https://github.com/rollup/rollup-plugin-typescript
             */
            typescript( {
                exclude: [
                    'node_modules/**'
                ]
            } ),
            nodeResolve( {
                // use "jsnext:main" if possible
                // – see https://github.com/rollup/rollup/wiki/jsnext:main
                jsnext: true, // Default: false

                // if there's something your bundle requires that you DON'T
                // want to include, add it to 'skip'. Local and relative imports
                // can be skipped by giving the full filepath. E.g.,
                // `path.resolve('src/relative-dependency.js')`
                skip: [] // Default: []
            } ),
            commonjs(),
            replace( {
                'process.env.NODE_ENV': JSON.stringify( 'production' )
            } )
        ]
    },
    bundle: {
        /**
         * JavaScript bundle destination directory.
         */
        dest: path.dist + 'tests/unit/' + mainConfig.jsEntryFilename + '.js',
        format: 'iife',
        moduleName: mainConfig.jsExportVariable,
        globals: {},
        sourceMap: true
    }
};
