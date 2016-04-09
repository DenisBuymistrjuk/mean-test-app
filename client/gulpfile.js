'use strict';

var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber    = require('gulp-plumber'),
    less       = require('gulp-less'),
    minifyCSS  = require('gulp-minify-css'),
    inject     = require('gulp-inject'),
    rename     = require('gulp-rename'),
    connect    = require('gulp-connect'),
    ngFileSort = require('gulp-angular-filesort'),
    bowerFiles = require('main-bower-files'),
    es         = require('event-stream');


gulp.task('default', ['js', 'less', 'inject-dev', 'run-dev', 'watch']);

gulp.task('before-prod', ['js', 'less', 'inject-prod']);

gulp.task('js', function () {

  var sourcesJs = gulp.src([
        'src/app/**/*.js',
        'src/components/**/*.js'
      ]).pipe(ngFileSort()).pipe(ngAnnotate()).pipe(uglify()),
      bowerJs   = gulp.src(bowerFiles()),
      sources = es.merge(bowerJs, sourcesJs);

  sources
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('dist/scripts'));
});

gulp.task('less', function () {
  gulp
      .src([
        'src/styles/main.less',
        'src/styles/**/*.less'
      ])
      .pipe(less())
      .pipe(plumber())
      .pipe(minifyCSS())
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('dist/styles'))
      .pipe(connect.reload());
});

gulp.task('inject-dev', function () {
  var sourcesJs  = gulp.src([
        './src/app/**/*.js',
        './src/components/**/*.js'
      ]).pipe(ngFileSort()),

      sourcesCss = gulp.src([
        './dist/styles/*.css'
      ]),

      sources = es.merge(sourcesCss, sourcesJs);

  gulp
      .src('src/index.html')
      .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', addRootSlash: false, addPrefix: '..'}))
      .pipe(inject(sources, {addRootSlash: false, addPrefix: '..'}))
      .pipe(gulp.dest('tmp'))
      .pipe(connect.reload());
});

gulp.task('inject-prod', function () {
  var sources = gulp.src([
    './dist/scripts/**/*.js',
    './dist/styles/*.css'
  ], {read: false});

  gulp
      .src('src/index.html')
      .pipe(inject(sources, {addRootSlash: false, ignorePath: 'dist'}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('run-dev', function () {
  connect.server({
    root: ['.', './tmp'],
    port: 9000,
    host: 'mean-app.local',
    livereload: true
  });
});

gulp.task('run-prod', function () {
  connect.server({
    root: ['.', './dist'],
    port: 9001,
    host: 'mean-app.prod.test'
  });
});

gulp.task('watch', function () {
  gulp.watch('src/styles/**/*.less', ['less']);
});