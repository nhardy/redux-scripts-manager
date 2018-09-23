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
  ],
  env: {
    test: {
      plugins: [
        'babel-plugin-istanbul',
      ],
    },
  },
};
