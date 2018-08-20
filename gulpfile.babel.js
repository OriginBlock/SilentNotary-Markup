'use strict';

import gulp from "gulp";
import requireDir from "require-dir";
import del from "del";
import cfg from './gulp-config';
import run from 'run-sequence'

requireDir('./gulp-tasks');

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(cfg.dest.root);
});
gulp.task('clean:deploy', function () {
    return del(cfg.deploy.root, { force: true });
});
gulp.task('copy:deploy', function () {
    return gulp.src(cfg.dest.root + '/**/*')
        .pipe(gulp.dest(cfg.deploy.root));
});

gulp.task('build', ['clean'], function (callback) {
    run(['js', 'pug', 'sass', 'assets', 'libs'], function () {
        callback();
    });
});

gulp.task('build:deploy', ['clean:deploy', 'clean'], function (callback) {
    run(['js:deploy', 'pug', 'sass:deploy', 'assets', 'libs'], function () {
        callback();
    });
});

gulp.task('deploy', ['build:deploy'], function (callback) {
    run(['copy:deploy'], function () {
        callback();
    });
});

gulp.task('dev', [
    'build',
    'js:watch',
    'sass:watch',
    'pug:watch',
    'http-server'
]);

gulp.task('default', [
    'build',
    'http-server'
]);
