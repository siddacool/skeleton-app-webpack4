const gulp = require('gulp');
const rename = require('gulp-rename');
const path = require('path');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');

gulp.task('svg-make', () => {
  return gulp
    .src('./svg-sprites/*.svg')
    .pipe(svgmin((file) => {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: `${prefix}-`,
            minify: true,
          },
        }],
      };
    }))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgstore())
    .pipe(gulp.dest('./src/'));
});
