import { OperatorFn } from './pipe';

declare function skip<T>(n: number): OperatorFn<T, T>

export default skip;