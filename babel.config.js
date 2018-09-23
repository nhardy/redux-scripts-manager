module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-lodash',
    [
      'module-resolver',
      {
        alias: {
          src: ['./src'],
          test: ['./test'],
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        'babel-plugin-istanbul',
      ],
    },
  },
};
