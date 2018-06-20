const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
};

const commonConfig = merge([
  {
    entry: {
      app: './src/js/app.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
      }),
    ],
    output: {
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
  },
  parts.loadJavaScript({
    include: PATHS.app,
    exclude: /node_modules/,
  }),
]);

const productionConfig = merge([
  parts.extractCSS({
    exclude: /node_modules/,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      parts.autoprefix(),
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  }),
  parts.generateSourceMaps({ type: 'source-map' }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  parts.loadCSS({
    exclude: /node_modules/,
  }),
  parts.generateSourceMaps({ type: 'eval-source-map' }),
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
