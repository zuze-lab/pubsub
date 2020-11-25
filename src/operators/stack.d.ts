import { OperatorFn } from './pipe';

declare function stack<T>(minSize?: number, maxSize?: number): OperatorFn<T, T[]>

export default stack;