const webpack = require('webpack');

module.exports = {
    resolve: {
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
            url: require.resolve('url/'),
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        }),
    ],
};
