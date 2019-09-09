const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'),

const MyPlugin = require('./Web/src/plugin/myplugin.js');

module.exports = {
    entry: './Web/src/app.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'happypack/loader?id=babel',
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                use: 'happypack/loader?id=styles',
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
            '@mock': path.resolve(__dirname, 'Web/mock')
        },
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: [{
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }]
        }),
        new HappyPack({
            id: 'styles',
            loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
        }),
        new HtmlWebPackPlugin({
            template: './Web/index.html',
            filename: './index.html'
        }),
        new webpack.DefinePlugin({
            __IS_MOCK__: process.argv.includes('--mock'),
        }),
        new ParallelUglifyPlugin({
            uglifyJS: {
                output: {
                  // 最紧凑的输出
                  beautify: false,
                  // 删除所有的注释
                  comments: false,
                },
                compress: {
                  // 在UglifyJs删除没有用到的代码时不输出警告
                  warnings: false,
                  // 删除所有的 `console` 语句，可以兼容ie浏览器
                  drop_console: true,
                  // 内嵌定义了但是只用到一次的变量
                  collapse_vars: true,
                  // 提取出出现多次但是没有定义成变量去引用的静态值
                  reduce_vars: true,
                }
            },
            test: /.js$/g,
            include: [],
            exclude: [],
            cacheDir: '',
            workerCount: '',
            sourceMap: false
        }),
        new MyPlugin({ name: 'nana' }),
        // // 构建优化插件
    
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