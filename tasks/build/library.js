/*eslint-env node */
import fs from 'fs';

import settings from '../../config/build/library';

/**
 * Proccesses package information to only contain needed fields and data.
 * @param  {Object} packageInfo Object containing package.json data.
 * @return {Object}             Proccessed package.json data.
 */
const processPackageInfo = function( packageInfo ) {
    // Delete unwanted fields.
    delete packageInfo.devDependencies;
    delete packageInfo.main;
    delete packageInfo.licence;

    return packageInfo;
}

/**
 * Constructs patter library json data using collected packages information.
 * @return {Promise} Gulp promise for proper task completition timing.
 */
module.exports = function() {
    const rootDir = process.cwd() + '/';
    // Load initial library information.
    const libraryInfo = require( rootDir + settings.src + 'library.json' );

    if( !Array.isArray( libraryInfo.packages ) ) {
        libraryInfo.packages = [];
    }
    // Find all main package directories.
    const categories = fs.readdirSync( settings.packages );
    let packages, packageInfo;
    categories.forEach( ( categoryDir ) => {
        // Find all packages in category.
        packages = fs.readdirSync( settings.packages + categoryDir );
        packages.forEach( ( packageDir ) => {
            try {
                // Load and add package data to library data.
                packageInfo = require( rootDir + settings.packages + categoryDir + '/' + packageDir + '/package.json' );
                libraryInfo.packages.push( processPackageInfo( packageInfo ) );
            } catch( e ) {
                console.error( `Package "${packageDir}" doesn't contain a package.json file.` );
            }
        } );
    } );
    // Write new library data.
    fs.writeFileSync( rootDir + settings.dest + 'library.json', JSON.stringify( libraryInfo, null, 2) );
};
