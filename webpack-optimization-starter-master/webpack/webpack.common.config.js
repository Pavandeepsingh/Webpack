const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // clean : true  // Only works in production mode
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html'
        }),
        new CleanWebpackPlugin() // cleans in both dev and prod  
    ]
};


module.exports = config;