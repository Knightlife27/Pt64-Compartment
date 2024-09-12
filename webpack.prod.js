const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                BASENAME: process.env.BASENAME,
                BACKEND_URL: process.env.BACKEND_URL,
                REACT_APP_RAPIDAPI_KEY: process.env.REACT_APP_RAPIDAPI_KEY,
            })
        })
    ]
});