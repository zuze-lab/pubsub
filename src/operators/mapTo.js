import createOperator from './createOperator';
import map from './map';
export default createOperator(m => map(() => m));
