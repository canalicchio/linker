'use strict';

import * as express from 'express';
import * as proxy from 'proxy-middleware';
import * as url from 'url';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import index from './routes/index';
import * as WebpackDevServer from 'webpack-dev-server';
//import * as WebpackDevServer from 'webpack-dev-server';
import * as WebpackDevServerMiddleWare from 'webpack-dev-middleware';
import * as webpack from 'webpack';
import * as config from '../../frontend/webpack.config.js';

console.log(config);

const app: express.Express = express();

//view engine setup
app.set('views',path.join(__dirname,'../app/views'));
app.set('view engine','pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../app/public')));

app.use('/api/',index);



if(process.env.NODE_ENV === 'development') {
    app.use(WebpackDevServerMiddleWare(webpack(config), config.devServer));
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
