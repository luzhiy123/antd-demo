const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const apiService = {
        // 设置为线上环境请手动修改cookies dt_session，本地环境请通过后端登录
        target: 'https://comptest.testbird.com',
        changeOrigin: true,
        secure: false,
    };

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        publicPath: '/home/',
        historyApiFallback: {
            index: '/home/',
            rewrites: [
                // { from: /login/, to: "/home/login.html" },
            ],
        },
        hot: true,
        port: '8080',
        proxy: {
            '/api': apiService,
            '/config.js': apiService,
            '/static': apiService,
            '/media/contents': apiService,
            '/favicon.ico': apiService,
        },
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev'),
        }),
    ],
    optimization: {
        minimize: false,
    },
});