export default (...props) => next => arg =>
  next(props.reduce((acc, p) => acc[p], arg));
