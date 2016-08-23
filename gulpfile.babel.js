/**
 *  redcoon's Gulp tasker configuration
 */
import gulp from 'gulp';
import loadTasks from 'gulp-task-loader';
import sequence from 'run-sequence';

/**
 * Load tasks from gulp/tasks directory using gulp-task-loader.
 * @see https://github.com/hontas/gulp-task-loader
 */
loadTasks( './tasks' );

/**
 *  Task for cleaning and building entire project.
 */
gulp.task( 'build', ( callback ) => {
    sequence(
        'maintain:clean',
        [
            'build:library',
            'build:scripts',
            'build:styles',
            'build:templates',
            // 'build:tests.unit',
        ],
        callback
    );
} );

/**
 *  Task for cleaning and building entire project.
 */
gulp.task( 'test', ( callback ) => {
    sequence(
        'build',
        [
            'test:scripts.unit',
        ],
        callback
    );
} );

/**
 *  Task for cleaning and building entire project.
 */
gulp.task( 'serve', ( callback ) => {
    sequence(
        'build',
        [
            'maintain:serve'
        ],
        callback
    );
} );

/**
 *  Default task
 */
gulp.task( 'default', [ 'build' ] );