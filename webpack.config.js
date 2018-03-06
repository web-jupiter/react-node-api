const webpack = require("webpack");
const path = require('path');
const root = path.resolve('./src');

module.exports = {
    entry: `${root}/client/index.js`,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.js$|\.jsx$|\.react$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]

    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.react'] 
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hotOnly: true
    }
};