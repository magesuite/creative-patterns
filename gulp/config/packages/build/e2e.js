import path from 'path';
import autoprefixer from 'autoprefixer';
import flexbugs from 'postcss-flexbugs-fixes';

/**
 * Returns information for styles building.
 * @returns {object} Styles building task information.
 */
export default {
    watch: [
        'packages/*/*/src/**/*.ts',
    ],
    /**
     * Generates configuration for styles building based on package directory path.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Styles building task configuration.
     */
    generate: function( packageDir ) {
        return {
            src: path.join( packageDir, 'src', 'tests/e2e/**/*.ts' ),
            dest: path.join( packageDir, 'dist', 'tests/e2e' ),
            typescript: {
                sourceMap: true, // (optional) Generates corresponding .map file.
                target: 'es5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
                removeComments: true,
                inlineSourceMap: true,
            },
        };
    },
};
