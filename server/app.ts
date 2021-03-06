'use strict';

import * as express from 'express';
import * as url from 'url';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import index from './routes/index';
// import * as WebpackDevServerMiddleWare from 'webpack-dev-middleware';

const app: express.Express = express();

//view engine setup
app.set('views',path.join(__dirname,'../app/views'));
app.set('view engine','pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static(path.join(__dirname,'../app/static')));

app.use('/api/',index);


if(process.env.NODE_ENV === 'development') {
    const WebpackDevServer = require('webpack-dev-server');
    const webpack = require('webpack');
    const config = require('../webpack.config.js');
    //    import * as WebpackDevServer from 'webpack-dev-server';
    //import * as webpack from 'webpack';
    //import * as config from '../webpack.config.js';
    //
    // when in development mode we run a webpack server on port 3001 and
    // all the express calls will be proxied through this server
    //
    const devPort = 3001;
    let devServer = new WebpackDevServer(webpack(config), config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
     app.use((err: Error,req,res,next) => {
        res.status(err['status'] || 500);
        res.render('error',{
            title: 'error',
            message: err.message,
            error: err
        });
    });
}

//production error handler
// no stacktrace leaked to user
app.use((err: Error,req,res,next) => {
    res.status(err['status'] || 500);
    res.render('error',{
        title: 'error',
        message: err.message,
        error: {}
    });
});

export default app;
