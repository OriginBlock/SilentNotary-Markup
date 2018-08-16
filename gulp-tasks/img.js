'use strict';

import gulp from "gulp";
import cfg from '../gulp-config'

gulp.task('assets', function () {
    return gulp
        .src([
            cfg.src.root + 'pages/**/*.png',
            cfg.src.root + 'pages/**/*.jpg',
            cfg.src.root + 'pages/**/*.gif',
            cfg.src.root + 'pages/**/*.ico',
            cfg.src.root + 'pages/**/*.svg',
            cfg.src.root + 'pages/**/*.eot',
            cfg.src.root + 'pages/**/*.ttf',
            cfg.src.root + 'pages/**/*.woff',
            cfg.src.root + 'pages/**/*.woff2',
            cfg.src.root + 'pages/**/*.eot'
        ])
        .pipe(gulp.dest(cfg.dest.root));
});
