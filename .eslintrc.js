module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'next/core-web-vitals',
  ],
  rules: {
    // Custom rules
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
      },
    ],
    'no-extra-semi': 'error',
    '@typescript-eslint/semi': ['error', 'never'], // Add this line
    'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
