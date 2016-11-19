var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var config =  {
    server: {
        src:'./',
        index: 'demos.html',
        watch: [
            'dist/**',
            'demos.html'
        ]
    },

    sass: {
        src: ['dist/**/*.scss'],
        base: 'dist/',
        dest: 'dist/'
    }
};

gulp.task('sass', function() {
    return gulp.src(config.sass.src,{
        base: config.sass.base
    })
    .pipe(sass())
    .on('error', function(err) {
        console.log('Less Error!', err.message);
        this.emit('end');
    })
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('server',function() {
    browserSync.init({
        server: {
            baseDir: [config.server.src],
            index: config.server.index
        },
        ui: {
            port: 4000
        },
        open: 'external',
        port: 8080,
        // 关掉多设备同步
        ghostMode: false,
        proxy: false
    });
    gulp.watch( config.sass.src,['sass']);
    gulp.watch(config.server.watch).on('change',browserSync.reload);
});