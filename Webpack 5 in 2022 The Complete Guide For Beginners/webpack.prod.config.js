const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        'hello-world': './src/index.js',
        'kiwi': './src/index.js'
    },
    output: {
        filename: '[name].[id].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        // publicPath: '../',
        // clean: true
    },
    mode: 'production', // 'none',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 3000
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
                    // 'style-loader', 'css-loader',
                    MiniCssExtractPlugin.loader, 'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader', 'css-loader', 'sass-loader'
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js/,
                // exclude: '/node_modules/',
                exclude: [
                    "/\.spec.js/",
                    "/\.spec.ts/",
                    "/\.spec.tsx/",
                    "/node_modules/"
                  ],
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
        new MiniCssExtractPlugin(({
            filename: '[name].[id].[contenthash].css'
        })),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "hello-world.html",
            title: "Hello World",
            template: 'src/index.hbs',
            description: 'Some description',
            chunks: ['hello-world']
            // minify:false
            // filename:"subfolder/custom_filename.html",
            // meta: {
            //     description: 'Some description'
            // }
        }),
        new HtmlWebpackPlugin({
            filename: "kiwi.html",
            title: "Hello world",
            template: 'src/index.hbs',
            description: 'Some description',
            chunks: ['kiwi']
            // minify:false
        })
    ]
};