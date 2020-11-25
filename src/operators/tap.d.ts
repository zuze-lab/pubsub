import { OperatorFn } from './pipe';

declare function tap<T>(fn: (arg: T) => void): OperatorFn<T, T>

export default tap;