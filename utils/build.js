const webpack = require('webpack');
const config = require('../webpack.config');

delete config.noHotReload;

webpack(
    config,
    function (err) { if (err) throw err; }
);
