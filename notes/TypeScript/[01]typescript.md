# typescript

## gulp

- q:AssertionError: Task function must be specified
- a:https://www.jianshu.com/p/

### gup3 VS gulp4 区别

Gulp 4最大的变化就是你不能像以前那样传递一个依赖任务列表。

Gulp3，如果有一个任务A，B和C的列表，你想在一个序列中运行（确保A在B开始之前完成，而B在C开始之前完成），代码如下：

```js
gulp.task('a', function () {
  // Do something.
});
gulp.task('b', ['a'], function () {
  // Do some stuff.
});
gulp.task('c', ['b'], function () {
    // Do some more stuff.
});
```

在Gulp 4中，你不能再这样做了。你会得到以下错误：

```js
assert.js:85
  throw new assert.AssertionError({
  ^
AssertionError: Task function must be specified
    at Gulp.set [as _setTask] (/home/hope/web/node_modules/undertaker/lib/set-task.js:10:3)
    at Gulp.task (/home/hope/web/node_modules/undertaker/lib/task.js:13:8)
    at Object.<anonymous> (/home/hope/web/gulpfile.js:31:6)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
```

不要用Gulp3的方式指定依赖任务，你需要使用gulp.series和gulp.parallel，因为gulp任务现在只有两个参数。

> gulp.series：按照顺序执行
> lp.paralle：可以并行计算

```js
gulp.task('my-tasks', gulp.series('a', 'b', 'c', function() {
  // Do something after a, b, and c are finished.
}));
```

```js
gulp.task('build', gulp.parallel('styles', 'scripts', 'images', function () {
  // Build the website.
}));
```

或者这样

```js
gulp.task('my-tasks', gulp.series('a', gulp.parallel('styles','scripts', 'images'), 'b', 'c', function() {
  // Do something after a, b, and c are finished.
}));
```

相关任务必须在被调用之前发生。
