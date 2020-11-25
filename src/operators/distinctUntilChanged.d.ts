import { OperatorFn } from './pipe';

declare function distinctUntilChanged<T>(comparator?: (a: T, b: T) => boolean): OperatorFn<T, T>

export default distinctUntilChanged;