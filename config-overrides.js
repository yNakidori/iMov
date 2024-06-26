const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        url: require.resolve('url/'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        fs: false,
        net: false,
        tls: false,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        querystring: require.resolve('querystring-es3'),
        process: require.resolve('process/browser'),
        events: require.resolve('events/'),
        child_process: false,
        'node:stream': require.resolve('stream-browserify'),
        'node:util': require.resolve('util/')
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        }),
        new NodePolyfillPlugin()
    );
    return config;
};
