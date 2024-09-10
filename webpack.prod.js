const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                BASENAME: process.env.BASENAME,
                BACKEND_URL: process.env.BACKEND_URL,
                REACT_APP_RAPIDAPI_KEY: process.env.REACT_APP_RAPIDAPI_KEY,
                // Add any other environment variables you need here
            })
        })
    ]
});