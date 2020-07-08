# Proxy & Reflect

## Proxy

### 概述 Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

### 实例的方法

```js
const proxy = new Proxy();
```

#### get()

`get(target, propKey, receiver)`：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。

get 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为**目标对象**、**属性名**和 **proxy 实例本身**（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

#### set()

`set(target, propKey, value, receiver)`：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。

set 方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为**目标对象**、**属性名**、**属性值**和 **Proxy 实例本身**，其中最后一个参数可选。

#### apply()

`apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

apply 方法可以接受三个参数，分别是**目标对象**、**目标对象的上下文对象（this）**和**目标对象的参数数组**。

#### has()

`has(target, propKey)`：拦截 propKey in proxy 的操作，返回一个布尔值。

has 方法可以接受两个参数，分别是**目标对象**、**需查询的属性名**。

has 拦截只对 in 运算符生效，对 for...in 循环不生效，导致不符合要求的属性没有被 for...in 循环所排除。

#### construct()

`construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

construct 方法可以接受三个参数。

- target：目标对象
- args：构造函数的参数对象
- newTarget：创造实例对象时，new 命令作用的构造函数（下面例子的 p）

construct 方法返回的必须是一个对象，否则会报错。

#### deleteProperty()

`deleteProperty(target, propKey)`：拦截 delete proxy[propKey]的操作，返回一个布尔值。

- 如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除。
- 目标对象自身的不可配置（configurable）的属性，不能被 deleteProperty 方法删除，否则报错。

#### defineProperty()

`defineProperty(target, propKey, propDesc)`：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

- defineProperty()方法内部没有任何操作，只返回 false，导致添加新属性总是无效。这里的 false 只是用来提示操作失败，本身并不能阻止添加新属性。
- 如果目标对象不可扩展（non-extensible），则 defineProperty()不能增加目标对象上不存在的属性，否则会报错。
- 如果目标对象的某个属性不可写（writable）或不可配置（configurable），则 defineProperty()方法不得改变这两个设置。

#### getOwnPropertyDescriptor()

`getOwnPropertyDescriptor(target, propKey)`：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

#### getPrototypeOf()

`getPrototypeOf(target)`：拦截 Object.getPrototypeOf(proxy)，返回一个对象。

getPrototypeOf() 方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

---

- getPrototypeOf()方法的返回值必须是对象或者 null，否则报错.
- 如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。

#### isExtensible()

`isExtensible(target)`：拦截 Object.isExtensible(proxy)，返回一个布尔值。

- 该方法只能返回布尔值，否则返回值会被自动转为布尔值。

#### ownKeys()

`ownKeys(target)`：拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in` 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的*可遍历属性*。

ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in` 循环

注意，使用 Object.keys()方法时，有三类属性会被 ownKeys()方法自动过滤，不会返回。

- 目标对象上不存在的属性
- 属性名为 Symbol 值
- 不可遍历（enumerable）的属性

ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。

如果目标对象自身包含**不可配置的属性**，则该属性**_必须_**被 ownKeys()方法返回，否则报错。

另外，如果目标对象是**不可扩展**的（non-extensible），这时 ownKeys()方法返回的数组之中，**_必须_**包含原对象的所有属性，**_且_**不能包含多余的属性，否则报错

#### preventExtensions()

`preventExtensions(target)`：拦截 Object.preventExtensions(proxy)，返回一个布尔值。

这个方法有一个限制，只有目标对象**不可扩展时**（即 Object.isExtensible(proxy)为 false），proxy.preventExtensions 才能返回 true，否则会报错。

为了防止出现这个问题，通常要在 proxy.preventExtensions()方法里面，调用一次 Object.preventExtensions()。

#### setPrototypeOf()

`setPrototypeOf(target, proto)`：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型

### Proxy.revocable()

`revoke()`

Proxy.revocable()方法返回一个对象，该对象的 proxy 属性是 Proxy 实例，revoke 属性是一个函数，可以取消 Proxy 实例。上面代码中，当执行 revoke 函数之后，再访问 Proxy 实例，就会抛出一个错误。

Proxy.revocable()的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

### this 问题

### 实例：Web 服务的客户端

## Reflect

### 概述 Reflect

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。
- 修改某些 Object 方法的返回结果，让其变得更合理。
- 让 Object 操作都变成函数行为。
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。

### 静态方法

与 Proxy 一一对应

- `Reflect.apply(target, thisArg, args)`
- `Reflect.construct(target, args)`
- `Reflect.get(target, name, receiver)`
- `Reflect.set(target, name, value, receiver)`
- `Reflect.defineProperty(target, name, desc)`
- `Reflect.deleteProperty(target, name)`
- `Reflect.has(target, name)`
- `Reflect.ownKeys(target)`
- `Reflect.isExtensible(target)`
- `Reflect.preventExtensions(target)`
- `Reflect.getOwnPropertyDescriptor(target, name)`
- `Reflect.getPrototypeOf(target)`
- `Reflect.setPrototypeOf(target, prototype)`

---

## Proxy 与 Object.defineProperty 优劣

### Object.defineProperty 优劣

### Proxy 的优势

- Proxy 直接可以劫持整个对象,并返回一个新对象
- Proxy 可以直接监听数组的变化
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改。
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。
- 当然,Proxy 的劣势就是兼容性问题,而且无法用 polyfill 磨平,因此 Vue 的作者才声明需要等到下个大版本(3.0)才能用 Proxy 重写。
