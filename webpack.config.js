const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MyPlugin = require('./Web/src/plugin/myplugin.js');

module.exports = {
    entry: './Web/src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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
            }, {
                test: /\.txt/,
                use: [
                    './Web/src/loader/myLoader2.js', './Web/src/loader/myLoader1.js'
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
        new MyPlugin({name: 'nana'}),
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