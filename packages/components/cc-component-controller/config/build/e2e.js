import path from '../paths';
import mainConfig from '../main';

import typescript from 'rollup-plugin-typescript';
import multiEntry from 'rollup-plugin-multi-entry';

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
        dest: path.dist + 'tests/unit/' + mainConfig.jsEntryFilename + '.js',
        format: 'iife',
        moduleName: mainConfig.jsExportVariable,
        globals: {},
        sourceMap: true
    }
};
