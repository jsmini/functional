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
