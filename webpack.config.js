var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: PATHS.app,
    output:{
        path: PATHS.build,
        filename: 'bundle.js',
    },
    plugins:[
        new HtmlwebpackPlugin({
            title: 'Kanban app'
        })
    ]
}