import { rollup } from 'rollup';
import notifier from 'node-notifier';
import typescript from 'gulp-typescript';

import settings from '../../config/build/e2e';

/**
 * Task for compiling components' TS files.
 * @return {Promise} Promise used to properly time task execution completition
 */
module.exports = function() {
    return this.gulp.src('src/tests/e2e/**/*.ts')
        .pipe( typescript( {
            sourceMap: true, // (optional) Generates corresponding .map file.
            target: 'es5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
            module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
            noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
            noResolve: true, // (optional) Skip resolution and preprocessing.
            removeComments: true,
            inlineSourceMap: true
        } ) )
        .pipe( this.gulp.dest('dist/tests/e2e/') );
};