module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'quotes': 'off',
    'comma-dangle': 1,
    'space-before-function-paren': 0,
    'no-trailing-spaces':0,
    'padded-blocks':1,
    'comma-spacing':'off',
    'no-unused-vars':'off'
  }
}
