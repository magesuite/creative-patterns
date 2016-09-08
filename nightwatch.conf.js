/* eslint-env node */
/* eslint camelcase: 0, no-var: 0 */
var glob = require( 'glob' );

var config = {
    'output_folder': false,
    'custom_commands_path': '',
    'custom_assertions_path': '',
    'page_objects_path': '',
    'globals_path': '',

    'selenium': {
        'start_process': false,
        'server_path': '',
        'log_path': '',
        'host': '127.0.0.1',
        'port': 4444,
        'cli_args': {
            'webdriver.chrome.driver': '',
            'webdriver.ie.driver': '',
        },
    },

    'test_settings': {
        'default': {
            'launch_url': 'http://localhost',
            'selenium_port': 4444,
            'selenium_host': 'localhost',
            'silent': true,
            'screenshots': {
                'enabled': false,
                'path': '',
            },
            'desiredCapabilities': {
                'browserName': 'chrome',
                'javascriptEnabled': true,
                'acceptSslCerts': true,
            },
        },

        'firefox': {
            'desiredCapabilities': {
                'browserName': 'firefox',
                'javascriptEnabled': true,
                'acceptSslCerts': true,
            },
        },

        'ie': {
            'desiredCapabilities': {
                'browserName': 'internet explorer',
                'javascriptEnabled': true,
                'acceptSslCerts': true,
            },
        },

        'safari': {
            'desiredCapabilities': {
                'browserName': 'safari',
                'javascriptEnabled': true,
                'acceptSslCerts': true,
            },
        },
    },
};
// Since nightwatch doesn't allow globs in paths to tests we have to take care of
// it ourselves.
config.src_folders = glob.sync( 'packages/*/*/dist/tests/e2e/**/*.js' );

module.exports = config;
