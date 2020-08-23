module.exports = {
  mode: 'development',
  entry: './src/Main.tsx',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: [
      '.ts', '.tsx', '.js',
    ],
  },
};