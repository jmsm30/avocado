const gulp = require("gulp")
const del = require("del")
const shell = require('gulp-shell')
const file = require('gulp-file')
const git = require("gulp-git")
const runSequence = require("run-sequence")
require('dotenv').config()
const getMarkdownHeader = (slug, date, title) => `---
slug: "/${slug}"
date: "${date}"
title: "${title}"
---
`

gulp.task("create:post", function(){
    const argv = require('yargs').argv;
    const title = argv.t || "Untitled Post"
    const pathname = argv.p || title.replace(/ +/g, '-').toLowerCase()
    const now = new Date()
    const mdHeader = getMarkdownHeader(pathname, now.toISOString(), title)

    return file(`${now.getTime()}-${pathname}.md`, mdHeader, {src: true})
            .pipe(gulp.dest("./content/post"))
})

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

gulp.task("clone:public", function(cb){
    git.clone(process.env.GITHUB_REPO, {args: "./public"}, function(err){
        if(err) throw err
        cb()
    })
})

gulp.task('add:public', function(){
    return gulp.src('.', {cwd: "public"})
      .pipe(git.add());
});


gulp.task("commit:public", function(){
    return gulp.src('.')
    .pipe(shell([
      `git config user.email "zombispormedio007@gmail.com"`,
      `git config user.name "Xavier Serrano"`,
      `git commit -m "Deploy website at ${new Date()}"`
    ],  {cwd: "public"}))
})

gulp.task('push:public', function(cb){
    git.push('origin', 'master', {cwd: "public"}, function (err) {
      if (err) throw err;
      cb()
    });
  });

gulp.task("deploy", function(callback){
    runSequence(
        "clean",
        "clone:public",
        "clean:public",
        "assets:public",
        "build",
        "add:public",
        "commit:public",
        "push:public",
    callback);
})
