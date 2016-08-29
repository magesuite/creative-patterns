import paths from '../../paths.js';

/**
 * Settings for SVG sprites.
 */
export default {
    src: paths.src + 'sprites/svg/*.svg',
    watch: [
        paths.src + 'sprites/svg/*.svg'
    ],
    dest: paths.dist + 'images/',
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
                sprite: 'sprites.svg'
            },
            stack: false
        }
    }
};
