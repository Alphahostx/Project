
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use(express.json());

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

app.use('/api/v1/products',productRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/orders',orderRouter);

app.all('*',(req,res,next)=>{
next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);

module.exports = app;