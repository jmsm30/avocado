const gulp = require("gulp")
const del = require("del")
const shell = require('gulp-shell')

gulp.task('clean', function(){
    return del([
        ".cache",
        "public/*",
        "!.git/",
        "!.gitignore",
        "!public/favicon.ico",
        "!public/README.md"
    ])
})

gulp.task('build', shell.task([
    'npm run build'
]))

  gulp.task('default', ['clean', 'build']);