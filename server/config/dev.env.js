module.exports = {
  env: 'development',
  port: 18686,
  proxy: {
    target: 'http://localhost:18686'
  }
}