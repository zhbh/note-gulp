'use strict';

var gulp    = require('gulp'),
	uglify  = require('gulp-uglify'),
	//stylish = require('jshint-stylish'),
	//jshint_Config = require('./jshintrc.json'),
	jshint  = require('gulp-jshint'),
	csslint = require('gulp-csslint'),
	rename  = require('gulp-rename'),
	uglify  = require('gulp-uglify'),
	minicss = require('gulp-minify-css'),
	pngquant = require('imagemin-pngquant'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	concat  = require('gulp-concat'),
	sass    = require('gulp-sass');

//检查 js
gulp.task('jshint',function(){
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

//检查 css
gulp.task('csslint',function(){
	return gulp.src('src/css/*.css')
		.pipe(csslint('.csslintrc'))
		.pipe(csslint.reporter('compact'));
});

//压缩 js
gulp.task('uglify',function(){
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('build/js'));
});

//压缩 css
gulp.task('minicss',function(){
	return gulp.src('src/css/*.css')
		.pipe(minicss())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('build/css'));
});

//压缩 image
gulp.task('imagemin',function(){
	return gulp.src('src/img/*')
		.pipe(imagemin({ progressive: true,use:[pngquant()] }))
		.pipe(gulp.dest('build/img'));
});

//压缩 html
gulp.task('htmlmin',function(){
	return gulp.src('src/*')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('build'));
});

//合并
gulp.task('concat',function(){
	return gulp.src('src/js/*')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('build/js'));
});

//编译 sass
gulp.task('sass',function(){
	return gulp.src('src/sass/*.sass')
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) //{outputStyle: 'compressed'}
		.pipe(gulp.dest('build/sass/'));
});

gulp.task('default',['jshint','csslint','uglify','minicss','htmlmin','concat','sass'],function(){
	
});