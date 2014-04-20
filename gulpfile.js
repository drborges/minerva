var path = require('path')
  , fs = require('fs')
  , elasticsearch = require('elasticsearch')

var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , nodemon = require('gulp-nodemon')
  , watch = require('gulp-watch')
  , shell = require('gulp-shell')
  , autoConcat = require('gulp-continuous-concat')
  , concat = require('gulp-concat')
  , gutil = require('gulp-util')
  , ngmin = require('gulp-ngmin')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')

var files = {
  specBundle: 'spec/specs.js',
  appBundle: 'public/javascripts/dist/app.js',
  distBundle: 'public/javascripts/dist/app.min.js',
  specs: ['spec/**/*.js', '!spec/specs.js'],
  datasources: ['datasources/feedback.json'],
  app: [
    'public/javascripts/minerva/index.js',
    'public/javascripts/minerva/modules/**/index.js',
    'public/javascripts/minerva/routes.js',
    'public/javascripts/minerva/modules/**/*.js'
  ]
}

var runTests = function (config) {
  return gulp.src([ files.appBundle, files.specBundle ])
    .pipe(config.autotest ? watch() : gutil.noop())
    .pipe(plumber())
    .pipe(shell('mocha-phantomjs -R dot spec/spec.runner.html'))
}

var concatFiles = function (config) {
  return gulp.src(config.src)
    .pipe(config.watch ? watch({ glob: config.src }) : gutil.noop())
    .pipe(plumber())
    .pipe(config.watch ? autoConcat(path.basename(config.dest)) : concat(path.basename(config.dest)))
    .pipe(gulp.dest(path.dirname(config.dest)))
}

/*
 * Attention: auto-* tasks are not sync tasks, which means they
 * should never return streams/promises, otherwise tasks using
 * them as dependencies will block.
 */

gulp.task('dist', ['min'])
gulp.task('tdd', ['auto-test', 'auto-lint'])
gulp.task('default', ['server', 'auto-concat-app'])
gulp.task('auto-concat', ['auto-concat-app', 'auto-concat-specs'])

gulp.task('server', function () {
  nodemon({ script: 'app.js', ext: 'html js', ignore: ['spec'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('auto-test', ['auto-concat'], function () {
  runTests({ autotest: true })
})

gulp.task('auto-concat-app', function() {
  concatFiles({ watch: true, src: files.app, dest: files.appBundle })
})

gulp.task('auto-concat-specs', function() {
  concatFiles({ watch: true, src: files.specs, dest: files.specBundle })
})

gulp.task('auto-lint', function () {
  gulp.watch(files.app, ['lint'])
})

gulp.task('spec', function () {
  return runTests({ autotest: false })
})

gulp.task('concat-specs', function() {
  return concatFiles({ watch: false, src: files.specs, dest: files.specBundle })
})

gulp.task('concat-app', function() {
  return concatFiles({ watch: false, src: files.app, dest: files.appBundle })
})

gulp.task('lint', function () {
  return gulp.src(files.app)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})

gulp.task('pre-min', ['concat-app'], function () {
  return gulp.src(files.appBundle)
    .pipe(ngmin())
    .pipe(gulp.dest(path.dirname(files.distBundle)))
})

gulp.task('min', ['pre-min'], function () {
  return gulp.src(files.appBundle)
    .pipe(uglify())
    .pipe(rename(path.basename(files.distBundle)))
    .pipe(gulp.dest(path.dirname(files.distBundle)))
})

gulp.task('clean', function() {
  gulp.src([ files.appBundle, files.specBundle, path.dirname(files.distBundle) ]).pipe(shell('rm -rf <%= file.path %>'))
})

gulp.task('datasource', function () {
  var client = elasticsearch.Client()
  files.datasources.forEach(function (fileName) {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        return
      }

      documents = JSON.parse(data)
      documents.forEach(function (document) {
        client.index(document)
      })
    })
  })
})