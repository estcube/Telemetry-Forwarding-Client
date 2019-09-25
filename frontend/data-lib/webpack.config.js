const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ["./src/index.ts"],

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

    mode: 'production',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js",
        library: 'data-components',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },

    plugins: [
        new CopyPlugin([
        ])
    ],

    externals: {
        react: 'react'
    }
}