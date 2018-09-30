const gulp    = require('gulp');
const webpack = require('webpack-stream');
const named   = require('vinyl-named');

gulp.task('scripts', () =>
  gulp.src('src/js/*.js')
    .pipe(webpack({
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },

      mode: 'production'
    }))
    .pipe(named())
    .pipe(gulp.dest('dist/js/'))  
);

gulp.task('default', gulp.parallel('scripts'));