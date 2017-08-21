const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const boolean = require('boolean');

const {
    APP_NAME,
    WP_INDEX = true,
} = process.env;

const plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        filename: `${APP_NAME}.index.html`,
        alwaysWriteToDisk: true,
        env: process.env,
    }),
    new HtmlWebpackHarddiskPlugin(),
];

if (boolean(WP_INDEX)) {
    plugins.push(
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            filename: '../index.html',
            alwaysWriteToDisk: true,
            env: process.env,
        }),
    );
}

module.exports = {
    plugins,
};
