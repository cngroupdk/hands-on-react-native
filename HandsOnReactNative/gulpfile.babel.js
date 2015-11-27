/* eslint-disable no-undef, no-console */
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import yargs from 'yargs';

const args = yargs
  .alias('f', 'files')
  .argv;

/**
 * Run ESLint on default or selected files
 *
 * @param argv.files File(s) to check (allows multiple -f params)
 */
const runEslint = () => {
  return gulp.src(args.files || [
    'gulpfile.babel.js',
    'index.android.js',
    'index.ios.js',
    'components/**/*.js',
  ])
  .pipe(eslint())
  .pipe(eslint.format());
};

gulp.task('eslint', () => {
  return runEslint();
});

gulp.task('eslint-ci', () => {
  return runEslint().pipe(eslint.failAfterError());
});
