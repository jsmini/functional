// https://www.tslang.cn/docs/handbook/declaration-files/by-example.html

/** 组件总数 */
// declare var foo: number;

export as namespace jsminiFunctional;

export function pipe(...fns: Function[]): Function;
export function compose(...fns: Function[]): Function;
export function curry(func: Function, len?: number): Function;
export function curryRight(func: Function, len?: number): Function;
export function debounce(func: Function, time?: number): Function;
export function throttle(func: Function, time?: number): Function;
