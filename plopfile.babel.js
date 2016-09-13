/* eslint-env node */
/* eslint no-sync: 0 */

import fse from 'fs-extra';
import path from 'path';

const templatesDir = 'templates/';
const packagesDir = 'packages/';

module.exports = ( plop ) => {
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
            {
                type: 'input',
                name: 'author',
                message: 'And what is the author\'s full name?',
            },
        ],
        actions: [
            ( answers ) => {
                const seedPath = path.join( templatesDir, 'package' );
                const newDashName = plop.renderString( '{{ dashCase name }}', answers );
                const componentPath = path.join( 'packages/components', newDashName );
                fse.copySync( seedPath, componentPath );
                fse.removeSync( path.join( componentPath, 'package.json' ) );
                fse.removeSync( path.join( componentPath, 'config/main.js' ) );
                fse.removeSync( path.join( componentPath, 'src/seed.ts' ) );
                fse.removeSync( path.join( componentPath, 'src/seed.scss' ) );
                fse.removeSync( path.join( componentPath, 'src/seed.twig' ) );
                fse.removeSync( path.join( componentPath, 'src/demo/index.twig' ) );
                fse.emptyDirSync( path.join( componentPath, 'src/tests' ) );

                return 'Generating base package structure.';
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/package.json' ),
                templateFile: path.join( templatesDir, 'package/package.json' ),
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ dashCase name }}.ts file and src/tests directory.', answers ),
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/src/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/src/{{ dashCase name }}.scss' ),
                templateFile: path.join( templatesDir, 'package/src/seed.scss' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/src/{{ dashCase name }}.twig' ),
                templateFile: path.join( templatesDir, 'package/src/seed.twig' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/src/tests/unit/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/tests/unit/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/src/tests/e2e/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/tests/e2e/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'components/{{ dashCase name }}/src/demo/index.twig' ),
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
            {
                type: 'input',
                name: 'author',
                message: 'And what is the author\'s full name?',
            },
        ],
        // List of actions to take.
        // Here we "add" new files from our templates.
        actions: [
            ( answers ) => {
                const seedPath = path.join( templatesDir, 'package' );
                const newDashName = plop.renderString( '{{ dashCase name }}', answers );
                const packagesPath = path.join( 'packages/utilities', newDashName );
                fse.copySync( seedPath, packagesPath );
                fse.removeSync( path.join( packagesPath, 'package.json' ) );
                fse.removeSync( path.join( packagesPath, 'config/main.js' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.ts' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.scss' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.twig' ) );
                fse.removeSync( path.join( packagesPath, 'src/demo/index.twig' ) );
                fse.emptyDirSync( path.join( packagesPath, 'src/tests' ) );

                return 'Generating base package structure.';
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/package.json' ),
                templateFile: path.join( templatesDir, 'package/package.json' ),
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ dashCase name }}.ts file and src/tests directory.', answers ),
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/src/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/src/{{ dashCase name }}.scss' ),
                templateFile: path.join( templatesDir, 'package/src/seed.scss' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/src/{{ dashCase name }}.twig' ),
                templateFile: path.join( templatesDir, 'package/src/seed.twig' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/src/tests/unit/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/tests/unit/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/src/tests/e2e/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/tests/e2e/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'utilities/{{ dashCase name }}/src/demo/index.twig' ),
                templateFile: path.join( templatesDir, 'package/src/demo/index.twig' ),
            },
        ],
    } );
    // Generator for customization package.
    plop.setGenerator( 'Utility', {
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
            {
                type: 'input',
                name: 'author',
                message: 'And what is the author\'s full name?',
            },
        ],
        // List of actions to take.
        // Here we "add" new files from our templates.
        actions: [
            ( answers ) => {
                const seedPath = path.join( templatesDir, 'package' );
                const newDashName = plop.renderString( '{{ dashCase name }}', answers );
                const packagesPath = path.join( 'packages/customizations', newDashName );
                fse.copySync( seedPath, packagesPath );
                fse.removeSync( path.join( packagesPath, 'package.json' ) );
                fse.removeSync( path.join( packagesPath, 'config/main.js' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.ts' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.scss' ) );
                fse.removeSync( path.join( packagesPath, 'src/seed.twig' ) );
                fse.removeSync( path.join( packagesPath, 'src/demo/index.twig' ) );
                fse.emptyDirSync( path.join( packagesPath, 'src/tests' ) );

                return 'Generating base package structure.';
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/package.json' ),
                templateFile: path.join( templatesDir, 'package/package.json' ),
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ dashCase name }}.ts file and src/tests directory.', answers ),
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/src/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/src/{{ dashCase name }}.scss' ),
                templateFile: path.join( templatesDir, 'package/src/seed.scss' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/src/{{ dashCase name }}.twig' ),
                templateFile: path.join( templatesDir, 'package/src/seed.twig' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/src/tests/unit/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/tests/unit/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/src/tests/e2e/{{ dashCase name }}.ts' ),
                templateFile: path.join( templatesDir, 'package/src/tests/e2e/seed.ts' ),
            },
            {
                type: 'add',
                path: path.join( packagesDir, 'customizations/{{ dashCase name }}/src/demo/index.twig' ),
                templateFile: path.join( templatesDir, 'package/src/demo/index.twig' ),
            },
        ],
    } );
};
