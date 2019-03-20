// https://www.tslang.cn/docs/handbook/declaration-files/by-example.html

/** 组件总数 */
// declare var foo: number;

export as namespace jsminiFunctional;

export function pipe (...fns: Function[]): Function;
export function compose (...fns: Function[]): Function;
