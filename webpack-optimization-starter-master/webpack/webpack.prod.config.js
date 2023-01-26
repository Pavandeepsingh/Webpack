const common = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const path = require('path');
const glob = require('glob');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
    entry: './src/js/index.js',
    mode: "production",
    output: {
        filename: 'js/[name].[contenthash:12].js',
        // publicPath: '/static/'
    },
    devtool: "source-map",
    optimization: {
        minimize: true,
        usedExports: true,
        minimizer: [
            `...`,
            new CssMinimizerWebpackPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            }),
            // new ImageMinimizerPlugin({
            //     minimizer: {
            //         implementation: ImageMinimizerPlugin.imageminMinify,
            //         options: {
            //             plugins: [
            //                 ['imagemin-mozjpeg', { quality: 40 }],
            //                 ['imagemin-pngquant', {
            //                     quality: [0.65, 0.90],
            //                     speed: 4
            //                 }],
            //                 ['imagemin-gifsicle', { interlaced: true }],
            //                 ['imagemin-svgo', {
            //                     plugins: [
            //                         {
            //                             name: 'preset-default',
            //                             params: {
            //                                 overrides: {
            //                                     removeViewBox: false,
            //                                     addAttributesToSVGElement: {
            //                                         params: {
            //                                             attributes: [
            //                                                 { xmlns: 'http://www.w3.org/2000/svg' }
            //                                             ]
            //                                         }
            //                                     }
            //                                 }
            //                             }
            //                         }
            //                     ]
            //                 }]
            //             ]
            //         }
            //     },
            //     generator: [
            //         {
            //             type: 'asset',
            //             preset: 'webp-custom-name',
            //             implementation: ImageMinimizerPlugin.imageminGenerate,
            //             options: {
            //                 plugins: ['imagemin-webp']
            //             }
            //         }
            //     ]
            // })
        ],
        runtimeChunk: "single",
        splitChunks: {
            // cacheGroups: {
            //     jquery :{
            //         test: /[\\/]node_modules[\\/]jquery[\\/]/,
            //         chunks: "initial",
            //         name: 'jquery'
            //     }, 
            //     bootstrap: {
            //         test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
            //         chunks: "initial",
            //         name: 'bootstrap'
            //     }
            // }

            //  OR
            // chunks: "all",
            // maxSize: Infinity,
            // minSize: 0,
            // name(module, chunks, cacheGroupKey) {
            //     const filePathAsArray = module.identifier().split('\\');
            //     return filePathAsArray[filePathAsArray.length -1]
            // },
            // Or
            // cacheGroups: {
            //     node_modules: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name: "node_modules"
            //     }
            // }
            //  Or 
            // cacheGroups: {
            //     node_modules: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name(module) {
            //             const packageName = module.context.match(
            //                 /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            //             )[1]
            //             return packageName;
            //         }
            //     }
            // }

            // OR

            chunks: "all",
            maxSize: Infinity,
            minSize: 2000,
            cacheGroups: {
                jquery: {
                    test: /[\\/]node_modules[\\/]jquery[\\/]/,
                    name: 'jquery',
                    priority: 2
                },
                // bootstrap: {
                //     test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
                //     name: 'bootstrap'
                // },
                lodash: {
                    test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
                    name: 'lodash-es',
                    priority: 2
                },
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "node_modules",
                    chunks: "initial"
                },
                async: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "async",
                    name(module, chunks) {
                        return chunks.map(chunk => chunk.name).join('-')
                    }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64]'
                            }
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg|jpeg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024,
                    }
                },
                generator: {
                    filename: './image/[name].[contenthash:10][ext]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 40 // max value 100
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, '../src')}/**/*`,
                { nodir: true }
            )
        })
    ]
});