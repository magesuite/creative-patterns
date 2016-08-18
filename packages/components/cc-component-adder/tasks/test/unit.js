/* eslint-env node */
import { Server } from 'karma';

import settings from '../../config/test/unit';
import environment from '../../config/environment';

module.exports = function( callback ) {
    // Fail build when tests fail on CI.
    const done = environment.jenkins ? callback : () => callback();

    new Server( settings.server, done ).start();
};
