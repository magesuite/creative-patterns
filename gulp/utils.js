import glob from 'glob';
import path from 'path';

/**
 * Converts dash separated string to camelCase format.
 * @param  {string} string Normal space separated string to convert.
 * @return {string}        String converted to camelCase.
 */
export function camelCase( string ) {
    return string.toLowerCase().replace( /-(.)/g, ( match, firstLetter ) =>
        firstLetter.toUpperCase()
    );
}

/**
 * Converts space separated string to dash-case format.
 * @param  {string} string Normal space separated string to convert.
 * @return {string}        String converted to camelCase.
 */
export function dashCase( string ) {
    return string.toLowerCase().replace( /\s+/g, '-' );
}

/**
 * Returns array of paths to packages directories.
 * @return {string[]} Array of paths to packages directories.
 */
export function getPackages() {
    return glob.sync( 'packages/*/*', {} );
}

/**
 * Filters given packages to leave only the ones that contain JavaScript.
 * @param  {[String]} packages Array of paths to packages.
 * @param  {Object} settings Packages settings object.
 * @return {[String]}        Packages that contain JavaScript.
 */
export function filterPackagesWithJs( packages, settings ) {
    return packages.filter( ( packageDir ) => {
        const packageSettings = settings.generate( packageDir );
        return glob.sync( packageSettings.rollup.entry ).length > 0;
    } );
}

/**
 * Filters given packages to leave only a wanted one in collection.
 * @param  {[String]} packages       Array of paths to packages.
 * @param  {String} wantedPackageDir Path to package directory.
 * @return {[String]}                Collection only with wanted package.
 */
export function filterSinglePackage( packages, wantedPackageDir ) {
    return packages.filter( ( packageDir ) => packageDir === path.join( 'packages', wantedPackageDir ) );
}
