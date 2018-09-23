module.exports = {
  extends: 'nhardy/typescript',
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.eslintrc.js',
          'babel-register.js',
          'babel.config.js',
          'test/**/*',
          'typings/**/*',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.json'],
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
};
