const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        'hello-world': './src/index.js',
        'kiwi': './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        // publicPath: '../',
        // clean: true
    },
    mode: 'development', // 'none',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /\.(ttf)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024 // 3 kilobytes
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader',
                    // MiniCssExtractPlugin.loader, 'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                    // MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            }
        ]
    },
    plugins: [
        // new TerserPlugin(),
        // new MiniCssExtractPlugin(({
        //     filename: 'styles.css'
        // })),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "hello-world.html",
            title: "Hello World",
            template: 'src/index.hbs',
            description: 'Some description',
            chunks: ['hello-world']
            // filename:"subfolder/custom_filename.html",
            // meta: {
            //     description: 'Some description'
            // }
        }),
        new HtmlWebpackPlugin({
            filename: "kiwi.html",
            title: "whatever",
            template: 'src/index.hbs',
            description: 'Some description',
            chunks: ['kiwi']
            // filename:"subfolder/custom_filename.html",
            // meta: {
            //     description: 'Some description'
            // }
        })
    ]
};