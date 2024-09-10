const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '/'
    },
    plugins: [
        new Dotenv({
            systemvars: true, // This will load all system environment variables
            safe: false, // Set this to false to avoid the need for a .env.example file
            defaults: false // Don't load a .env file by default
        })
    ]
});