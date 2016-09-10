/* eslint-env node */
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';

import environment from '../../../environment';

/**
 * Settings for SASS linting task.
 */
const settings = {
    src: [
        /**
         * Lint everything inside components and layouts directories.
         */
        'packages/*/*/src/**/*.{css,scss,sass}',
        '!packages/*/*/src/vendors/**/*.{css,scss,sass}',
    ],
    processors: [
        stylelint( { syntax: 'scss' } ),
        reporter( {
            clearMessages: true,
            throwError: !environment.watch,
        } ),
    ],
};

export default settings;
