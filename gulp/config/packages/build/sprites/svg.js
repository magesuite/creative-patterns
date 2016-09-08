import path from 'path';

/**
 * Returns configuration for SVG sprites.
 */
export default {
    watch: [
        'packages/*/*/src/sprites/svg/*.svg',
    ],
    /**
     * Generates additional configuration for copying various files based on package's dir.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Varous files copying task configuration.
     */
    generate: function( packageDir ) {
        return {
            src: path.join( packageDir, 'src', 'sprites/svg/*.svg' ),
            dest: path.join( packageDir, 'dist', 'images/' ),
            /**
             * Gulp-svg-sprite configuration.
             * @see https://github.com/jkphl/gulp-svg-sprite#api
             */
            svgSprite: {
                mode: {
                    css: false,
                    view: false,
                    defs: false,
                    symbol: {
                        dest: '',
                        sprite: 'sprites.svg',
                    },
                    stack: false,
                },
            },
        };
    },
};
