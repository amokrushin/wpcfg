const webpack = require('webpack');
const VueLoaderOptionsPlugin = require('vue-loader-options-plugin');

const {
    NODE_ENV,
} = process.env;

const config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            VUE_DEVTOOLS: NODE_ENV === 'development',
            VUEX_STRICT: NODE_ENV === 'development',
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader',
                    js: 'babel-loader',
                },
            },
            minimize: NODE_ENV === 'production',
        }),
        new VueLoaderOptionsPlugin({
            babel: {
                presets: [
                    'babel-preset-es2015',
                    'babel-preset-es2016',
                    'babel-preset-stage-0'
                ].map(require.resolve),
                plugins: [
                    'babel-plugin-lodash',
                ].map(require.resolve),
            },
        }),
    ],
};

module.exports = config;
