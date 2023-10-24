module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:react-hooks/recommended', 'prettier'],
  rules: {
    'import/order': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
