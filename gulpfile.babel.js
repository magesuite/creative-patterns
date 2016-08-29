/**
 *  redcoon's Gulp tasker configuration
 */
import gulp from 'gulp';
import sequence from 'run-sequence';
import loadTasks from 'gulp-task-loader';
import path from 'path';

import environment from './gulp/environment';

/**
 * Load tasks from gulp/tasks directory using gulp-task-loader.
 * @see https://github.com/hontas/gulp-task-loader
 */
loadTasks( path.join( 'gulp', 'tasks' ) );


gulp.task( 'build', ( callback ) => {
    sequence(
        [
            'packages:build:styles',
            'packages:build:scripts',
            'packages:build:twig',
            'packages:copy:assets',
            'packages:build:sprites:svg',
        ],
        callback
    );
} );

/**
 *  Task for cleaning and building entire project.
 */
// gulp.task( 'build', ( callback ) => {
//     sequence(
//         'maintain:clean',
//         [
//             'build:library',
//             'build:scripts',
//             'build:styles',
//             'build:templates',
//             // 'build:tests.unit',
//         ],
//         callback
//     );
// } );

/**
 *  Task for cleaning and building entire project.
 */
gulp.task( 'test', ( callback ) => {
    sequence(
        'build',
        [
            'packages:build:unit',
            'packages:build:e2e',
        ],
        'packages:test:unit',
        'packages:test:e2e',
        callback
    );
} );

/**
 *  Task for cleaning and building entire project.
 */
gulp.task( 'serve', ( callback ) => {
    environment.watch = true;
    sequence(
        'build',
        'packages:maintain:serve',
        callback
    );
} );

/**
 *  Default task
 */
gulp.task( 'default', [ 'build' ] );
