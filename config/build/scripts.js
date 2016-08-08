import path from '../paths';
import namespace from '../namespace';

import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

/**
 * JavaScript bundle entry and destination filename WITHOUT extension.
 * @type {String}
 */
const filename = 'library';
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
        entry: path.src + filename + '.ts',
        plugins: [
            /**
             * Rollup typescript plugin configuration.
             * @see https://github.com/rollup/rollup-plugin-typescript
             */
            typescript(
                {
                    exclude: [
                        'node_modules/**'
                    ]
                }
            )
        ]
    },
    bundle: {
        /**
         * JavaScript bundle destination directory.
         */
        dest: path.dist + filename + '.js',
        format: 'iife',
        moduleName: namespace.javascript,
        globals: {},
        sourceMap: true
    }
};
