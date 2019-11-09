module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  rules: {
    'implicit-arrow-linebreak': 0,
  },
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
};
