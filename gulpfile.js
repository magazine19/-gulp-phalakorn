const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
//const webserver = require('gulp-webserver')
const babel = require('gulp-babel')

gulp.task('sass', function(){
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass_watch',  function(){
  gulp.watch('./src/css/**/*.scss', ['sass']); 
  // Other watchers
});

gulp.task('html', function(){
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html_watch',  function(){
  gulp.watch('./src/**/*.html', ['html']); 
  // Other watchers
}) ;

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('script', function(){
   return gulp.src( './src/js/**/*.js' )
      .pipe(babel({presets: ['@babel/preset-env']}))
      .pipe(gulp.dest('./dist/js'))
     .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('script_watch', function(){
  gulp.watch('./src/js/**/*.js', ['script']); 
  // Other watchers
});

gulp.task('browserSync', function() {
  browserSync.init({
  	files: ['dist/**'],
    serveStatic: ['dist'],
    server: {
      baseDir: 'src'
    },
  })
});



gulp.task('default', ['sass','script'], function () {
  gulp.start('sass_watch')
  gulp.start('script_watch')
  gulp.start('html_watch')
  gulp.start('images')
  gulp.start('browserSync')
})


// gulp.task('webserver', function () {
//    gulp.src('dist')
//     .pipe(webserver({
//       livereload: true,
//       open: true
//     }))
// })

gulp.task('build', ['sass','script'], function () {
  process.exit()
})