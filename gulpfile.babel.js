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

/**
 *  Task for cleaning and building entire pattern library.
 */
gulp.task( 'build', ( done ) => {
    sequence(
        [
            'packages:build:styles',
            'packages:build:scripts',
            'packages:build:twig',
            'packages:copy:assets',
            'packages:build:sprites:svg',
        ],
        done
    );
} );

/**
 *  Task for linting entire pattern library.
 */
gulp.task( 'lint', ( done ) => {
    sequence(
        'packages:lint:scripts',
        'packages:lint:styles',
        done
    );
} );

/**
 *  Task for serving files of the pattern library.
 */
gulp.task( 'serve', ( done ) => {
    environment.watch = true;
    sequence(
        'build',
        'packages:maintain:serve',
        done
    );
} );

/**
 * Lint and test code before pushing to main repository.
 */
gulp.task( 'pre-push', ( done ) => {
    // Commenting it until we get some time to fix linting.
    // sequence(
    //     'lint',
    //     done
    // );
    done();
} );

/**
 *  Default task
 */
gulp.task( 'default', [ 'build' ] );
