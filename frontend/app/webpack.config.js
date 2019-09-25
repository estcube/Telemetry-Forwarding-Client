const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["./src/index.tsx"],
    module: {
        rules: [
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
        symlinks: false
    },

    devServer: {
        hot: true
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
}