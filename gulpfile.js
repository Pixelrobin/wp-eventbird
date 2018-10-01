const gulp    = require('gulp');
const webpack = require('webpack-stream');
const named   = require('vinyl-named');

gulp.task('scripts', () =>
  gulp.src('src/js/*.js')
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
    .pipe(gulp.dest('dist/js/'))  
);

gulp.task('default', gulp.parallel('scripts'));

gulp.task('dev', gulp.series('scripts', done => {
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
}));