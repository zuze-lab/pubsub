import { interrupt } from './utils';

export default (...props) =>
  interrupt((c, o) => c(props.reduce((acc, p) => acc[p], o)));
