import path from 'path';

/**
 * Returns configuration for copying assets that don't need any processing.
 */
export default {
    watch: [
        // Images
        'packages/*/*/src/**/*.{gif,png,jpg,webp,svg}',
        '!packages/*/*/src/sprites/**/*.{png,svg}',
        // Fonts
        'packages/*/*/src/**/*.{ttf,woff,woff2,eot}',
        // JSON
        'packages/*/*/src/**/*.json',
        '!packages/*/*/src/**/*.data.json',
        // JavaScript and CSS from vendors directory
        'packages/*/*/src/vendors/**/*.{js,css}',
    ],
    /**
     * Generates additional configuration for copying various files based on package's dir.
     * @param {string} packageDir Path to the package directory.
     * @returns {object} Varous files copying task configuration.
     */
    generate: function( packageDir ) {
        return {
            src: [
                // Images
                path.join( packageDir, 'src', '**/*.{gif,png,jpg,webp,svg}' ),
                '!' + path.join( packageDir, 'src/sprites', '**/*.{png,svg}' ),
                // Fonts
                path.join( packageDir, 'src', '**/*.{ttf,woff,woff2,eot}' ),
                // JSON
                path.join( packageDir, 'src', '**/*.json' ),
                '!' + path.join( packageDir, 'src', '**/*.data.json' ),
            ],
            dest: path.join( packageDir, 'dist' ),
        };
    },
};
