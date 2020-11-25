import pipe from './pipe';

export default (...p) => next => pipe(...p.concat(() => next));
