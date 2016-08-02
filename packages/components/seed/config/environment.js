import util from 'gulp-util';

/**
 * Module responsible for defining custom environments for project building.
 * You can set them using "--env" option for every task e.g. "gulp compile --env production".
 */

const environment = {
    development: false,
    jenkins: false,
    production: false,
    watch: false
};

switch ( util.env.env ) {
    case 'jenkins':
        environment.jenkins = true;
        environment.production = true;
        break;
    case 'production':
        environment.production = true;
        break;
    default:
        environment.development = true;
}

environment.watch = Boolean( util.env.watch );

export default environment;
