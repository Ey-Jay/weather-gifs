const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
};
