# 文档
一组函数式编程工具函数

## pipe
将传入的函数串起来依次执行

- param {function} 待串行的函数，最好为2个
- return {function} 函数

举个例子：

```js
function a(x) {
    return x + 10
}

function b(x) {
    return x * 10;
}

pipe(a, b)(10); // b(a(10)) = 200
pipe(b, a)(10); // a(b(10)) = 110
```

## compose
将传入的函数先反转，再串起来依次执行

- param {function} 待串行的函数，最好为2个
- return {function} 函数

举个例子：

```js
function a(x) {
    return x + 10
}

function b(x) {
    return x * 10;
}

compose(a, b)(10); // a(b(10)) = 110
compose(b, a)(10); // b(a(10)) = 200
```

## curry
函数柯里化

- param {function} func 待柯里化函数
- param {number} [len=func.length] 函数参数长度
- return {function} 柯里化后的函数

举个例子：

```js
function f(a, b, c) {
    console.log(a, b, c)
}

curry(f)(1)(2, 3) /// 1, 2, 3
curry(f)(1, 2)(3) /// 1, 2, 3
curry(f)(1)(2)(3) /// 1, 2, 3
```

## curryRight
函数柯里化，类似curry，但函数的传入顺序是相反的

- param {function} func 待柯里化函数
- param {number} [len=func.length] 函数参数长度
- return {function} 柯里化后的函数

举个例子：

```js
function f(a, b, c) {
    console.log(a, b, c)
}

curry(f)(1)(2, 3) /// 2, 3, 1
curry(f)(1, 2)(3) /// 3, 1, 2
curry(f)(1)(2)(3) /// 3, 2, 1
```

## debounce
函数防抖，连续调用时，只会执行一次（指定时间后）

- param {function} func 待防抖的函数
- param {number} [time=0] 待防抖的函数
- return {function} 防抖后的函数

举个例子：

```js
function f() {
    console.log(1)
}

var df = debounce(f, 100);

df();
df();
df(); // 100ms 后 输出 1
```

## throttle
函数截流，连续调用时，每隔指定时间执行一次

- param {function} func 待截流的函数
- param {number} [time=0] 待截流的函数
- return {function} 截流后的函数

举个例子：

```js
function f() {
    console.log(1)
}

var df = debounce(f, 100);

df(); // 每隔10ms执行一次，实际上每隔100ms输出一次1
```
