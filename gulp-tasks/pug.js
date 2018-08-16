'use strict';

import gulp from "gulp";
import notify from "gulp-notify";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import cfg from '../gulp-config';
import getData from 'jade-get-data';

const data = {
	getData: getData('src/data'),
	jv0: 'javascript:void(0);'
};

gulp.task('pug', function () {
    return gulp.src([
        cfg.src.root + 'pages/**/*.pug',
        '!' + cfg.src.root + '**/_*.pug'
    ])
        .pipe(plumber({
            errorHandler: notify.onError(function (error) {
                return error.message;
            })
        }))
        // .pipe(changed(dest.html, {extension: '.html'}))
        //.pipe(pug({pretty: true}))
	.pipe(pug({pretty: true, data}))
        .pipe(gulp.dest(cfg.dest.root));
});
gulp.task('pug:watch', ['pug'], function () {
    return gulp.watch(cfg.src.root + 'pages/**/*.pug', ['pug']);
});
