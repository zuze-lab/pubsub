import { OperatorFn } from './pipe';

declare function mapTo<R>(to: R): OperatorFn<any, R>

export default mapTo;