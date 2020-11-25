import { OperatorFn } from './pipe';

declare function distinct<T>(comparator?: (a: T, b: T) => boolean): OperatorFn<T, T>

export default distinct;