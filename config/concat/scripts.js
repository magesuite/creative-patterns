import paths from '../paths';

/**
 * Templates compilation task settings.
 */
export default {
    src: [
        paths.src + 'vendors/**/*.js',
        'node_modules/'
    ],
    watch: [
        paths.src + 'vendors/**/*.js'
    ],
    dest: paths.dist + 'vendors/'
};