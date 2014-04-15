var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , nodemon = require('gulp-nodemon')
  , watch = require('gulp-watch')
  , shell = require('gulp-shell')
  , concat = require('gulp-continuous-concat')
  , gutil = require('gulp-util')

var files = {
  appBundle: 'public/javascripts/dist/app.js',
  specBundle: 'spec/specs.js',
  specs: ['spec/**/*.js', '!spec/specs.js'],
  dist: [
    'public/javascripts/minerva/app.js',
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

gulp.task('default', ['server', 'concat'])
gulp.task('concat', ['concat-app', 'concat-specs'])

gulp.task('server', function () {
  nodemon({ script: 'app.js', ext: 'html js', ignore: [] })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('spec', function () {
  runTests({ autotest: false })
})

gulp.task('auto-test', ['concat'], function () {
  runTests({ autotest: true })
})

gulp.task('concat-app', function() {
  gulp.src(files.dist)
    .pipe(watch({ glob: files.dist }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/javascripts/dist'))
})

gulp.task('concat-specs', function() {
  gulp.src(files.specs)
    .pipe(watch({ glob: files.specs }))
    .pipe(concat('specs.js'))
    .pipe(gulp.dest('spec'))
})

gulp.task('clean', function() {
  gulp.src([ files.appBundle, files.specBundle ]).pipe(shell('rm -f <%= file.path %>'))
})