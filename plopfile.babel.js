/* eslint-env node */
/* eslint no-sync: 0 */

import fse from 'fs-extra';
import path from 'path';
import { dashCase } from './gulp/utils';

const templatesDir = 'templates/';
const packagesDir = 'packages/';

module.exports = ( plop ) => {
    // Register our custom cDashCase helper because the default one is handling some cases
    // incorrectly e.g. "M2C Content Constructor" becomes "m-2-c-content-constructor".
    plop.addHelper( 'cDashCase', dashCase );
    // Generator for component package.
    plop.setGenerator( 'Component', {
        // Succintly describes what generator does.
        description: 'Create a new awesome component.',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What creative name did you invent for your component?',
                validate: ( name ) => {
                    const minNameLength = 1;
                    if ( name && name.length >= minNameLength ) {
                        return true;
                    }

                    return 'Come on, I am sure you can come up with a nice, valid name!';
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Could you give me a simple description of your new component?',
            },
        ],
        actions: [
            ( answers ) => {
                const seedPath = path.join( templatesDir, 'package' );
                const newDashName = plop.renderString( '{{ cDashCase name }}', answers );
                const componentPath = path.join( 'packages/components', newDashName );
                fse.copySync( seedPath, componentPath );
                fse.removeSync( path.join( componentPath, 'src/seed.ts' ) );
                fse.removeSync( path.join( componentPath, 'src/seed.scss' ) );
                fse.removeSync( path.join( componentPath, 'src/seed.twig' ) );
                fse.removeSync( path.join( componentPath, 'src/demo/index.twig' ) );

                return 'Generating base package structure.';
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ cDashCase name }}.ts file and src/tests directory.', answers ),
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ cDashCase name }}/src/{{ cDashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ cDashCase name }}/src/{{ cDashCase name }}.scss' ),
                templateFile: path.join( templatesDir, 'package/src/seed.scss' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ cDashCase name }}/src/{{ cDashCase name }}.twig' ),
                templateFile: path.join( templatesDir, 'package/src/seed.twig' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ cDashCase name }}/src/demo/index.twig' ),
                templateFile: path.join( templatesDir, 'package/src/demo/index.twig' ),
            },
        ],
    } );
    // Generator for utility package.
    plop.setGenerator( 'Utility', {
        description: 'Create a new awesome utility.',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What creative name did you invent for your utility?',
                validate: ( name ) => {
                    const minNameLength = 1;
                    if ( name && name.length >= minNameLength ) {
                        return true;
                    }

                    return 'Come on, I am sure you can come up with a nice, valid name!';
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Could you give me a simple description of your new utility?',
            },
        ],
        // List of actions to take.
        // Here we "add" new files from our templates.
        actions: [
            ( answers ) => {
                const seedPath = path.join( templatesDir, 'package' );
                const newDashName = plop.renderString( '{{ cDashCase name }}', answers );
                const packagesPath = path.join( 'packages/utilities', newDashName );
                fse.copySync( seedPath, packagesPath );
                fse.removeSync( path.join( packagesPath, 'src/seed.ts' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.scss' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.twig' ) );
                fse.removeSync( path.join( packagesPath, 'src/demo/index.twig' ) );

                return 'Generating base package structure.';
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ cDashCase name }}.ts file.', answers ),
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ cDashCase name }}/src/{{ cDashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ cDashCase name }}/src/{{ cDashCase name }}.scss' ),
                templateFile: path.join( templatesDir, 'package/src/seed.scss' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ cDashCase name }}/src/{{ cDashCase name }}.twig' ),
                templateFile: path.join( templatesDir, 'package/src/seed.twig' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ cDashCase name }}/src/demo/index.twig' ),
                templateFile: path.join( templatesDir, 'package/src/demo/index.twig' ),
            },
        ],
    } );
    // Generator for customization package.
    plop.setGenerator( 'Customization', {
        description: 'Create a new awesome customization.',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What creative name did you invent for your customization?',
                validate: ( name ) => {
                    const minNameLength = 1;
                    if ( name && name.length >= minNameLength ) {
                        return true;
                    }

                    return 'Come on, I am sure you can come up with a nice, valid name!';
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Could you give me a simple description of your new customization?',
            },
        ],
        // List of actions to take.
        // Here we "add" new files from our templates.
        actions: [
            ( answers ) => {
                const seedPath = path.join( templatesDir, 'package' );
                const newDashName = plop.renderString( '{{ cDashCase name }}', answers );
                const packagesPath = path.join( 'packages/customizations', newDashName );
                fse.copySync( seedPath, packagesPath );
                fse.removeSync( path.join( packagesPath, 'config/main.js' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.ts' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.scss' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.twig' ) );
                fse.removeSync( path.join( packagesPath, 'src/demo/index.twig' ) );

                return 'Generating base package structure.';
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ cDashCase name }}.ts file.', answers ),
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ cDashCase name }}/src/{{ cDashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ cDashCase name }}/src/{{ cDashCase name }}.scss' ),
                templateFile: path.join( templatesDir, 'package/src/seed.scss' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ cDashCase name }}/src/{{ cDashCase name }}.twig' ),
                templateFile: path.join( templatesDir, 'package/src/seed.twig' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ cDashCase name }}/src/demo/index.twig' ),
                templateFile: path.join( templatesDir, 'package/src/demo/index.twig' ),
            },
        ],
    } );
};
