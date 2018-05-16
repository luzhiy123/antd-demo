const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'main'],
            template: 'public/index.html',
            filename: 'index.html',
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].[hash].css').replace('css/js', 'css');
            },
            allChunks: true,
        }),
    ],
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        runtimeChunk: {
            name: 'vendor',
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    minSize: 1,
                },
            },
        },
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: '../',
            }),
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
                publicPath: '../',
            }),
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    plugins: [
                        [
                            'import',
                            {
                                'libraryName': 'antd',
                                'libraryDirectory': 'es',
                                'style': 'css',
                            },
                        ],
                    ],
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                },
            }],
        }],
    },
};