import createOperator from './createOperator';
import stack from './stack';

export default createOperator(() => stack(2, 2));
