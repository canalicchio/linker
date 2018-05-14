'use strict';

import * as express from 'express';
import imagesUpload from './image';

const router = express.Router();

/* GET home page. */
router.get('/',(req,res,next) => {
    res.render('index', {title: 'Express'});
});
const imagesHandler = imagesUpload(
    './app/static/files',
    '/files'
);
router.post('/image',(req,res,next) => {
    imagesHandler(req, res);
});

export default router;
