import { OperatorFn } from './pipe';

declare function throttle<T>(by: number): OperatorFn<T, T>

export default throttle;