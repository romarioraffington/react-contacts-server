const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

// TypeScript
gulp.task('scripts', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

// Assets 
gulp.task('assets', function() {
  return gulp.src('src/public/images/*')
  .pipe(gulp.dest('dist/public'));
});

// Key 
gulp.task('config', function() {
  return gulp.src('src/config/firebaseKey.json')
  .pipe(gulp.dest('dist/config'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('development', ['watch', 'assets']);
gulp.task('default', ['scripts', 'assets', 'config']);