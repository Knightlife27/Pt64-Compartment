const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    entry: './src/front/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            ['@babel/plugin-transform-runtime', { regenerator: true }]
                        ]
                    }
                }
            },
            {
                test: /\.(css|scss)$/, use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.BASENAME': JSON.stringify(process.env.BASENAME),
            'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
            'process.env.REACT_APP_RAPIDAPI_KEY': JSON.stringify(process.env.REACT_APP_RAPIDAPI_KEY)
        })
    ]
});