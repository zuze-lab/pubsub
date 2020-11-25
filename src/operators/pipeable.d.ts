import { OperatorFn } from './pipe';

declare function pipeable<S, T1>(op1: OperatorFn<S, T1>): OperatorFn<S, void>
declare function pipeable<S, T1, T2>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4, T5>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4, T5, T6>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4, T5, T6, T7>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4, T5, T6, T7, T8>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>, op8: OperatorFn<T7, T8>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4, T5, T6, T7, T8, T9>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>, op8: OperatorFn<T7, T8>, op9: OperatorFn<T8, T9>): OperatorFn<S, void>
declare function pipeable<S, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>, op8: OperatorFn<T7, T8>, op9: OperatorFn<T8, T9>, op10: OperatorFn<T9, T10>): OperatorFn<S, void>

export default pipeable;
