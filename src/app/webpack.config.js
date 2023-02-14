const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_DIR = resolve(__dirname, '../..');
const APP_DIR = resolve(ROOT_DIR, 'src/app');
const BUILD_DIR = resolve(ROOT_DIR, 'dist');

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    entry: resolve(APP_DIR, 'index.tsx'),
    output: {
        filename: '[name].bundle.js',
        path: BUILD_DIR,
        clean: true
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Score Anything'
        })
    ]
}