import 'webpack-hot-middleware/client'
import { renderApp } from './index';

if (module.hot) {
    module.hot.accept('./index.js', function () {
        console.log('accepting the update index.js module');
        renderApp()
    })
}