import paths from '../paths';

import buildScriptsSettings from '../build/scripts';
import buildStylesSettings from '../build/styles';
import buildTplsSettings from '../build/templates';
import buildUnitTestsSettings from '../build/tests.unit';

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
        }
    ]
};

export default settings;
