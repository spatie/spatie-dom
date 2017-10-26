module.exports = {
    entry: './demo/demo.js',

    devServer: {
        contentBase: './demo',
    },

    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
            },
        ],
    },
};
