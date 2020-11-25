export type UnaryFunction<T, S = void> = (arg: T) => S;
export type OperatorReturningUnary<T, R> = (arg: T) => OperatorFn<T, R>;
export type OperatorFn<T, R> = (next: UnaryFunction<R>) => OperatorReturningUnary<T, R>

declare function pipe<S, T1>(op1: OperatorFn<S, T1>): UnaryFunction<S>;
declare function pipe<S, T1, T2>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4, T5>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4, T5, T6>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4, T5, T6, T7>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4, T5, T6, T7, T8>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>, op8: OperatorFn<T7, T8>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4, T5, T6, T7, T8, T9>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>, op8: OperatorFn<T7, T8>, op9: OperatorFn<T8, T9>): UnaryFunction<S>;
declare function pipe<S, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(op1: OperatorFn<S, T1>, op2: OperatorFn<T1, T2>, op3: OperatorFn<T2, T3>, op4: OperatorFn<T3, T4>, op5: OperatorFn<T4, T5>, op6: OperatorFn<T5, T6>, op7: OperatorFn<T6, T7>, op8: OperatorFn<T7, T8>, op9: OperatorFn<T8, T9>, op10: OperatorFn<T9, T10>): UnaryFunction<S>;

export default pipe;