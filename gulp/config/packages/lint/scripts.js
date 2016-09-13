import environment from '../../../environment';

/**
 * Settingf for TypeScript linting task.
 * @type {Object}
 */
export default {
    src: [
        /**
         * Lint all TypeScript files.
         */
        'packages/*/*/src/**/*.ts',
    ],
    tslint: {
        formatter: 'verbose',
    },
    tslintReport: {
        emitError: !environment.watch,
        summarizeFailureOutput: true,
    },
};
