module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-types': [
      'warn',
      { allowExpressions: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': [
      'warn',
      { allow: ['warn', 'error'] },
    ],
  },
};
