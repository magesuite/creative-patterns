/*eslint-env node */

import path from 'path';

import environment from '../../../environment';

/**
 * Returns configuration for scripts unit tests building.
 */
export default {
    /**
     * Paths to watch for this task.
     */
    watch: [
        'packages/*/*/src/**/*.ts',
        'packages/*/*/src/**/*.{html,tpl}',
    ],
    server: {
        configFile: path.resolve( 'karma.conf.js' ),
        singleRun: !environment.watch,
    },
};
