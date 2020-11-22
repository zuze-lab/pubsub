import createOperator from './createOperator';
export default createOperator(m => next => (...args) => next(m(...args)));
