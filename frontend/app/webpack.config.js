const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint')
            },
            loader: 'eslint-loader'
          }
        ],
        exclude: /node_modules|dist/
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    symlinks: false,

    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json')
      })
    ]
  },

  devServer: {
    hot: true,
    historyApiFallback: true
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};