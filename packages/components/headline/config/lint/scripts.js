import paths from '../paths.js';

/**
 * Settingf for TypeScript linting task.
 * @type {Object}
 */
export default {
    src: [
        /**
         * Lint all TypeScript files.
         */
        paths.src + '**/*.ts'
    ],
};
