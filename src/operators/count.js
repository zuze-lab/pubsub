export default (startAt = 0) => next => r => next([startAt++, r]);
