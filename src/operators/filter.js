export default f => next => r => f(r) && next(r);
