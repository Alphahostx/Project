
const express = require('express');
const morgan = require('morgan');
const cloudinary = require('cloudinary').v2;
const fileUpload = require("express-fileupload");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const client = require('./redis');

client.SET('key','bar');

client.GET('key',(err,value)=>{
    if(err)console.log(err.message)
    console.log(value)
})

const app = express();


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

app.use('/api/v1/products',productRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/orders',orderRouter);


cloudinary.config({
    cloud_name:'dgtvidcuo',
    api_key:'779465152135873',
    api_secret:'S49NBMBGNWIsNRwh10MKV9N1rBM'
});

app.all('*',(req,res,next)=>{
next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);

module.exports = app;