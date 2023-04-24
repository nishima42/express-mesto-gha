module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-base',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': ['error', { allow: ['log'] }],
  },
};
