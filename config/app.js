const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            filename: '../index.html',
            alwaysWriteToDisk: true,
            env: {},
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
        }),
    ],
};
