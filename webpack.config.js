const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './Web/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
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
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './Web/src/index.html',
            filename: './Web/index.html'
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