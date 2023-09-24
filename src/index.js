import { type } from '@jsmini/type';

export function pipe(...fns) {
  return function (...args) {
    return fns.reduce((prev, fn) => fn.apply(undefined, [].concat(prev)), args);
  };
}

export function compose(...fns) {
  return function (...args) {
    return fns.reduceRight(
      (prev, fn) => fn.apply(undefined, [].concat(prev)),
      args,
    );
  };
}

export function curry(func, len = func.length) {
  if (type(func) !== 'function') {
    throw new TypeError('curry first param must be a function');
  }

  len = Math.ceil(len);

  if (isNaN(len)) {
    throw new TypeError('curry second param must be a number');
  }

  function partial(func, argsList, argsLen) {
    if (argsList.length >= argsLen) {
      return func.apply(this, argsList);
    }

    return function (...args) {
      return partial.call(this, func, argsList.concat(args), argsLen);
    };
  }

  return partial(func, [], len);
}

export function curryRight(func, len = func.length) {
  if (type(func) !== 'function') {
    throw new TypeError('curryRight first param must be a function');
  }

  len = Math.ceil(len);

  if (isNaN(len)) {
    throw new TypeError('curryRight second param must be a number');
  }

  function partial(func, argsList, argsLen) {
    if (argsList.length >= argsLen) {
      return func.apply(this, argsList);
    }

    return function (...args) {
      return partial.call(this, func, args.concat(argsList), argsLen);
    };
  }

  return partial(func, [], len);
}

export function debounce(func, time = 0) {
  if (type(func) !== 'function') {
    throw new TypeError('debounce first param must be a function');
  }

  time = Math.ceil(time);

  if (isNaN(time)) {
    throw new TypeError('debounce second param must be a number');
  }

  let tid = null;
  return function debounced(...args) {
    clearTimeout(tid);

    tid = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
}

export function throttle(func, time = 0) {
  if (type(func) !== 'function') {
    throw new TypeError('throttle first param must be a function');
  }

  time = Math.ceil(time);

  if (isNaN(time)) {
    throw new TypeError('throttle second param must be a number');
  }

  let tid = null;
  let lasttime = 0;

  return function throttled(...args) {
    const nowtime = new Date().getTime();

    clearTimeout(tid);

    if (nowtime - lasttime >= time) {
      lasttime = nowtime;
      func.apply(this, args);
      return;
    }

    tid = setTimeout(
      () => {
        lasttime = new Date().getTime();
        func.apply(this, args);
      },
      time - (nowtime - lasttime),
    );
  };
}
