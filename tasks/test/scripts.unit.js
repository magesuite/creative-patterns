import { Server } from 'karma';

module.exports = function( callback ) {
    console.log(callback);
    console.log(__dirname);
    new Server( {
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, callback ).start();
};