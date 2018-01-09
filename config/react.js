const config = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'babel-preset-es2015',
                                'babel-preset-es2016',
                                'babel-preset-react',
                                'babel-preset-stage-0'
                            ].map(require.resolve),
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = config;
