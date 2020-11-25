import { OperatorFn } from './pipe';

declare function single<T>(): OperatorFn<T, T>

export default single;