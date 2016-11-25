/* eslint no-sync: 0 */

import path from 'path';
import fs from 'fs';

/**
 * Trim template path from possible directory prefix.
 * E.g. "components/foo/bar" -> "foo/bar"
 * @param  {string} packagePath Possibly prefixed dependency path.
 * @return {string}               Trimmed dependency path.
 */
function trimTemplatePath( packagePath ) {
    return packagePath.replace( /^(customizations|components)\//, '' );
}

/**
 * Returns configuration for copying assets that don't need any processing.
 */
export default {
    watch: [
        'packages/*/*/src/**/*.twig',
        'packages/*/*/src/**/*.data.json',
    ],
    /**
     * Generates additional configuration for copying various files based on package's dir.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Varous files copying task configuration.
     */
    generate: function( packageDir ) {
        return {
            src: path.join( packageDir, 'src', '**/*.twig' ),
            dest: path.join( packageDir, 'dist' ),
            twig: {
                base: 'packages',
                errorLogToConsole: true,
                functions: [
                    {
                        name: 'asset',
                        /**
                         * Simple asset helper function which returns path inside "dist" directory.
                         * Its purpose is just to allow different backends to implement it with
                         * different paths to assets.
                         * @param  {string} assetPath Asset path relative to "dist" directory.
                         * @return {string}           Absolute asset path.
                         */
                        func: function( assetPath ) {
                            return path.join(
                                packageDir.replace( 'packages', '' ),
                                'dist/',
                                assetPath
                            );
                        },
                    },
                    {
                        name: 'locate',
                        /**
                         * Helper used for locating components across pattern library.
                         * This helper is implemented to assure PL compatibility with systems that use it,
                         * mainly Magento.
                         * @param  {string} templatePath Name of the component and the template you want to include e.g. component/template.twig.
                         * @return {string}               Absolute path to the template.
                         */
                        func: function( templatePath ) {
                            const componentTypeArray = templatePath.match( /^(components|customizations)/ );
                            // We'll look into components by default.
                            let componentType = 'components';
                            const templateArray = trimTemplatePath( templatePath ).split( /[\\/\\]/ );
                            const componentName = templateArray.shift();
                            const templateFile = templateArray.join( '/' );

                            if ( componentTypeArray !== null ) {
                                // Programmer may have specified type prefix "components" or "customizations" so let's use it instead.
                                componentType = componentTypeArray[ 1 ];
                            } else if ( fs.existsSync( path.join( 'customizations', componentName ) ) ) {
                                // Otherwise if customization exists then return path to it.
                                componentType = 'customizations';
                            }
                            const componentPath = path.join( componentType, componentName, 'src', templateFile );

                            return componentPath;
                        },
                    },
                ],
            },
        };
    },
};
