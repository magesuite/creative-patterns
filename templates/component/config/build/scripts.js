import path from '../paths';
import mainConfig from '../main';

import typescript from 'rollup-plugin-typescript';

let cache;

/**
 * Components JS compilation settings.
 */
export default {
    /**
     * Paths to watch for this task.
     */
    watch: [
        path.src + '**/*.ts',
        path.src + '**/*.tpl'
    ],
    /**
     * Rollup configuration.
     * @see https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-
     */
    rollup: {
        entry: path.src + mainConfig.jsEntryFilename + '.ts',
        cache: cache,
        plugins: [
            /**
             * Rollup typescript plugin configuration.
             * @see https://github.com/rollup/rollup-plugin-typescript
             */
            typescript(
                {
                    exclude: [
                        'node_modules/**'
                    ],
                    include: [
                        '../../**/**.ts'
                    ]
                }
            )
        ]
    },
    bundle: {
        /**
         * JavaScript bundle destination directory.
         */
        dest: path.dist + mainConfig.jsEntryFilename + '.js',
        format: 'iife',
        moduleName: mainConfig.jsExportVariable,
        globals: {},
        sourceMap: true
    }
};
