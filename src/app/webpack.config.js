const assert = require('assert');
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlTemplate } = require('./html');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const ROOT_DIR = resolve(__dirname, '../..');
const APP_DIR = resolve(ROOT_DIR, 'src/app');
const BUILD_DIR = resolve(ROOT_DIR, 'dist');

const ENVIRONMENTS = ['development', 'production'];
const env = process.env.NODE_ENV;
const isProd = env == 'production';
assert(ENVIRONMENTS.includes(env), `Unknown environment ${env}, expected to be in [${ENVIRONMENTS}]`);

module.exports = {
    mode: env,
    devtool: isProd ? 'source-map' : 'inline-source-map',
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
                use: isProd
                    ? [MiniCssExtractPlugin.loader, 'css-loader']
                    : ['style-loader', 'css-loader'],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            templateContent: htmlTemplate,
            inject: false
        }),
        isProd && new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer.html',
            openAnalyzer: false
        }),
        isProd && new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        })
    ].filter(Boolean),
    optimization: {
        concatenateModules: false, // Makes BundleAnalyzerPlugin more effective

        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ]
    }
}