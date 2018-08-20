'use strict';

import gulp from "gulp";
import babel from 'gulp-babel';
import cfg from '../gulp-config';
import concat from "gulp-concat";
import uglify from 'gulp-uglify';
import fs from "fs";
import path from "path";
import normalize from "normalize-path";

gulp.task('js', function () {
    return gulp.src([
        cfg.src.root + 'pages/**/*.js',
        '!' + cfg.src.root + '**/_*.js'
    ])
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(gulp.dest(cfg.dest.root));
});

gulp.task('js:watch', ['js'], function () {
    return gulp.watch(cfg.src.root + 'pages/**/*.js', ['js']);
});

gulp.task('js:deploy', function () {
    let arr = [];
    let rootPath = cfg.src.root + 'pages';

    return getFolders(rootPath, arr)
        .map(function (folder) {
            return gulp.src([
                cfg.src.root + folder.fullPath + '**/*.js',
                '!' + cfg.src.root + folder.fullPath + '**/_*.js'
            ])
                .pipe(babel({
                    presets: ['env']
                }))
                .pipe(concat('script.js'))
                .pipe(uglify())
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
