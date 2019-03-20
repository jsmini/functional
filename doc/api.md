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
