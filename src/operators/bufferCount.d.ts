import { OperatorFn } from './pipe';

declare function bufferCount<T>(size?: number, every?: number): OperatorFn<T, T[]>

export default bufferCount;