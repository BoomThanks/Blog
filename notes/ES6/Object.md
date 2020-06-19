# 对象的新增方法

## Object.is()

ES5 可以通过下面的代码，部署 Object.is。

```js
Object.defineProperty(Object, "is", {
  value: function (x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

## Object.assign()

### 注意

1. 浅拷贝

   `Object.assign` 方法实行的是浅拷贝，而不是深拷贝。

2. 同名属性的替换

   对于这种嵌套的对象，一旦遇到同名属性，Object.assign 的处理方法是替换，而不是添加。

   ```js
   const target = { a: { b: "c", d: "e" } };
   const source = { a: { b: "hello" } };
   Object.assign(target, source);
   // { a: { b: 'hello' } }
   ```

3. 数组的处理

   `Object.assign` 可以用来处理数组，但是会把数组视为对象。

4. 取值函数的处理

   `Object.assign`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。


## Object.getOwnPropertyDescriptors()
