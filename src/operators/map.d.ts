import { OperatorFn } from './pipe';

declare function map<T, R>(mapper: (arg: T) => R): OperatorFn<T, R>

export default map;