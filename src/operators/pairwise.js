import createOperator from './createOperator';
import pipe from './pipe';
import stack from './stack';

export default createOperator(() => next => pipe(stack(2, 2), () => next));
