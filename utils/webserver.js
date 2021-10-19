const DevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const env = require('./env');

env.NODE_ENV = 'development';

const devServerConfig = {
    hot: false, // Needed to manually set HMR
    client: false, // Also needed for HMR
    compress: true,
    host: 'localhost', // Set manually so the scripts won't use window.location.hostname
    port: env.PORT,
    // Since the extension must be loaded into the browser,
    // we need the devserver to write the files on the system
    devMiddleware: {
        writeToDisk: true,
    },
};

const excludeEntriesToHotReload = (config.noHotReload || []);

delete config.noHotReload;

(async () => {
    // Enable HMR only for entries that can be hot reloaded
    for (let entryName in config.entry) {
        if (-1 !== excludeEntriesToHotReload.indexOf(entryName)) {
            continue;
        }
        config.entry[entryName] = [
            'webpack/hot/dev-server',
            'webpack-dev-server/client/index.js?quiet=true&hot=true&live-reload=true&hostname=localhost&port=' + env.PORT
        ].concat(config.entry[entryName]);
    }

    config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);

    const compiler = webpack(config);
    const server = new DevServer(devServerConfig, compiler);

    await server.start();
    console.log('dev server is running');
})();
