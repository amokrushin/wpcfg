const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const path = require('path');
const boolean = require('boolean');

const {
    APP_NAME,
    NODE_ENV,
    CWD,
    PUBLIC_DIR,
    BUILD_DIR,
    BUILD_PATH,
    WPK_DEVTOOL,
    WPK_EXTRACT_RUNTIME,
} = process.env;

const config = {
    context: CWD,
    entry: {
        client: './src/index.js',
    },
    output: {
        filename: `${APP_NAME}.[name].js`,
        chunkFilename: `${APP_NAME}.[id].chunk.js`,
        sourceMapFilename: `${APP_NAME}.[name].js.map`,
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
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                loader: `file-loader?name=${APP_NAME}.[hash].[ext]`,
            },
            {
                test: /\.(eot|svg|ttf|woff2?)(\?\S*)?$/,
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

if (NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: Boolean(WPK_DEVTOOL),
        }),
    );
}

if (boolean(WPK_EXTRACT_RUNTIME)) {
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpack-runtime',
            minChunks: Infinity,
        })
    );
}

module.exports = config;
