import { OperatorFn } from './pipe';

declare function delay<T>(by: number): OperatorFn<T, T>

export default delay;