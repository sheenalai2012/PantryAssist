const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,    
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            
        ],
    },
    // resolve: {
    //    // modules: [...],
    //     fallback: {
    //       "fs": false,
    //       "tls": false,
    //       "net": false,
    //       "path": false,
    //       "zlib": false,
    //       "http": false,
    //       "https": false,
    //       "stream": false,
    //       "crypto": false,
    //       "browser": false,
    //       "child_process": false,
    //       "process": false,
    //       "os": require.resolve("os-browserify/browser"),
    //       "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    //     } 
    //   },

    optimization: {
        minimize: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('development')
        }),
        new MiniCssExtractPlugin(
            {
                filename: 'tuiCalendar.css'
            }),
            // new webpack.ProvidePlugin({
            //     process: 'process/browser',
            //   }),
    ],
};