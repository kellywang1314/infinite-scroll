const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    devtool:'eval-source-map',
    entry: __dirname + '/src/index.js',
    output:{
        path:__dirname+'/public',
        filename:'bundle.js',
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                use:'babel-loader',
                include:__dirname + '/src',
                exclude:/node_modules/
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ],
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'react.html',
            filename:'react.html'
        }),
        new HtmlWebpackPlugin({
            template:'native.html',
            filename:'native.html'
        })
    ]
}