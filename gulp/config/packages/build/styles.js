import path from 'path';
import autoprefixer from 'autoprefixer';
import flexbugs from 'postcss-flexbugs-fixes';

/**
 * Returns information for styles building.
 * @returns {object} Styles building task information.
 */
export default {
    watch: [
        'packages/*/*/src/**/*.{scss,sass,css}',
    ],
    /**
     * Generates configuration for styles building based on package directory path.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Styles building task configuration.
     */
    generate: function( packageDir ) {
        return {
            src: path.join( packageDir, 'src', '**/*.{css,scss,sass}' ),
            dest: path.join( packageDir, 'dist' ),
            postcss: [
                flexbugs(),
                autoprefixer(
                    {
                        browsers: [
                            'IE>=10',
                            '>1%',
                            'last 2 versions',
                        ],
                    }
                ),
            ],
            cleancss: {},
            sass: {
                precision: 10,
                errLogToConsole: true,
                includePaths: [
                    path.resolve( 'src' ),
                    path.resolve( 'node_modules' ),
                ],
            },
        };
    },
};
