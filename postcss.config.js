// const postcssMixinColor = require('./src/fusion-components/theme/mixins')

module.exports = {
  plugins: {
    'postcss-import': {
      path: ['src/assets/styles']
    },
    'postcss-preset-env': {
      features: {
        'custom-properties': {
          preserve: true
        },
        'color-mod-function': true
      }
    },
    'postcss-calc': {},
    'precss': {}
  }
}
