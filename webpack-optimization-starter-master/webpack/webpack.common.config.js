const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const config = {
    // entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // filename:'bundle.js'
        // clean : true  // Only works in production mode
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'images/img/*.*'
            }]
        }),
        new CleanWebpackPlugin() // cleans in both dev and prod  
    ]
};


module.exports = config;