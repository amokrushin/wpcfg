const webpack = require('webpack');
const path = require('path');

const { APP_ORIGIN, WDS_BASE_DIR, WDS_PORT, WDS_HOST, WDS_HMR = true } = process.env;

module.exports = {
    devServer: {
        contentBase: path.resolve(WDS_BASE_DIR),
        compress: true,
        port: WDS_PORT,
        host: WDS_HOST,
        stats: { chunks: false },
        public: APP_ORIGIN.replace(/^https?:\/\//, ''),
        hot: WDS_HMR,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
};
