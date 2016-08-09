import mainConfig from '../../config/main';

module.exports = function() {
    /**
     * Check configuration.
     */
    if ( !mainConfig.jsExportVariable ) {
        throw new Error( 'Please, provide a javascript export variable name for your component in config/main.js file!' );
    }

    if ( !mainConfig.jsEntryFilename ) {
        throw new Error( 'Please set file name for scrips entry and destination points in config/main.js file.' )
    }
};