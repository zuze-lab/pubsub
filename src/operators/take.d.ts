import { OperatorFn } from './pipe';

declare function take<T>(n: number): OperatorFn<T, T>

export default take;