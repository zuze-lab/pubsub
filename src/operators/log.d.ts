import { OperatorFn } from './pipe';

declare function log<T>(logger?: (arg: T) => void): OperatorFn<T, T>

export default log;