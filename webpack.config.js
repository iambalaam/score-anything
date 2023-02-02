const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'production',

    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist'),
        clean: true
    },

    resolve: {
        extensions: ['.tsx', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Score Anything'
        })
    ]
}