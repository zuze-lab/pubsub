import stack from './stack';
import map from './map';
import { pipeableInterrupt } from './utils';
export default times =>
  pipeableInterrupt(
    stack(times + 1),
    map(e => e.pop()),
  );
