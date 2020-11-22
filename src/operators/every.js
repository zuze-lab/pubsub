import { pipeableInterrupt } from './utils';
import map from './map';
import bufferCount from './bufferCount';

export default size =>
  pipeableInterrupt(
    bufferCount(1, size),
    map(e => e.pop()),
  );
