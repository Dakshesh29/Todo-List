// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry file
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development', // Change to 'production' when you're ready to build
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Load CSS files
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',
    }),
  ],
};
