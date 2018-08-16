'use strict';

import gulp from "gulp";
import sass from 'gulp-sass';
import cfg from '../gulp-config';
import concat from "gulp-concat";
import minifyCss from 'gulp-minify-css';
import fs from "fs";
import path from "path";
import normalize from "normalize-path";

gulp.task('sass', function () {
    return gulp.src([
        cfg.src.root + 'pages/**/*.sass',
        '!' + cfg.src.root + '**/_*.sass'
    ])
        .pipe(sass())
        .pipe(gulp.dest(cfg.dest.root));
});
gulp.task('sass:watch', ['sass'], function () {
    return gulp.watch(cfg.src.root + 'pages/**/*.sass', ['sass']);
});

gulp.task('sass:deploy', function () {
    let arr = [];
    let rootPath = cfg.src.root + 'pages';

    return getFolders(rootPath, arr)
        .map(function (folder) {
            return gulp.src([
                cfg.src.root + folder.fullPath + '**/*.sass',
                '!' + cfg.src.root + folder.fullPath + '**/_*.sass'
            ])
                .pipe(sass())
                .pipe(minifyCss())
                .pipe(concat('style.css'))
                .pipe(gulp.dest(cfg.dest.root + '/' + folder.parentFolderName));
        });
});

function getFolders(dir, arr) {
    fs.readdirSync(dir)
        .filter(function (file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                getFolders(path.join(dir, file), arr);
                arr.push({
                    fullPath: normalize(path.join(dir, file)).replace('src/', '/'),
                    parentFolderName: path.join(dir, file).split(path.sep).slice(-1)[0]
                });
            }
        });
    return arr;
}
