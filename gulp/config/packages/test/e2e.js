/*eslint-env node */

/**
 * Returns configuration for scripts e2e tests running.
 */
export default {
    /**
     * Paths to watch for this task.
     */
    watch: [
        'packages/*/*/src/**/*.ts',
        'packages/*/*/src/**/*.{html,tpl}',
    ],
    // Gulp-nightwatch configuration.
    nightwatch: {
        configFile: 'nightwatch.conf.js',
    },
};
