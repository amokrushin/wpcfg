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
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'postcss-loader' },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' },
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
