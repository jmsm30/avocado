const gulp = require("gulp")
const del = require("del")
const shell = require('gulp-shell')
const file = require('gulp-file')
const git = require("gulp-git")

const getMarkdownHeader = (pathname, date, title) => `
---
path: "/${pathname}"
date: "${date}"
title: "${title}"
---
`

gulp.task('clean', function(){
    return del([
        ".cache",
        "public",
    ])
})

gulp.task('clean:public', function(){
    return del([
        "public/*",
        "!.git/",
        "!.gitignore"
    ])
})

gulp.task("assets:public", function(){
    return gulp.src("assets/*")
            .pipe(gulp.dest("public"))
})

gulp.task('build', shell.task([
    'npm run build'
]))

gulp.task("create:post", function(){
    const argv = require('yargs').argv;
    const title = argv.t || "Untitled Post"
    const pathname = argv.p || title.replace(/ +/g, '-').toLowerCase()
    const now = new Date()
    const mdHeader = getMarkdownHeader(pathname, now.toISOString(), title)

    return file(`${now.getTime()}-${pathname}.md`, mdHeader, {src: true})
            .pipe(gulp.dest("./content/posts"))
})

gulp.task("clone:public", function(cb){
    require('dotenv').config()

    git.clone(process.env.REPO, {args: "./public"}, function(err){
        if(err) throw err
        cb()
    })
})

gulp.task('add:public', function(){
    return gulp.src('.')
      .pipe(git.add());
});

gulp.task('commit:public', function(){
    return gulp.src('.',  {cwd: "public"})
      .pipe(git.commit(`Deploy website at ${new Date()}`));
});
