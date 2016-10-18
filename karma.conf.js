/* eslint-env node */
/* eslint no-var: 0 */

var environment = require( './gulp/environment' ).default;

// Karma configuration
// Generated on Tue Aug 02 2016 10:55:56 GMT+0200 (CEST)
module.exports = function( config ) {
    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine',
        ],

        plugins: [
            'karma-spec-reporter',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
        ],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'packages/*/*/dist/tests/unit/*.js',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'spec',
        ],

        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: true,  // do not print information about passed tests
            suppressSkipped: false,  // do not print information about skipped tests
            showSpecTiming: false, // print the time elapsed for each spec
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: environment.watch,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: environment.ci ? [ 'PhantomJS' ] : [ 'Firefox' ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: !environment.watch,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    } );
};
