## GameTemplateKit

### 性能优化 开发流程优化

### 目前存在的问题
1. 性能
2. 开发流程

### 最终目的
1.  实现基于gulp的workingflow

    实现js压缩,合并及jslint规范监测;

    实现css的autoprefixer及层级压缩;

    图片的压缩及雪碧图实现;

    最好还能实现一些日志采集功能

2.  开发流程优化 一键初始化 一键打包及上传 (主要是 dev pro环境下接口的切换及模板源文件的上传)

未进行打包的

    npm run init    初始化一个空的项目目录 以及必要的模板元素   

    npm run native  切换本地(localhost) 采用假数据 不上传文件


已经打包好的

    npm run dev    切换dev(192.168.0.5 接口) 同时将该文件上传至测试服/data/www/soft/template 目录下

    npm run pro    切换pro(m.babyfs.cn 接口) 同时将该文件上传至七牛CDN

> 工程目录

_单项目_

```
- project
  |- build  // gulpfile配置
  | |- gulpfile.config.js //baseconf
  | |- gulpfile.dev.js  // devconf
  | |- gulpfile.prod.js // prodconf
  |- dist // 打包文件夹
  |- src  // 源文件夹
  | |- css
  | | `- index.css
  | |- images
  | |- js
  | | `- index.js
  | |- index.html
  |- gulpfile.js
  `- package.json

```

_多项目_

```
- project
  |- build
  | |- gulpfile.config.js
  | |- gulpfile.dev.js
  | |- gulpfile.init.js
  | |- gulpfile.prod.js
  |- dist // 打包文件夹
  |- src  // 源文件夹
  | |- jtom // 项目一
  | | |- css
  | | `- index.css
  | | |- images
  | | |- js
  | | `- index.js
  | | |- index.html
  | |- cookiejar // 项目二
  | | |- css
  | | `- index.css
  | | |- images
  | | |- js
  | | `- index.js
  | | |- index.html
  |- gulpfile.js
  `- package.json

```

> package.json

```
    {
        "name": "Gulp-Workflow",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "gulp dev",
            "dev": "gulp dev",
            "clean": "rimraf dist",
            "build": "rimraf dist && gulp build"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "browser-sync": "^2.18.6",
            "gulp": "^3.9.1",
            "gulp-autoprefixer": "^3.1.1",
            "gulp-concat": "^2.6.1",
            "gulp-cssnano": "^2.1.2",
            "gulp-imagemin": "^3.1.1",
            "gulp-jshint": "^2.0.4",
            "gulp-rename": "^1.2.2",
            "gulp-template": "^4.0.0",
            "gulp-uglify": "^2.0.0",
            "gulp-util": "^3.0.8",
            "jshint": "^2.9.4"
        }
    }

```



1. api的问题 三个环境应该分离 env => data
2. 文件的问题 公共的文件是不是应该放在外面 zepto reset.css setScreenHoriz ..
3. 模板的问题 如何把一各个模板抽离出来

1. 抽离公共的  打包之后生成cdn加入到require
2. 上传调取接口 bash还是js


_关于最外层公共文件的问题_

1. _native环境_

    不需要上传CDN链接 只需要引用最外层的包就行
2. _dev环境_    

    不需要上传CDN链接 只需要引用最外层的包就行
3. _pro环境_

    最外层的包需要上传CDN链接

1. gulp init --name=cookiejar   初始化一个项目


_未打包_
<!-- 5. ./gtk.bash dev 0 cookiejar   本地环境  运行一个项目 -->
6. gulp dev 1 cookiejar   测试环境  运行一个项目
<!-- 7. gulp dev 2 cookiejar   线上环境  运行一个项目 -->

_已经处于打包了_
<!-- 2. ./gtk.bash build 0 cookiejar       本地环境 打包一个项目 -->
3. ./gtk.bash build 1 cookiejar       测试环境 打包一个项目
4. ./gtk.bash build 2 cookiejar       开发环境 打包一个项目


为*的情况


https://github.com/commonheartwah/PhaserDown
# gtk
