module.exports = {
  env: {
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'prefer-const': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
  },
};
