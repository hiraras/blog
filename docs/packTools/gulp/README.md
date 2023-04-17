### Gulp 介绍

1. gulp 是基于 nodejs 中 stream 来读取和操作数据的，有一个 gulpfile.js 的主文件
2. gulp 的使用是由许许多多个任务来完成的。运行时只需切换到存放 gulpfile.js 的目录，在控制台执行 gulp(须全局安装 gulp)命令

### API

1. **gulp.src(globs[, options])**：用来获取文件流，第一个参数为文件匹配模式，多个可使用数组

- 匹配文件路径中的 0 个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾 \*\_ 匹配路径中的 0 个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。

  1. ? 匹配文件路径中的一个字符(不会匹配路径分隔符)
  2. [...] 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似 js 正则表达式中的用法
  3. !(pattern|pattern|pattern) 匹配任何与括号中给定的任一模式都不匹配的
  4. ?(pattern|pattern|pattern) 匹配括号中给定的任一模式 0 次或 1 次，类似于 js 正则中的(pattern|pattern|pattern)?
  5. +(pattern|pattern|pattern) 匹配括号中给定的任一模式至少 1 次，类似于 js 正则中的(pattern|pattern|pattern)+
  6. \_(pattern|pattern|pattern) 匹配括号中给定的任一模式 0 次或多次，类似于 js 正则中的(pattern|pattern|pattern)\*
  7. @(pattern|pattern|pattern) 匹配括号中给定的任一模式 1 次，类似于 js 正则中的(pattern|pattern|pattern)

  **例子：**

  1. \* 能匹配 a.js,x.y,abc,abc/,但不能匹配 a/b.js
  2. _._ 能匹配 a.js,style.css,a.b,x.y
  3. _/_/\_.js 能匹配 a/b/c.js,x/y/z.js,不能匹配 a/b.js,a/b/c/d.js
  4. \*\* 能匹配 abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件
  5. \*\*/\_.js 能匹配 foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js
  6. a/\*\*/z 能匹配 a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z
  7. a/\*\*b/z 能匹配 a/b/z,a/sb/z,但不能匹配 a/x/sb/z,因为只有单\*\_单独出现才能匹配多级目录
  8. ?.js 能匹配 a.js,b.js,c.js
  9. a?? 能匹配 a.b,abc,但不能匹配 ab/,因为它不会匹配路径分隔符
  10. [xyz].js 只能匹配 x.js,y.js,z.js,不会匹配 xy.js,xyz.js 等,整个中括号只代表一个字符
  11. [^xyz].js 能匹配 a.js,b.js,c.js 等,不能匹配 x.js,y.js,z.js

- 在数组中的单个匹配模式前加上!就是排除模式，注意不能在第一个模式前排除

  **例子：**

  1.  gulp.src([_.js,'!b*.js']) //匹配所有 js 文件，但排除掉以 b 开头的 js 文件
  2.  gulp.src(['!b*.js',\*.js]) //不会排除任何文件，因为排除模式不能出现在数组的第一个元素中
  3.  还可以展开模式（例子）：
  4.  a{b,c}d 会展开为 abd,acd
  5.  a{b,}c 会展开为 abc,ac
  6.  a{0..3}d 会展开为 a0d,a1d,a2d,a3d
  7.  a{b,c{d,e}f}g 会展开为 abg,acdfg,acefg
  8.  a{b,c}d{e,f}g 会展开为 abdeg,acdeg,abdeg,abdfg

2.  **gulp.dest(path[,options])**：用来输出文件；
    gulp 的使用流程一般是这样子的：首先通过 `gulp.src()` 方法获取到我们想要处理的文件流，然后把文件流通过 pipe 方法导入到 gulp 的插件中，最后把经过插件处理后的流再通过 pipe 方法导入到 gulp.dest()中，gulp.dest()方法则把流中的内容写入到文件中，这里首先需要弄清楚的一点是，我们给 gulp.dest()传入的路径参数，只能用来指定要生成的文件的目录，而不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的，即使我们给它传入一个带有文件名的路径参数，然后它也会把这个文件名当做是目录名

    **例子：**

    gulp.src('script/avalon/avalon.js'); // 没有通配符出现的情况

    .pipe(gulp.dest('dist')); // 最后生成的文件路径为 dist/avalon.js

    // 有通配符开始出现的那部分路径为 \*\*/underscore.js

    gulp.src('script/\*\*/underscore.js')

    //假设匹配到的文件为 script/util/underscore.js

    .pipe(gulp.dest('dist')); //则最后生成的文件路径为 dist/util/underscore.js

    gulp.src('script/_') //有通配符出现的那部分路径为 _

    // 假设匹配到的文件为 script/zepto.js

    .pipe(gulp.dest('dist')); //则最后生成的文件路径为 dist/zepto.js

    gulp.src 的配置参数中有个 base 参数，默认为未匹配到的部分(除去文件名和通配符的部分)，gulp.dest 的结果实际就是参数指定的加上 base 之外的内容，所以设置了 base 的话可以自定义结果。

    **例如：**
    gulp.src(script/lib/\*.js); //没有配置 base 参数，此时默认的 base 路径为 script/lib

    // 假设匹配到的文件为 script/lib/jquery.js

    .pipe(gulp.dest('build')); // 生成的文件路径为 build/jquery.js

    gulp.src(script/lib/\*.js, {base:'script'}); // 配置了 base 参数，此时 base 路径为 script

    //假设匹配到的文件为 script/lib/jquery.js

    .pipe(gulp.dest('build')) //此时生成的文件路径为 build/lib/jquery.js

3.  **gulp.task(name[, deps], fn)**：
    定义任务，name 为任务名，deps 为依赖任务数组，会先执行依赖任务再执行当前任务；**注意:**如果依赖任务有异步任务，不会等待异步执行完毕！

    有三种方式让其执行完异步任务再执行当前任务。

    1. 传入一个回调函数

       ```JavaScript
       gulp.task('one',function(cb){ // cb 为任务函数提供的回调，用来通知任务已经完成
           // one 是一个异步执行的任务
           setTimeout(function(){
               console.log('one is done');
               cb(); //执行回调，表示这个异步任务已经完成
           },5000);
           // 这时 two 任务会在 one 任务中的异步操作完成后再执行
           gulp.task('two',['one'],function(){
               console.log('two is done');
           });
       });
       ```

    2. 返回流对象

       ```JavaScript
        gulp.task('one',function(cb){
            var stream = gulp.src('client/\*_/_.js')
                .pipe(dosomething()) //dosomething()中有某些异步操作
                .pipe(gulp.dest('build'));
            return stream;
        });

        gulp.task('two',['one'],function(){
            console.log('two is done');
        });
       ```

    3. 返回 promise 对象

       ```JavaScript
        var Q = require('q'); // 一个著名的异步处理的库 https://github.com/kriskowal/q
        gulp.task('one',function(cb){
            var deferred = Q.defer();
            // 做一些异步操作
            setTimeout(function() {
                deferred.resolve();
            }, 5000);
            return deferred.promise;
        });

        gulp.task('two',['one'],function(){
            console.log('two is done');
        });
       ```

4.  **gulp.watch(glob[, opts], tasks)| gulp.watch(glob[, opts, cb])**:
    检测文件变化，执行指定任务|回调；

    glob 参数同 src 方法；

    tasks 为一个数组；

    第二种用法第三个参数为回调函数：传入一个对象会携带包含文件变化的一些信息

### 常用插件：

1.  **gulp-load-plugins**：
    帮助你自动加载 package.json 文件里的 gulp 插件

    ```JavaScript
    var plugins = require('gulp-load-plugins')();
    ```

    然后可以使用 plugins.rename 使用 gulp-rename 包，使用 plugins.rubySass 使用 gulp-ruby-sass 包

2.  **gulp-rename**：

    ```JavaScript
    var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require("gulp-uglify");
    gulp.task('rename', function () {
        gulp.src('js/jquery.js')
            .pipe(uglify()) //压缩
            .pipe(rename('jquery.min.js')) //会将 jquery.js 重命名为 jquery.min.js
            .pipe(gulp.dest('js'));
        //关于 gulp-rename 的更多强大的用法请参考https://www.npmjs.com/package/gulp-rename
    });
    ```

3.  **gulp-uglify**：
    压缩 js 文件

4.  **gulp-minify-css**：
    css 压缩

5.  **gulp-minify-html**：
    html 压缩

6.  **gulp-jshint**:
    代码检查

7.  **gulp-concat**：
    文件合并

8.  **gulp-less 和 gulp-sass**：
    less 和 sass 的编译

9.  **gulp-imagemin**：
    压缩图片
10. **gulp-livereload**：
    自动刷新

    ```JavaScript
    var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

    gulp.task('less', function() {
        gulp.src('less/\*.less')
            .pipe(less())
            .pipe(gulp.dest('css'))
            .pipe(livereload());
    });

    gulp.task('watch', function() {
        livereload.listen(); //要在这里调用 listen()方法
        gulp.watch('less/\*.less', ['less']);
    });
    ```

托管在 npm 上的插件 - 标记有 "gulpplugin" 和 "gulpfriendly" 关键词 - 可以在 插件搜索页面 上浏览和搜索。
