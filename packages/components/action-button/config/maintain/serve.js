import buildImagesSettings from '../build/images';
import buildScriptsSettings from '../build/scripts';
import buildStylesSettings from '../build/styles';
import buildTplsSettings from '../build/templates';
import buildUnitTestsSettings from '../build/unit';
import buildVendorsSettings from '../build/vendors';
import buildSpritesSvgSettings from '../build/sprites/svg';

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
            tasks: 'build:unit'
        },
        {
            paths: buildVendorsSettings.watch,
            tasks: 'build:vendors'
        },
        {
            paths: buildSpritesSvgSettings.watch,
            tasks: 'build:sprites:svg'
        }
    ]
};

export default settings;
