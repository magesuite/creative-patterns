/* eslint-env node */
/* eslint no-sync: 0 */

import fse from 'fs-extra';
import paths from './config/paths';

const templatesDir = 'templates/';

module.exports = ( plop ) => {

    // We declare a new generator called "module"
    plop.setGenerator( 'package', {

        // Succintly describes what generator does.
        description: 'Create a new awesome package.',

        // Get inputs from the user.
        // That's Inquirer.js doing the job behind the hood.
        prompts: [
            {
                type: 'list',
                name: 'packageType',
                message: 'What kind of package do you want to create?',
                choices: [
                    {
                        name: 'Component',
                        value: 'component',
                    },
                    {
                        name: 'Customization',
                        value: 'customization',
                    },
                    {
                        name: 'Utility',
                        value: 'utility',
                    },
                ],
            },
            {
                type: 'input',
                name: 'name',
                message: 'What creative name did you invent for your package?',
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
                message: 'Could you give me a simple description of your new package?',
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
                const seedPath = templatesDir + 'component/';
                const newDashName = plop.renderString( '{{ dashCase name }}', answers );
                const componentPath = paths.packages + 'components/' + newDashName + '/';
                fse.copySync( seedPath, componentPath );
                fse.removeSync( componentPath + 'package.json' );
                fse.removeSync( componentPath + 'config/main.js' );
                fse.removeSync( componentPath + 'src/seed.ts' );
                fse.removeSync( componentPath + 'src/seed.scss' );
                fse.removeSync( componentPath + 'src/seed.twig' );
                fse.removeSync( componentPath + 'src/demo/index.twig' );
                fse.emptyDirSync( componentPath + 'src/tests' );

                return 'Generating base component structure.';
            },
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/package.json',
                templateFile: templatesDir + 'component/package.json',
            },
            ( answers ) => plop.renderString( 'Generator will add environment for scripts.\r\nIf you don\'t need them, just delete src/{{ dashCase name }}.ts file and src/tests directory.', answers ),
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/src/{{ dashCase name }}.ts',
                templateFile: templatesDir + 'component/src/seed.ts',
            },
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/src/{{ dashCase name }}.scss',
                templateFile: templatesDir + 'component/src/seed.scss',
            },
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/src/{{ dashCase name }}.twig',
                templateFile: templatesDir + 'component/src/seed.twig',
            },
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/src/tests/unit/{{ dashCase name }}.ts',
                templateFile: templatesDir + 'component/src/tests/unit/seed.ts',
            },
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/src/tests/e2e/{{ dashCase name }}.ts',
                templateFile: templatesDir + 'component/src/tests/e2e/seed.ts',
            },
            {
                type: 'add',
                path: paths.packages + 'components/{{ dashCase name }}/src/demo/index.twig',
                templateFile: templatesDir + 'component/src/demo/index.twig',
            },
        ],
    } );
};
