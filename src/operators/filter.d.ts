import { OperatorFn, UnaryFunction } from './pipe';

export function filter<T>(filterFn: UnaryFunction<T, boolean>): OperatorFn<T, T>

export default filter;