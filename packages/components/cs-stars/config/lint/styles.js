import reporter from 'postcss-reporter';
import scss from 'postcss-scss';
import stylelint from 'stylelint';

import paths from '../paths.js';
import environment from '../environment';

/**
 * Settingf for SCSS linting task.
 * @type {Object}
 */
export default {
    src: [
        /**
         * Lint all SCSS files.
         */
        paths.src + '**/*.{sass,scss}'
    ],
    postcss: {
        syntax: scss,
        processors: [
            stylelint( { syntax: 'scss' } ),
            reporter( {
                clearMessages: true,
                throwError: environment.production
            } )
        ]
    }
};
