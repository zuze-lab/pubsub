import { OperatorFn } from './pipe';

declare function pairwise<T>(): OperatorFn<T, [T, T]>

export default pairwise;