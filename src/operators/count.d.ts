import { OperatorFn } from './pipe';

declare function count<T>(startAt?: number): OperatorFn<T, T[]>

export default count;