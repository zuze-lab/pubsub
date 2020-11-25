import { OperatorFn } from './pipe';

declare function debounce<T>(by: number, leading?: boolean): OperatorFn<T, T>

export default debounce;