const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const path = require('path');

const {
    APP_NAME,
    NODE_ENV,
    CWD,
    PUBLIC_DIR,
    BUILD_DIR,
    BUILD_PATH,
    WPK_DEVTOOL,
    WPK_EXTRACT_RUNTIME = true,
} = process.env;

const config = {
    context: CWD,
    entry: {
        client: './src/index.js',
    },
    output: {
        filename: `${APP_NAME}.[name].js`,
        chunkFilename: `${APP_NAME}.[id].chunk.js`,
        sourceMapFilename: `${APP_NAME}.[name].map`,
        path: path.resolve(BUILD_DIR),
        publicPath: BUILD_PATH,
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, '../node_modules')],
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, '../node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'babel-preset-es2015',
                                'babel-preset-es2016',
                                'babel-preset-stage-0'
                            ].map(require.resolve),
                            plugins: [
                                'babel-plugin-lodash',
                            ].map(require.resolve),
                        },
                    },
                ],
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                loader: `file-loader?name=${APP_NAME}.[hash].[ext]`,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: `file-loader?name=${APP_NAME}.[hash].[ext]`,
            },
            {
                test: /\.html$/,
                loaders: ['html-loader'],
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV,
        }),
        new webpack.EnvironmentPlugin({
            VUE_DEVTOOLS: NODE_ENV === 'development',
            VUEX_STRICT: NODE_ENV === 'development',
        }),

        new CleanWebpackPlugin([BUILD_DIR], {
            root: PUBLIC_DIR,
            verbose: true,
            dry: false,
            exclude: [],
        }),
        new UnusedFilesWebpackPlugin({
            pattern: 'src/**/*.*',
            globOptions: {
                ignore: ['node_modules/**/*', '**/selection.json'],
            },
        }),
    ],
    devtool: WPK_DEVTOOL || false,
};

if (WPK_EXTRACT_RUNTIME) {
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpack-runtime',
            minChunks: Infinity,
        })
    );
}

module.exports = config;
