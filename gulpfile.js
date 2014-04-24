var path = require('path')
  , fs = require('fs')
  , stylish = require('jshint-stylish')
  , elasticsearch = require('elasticsearch')
  , livereloadServer = require('tiny-lr')()
  , connectLivereload = require('connect-livereload')
  , express = require('express')

var app = require('./app')

var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , watch = require('gulp-watch')
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
    unit: ['spec/unit/**/*.spec.js', '!spec/specs.js'],
    e2e: 'spec/e2e/**/*.e2e.js'
  },
  templates: {
    src: 'public/templates/*.html',
    bundle: 'spec/templates.js'
  },
  datasources: {
    feedbacks: 'datasources/feedback.json'
  },
  app: {
    js: [
      'public/javascripts/minerva/index.js',
      'public/javascripts/minerva/modules/**/index.js',
      'public/javascripts/minerva/routes.js',
      'public/javascripts/minerva/modules/**/*.js'
    ],
    public: 'public/**/*',
  }
}

var done = function (cb) {
  return function () { cb() }
}

var error = function (err, cb) {
  return function () {
    console.error(err)
    cb()
  }
}

var runTests = function (config) {
  return gulp.src([ files.appBundle, files.specBundle, files.templates.bundle ])
    .pipe(config.watch ? watch() : gutil.noop())
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
 * Attention: auto.* tasks are not sync tasks, which means they
 * should never return streams/promises, otherwise tasks using
 * them as dependencies will block.
 */

gulp.task('dist', ['min'])
gulp.task('tdd', ['auto.test', 'auto.lint', 'auto.concat.templates'])
gulp.task('default', ['server', 'livereload', 'auto.concat.app'])
gulp.task('auto.concat', ['auto.concat.app', 'auto.concat.specs'])

gulp.task('server', function () {
  app.use(connectLivereload())
  app.use(express.static(path.join(__dirname, 'public')))
  app.listen(3000)
})

gulp.task('livereload', function() {
  livereloadServer.listen(35729)
  gulp.watch(files.app.public, function (file) {
    livereloadServer.changed({ body: { files: [file.path] }})
  })
})

gulp.task('auto.test', ['auto.concat'], function () {
  runTests({ watch: true })
})

gulp.task('auto.concat.app', function() {
  concatFiles({ watch: true, src: files.app.js, dest: files.appBundle })
})

gulp.task('auto.concat.specs', function() {
  concatFiles({ watch: true, src: files.specs.unit, dest: files.specBundle })
})

gulp.task('auto.concat.templates', function () {
  gulp.watch(files.templates.src, ['concat.templates'])
})

gulp.task('auto.lint', function () {
  gulp.watch(files.app.js, ['lint'])
})

gulp.task('spec', function () {
  return runTests({ autotest: false })
})

gulp.task('concat.specs', function() {
  return concatFiles({ watch: false, src: files.specs.unit, dest: files.specBundle })
})

gulp.task('concat.app', function() {
  return concatFiles({ watch: false, src: files.app.js, dest: files.appBundle })
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
  return gulp.src(files.app.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})

gulp.task('pre.min', ['concat.app'], function () {
  return gulp.src(files.appBundle)
    .pipe(ngmin())
    .pipe(gulp.dest(path.dirname(files.distBundle)))
})

gulp.task('min', ['pre.min'], function () {
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

  gulp.src(generatedFiles)
    .pipe(shell('rm -rf <%= file.path %>'))
})

gulp.task('index.all.delete', function (cb) {
  var client = elasticsearch.Client()
  client.indices.delete({ 'index': '*' }).then(done(cb)).catch(error(cb))
})

gulp.task('index.feedbacks', function (cb) {
  var client = elasticsearch.Client()
  fs.readFile(files.datasources.feedbacks, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err)
      return
    }

    var documents = JSON.parse(data)
    var bulkOperations = [].concat.apply([], documents.map(function (document) {
      return [{ index:  { _index: 'minerva', _type: 'feedback' } }, document]
    }))

    client.bulk({ body: bulkOperations }).then(done(cb)).catch(error(err, cb))
  })
})