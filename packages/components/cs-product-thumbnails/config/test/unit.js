/* eslint-env node */

import { Server } from 'karma';

import settings from '../../config/test/unit';
import environment from '../../config/environment';

module.exports = function( callback ) {
    // Don't break build when not on CI environment.
    const done = environment.jenkins ? callback : () => callback();

    new Server( settings.server, done ).start();
};
