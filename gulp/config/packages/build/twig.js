import path from 'path';

/**
 * Returns configuration for copying assets that don't need any processing.
 */
export default {
    watch: [
        'packages/*/*/src/**/*.twig',
        'packages/*/*/src/**/*.data.json',
    ],
    /**
     * Generates additional configuration for copying various files based on package's dir.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Varous files copying task configuration.
     */
    generate: function( packageDir ) {
        return {
            src: path.join( packageDir, 'src', '**/*.twig' ),
            dest: path.join( packageDir, 'dist' ),
            twig: {
                errorLogToConsole: true,
                functions: [
                    {
                        /**
                         * Simple asset helper function which returns path inside "dist" directory.
                         * Its purpose is just to allow different backends to implement it with
                         * different paths to assets.
                         * @type {String} Desired path to asset inside "dist" directory.
                         */
                        name: 'asset',
                        func: function( assetPath ) {
                            return assetPath;
                        },
                    },
                ],
            },
        };
    },
};

