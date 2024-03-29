const common = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack  = require('webpack');

module.exports = merge(common, {
    entry: '/src/js/index-dev.js',
    mode: "development",
    devtool:"eval-source-map",
    output: {
        filename: 'bundle.js',
          // publicPath: '/static/'
    },
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        },
        client: {
            overlay: true // overlay to show compiler errors
        },
        liveReload: false,  
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[md4:hash:7]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition:{
                        maxSize: 1 * 1024,
                    }
                },
                generator: {
                    filename: './image/[name][ext]'
                } 
            }
        ]
    },


    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

});