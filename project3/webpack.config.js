const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const port = process.env.PORT || 9000
const Dotenv = require('dotenv-webpack')
module.exports = {
    mode: "development",
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom",
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.ContextReplacementPlugin(
            /\/peerjs\//,
            (data) => {
                delete data.dependencies[0].critical;
                return data;
            },
        ),
        new Dotenv({path:'./.env'})
    ],
    devServer: {
        historyApiFallback: true,
        port: port,
        open: true,
        contentBase: "./build"
    }
}