import glob from 'glob';

/**
 * Converts space separated string to camelCase format.
 * @param  {string} string Normal space separated string to convert.
 * @return {string}        String converted to camelCase.
 */
export function camelCase( string ) {
    return string.toLowerCase().replace( /-(.)/g, ( match, firstLetter ) =>
        firstLetter.toUpperCase()
    );
}

/**
 * Returns array of paths to packages directories.
 * @return {string[]} Array of paths to packages directories.
 */
export function getPackages() {
    return glob.sync( 'packages/*/*', {} );
}
