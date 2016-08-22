/*eslint-env node */

import path from 'path';

export default {
    server: {
        configFile: path.join( __dirname, '/../../karma.conf.js' ),
        singleRun: true
    }
};
