'use strict';

import gulp from "gulp";
import serveStatic from "serve-static";
import connect from "connect";
import cfg from '../gulp-config'

gulp.task('http-server', function () {
    var app = connect();
    app.use(serveStatic(cfg.dest.root));
    app.listen(cfg.srvPort);

    console.log('Server listening on http://localhost:' + cfg.srvPort);
});
