import paths from '../paths';

/**
 * Templates compilation task settings.
 */
export default {
    src: paths.src + '**/*.{gif,png,jpg,webp}',
    watch: [
        paths.src + '**/*.{gif,png,jpg,webp}'
    ],
    dest: paths.dist
};
