module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'max-len': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
    'import/no-extraneous-dependencies': 1,
  },
};
