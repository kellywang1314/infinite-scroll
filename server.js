const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const complier = webpack(webpackConfig)
let app = express()

app.use(webpackDevMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath
}))

//使用webpack-dev-middleware打包之后的文件在内存中，并没有直接输出，所以访问需要读内存
app.get('/react',function(req,res){
    let filename = __dirname + '/public/' + 'react.html'
    complier.outputFileSystem.readFile(filename, (err, result) =>{
        if(err){
            return(next(err))
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
   
})

app.get('/native',function(req,res){
    let filename = __dirname + '/public/' + 'native.html'
    complier.outputFileSystem.readFile(filename, (err, result) =>{
        if(err){
            return(next(err))
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
   
})

app.listen(3002,function(){
    let uri = 'http://localhost:3002'
    console.log('Listening at ' + uri + '\n')
})