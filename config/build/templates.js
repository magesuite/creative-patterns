import paths from '../paths';

/**
 * Templates compilation task settings.
 */
export default {
    src: paths.src + '**/*.html',
    watch: [
        paths.src + '**/*.html'
    ],
    dest: paths.dist
};