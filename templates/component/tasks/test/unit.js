import { Server } from 'karma';

import settings from '../../config/test/unit';

module.exports = function( callback ) {
    new Server( settings.server, callback ).start();
};