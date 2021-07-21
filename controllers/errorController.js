const sendErrorDev = (err,res) =>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    });
};

const sendErroeProd = (err,res) => {
    //Trusted error:send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
        });
    }
    //Programming or other unknown error: don't show to client
    else {
        console.log('ERROR',err);
        res.status(500).json({
            status:'error',
            message: 'Something went wrong'
        })
    }
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
       sendErrorDev(err,res)
    }
    else if(process.env.NODE_ENV === 'production'){
        sendErroeProd(err,res)
    }
}