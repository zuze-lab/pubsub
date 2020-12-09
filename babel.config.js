if (process.env.NODE_ENV === 'test') {
  module.exports = { presets: [['@babel/preset-env']] };
} else {
  module.exports = {
    presets: [['@babel/preset-env']],
    plugins: [['add-module-exports']],
  };
}
