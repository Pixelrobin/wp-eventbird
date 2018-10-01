const gulp    = require('gulp');
const webpack = require('webpack-stream');
const named   = require('vinyl-named-with-path');
const sass    = require('gulp-sass');

gulp.task('scripts', () =>
  gulp.src('src/**/*.js', { base: './src/' })
    .pipe(named())
    .pipe(webpack({
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  ["@babel/plugin-transform-react-jsx", {
                    "pragma": "wp.element.createElement"
                  }]
                ]
              }
            }
          }
        ]
      },

      mode: 'production'
    }))
    .pipe(gulp.dest('dist/'))  
);

gulp.task('styles', () =>
  gulp.src('src/**/*.scss', { base: './src/' })
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('dist/'))
)

gulp.task('default', gulp.parallel('scripts'));

gulp.task('dev', gulp.series('scripts', done => {
  gulp.watch('src/**/*.js', gulp.series('scripts'));
  gulp.watch('src/**/*.scss', gulp.series('styles'));
}));