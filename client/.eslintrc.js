module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
  },
  "env": {
    "browser": true
  },
  globals: {
    document: 1,
  },
};
