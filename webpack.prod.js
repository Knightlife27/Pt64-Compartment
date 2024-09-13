const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // Use for production
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|webp)$/,  // Image assets
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'  // Custom path for assets
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)$/,  // Font files
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'  // Custom path for fonts
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: '4geeks.ico',  // Add your favicon here
            template: './public/index.html',  // Adjust the template path as needed
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'  // Output CSS file
        }),
        new webpack.DefinePlugin({
            'process.env.BASENAME': JSON.stringify(process.env.BASENAME),
            'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL),
            'process.env.REACT_APP_RAPIDAPI_KEY': JSON.stringify(process.env.REACT_APP_RAPIDAPI_KEY)
        })
    ]
});
