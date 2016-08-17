import path from '../paths';

import clean from 'postcss-clean';
import autoprefixer from 'autoprefixer';
import flexbugs from 'postcss-flexbugs-fixes';

/**
 * SASS compilation settings.
 */
export default {
    watch: [
        path.src + '**/*.{css,scss,sass}'
    ],
    src: path.src + '**/*.{css,scss,sass}',
    dest: path.dist,
    postcss: [
        flexbugs(),
        autoprefixer(
            {
                browsers: [
                    'ie >= 9',
                    'ie_mob >= 10',
                    'ff >= 30',
                    'chrome >= 34',
                    'safari >= 7',
                    'opera >= 23',
                    'ios >= 7',
                    'android >= 4.2',
                    'bb >= 10'
                ]
            }
        ),
        clean()
    ],
    sass: {
        precision: 10,
        errLogToConsole: true
    }
};
