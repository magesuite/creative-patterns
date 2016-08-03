import paths from '../paths';

import buildImagesSettings from '../build/images';
import buildScriptsSettings from '../build/scripts';
import buildStylesSettings from '../build/styles';
import buildTplsSettings from '../build/templates';
import buildUnitTestsSettings from '../build/tests.unit';
import buildVendorsSettings from '../build/vendors';

const settings = {
    /**
     * BrowserSync configuration.
     */
    browserSync: {
        port: 9000,
        server: {
            baseDir: [ 'dist' ],
            directory: true
        }
    },
    watches: [
        {
            paths: buildImagesSettings.watch,
            tasks: 'build:images'
        },
        {
            paths: buildScriptsSettings.watch,
            tasks: 'build:scripts'
        },
        {
            paths: buildStylesSettings.watch,
            tasks: 'build:styles'
        },
        {
            paths: buildTplsSettings.watch,
            tasks: 'build:templates'
        },
        {
            paths: buildUnitTestsSettings.watch,
            tasks: 'build:tests.unit'
        },
        {
            paths: buildVendorsSettings.watch,
            tasks: 'build:vendors'
        }
    ]
};

export default settings;
