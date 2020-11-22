import createOperator from './createOperator';

export default createOperator((...props) => next => arg =>
  next(props.reduce((acc, p) => acc[p], arg)),
);
