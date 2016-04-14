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
```npm
npm install --global gulp
```

3. 到当前开发项目目录中，安装开发依赖（对每一个项目都要安装gulp模块，--save-dev的意思开发模式下使用，把模块名称和版本号以key-value添加到项目根目录中package.json中devDependencies对象中），所以每次新的项目开始都需要下面的命令：

		npm install --save-dev gulp

4. 项目根目录中添加gulpfile.js的文件（相当每一个项目启动文件）
	
```javascript
var gulp = require('gulp');

//执行名为default任务
gulp.task('default',function(){
	console.log('Hello World');
});
```

5. 运行命令：

		gulp

	执行gulpfile.js中任务default。

6. gulp的API

	- gulp.src : 读取符合匹配文件
	- gulp.dict : 输出相应文件
	- gulp.task : 并发执行任务，如果顺序执行任务，可以利用依赖关系处理
	- gulp.watch : 监控文件变化

## 实验清单

- 检查
	- js : gulp-jshint
	- css : gulp-csslint
- 压缩
	- js : gulp-uglify
	- css : gulp-minify-css
	- image : gulp-imagemin
	- html : gulp-htmlmin
- 合并 
	- gulp-concat
- 编译sass 
	- gulp-ruby-sass

以上都是gulp的插件[plugins](http://gulpjs.com/plugins/)，通过以下命令安装插件：

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

			或者不引用模块，如下面代码所示：

			gulp.task('jshint',function(){
				return gulp.src('src/js/*.js')
					.pipe(jshint())
					.pipe(jshint.reporter('jshint-stylish'));
			});

	但是这样使用接口情况，作者说JSHint插件没有很好模块格式，据我所知情况尝试全部兼容。希望能使用，如果该插件使用此库不可以工作，感觉没有统一规定会带来问题。
	> JSHint plugins have no good module format so I tried to support all of them I saw in the wild. Hopefully it worked, but if a JSHint plugin isn't working with this library feel free to open an issue.

4. 自定义检查规则

上面的API文档并没有详细说明，跳转到jshint官方文档上（http://jshint.com/docs/）有具体说明，下面其中一种使用方法。

	- 项目添加.jshintrc文件
	- 项目package.json添加属性jshintConfig，格式如："jshintConfig":".jshintrc"

### 检查css

API : https://www.npmjs.com/package/gulp-csslint/

1. 同理安装模块gulp-csslint和gulpfile.js文件中引入模块，写一个任务：
		
		var csslint = require('csslint');

		gulp.task('csslint',function(){
			return gulp.src('src/css/*.css')
				.pipe(csslint())
				.pipe(csslint.reporter());
		});

2. 自定义检查规则
	
	- 项目根目录添加.csslintrc文件或csslintrc.json

	- 引入文件，代码如下
			……
			.pipe(csslint('.csslintrc')) or .pipe(csslint('csslintrc.json'))
			……

### 压缩js

API : https://www.npmjs.com/package/gulp-uglify

	1. 安装插件

		npm install --save-dev gulp-uglify

	2. 引入模块

		var uglify = require('gulp-uglify');

	3. 执行任务

		gulp.task('uglify',function(){
			return gulp.src('src/js/*.js')
				.pipe(uglify())
				.pipe(rename({ extname: '.min.js' }))//扩展名修改
				.pipe(gulp.dest('build/js'));
		});

其中可以对输入文件进行重命名，需要安装模块gulp-rename，并引用；其API:https://www.npmjs.com/package/rename。

### 压缩css

API : https://www.npmjs.com/package/gulp-minify-css-mpath

 	同理安装模块gulp-minify-css和gulpfile.js文件中引入模块，写一个任务：
		
		var minicss = require('gulp-minify-css');

		gulp.task('minicss',function(){
			return gulp.src('src/css/*.css')
				.pipe(minicss())
				.pipe(rename({ extname: '.min.css' }))
				.pipe(gulp.dest('build/css'));
		});

### 压缩image

API : https://www.npmjs.com/package/gulp-imagemin

压缩图片类型有PNG/JPG/GIF/SVG，相比[tingpng网站](https://tinypng.com/)压缩率比较低。

1.启用对JPG图片进行无损压缩，对progressive设置为true，而对PNG图片压缩这需要引用外部库，并用use数组属性添加方法。

		var pngquant = require('imagemin-pngquant');

		gulp.task('imagemin',function(){
			return gulp.src('src/img/*')
				.pipe(imagemin({ progressive: true,use:[pngquant()] }))
				.pipe(gulp.dest('build/img'));
		});

### 压缩 html

API : https://github.com/kangax/html-minifier

全部配置项都是缺省false，所以根据自己情况进行压缩，下面例子只对空白进行删除。

	var htmlmin = require('gulp-htmlmin');

	gulp.task('htmlmin',function(){
		return gulp.src('src/*')
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(gulp.dest('build'));
	});

### 合并

API : https://www.npmjs.com/package/gulp-concat

合并就是同样类型文件合并一个文件，如下代码：
		
		gulp.task('concat',function(){
			return gulp.src('src/js/*')
				.pipe(concat('all.js'))
				.pipe(gulp.dest('build/js'));
		});

但是上面存在一定问题，有些js文件可能存在依赖关系，所以可以设置先后顺序；

		……
		gulp.src(['./lib/one.js', './lib/two.js', './lib/three.js'])
		pipe(concat('all.js'))
		……

同时支持生成Source maps。


----

## aim of study

1. Want to know gulp, which there is different from grunt. And main key is which use to build project simply and conveniently,smartly.
2. As a tool is good to build project for front end web of working.

## information of study

website : http://www.gulpjs.com.cn

There has base knowledge about gulp, so the website is relative to beginner to learn it.  beacuse it is not enough deep for the new people getting much more knowledge.
