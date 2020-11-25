import { OperatorFn } from './pipe';

declare function distinctKey<T, R extends keyof T>(key: R, comparator?: (a: T[R], b: T[R]) => boolean): OperatorFn<T, T>

export default distinctKey;