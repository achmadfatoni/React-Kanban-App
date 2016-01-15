var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: PATHS.app,
    output:{
        path: PATHS.build,
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module:{
        loaders: [
            {
                //Test expects RegExp!, not the slashes
                test: /\.css$/,
                loaders: ['style', 'css'],
                //Include accepts either a path or an array of path
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: PATHS.app
            }
        ]
    },

    plugins:[
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'Kanban app',
            appMountId: 'app'
        })
    ]
}

//default configuration
if(TARGET === 'start' || !TARGET){
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            //Display errors only to reduce the amount of output
            stats: 'errors-only',

            //Parse host and port from env so this easy to customize
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if(TARGET === 'build'){
    module.exports = merge(common, {});
}

