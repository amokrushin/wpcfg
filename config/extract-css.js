const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
    APP_NAME,
} = process.env;

const config = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 2, sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin(`${APP_NAME}.css`),
    ],
};

module.exports = config;
