export type UnaryFunction<T, S = void> = (arg: T) => S;
export type OperatorReturningUnary<T, R> = (arg: T) => OperatorFn<T, R>;
export type OperatorFn<T, R> = (next: UnaryFunction<R>) => OperatorReturningUnary<T, R>

type Comparator<T = any> = (a: T, b: T) => boolean;

type pipe<S> = {
    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
        op1: OperatorFn<S, T1>,
        op2?: OperatorFn<T1, T2>,
        op3?: OperatorFn<T2, T3>,
        op4?: OperatorFn<T3, T4>,
        op5?: OperatorFn<T4, T5>,
        op6?: OperatorFn<T5, T6>,
        op7?: OperatorFn<T6, T7>,
        op8?: OperatorFn<T7, T8>,
        op9?: OperatorFn<T8, T9>,
        op10?: OperatorFn<T9, T10>,
        op11?: OperatorFn<T10, T11>,
        op12?: OperatorFn<T11, T12>,
        op13?: OperatorFn<T12, T13>,
        op14?: OperatorFn<T13, T14>,
    ): UnaryFunction<S>;
};

export function createPipe<S>(): pipe<S>;
export function bufferCount<T>(size?: number, every?: number): OperatorFn<T, T[]>
export function count<T>(startAt?: number): OperatorFn<T, [number, T]>
export function debounce<T>(by: number, leading?: boolean): OperatorFn<T, T>
export function delay<T>(by: number): OperatorFn<T, T>
export function distinct<T>(comparator?: Comparator<T>): OperatorFn<T, T>
export function distinctKey<T, R extends keyof T>(key: R, comparator?: Comparator<T[R]>): OperatorFn<T, T>
export function distinctUntilChanged<T>(comparator?: Comparator<T>): OperatorFn<T, T>
export function distinctUntilKeyChanged<T, R extends keyof T>(key: R, comparator?: Comparator<T[R]>): OperatorFn<T, T>
export function every<T>(num: number): OperatorFn<T, T>
export function filter<T>(filterFn: (arg: T) => boolean): OperatorFn<T, T>
export function log<T>(): OperatorFn<T, T>
export function map<T, R>(mapper: (arg: T) => (R | Promise<R>)): OperatorFn<T, R>
export function mapTo<R>(to: R): OperatorFn<any, R>
export function pairwise<T>(): OperatorFn<T, [T, T]>

export function pluck<T, K1 extends keyof T>(k1: K1): OperatorFn<T, T[K1]>;
export function pluck<T, K1 extends keyof T, K2 extends keyof T[K1]>(k1: K1, k2: K2): OperatorFn<T, T[K1][K2]>;
export function pluck<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(k1: K1, k2: K2, k3: K3): OperatorFn<T, T[K1][K2][K3]>;
export function pluck<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(k1: K1, k2: K2, k3: K3, k4: K4): OperatorFn<T, T[K1][K2][K3][K4]>;
export function pluck<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): OperatorFn<T, T[K1][K2][K3][K4][K5]>;
export function pluck<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]>(k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): OperatorFn<T, T[K1][K2][K3][K4][K5][K6]>;


export function single<T>(): OperatorFn<T, T>
export function skip<T>(n: number): OperatorFn<T, T>
export function skipUntil<T>(arg: Promise<any>): OperatorFn<T, T>;
export function skipWhile<T>(arg: () => boolean): OperatorFn<T, T>;
export function stack<T>(minSize?: number, maxSize?: number): OperatorFn<T, T[]>
export function take<T>(n: number): OperatorFn<T, T>
export function takeUntil<T>(arg: Promise<any>): OperatorFn<T, T>;
export function takeWhile<T>(arg: () => boolean): OperatorFn<T, T>;
export function tap<T>(fn: (arg: T) => void): OperatorFn<T, T>;
export function subscriber<T>(fn: (arg: T) => void): OperatorFn<T, T>;
export function throttle<T>(by: number): OperatorFn<T, T>
export function startWith<T>(arg: T | Promise<T> | (() => (T | Promise<T>))): OperatorFn<T, T>

export function pipe<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    op1: OperatorFn<T, T1>,
    op2?: OperatorFn<T1, T2>,
    op3?: OperatorFn<T2, T3>,
    op4?: OperatorFn<T3, T4>,
    op5?: OperatorFn<T4, T5>,
    op6?: OperatorFn<T5, T6>,
    op7?: OperatorFn<T6, T7>,
    op8?: OperatorFn<T7, T8>,
    op9?: OperatorFn<T8, T9>,
    op10?: OperatorFn<T9, T10>,
    op11?: OperatorFn<T10, T11>,
): UnaryFunction<T>

type Selector<T, R> = (arg: T) => R;

type selectorOne<S> = {
    <T1, M>(
        selectorA: Selector<S, T1>,
        combiner: (arg: [T1]) => M
    ): OperatorFn<S, M>
}
type selectorTwo<S> = {
    <T1, T2, M>(
        selectorA: Selector<S, T1>,
        selectorB: Selector<S, T2>,
        combiner: (arg: [T1, T2]) => M
    ): OperatorFn<S, M>
}

type selectorThree<S> = {
    <T1, T2, T3, M>(
        selectorA: Selector<S, T1>,
        selectorB: Selector<S, T2>,
        selectorC: Selector<S, T3>,
        combiner: (arg: [T1, T2, T3]) => M
    ): OperatorFn<S, M>
}

type selectorFour<S> = {
    <T1, T2, T3, T4, M>(
        selectorA: Selector<S, T1>,
        selectorB: Selector<S, T2>,
        selectorC: Selector<S, T3>,
        selectorD: Selector<S, T4>,
        combiner: (arg: [T1, T2, T3, T4]) => M
    ): OperatorFn<S, M>
}

type selectorFive<S> = {
    <T1, T2, T3, T4, T5, M>(
        selectorA: Selector<S, T1>,
        selectorB: Selector<S, T2>,
        selectorC: Selector<S, T3>,
        selectorD: Selector<S, T4>,
        selectorE: Selector<S, T5>,
        combiner: (arg: [T1, T2, T3, T4, T5]) => M
    ): OperatorFn<S, M>
}

type selector<S> = selectorOne<S> | selectorTwo<S> | selectorThree<S> | selectorFour<S> | selectorFive<S>

export function createSelector<T>(comparator?: Comparator): selector<T>;

export function select<T, R1, S>(
    selectorA: Selector<T, R1>,
    combiner: (arg: [R1]) => S
): OperatorFn<T, S>

export function select<T, R1, R2, S>(
    selectorA: Selector<T, R1>,
    selectorB: Selector<T, R2>,
    combiner: (arg: [R1, R2]) => S
): OperatorFn<T, S>

export function select<T, R1, R2, R3, S>(
    selectorA: Selector<T, R1>,
    selectorB: Selector<T, R2>,
    selectorC: Selector<T, R3>,
    combiner: (arg: [R1, R2, R3]) => S
): OperatorFn<T, S>

export function select<T, R1, R2, R3, R4, S>(
    selectorA: Selector<T, R1>,
    selectorB: Selector<T, R2>,
    selectorC: Selector<T, R3>,
    selectorD: Selector<T, R4>,
    combiner: (arg: [R1, R2, R3, R4]) => S
): OperatorFn<T, S>

export function select<T, R1, R2, R3, R4, R5, S>(
    selectorA: Selector<T, R1>,
    selectorB: Selector<T, R2>,
    selectorC: Selector<T, R3>,
    selectorD: Selector<T, R4>,
    selectorE: Selector<T, R5>,
    combiner: (arg: [R1, R2, R3, R4, R5]) => S
): OperatorFn<T, S>

export function shallow<T = Record<string, any>>(comparator?: Comparator<T[keyof T]>): Comparator<T>;
export function array<T extends any[]>(comparator?: Comparator<T[keyof T]>): Comparator<T>
export function unordered<T extends any[]>(transform?: <R>(arg: T[keyof T]) => R): Comparator<T>