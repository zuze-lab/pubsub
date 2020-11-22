import { pipeableInterrupt } from './utils';
import stack from './stack';

export default () => pipeableInterrupt(stack(2, 2));
