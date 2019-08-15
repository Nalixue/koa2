const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './Web/src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'Web/src'),
        },
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './Web/index.html',
            filename: './index.html'
        }),
        // // 构建优化插件
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor-[hash].min.js',
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //       warnings: false,
        //       drop_console: false,
        //     }
        // }),
        
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};