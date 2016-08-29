import paths from '../paths';

/**
 * Templates compilation task settings.
 */
export default {
    src: paths.src + '**/*.twig',
    watch: [
        paths.src + '**/*.twig',
        paths.src + '**/*.data.json'
    ],
    dest: paths.dist
};
