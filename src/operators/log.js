import createOperator from './createOperator';
import tap from './tap';

export default createOperator((fn = console.log) => tap(fn));
