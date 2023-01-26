const express = require('express');
const app = express();
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

if (process.env.NODE_ENV == 'dev') {
    console.log('development mode');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const configuration = require('../webpack/webpack.dev.config');
    const webpack = require('webpack');
    const webpackCompiler = webpack(configuration);
    app.use(
        webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
    )
    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(webpackCompiler));
}

app.get('/', (req, res) => {
    const absolutePathToHTMLFile = path.resolve(__dirname, '../dist/index.html');
    res.sendFile(absolutePathToHTMLFile);
});

// app.use('/static', express.static(path.resolve(__dirname,'../dist')))

app.use('/',
    expressStaticGzip(
        path.resolve(__dirname, '../dist'),
        {
            enableBrotli: true,
            orderPreference:['br','gz']
        }
    )
)

app.listen(3000, () => {
    console.log('listening to port = ' + 3000);
})