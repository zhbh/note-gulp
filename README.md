## 学习目的

1. 想了解grunt与gulp不同，主要谁用起来更加方便和灵活，学习简单
2. 前端开发利器

## 学习资料

网址：http://www.gulpjs.com.cn/ 
内容信息比较全面，但某些知识点不够深入，相对比较入门的网站。

## 学习步骤

1. 安装npm(Node Package Manager)
2. 安装gulp；window系统下，打开运行cmd，输入如下指令：

		//global表示全局安装
		npm install --global gulp

3. 到当前开发项目目录中，安装开发依赖（对每一个项目都要安装gulp模块，--save-dev的意思开发模式下使用，把模块名称和版本号以key-value添加到项目根目录中package.json中devDependencies对象中），所以每次新的项目开始都需要下面的命令：

		npm install --save-dev gulp

4. 项目根目录中添加gulpfile.js的文件（相当每一个项目启动文件）
	
		var gulp = require('gulp');

		//执行名为default任务
		gulp.task('default',function(){
			console.log('Hello World');
		});

5. 运行命令：

		gulp

	执行gulpfile.js中任务default。

## 实验清单

- 检查
	- js : gulp-jshint
	- css : gulp-csslint
- 压缩
	- js : gulp-uglify
	- css : gulp-minify-css
	- image : gulp-imagemin
	- html : gulp-htmlmin
- 合并 gulp-concat
- 编译sass gulp-ruby-sass

以上都是gulp的插件plugins(网址：http://gulpjs.com/plugins/)，通过以下命令安装插件：

		npm install --save-dev [plugin1 plugin2 ……]

### 检查-js
	
API : https://www.npmjs.com/package/gulp-jshint/

1. 安装插件
	
		npm install --save-dev gulp-jshint

2. 引入gulp-jshint模块

		var jshint = require('gulp-jshint');

3. 添加任务

		//检查 js
		gulp.task('jshint',function(){
			return gulp.src('src/js/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter('default'));
		});

	缺省打印错误信息排版不那么友好，可以reporter引入参数(jshint-stylish模块)，对错误信息进行重新排版。

	- 安装插件

			npm install --save-dev jshint-stylish

	- 引入模块

			var stylish = require('jshint-stylish');

			gulp.task('jshint',function(){
				return gulp.src('src/js/*.js')
					.pipe(jshint())
					.pipe(jshint.reporter(stylish));
			});

### 检查css

API : https://www.npmjs.com/package/gulp-csslint/

同理安装模块和gulpfile.js文件中引入模块，写一个任务：
		
		var csslint = require('csslint');

		gulp.task('csslint',function(){
			return gulp.src('src/css/*.css')
				.pipe(csslint())
				.pipe(csslint.reporter());
		});

----

## aim of study

1. Want to know gulp, which there is different from grunt. And main key is which use to build project simply and conveniently,smartly.
2. As a tool is good to build project for front end web of working.

## information of study

website : http://www.gulpjs.com.cn

There has base knowledge about gulp, so the website is relative to beginner to learn it.  beacuse it is not enough deep for the new people getting much more knowledge.
