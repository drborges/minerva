var path = require('path')
  , fs = require('fs')
  , stylish = require('jshint-stylish')
  , server = require('tiny-lr')()
  , connectLivereload = require('connect-livereload')
  , express = require('express')

var Indexer = require('./gulps/indexer')

var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , watch = require('gulp-watch')
  , reload = require('gulp-livereload')
  , nodemon = require('gulp-nodemon')
  , shell = require('gulp-shell')
  , concat = require('gulp-concat')
  , autoConcat = require('gulp-continuous-concat')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
  , jshint = require('gulp-jshint')
  , angularTemplateCache = require('gulp-angular-templatecache')

var files = {
  specBundle: 'spec/specs.js',
  appBundle: 'public/javascripts/dist/app.js',
  distBundle: 'public/javascripts/dist/app.min.js',
  specs: {
    runner: 'spec/spec.runner.html',
    unit: ['spec/unit/**/*.spec.js', '!spec/specs.js'],
    e2e: 'spec/e2e/**/*.e2e.js'
  },
  templates: {
    src: 'public/templates/*.html',
    bundle: 'spec/templates.js'
  },
  datasources: [
    'datasources/feedback.json'
  ],
  js: {
    client: [
      'public/javascripts/minerva/index.js',
      'public/javascripts/minerva/modules/**/index.js',
      'public/javascripts/minerva/routes.js',
      'public/javascripts/minerva/modules/**/*.js'
    ],
    server: [
      'app.js',
      'api/*.js'
    ]
  },
  public: 'public/**/*',
}

var concatFiles = function (config) {
  return gulp.src(config.src)
    .pipe(config.watch ? watch({ glob: config.src }) : gutil.noop())
    .pipe(plumber())
    .pipe(config.watch ? autoConcat(path.basename(config.dest)) : concat(path.basename(config.dest)))
    .pipe(gulp.dest(path.dirname(config.dest)))
}

/*
 * Attention: auto.* tasks are not sync tasks, which means they
 * should never return streams/promises, otherwise tasks using
 * them as dependencies will block.
 */

gulp.task('dist', [ 'min' ])
gulp.task('tdd', [ 'auto.test', 'auto.lint' ])
gulp.task('default', [ 'server', 'livereload', 'auto.concat.app', 'auto.index' ])
gulp.task('auto.concat', [ 'auto.concat.app', 'auto.concat.specs', 'auto.concat.templates' ])

gulp.task('server', function () {
  nodemon({ script: 'app.js', ext: 'js', ignore: [] })
})

gulp.task('livereload', function() {
  var appFiles = files.js.client.concat(files.js.server).concat(files.public)
  server.listen(35729)
  gulp.watch(appFiles, function (file) {
    gulp.src(file.path).pipe(reload(server))
  })
})

gulp.task('auto.test', [ 'auto.concat' ], function () {
  gulp.src([ files.appBundle, files.specBundle, files.templates.bundle ])
    .pipe(watch())
    .pipe(plumber())
    .pipe(shell('mocha-phantomjs -R dot spec/spec.runner.html'))
})

gulp.task('auto.concat.app', function() {
  concatFiles({ watch: true, src: files.js.client, dest: files.appBundle })
})

gulp.task('auto.concat.specs', function() {
  concatFiles({ watch: true, src: files.specs.unit, dest: files.specBundle })
})

gulp.task('auto.concat.templates', function () {
  gulp.watch(files.templates.src, [ 'concat.templates' ])
})

gulp.task('auto.lint', function () {
  gulp.watch(files.js.client, [ 'lint' ])
})

gulp.task('auto.index', function () {
  gulp.watch(files.datasources, [ 'index' ])
})

gulp.task('spec', function () {
  return gulp.src(files.specs.runner)
    .pipe(shell('mocha-phantomjs -R dot <%= file.path %>'))
})

gulp.task('concat.specs', function() {
  return concatFiles({ watch: false, src: files.specs.unit, dest: files.specBundle })
})

gulp.task('concat.app', function() {
  return concatFiles({ watch: false, src: files.js.client, dest: files.appBundle })
})

gulp.task('concat.templates', function () {
  var options = {
    module: 'minerva.templates',
    root: '/templates',
    standalone: true,
    filename: path.basename(files.templates.bundle)
  }

  return gulp.src(files.templates.src)
    .pipe(angularTemplateCache(options))
    .pipe(gulp.dest(path.dirname(files.templates.bundle)))
})

gulp.task('lint', function () {
  return gulp.src(files.js.client)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})

gulp.task('pre.min', [ 'concat.app' ], function () {
  return gulp.src(files.appBundle)
    .pipe(ngmin())
    .pipe(gulp.dest(path.dirname(files.distBundle)))
})

gulp.task('min', [ 'pre.min' ], function () {
  return gulp.src(files.appBundle)
    .pipe(uglify())
    .pipe(rename(path.basename(files.distBundle)))
    .pipe(gulp.dest(path.dirname(files.distBundle)))
})

gulp.task('clean', function() {
  var generatedFiles = [
    files.appBundle,
    files.specBundle,
    path.dirname(files.distBundle),
    files.templates.bundle
  ]

  return gulp.src(generatedFiles)
    .pipe(shell('rm -rf <%= file.path %>'))
})

gulp.task('index', function () {
  return gulp.src(files.datasources)
    .pipe(Indexer())
})