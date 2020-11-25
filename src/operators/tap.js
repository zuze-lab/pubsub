export default fn => next => r => next((fn(r), r));
