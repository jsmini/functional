export function pipe(...fns) {
    return function (...args) {
        return fns.reduce((prev, fn) => fn(...[].concat(prev)), args);
    };
}

export function compose(...fns) {
    return function (...args) {
        return fns.reduceRight((prev, fn) => fn(...[].concat(prev)), args);
    };
}

export function curry(func, len = func.length) {
    function partial(func, argsList, argsLen) {
        if (argsList.length >= argsLen) {
            return func.apply(this, argsList);
        }

        return function (...args) {
            return partial.call(this, func, argsList.concat(args), argsLen);
        }
    }

    return partial(func, [], len);
}

export function curryRight(func, len = func.length) {
    function partial(func, argsList, argsLen) {
        if (argsList.length >= argsLen) {
            return func.apply(this, argsList);
        }

        return function (...args) {
            return partial.call(this, func, args.concat(argsList), argsLen);
        }
    }

    return partial(func, [], len);
}
