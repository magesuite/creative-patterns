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
                            'ie >= 9',
                            'ie_mob >= 10',
                            'ff >= 30',
                            'chrome >= 34',
                            'safari >= 7',
                            'opera >= 23',
                            'ios >= 7',
                            'android >= 4.2',
                            'bb >= 10',
                        ],
                    }
                ),
            ],
            sass: {
                precision: 10,
                errLogToConsole: true,
            },
        };
    },
};
