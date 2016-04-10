## 学习目的

1. 想了解grunt与gulp不同，主要谁用起来更加方便和灵活，学习简单
2. 前端开发利器

## 学习资料

网址：http://www.gulpjs.com.cn 
内容信息比较全面，但某些知识点不够深入，相对比较入门的网站。

## 学习步骤

1. 安装npm
2. 安装gulp

		//global表示全局安装
		npm install --global gulp

3. 到当前开发项目目录中，安装开发依赖（对每一个项目都要下载gulp基础核心模块），所以每次新的项目开始都需要下面的命令：

		npm install --save-dev gulp

4. 项目根目录中添加gulpfile.js的文件（相当每一个项目启动文件）
	
		var gulp = require('gulp');

		//执行名为default任务
		gulp.task('default',function(){
			console.log('Hello World');
		});

5. 运行命名gulp

		gulp

	执行gulpfile.js中任务default

----

## aim of study

1. Want to know gulp, which there is different from grunt. And main key is which use to build project simply and conveniently,smartly.
2. As a tool is good to build project for front end web of working.

## information of study

website : http://www.gulpjs.com.cn
There has base knowledge about gulp, so the website is relative to beginner to learn it.  beacuse it is not enough deep for the new people getting much more knowledge.
