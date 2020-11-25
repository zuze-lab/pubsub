export default by => next => r => setTimeout(() => next(r), by);
